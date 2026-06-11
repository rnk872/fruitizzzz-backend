const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* =======================
   MENU ROUTE (INLINE FIX)
   NO IMPORT PROBLEMS
======================= */

app.get("/api/menu", (req, res) => {
  res.json([
    {
      id: 1,
      name: "🥭 Mango Shell Ice Cream",
      price: 149,
      category: "icecream"
    },
    {
      id: 2,
      name: "🍓 Strawberry Shake",
      price: 99,
      category: "shakes"
    },
    {
      id: 3,
      name: "🍍 Pineapple Salad",
      price: 119,
      category: "salad"
    },
    {
      id: 4,
      name: "🍹 Mint Mojito",
      price: 89,
      category: "mojitos"
    }
  ]);
});

/* =======================
   BASIC ROUTES
======================= */

app.get("/", (req, res) => {
  res.send("🍧 Fruit Shell Backend Running 🚀");
});

app.get("/test", (req, res) => {
  res.json({ ok: true, message: "Server is working perfectly ✅" });
});

/* =======================
   START SERVER
======================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

