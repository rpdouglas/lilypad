// Persona: Dana (primary — submits structured feedback in under 2 minutes)
// Route: /portal/:clientSlug/:projectSlug/feedback

import { useState, useEffect } from 'react'
import { useOutletContext, useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  getProjectBySlug,
  getDeliverables,
  writeFeedback,
  type PortalProject,
} from '@/lib/firebase/portal'
import FeedbackForm from '@/components/portal/FeedbackForm'
import type { PortalContext } from '@/layouts/PortalLayout'

export default function PortalFeedbackPage() {
  const { client, user } = useOutletContext<PortalContext>()
  const { clientSlug, projectSlug } = useParams<{ clientSlug: string; projectSlug: string }>()
  const [project, setProject] = useState<PortalProject | null>(null)
  const [sections, setSections] = useState<string[]>([])
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

      const roundDelivs = delivs.filter((d) => d.revisionRound === proj.revisionRound)
      setProject(proj)
      setSections(roundDelivs.map((d) => d.label))
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

  async function handleFeedbackSubmit(section: string, body: string) {
    if (!project || !user.email) return
    await writeFeedback(client.id, project.id, {
      section,
      body,
      revisionRound: project.revisionRound,
      submittedBy: user.email,
    })
  }

  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
      >
        <div className="mb-2">
          <Link
            to={`/portal/${client.slug}/${project.slug}`}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone hover:text-forest transition-colors duration-150 focus-visible:outline-none focus-visible:shadow-coral rounded-sm"
          >
            ← {project.title}
          </Link>
        </div>

        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone mb-4 block">
          Round {project.revisionRound} feedback
        </span>
        <h1 className="font-display text-3xl lg:text-4xl font-light text-forest leading-tight mb-8">
          Share your <em className="italic text-coral">thoughts</em>
        </h1>

        <FeedbackForm
          sections={sections}
          revisionRound={project.revisionRound}
          onSubmit={handleFeedbackSubmit}
        />
      </motion.div>
    </div>
  )
}
