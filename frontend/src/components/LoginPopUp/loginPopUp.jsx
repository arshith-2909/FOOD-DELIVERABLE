import React, { useState } from 'react'
import './LoginPopUp.css'

const LoginPopUp = ({ open = true, onClose = () => {} }) => {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    acceptTerms: false
  })

  if (!open) return null

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((s) => ({
      ...s,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      alert('Please provide email and password')
      return
    }

    if (mode === 'signup' && !form.acceptTerms) {
      alert('Please accept the Terms of Use and Privacy Policy to continue.')
      return
    }

    console.info(mode === 'login' ? 'Logging in' : 'Signing up', form)
    onClose()
  }

  return (
    <div
      className="lp-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={mode === 'login' ? 'Login' : 'Sign up'}
    >
      <div className="lp-card">

        {/* Close X */}
        <span
          className="lp-close"
          onClick={onClose}
          role="button"
        >
          ×
        </span>

        {/* Header */}
        <div className="lp-header">
          <h3>{mode === 'login' ? 'Sign in' : 'Create account'}</h3>
          <p className="lp-sub">
            {mode === 'login'
              ? 'Sign in to continue to Food Deliverables'
              : 'Create an account to start ordering'}
          </p>
        </div>

        {/* Form */}
        <form className="lp-form" onSubmit={onSubmit}>

          {mode === 'signup' && (
            <label className="lp-field">
              <span>Name</span>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="Your full name"
              />
            </label>
          )}

          <label className="lp-field">
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="Your email"
            />
          </label>

          <label className="lp-field">
            <span>Password</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="password"
            />
          </label>

          {mode === 'signup' && (
            <label className="lp-terms">
              <input
                name="acceptTerms"
                type="checkbox"
                checked={form.acceptTerms}
                onChange={onChange}
              />
              <span>
                By continuing, I agree to the{' '}
                <a href="/terms" target="_blank" rel="noreferrer">
                  Terms of Use
                </a>{' '}
                &amp;{' '}
                <a href="/privacy" target="_blank" rel="noreferrer">
                  Privacy Policy
                </a>
              </span>
            </label>
          )}

          <button className="lp-submit" type="submit">
            {mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>

        {/* Footer */}
        <div className="lp-footer">
          {mode === 'login' ? (
            <p>
              Create a new account?
              <span
                className="lp-link"
                onClick={() => setMode('signup')}
              >
                {' '}Sign up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span
                className="lp-link"
                onClick={() => setMode('login')}
              >
                {' '}Login
              </span>
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default LoginPopUp