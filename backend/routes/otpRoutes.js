const express = require("express");
const router = express.Router();
const OTP = require("../models/Otp");
const nodemailer = require("nodemailer");

// Send OTP Route
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  console.log("Request received to send OTP to:", email);

  try {
    // Generate a 6-digit random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to database
    await OTP.create({ email, otp });

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables for security
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: email, // Recipient's email
      subject: "Your OTP Code",
      text: `Dear User,\n\nYour OTP code is: ${otp}\n\nThis code is valid for 10 minutes.\n\nBest regards,\nYour App Team`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
});

module.exports = router;

