const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ================= ROUTES =================
const productRoutes = require("./routes/productRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const otpRoutes = require("./routes/otpRoutes");

// ================= APP =================
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ================= API ROUTES =================
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/otp", otpRoutes);

// ================= TEST ROUTES =================
app.get("/", (req, res) => {
  res.send("🍓 Fruitizzzz backend running successfully 🚀");
});

app.get("/test", (req, res) => {
  res.json({
    ok: true,
    message: "Server is working perfectly ✅"
  });
});

// ================= MONGODB =================
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error ❌", err));

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
