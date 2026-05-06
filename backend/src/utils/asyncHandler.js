// ==============================================
// Async Handler Utility
// ==============================================
// A wrapper function that catches errors from
// async route handlers and passes them to Express's
// error-handling middleware automatically.
//
// WITHOUT this wrapper, you'd need to write
// try/catch in every single async route handler.
//
// USAGE:
//   const asyncHandler = require("../utils/asyncHandler");
//   router.get("/", asyncHandler(async (req, res) => { ... }));
// ==============================================

/**
 * asyncHandler - Wraps an async function so that
 * any rejected promise is automatically caught
 * and forwarded to the next error-handling middleware.
 *
 * @param {Function} fn - An async Express route handler
 * @returns {Function} - A new function that catches errors
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
