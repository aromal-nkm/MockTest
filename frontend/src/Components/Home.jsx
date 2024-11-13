import React from 'react'

export const Home = () => {
  const welcomeStyle = {
    fontSize: '2rem',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: '50px',
    fontWeight: 'bold',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={welcomeStyle}>Welcome to Our Website!</h1>
    </div>
  )
}
