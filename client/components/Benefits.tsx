import { useEffect, useRef, useState } from 'react'
import { benefits } from '../data/benefits'
import type { Benefit } from '../data/types'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

const barStyle = {
  background: 'linear-gradient(135deg, #fffef9, #f6e8d4)',
  border: '1.5px solid #d6b26e',
  boxShadow: '0 6px 16px rgba(107, 74, 46, 0.18)',
}

const sectionGradient =
  'radial-gradient(circle at 18% 15%, #fdfaf2 0%, transparent 55%),' +
  'radial-gradient(circle at 82% 25%, #f2e2c8 0%, transparent 55%),' +
  'radial-gradient(circle at 50% 45%, #e6cba0 0%, transparent 65%),' +
  '#faf6ee'

function BenefitCard({
  benefit,
  className = '',
}: {
  benefit: Benefit
  className?: string
}) {
  return (
    <div
      className={`relative bg-cover bg-center rounded-2xl overflow-hidden p-8 sm:p-10 flex flex-col justify-center ${className}`}
      style={{ backgroundImage: `url(${benefit.image})` }}
    >
      <div className="absolute inset-0 bg-white/60 pointer-events-none" />
      <div className="relative">
        <h3 className="font-heading text-2xl mb-2">{benefit.title}</h3>
        <p className="text-[#7a7268] mb-6">{benefit.subtitle}</p>

        <div className="space-y-4 mb-6">
          {benefit.body.map((paragraph, index) => (
            <p key={index} className="text-[#3b342d] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <p className="font-heading italic text-[#7a7268]">
          “{benefit.quote.text}”
        </p>
        <p className="text-sm text-[#7a7268] mt-2">— {benefit.quote.author}</p>
      </div>
    </div>
  )
}

function BenefitStackItem({
  benefit,
  isActive,
}: {
  benefit: Benefit
  isActive: boolean
}) {
  return (
    <div
      className="overflow-hidden transition-all duration-500 ease-in-out"
      style={
        isActive
          ? { flexGrow: 1, flexShrink: 1, flexBasis: 0, minHeight: 0 }
          : { flexGrow: 0, flexShrink: 0, flexBasis: '4rem' }
      }
    >
      {isActive ? (
        <div className="h-full max-w-[860px] mx-auto px-6 text-center">
          <BenefitCard benefit={benefit} className="h-full" />
        </div>
      ) : (
        <div className="h-full max-w-3xl mx-auto px-6">
          <div
            className="h-full flex items-center justify-center px-6 rounded-2xl"
            style={barStyle}
          >
            <h3 className="font-heading italic text-xl">{benefit.title}</h3>
          </div>
        </div>
      )}
    </div>
  )
}

function BenefitsHeader() {
  return (
    <>
      <h2 className="text-3xl font-heading mb-4 text-center">
        ¿Qué puedes encontrar en este espacio?
      </h2>
      <p className="text-[#7a7268] mb-12 max-w-2xl mx-auto text-center">
        Un espacio para sentirte acompañado, escucharte, encontrar claridad y
        abrirte a nuevas posibilidades mientras recorres tu propio proceso.
      </p>
    </>
  )
}

function ExpandedStack() {
  return (
    <div className="space-y-8">
      {benefits.map((benefit) => (
        <BenefitCard key={benefit.id} benefit={benefit} />
      ))}
    </div>
  )
}

function PinnedStack() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    let frame: number | null = null

    const updateActiveIndex = () => {
      frame = null
      const wrapper = wrapperRef.current
      if (!wrapper) return

      const rect = wrapper.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0

      if (progress <= 0) {
        setActiveIndex(null)
        return
      }

      const index = clamp(
        Math.floor(progress * benefits.length),
        0,
        benefits.length - 1,
      )
      setActiveIndex(index)
    }

    const handleScroll = () => {
      if (frame !== null) return
      frame = requestAnimationFrame(updateActiveIndex)
    }

    updateActiveIndex()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={wrapperRef} style={{ height: `${benefits.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="w-full h-full flex flex-col gap-3 justify-center">
          <div className="px-6 max-w-3xl mx-auto w-full">
            <BenefitsHeader />
          </div>
          {benefits.map((benefit, index) => (
            <BenefitStackItem
              key={benefit.id}
              benefit={benefit}
              isActive={index === activeIndex}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MobileAccordion() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-4">
      {benefits.map((benefit) => {
        const isOpen = openId === benefit.id

        return (
          <div
            key={benefit.id}
            className="rounded-2xl overflow-hidden"
            style={barStyle}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : benefit.id)}
              className="relative w-full flex items-center p-5"
              aria-expanded={isOpen}
            >
              <h3 className="font-heading italic text-xl w-full text-center">
                {benefit.title}
              </h3>
              <span
                className={`absolute right-5 text-[#d6b26e] transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                ▾
              </span>
            </button>

            {isOpen && (
              <div className="text-center">
                <BenefitCard benefit={benefit} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Benefits() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia('(min-width: 1024px)').matches,
  )
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const handleDesktopChange = (event: MediaQueryListEvent) =>
      setIsDesktop(event.matches)
    desktopQuery.addEventListener('change', handleDesktopChange)

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches)
    motionQuery.addEventListener('change', handleMotionChange)

    return () => {
      desktopQuery.removeEventListener('change', handleDesktopChange)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return (
    <section
      id="benefits"
      className="py-20"
      style={{ background: sectionGradient }}
    >
      {prefersReducedMotion ? (
        <>
          <div className="px-6 max-w-3xl mx-auto">
            <BenefitsHeader />
          </div>
          <div className="px-6 max-w-3xl mx-auto">
            <ExpandedStack />
          </div>
        </>
      ) : isDesktop ? (
        <PinnedStack />
      ) : (
        <>
          <div className="px-6 max-w-3xl mx-auto">
            <BenefitsHeader />
          </div>
          <MobileAccordion />
        </>
      )}
    </section>
  )
}

export default Benefits
