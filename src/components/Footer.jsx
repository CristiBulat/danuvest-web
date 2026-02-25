const navLinks = [
  { label: 'Acasă',              href: '#acasa' },
  { label: 'Misiunea Companiei', href: '#misiune' },
  { label: 'Servicii',           href: '#servicii' },
  { label: 'Despre Noi',         href: '#despre' },
  { label: 'Contact',            href: '#contact' },
]

const serviceLinks = [
  'Construcții la Cheie',
  'Construcții Rezidențiale',
  'Construcții Comerciale',
  'Renovări și Reabilitări',
  'Lucrări de Finisare',
  'Proiectare și Consultanță',
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <a href="#acasa">
                <img src="/logo.jpg" alt="Danuvest" className="navbar-logo-img" />
              </a>
            </div>
            <p className="footer-tagline">
              Partenerul tău de încredere în construcții din 2008.
              Calitate, profesionalism și seriozitate în fiecare proiect.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Facebook">fb</a>
              <a href="#" className="social-btn" aria-label="Instagram">ig</a>
              <a href="#" className="social-btn" aria-label="LinkedIn">in</a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4>Navigare</h4>
            <ul className="footer-links">
              {navLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Servicii</h4>
            <ul className="footer-links">
              {serviceLinks.map(label => (
                <li key={label}>
                  <a href="#servicii">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <span>Str. Mihai Eminescu 34,<br />Chișinău, MD-2012</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📞</span>
              <a href="tel:+37322345678">+373 22 345 678</a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉️</span>
              <a href="mailto:contact@danuvest.md">contact@danuvest.md</a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">🕐</span>
              <span>Luni – Vineri: 08:00 – 18:00</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Danuvest SRL. Toate drepturile rezervate.</span>
          <span>Construit cu ❤️ în Moldova</span>
        </div>
      </div>
    </footer>
  )
}
