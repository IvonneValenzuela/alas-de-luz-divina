import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly navbar: Locator
  readonly servicesSection: Locator
  readonly serviceCards: Locator
  readonly serviceModal: Locator
  readonly whatsappBookingLink: Locator
  readonly footerSection: Locator

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
  }

  navLink(name: string): Locator {
    return this.navbar.getByRole('link', { name })
  }

  section(id: string): Locator {
    return this.page.locator(`#${id}`)
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  }

  async open() {
    await this.page.goto('/')
  }
}
