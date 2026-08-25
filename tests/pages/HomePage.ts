import { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly navbarSobrePaulaPill: Locator
  readonly aboutPaulaSection: Locator

  constructor(page: Page) {
    this.page = page
    this.navbarSobrePaulaPill = page.getByRole('link', { name: 'Sobre Paula' })
    this.aboutPaulaSection = page.locator('#about-paula')
  }

  async open(): Promise<void> {
    await this.page.goto('/')
  }

  async clickSobrePaula(): Promise<void> {
    await this.navbarSobrePaulaPill.click()
  }
}
