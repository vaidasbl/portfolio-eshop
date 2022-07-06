const mongoose = require("mongoose");

const Theme = mongoose.model(
  "Theme",
  new mongoose.Schema({
    theme: String,
    active: Boolean,
  })
);

module.exports.Theme = Theme;
