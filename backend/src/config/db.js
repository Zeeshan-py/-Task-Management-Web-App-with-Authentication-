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
    let uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not configured");
    }

    // Automatically URL encode the password if it contains special characters
    // Matches: (mongodb[+srv]://username:)(password)(@cluster...)
    const uriMatch = uri.match(/^(mongodb(?:\+srv)?:\/\/[^:]+:)(.*)(@[^@]+)$/);
    if (uriMatch) {
      const prefix = uriMatch[1];
      const password = uriMatch[2];
      const suffix = uriMatch[3];

      // If the password is not already encoded, encode it
      if (decodeURIComponent(password) === password) {
        uri = prefix + encodeURIComponent(password) + suffix;
      }
    }

    const conn = await mongoose.connect(uri);
    console.log(`[DB] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DB] Initial connection failed: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
