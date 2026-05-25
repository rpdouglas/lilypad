import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import type { PortalProject } from '@/lib/firebase/portal'
import { Timestamp } from 'firebase/firestore'

const now = Timestamp.now()

const baseProject: PortalProject = {
  id: 'proj-1',
  title: 'Brand Identity',
  slug: 'brand-identity',
  status: 'in-review',
  revisionRound: 2,
  createdAt: now,
  updatedAt: now,
}

function renderCard(project: PortalProject = baseProject) {
  return render(
    <MemoryRouter>
      <ProjectCard project={project} clientSlug="acme-corp" />
    </MemoryRouter>
  )
}

describe('ProjectCard', () => {
  it('renders the project title', () => {
    renderCard()
    expect(screen.getByText('Brand Identity')).toBeInTheDocument()
  })

  it('renders the revision round', () => {
    renderCard()
    expect(screen.getByText('Round 2')).toBeInTheDocument()
  })

  it('renders "In Review" status badge', () => {
    renderCard()
    expect(screen.getByText('In Review')).toBeInTheDocument()
  })

  it('renders "Approved" status badge', () => {
    renderCard({ ...baseProject, status: 'approved' })
    expect(screen.getByText('Approved')).toBeInTheDocument()
  })

  it('renders "Archived" status badge', () => {
    renderCard({ ...baseProject, status: 'archived' })
    expect(screen.getByText('Archived')).toBeInTheDocument()
  })

  it('links to the correct project URL', () => {
    renderCard()
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/portal/acme-corp/brand-identity')
  })
})
