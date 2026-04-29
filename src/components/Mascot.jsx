import { useState, useEffect } from 'react'
import mascot from '../data/mascot.json'

export default function Mascot() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), mascot.showAfterMs)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`mascot-wrapper${visible ? ' mascot-visible' : ''}`}>
      {hovered && (
        <div className="mascot-bubble">
          <p>{mascot.greeting}</p>
          <div className="mascot-bubble-tail" />
        </div>
      )}

      <button
        className="mascot-btn"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={mascot.alt}
      >
        <img
          src={mascot.image}
          alt={mascot.alt}
          className="mascot-img"
        />
      </button>
    </div>
  )
}
