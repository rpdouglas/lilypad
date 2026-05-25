import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import DeliverableEmbed from './DeliverableEmbed'
import type { PortalDeliverable } from '@/lib/firebase/portal'
import { Timestamp } from 'firebase/firestore'

const now = Timestamp.now()

function makeDeliverable(overrides: Partial<PortalDeliverable> = {}): PortalDeliverable {
  return {
    id: 'deliv-1',
    type: 'figma',
    embedUrl: 'https://embed.figma.com/file/abc123',
    revisionRound: 1,
    label: 'Brand Identity — Round 1',
    createdAt: now,
    ...overrides,
  }
}

describe('DeliverableEmbed', () => {
  it('renders an iframe with the correct title', () => {
    render(<DeliverableEmbed deliverable={makeDeliverable()} />)
    expect(screen.getByTitle('Brand Identity — Round 1')).toBeInTheDocument()
  })

  it('renders figma embed as iframe', () => {
    render(<DeliverableEmbed deliverable={makeDeliverable({ type: 'figma' })} />)
    const iframe = screen.getByTitle('Brand Identity — Round 1')
    expect(iframe.tagName).toBe('IFRAME')
  })

  it('renders video embed as iframe', () => {
    render(<DeliverableEmbed deliverable={makeDeliverable({ type: 'video', label: 'Intro Video' })} />)
    expect(screen.getByTitle('Intro Video').tagName).toBe('IFRAME')
  })

  it('renders pdf embed as iframe', () => {
    render(<DeliverableEmbed deliverable={makeDeliverable({ type: 'pdf', label: 'Style Guide PDF' })} />)
    expect(screen.getByTitle('Style Guide PDF').tagName).toBe('IFRAME')
  })

  it('renders web-preview as iframe', () => {
    render(<DeliverableEmbed deliverable={makeDeliverable({ type: 'web-preview', label: 'Site Preview' })} />)
    expect(screen.getByTitle('Site Preview').tagName).toBe('IFRAME')
  })
})
