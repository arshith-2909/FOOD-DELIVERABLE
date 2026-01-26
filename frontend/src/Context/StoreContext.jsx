import React, { createContext, useContext, useEffect, useState } from 'react'
import { food_list } from '../assets/assets'

const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {
  // Cart is an array of items { _id, name, price, qty, ... }
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('fd_cart')
      return raw ? JSON.parse(raw) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('fd_cart', JSON.stringify(cart))
    } catch (e) {
      // ignore
    }
  }, [cart])

  const addToCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p._id === item._id)
      let newCart
      if (idx !== -1) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: (copy[idx].qty || 1) + 1 }
        newCart = copy
      } else {
        newCart = [...prev, { ...item, qty: 1 }]
      }
      // Log the addition for debugging / future cart integration
      try {
        console.info('[Store] addToCart:', { id: item._id, name: item.name, price: item.price }, '-> cart:', newCart)
      } catch (e) {
        // ignore logging errors
      }
      return newCart
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newCart = prev.filter((i) => i._id !== id)
      try {
        console.info('[Store] removeFromCart:', id, '-> cart:', newCart)
      } catch (e) {}
      return newCart
    })
  }

  const updateQty = (id, qty) => {
    setCart((prev) => {
      const newCart = prev.map((i) => (i._id === id ? { ...i, qty } : i))
      try {
        console.info('[Store] updateQty:', { id, qty }, '-> cart:', newCart)
      } catch (e) {}
      return newCart
    })
  }

  const clearCart = () => setCart([])

  const cartCount = cart.reduce((s, it) => s + (it.qty || 0), 0)
  const cartTotal = cart.reduce((s, it) => s + (it.price || 0) * (it.qty || 0), 0)

  // selection state (for menu/category selection)
  const [selectedMenuIndex, setSelectedMenuIndex] = useState(-1)
  const toggleMenuSelection = (idx) => setSelectedMenuIndex((cur) => (cur === idx ? -1 : idx))

  const value = {
    // expose food list from assets so components can consume via context
    food_list,
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    cartTotal,
    selectedMenuIndex,
    setSelectedMenuIndex,
    toggleMenuSelection,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside a StoreProvider')
  return ctx
}

export default StoreContext
