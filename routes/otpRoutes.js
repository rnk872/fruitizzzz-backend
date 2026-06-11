const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const otpStore = new Map();

console.log("OTP ROUTES LOADED ✅");

// EMAIL SETUP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// SEND OTP
router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Fruitizzzz OTP Verification",
      text: `Your OTP is: ${otp}. It expires in 5 minutes.`
    });

    res.json({ success: true, message: "OTP sent" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VERIFY OTP + JWT
router.post("/verify", (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = otpStore.get(email);

    if (!record) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ message: "OTP expired" });
    }

    if (Number(otp) !== record.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    otpStore.delete(email);

    // CREATE JWT TOKEN
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "OTP verified successfully",
      token
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
