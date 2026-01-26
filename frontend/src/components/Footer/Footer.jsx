import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={assets.logo} alt="logo" className="footer-logo" />
          <p className="tag">Delicious food delivered fast — wherever you are.</p>

          <div className="social-row">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src={assets.facebook_icon} alt="facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <img src={assets.twitter_icon} alt="twitter" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <img src={assets.linkedin_icon} alt="linkedin" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About us</a></li>
            <li><a href="/delivery">Delivery</a></li>
            <li><a href="/privacy">Privacy policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Get in touch</h4>
          <p className="contact"><a href="mailto:contact@fooddeliverables.com">contact@fooddeliverables.com</a></p>
          <p className="contact"><a href="tel:+91-1234567890">+91-12345 67890</a></p>

          
        </div>
      </div>

  <div className="footer-divider" />
  <div className="footer-bottom">© {new Date().getFullYear()} Food Deliverables. All rights reserved.</div>
    </footer>
  )
}

export default Footer
