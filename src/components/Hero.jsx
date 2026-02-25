export default function Hero() {
  return (
    <section className="hero" id="acasa">
      <div className="hero-bg" />

      <div className="container hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Companie de construcții fondată în 2008
        </div>

        <h1 className="hero-title">
          Construim cu <span className="accent">Calitate</span>
          <br />și Dedicare
        </h1>

        <p className="hero-subtitle">
          Danuvest este partenerul tău de încredere pentru proiecte de construcții
          rezidențiale și comerciale în Republica Moldova. Calitate înaltă,
          termene respectate, clienți mulțumiți.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Solicită Ofertă Gratuită →
          </a>
          <a href="#proiecte" className="btn btn-outline">
            Vezi Proiectele Noastre
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-value">500+</div>
            <div className="stat-label">Proiecte Finalizate</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">15+</div>
            <div className="stat-label">Ani de Experiență</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">100%</div>
            <div className="stat-label">Clienți Mulțumiți</div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">Scroll</div>
    </section>
  )
}
