function Navbar() {
  const links = [
    { id: 'hero', label: 'Inicio' },
    { id: 'story', label: 'Historia' },
    { id: 'services', label: 'Servicios' },
    { id: 'about', label: 'Sobre Paula' },
    { id: 'testimonials', label: 'Testimonios' },
    { id: 'faq', label: 'Preguntas' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-12 z-50">
      <img src="/favicon.png" alt="Alas de Luz Divina" className="h-22" />

      <div className="flex gap-7">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="px-8 py-3 text-base rounded-full bg-[#ead6ad] text-[#3b342d] hover:bg-[#d6b26e] hover:text-white transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
