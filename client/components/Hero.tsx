import { SiInstagram, SiTiktok, SiWhatsapp } from 'react-icons/si'

function Hero() {
  return (
    <section className="flex flex-col items-center text-center gap-4 py-12 px-6">
      <h1 className="text-2xl font-semibold">Alas de Luz Divina</h1>
      <p className="text-sm text-gray-600 max-w-xs">
        Terapias angelicales para conectar con tu bienestar
      </p>
      <button className="mt-2 px-5 py-2 text-sm rounded-md border border-purple-300 bg-purple-50 text-purple-700">
        Conoce nuestras terapias
      </button>

      <div className="flex gap-3 mt-4">
        <a
          href="https://instagram.com/alasdeluzdivina"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border flex items-center justify-center"
        >
          <SiInstagram size={18} />
        </a>

        <a
          href="https://www.tiktok.com/@alas.de.luz.divina"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border flex items-center justify-center"
        >
          <SiTiktok size={18} />
        </a>

        <a
          href="https://wa.me/+0000000"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border flex items-center justify-center"
        >
          <SiWhatsapp size={18} />
        </a>
      </div>
    </section>
  )
}

export default Hero
