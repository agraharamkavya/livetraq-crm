const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// 👉 Add Customer
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding customer" });
  }
});

// 👉 Get All Customers
router.get("/", authMiddleware, async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching customers" });
  }
});

module.exports = router;