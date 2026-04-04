const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  device: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  imei: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Inventory", inventorySchema);