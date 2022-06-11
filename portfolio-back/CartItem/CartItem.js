const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  itemName: String,
  userCart: { userId: String, quantity: Number },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports.CartItem = CartItem;
