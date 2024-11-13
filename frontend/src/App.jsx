import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Otp from './Components/Otp'
import Email from './Components/email'
import { Home } from './Components/Home'
import { Route,Routes,useNavigate } from 'react-router-dom'

function App() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleEmailSubmit=(email)=>{
    setEmail(email);
    navigate('/check');
  }

  return (
    <>
   <Routes>
     <Route path='/' element={<Email onEmailSubmit={handleEmailSubmit}/>} />

      <Route path='/check' element={<Otp/>} />
      <Route path='/home' element={<Home/>} />
      </Routes >
    </>
  )
}

export default App
