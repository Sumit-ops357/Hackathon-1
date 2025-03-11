const express = require("express");
const { signup, login, getProfile } = require("../controllers/authController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authenticate, getProfile);

module.exports = router;
