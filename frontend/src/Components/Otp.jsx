import React, { useState } from "react";
import axios from "axios";

const Otp = () => {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/send-otp", { email });
      if (response.status === 200) {
        alert("OTP sent to your email!");
        setStep(2);
      }
    } catch (error) {
      alert("Error sending OTP. Please try again.");
    }
  };

 
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { email, otp });
      if (response.data.success) {
        alert("OTP verified! Redirecting to Welcome page...");
        setStep(3); 
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        color: "white",
      }}
    >
      
        <form onSubmit={handleEmailSubmit}>
          <h2 style={{ marginBottom: "20px" }}>Email Verification</h2>
          <label style={{ fontSize: "14px", fontWeight: "bold" }}>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "none",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              cursor: "pointer",
              backgroundColor: "#ff914d",
              border: "none",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ff5722")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ff914d")}
          >
            Send OTP
          </button>
        </form>
     

     
        <form onSubmit={handleOtpSubmit}>
          <h2 style={{ marginBottom: "20px" }}>Enter OTP</h2>
          <label style={{ fontSize: "14px", fontWeight: "bold" }}>OTP:</label>
          <br />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              borderRadius: "5px",
              border: "none",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              cursor: "pointer",
              backgroundColor: "#4caf50",
              border: "none",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#388e3c")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
          >
            Verify OTP
          </button>
        </form>
      

      
        <div>
          <h2 style={{ marginBottom: "10px" }}>🎉 Welcome! 🎉</h2>
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>
            You have successfully verified your email.
          </p>
          <p style={{ fontSize: "14px" }}>Thank you for using our service!</p>
        </div>
      
    </div>
  );
};

export default Otp;
