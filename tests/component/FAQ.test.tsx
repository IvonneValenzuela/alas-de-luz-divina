import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FAQ from '../../client/components/FAQ'
import { faqInvitation, faqItems } from '../../client/data/faq'
import { socialLinks } from '../../client/data/social-links'

// The button's accessible name also includes its decorative "+"/"−" icon,
// so match on the question text it starts with.
function questionButton(question: string) {
  return screen.getByRole('button', {
    name: (name) => name.startsWith(question),
  })
}

beforeEach(() => {
  render(<FAQ />)
})

describe('FAQ', () => {
  // FAQ-01
  it('renders every question collapsed by default', () => {
    expect(screen.getAllByRole('button')).toHaveLength(faqItems.length)
    faqItems.forEach((item) => {
      expect(questionButton(item.question)).toHaveAttribute(
        'aria-expanded',
        'false',
      )
    })
  })

  // FAQ-02
  it('closes the previously open question when another one is opened', async () => {
    const user = userEvent.setup()
    const [first, second] = faqItems
    const firstButton = questionButton(first.question)
    const secondButton = questionButton(second.question)

    await user.click(firstButton)
    expect(firstButton).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(first.answer[0])).toBeVisible()

    await user.click(secondButton)
    expect(secondButton).toHaveAttribute('aria-expanded', 'true')
    expect(firstButton).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText(second.answer[0])).toBeVisible()
    expect(screen.queryByText(first.answer[0])).not.toBeInTheDocument()
  })

  // FAQ-03
  it('shows each answer exactly as written in the source data', async () => {
    const user = userEvent.setup()

    for (const item of faqItems) {
      await user.click(questionButton(item.question))

      item.answer.forEach((paragraph) => {
        expect(screen.getByText(paragraph)).toBeVisible()
      })
    }
  })

  // FAQ-04
  it('shows the community link inside question 7’s answer', async () => {
    const user = userEvent.setup()
    const question7 = faqItems.find((item) => item.order === 7)!

    await user.click(questionButton(question7.question))

    const link = screen.getByRole('link', { name: question7.link!.text })
    expect(link).toBeVisible()
    expect(link).toHaveAttribute('href', question7.link!.url)
  })

  // FAQ-05
  it('renders all questions inside a single bordered container', () => {
    const containers = new Set(
      screen
        .getAllByRole('button')
        .map((button) => button.parentElement!.parentElement),
    )

    expect(containers.size).toBe(1)
    const [container] = containers
    expect(container!.children).toHaveLength(faqItems.length)
    expect(container).toHaveClass('border')
  })

  // FAQ-06
  it('can be focused with Tab and toggled with Enter and Space', async () => {
    const user = userEvent.setup()
    const firstButton = questionButton(faqItems[0].question)

    await user.tab()
    expect(firstButton).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(firstButton).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Enter}')
    expect(firstButton).toHaveAttribute('aria-expanded', 'false')

    await user.keyboard(' ')
    expect(firstButton).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard(' ')
    expect(firstButton).toHaveAttribute('aria-expanded', 'false')
  })

  // FAQ-09
  it('renders the closing CTA linking to WhatsApp in a new tab', () => {
    expect(
      screen.getByRole('heading', { name: faqInvitation.headline }),
    ).toBeVisible()
    expect(screen.getByText(faqInvitation.text)).toBeVisible()

    const cta = screen.getByRole('link', { name: faqInvitation.buttonLabel })
    expect(cta).toHaveAttribute('href', socialLinks.whatsapp)
    expect(cta).toHaveAttribute('target', '_blank')
    expect(cta).toHaveAttribute('rel', 'noopener noreferrer')
  })

  // FAQ-10
  it('switches the indicator from "+" to "−" when opened and back when closed', async () => {
    const user = userEvent.setup()
    const button = questionButton(faqItems[0].question)
    const indicator = within(button)

    expect(indicator.getByText('+')).toBeInTheDocument()
    expect(indicator.queryByText('−')).not.toBeInTheDocument()

    await user.click(button)
    expect(indicator.getByText('−')).toBeInTheDocument()
    expect(indicator.queryByText('+')).not.toBeInTheDocument()

    await user.click(button)
    expect(indicator.getByText('+')).toBeInTheDocument()
    expect(indicator.queryByText('−')).not.toBeInTheDocument()
  })

  // FAQ-11
  it('lists the questions in the same order as the source data', () => {
    const renderedQuestions = screen
      .getAllByRole('button')
      .map((button) => within(button).getByRole('heading').textContent)

    expect(renderedQuestions).toEqual(faqItems.map((item) => item.question))
  })
})
