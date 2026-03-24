const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");


// 👉 Add Customer
router.post("/add", async (req, res) => {
  const customer = new Customer(req.body);
  await customer.save();
  res.json(customer);
});

// 👉 Get All Customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

module.exports = router;