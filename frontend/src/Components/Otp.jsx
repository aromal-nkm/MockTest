import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Otp = () => {
  const [step, setStep] = useState(1); // Step 1: Email form, Step 2: OTP form
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', { email });
      if (response.status === 200) {
        alert('OTP sent to your email!');
        setStep(2); // Move to OTP entry step
      }
    } catch (error) {
      setErrorMessage('Error sending OTP. Please try again.');
      console.error(error);
    }
  };

  // Handle OTP submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
      if (response.data.message === 'Login successful') {
        navigate('/home'); // Redirect to home page after successful OTP verification
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error verifying OTP. Please try again.');
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      {step === 1 && (
        <form onSubmit={handleEmailSubmit}>
          <h2>Email Verification</h2>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          />
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Send OTP
          </button>
          {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit}>
          <h2>Enter OTP</h2>
          <label>OTP:</label>
          <br />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength="6"
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          />
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Verify OTP
          </button>
          {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default Otp;
