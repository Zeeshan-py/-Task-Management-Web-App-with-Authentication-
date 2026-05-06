// ==============================================
// Database Configuration - MongoDB Atlas Connection
// ==============================================
// This module creates a reusable, async database
// connection using Mongoose. It is imported and
// called once during server startup.
// ==============================================

const mongoose = require("mongoose");

/**
 * connectDB - Establishes connection to MongoDB Atlas
 *
 * WHY async/await?
 * - mongoose.connect() returns a Promise
 * - We use try/catch for clean error handling
 * - If the database connection fails, the server
 *   should NOT continue running (process.exit(1))
 *
 * WHY process.exit(1)?
 * - Exit code 1 = "failure". This tells the OS
 *   (or a process manager like PM2) that the app
 *   crashed and needs attention.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
