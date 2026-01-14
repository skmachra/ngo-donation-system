const express = require("express");
const {
  getUsers,
  getDonations,
  getStats
} = require("../controllers/adminController");

const {
  authMiddleware,
  adminMiddleware
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", authMiddleware, adminMiddleware, getUsers);
router.get("/donations", authMiddleware, adminMiddleware, getDonations);
router.get("/stats", authMiddleware, adminMiddleware, getStats);

module.exports = router;
