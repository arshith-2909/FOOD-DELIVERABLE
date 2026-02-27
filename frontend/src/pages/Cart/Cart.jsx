import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../Context/StoreContext'
import './Cart.css'

function Cart() {
  const { cart, updateQty, removeFromCart, cartTotal } = useStore()
  const navigate = useNavigate()

  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [promoMessage, setPromoMessage] = useState('')

  const rupeeFormatter = useMemo(
    () => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }),
    []
  )

  useEffect(() => {
    if (!cart || cart.length === 0) {
      setDiscount(0)
      setPromoMessage('')
    }
  }, [cart])

  const applyPromo = () => {
    const code = (promo || '').trim().toUpperCase()
    if (!code) {
      setPromoMessage('Enter a promo code')
      return
    }
    if (cartTotal <= 0) {
      setPromoMessage('Add items to cart before applying promo')
      return
    }

    if (code === 'FOOD10') {
      const d = Math.round(cartTotal * 0.1)
      setDiscount(d)
      setPromoMessage('10% off applied')
    } else if (code === 'FLAT50') {
      const d = Math.min(50, cartTotal)
      setDiscount(d)
      setPromoMessage('₹50 off applied')
    } else {
      setDiscount(0)
      setPromoMessage('Invalid promo code')
    }
  }

  const delivery = cartTotal >= 200 ? 0 : cartTotal === 0 ? 0 : 40

  const grandTotal = Math.max(0, cartTotal - (discount || 0)) + (delivery === 0 ? 0 : delivery)

  const onPlaceOrder = () => {
    // for now navigate to placeorder page which exists
    navigate('/placeorder')
  }

  return (
    <div className="cart-page">
      <div className="cart-items">
        <div className="cart-table">
          <div className="cart-row cart-header">
            <div className="col col-image">Item</div>
            <div className="col col-title">Title</div>
            <div className="col col-price">Price</div>
            <div className="col col-qty">Quantity</div>
            <div className="col col-total">Total</div>
          </div>

          {cart.length === 0 ? (
            <div className="cart-row empty-row">
              <div className="empty-msg">Your cart is empty.</div>
            </div>
          ) : (
            cart.map((it) => (
              <div className="cart-row" key={it._id}>
                <div className="col col-image">
                  <img src={it.image} alt={it.name} />
                </div>

                <div className="col col-title">
                  <div className="item-name">{it.name}</div>
                </div>

                <div className="col col-price">{rupeeFormatter.format(it.price)}</div>

                <div className="col col-qty">
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => {
                        if ((it.qty || 0) > 1) updateQty(it._id, (it.qty || 0) - 1)
                        else removeFromCart(it._id)
                      }}
                      aria-label={`Decrease quantity of ${it.name}`}
                    >
                      −
                    </button>
                    <div className="qty-value">{it.qty || 0}</div>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(it._id, (it.qty || 0) + 1)}
                      aria-label={`Increase quantity of ${it.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="col col-total">{rupeeFormatter.format((it.price || 0) * (it.qty || 0))}</div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <h3>Order summary</h3>
          <div className="promo-section">
            <label className="promo-label">Have a promo code?</label>
            <div className="promo-row">
              <input
                className="promo-input"
                placeholder="Enter code (e.g. FOOD10 or FLAT50)"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
              />
              <button className="promo-apply" type="button" onClick={applyPromo}>
                Apply
              </button>
            </div>
            {promoMessage && <div className="promo-msg">{promoMessage}</div>}
            {discount > 0 && <div className="promo-applied">Discount applied: {rupeeFormatter.format(discount)}</div>}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{rupeeFormatter.format(cartTotal)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? 'Free' : rupeeFormatter.format(delivery)}</span>
          </div>
          <div className="summary-note">Free delivery for orders above {rupeeFormatter.format(200)}</div>
          <div className="summary-row grand">
            <span>Total</span>
            <span>{rupeeFormatter.format(grandTotal)}</span>
          </div>

          <button className="place-order" onClick={onPlaceOrder} disabled={cart.length === 0}>
            Place order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
