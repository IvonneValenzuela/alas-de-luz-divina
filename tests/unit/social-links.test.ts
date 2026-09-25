import { socialLinks } from '../../client/data/social-links'

// Literal URLs are intentional here: this suite pins the data module itself,
// so a changed or broken link fails with a direct cause instead of indirectly
// inside every component that consumes it.
describe('socialLinks', () => {
  // DATA-01
  it('has the correct WhatsApp URL', () => {
    expect(socialLinks.whatsapp).toBe('https://wa.me/573019095778')
  })

  // DATA-02
  it('has the correct Instagram profile URL', () => {
    expect(socialLinks.instagram).toBe('https://instagram.com/alasdeluzdivina')
  })

  // DATA-03
  it('has the correct TikTok profile URL', () => {
    expect(socialLinks.tiktok).toBe(
      'https://www.tiktok.com/@alas.de.luz.divina',
    )
  })
})
