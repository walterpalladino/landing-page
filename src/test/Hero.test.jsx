import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from '../components/Hero'

describe('Hero', () => {
  it('renders the hero section', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('.hero')).toBeInTheDocument()
  })

  it('renders the eyebrow text', () => {
    render(<Hero />)
    expect(screen.getByText(/Creative Studio/i)).toBeInTheDocument()
  })

  it('renders the main headline', () => {
    render(<Hero />)
    expect(screen.getByText(/We craft/i)).toBeInTheDocument()
    expect(screen.getByText(/experiences/i)).toBeInTheDocument()
    expect(screen.getByText(/that last/i)).toBeInTheDocument()
  })

  it('renders the sub-headline', () => {
    render(<Hero />)
    expect(screen.getByText(/Strategy\. Design\. Technology\./i)).toBeInTheDocument()
  })

  it('renders the "Our Work" CTA linking to #services', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /our work/i })
    expect(link).toHaveAttribute('href', '#services')
  })

  it('renders the "Get in Touch" CTA linking to #contact', () => {
    render(<Hero />)
    const link = screen.getByRole('link', { name: /get in touch/i })
    expect(link).toHaveAttribute('href', '#contact')
  })

  it('renders the hero background image', () => {
    const { container } = render(<Hero />)
    const img = container.querySelector('.hero__img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringContaining('picsum.photos'))
  })

  it('renders the scroll hint indicator', () => {
    render(<Hero />)
    expect(screen.getByText('Scroll')).toBeInTheDocument()
  })

  it('applies fade-up animation class to headline', () => {
    render(<Hero />)
    const headline = screen.getByText(/We craft/i).closest('h1')
    expect(headline).toHaveClass('fade-up')
  })
})
