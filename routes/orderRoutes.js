const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

// ==========================
// CREATE ORDER (USER)
// ==========================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty ❌" });
    }

    const order = new Order({
      items,
      total
    });

    await order.save();

    res.json({
      success: true,
      message: "Order placed successfully 🎉",
      order
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================
// GET ALL ORDERS (ADMIN)
// ==========================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
