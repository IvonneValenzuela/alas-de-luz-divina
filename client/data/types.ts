export interface Service {
  id: string
  title: string
  description: string
  price: number
  duration?: string
  modality?: string
  checklist?: string[]
  icon?: string
}

export interface Testimonial {
  id: string
  name: string
  quote: string
}

export interface Benefit {
  id: string
  order: number
  title: string
  subtitle: string
  body: string[]
  quote: {
    text: string
    author: string
  }
  image: string
}

export interface StoryContent {
  title: string
  quote: string
  paragraphs: string[]
  closing: string
}
