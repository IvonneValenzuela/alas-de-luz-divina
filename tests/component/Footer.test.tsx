import { render, screen, within } from '@testing-library/react'
import Footer from '../../client/components/Footer'
import { socialLinks } from '../../client/data/social-links'

const COPYRIGHT_TEXT =
  '© 2026 Alas de Luz Divina. Todos los derechos reservados.'

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  // FOOTER-01
  it('renders the exact copyright text', () => {
    expect(screen.getByText(COPYRIGHT_TEXT)).toBeVisible()
  })

  // FOOTER-02
  it('renders exactly three social badges: Instagram, WhatsApp and TikTok', () => {
    const footer = screen.getByRole('contentinfo')

    expect(within(footer).getAllByRole('link')).toHaveLength(3)
    expect(within(footer).getByRole('link', { name: 'Instagram' })).toBeVisible()
    expect(within(footer).getByRole('link', { name: 'WhatsApp' })).toBeVisible()
    expect(within(footer).getByRole('link', { name: 'TikTok' })).toBeVisible()
  })

  // FOOTER-03
  it('links the Instagram badge to the profile, securely in a new tab', () => {
    const link = screen.getByRole('link', { name: 'Instagram' })

    expect(link).toHaveAttribute('href', socialLinks.instagram)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  // FOOTER-04
  it('links the WhatsApp badge to the chat, securely in a new tab', () => {
    const link = screen.getByRole('link', { name: 'WhatsApp' })

    expect(link).toHaveAttribute('href', socialLinks.whatsapp)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  // FOOTER-05
  it('links the TikTok badge to the profile, securely in a new tab', () => {
    const link = screen.getByRole('link', { name: 'TikTok' })

    expect(link).toHaveAttribute('href', socialLinks.tiktok)
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
