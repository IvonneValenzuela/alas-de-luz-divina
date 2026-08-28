import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly navbarSobrePaulaPill: Locator
  readonly aboutPaulaSection: Locator
  readonly servicesSection: Locator
  readonly serviceCards: Locator
  readonly serviceModal: Locator
  readonly serviceModalOverlay: Locator
  readonly closeServiceModalButton: Locator
  readonly whatsappBookingLink: Locator

  constructor(page: Page) {
    this.page = page
    this.navbarSobrePaulaPill = page.getByRole('link', { name: 'Sobre Paula' })
    this.aboutPaulaSection = page.locator('#about-paula')
    this.servicesSection = page.locator('#services')
    this.serviceCards = this.servicesSection.getByRole('button')
    this.serviceModal = page.getByRole('dialog')
    this.serviceModalOverlay = page.locator('.fixed.inset-0.z-50')
    this.closeServiceModalButton = this.serviceModal.getByRole('button', {
      name: 'Cerrar',
    })
    this.whatsappBookingLink = this.serviceModal.getByRole('link', {
      name: 'Agendar por WhatsApp',
    })
  }

  async open(): Promise<void> {
    await this.page.goto('/')
  }

  async clickSobrePaula(): Promise<void> {
    await this.navbarSobrePaulaPill.click()
  }

  serviceCard(title: string): Locator {
    return this.servicesSection.getByRole('button', { name: title, exact: true })
  }

  async openServiceModal(title: string): Promise<void> {
    await this.serviceCard(title).click()
  }
}
