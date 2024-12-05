const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GoogleSignUpSchema = new Schema({
  googleId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
    unique: true,
  },
});

const GoogleSignUp = mongoose.model("googleSignUp", GoogleSignUpSchema);
module.exports = GoogleSignUp;
