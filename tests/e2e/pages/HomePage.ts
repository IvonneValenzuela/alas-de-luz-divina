import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly navbar: Locator
  readonly servicesSection: Locator
  readonly serviceCards: Locator
  readonly serviceModal: Locator
  readonly whatsappBookingLink: Locator
  readonly footerSection: Locator
  readonly aboutPaulaSection: Locator
  readonly benefitsSection: Locator
  readonly sectionAfterBenefits: Locator
  readonly faqSection: Locator

  constructor(page: Page) {
    this.page = page
    this.navbar = page.getByRole('navigation')
    this.servicesSection = page.locator('#services')
    this.serviceCards = this.servicesSection.getByRole('button')
    this.serviceModal = page.getByRole('dialog')
    this.whatsappBookingLink = this.serviceModal.getByRole('link', {
      name: 'Agendar por WhatsApp',
    })
    this.footerSection = page.locator('#footer')
    this.aboutPaulaSection = page.locator('#about-paula')
    this.benefitsSection = page.locator('#benefits')
    // Whatever sibling App.tsx renders right after Benefits, so a section
    // reorder doesn't break the tests that rely on it.
    this.sectionAfterBenefits = page.locator('#benefits + *')
    this.faqSection = page.locator('#faq')
  }

  benefitText(text: string): Locator {
    return this.benefitsSection.getByText(text)
  }

  navLink(name: string): Locator {
    return this.navbar.getByRole('link', { name })
  }

  section(id: string): Locator {
    return this.page.locator(`#${id}`)
  }

  // Scrolls so the pinned Benefits wrapper (the section's first child) sits at
  // the given scroll progress (0–1), the same value Benefits.tsx derives from
  // getBoundingClientRect. Instant, to bypass the global smooth scroll.
  async scrollBenefitsToProgress(progress: number) {
    const wrapper = this.benefitsSection.locator(':scope > div').first()
    await wrapper.evaluate((wrapper: HTMLElement, progress) => {
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY
      const scrollable = wrapper.offsetHeight - window.innerHeight
      window.scrollTo({
        top: wrapperTop + progress * scrollable,
        behavior: 'instant',
      })
    }, progress)
  }

  async scrollToBottom() {
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight),
    )
  }

  async waitForFontsAndImages() {
    await this.page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all(
        Array.from(document.images).map((img) => img.decode().catch(() => {})),
      )
    })
  }

  // The navbar is position: fixed, so in a stitched full-section screenshot it
  // lands on top of whatever content is under it. Hide it instead of masking.
  async hideNavbar() {
    await this.page.addStyleTag({
      content: 'nav { visibility: hidden !important; }',
    })
  }

  async open() {
    await this.page.goto('/')
  }
}
