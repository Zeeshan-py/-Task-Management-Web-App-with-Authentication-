require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";
let server;
let isShuttingDown = false;

app.set("trust proxy", 1);
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Manager API is running",
  });
});

app.get("/health", (req, res) => {
  const dbStateCode = mongoose.connection.readyState;
  const dbState =
    {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
    }[dbStateCode] || "unknown";
  const isHealthy = dbStateCode === 1;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "ok" : "degraded",
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    db: dbState,
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(notFound);
app.use(errorHandler);

const closeHttpServer = () =>
  new Promise((resolve) => {
    if (!server) {
      resolve();
      return;
    }

    server.close((error) => {
      if (error) {
        console.error(`[Shutdown] Error closing HTTP server: ${error.message}`);
      } else {
        console.log("[Shutdown] HTTP server closed");
      }
      resolve();
    });
  });

const closeMongoConnection = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }
  await mongoose.connection.close(false);
  console.log("[Shutdown] MongoDB connection closed");
};

const gracefulShutdown = async (signal) => {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;
  console.log(`[Shutdown] Received ${signal}. Starting graceful shutdown...`);

  const forceCloseTimer = setTimeout(() => {
    console.error("[Shutdown] Force exiting after timeout");
    process.exit(1);
  }, 15000);

  try {
    await closeHttpServer();
    await closeMongoConnection();
    clearTimeout(forceCloseTimer);
    console.log("[Shutdown] Graceful shutdown completed");
    process.exit(0);
  } catch (error) {
    clearTimeout(forceCloseTimer);
    console.error(`[Shutdown] Graceful shutdown failed: ${error.message}`);
    process.exit(1);
  }
};

process.on("SIGTERM", () => {
  gracefulShutdown("SIGTERM");
});

process.on("SIGINT", () => {
  gracefulShutdown("SIGINT");
});

process.on("uncaughtException", (error) => {
  console.error(`[Process] Uncaught exception: ${error.stack || error.message}`);
  gracefulShutdown("uncaughtException");
});

process.on("unhandledRejection", (reason) => {
  const message = reason instanceof Error ? reason.stack || reason.message : String(reason);
  console.error(`[Process] Unhandled rejection: ${message}`);
  gracefulShutdown("unhandledRejection");
});

mongoose.connection.on("connected", () => {
  console.log("[DB] Mongoose connection established");
});

mongoose.connection.on("error", (error) => {
  console.error(`[DB] Connection error: ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.warn("[DB] Mongoose disconnected");
});

const startServer = async () => {
  console.log("[Startup] Boot sequence started");
  console.log(`[Startup] NODE_ENV=${process.env.NODE_ENV || "development"}`);
  console.log(`[Startup] PORT=${PORT}`);

  await connectDB();

  server = http.createServer(app);
  server.keepAliveTimeout = 65000;
  server.headersTimeout = 66000;

  server.listen(PORT, HOST, () => {
    console.log(`[Startup] SERVER STARTED ON PORT ${PORT}`);
  });

  server.on("error", (error) => {
    console.error(`[HTTP] Server error: ${error.message}`);
    gracefulShutdown("serverError");
  });
};

startServer().catch((error) => {
  console.error(`[Startup] Fatal startup error: ${error.stack || error.message}`);
  process.exit(1);
});
