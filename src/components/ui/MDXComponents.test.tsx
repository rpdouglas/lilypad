import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { mdxComponents } from './MDXComponents'

describe('MDXComponents', () => {
  it('renders custom elements with brand classes', () => {
    const H2 = mdxComponents.h2
    render(<H2>Heading 2</H2>)
    const element = screen.getByText('Heading 2')
    expect(element.tagName).toBe('H2')
    expect(element.className).toContain('text-forest')
  })

  it('renders custom p with brand classes', () => {
    const P = mdxComponents.p
    render(<P>Paragraph text</P>)
    const element = screen.getByText('Paragraph text')
    expect(element.tagName).toBe('P')
    expect(element.className).toContain('text-dark')
  })

  it('renders blockquote with brand styles', () => {
    const Blockquote = mdxComponents.blockquote
    render(<Blockquote>Quote text</Blockquote>)
    const element = screen.getByText('Quote text')
    expect(element.tagName).toBe('BLOCKQUOTE')
    expect(element.className).toContain('border-coral')
  })
})
