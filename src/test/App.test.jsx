import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow()
  })

  it('renders the Navbar', () => {
    render(<App />)
    expect(screen.getAllByText('MERIDIAN').length).toBeGreaterThan(0)
  })

  it('renders the Hero section', () => {
    const { container } = render(<App />)
    expect(container.querySelector('.hero')).toBeInTheDocument()
  })

  it('renders the Services section', () => {
    render(<App />)
    expect(screen.getByText(/02 \/ Services/i)).toBeInTheDocument()
  })

  it('renders the Clients section', () => {
    render(<App />)
    expect(screen.getByText(/03 \/ Clients/i)).toBeInTheDocument()
  })

  it('renders the Contact section', () => {
    render(<App />)
    expect(screen.getByText(/04 \/ Contact/i)).toBeInTheDocument()
  })

  it('renders the Footer', () => {
    render(<App />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('renders a main landmark element', () => {
    render(<App />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
