// Persona: all — Footer is present on every public page
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>,
  )
}

describe('Footer', () => {
  it('renders the brand name', () => {
    renderFooter()
    expect(screen.getByText('Lily Pad')).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument()
  })

  it('renders the Book a discovery call CTA', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: 'Book a discovery call' })).toBeInTheDocument()
  })

  it('has a labelled footer navigation region', () => {
    renderFooter()
    expect(screen.getByRole('navigation', { name: /footer navigation/i })).toBeInTheDocument()
  })

  it('renders the current year in copyright', () => {
    renderFooter()
    const year = String(new Date().getFullYear())
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })
})
