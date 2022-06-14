const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    cart: String, // cartId
  })
);

module.exports.User = User;
