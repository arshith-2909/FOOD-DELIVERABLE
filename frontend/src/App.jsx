import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import AppDownload from './components/AppDownload/AppDownload.jsx'
import Footer from './components/Footer/Footer.jsx'
import { Routes, Route } from "react-router-dom"

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'

const App = () => {
  return (
    <>
      <div className='app'>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeorder' element={<PlaceOrder />} />
        </Routes>
      </div>

      {/* 👇 ABOVE footer */}
      <AppDownload />

      {/* 👇 Footer at the very bottom */}
      <Footer />
    </>
  )
}

export default App
