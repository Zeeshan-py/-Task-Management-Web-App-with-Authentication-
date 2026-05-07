// ==============================================
// MINIMAL SERVER ENTRY POINT (Debugging 502)
// ==============================================

// 1. GLOBAL ERROR HANDLERS
process.on("uncaughtException", (err) => {
  console.error("CRITICAL ERROR: Uncaught Exception!");
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("CRITICAL ERROR: Unhandled Rejection!");
  console.error(err);
  process.exit(1);
});

console.log("-> Loading environment variables...");
require("dotenv").config();

console.log("-> Importing dependencies...");
const express = require("express");
const cors = require("cors");

console.log("-> Initializing Express app...");
const app = express();

console.log("-> Configuring middleware...");
// Minimal CORS and JSON parser ONLY
app.use(cors());
app.use(express.json());

// ==============================================
// TEMPORARILY DISABLED IMPORTS & LOGIC
// ==============================================
// const helmet = require("helmet");
// const morgan = require("morgan");
// const connectDB = require("./config/db");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// console.log("-> Connecting to MongoDB...");
// connectDB();

// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/tasks", require("./routes/taskRoutes"));
// app.use(notFound);
// app.use(errorHandler);

console.log("-> Defining minimal root route...");
app.get("/", (req, res) => {
  try {
    console.log("-> Received GET request on /");
    res.status(200).json({
      success: true,
      message: "Backend working"
    });
  } catch (error) {
    console.error("Route error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

console.log("-> Starting server listen...");
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});
