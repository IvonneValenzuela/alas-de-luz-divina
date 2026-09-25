import { render, screen } from '@testing-library/react'
import Hero from '../../client/components/Hero'
import { socialLinks } from '../../client/data/social-links'

describe('Hero', () => {
  beforeEach(() => {
    render(<Hero />)
  })

  // HERO-01
  it('renders the logo image', () => {
    expect(screen.getByRole('img', { name: 'oficiallogo' })).toBeVisible()
  })

  // HERO-02
  it('links the "Comenzar mi proceso" button to WhatsApp in a new tab', () => {
    const link = screen.getByRole('link', { name: 'Comenzar mi proceso' })

    expect(link).toHaveAttribute('href', socialLinks.whatsapp)
    expect(link).toHaveAttribute('target', '_blank')
  })

  // HERO-03
  it('links the Instagram icon to the Instagram profile in a new tab', () => {
    const link = screen.getByRole('link', { name: 'Instagram' })

    expect(link).toHaveAttribute('href', socialLinks.instagram)
    expect(link).toHaveAttribute('target', '_blank')
  })

  // HERO-04
  it('links the TikTok icon to the TikTok profile in a new tab', () => {
    const link = screen.getByRole('link', { name: 'TikTok' })

    expect(link).toHaveAttribute('href', socialLinks.tiktok)
    expect(link).toHaveAttribute('target', '_blank')
  })
})
