const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  device: String,
  model: String,
  imei: String,
  date: String,
  location: String
});

module.exports = mongoose.model("Inventory", inventorySchema);