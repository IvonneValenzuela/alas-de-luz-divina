import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

let home: HomePage

test.beforeEach(async ({ page }) => {
  home = new HomePage(page)
  await home.open()
  await home.waitForFontsAndImages()
})

// ABOUT-04: 820×1180 is the width where the photo previously jumped to 600px
// at the md breakpoint and squeezed the bio text, per the confirmed test list.
const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'desktop', width: 1440, height: 900 },
]

for (const viewport of viewports) {
  test.describe(`${viewport.name} viewport`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } })

    // ABOUT-04
    test(`the About Paula section matches its approved baseline at ${viewport.name} width`, async () => {
      await home.hideNavbar()
      await home.aboutPaulaSection.scrollIntoViewIfNeeded()

      // Longer than the 5s default: in this memory-constrained environment the
      // section has timed out waiting to be stable when run with the others.
      await expect(home.aboutPaulaSection).toHaveScreenshot(
        `about-paula-${viewport.name}.png`,
        { timeout: 15_000 },
      )
    })
  })
}
