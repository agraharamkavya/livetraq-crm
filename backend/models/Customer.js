const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: String,
  govtId: String,
  imei: String,
  sim: String,
  email: String,
  phone: String,
  address: String,
  dealer: String,
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);