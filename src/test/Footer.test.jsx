import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer'
import { NAV_LINKS, SOCIAL_LINKS } from '../data/content'

describe('Footer', () => {
  it('renders the footer element', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer.footer')).toBeInTheDocument()
  })

  it('renders the logo', () => {
    render(<Footer />)
    expect(screen.getAllByText('MERIDIAN').length).toBeGreaterThan(0)
  })

  it('renders the tagline', () => {
    render(<Footer />)
    expect(screen.getByText(/Creative studio for/i)).toBeInTheDocument()
  })

  it('renders all social links', () => {
    render(<Footer />)
    SOCIAL_LINKS.forEach(({ icon }) => {
      expect(screen.getByText(icon)).toBeInTheDocument()
    })
  })

  it('social links have correct aria-labels', () => {
    render(<Footer />)
    SOCIAL_LINKS.forEach(({ label }) => {
      expect(screen.getByLabelText(label)).toBeInTheDocument()
    })
  })

  it('renders navigation column heading', () => {
    render(<Footer />)
    expect(screen.getByText('Navigation')).toBeInTheDocument()
  })

  it('renders all nav links in the footer', () => {
    render(<Footer />)
    NAV_LINKS.forEach(({ label }) => {
      const links = screen.getAllByText(label)
      expect(links.length).toBeGreaterThan(0)
    })
  })

  it('renders services column heading', () => {
    const { container } = render(<Footer />)
    const colTitles = container.querySelectorAll('.footer__col-title')
    const servicesTitle = Array.from(colTitles).find(el => el.textContent === 'Services')
    expect(servicesTitle).toBeInTheDocument()
  })

  it('renders services list items', () => {
    render(<Footer />)
    expect(screen.getAllByText('Brand Strategy').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Digital Experience').length).toBeGreaterThan(0)
  })

  it('renders contact column heading', () => {
    const { container } = render(<Footer />)
    const colTitles = container.querySelectorAll('.footer__col-title')
    const contactTitle = Array.from(colTitles).find(el => el.textContent === 'Contact')
    expect(contactTitle).toBeInTheDocument()
  })

  it('renders email contact link', () => {
    render(<Footer />)
    const emailLinks = screen.getAllByText('hello@meridian.studio')
    expect(emailLinks.length).toBeGreaterThan(0)
  })

  it('renders phone contact link', () => {
    render(<Footer />)
    const phoneLinks = screen.getAllByText('+1 (555) 123-4567')
    expect(phoneLinks.length).toBeGreaterThan(0)
  })

  it('renders the address', () => {
    render(<Footer />)
    expect(screen.getByText(/123 Studio Row/i)).toBeInTheDocument()
    expect(screen.getByText(/New York, NY 10001/i)).toBeInTheDocument()
  })

  it('renders the copyright with current year', () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${year} Meridian Studio`))).toBeInTheDocument()
  })

  it('renders legal bottom links', () => {
    render(<Footer />)
    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /terms of use/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /cookies/i })).toBeInTheDocument()
  })
})
