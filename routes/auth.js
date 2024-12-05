const express = require("express");
const app = express();
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "327481316158-3mdgmgjtke0lb9jguo9khnijocr7fdlj.apps.googleusercontent.com"
);
const { registerUser, loginUser } = require("../controllers/authController.js");

// Sign-up route
router.post("/signup", registerUser);

// Login route
router.post("/login", loginUser);


module.exports = router;
