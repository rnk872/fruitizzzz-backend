const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

/* GET ALL ORDERS */
router.get("/orders", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
