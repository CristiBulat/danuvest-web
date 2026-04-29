import { useState, useEffect } from 'react'
import hero from '../data/hero.json'

export default function Hero() {
  const [bannerOpacity, setBannerOpacity] = useState(0)

  useEffect(() => {
    const fadeIn  = setTimeout(() => setBannerOpacity(1), 500)
    const fadeOut = setTimeout(() => setBannerOpacity(0), 4000)
    return () => { clearTimeout(fadeIn); clearTimeout(fadeOut) }
  }, [])

  return (
    <section className="hero" id="acasa">
      <div className="hero-bg" />

      <div className="container">
        <div className="hero-inner">

          {/* ── Left column: text content ── */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              {hero.badge}
            </div>

            <h1 className="hero-title">
              {hero.titleLead} <span className="accent">{hero.titleAccent}</span>
              <br />{hero.titleTrail}
            </h1>

            <p className="hero-subtitle">
              {hero.subtitle}
            </p>

            <div className="hero-actions">
              <a href={hero.ctaPrimary.href} className="btn btn-primary">
                {hero.ctaPrimary.label}
              </a>
              <a href={hero.ctaSecondary.href} className="btn btn-outline">
                {hero.ctaSecondary.label}
              </a>
            </div>

            <div className="hero-trust">
              {hero.trust.map(t => (
                <div className="hero-trust-item" key={t}>
                  <span className="trust-icon">✓</span>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: stats grid ── */}
          <div className="hero-right">
            <div className="hero-stats-grid">
              {hero.stats.map(s => (
                <div className="hero-stat-card" key={s.label}>
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div className="scroll-indicator">Scroll</div>

      {/* Mobile-only welcome banner — fixed at bottom, fades out after 4s */}
      <div className="mobile-welcome-banner" style={{ opacity: bannerOpacity, pointerEvents: bannerOpacity === 0 ? 'none' : 'auto' }}>
        <span className="mobile-welcome-icon">{hero.mobileBanner.icon}</span>
        <div>
          <p className="mobile-welcome-title">{hero.mobileBanner.title}</p>
          <p className="mobile-welcome-sub">{hero.mobileBanner.subtitle}</p>
        </div>
      </div>
    </section>
  )
}
