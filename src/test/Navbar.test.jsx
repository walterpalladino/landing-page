import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../components/Navbar'
import { NAV_LINKS } from '../data/content'

describe('Navbar', () => {
  it('renders the logo text', () => {
    render(<Navbar />)
    expect(screen.getByText('MERIDIAN')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    NAV_LINKS.forEach(({ label }) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    })
  })

  it('renders the CTA button', () => {
    render(<Navbar />)
    const ctaButtons = screen.getAllByText("Let's Talk")
    expect(ctaButtons.length).toBeGreaterThan(0)
  })

  it('CTA links point to #contact', () => {
    render(<Navbar />)
    const ctaLinks = screen.getAllByRole('link', { name: /let's talk/i })
    ctaLinks.forEach(link => expect(link).toHaveAttribute('href', '#contact'))
  })

  it('logo links to the page root', () => {
    render(<Navbar />)
    const logoLink = screen.getByText('MERIDIAN').closest('a')
    expect(logoLink).toHaveAttribute('href', '#')
  })

  it('does not have scrolled class on initial render', () => {
    const { container } = render(<Navbar />)
    const nav = container.querySelector('.navbar')
    expect(nav).not.toHaveClass('navbar--scrolled')
  })

  it('adds scrolled class after window scroll past threshold', () => {
    const { container } = render(<Navbar />)
    const nav = container.querySelector('.navbar')

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    fireEvent.scroll(window)

    expect(nav).toHaveClass('navbar--scrolled')
  })

  it('removes scrolled class when scrolling back to top', () => {
    const { container } = render(<Navbar />)
    const nav = container.querySelector('.navbar')

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    fireEvent.scroll(window)
    expect(nav).toHaveClass('navbar--scrolled')

    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    fireEvent.scroll(window)
    expect(nav).not.toHaveClass('navbar--scrolled')
  })

  it('renders burger button for mobile', () => {
    render(<Navbar />)
    const burger = screen.getByLabelText('Toggle menu')
    expect(burger).toBeInTheDocument()
  })

  it('toggles mobile menu open/close on burger click', () => {
    const { container } = render(<Navbar />)
    const burger = screen.getByLabelText('Toggle menu')
    const mobileMenu = container.querySelector('.navbar__mobile')

    expect(mobileMenu).not.toHaveClass('navbar__mobile--open')
    fireEvent.click(burger)
    expect(mobileMenu).toHaveClass('navbar__mobile--open')
    fireEvent.click(burger)
    expect(mobileMenu).not.toHaveClass('navbar__mobile--open')
  })

  it('closes mobile menu when a nav link is clicked', () => {
    const { container } = render(<Navbar />)
    const burger = screen.getByLabelText('Toggle menu')
    fireEvent.click(burger)

    const mobileMenu = container.querySelector('.navbar__mobile')
    expect(mobileMenu).toHaveClass('navbar__mobile--open')

    const mobileLinks = mobileMenu.querySelectorAll('.navbar__mobile-link')
    fireEvent.click(mobileLinks[0])
    expect(mobileMenu).not.toHaveClass('navbar__mobile--open')
  })
})
