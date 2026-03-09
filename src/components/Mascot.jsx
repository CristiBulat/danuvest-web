import { useState, useEffect } from 'react'

export default function Mascot() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`mascot-wrapper${visible ? ' mascot-visible' : ''}`}>
      {hovered && (
        <div className="mascot-bubble">
          <p>👋 Bun venit la Danuvest!</p>
          <div className="mascot-bubble-tail" />
        </div>
      )}

      <button
        className="mascot-btn"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Mascota Danuvest"
      >
        <img
          src="/mascot.svg"
          alt="Mascota Danuvest"
          className="mascot-img"
        />
      </button>
    </div>
  )
}
