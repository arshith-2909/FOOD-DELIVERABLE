import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import { assets } from '../../assets/assets'

const MENU_ITEMS = [
  { label: 'Home', path: '/' },
  // these are non-routing menu items — keep as actions (don't navigate)
  { label: 'Menu', path: null },
  { label: 'Mobile-app', path: null },
  { label: 'Contact Us', path: null },
]

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })
  const menuRef = useRef(null)
  const itemRefs = useRef([])
  const location = useLocation()

  const updateUnderline = (index = activeIndex) => {
    const el = itemRefs.current[index]
    if (!el) return

    const left = el.offsetLeft
    const width = el.offsetWidth

    setUnderlineStyle({ left, width })
  }

  // initialize and handle resize
  useEffect(() => {
    updateUnderline(activeIndex)
    const handleResize = () => updateUnderline(activeIndex)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // update underline when activeIndex changes
  useEffect(() => {
    updateUnderline(activeIndex)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  // update activeIndex when route changes
  useEffect(() => {
    const idx = MENU_ITEMS.findIndex((m) => m.path === location.pathname)
    setActiveIndex(idx === -1 ? 0 : idx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
      <ul className="navbar-menu" ref={menuRef}>
        {MENU_ITEMS.map((item, idx) => (
          <li
            key={item.label}
            ref={(el) => (itemRefs.current[idx] = el)}
            className={idx === activeIndex ? 'active' : ''}
          >
            {item.path ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <button
                type="button"
                className="nav-action"
                onClick={() => setActiveIndex(idx)}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
        <span
          className="underline"
          style={{ left: underlineStyle.left, width: underlineStyle.width }}
        />
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  )
}

export default Navbar
