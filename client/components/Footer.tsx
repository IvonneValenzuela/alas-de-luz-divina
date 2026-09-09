import { SiInstagram, SiTiktok } from 'react-icons/si'

function Footer() {
  return (
    <footer id="footer" className="px-3 py-12 sm:px-6">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 rounded-full bg-[#d6b26e] px-3 py-2 sm:gap-3 sm:px-8 sm:py-4">
        <p
          className="whitespace-nowrap text-[9.5px] sm:text-sm"
          style={{ color: 'var(--color-footer-text)' }}
        >
          © 2026 Alas de Luz Divina. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-1.5 shrink-0 sm:gap-3">
          <a
            href="https://instagram.com/alasdeluzdivina"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#faf7f2] flex items-center justify-center"
            style={{ color: 'var(--color-footer-icon)' }}
          >
            <SiInstagram size={12} />
          </a>

          <a
            href="https://www.tiktok.com/@alas.de.luz.divina"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#faf7f2] flex items-center justify-center"
            style={{ color: 'var(--color-footer-icon)' }}
          >
            <SiTiktok size={12} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
