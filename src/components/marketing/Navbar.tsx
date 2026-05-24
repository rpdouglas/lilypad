import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-forest sticky top-0 z-50">
      <nav className="max-w-content mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center hover:opacity-90 active:scale-95 transition-all duration-150"
          aria-label="Lily Pad Strategy & Design Home"
        >
          <img
            src="/lily_pad_banner_logo.png"
            className="h-6 lg:h-7 w-auto object-contain"
            alt="Lily Pad Logo"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-sans text-[13px] font-medium transition-colors duration-150 ${
                  isActive ? 'text-cream' : 'text-stone hover:text-cream'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/start"
            className="font-sans text-[13px] font-medium bg-coral text-cream px-4 py-2 rounded-md hover:bg-coral-light transition-colors duration-150"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
          className="lg:hidden flex flex-col gap-1.5 p-2 text-cream rounded-sm focus-visible:outline-none focus-visible:shadow-coral"
        >
          <span
            className={`block w-5 h-px bg-current transition-transform duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-px bg-current transition-transform duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden bg-forest border-t border-forest-mid px-6 pb-6 flex flex-col gap-4">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-sans text-[13px] font-medium py-2 transition-colors duration-150 ${
                  isActive ? 'text-cream' : 'text-stone hover:text-cream'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/start"
            onClick={() => setOpen(false)}
            className="font-sans text-[13px] font-medium bg-coral text-cream px-4 py-2.5 rounded-md text-center hover:bg-coral-light transition-colors duration-150 mt-2"
          >
            Start a Project
          </Link>
        </div>
      )}
    </header>
  )
}
