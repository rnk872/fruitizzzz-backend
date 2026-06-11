const express = require("express");
const router = express.Router();

/* 🍧 FRUIT SHELL MENU DATA */
const menu = [
  { id: 1, name: "🥭 Mango Shell Ice Cream", price: 149, category: "icecream", season: "summer", bestSeller: true },
  { id: 2, name: "🍓 Strawberry Shake", price: 99, category: "shakes", season: "all", bestSeller: true },
  { id: 3, name: "🍫 Oreo Shake", price: 129, category: "shakes", season: "all", bestSeller: false },
  { id: 4, name: "🍉 Watermelon Bowl", price: 159, category: "icecream", season: "summer", bestSeller: true },
  { id: 5, name: "🍍 Pineapple Salad", price: 119, category: "salad", season: "summer", bestSeller: false },
  { id: 6, name: "🥝 Kiwi Combo", price: 199, category: "combo", season: "all", bestSeller: true },
  { id: 7, name: "🍹 Mint Mojito", price: 89, category: "mojitos", season: "summer", bestSeller: true }
];

/* ✅ GET MENU API */
router.get("/", (req, res) => {
  res.json(menu);
});

module.exports = router;
