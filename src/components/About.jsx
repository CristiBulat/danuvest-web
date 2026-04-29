import about from '../data/about.json'

export default function About() {
  const [titleA, titleB] = about.title.split('|')

  return (
    <section className="section about" id="despre">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-label">{about.label}</span>
            <h2 className="section-title">
              {titleA}{titleB && <><br />{titleB}</>}
            </h2>

            {about.paragraphs.map((p, i) => (
              <p className="about-text" key={i}>{p}</p>
            ))}

            <div className="about-stats">
              {about.stats.map(s => (
                <div className="about-stat" key={s.text}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-text">{s.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="about-visual">
            <div className="about-img-wrap">
              <img
                src={about.image}
                alt={about.imageAlt}
                loading="lazy"
              />
            </div>
            <div className="about-experience">
              <div className="exp-num">{about.experienceNum}</div>
              <div className="exp-text">{about.experienceText}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
