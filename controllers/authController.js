const Signup = require("../models/Signup");
const bcrypt = require("bcryptjs");

// Handle User Registration
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const userExists = await Signup.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const newUser = new Signup({ fullName, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(400).json({ error: "Error registering user." });
  }
};



// Handle User Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
