import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '../../client/components/Navbar'

const LINK_LABEL = 'Historia'

describe('Navbar', () => {
  beforeEach(() => {
    render(<Navbar />)
  })

  // NAV-01
  it('has the mobile menu closed by default', () => {
    expect(screen.getAllByRole('link', { name: LINK_LABEL })).toHaveLength(1)
  })

  // NAV-02
  it('opens the mobile menu when the hamburger button is clicked', async () => {
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }))

    expect(screen.getAllByRole('link', { name: LINK_LABEL })).toHaveLength(2)
  })

  // NAV-03
  it('closes an open mobile menu when the hamburger button is clicked again', async () => {
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: 'Abrir menú' })

    await user.click(button)
    expect(screen.getAllByRole('link', { name: LINK_LABEL })).toHaveLength(2)

    await user.click(button)
    expect(screen.getAllByRole('link', { name: LINK_LABEL })).toHaveLength(1)
  })
})
