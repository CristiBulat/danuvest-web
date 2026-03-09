import { useState, useEffect } from 'react'

const MESSAGES = [
  '👋 Bun venit la Danuvest! Suntem gata să construim visul tău!',
  '🏗️ Peste 500 de proiecte finalizate cu succes!',
  '📞 Solicită o consultație gratuită astăzi!',
  '✅ Garanție completă pe toate lucrările noastre.',
  '🏆 15+ ani de experiență în construcții.',
]

export default function Mascot() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [msgIndex, setMsgIndex] = useState(0)

  // Appear after 2.5s delay
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(t)
  }, [])

  // Cycle messages while hovering
  useEffect(() => {
    if (!hovered) return
    const t = setInterval(() => {
      setMsgIndex(i => (i + 1) % MESSAGES.length)
    }, 3000)
    return () => clearInterval(t)
  }, [hovered])

  return (
    <div className={`mascot-wrapper${visible ? ' mascot-visible' : ''}`}>
      {hovered && (
        <div className="mascot-bubble">
          <p>{MESSAGES[msgIndex]}</p>
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
          alt="Mascota Danuvest – constructor prietenos"
          className="mascot-img"
        />
      </button>
    </div>
  )
}
