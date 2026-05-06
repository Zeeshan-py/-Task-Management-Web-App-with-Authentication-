// ==============================================
// Authentication Middleware - JWT Verification
// ==============================================
// This middleware protects routes by verifying
// the JWT token sent in the request header.
//
// HOW IT WORKS:
// 1. Client sends request with header:
//    Authorization: Bearer <token>
// 2. This middleware extracts the token
// 3. Verifies it using jwt.verify()
// 4. Finds the user in the database
// 5. Attaches the user to req.user
// 6. Calls next() to proceed to the route handler
//
// If the token is missing or invalid, the request
// is rejected with a 401 Unauthorized response.
//
// USAGE:
//   const { protect } = require("../middleware/authMiddleware");
//   router.get("/profile", protect, getProfile);
// ==============================================

const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

/**
 * protect - Verifies JWT and attaches user to request
 *
 * WHY use asyncHandler?
 * - User.findById() is async (database query)
 * - If it throws, asyncHandler catches it and
 *   forwards to the error handler middleware
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // ------------------------------------------
  // STEP 1: Extract token from Authorization header
  // ------------------------------------------
  // The standard format is: "Bearer eyJhbGciOi..."
  // We check if the header exists AND starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Split "Bearer eyJhbGciOi..." into ["Bearer", "eyJhbGciOi..."]
    // and take the second element (index 1) — the actual token
    token = req.headers.authorization.split(" ")[1];
  }

  // ------------------------------------------
  // STEP 2: Check if token exists
  // ------------------------------------------
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }

  // ------------------------------------------
  // STEP 3: Verify the token
  // ------------------------------------------
  // jwt.verify() does two things:
  // 1. Checks the signature (was it signed with our JWT_SECRET?)
  // 2. Checks expiration (has the 30-day period passed?)
  // If either fails, it throws an error.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ------------------------------------------
    // STEP 4: Find user and attach to request
    // ------------------------------------------
    // decoded.id is the user ID we stored in the token payload
    // .select("-password") excludes the password field
    // from the returned user object (extra safety)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized, user not found");
    }

    // ------------------------------------------
    // STEP 5: Proceed to the next middleware/route
    // ------------------------------------------
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token invalid or expired");
  }
});

/**
 * authorize - Restricts access to specific roles
 *
 * USAGE:
 *   router.delete("/user/:id", protect, authorize("admin"), deleteUser);
 *
 * This is a higher-order function (a function that returns a function).
 * We pass the allowed roles as arguments, and it returns a middleware
 * that checks if the logged-in user has one of those roles.
 *
 * @param  {...String} roles - Allowed roles (e.g., "admin", "user")
 * @returns {Function} - Express middleware
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `Role '${req.user.role}' is not authorized to access this route`
      );
    }
    next();
  };
};

module.exports = { protect, authorize };
