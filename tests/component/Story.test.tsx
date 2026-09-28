import { render, screen } from '@testing-library/react'
import Story from '../../client/components/Story'
import { story } from '../../client/data/story'

describe('Story', () => {
  beforeEach(() => {
    render(<Story />)
  })

  // STORY-01
  it('renders the title, quote, body paragraphs, and closing line from story data', () => {
    expect(screen.getByRole('heading', { level: 2, name: story.title })).toBeVisible()
    expect(screen.getByText(story.quote)).toBeVisible()
    story.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeVisible()
    })
    expect(screen.getByText(story.closing)).toBeVisible()
  })
})
