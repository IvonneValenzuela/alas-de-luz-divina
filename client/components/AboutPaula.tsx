import { paulaBio, paulaTagline } from '../data/about'

function AboutPaula() {
  return (
    <section
      id="about-paula"
      className="relative py-20 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/fourthbg.png')" }}
    >
      <div className="absolute inset-0 bg-white/11 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14">
        <div className="flex flex-col items-center gap-6 flex-shrink-0">
          <img
            src="/pau.png"
            alt="Pau"
            className="w-56 sm:w-64 md:w-[600px] rounded-2xl"
          />

          <div
            className="flex flex-col items-center gap-6 text-center text-6xl text-[#e3965f]"
            style={{
              fontFamily: 'var(--font-tagline)',
              color: 'var(--color-tagline)',
            }}
          >
            {paulaTagline.map((word) => (
              <span key={word}>{word}</span>
            ))}
          </div>
        </div>

        <div className="text-left max-w-prose">
          <h2 className="text-4xl mb-3 text-center md:text-left">
            Un poco más de mí
          </h2>

          <div className="space-y-3 text-[#7a7268] leading-relaxed text-center md:text-left">
            {paulaBio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPaula
