import { useState } from 'react'
import { services } from '../data/services'
import type { Service } from '../data/types'

function Services() {
  const [selected, setSelected] = useState<Service | null>(null)

  return (
    <section id="services" className="py-20 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-heading mb-4">Nuestras Terapias</h2>
      <p className="text-[#7a7268] mb-12 max-w-2xl mx-auto">
        Terapias angelicales para tu bienestar, guiadas con amor y conexión
        espiritual.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => setSelected(service)}
            className="text-left p-6 rounded-2xl border border-[#ebe2d7] bg-[#faf7f2] hover:border-[#d6b26e] transition-colors"
          >
            <h3 className="font-heading text-lg mb-2">{service.title}</h3>
            <p className="text-sm text-[#7a7268] mb-4 line-clamp-3">
              {service.description}
            </p>
            <p className="text-[#d6b26e] font-medium">
              COP {service.price.toLocaleString('es-CO')}
            </p>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-[#fffdf9] rounded-2xl max-w-md w-full p-8 text-left relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-[#7a7268]"
              aria-label="Cerrar"
            >
              ✕
            </button>
            <h3 className="font-heading text-2xl mb-2">{selected.title}</h3>
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
            <p className="text-[#3b342d] mb-4">{selected.description}</p>
            {selected.checklist && (
              <ul className="mb-4 space-y-1">
                {selected.checklist.map((item) => (
                  <li key={item} className="text-sm text-[#3b342d]">
                    ✓ {item}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-[#d6b26e] font-medium text-lg mb-6">
              Inversión: COP {selected.price.toLocaleString('es-CO')}
            </p>

            <a
              href="https://wa.me/573019095778"
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
