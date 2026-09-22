import { useEffect, useState } from 'react'
import { services } from '../data/services'
import type { Service } from '../data/types'
import { socialLinks } from '../data/social-links'

function Services() {
  const [selected, setSelected] = useState<Service | null>(null)

  useEffect(() => {
    if (!selected) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selected])

  return (
    <section id="services" className="py-20 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-heading mb-4">Terapias</h2>
      <p className="text-[#7a7268] mb-12 max-w-2xl mx-auto">
        Te voy a contar un poquito de mis servicios, ojala tenga la maravillosa
        oportunidad de acompañarte.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelected(service)}
            className="flex items-center justify-center text-center p-8 min-h-[140px] rounded-2xl border border-[#ebe2d7] bg-[#faf7f2] hover:border-[#d6b26e] transition-colors"
          >
            <h3 className="font-heading text-lg">{service.title}</h3>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          style={{ perspective: '1000px' }}
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
            className="modal-flip-in bg-[#fffdf9] rounded-2xl max-w-md sm:max-w-xl lg:max-w-2xl w-full p-8 sm:p-10 lg:p-12 text-left relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-[#7a7268]"
              aria-label="Cerrar"
            >
              ✕
            </button>
            <h3 id="service-modal-title" className="font-heading text-2xl mb-2">
              {selected.title}
            </h3>
            {selected.duration && (
              <p className="text-sm text-[#7a7268] mb-1">
                Duración: {selected.duration}
              </p>
            )}
            {selected.modality && (
              <p className="text-sm text-[#7a7268] mb-4">
                Modalidad: {selected.modality}
              </p>
            )}
            {selected.description
              .split(/\n\s*\n/)
              .map((paragraph) => paragraph.trim())
              .filter(Boolean)
              .map((paragraph, i) => (
                <p key={i} className="text-[#3b342d] mb-4">
                  {paragraph}
                </p>
              ))}
            {selected.checklist && (
              <ul
                className="mb-4 space-y-1"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {selected.checklist.map((item) => (
                  <li key={item} className="text-[#7a7268]">
                    {selected.icon ?? '✨'} {item}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-[#d6b26e] font-medium text-lg mb-6">
              Inversión: COP {selected.price.toLocaleString('es-CO')}
            </p>

            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary inline-flex px-6 py-3 rounded-full"
            >
              Agendar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </section>
  )
}

export default Services
