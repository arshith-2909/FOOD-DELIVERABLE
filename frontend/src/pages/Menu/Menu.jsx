import React from 'react'
import './Menu.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const Menu = () => {
  return (
    <div className="menu-page">
      <main className="menu-list">
        <h2 style={{ margin: '16px 0', fontSize: '1.6rem' }}>Our Menu</h2>
        {/* keep category selector near the top for filtering */}
        <ExploreMenu />

        {/* full food listing */}
        <FoodDisplay />
      </main>
      
    </div>
  )
}

export default Menu
