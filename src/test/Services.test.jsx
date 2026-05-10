import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Services from '../components/Services'
import { SERVICES } from '../data/content'

describe('Services', () => {
  it('renders the section with id="services"', () => {
    const { container } = render(<Services />)
    expect(container.querySelector('#services')).toBeInTheDocument()
  })

  it('renders the section label', () => {
    render(<Services />)
    expect(screen.getByText(/02 \/ Services/i)).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<Services />)
    expect(screen.getByText(/What we/i)).toBeInTheDocument()
    expect(screen.getByText('do')).toBeInTheDocument()
  })

  it('renders all service cards', () => {
    render(<Services />)
    SERVICES.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  it('renders the correct number of service cards', () => {
    const { container } = render(<Services />)
    const cards = container.querySelectorAll('.service-card')
    expect(cards).toHaveLength(SERVICES.length)
  })

  it('each service card has a description', () => {
    render(<Services />)
    SERVICES.forEach(({ description }) => {
      expect(screen.getByText(description)).toBeInTheDocument()
    })
  })

  it('each service card has an image from picsum', () => {
    const { container } = render(<Services />)
    const images = container.querySelectorAll('.service-card__img')
    images.forEach(img => {
      expect(img.getAttribute('src')).toContain('picsum.photos')
    })
  })

  it('each service card shows a "Learn more" link', () => {
    render(<Services />)
    const links = screen.getAllByText(/learn more/i)
    expect(links).toHaveLength(SERVICES.length)
  })

  it('each service card has a lazy loading image', () => {
    const { container } = render(<Services />)
    const images = container.querySelectorAll('.service-card__img')
    images.forEach(img => {
      expect(img).toHaveAttribute('loading', 'lazy')
    })
  })

  it('service card icons are rendered', () => {
    const { container } = render(<Services />)
    const icons = container.querySelectorAll('.service-card__icon')
    expect(icons).toHaveLength(SERVICES.length)
  })
})
