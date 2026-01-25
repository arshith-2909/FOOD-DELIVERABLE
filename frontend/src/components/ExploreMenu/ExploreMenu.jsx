import React, { useState } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = () => {
  const [activeIndex, setActiveIndex] = useState(-1)

  const handleKey = (e, idx) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveIndex(idx)
    }
  }

  return (
    <section className="explore-menu">
      <h3 className="explore-heading">Explore our menu</h3>
      <p>Choose from a wide variety of delicious dishes and have them delivered to your doorstep.</p>
      <div className="menu-grid">
        {menu_list.map((m, idx) => (
          <div
            className={`menu-item ${idx === activeIndex ? 'active' : ''}`}
            key={m.menu_name}
            onClick={() => setActiveIndex(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKey(e, idx)}
            aria-pressed={idx === activeIndex}
          >
            <div className="menu-image">
              <img src={m.menu_image} alt={m.menu_name} />
            </div>
            <div className="menu-name">{m.menu_name}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ExploreMenu
   
