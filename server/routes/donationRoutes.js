const express = require("express");
const { createDonation, getUserDonations } = require("../controllers/donationController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createDonation);
router.get("/user", authMiddleware, getUserDonations);

module.exports = router;
