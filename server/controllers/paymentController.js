const Razorpay = require("razorpay");
const crypto = require("crypto");
const Donation = require("../models/Donation");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

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

    res.json({
      orderId: order.id,
      donationId: donation._id,
      key: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Order creation failed" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donationId
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await Donation.findByIdAndUpdate(donationId, {
        status: "success",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature
      });

      return res.json({ success: true });
    } else {
      await Donation.findByIdAndUpdate(donationId, { status: "failed" });
      return res.status(400).json({ success: false });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Verification failed" });
  }
};

exports.markFailed = async (req, res) => {
  try {
    const { donationId } = req.body;

    await Donation.findByIdAndUpdate(donationId, {
      status: "failed"
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: "Failed to update status" });
  }
};
