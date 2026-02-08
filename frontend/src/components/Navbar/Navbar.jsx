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

  const [menuOpen, setMenuOpen] = useState(false)

  // initialize and handle resize
  useEffect(() => {
    updateUnderline(activeIndex)
    const handleResize = () => {
        updateUnderline(activeIndex)
        if (window.innerWidth > 768) {
            setMenuOpen(false)
        }
    }
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
    setMenuOpen(false) // Close menu on route change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
      
      <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`} ref={menuRef}>
        <img 
            src={assets.cross_icon} 
            alt="close" 
            className="menu-close-icon" 
            onClick={() => setMenuOpen(false)} 
        />
        {MENU_ITEMS.map((item, idx) => (
          <li
            key={item.label}
            ref={(el) => (itemRefs.current[idx] = el)}
            className={idx === activeIndex ? 'active' : ''}
          >
            {item.path ? (
              <Link to={item.path} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            ) : (
              <button
                type="button"
                className="nav-action"
                onClick={() => {
                    setActiveIndex(idx)
                    setMenuOpen(false)
                }}
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
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className="dot"></div>
        </div>
        <button>Sign In</button>
        <div className="navbar-hamburger" onClick={() => setMenuOpen(true)}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="#49557e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
      </div>
    </div>
  )
}

export default Navbar
