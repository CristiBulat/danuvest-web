import footer from '../data/footer.json'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-logo">
              <a href="#acasa">
                <img src={footer.logo} alt="Danuvest" className="navbar-logo-img" />
              </a>
            </div>
            <p className="footer-tagline">
              {footer.tagline}
            </p>
            <div className="footer-social">
              {footer.social.map(s => (
                <a key={s.label} href={s.href} className="social-btn" aria-label={s.label}>{s.short}</a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4>{footer.navTitle}</h4>
            <ul className="footer-links">
              {footer.navLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>{footer.servicesTitle}</h4>
            <ul className="footer-links">
              {footer.serviceLinks.map(label => (
                <li key={label}>
                  <a href="#servicii">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>{footer.contactTitle}</h4>
            {footer.contactItems.map((item, i) => {
              const lines = item.text.split('|')
              const content = lines.map((line, j) => (
                <span key={j}>
                  {line}
                  {j < lines.length - 1 && <br />}
                </span>
              ))
              return (
                <div className="footer-contact-item" key={i}>
                  <span className="footer-contact-icon">{item.icon}</span>
                  {item.href ? <a href={item.href}>{content}</a> : <span>{content}</span>}
                </div>
              )
            })}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {footer.copyright}</span>
        </div>
      </div>
    </footer>
  )
}
