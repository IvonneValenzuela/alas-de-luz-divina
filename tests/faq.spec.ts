import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { faqItems } from '../client/data/faq'

const [firstItem, secondItem] = faqItems
const seventhItem = faqItems[6] // question 7

let home: HomePage

test.beforeEach(async ({ page }) => {
  home = new HomePage(page)
  await home.open()
})

test('clicking a question opens it and clicking it again collapses it', async () => {
  const button = home.faqQuestionButton(firstItem.question)

  await expect(button).toHaveAttribute('aria-expanded', 'false')

  await button.click()

  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await expect(button.getByText('−')).toBeVisible()
  await expect(
    home.faqSection.getByText(firstItem.answer[0], { exact: false }),
  ).toBeVisible()

  await button.click()

  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await expect(button.getByText('+')).toBeVisible()
  await expect(
    home.faqSection.getByText(firstItem.answer[0], { exact: false }),
  ).not.toBeVisible()
})

test('opening a different question closes the previously open one', async () => {
  const firstButton = home.faqQuestionButton(firstItem.question)
  const secondButton = home.faqQuestionButton(secondItem.question)

  await firstButton.click()
  await expect(firstButton).toHaveAttribute('aria-expanded', 'true')
  await expect(
    home.faqSection.getByText(firstItem.answer[0], { exact: false }),
  ).toBeVisible()

  await secondButton.click()

  await expect(secondButton).toHaveAttribute('aria-expanded', 'true')
  await expect(
    home.faqSection.getByText(secondItem.answer[0], { exact: false }),
  ).toBeVisible()
  await expect(firstButton).toHaveAttribute('aria-expanded', 'false')
  await expect(
    home.faqSection.getByText(firstItem.answer[0], { exact: false }),
  ).not.toBeVisible()
})

test("question 7's answer includes the clickable community link with the placeholder URL", async () => {
  if (!seventhItem.link)
    throw new Error('faqItems[6] is expected to have a link')

  await home.openFaqQuestion(seventhItem.question)

  await expect(home.faqCommunityLink).toBeVisible()
  await expect(home.faqCommunityLink).toHaveText(seventhItem.link.text)
  await expect(home.faqCommunityLink).toHaveAttribute(
    'href',
    seventhItem.link.url,
  )
})

test('closing CTA renders the wings icon, headline, supporting line, and WhatsApp button', async () => {
  await expect(home.faqCtaIcon).toBeVisible()
  await expect(home.faqCtaHeading).toBeVisible()
  await expect(
    home.faqSection.getByText(
      'Este puede ser el momento de escucharte y dar ese primer paso hacia tu proceso.',
    ),
  ).toBeVisible()

  await expect(home.faqCtaButton).toHaveClass(/button-primary/)
  await expect(home.faqCtaButton).toHaveAttribute(
    'href',
    'https://wa.me/573019095778',
  )
  await expect(home.faqCtaButton).toHaveAttribute('target', '_blank')
})

test('renders all twelve questions, each collapsed by default', async () => {
  await expect(home.faqQuestionButtons).toHaveCount(12)

  for (const button of await home.faqQuestionButtons.all()) {
    await expect(button).toHaveAttribute('aria-expanded', 'false')
  }
})

test('every FAQ item matches its source data exactly', async () => {
  for (const { question, answer } of faqItems) {
    await test.step(question, async () => {
      const button = home.faqQuestionButton(question)
      await button.click()
      for (const paragraph of answer) {
        await expect(
          home.faqSection.getByText(paragraph, { exact: false }),
        ).toBeVisible()
      }
      await button.click()
    })
  }
})

test('a question is keyboard-operable: focusable, toggled by Enter and Space', async ({
  page,
}) => {
  const button = home.faqQuestionButton(firstItem.question)

  await button.focus()
  await expect(button).toBeFocused()

  await page.keyboard.press('Enter')
  await expect(button).toHaveAttribute('aria-expanded', 'true')

  await page.keyboard.press('Space')
  await expect(button).toHaveAttribute('aria-expanded', 'false')
})

test('the FAQ list renders inside a single bordered container, not separate cards', async () => {
  await expect(home.faqAccordionContainer).toHaveCount(1)
  await expect(home.faqAccordionContainer.getByRole('button')).toHaveCount(12)
})

test('the FAQ section has no horizontal overflow at desktop width', async () => {
  const hasOverflow = await home.faqSection.evaluate(
    (el) => el.scrollWidth > el.clientWidth,
  )

  expect(hasOverflow).toBe(false)
})

test('a question button is reachable via Tab, not just programmatic focus', async () => {
  const button = home.faqQuestionButton(firstItem.question)

  const tabIndex = await button.evaluate((el) => el.tabIndex)
  expect(tabIndex).toBeGreaterThanOrEqual(0)
})

test.describe('mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('the FAQ section has no horizontal overflow at mobile width', async () => {
    const hasOverflow = await home.faqSection.evaluate(
      (el) => el.scrollWidth > el.clientWidth,
    )

    expect(hasOverflow).toBe(false)
  })
})
