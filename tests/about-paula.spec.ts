import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

let home: HomePage

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  home = new HomePage(page)
})

test('shows the "Un poco más de mí" heading', async () => {
  await expect(
    home.aboutPaulaSection.getByRole('heading', { name: 'Un poco más de mí' }),
  ).toBeVisible()
})

test("shows Pau's photo", async () => {
  await expect(
    home.aboutPaulaSection.getByRole('img', { name: 'Pau' }),
  ).toBeVisible()
})

test('renders the real bio paragraphs', async () => {
  await expect(
    home.aboutPaulaSection.getByText(
      '¡Hola! Soy Pau, y soy Angeloterapeuta Cuántica 🤍',
    ),
  ).toBeVisible()
})

test('Sobre Paula pill scrolls to the About Paula section', async () => {
  await home.clickSobrePaula()
  await expect(home.aboutPaulaSection).toBeInViewport({ timeout: 10000 })
})
