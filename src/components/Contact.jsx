import { useState } from 'react'
import contact from '../data/contact.json'

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '',
  })
  const [sent, setSent] = useState(false)

  const handleChange = e =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{contact.label}</span>
          <h2 className="section-title">{contact.title}</h2>
          <p className="section-desc">
            {contact.description}
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            {contact.info.map(item => (
              <div className="contact-info-item" key={item.title}>
                <div className="contact-icon">{item.icon}</div>
                <div className="contact-detail">
                  <h4>{item.title}</h4>
                  {item.href ? (
                    <a href={item.href}>
                      {item.lines.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < item.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </a>
                  ) : (
                    <p>
                      {item.lines.map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < item.lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form-wrapper">
            {sent ? (
              <div className="form-success">
                <div className="success-icon">✅</div>
                <h3>{contact.successTitle}</h3>
                <p>{contact.successMessage}</p>
              </div>
            ) : (
              <>
                <h3>{contact.formTitle}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Nume Complet *</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Ion Popescu"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Telefon *</label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+373 6X XXX XXX"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="exemplu@email.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Serviciu de Interes</label>
                    <div className="service-selector">
                      {contact.services.map(s => (
                        <button
                          key={s}
                          type="button"
                          className={`service-chip${form.service === s ? ' active' : ''}`}
                          onClick={() => setForm(prev => ({ ...prev, service: s }))}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Descrieți Proiectul</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Descrieți pe scurt proiectul dumneavoastră..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary form-submit">
                    {contact.formSubmit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
