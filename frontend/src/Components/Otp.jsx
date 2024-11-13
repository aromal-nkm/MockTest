import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function OTPForm({ email, onOTPVerify }) {
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send OTP to backend for validation
      const response = await axios.post('http://localhost:4000/user/validate-otp', {
        otp
      });
      const data = response.data;

      if (data.valid) {
        navigate('/home');
      } else {
        setErrorMessage(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('An error occurred while verifying OTP.');
    }
  };

  const formStyle = {
    width: '300px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  const errorMessageStyle = {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  };

  return (
    <div style={{ padding: '50px 20px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Enter OTP</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          maxLength="4"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle} onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}>
          Verify OTP
        </button>
      </form>
      {errorMessage && <p style={errorMessageStyle}>{errorMessage}</p>}
    </div>
  );
}

export default OTPForm;
