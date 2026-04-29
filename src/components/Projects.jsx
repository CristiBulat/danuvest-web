import projects from '../data/projects.json'

export default function Projects() {
  return (
    <section className="section projects" id="proiecte">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{projects.label}</span>
          <h2 className="section-title">{projects.title}</h2>
          <p className="section-desc">
            {projects.description}
          </p>
        </div>

        <div className="projects-grid">
          {projects.items.map(p => (
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
          <a href={projects.ctaHref} className="btn btn-outline-dark">
            {projects.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  )
}
