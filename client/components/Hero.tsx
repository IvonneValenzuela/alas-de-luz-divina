import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si'

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      <img src="/logo.png" alt="Alas de Luz Divina" />

      <h1>Reconecta con la luz que siempre ha vivido en ti.</h1>

      <p>
        Un espacio de acompañamiento espiritual donde encontrarás escucha, amor
        y herramientas para vivir tu propio proceso de transformación.
      </p>

      <a
        href="https://wa.me/000000000"
        target="_blank"
        rel="noopener noreferrer"
      >
        Comenzar mi proceso
      </a>

      <div className="flex gap-3 mt-4">
        <a
          href="https://instagram.com/alasdeluzdivina"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="w-10 h-10 rounded-full border flex items-center justify-center"
        >
          <SiInstagram size={18} />
        </a>

        <a
          href="https://www.tiktok.com/@alas.de.luz.divina"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
          className="w-10 h-10 rounded-full border flex items-center justify-center"
        >
          <SiTiktok size={18} />
        </a>

        <a
          href="https://wa.me/000000000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-10 h-10 rounded-full border flex items-center justify-center"
        >
          <SiWhatsapp size={18} />
        </a>
      </div>
    </section>
  )
}

export default Hero
