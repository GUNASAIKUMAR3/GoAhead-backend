const express = require("express");
const mongoose = require("mongoose");
const GoogleSignUp = require("./models/googleUser.js");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");
const app = express();
const port = process.env.PORT || 5050;
dotenv.config();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "327481316158-3mdgmgjtke0lb9jguo9khnijocr7fdlj.apps.googleusercontent.com"
);

const MONGO_URL = process.env.MONGO_URL;
app.use(cors());
// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error connecting to DB:", err));

// Middleware

app.use(express.json()); // Parse JSON bodies

// Google route
app.post("/api/auth/google", async (req, res) => {
  const { googleId, name, email, picture, isNewUser } = req.body;
  console.log("Received Google Auth Data:", req.body); // Log the received data

  try {
    if (isNewUser) {
      // Signup logic
      let existingUser = await GoogleSignUp.findOne({ googleId });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new GoogleSignUp({ googleId, name, email, picture });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } else {
      // Login logic
      const user = await GoogleSignUp.findOne({ googleId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res
        .status(200)
        .json({ message: "User logged in successfully", user });
    }
  } catch (error) {
    console.error("Error handling user data", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

// Use Auth Routes
app.use("/api/auth", authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
