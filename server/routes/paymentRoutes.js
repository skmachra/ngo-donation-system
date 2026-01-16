const express = require("express");
const { createOrder, verifyPayment, markFailed } = require("../controllers/paymentController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);
router.post("/mark-failed", authMiddleware, markFailed);


module.exports = router;
