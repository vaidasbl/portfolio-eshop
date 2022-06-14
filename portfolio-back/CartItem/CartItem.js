const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
  },

  itemName: {
    type: String,
    ref: "Item",
  },

  quantity: {
    type: Number,
    min: [1, "quantity cant be less than 1"],
  },

  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports.CartItem = CartItem;
module.exports.CartItemSchema = CartItemSchema;
