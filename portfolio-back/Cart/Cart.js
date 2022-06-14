const mongoose = require("mongoose");
const { CartItem, CartItemSchema } = require("../CartItem/CartItem");

const Cart = mongoose.model(
  "Cart",
  new mongoose.Schema({
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "CartItem",
        },

        itemName: {
          type: String,
          ref: "Item",
        },

        quantity: {
          type: Number,
          min: [1, "quantity cant be less than 1"],
        },
      },
    ],
  })
);

module.exports.Cart = Cart;
