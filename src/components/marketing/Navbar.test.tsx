// Persona: Sarah (mobile hamburger), Marcus (desktop nav links)
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )
}

describe('Navbar', () => {
  it('renders the brand name', () => {
    renderNavbar()
    expect(screen.getByText('Lily Pad')).toBeInTheDocument()
  })

  it('renders desktop nav links', () => {
    renderNavbar()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders the Start a Project CTA', () => {
    renderNavbar()
    const ctas = screen.getAllByText('Start a Project')
    expect(ctas.length).toBeGreaterThanOrEqual(1)
  })

  it('mobile menu is closed by default', () => {
    renderNavbar()
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens mobile menu when hamburger is clicked', () => {
    renderNavbar()
    const toggle = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
  })

  it('closes mobile menu after a nav link is clicked', () => {
    renderNavbar()
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }))
    const servicesLinks = screen.getAllByText('Services')
    // click the one inside the mobile drawer (last rendered)
    fireEvent.click(servicesLinks[servicesLinks.length - 1])
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
  })
})
