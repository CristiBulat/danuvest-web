import mission from '../data/mission.json'

export default function Mission() {
  const [titleA, titleB] = mission.title.split('|')

  return (
    <section className="section mission" id="misiune">
      <div className="container">
        <div className="mission-grid">
          <div className="mission-image">
            <div className="mission-image-inner">
              <img
                src={mission.image}
                alt={mission.imageAlt}
                loading="lazy"
              />
            </div>
            <div className="mission-badge">
              <div className="mission-badge-value">{mission.badgeValue}</div>
              <div className="mission-badge-text">{mission.badgeText}</div>
            </div>
          </div>

          <div className="mission-content">
            <span className="section-label">{mission.label}</span>
            <h2 className="section-title">
              {titleA}{titleB && <><br />{titleB}</>}
            </h2>

            <blockquote className="mission-quote">
              „{mission.quote}"
            </blockquote>

            <p className="section-desc">
              {mission.description}
            </p>

            <div className="mission-values">
              {mission.values.map(v => (
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
