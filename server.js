const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const port = 3001;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"; // MongoDB connection string

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error connecting to DB:", err));

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Use Auth Routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
