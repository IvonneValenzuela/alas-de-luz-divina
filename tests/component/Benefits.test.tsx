import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Benefits from '../../client/components/Benefits'
import { benefits } from '../../client/data/benefits'

// Left for manual QA (not automated): AC7's real tap on a narrow viewport,
// per the confirmed Benefits test list. BEN-01 and BEN-02 cover the accordion
// logic here with a mocked matchMedia and simulated clicks.

// jsdom doesn't implement matchMedia, so each test decides which of the
// component's two media queries (desktop width, reduced motion) match.
function mockMatchMedia({
  desktop,
  reducedMotion,
}: {
  desktop: boolean
  reducedMotion: boolean
}) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => ({
      matches:
        (query === '(min-width: 1024px)' && desktop) ||
        (query === '(prefers-reduced-motion: reduce)' && reducedMotion),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

// The button's accessible name also includes its decorative "▾" chevron,
// so match on the benefit title it starts with.
function accordionButton(title: string) {
  return screen.getByRole('button', { name: (name) => name.startsWith(title) })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Benefits', () => {
  describe('mobile accordion', () => {
    beforeEach(() => {
      mockMatchMedia({ desktop: false, reducedMotion: false })
      render(<Benefits />)
    })

    // BEN-01
    it('renders one collapsed accordion button per benefit', () => {
      const buttons = screen.getAllByRole('button')

      expect(buttons).toHaveLength(benefits.length)
      benefits.forEach((benefit) => {
        expect(accordionButton(benefit.title)).toHaveAttribute(
          'aria-expanded',
          'false',
        )
      })
    })

    // BEN-02
    it('closes the previously open benefit when another one is opened', async () => {
      const user = userEvent.setup()
      const [first, second] = benefits
      const firstButton = accordionButton(first.title)
      const secondButton = accordionButton(second.title)

      await user.click(firstButton)
      expect(firstButton).toHaveAttribute('aria-expanded', 'true')
      expect(screen.getByText(first.body[0])).toBeVisible()

      await user.click(secondButton)
      expect(secondButton).toHaveAttribute('aria-expanded', 'true')
      expect(firstButton).toHaveAttribute('aria-expanded', 'false')
      expect(screen.getByText(second.body[0])).toBeVisible()
      expect(screen.queryByText(first.body[0])).not.toBeInTheDocument()
    })
  })

  // BEN-03
  it('shows every benefit in full without interaction when reduced motion is preferred', () => {
    mockMatchMedia({ desktop: false, reducedMotion: true })
    render(<Benefits />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    benefits.forEach((benefit) => {
      benefit.body.forEach((paragraph) => {
        expect(screen.getByText(paragraph)).toBeVisible()
      })
    })
  })

  // BEN-09
  it('shows each benefit with its own subtitle, quote and quote author when reduced motion is preferred', () => {
    mockMatchMedia({ desktop: false, reducedMotion: true })
    render(<Benefits />)

    benefits.forEach((benefit) => {
      const card = within(
        screen.getByRole('heading', { name: benefit.title }).parentElement!,
      )

      expect(card.getByText(benefit.subtitle)).toBeVisible()

      expect(card.getByText(benefit.quote.text, { exact: false })).toBeVisible()
      expect(
        card.getByText(benefit.quote.author, { exact: false }),
      ).toBeVisible()
    })
  })
})
