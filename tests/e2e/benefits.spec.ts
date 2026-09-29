import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { benefits } from '../../client/data/benefits'

let home: HomePage

// BEN-04: the chromium project's Desktop Chrome viewport (1280px) is above the
// 1024px breakpoint, so the pinned, scroll-driven stack is what renders.
test.describe('desktop scroll-pinned stack', () => {
  test.beforeEach(async ({ page }) => {
    home = new HomePage(page)
    await home.open()
  })

  test('shows no expanded benefit before the section is scrolled into', async () => {
    for (const benefit of benefits) {
      await expect(home.benefitText(benefit.body[0])).toHaveCount(0)
    }
  })

  // Every benefit uses the same scroll-to-index logic, so the first and last
  // are sampled to cover both ends of the range.
  const sampled = [
    { benefit: benefits[0], index: 0 },
    { benefit: benefits[benefits.length - 1], index: benefits.length - 1 },
  ]

  sampled.forEach(({ benefit, index }) => {
    test(`expands "${benefit.title}" at its share of the scroll progress`, async () => {
      // Middle of this benefit's slice, so the test never lands on a boundary.
      await home.scrollBenefitsToProgress((index + 0.5) / benefits.length)

      await expect(home.benefitText(benefit.body[0])).toBeVisible()
      for (const other of benefits.filter((b) => b.id !== benefit.id)) {
        await expect(home.benefitText(other.body[0])).toHaveCount(0)
      }
    })
  })

  // BEN-06
  test('releases the pin and scrolls into the next section after the last benefit', async ({
    page,
  }) => {
    await home.scrollBenefitsToProgress(1)
    await expect(home.sectionAfterBenefits).not.toBeInViewport()

    // A real wheel scroll past the end, not a scrollTo, so a trapped pin would
    // keep the next section out of view.
    const viewport = page.viewportSize()!
    await page.mouse.move(viewport.width / 2, viewport.height / 2)
    await page.mouse.wheel(0, viewport.height)

    await expect(home.sectionAfterBenefits).toBeInViewport()
  })

  // BEN-07
  test('the benefits section has no horizontal overflow at desktop width', async () => {
    const hasOverflow = await home.benefitsSection.evaluate(
      (el) => el.scrollWidth > el.clientWidth,
    )

    expect(hasOverflow).toBe(false)
  })
})

test.describe('mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  // BEN-08
  test('the benefits section has no horizontal overflow at mobile width', async ({
    page,
  }) => {
    home = new HomePage(page)
    await home.open()

    const hasOverflow = await home.benefitsSection.evaluate(
      (el) => el.scrollWidth > el.clientWidth,
    )

    expect(hasOverflow).toBe(false)
  })
})

// BEN-05
test('shows every benefit statically when the OS prefers reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  home = new HomePage(page)
  await home.open()

  for (const benefit of benefits) {
    for (const paragraph of benefit.body) {
      await expect(home.benefitText(paragraph)).toBeVisible()
    }
  }
})
