import React, { useMemo } from 'react'
import './FoodDisplay.css'
import { useStore } from '../../Context/StoreContext'
import { assets, menu_list } from '../../assets/assets'

const FoodDisplay = () => {
  const { food_list = [], addToCart, cart = [], updateQty, removeFromCart, selectedMenuIndex } = useStore()

  // Formatter for INR price
  const rupeeFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }),
    []
  )

  return (
    <section className="food-display">
      <h3 className="food-heading">Popular dishes near you</h3>

      <div className="food-grid">
        {(
          (selectedMenuIndex === -1
            ? food_list
            : food_list.filter((f) => f.category === (menu_list[selectedMenuIndex]?.menu_name || ''))
          )
        ).map((f) => (
          <div className="food-card" key={f._id}>
            
            <div className="food-image">
              <img src={f.image} alt={f.name} />

              {/* quantity counter overlay (bottom-right) */}
              <div className="image-counter" role="group" aria-label="quantity selector">
                {(() => {
                  const inCart = cart.find((c) => c._id === f._id)
                  const qty = inCart ? inCart.qty || 0 : 0
                  // when qty is zero show only a single + button
                  if (qty === 0) {
                    return (
                      <button
                        className="counter-btn plus single"
                        onClick={() => addToCart(f)}
                        aria-label={`Add ${f.name}`}
                      >
                        +
                      </button>
                    )
                  }

                  // when qty > 0 show minus, qty and plus
                  return (
                    <>
                      <button
                        className="counter-btn minus"
                        onClick={() => {
                          if (qty > 1) updateQty(f._id, qty - 1)
                          else if (qty === 1) removeFromCart(f._id)
                        }}
                        aria-label={`Decrease quantity of ${f.name}`}
                      >
                        −
                      </button>
                      <span className="counter-value">{qty}</span>
                      <button
                        className="counter-btn plus"
                        onClick={() => addToCart(f)}
                        aria-label={`Increase quantity of ${f.name}`}
                      >
                        +
                      </button>
                    </>
                  )
                })()}
              </div>
            </div>

            <div className="food-info">
              <div className="food-name">{f.name}</div>

              <div className="food-rating">
                <img src={assets.rating_starts} alt="rating" />
                <span className="rating-value">4.5</span>
              </div>
            </div>

            <div className="food-description">{f.description}</div>

            {/* price shown where the Add button used to be */}
            <div className="food-price-block">{rupeeFormatter.format(f.price)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FoodDisplay
