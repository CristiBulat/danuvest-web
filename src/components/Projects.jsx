const projects = [
  {
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&auto=format&fit=crop&q=80',
    category: 'Rezidențial',
    name: 'Complex Rezidențial „Magnolia"',
    year: '2023',
    desc: 'Complex modern cu 48 de apartamente, Chișinău',
  },
  {
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    category: 'Comercial',
    name: 'Sediu Corporativ „TechHub"',
    year: '2023',
    desc: 'Clădire de birouri pe 5 etaje, 3.200 m², Chișinău',
  },
  {
    img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&auto=format&fit=crop&q=80',
    category: 'Comercial',
    name: 'Centru Comercial „Prut"',
    year: '2022',
    desc: 'Centru comercial cu 3 niveluri, Bălți',
  },
  {
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
    category: 'Rezidențial',
    name: 'Vilă Privată în Codru',
    year: '2022',
    desc: 'Vilă individuală de 280 m² cu piscină, Chișinău',
  },
  {
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop&q=80',
    category: 'Renovare',
    name: 'Reabilitare Bloc Str. Trandafirilor',
    year: '2023',
    desc: 'Renovare completă a unui bloc din 1985, Chișinău',
  },
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop&q=80',
    category: 'Rezidențial',
    name: 'Bloc de Locuințe „Panorama"',
    year: '2021',
    desc: '64 apartamente cu vedere panoramică, Chișinău',
  },
]

export default function Projects() {
  return (
    <section className="section projects" id="proiecte">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Portofoliu</span>
          <h2 className="section-title">Proiectele noastre</h2>
          <p className="section-desc">
            Peste 500 de proiecte finalizate cu succes în toată Republica Moldova.
            Iată câteva din lucrările noastre reprezentative.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map(p => (
            <div className="project-card" key={p.name}>
              <div className="project-img">
                <img src={p.img} alt={p.name} loading="lazy" />
                <div className="project-overlay">
                  <span className="project-overlay-text">{p.desc}</span>
                </div>
              </div>
              <div className="project-info">
                <div className="project-category">{p.category}</div>
                <div className="project-name">{p.name}</div>
                <div className="project-year">{p.year}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-more">
          <a href="#contact" className="btn btn-outline-dark">
            Solicită un Proiect Similar
          </a>
        </div>
      </div>
    </section>
  )
}
