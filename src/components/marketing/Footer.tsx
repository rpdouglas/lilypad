import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/start', label: 'Start a Project' },
]

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="max-w-content mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              to="/"
              className="font-display text-2xl font-light tracking-wide hover:text-coral-light transition-colors duration-150"
            >
              Lily Pad
            </Link>
            <p className="font-sans text-sm text-stone mt-3 leading-relaxed">
              Strategy and design for founders who are done playing small.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-sans text-[13px] font-medium text-stone hover:text-cream transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA */}
          <div>
            <p className="font-sans text-sm text-stone mb-4 leading-relaxed">
              Ready to build something worth believing in?
            </p>
            <Link
              to="/start"
              className="inline-block font-sans text-[13px] font-medium bg-coral text-cream px-5 py-2.5 rounded-md hover:bg-coral-light transition-colors duration-150"
            >
              Book a discovery call
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-stone/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="font-mono text-[11px] text-stone tracking-[0.15em]">
            © {new Date().getFullYear()} LILY PAD STRATEGY & DESIGN
          </p>
          <p className="font-mono text-[11px] text-stone tracking-[0.15em]">
            ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  )
}
