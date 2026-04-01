const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const authMiddleware = require("../middleware/authMiddleware");

// 👉 Add Inventory
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding inventory" });
  }
});

// 👉 Get All Inventory
router.get("/", authMiddleware, async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching inventory" });
  }
});

module.exports = router;