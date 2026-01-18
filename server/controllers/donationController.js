const Donation = require("../models/Donation");
const Razorpay = require("razorpay");

let razorpay;

try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
} catch (err) {
  console.error("Razorpay init error:", err);
}

exports.createDonation = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR"
    });

    const donation = await Donation.create({
      userId: req.user.id,
      amount,
      status: "pending",
      razorpayOrderId: order.id
    });

    res.status(200).json({ orderId: order.id, donationId: donation._id });

  } catch (err) {
    console.error("Create donation error:", err);
    res.status(500).json({ msg: "Donation creation failed" });
  }
};

exports.getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch donations" });
  }
};
