import { useState } from 'react'
import { faqItems } from '../data/faq'

function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="faq" className="py-20 px-6 max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-heading mb-12">Preguntas frecuentes</h2>

      <div className="border border-[#ebe2d7] rounded-2xl divide-y divide-[#ebe2d7] text-left">
        {faqItems.map((item) => {
          const isOpen = openId === item.id

          return (
            <div key={item.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <h3 className="font-heading text-lg">{item.question}</h3>
                <span className="text-[#94691a] text-xl leading-none shrink-0">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 space-y-3">
                  {item.answer.map((paragraph, index) => (
                    <p key={index} className="text-[#7a7268] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {item.link && (
                    <a
                      href={item.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[#d6b26e] font-medium"
                    >
                      {item.link.text}
                    </a>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <img src="/favicon.png" alt="" className="h-16 shrink-0" />
        <div className="text-center md:text-left">
          <h3 className="font-heading text-2xl mb-2">
            ¿Sientes el llamado a conectar contigo?
          </h3>
          <p className="text-[#7a7268]">
            Este puede ser el momento de escucharte y dar ese primer paso hacia
            tu proceso.
          </p>
        </div>
        <a
          href="https://wa.me/573019095778"
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary inline-flex px-6 py-3 rounded-full whitespace-nowrap"
        >
          Quiero abrirme a mi proceso
        </a>
      </div>
    </section>
  )
}

export default FAQ
