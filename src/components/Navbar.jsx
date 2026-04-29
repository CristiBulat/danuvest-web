import { useState, useEffect } from 'react'
import site from '../data/site.json'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const [brandLeft, brandRight] = site.brandSplit.split('|')

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : 'transparent'}`}>
        <div className="container navbar-inner">

          {/* Logo + brand name */}
          <a href="#acasa" className="navbar-logo" onClick={closeMenu}>
            <img src={site.logo} alt={site.brandName} className="navbar-logo-img" />
            <span className="navbar-brand-name">{brandLeft}<span>{brandRight}</span></span>
          </a>

          {/* Desktop nav links — centered */}
          <ul className="navbar-links">
            {site.navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="navbar-cta">
            <a href="#contact" className="btn btn-primary">{site.ctaLabel}</a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Deschide meniu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {site.navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={closeMenu}
          >
            {link.label}
          </a>
        ))}
        <a href="#contact" className="btn btn-primary" onClick={closeMenu}>
          {site.ctaLabel}
        </a>
      </div>
    </>
  )
}
