const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

/* =========================
   PLACE ORDER (CREATE)
========================= */
router.post("/", async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty"
      });
    }

    const newOrder = new Order({
      items,
      total
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Order placed successfully 🚀",
      order: newOrder
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

/* =========================
   GET ALL ORDERS (ADMIN)
========================= */
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;
