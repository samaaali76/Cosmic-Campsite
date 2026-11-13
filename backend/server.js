
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: false }));
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
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error) => {
  console.error(`Could not connect to MongoDB: ${error.message}`);
  process.exit(1);
});
