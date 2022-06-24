const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
  })
);

module.exports.User = User;
