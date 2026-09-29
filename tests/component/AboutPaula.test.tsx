import { render, screen } from '@testing-library/react'
import AboutPaula from '../../client/components/AboutPaula'
import { paulaBio } from '../../client/data/about'

describe('AboutPaula', () => {
  beforeEach(() => {
    render(<AboutPaula />)
  })

  // ABOUT-01
  it('renders the "Un poco más de mí" heading', () => {
    expect(screen.getByRole('heading', { level: 2, name: 'Un poco más de mí' })).toBeVisible()
  })

  // ABOUT-02
  it("renders Pau's photo with its alt text", () => {
    expect(screen.getByRole('img', { name: 'Pau' })).toBeVisible()
  })

  // ABOUT-03
  it('renders every bio paragraph from about data', () => {
    paulaBio.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeVisible()
    })
  })
})
