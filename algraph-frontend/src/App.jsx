import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppBar from './components/App-Bar/appbar.jsx'
import Login from './components/Login-Signup/login.jsx'
import SignUp from './components/Login-Signup/signup.jsx'

function App() {

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
