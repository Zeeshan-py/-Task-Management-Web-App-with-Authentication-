// ==============================================
// Error Handler Middleware
// ==============================================
// This middleware catches errors thrown by any
// route or middleware and sends a clean JSON
// response instead of the default HTML error page.
//
// HOW IT WORKS:
// - Express recognizes a function with 4 parameters
//   (err, req, res, next) as an "error-handling middleware"
// - It only runs when next(error) is called or
//   when an error is thrown in an async route
// ==============================================

/**
 * notFound - Handles 404 errors for undefined routes
 *
 * If a request reaches this middleware, it means
 * no route handler matched the URL. We create a
 * new Error and pass it to the next error handler.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * errorHandler - Global error response formatter
 *
 * WHY do we check for statusCode 200?
 * - Sometimes an error is thrown but the status
 *   code hasn't been set yet (defaults to 200).
 * - We override it to 500 (Internal Server Error)
 *   so the client knows something went wrong.
 *
 * WHY hide the stack trace in production?
 * - Stack traces expose file paths and internal
 *   code structure — a security risk in production.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    // Only show stack trace in development mode
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
