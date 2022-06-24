const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports.Cart = Cart;
