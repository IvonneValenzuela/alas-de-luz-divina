export interface Service {
  id: string
  title: string
  description: string
  price: number
  duration?: string
  modality?: string
  checklist?: string[]
}

export interface Testimonial {
  id: string
  name: string
  quote: string
}
