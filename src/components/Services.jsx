import services from '../data/services.json'

export default function Services() {
  return (
    <section className="section services" id="servicii">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{services.label}</span>
          <h2 className="section-title">{services.title}</h2>
          <p className="section-desc">
            {services.description}
          </p>
        </div>

        <div className="services-grid">
          {services.items.map(s => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
