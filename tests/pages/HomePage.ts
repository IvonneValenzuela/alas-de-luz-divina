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
  readonly faqSection: Locator
  readonly faqQuestionButtons: Locator
  readonly faqAccordionContainer: Locator
  readonly faqCommunityLink: Locator
  readonly faqCtaHeading: Locator
  readonly faqCtaButton: Locator
  readonly faqCtaIcon: Locator
  readonly footerSection: Locator
  readonly footerInstagramLink: Locator
  readonly footerTiktokLink: Locator

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
    this.faqSection = page.locator('#faq')
    this.faqQuestionButtons = this.faqSection.getByRole('button')
    this.faqAccordionContainer = this.faqSection.locator('.divide-y')
    this.faqCommunityLink = this.faqSection.getByRole('link', {
      name: 'Unirme a la comunidad 🤍',
    })
    this.faqCtaHeading = this.faqSection.getByRole('heading', {
      name: '¿Sientes el llamado a conectar contigo?',
    })
    this.faqCtaButton = this.faqSection.getByRole('link', {
      name: 'Quiero abrirme a mi proceso',
    })
    this.faqCtaIcon = this.faqSection.locator('img[src="/favicon.png"]')
    this.footerSection = page.locator('#footer')
    this.footerInstagramLink = this.footerSection.getByRole('link', {
      name: 'Instagram',
    })
    this.footerTiktokLink = this.footerSection.getByRole('link', {
      name: 'TikTok',
    })
  }

  async open(): Promise<void> {
    await this.page.goto('/')
  }

  async clickSobrePaula(): Promise<void> {
    await this.navbarSobrePaulaPill.click()
  }

  serviceCard(title: string): Locator {
    return this.servicesSection.getByRole('button', {
      name: title,
      exact: true,
    })
  }

  async openServiceModal(title: string): Promise<void> {
    await this.serviceCard(title).click()
  }

  faqQuestionButton(question: string): Locator {
    return this.faqSection.getByRole('button', { name: question })
  }

  async openFaqQuestion(question: string): Promise<void> {
    await this.faqQuestionButton(question).click()
  }
}
