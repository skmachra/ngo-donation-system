const User = require("../models/User");
const Donation = require("../models/Donation");

exports.getUsers = async (req, res) => {
  const { email, from, to } = req.query;

  let filter = {};
  if (email) filter.email = { $regex: email, $options: "i" };
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  const users = await User.find(filter).select("-password");
  res.status(200).json(users);
};

exports.getDonations = async (req, res) => {
  const { status } = req.query;

  let filter = {};
  if (status) filter.status = status;

  const donations = await Donation.find(filter)
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json(donations);
};

exports.getStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalSuccess = await Donation.aggregate([
    { $match: { status: "success" } },
    { $group: { _id: null, sum: { $sum: "$amount" } } }
  ]);

  const pendingCount = await Donation.countDocuments({ status: "pending" });

  res.status(200).json({
    totalUsers,
    totalDonations: totalSuccess[0]?.sum || 0,
    pendingCount
  });
};
