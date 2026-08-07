import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si'

function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-8 text-center">
        <img src="/logo.png" alt="Alas de Luz Divina" className="w-[400px]" />

        <h1 className="text-5xl leading-tight">
          Reconecta con la luz que siempre ha vivido en ti.
        </h1>

        <p className="text-lg max-w-2xl">
          Un espacio de acompañamiento espiritual donde encontrarás escucha,
          amor y herramientas para vivir tu propio proceso de transformación.
        </p>

        <a
          href="https://wa.me/000000000"
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary inline-flex px-8 py-3 rounded-full"
        >
          Comenzar mi proceso
        </a>

        <div className="flex justify-center gap-4">
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
      </div>
    </section>
  )
}

export default Hero
