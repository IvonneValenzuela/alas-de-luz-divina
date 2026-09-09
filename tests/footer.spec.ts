import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

const COPYRIGHT_TEXT =
  '© 2026 Alas de Luz Divina. Todos los derechos reservados.'
const INSTAGRAM_URL = 'https://instagram.com/alasdeluzdivina'
const TIKTOK_URL = 'https://www.tiktok.com/@alas.de.luz.divina'

let home: HomePage

test.beforeEach(async ({ page }) => {
  home = new HomePage(page)
  await home.open()
})

test('renders the exact copyright text', async () => {
  await expect(home.footerSection.getByText(COPYRIGHT_TEXT)).toBeVisible()
})

test('renders exactly two social badges, Instagram and TikTok', async () => {
  await expect(home.footerSection.getByRole('link')).toHaveCount(2)
  await expect(home.footerInstagramLink).toBeVisible()
  await expect(home.footerTiktokLink).toBeVisible()
})

test('Instagram badge links to the correct profile and opens in a new tab', async () => {
  await expect(home.footerInstagramLink).toHaveAttribute('href', INSTAGRAM_URL)
  await expect(home.footerInstagramLink).toHaveAttribute('target', '_blank')
})

test('TikTok badge links to the correct profile and opens in a new tab', async () => {
  await expect(home.footerTiktokLink).toHaveAttribute('href', TIKTOK_URL)
  await expect(home.footerTiktokLink).toHaveAttribute('target', '_blank')
})

test('the footer has no horizontal overflow at desktop width', async () => {
  const hasOverflow = await home.footerSection.evaluate(
    (el) => el.scrollWidth > el.clientWidth,
  )

  expect(hasOverflow).toBe(false)
})

test.describe('mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('the footer has no horizontal overflow at mobile width', async () => {
    const hasOverflow = await home.footerSection.evaluate(
      (el) => el.scrollWidth > el.clientWidth,
    )

    expect(hasOverflow).toBe(false)
  })
})
