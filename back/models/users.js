const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: String,
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
