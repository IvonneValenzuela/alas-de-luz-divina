import { useState } from 'react'

function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { id: 'hero', label: 'Inicio' },
    { id: 'story', label: 'Historia' },
    { id: 'services', label: 'Terapias' },
    { id: 'about', label: 'Sobre Paula' },
    { id: 'testimonials', label: 'Testimonios' },
    { id: 'faq', label: 'Preguntas' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#faf7f2]/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        <img src="/favicon.png" alt="Alas de Luz Divina" className="h-12" />

        <div className="hidden md:flex gap-3">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="px-10 py-3.5 text-base rounded-full bg-[#ead6ad] text-[#3b342d] hover:bg-[#d6b26e] hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#3b342d]"
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
        <div className="md:hidden flex flex-col items-center gap-3 pb-6">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="px-8 py-3 text-base rounded-full bg-[#ead6ad] text-[#3b342d]"
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
