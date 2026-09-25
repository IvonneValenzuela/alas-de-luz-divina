import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { services } from '../../client/data/services'

const MODAL_ANIMATION = 'modal-flip-in'

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'desktop', width: 1280, height: 800 },
]

let home: HomePage

test.beforeEach(async ({ page }) => {
  home = new HomePage(page)
  await home.open()
})

// SERV-13
test('the modal opens with the flip animation', async () => {
  await home.serviceCards.first().click()

  await expect(home.serviceModal).toBeVisible()
  await expect(home.serviceModal).toHaveCSS('animation-name', MODAL_ANIMATION)
})

test.describe('mobile viewport', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  // SERV-14
  // Uses a click, not a simulated touch/tap. Real touch on physical devices is left for manual QA.
  test('clicking a card opens the same animated modal', async () => {
    await home.serviceCards.first().click()

    await expect(home.serviceModal).toBeVisible()
    await expect(home.serviceModal).toHaveCSS('animation-name', MODAL_ANIMATION)
  })
})

for (const { name, width, height } of viewports) {
  test.describe(`${name} viewport (${width}×${height})`, () => {
    test.use({ viewport: { width, height } })

    // SERV-15
    test('the services section has no horizontal overflow and every card is reachable', async () => {
      const hasOverflow = await home.servicesSection.evaluate(
        (el) => el.scrollWidth > el.clientWidth,
      )

      expect(hasOverflow).toBe(false)
      await expect(home.serviceCards).toHaveCount(services.length)

      for (const card of await home.serviceCards.all()) {
        await card.scrollIntoViewIfNeeded()
        await expect(card).toBeInViewport()
      }
    })

    // SERV-16
    test('the modal fits the viewport and the WhatsApp link is reachable', async ({
      page,
    }) => {
      // The service with the longest checklist, so the modal has to scroll on small screens.
      const longestService = services.reduce((longest, service) =>
        (service.checklist?.length ?? 0) > (longest.checklist?.length ?? 0) ? service : longest,
      )
      await home.serviceCards.nth(services.indexOf(longestService)).click()
      await expect(home.serviceModal).toBeVisible()
      // Wait for the flip animation to finish so the box is fully rotated in.
      await expect(home.serviceModal).toHaveCSS('opacity', '1')

      const box = await home.serviceModal.boundingBox()
      const viewport = page.viewportSize()!

      expect(box).not.toBeNull()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.y).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width)
      expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height)

      await home.whatsappBookingLink.scrollIntoViewIfNeeded()
      await expect(home.whatsappBookingLink).toBeVisible()
      await expect(home.whatsappBookingLink).toBeInViewport()
    })
  })
}
