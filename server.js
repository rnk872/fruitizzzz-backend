const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("🍓 Fruitizzzz Backend Running");
});

/* =========================
   DATABASE CONNECTION
========================= */
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("❌ MONGO_URL is not defined in environment variables");
  process.exit(1);
}

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("🍃 MongoDB Connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log("================================");
      console.log("🚀 Server Running");
      console.log("🌐 Port:", PORT);
      console.log("================================");
    });
  })
  .catch(err => {
    console.log("MongoDB Error ❌", err);
  });

/* =========================
   REGISTER (optional safe system)
========================= */
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword
    });

    res.json({
      success: true,
      message: "User created",
      userId: user._id
    });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

/* =========================
   LOGIN
========================= */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token
    });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

/* =========================
   PROFILE (REAL USERNAME FROM DB)
========================= */
app.get("/api/auth/me", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      username: user.username
    });

  } catch (err) {
    res.json({ success: false, message: "Invalid token" });
  }
});
