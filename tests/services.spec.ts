import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

const THERAPY_TITLE = 'Oráculos y Canalización Angelical'
const FIRST_PARAGRAPH_TEXT = 'Un espacio de conexión'
const SECOND_PARAGRAPH_TEXT = 'Esta sesión es ideal cuando estás atravesando'
const CHECKLIST_ITEM_TEXT =
  'Orientación para situaciones personales, amorosas, familiares, laborales o espirituales'

let homePage: HomePage

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page)
  await homePage.open()
})

test('renders exactly eight service cards', async () => {
  await expect(homePage.serviceCards).toHaveCount(8)
})

test('therapy cards show only the name, no description or price on the face', async () => {
  const card = homePage.serviceCard(THERAPY_TITLE)

  await expect(card).toBeVisible()
  await expect(card).not.toContainText('COP')
  await expect(card).not.toContainText(FIRST_PARAGRAPH_TEXT)
})

test('clicking a card opens the modal with the expected content', async () => {
  await homePage.openServiceModal(THERAPY_TITLE)

  await expect(homePage.serviceModal).toBeVisible()
  await expect(homePage.serviceModal).toHaveClass(/modal-flip-in/)
  await expect(
    homePage.serviceModal.getByText(
      'Modalidad: 100% Virtual, vía WhatsApp por audios',
    ),
  ).toBeVisible()
  await expect(
    homePage.serviceModal.getByText(CHECKLIST_ITEM_TEXT),
  ).toBeVisible()
  await expect(
    homePage.serviceModal.getByText('COP 120.000', { exact: false }),
  ).toBeVisible()
  await expect(homePage.whatsappBookingLink).toHaveAttribute(
    'href',
    'https://wa.me/573019095778',
  )
})

test('closing the modal via the close button returns to the unchanged card grid', async () => {
  await homePage.openServiceModal(THERAPY_TITLE)
  await homePage.closeServiceModalButton.click()

  await expect(homePage.serviceModal).not.toBeVisible()
  await expect(homePage.serviceCards).toHaveCount(8)
  await expect(homePage.serviceCard(THERAPY_TITLE)).toBeVisible()
})

test('closing the modal by clicking outside returns to the unchanged card grid', async () => {
  await homePage.openServiceModal(THERAPY_TITLE)
  await homePage.serviceModalOverlay.click({ position: { x: 10, y: 10 } })

  await expect(homePage.serviceModal).not.toBeVisible()
  await expect(homePage.serviceCards).toHaveCount(8)
  await expect(homePage.serviceCard(THERAPY_TITLE)).toBeVisible()
})

test('checklist items and description paragraphs use the same computed font', async () => {
  await homePage.openServiceModal(THERAPY_TITLE)

  const checklistItem = homePage.serviceModal.getByText(CHECKLIST_ITEM_TEXT)
  const descriptionParagraph = homePage.serviceModal.getByText(
    FIRST_PARAGRAPH_TEXT,
    {
      exact: false,
    },
  )

  const [checklistFont, descriptionFont] = await Promise.all([
    checklistItem.evaluate((el) => getComputedStyle(el).fontFamily),
    descriptionParagraph.evaluate((el) => getComputedStyle(el).fontFamily),
  ])

  expect(checklistFont).toBe(descriptionFont)
})

test('a multi-paragraph description renders as separate paragraphs', async () => {
  await homePage.openServiceModal(THERAPY_TITLE)

  const descriptionParagraphs = await homePage.serviceModal
    .locator('p')
    .filter({
      hasText: new RegExp(`${FIRST_PARAGRAPH_TEXT}|${SECOND_PARAGRAPH_TEXT}`),
    })
    .all()

  expect(descriptionParagraphs).toHaveLength(2)
})

test.describe('mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true })

  test('tapping a card opens the same modal with the flip-in animation', async () => {
    await homePage.serviceCard(THERAPY_TITLE).tap()

    await expect(homePage.serviceModal).toBeVisible()
    await expect(homePage.serviceModal).toHaveClass(/modal-flip-in/)
    await expect(
      homePage.serviceModal.getByText(
        'Modalidad: 100% Virtual, vía WhatsApp por audios',
      ),
    ).toBeVisible()
  })
})
