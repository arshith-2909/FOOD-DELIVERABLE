import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
import { useStore } from '../../Context/StoreContext'

const ExploreMenu = () => {
  const { selectedMenuIndex, toggleMenuSelection } = useStore()

  const handleImageKey = (e, idx) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleMenuSelection(idx)
    }
  }

  return (
    <section className="explore-menu">
      <h3 className="explore-heading">Explore our menu</h3>
      <p>Choose from a wide variety of delicious dishes and have them delivered to your doorstep.</p>
      <div className="menu-grid">
        {menu_list.map((m, idx) => (
          <div
            className={`menu-item ${idx === selectedMenuIndex ? 'active' : ''}`}
            key={m.menu_name}
          >
            <div
              className="menu-image"
              role="button"
              tabIndex={0}
              onClick={() => toggleMenuSelection(idx)}
              onKeyDown={(e) => handleImageKey(e, idx)}
              aria-pressed={idx === selectedMenuIndex}
            >
              <img src={m.menu_image} alt={m.menu_name} />
            </div>
            <div className="menu-name">{m.menu_name}</div>
          </div>
        ))}
      </div>
      {/* divider after menu */}
      <div className="explore-divider" aria-hidden="true" />
    </section>
  )
}

export default ExploreMenu
   
