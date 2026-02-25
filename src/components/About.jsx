const stats = [
  { num: '500+', text: 'Proiecte Finalizate' },
  { num: '15+',  text: 'Ani de Experiență' },
  { num: '300+', text: 'Clienți Mulțumiți' },
  { num: '50+',  text: 'Specialiști în Echipă' },
]

export default function About() {
  return (
    <section className="section about" id="despre">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <span className="section-label">Despre Noi</span>
            <h2 className="section-title">
              Experiența noastră<br />vorbește de la sine
            </h2>

            <p className="about-text">
              Fondată în 2008, Danuvest s-a impus ca un lider în industria
              construcțiilor din Republica Moldova. Specializați în proiecte
              rezidențiale și comerciale de mici și mijlocii dimensiuni, ne mândrim
              cu o abordare care îmbină tradiția meșteșugărească cu tehnologiile
              moderne de construcție.
            </p>

            <p className="about-text">
              Fiecare proiect este tratat cu aceeași dedicare și atenție față de
              detalii, indiferent de dimensiune sau complexitate. Suntem certificați
              conform standardelor naționale și europene în domeniu și ne angajăm să
              respectăm întotdeauna termenele și bugetele stabilite.
            </p>

            <div className="about-stats">
              {stats.map(s => (
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
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80"
                alt="Echipa Danuvest pe șantier"
                loading="lazy"
              />
            </div>
            <div className="about-experience">
              <div className="exp-num">15+</div>
              <div className="exp-text">Ani pe piață</div>
            </div>
            <div className="about-cert">
              <div className="cert-icon">🏅</div>
              <div className="cert-text">Certificat<br />ISO 9001</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
