const express = require("express");
const app = express();
const router = express.Router();

const { geminiChatBot } = require("../controllers/geminiController");

router.post("/ans", geminiChatBot);

module.exports = router;
