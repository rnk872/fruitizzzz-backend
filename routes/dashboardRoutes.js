const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    let grossSales = 0;
    let profit = 0;
    let loss = 0;
    let totalCost = 0;

    let expiringSoon = [];

    products.forEach(p => {
      const sold = p.soldCount || 0;

      const sales = (p.price || 0) * sold;
      const cost = (p.costPrice || 0) * sold;

      grossSales += sales;
      totalCost += cost;

      if (sales >= cost) profit += (sales - cost);
      else loss += (cost - sales);

      // expiry check (safe fix)
      if (p.expiryDate) {
        const daysLeft =
          (new Date(p.expiryDate) - new Date()) / (1000 * 60 * 60 * 24);

        if (daysLeft <= 7) {
          expiringSoon.push(p);
        }
      }
    });

    res.json({
      grossSales,
      profit,
      loss,
      profitMargin: grossSales
        ? ((profit / grossSales) * 100).toFixed(2)
        : 0,
      expiringSoon
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
