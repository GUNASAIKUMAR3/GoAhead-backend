const express = require("express");
const app = express();
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "327481316158-3mdgmgjtke0lb9jguo9khnijocr7fdlj.apps.googleusercontent.com"
);
const cors = require("cors");
const { registerUser, loginUser } = require("../controllers/authController.js");

app.use(cors());
app.use(express.json());

// Sign-up route
router.post("/signup", registerUser);

// Login route
router.post("/login", loginUser);

// Google route
app.post("/google", async (req, res) => {
  const { googleId, name, email, picture, isNewUser } = req.body;

  try {
    if (isNewUser) {
      // Signup logic
      let existingUser = await User.findOne({ googleId });
      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }

      const newUser = new User({ googleId, name, email, picture });
      await newUser.save();
      return res
        .status(201)
        .send({ message: "User created successfully", user: newUser });
    } else {
      // Login logic
      const user = await User.findOne({ googleId });
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      return res
        .status(200)
        .send({ message: "User logged in successfully", user });
    }
  } catch (error) {
    console.error("Error handling user data", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
