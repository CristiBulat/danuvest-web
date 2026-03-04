const values = [
  { icon: '🏆', title: 'Calitate' },
  { icon: '🤝', title: 'Integritate' },
  { icon: '⚡', title: 'Profesionalism' },
]

export default function Mission() {
  return (
    <section className="section mission" id="misiune">
      <div className="container">
        <div className="mission-grid">
          <div className="mission-image">
            <div className="mission-image-inner">
              <img
                src="/contruction_mission.jpg"
                alt="Echipa Danuvest la lucru pe un șantier"
                loading="lazy"
              />
            </div>
            <div className="mission-badge">
              <div className="mission-badge-value">500+</div>
              <div className="mission-badge-text">Proiecte finalizate</div>
            </div>
          </div>

          <div className="mission-content">
            <span className="section-label">Misiunea Companiei</span>
            <h2 className="section-title">
              Construim mai mult<br />decât simple clădiri
            </h2>

            <blockquote className="mission-quote">
              „Ne dedicăm să oferim cele mai înalte standarde de calitate în
              construcții, respectând fiecare termen și fiecare detaliu al
              proiectelor încredințate nouă de clienții noștri."
            </blockquote>

            <p className="section-desc">
              Fondată în 2008, Danuvest a crescut pentru a deveni una dintre
              companiile de construcții de referință din Republica Moldova.
              Cu o echipă de profesioniști dedicați și o experiență vastă,
              transformăm viziunile clienților noștri în realitate concretă,
              durabilă și estetică.
            </p>

            <div className="mission-values">
              {values.map(v => (
                <div className="value-card" key={v.title}>
                  <div className="value-icon">{v.icon}</div>
                  <div className="value-title">{v.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
