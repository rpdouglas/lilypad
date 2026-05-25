// Persona: Dana (primary — wants to find her project immediately on arrival)
// Route: /portal/:clientSlug

import { useState, useEffect } from 'react'
import { useOutletContext, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProjects, type PortalProject } from '@/lib/firebase/portal'
import ProjectCard from '@/components/portal/ProjectCard'
import type { PortalContext } from '@/layouts/PortalLayout'

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
}

export default function PortalDashboardPage() {
  const { client } = useOutletContext<PortalContext>()
  const { clientSlug } = useParams<{ clientSlug: string }>()
  const [projects, setProjects] = useState<PortalProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getProjects(client.id).then((data) => {
      if (!cancelled) {
        setProjects(data)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [client.id])

  if (clientSlug && clientSlug !== client.slug) {
    return <Navigate to={`/portal/${client.slug}`} replace />
  }

  return (
    <div className="max-w-content mx-auto px-6 lg:px-10 py-12 lg:py-16">
      <motion.div {...fadeUp}>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone mb-4 block">
          Your projects
        </span>
        <h1 className="font-display text-3xl lg:text-4xl font-light text-forest leading-tight mb-8">
          {client.displayName}
        </h1>
      </motion.div>

      {loading && (
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-stone">
          Loading…
        </span>
      )}

      {!loading && projects.length === 0 && (
        <p className="font-sans text-sm text-stone leading-relaxed">
          No projects yet. Your Lily Pad team will add your first project here.
        </p>
      )}

      {!loading && projects.length > 0 && (
        <div className="grid gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0, 0, 0.2, 1] }}
            >
              <ProjectCard project={project} clientSlug={client.slug} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
