import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Services from '../../client/components/Services'
import { services } from '../../client/data/services'
import { socialLinks } from '../../client/data/social-links'
import type { Service } from '../../client/data/types'

type User = ReturnType<typeof userEvent.setup>

const firstParagraph = (service: Service) =>
  service.description
    .split(/\n\s*\n/)[0]
    .replace(/\s+/g, ' ')
    .trim()

async function openService(user: User, service: Service) {
  await user.click(screen.getByRole('button', { name: service.title }))
  return screen.getByRole('dialog')
}

describe('Services', () => {
  beforeEach(() => {
    render(<Services />)
  })

  describe('opening a therapy card', () => {
    // SERV-01
    it.each(services)(
      'opens the modal with "$title" content',
      async (service) => {
        const user = userEvent.setup()

        const dialog = await openService(user, service)

        expect(dialog).toBeVisible()
        expect(
          within(dialog).getByRole('heading', { name: service.title }),
        ).toBeVisible()
        expect(within(dialog).getByText(firstParagraph(service))).toBeVisible()
      },
    )

    // SERV-02
    it.each(services)(
      'formats the price of "$title" in COP',
      async (service) => {
        const user = userEvent.setup()

        const dialog = await openService(user, service)

        expect(
          within(dialog).getByText(
            `Inversión: COP ${service.price.toLocaleString('es-CO')}`,
          ),
        ).toBeVisible()
      },
    )
  })

  describe('closing the modal', () => {
    const service = services[0]

    // SERV-03
    it('closes when the close button (✕) is clicked', async () => {
      const user = userEvent.setup()
      const dialog = await openService(user, service)

      await user.click(within(dialog).getByRole('button', { name: 'Cerrar' }))

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    // SERV-04
    it('closes when the overlay is clicked', async () => {
      const user = userEvent.setup()
      const dialog = await openService(user, service)

      // The backdrop is a plain div with no role or accessible name, so it is
      // reached through the dialog's parent.
      await user.click(dialog.parentElement!)

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    // SERV-05
    it('stays open when its own content is clicked', async () => {
      const user = userEvent.setup()
      const dialog = await openService(user, service)

      await user.click(
        within(dialog).getByRole('heading', { name: service.title }),
      )

      expect(screen.getByRole('dialog')).toBeVisible()
    })

    // SERV-06
    it('closes when Escape is pressed', async () => {
      const user = userEvent.setup()
      await openService(user, service)

      await user.keyboard('{Escape}')

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('optional fields', () => {
    // SERV-07
    it.each(services.filter((service) => service.duration))(
      'shows the duration of "$title"',
      async (service) => {
        const user = userEvent.setup()

        const dialog = await openService(user, service)

        expect(
          within(dialog).getByText(`Duración: ${service.duration}`),
        ).toBeVisible()
      },
    )

    // SERV-08
    it.each(services.filter((service) => service.checklist))(
      'shows the checklist of "$title"',
      async (service) => {
        const user = userEvent.setup()

        const dialog = await openService(user, service)
        const items = within(dialog).getAllByRole('listitem')

        expect(items).toHaveLength(service.checklist!.length)
        service.checklist!.forEach((item, i) => {
          expect(items[i]).toHaveTextContent(item)
        })
      },
    )

    // SERV-09
    it.each(services.filter((service) => service.modality))(
      'shows the modality of "$title"',
      async (service) => {
        const user = userEvent.setup()

        const dialog = await openService(user, service)

        expect(
          within(dialog).getByText(`Modalidad: ${service.modality}`),
        ).toBeVisible()
      },
    )
  })

  describe('card face', () => {
    // SERV-10
    it('shows only the therapy name on each card before it is opened', () => {
      services.forEach((service) => {
        const card = screen.getByRole('button', { name: service.title })

        expect(card).toHaveTextContent(service.title)
        expect(card.textContent).toBe(service.title)
      })
      expect(screen.queryByText(/Inversión:/)).not.toBeInTheDocument()
      expect(
        screen.queryByText(firstParagraph(services[0])),
      ).not.toBeInTheDocument()
    })
  })

  describe('booking link', () => {
    // SERV-11
    it('shows the WhatsApp booking link, securely in a new tab', async () => {
      const user = userEvent.setup()
      const dialog = await openService(user, services[0])

      const link = within(dialog).getByRole('link', {
        name: 'Agendar por WhatsApp',
      })

      expect(link).toHaveAttribute('href', socialLinks.whatsapp)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('grid after closing', () => {
    const cardTitles = () =>
      screen.getAllByRole('button').map((card) => card.textContent)

    // SERV-12
    it('leaves the card grid unchanged when the modal is closed', async () => {
      const user = userEvent.setup()
      const titlesBefore = cardTitles()

      const dialog = await openService(user, services[0])
      await user.click(within(dialog).getByRole('button', { name: 'Cerrar' }))

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(cardTitles()).toHaveLength(services.length)
      expect(cardTitles()).toEqual(titlesBefore)
      expect(cardTitles()).toEqual(services.map((service) => service.title))
    })
  })
})
