// ==============================================
// Server Entry Point - Task Manager Backend
// ==============================================
// This is the main file that:
//  1. Loads environment variables from .env
//  2. Imports and configures Express
//  3. Connects to MongoDB Atlas
//  4. Registers middleware (cors, json parser)
//  5. Defines API routes
//  6. Registers error-handling middleware
//  7. Starts the HTTP server
//
// Run with: npm run dev (development)
//           npm start   (production)
// ==============================================

// ------------------------------------------
// 1. LOAD ENVIRONMENT VARIABLES
// ------------------------------------------
// dotenv.config() reads the .env file and loads
// its key=value pairs into process.env.
// This MUST be called before accessing any
// process.env variables (like MONGO_URI).
const dotenv = require("dotenv");
dotenv.config();

// ------------------------------------------
// 2. IMPORT DEPENDENCIES
// ------------------------------------------
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// ------------------------------------------
// 3. CONNECT TO DATABASE
// ------------------------------------------
// We call connectDB() immediately. It's async
// and will log "MongoDB Connected" on success,
// or exit the process on failure.
connectDB();

// ------------------------------------------
// 4. INITIALIZE EXPRESS APP
// ------------------------------------------
const app = express();

// ------------------------------------------
// 5. CONFIGURE GLOBAL MIDDLEWARE
// ------------------------------------------

/**
 * cors() - Cross-Origin Resource Sharing
 *
 * WHY? When your React frontend (localhost:3000)
 * makes a request to your Express backend
 * (localhost:5000), the browser blocks it by
 * default for security. cors() tells the browser
 * "it's okay, allow this cross-origin request."
 */
app.use(cors());

/**
 * express.json() - Body Parser
 *
 * WHY? When the frontend sends data in a POST
 * request (like { email: "...", password: "..." }),
 * Express doesn't understand JSON by default.
 * This middleware parses the JSON body and makes
 * it available as req.body.
 */
app.use(express.json());

// ------------------------------------------
// 6. DEFINE API ROUTES
// ------------------------------------------

/**
 * Test Route - GET /
 *
 * This is a health-check endpoint. It confirms
 * that the server is running and reachable.
 * Useful for:
 *   - Quick testing in the browser
 *   - Load balancer health checks
 *   - CI/CD pipeline checks
 */
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running...",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

/**
 * API Routes
 *
 * Each app.use() call mounts a router at a specific path.
 * All routes defined in authRoutes.js will be prefixed
 * with "/api/auth". For example:
 *   router.post("/register") → POST /api/auth/register
 */
app.use("/api/auth", require("./routes/authRoutes"));

// Future routes (Day 3+):
//   app.use("/api/tasks", require("./routes/taskRoutes"));
//   app.use("/api/boards", require("./routes/boardRoutes"));

// ------------------------------------------
// 7. ERROR HANDLING MIDDLEWARE
// ------------------------------------------
// These MUST be registered AFTER all routes.
// Express processes middleware in order, so
// error handlers need to be last.

// Catches requests to undefined routes → 404
app.use(notFound);

// Formats all errors as clean JSON responses
app.use(errorHandler);

// ------------------------------------------
// 8. START SERVER
// ------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
