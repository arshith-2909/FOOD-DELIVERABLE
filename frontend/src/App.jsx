import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'

const App = () => {
  return (
      <div className='app'>
        {/* debug banner - remove after verifying rendering */}
        <div style={{background: '#ff6', padding: '8px', textAlign: 'center'}}>
          App rendering check — if you see this, React is mounted.
        </div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/placeorder' element={<PlaceOrder/>} />
        </Routes>
      </div>
  )
}

export default App
