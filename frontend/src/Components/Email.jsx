import React, { useState } from 'react';
import axios from 'axios';

function Email({ onEmailSubmit }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Handle email form submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
     
      const response = await axios.post('http://localhost:4000/user/sent-otp', { email });
      const data = response.data;

      console.log(data); 

      if (data.success) {
        setOtpSent(true); 
        onEmailSubmit(email);
      } else {
        setErrorMessage('Error sending OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while sending OTP.');
      console.error('Error:', error);
    }
  };


  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:4000/user/validate-otp', { otp });
      const data = response.data;

      if (data.valid) {
        alert('OTP validated successfully!');
      } else {
        setErrorMessage(data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while validating OTP.');
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Email Verification</h2>
      {!otpSent ? (
        <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="email" style={{ marginBottom: '10px' }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Send OTP
          </button>
          {errorMessage && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              {errorMessage}
            </p>
          )}
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="otp" style={{ marginBottom: '10px' }}>Enter OTP</label>
          <input
            id="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter OTP"
            style={{
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#28A745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Validate OTP
          </button>
          {errorMessage && (
            <p style={{ color: 'red', marginTop: '10px' }}>
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}

export default Email;
