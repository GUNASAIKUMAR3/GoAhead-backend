const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const geminiChatBot = require("./routes/gemini");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5050;
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
app.use(cors());
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error connecting to DB:", err));

// Middleware
app.use(express.json());

// Use Auth Routes
app.use("/api/auth", authRoutes);
app.use("/gemini", geminiChatBot);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
