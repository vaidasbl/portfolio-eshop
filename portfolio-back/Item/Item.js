const mongoose = require("mongoose");

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    itemName: String,
    itemDescription: String,
    itemPrice: Number,
    stock: Number,
    imagePath: String,
  })
);

module.exports.Item = Item;
