import React, { useState } from 'react';
import axios from 'axios';

function Email({ onEmailSubmit }) {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle email form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message on new submission
    try {
      // Send email to backend to trigger OTP generation
      const response = await axios.post('http://localhost:4000/user/send-otp', { email });
      const data = response.data;

      console.log(data); // Log response for debugging

      if (data.success) {
        onEmailSubmit(email); // Pass email to parent component if OTP sent successfully
      } else {
        setErrorMessage('Error sending OTP. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while sending OTP.');
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Email Verification</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
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
    </div>
  );
}

export default Email;
