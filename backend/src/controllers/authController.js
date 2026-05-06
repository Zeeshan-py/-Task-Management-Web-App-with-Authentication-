// ==============================================
// Authentication Controller
// ==============================================
// Controllers contain the BUSINESS LOGIC for each
// API endpoint. They receive the request, process
// it, interact with the database, and send back
// the response.
//
// WHY separate controllers from routes?
// - Routes define WHAT URLs exist
// - Controllers define WHAT HAPPENS at those URLs
// - This separation makes the code easier to
//   test, maintain, and scale
//
// This controller handles:
//   1. registerUser → POST /api/auth/register
//   2. loginUser    → POST /api/auth/login
//   3. getProfile   → GET  /api/auth/profile
// ==============================================

const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// ------------------------------------------
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public (no token required)
// ------------------------------------------
const registerUser = asyncHandler(async (req, res) => {
  // STEP 1: Extract fields from request body
  const { name, email, password } = req.body;

  // STEP 2: Validate required fields
  // WHY validate here AND in the model?
  // - Model validation catches data shape issues
  // - Controller validation gives user-friendly messages
  // - Defense in depth: multiple layers of protection
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields: name, email, password");
  }

  // STEP 3: Check if a user with this email already exists
  // WHY check before trying to create?
  // - The unique index on email would throw a cryptic
  //   MongoDB duplicate key error (E11000).
  // - By checking first, we return a clear error message.
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("A user with this email already exists");
  }

  // STEP 4: Create the new user
  // WHY don't we hash the password here?
  // - The User model has a pre("save") middleware
  //   that automatically hashes the password before
  //   saving. This keeps password logic centralized
  //   in the model, not scattered across controllers.
  const user = await User.create({
    name,
    email,
    password,
  });

  // STEP 5: Respond with user data + JWT token
  // WHY 201 and not 200?
  // - 201 = "Created" → indicates a new resource was
  //   successfully created. It's the correct HTTP status
  //   for POST requests that create something.
  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// ------------------------------------------
// @desc    Login user & return JWT
// @route   POST /api/auth/login
// @access  Public (no token required)
// ------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  // STEP 1: Extract email and password from request body
  const { email, password } = req.body;

  // STEP 2: Validate required fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // STEP 3: Find the user by email
  // WHY .select("+password")?
  // - In the User model, we set password: { select: false }
  //   so it's excluded from queries by default.
  // - During login, we NEED the password to compare.
  // - The "+" prefix tells Mongoose: "include this field
  //   even though it's excluded by default."
  const user = await User.findOne({ email }).select("+password");

  // STEP 4: Check if user exists AND password matches
  // WHY combine both checks?
  // - Security best practice: don't reveal whether
  //   the email or password was wrong. Just say
  //   "Invalid credentials." This prevents attackers
  //   from discovering which emails are registered.
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // STEP 5: Respond with user data + JWT token
  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  });
});

// ------------------------------------------
// @desc    Get current user's profile
// @route   GET /api/auth/profile
// @access  Private (requires JWT token)
// ------------------------------------------
const getProfile = asyncHandler(async (req, res) => {
  // req.user is set by the protect middleware
  // It contains the full user document (minus password)
  //
  // WHY query the database again?
  // - req.user from the middleware is correct, but
  //   querying again ensures we get the LATEST data.
  // - If the user's profile was updated between
  //   when the token was issued and now, we want
  //   the current data.
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
});

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
