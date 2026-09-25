import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

// Same native anchor behaviour for every link (href="#id", no custom scroll
// logic), so a representative sample of the sections is enough. "Inicio" is
// tested separately below because it needs the page scrolled away first.
const sections = [
  { label: 'Historia', id: 'story' },
  { label: 'Terapias', id: 'services' },
  { label: 'Beneficios', id: 'benefits' },
  { label: 'Sobre Paula', id: 'about-paula' },
  { label: 'Preguntas', id: 'faq' },
]

let home: HomePage

test.beforeEach(async ({ page }) => {
  home = new HomePage(page)
  await home.open()
})

// NAV-04
for (const { label, id } of sections) {
  test(`clicking the "${label}" nav link scrolls to #${id}`, async () => {
    await home.navLink(label).click()

    await expect(home.section(id)).toBeInViewport()
  })
}

// NAV-05 ("Inicio" link back to the Hero)
test('clicking the "Inicio" nav link scrolls back to #hero', async () => {
  await home.scrollToBottom()
  await expect(home.section('hero')).not.toBeInViewport()

  await home.navLink('Inicio').click()

  await expect(home.section('hero')).toBeInViewport()
})
