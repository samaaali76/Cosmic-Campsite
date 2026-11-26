
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();

// Middleware
const localOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
];
const configuredOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (process.env.NODE_ENV === "production" && configuredOrigins.length === 0) {
  throw new Error("Set CORS_ORIGINS to the deployed frontend origin in production.");
}

const allowedOrigins = new Set(configuredOrigins.length ? configuredOrigins : localOrigins);
app.use(cors({
  origin(origin, callback) {
    callback(null, !origin || allowedOrigins.has(origin));
  },
  credentials: false
}));
app.use(express.json({ limit: "300kb" }));

// Test Route
app.get("/", (req, res) => {
  res.send("Cosmic Campsite Backend is Running!");
});

app.use("/api/users", userRoutes);
app.use("/api/progress", progressRoutes);

app.use((req, res) => res.status(404).json({ message: "API route not found." }));
app.use((error, req, res, next) => {
  console.error(error);
  const status = Number.isInteger(error.status) ? error.status : 500;
  res.status(status).json({ message: status === 500 ? "The server could not complete that request." : error.message });
});

// Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => console.log(`Server is running on port ${PORT}`));
}).catch((error) => {
  console.error(`Could not connect to MongoDB: ${error.message}`);
  process.exit(1);
});
