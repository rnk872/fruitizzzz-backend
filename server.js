const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* =======================
   MIDDLEWARE
======================= */
app.use(cors());
app.use(express.json());

/* =======================
   DATABASE CONNECTION
======================= */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

/* =======================
   ROUTES IMPORT
======================= */
const menuRoutes = require("./routes/menu");

/* =======================
   BASIC ROUTES
======================= */

// Home route
app.get("/", (req, res) => {
  res.send("🍧 Fruitizzzz backend running successfully 🚀");
});

// Test route
app.get("/test", (req, res) => {
  res.json({
    ok: true,
    message: "Server is working perfectly ✅"
  });
});

/* =======================
   API ROUTES
======================= */

// MENU API (FIXED + CONNECTED)
app.use("/api/menu", menuRoutes);

/* =======================
   SERVER START
======================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
