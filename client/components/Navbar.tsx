import { useState } from 'react'

function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { id: 'hero', label: 'Inicio' },
    { id: 'story', label: 'Historia' },
    { id: 'services', label: 'Terapias' },
    { id: 'benefits', label: 'Beneficios' },
    { id: 'about-paula', label: 'Sobre Paula' },
    //{ id: 'testimonials', label: 'Testimonios' }, - This feature is currently on pause.
    { id: 'faq', label: 'Preguntas' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#faf7f2]/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 lg:px-16 py-4">
        <img src="/favicon.png" alt="favicon" className="h-12" />

        <div className="hidden lg:flex gap-3">
          {links.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="nav-pill">
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#3b342d]"
          aria-label="Abrir menú"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden flex flex-col items-center gap-3 pb-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="nav-pill"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
