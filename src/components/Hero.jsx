const stats = [
  { value: '500+', label: 'Proiecte Finalizate' },
  { value: '15+',  label: 'Ani de Experiență' },
  { value: '300+', label: 'Clienți Mulțumiți' },
  { value: '2008', label: 'An Fondare' },
]

export default function Hero() {
  return (
    <section className="hero" id="acasa">
      <div className="hero-bg" />

      <div className="container">
        <div className="hero-inner">

          {/* ── Left column: text content ── */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Companie de construcții fondată în 2008
            </div>

            <h1 className="hero-title">
              Construim cu <span className="accent">Calitate</span>
              <br />și Dedicare
            </h1>

            <p className="hero-subtitle">
              Danuvest este partenerul tău de încredere pentru proiecte de
              construcții rezidențiale și comerciale în Republica Moldova.
              Calitate înaltă, termene respectate, clienți mulțumiți.
            </p>

            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Solicită Consultație Gratuită →
              </a>
              <a href="#misiune" className="btn btn-outline">
                Află Mai Mult
              </a>
            </div>

            <div className="hero-trust">
              <div className="hero-trust-item">
                <span className="trust-icon">✓</span>
                Garanție pe lucrări
              </div>
              <div className="hero-trust-item">
                <span className="trust-icon">✓</span>
                Consultanță gratuită
              </div>
              <div className="hero-trust-item">
                <span className="trust-icon">✓</span>
                Termene respectate
              </div>
            </div>
          </div>

          {/* ── Right column: stats grid ── */}
          <div className="hero-right">
            <div className="hero-stats-grid">
              {stats.map(s => (
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

      {/* Mobile-only welcome banner */}
      <div className="mobile-welcome-banner">
        <span className="mobile-welcome-icon">🏗️</span>
        <div>
          <p className="mobile-welcome-title">Bun venit pe Danuvest!</p>
          <p className="mobile-welcome-sub">Derulați în jos pentru a descoperi proiectele noastre</p>
        </div>
      </div>
    </section>
  )
}
