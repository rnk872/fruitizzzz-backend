const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* ROOT */
app.get("/", (req, res) => {
  res.send("Fruitizzzz Backend Running 🚀");
});

/* LOGIN */
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({
      success: true,
      token: "demo-token",
      user: { name: "Admin" }
    });
  }

  return res.json({
    success: false,
    message: "Invalid credentials"
  });
});

/* ITEMS API */
app.get("/api/items", (req, res) => {
  res.json({
    fruitShellIceCreams: [
      { name: "Mango Ice Cream", price: 60 },
      { name: "Strawberry Ice Cream", price: 70 },
      { name: "Chocolate Ice Cream", price: 80 },
      { name: "Vanilla Ice Cream", price: 60 },
      { name: "Blueberry Ice Cream", price: 90 },
      { name: "Butterscotch Ice Cream", price: 75 }
    ],

    milkshakes: [
      { name: "Chocolate Shake", price: 90 },
      { name: "Strawberry Shake", price: 80 },
      { name: "Vanilla Shake", price: 70 },
      { name: "Oreo Shake", price: 100 },
      { name: "Banana Shake", price: 60 }
    ],

    mojitos: [
      { name: "Classic Mojito", price: 60 },
      { name: "Mint Mojito", price: 70 },
      { name: "Blue Mojito", price: 90 },
      { name: "Strawberry Mojito", price: 80 },
      { name: "Green Apple Mojito", price: 85 }
    ],

    brownies: [
      { name: "Hot Brownie", price: 120 },
      { name: "Normal Brownie", price: 100 }
    ],

    combos: [
      { name: "Ice Cream + Shake Combo", price: 150 },
      { name: "Mojito + Brownie Combo", price: 180 },
      { name: "Family Combo Pack", price: 250 },
      { name: "Couple Combo", price: 199 },
      { name: "Party Special Combo", price: 399 }
    ],

    specialDish: {
      name: "Fruitizzzz Volcano Sundae",
      price: 299
    },

    signatureDish: {
      name: "Chef Signature Royal Explosion",
      price: 499
    }
  });
});

/* START SERVER */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
















