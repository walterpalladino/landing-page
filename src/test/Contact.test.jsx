import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from '../components/Contact'

describe('Contact', () => {
  it('renders the section with id="contact"', () => {
    const { container } = render(<Contact />)
    expect(container.querySelector('#contact')).toBeInTheDocument()
  })

  it('renders the section label', () => {
    render(<Contact />)
    expect(screen.getByText(/04 \/ Contact/i)).toBeInTheDocument()
  })

  it('renders the heading', () => {
    render(<Contact />)
    expect(screen.getByText(/Let's build/i)).toBeInTheDocument()
    expect(screen.getByText('remarkable.')).toBeInTheDocument()
  })

  it('renders contact details — email', () => {
    render(<Contact />)
    expect(screen.getByText('hello@meridian.studio')).toBeInTheDocument()
  })

  it('renders contact details — phone', () => {
    render(<Contact />)
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
  })

  it('renders contact details — location', () => {
    render(<Contact />)
    expect(screen.getByText(/New York \/ Remote/i)).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    render(<Contact />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Service of interest')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<Contact />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('updates form fields on user input', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const nameInput = screen.getByLabelText('Name')
    await user.type(nameInput, 'Jane Doe')
    expect(nameInput).toHaveValue('Jane Doe')

    const emailInput = screen.getByLabelText('Email')
    await user.type(emailInput, 'jane@example.com')
    expect(emailInput).toHaveValue('jane@example.com')
  })

  it('updates the message textarea on user input', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const textarea = screen.getByLabelText('Message')
    await user.type(textarea, 'Hello, world!')
    expect(textarea).toHaveValue('Hello, world!')
  })

  it('selects a service from the dropdown', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const select = screen.getByLabelText('Service of interest')
    await user.selectOptions(select, 'Brand Strategy')
    expect(select).toHaveValue('Brand Strategy')
  })

  it('shows success message after form submission', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByLabelText('Name'), 'Jane Doe')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Message'), 'Test message')

    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form'))

    await waitFor(() => {
      expect(screen.getByText('Message received.')).toBeInTheDocument()
    })
  })

  it('hides the form after successful submission', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByLabelText('Name'), 'Jane Doe')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Message'), 'Test message')

    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form'))

    await waitFor(() => {
      expect(screen.queryByLabelText('Name')).not.toBeInTheDocument()
    })
  })

  it('shows "Send another" button after submission', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByLabelText('Name'), 'Jane Doe')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Message'), 'Test message')

    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form'))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /send another/i })).toBeInTheDocument()
    })
  })

  it('resets form when "Send another" is clicked', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    await user.type(screen.getByLabelText('Name'), 'Jane Doe')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.type(screen.getByLabelText('Message'), 'Test message')

    fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form'))

    await waitFor(() => screen.getByRole('button', { name: /send another/i }))
    await user.click(screen.getByRole('button', { name: /send another/i }))

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toHaveValue('')
  })

  it('email link has correct href', () => {
    render(<Contact />)
    const emailLink = screen.getByRole('link', { name: /hello@meridian\.studio/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@meridian.studio')
  })

  it('phone link has correct href', () => {
    render(<Contact />)
    const phoneLink = screen.getByRole('link', { name: /\+1 \(555\)/i })
    expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567')
  })
})
