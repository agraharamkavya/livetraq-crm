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

// 👉 Get Single Customer (IMPORTANT 🔥)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching customer" });
  }
});

// 👉 Update Customer (FIX FOR YOUR ERROR 🔥)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(updatedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating customer" });
  }
});

// 👉 Delete Customer
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting customer" });
  }
});

module.exports = router;