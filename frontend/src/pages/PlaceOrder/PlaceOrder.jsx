import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../Context/StoreContext'
import './PlaceOrder.css'

const rupeeFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })

const PlaceOrder = () => {
  const { cartTotal, clearCart } = useStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    mobile: '',
  })

  const [errors, setErrors] = useState({})

  const delivery = cartTotal >= 200 ? 0 : cartTotal === 0 ? 0 : 40
  const grandTotal = Math.max(0, cartTotal) + (delivery === 0 ? 0 : delivery)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const validate = () => {
    const err = {}
    if (!form.firstName.trim()) err.firstName = 'First name is required'
    if (!form.lastName.trim()) err.lastName = 'Last name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Enter a valid email'
    if (!form.street.trim()) err.street = 'Street is required'
    if (!form.mobile.trim() || !/^\d{7,15}$/.test(form.mobile.replace(/\D/g, ''))) err.mobile = 'Enter a valid mobile number'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // For the demo we'll clear the cart and navigate to a simple confirmation
    clearCart()
    navigate('/')
    // small confirmation
    setTimeout(() => alert('Order placed successfully — we redirected to home.'), 100)
  }

  return (
    <div className="placeorder-page">
      <div className="po-container">
        <h2>Delivery information</h2>
        <form className="po-form" onSubmit={handleSubmit} noValidate>
          <div className="row two">
            <label>
              First name
              <input name="firstName" value={form.firstName} onChange={handleChange} />
              {errors.firstName && <div className="field-error">{errors.firstName}</div>}
            </label>
            <label>
              Last name
              <input name="lastName" value={form.lastName} onChange={handleChange} />
              {errors.lastName && <div className="field-error">{errors.lastName}</div>}
            </label>
          </div>

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </label>

          <label>
            Street / Address line
            <input name="street" value={form.street} onChange={handleChange} />
            {errors.street && <div className="field-error">{errors.street}</div>}
          </label>

          <div className="row two">
            <label>
              City
              <input name="city" value={form.city} onChange={handleChange} />
            </label>
            <label>
              Mobile number
              <input name="mobile" value={form.mobile} onChange={handleChange} />
              {errors.mobile && <div className="field-error">{errors.mobile}</div>}
            </label>
          </div>

          <div className="po-actions">
            <button type="submit" className="submit">Place order</button>
          </div>
        </form>
      </div>

      <aside className="po-summary">
        <h3>Order summary</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{rupeeFormatter.format(cartTotal)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>{delivery === 0 ? 'Free' : rupeeFormatter.format(delivery)}</span>
        </div>
        <div className="summary-row grand">
          <span>Total</span>
          <span>{rupeeFormatter.format(grandTotal)}</span>
        </div>
      </aside>
    </div>
  )
}

export default PlaceOrder
