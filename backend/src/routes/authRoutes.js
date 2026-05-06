// ==============================================
// Authentication Routes
// ==============================================
// This file defines the URL endpoints for
// authentication and links each one to its
// corresponding controller function.
//
// WHAT IS express.Router()?
// - A mini Express application that only handles
//   routes. It's like a modular, mountable
//   route handler.
// - We create routes here, then "mount" them
//   in server.js with: app.use("/api/auth", authRoutes)
// - This means all routes here are prefixed
//   with /api/auth automatically.
//
// ROUTE STRUCTURE:
//   POST /api/auth/register  → registerUser (Public)
//   POST /api/auth/login     → loginUser    (Public)
//   GET  /api/auth/profile   → getProfile   (Private)
// ==============================================

const express = require("express");
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

// Import auth middleware
const { protect } = require("../middleware/authMiddleware");

// ------------------------------------------
// PUBLIC ROUTES (no token required)
// ------------------------------------------

// @route   POST /api/auth/register
// @desc    Register a new user account
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user and get JWT token
// @access  Public
router.post("/login", loginUser);

// ------------------------------------------
// PRIVATE ROUTES (token required)
// ------------------------------------------

// @route   GET /api/auth/profile
// @desc    Get logged-in user's profile
// @access  Private (requires valid JWT)
//
// HOW does 'protect' work here?
// - Express processes middleware left to right.
// - 'protect' runs FIRST → verifies the token
//   and attaches the user to req.user.
// - If the token is valid, it calls next(),
//   which moves to 'getProfile'.
// - If the token is invalid, 'protect' throws
//   an error and 'getProfile' never runs.
router.get("/profile", protect, getProfile);

module.exports = router;
