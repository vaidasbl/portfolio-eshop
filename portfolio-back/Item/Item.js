const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemDescription: String,
  itemPrice: Number,
  stock: Number,
  imagePath: String,
});

const Item = mongoose.model("Item", itemSchema);

module.exports.Item = Item;
