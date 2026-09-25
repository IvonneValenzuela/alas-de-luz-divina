import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Services from '../../client/components/Services'
import type { Service } from '../../client/data/types'

// vi.mock applies to a whole file, so the "field absent" cases of SERV-17,
// SERV-18 and SERV-19 live here, apart from Services.test.tsx, which uses the real data.
// Every real service defines a checklist and modality, and all but one define
// a duration, so the absent partitions need an explicit fixture.
const { bareService } = vi.hoisted(() => {
  const bareService: Service = {
    id: 'test-bare',
    title: 'Test service without optional fields',
    description: 'Test description.',
    price: 50000,
  }
  return { bareService }
})

vi.mock('../../client/data/services', () => ({
  services: [bareService],
}))

async function openService(service: Service) {
  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: service.title }))
  return screen.getByRole('dialog')
}

describe('Services optional fields (mocked data)', () => {
  beforeEach(() => {
    render(<Services />)
  })

  describe('a service that defines none of them', () => {
    // SERV-17
    it('shows no duration', async () => {
      const dialog = await openService(bareService)

      expect(within(dialog).queryByText(/Duración:/)).not.toBeInTheDocument()
    })

    // SERV-18
    it('shows no checklist', async () => {
      const dialog = await openService(bareService)

      expect(within(dialog).queryByRole('list')).not.toBeInTheDocument()
    })

    // SERV-19
    it('shows no modality', async () => {
      const dialog = await openService(bareService)

      expect(within(dialog).queryByText(/Modalidad:/)).not.toBeInTheDocument()
    })
  })
})
