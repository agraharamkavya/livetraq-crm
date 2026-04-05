const express = require("express");
const router = express.Router();
const Inventory = require("../models/Inventory");
const authMiddleware = require("../middleware/authMiddleware");

// 👉 Add Inventory
router.post("/", authMiddleware, async (req, res) => {
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
// 👉 Update Inventory
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating inventory" });
  }
});

// 👉 Delete Inventory
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting inventory" });
  }
});

module.exports = router;