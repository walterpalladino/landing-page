import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Clients from '../components/Clients'
import { CLIENTS } from '../data/content'

describe('Clients', () => {
  it('renders the section with id="clients"', () => {
    const { container } = render(<Clients />)
    expect(container.querySelector('#clients')).toBeInTheDocument()
  })

  it('renders the section label', () => {
    render(<Clients />)
    expect(screen.getByText(/03 \/ Clients/i)).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<Clients />)
    expect(screen.getByText(/Trusted by/i)).toBeInTheDocument()
    expect(screen.getByText(/industry leaders/i)).toBeInTheDocument()
  })

  it('renders all client names', () => {
    render(<Clients />)
    CLIENTS.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('renders the correct number of client cards', () => {
    const { container } = render(<Clients />)
    const cards = container.querySelectorAll('.client-card')
    expect(cards).toHaveLength(CLIENTS.length)
  })

  it('each client card has a logo image', () => {
    const { container } = render(<Clients />)
    const logos = container.querySelectorAll('.client-card__logo')
    expect(logos).toHaveLength(CLIENTS.length)
  })

  it('each client logo loads lazily', () => {
    const { container } = render(<Clients />)
    const logos = container.querySelectorAll('.client-card__logo')
    logos.forEach(logo => expect(logo).toHaveAttribute('loading', 'lazy'))
  })

  it('renders the stats row', () => {
    const { container } = render(<Clients />)
    const statRow = container.querySelector('.clients__stat-row')
    expect(statRow).toBeInTheDocument()
  })

  it('renders all four stats', () => {
    render(<Clients />)
    expect(screen.getByText('120+')).toBeInTheDocument()
    expect(screen.getByText('40+')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('97%')).toBeInTheDocument()
  })

  it('renders stat labels', () => {
    render(<Clients />)
    expect(screen.getByText('Projects Delivered')).toBeInTheDocument()
    expect(screen.getByText('Global Clients')).toBeInTheDocument()
    expect(screen.getByText('Years in Business')).toBeInTheDocument()
    expect(screen.getByText('Retention Rate')).toBeInTheDocument()
  })
})
