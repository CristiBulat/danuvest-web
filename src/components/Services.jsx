const services = [
  {
    icon: '🏗️',
    title: 'Construcții la Cheie',
    desc: 'Realizăm proiecte complete de construcție, de la fundație până la finisare, cu supraveghere tehnică totală și garanție pe lucrări.',
  },
  {
    icon: '🏘️',
    title: 'Construcții Rezidențiale',
    desc: 'Case și vile individuale, blocuri de locuințe — construite conform standardelor europene de calitate și siguranță.',
  },
  {
    icon: '🏢',
    title: 'Construcții Comerciale',
    desc: 'Sedii de birouri, centre comerciale și spații industriale, proiectate pentru funcționalitate maximă și estetică modernă.',
  },
  {
    icon: '🔧',
    title: 'Renovări și Reabilitări',
    desc: 'Revitalizăm clădiri existente, îmbunătățindu-le aspectul, funcționalitatea și eficiența energetică conform cerințelor moderne.',
  },
  {
    icon: '🎨',
    title: 'Lucrări de Finisare',
    desc: 'Finisaje interioare și exterioare de înaltă calitate — tencuieli decorative, placări, zugrăveli, pardoseli și tavane.',
  },
  {
    icon: '📐',
    title: 'Proiectare și Consultanță',
    desc: 'Oferim servicii complete de proiectare arhitecturală și consultanță tehnică pentru orice tip de proiect de construcție.',
  },
]

export default function Services() {
  return (
    <section className="section services" id="servicii">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Servicii</span>
          <h2 className="section-title">Ce oferim</h2>
          <p className="section-desc">
            De la proiectare la execuție, oferim o gamă completă de servicii de
            construcții adaptate nevoilor și bugetului fiecărui client.
          </p>
        </div>

        <div className="services-grid">
          {services.map(s => (
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
