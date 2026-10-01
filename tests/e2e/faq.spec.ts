import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

let home: HomePage

test.beforeEach(async ({ page }) => {
  home = new HomePage(page)
  await home.open()
})

// FAQ-07
test('the FAQ section has no horizontal overflow at desktop width', async () => {
  const hasOverflow = await home.faqSection.evaluate(
    (el) => el.scrollWidth > el.clientWidth,
  )

  expect(hasOverflow).toBe(false)
})

test.describe('mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  // FAQ-08
  test('the FAQ section has no horizontal overflow at mobile width', async () => {
    const hasOverflow = await home.faqSection.evaluate(
      (el) => el.scrollWidth > el.clientWidth,
    )

    expect(hasOverflow).toBe(false)
  })
})
