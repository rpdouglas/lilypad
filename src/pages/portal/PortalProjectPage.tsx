// Persona: Dana (primary — views deliverable and can compare revision rounds)
// Route: /portal/:clientSlug/:projectSlug

import { useState, useEffect } from 'react'
import { useOutletContext, useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjectBySlug, getDeliverables, type PortalProject, type PortalDeliverable } from '@/lib/firebase/portal'
import DeliverableEmbed from '@/components/portal/DeliverableEmbed'
import type { PortalContext } from '@/layouts/PortalLayout'

const STATUS_LABELS: Record<PortalProject['status'], string> = {
  'in-review': 'In Review',
  approved: 'Approved',
  archived: 'Archived',
}

const STATUS_CLASSES: Record<PortalProject['status'], string> = {
  'in-review': 'bg-coral/10 text-coral',
  approved: 'bg-stone/20 text-[#2D6B2D]',
  archived: 'bg-stone/20 text-stone',
}

export default function PortalProjectPage() {
  const { client } = useOutletContext<PortalContext>()
  const { clientSlug, projectSlug } = useParams<{ clientSlug: string; projectSlug: string }>()
  const [project, setProject] = useState<PortalProject | null>(null)
  const [deliverables, setDeliverables] = useState<PortalDeliverable[]>([])
  const [selectedRound, setSelectedRound] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!projectSlug) return
    let cancelled = false

    getProjectBySlug(client.id, projectSlug).then(async (proj) => {
      if (cancelled) return
      if (!proj) { setNotFound(true); setLoading(false); return }

      const delivs = await getDeliverables(client.id, proj.id)
      if (cancelled) return

      setProject(proj)
      setDeliverables(delivs)
      setSelectedRound(proj.revisionRound)
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [client.id, projectSlug])

  if (clientSlug && clientSlug !== client.slug) {
    return <Navigate to={`/portal/${client.slug}`} replace />
  }

  if (loading) {
    return (
      <div className="max-w-content mx-auto px-6 lg:px-10 py-12">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone">
          Loading…
        </span>
      </div>
    )
  }

  if (notFound || !project) {
    return (
      <div className="max-w-content mx-auto px-6 lg:px-10 py-12">
        <p className="font-sans text-sm text-stone">Project not found.</p>
        <Link
          to={`/portal/${client.slug}`}
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral hover:text-dark transition-colors duration-150 mt-4 inline-block focus-visible:outline-none focus-visible:shadow-coral rounded-sm"
        >
          Back to dashboard
        </Link>
      </div>
    )
  }

  const rounds = [...new Set(deliverables.map((d) => d.revisionRound))].sort((a, b) => a - b)
  const visible = deliverables.filter((d) => d.revisionRound === selectedRound)

  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
      >
        <div className="mb-2">
          <Link
            to={`/portal/${client.slug}`}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone hover:text-forest transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-coral rounded-sm"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-light text-forest leading-tight">
            {project.title}
          </h1>
          <span
            className={`font-mono text-[10px] tracking-[0.15em] uppercase rounded-sm px-2 py-1 ${STATUS_CLASSES[project.status]}`}
          >
            {STATUS_LABELS[project.status]}
          </span>
        </div>

        {rounds.length > 1 && (
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone mr-2">
              Round
            </span>
            {rounds.map((round) => (
              <button
                key={round}
                onClick={() => setSelectedRound(round)}
                className={`font-mono text-[10px] tracking-[0.15em] uppercase rounded-sm px-3 py-1.5 transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-coral ${
                  round === selectedRound
                    ? 'bg-forest text-cream'
                    : 'bg-stone/20 text-stone hover:bg-stone/30'
                }`}
              >
                {round}
              </button>
            ))}
          </div>
        )}

        {visible.length === 0 && (
          <p className="font-sans text-sm text-stone">
            No deliverables for this round yet.
          </p>
        )}

        <div className="flex flex-col gap-8">
          {visible.map((deliverable) => (
            <div key={deliverable.id}>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone mb-3 block">
                {deliverable.label}
              </span>
              <DeliverableEmbed deliverable={deliverable} />
            </div>
          ))}
        </div>

        {project.status === 'in-review' && (
          <div className="mt-10 pt-8 border-t border-stone/40">
            <Link
              to={`/portal/${client.slug}/${project.slug}/feedback`}
              className="inline-flex items-center gap-2 bg-coral text-cream font-sans text-sm font-medium rounded-md px-6 py-3 hover:bg-coral-light transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-coral"
            >
              Leave feedback
            </Link>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-stone mt-3">
              Round {project.revisionRound} is open for review
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
