import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

let home: HomePage

test.beforeEach(async ({ page }) => {
  home = new HomePage(page)
  await home.open()
})

// FOOTER-06
test('the footer has no horizontal overflow at desktop width', async () => {
  const hasOverflow = await home.footerSection.evaluate(
    (el) => el.scrollWidth > el.clientWidth,
  )

  expect(hasOverflow).toBe(false)
})

test.describe('mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  // FOOTER-07
  test('the footer has no horizontal overflow at mobile width', async () => {
    const hasOverflow = await home.footerSection.evaluate(
      (el) => el.scrollWidth > el.clientWidth,
    )

    expect(hasOverflow).toBe(false)
  })
})
