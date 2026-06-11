const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

/* =========================
   ADMIN CREDENTIALS
========================= */
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("🍃 MongoDB Connected"))
  .catch(err => console.log("MongoDB Error ❌", err));

/* =========================
   ROUTES IMPORT
========================= */
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("🍓 Fruitizzzz backend running successfully 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =========================
   ADMIN LOGIN API
========================= */
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign(
      { role: "admin" },
      "secretkey",
      { expiresIn: "1d" }
    );

    return res.json({
      success: true,
      token
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

/* =========================
   SIMPLE ADMIN AUTH CHECK
========================= */
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    jwt.verify(token, "secretkey");
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

/* =========================
   API ROUTES
========================= */
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);
/* =========================
   ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





