const mongoose = require("mongoose");
const ObjectId = require("mongoose").ObjectId;

const itemSchema = new mongoose.Schema({
  itemName: String,
  itemDescription: String,
  itemPrice: Number,
  imagePath: String,
});

const Item = mongoose.model("Item", itemSchema);

module.exports.Item = Item;
