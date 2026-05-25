import { Link } from 'react-router-dom'
import type { PortalProject } from '@/lib/firebase/portal'

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

interface ProjectCardProps {
  project: PortalProject
  clientSlug: string
}

export default function ProjectCard({ project, clientSlug }: ProjectCardProps) {
  return (
    <Link
      to={`/portal/${clientSlug}/${project.slug}`}
      className="block bg-white border border-stone/40 rounded-lg p-6 hover:shadow-md transition-shadow duration-150 focus-visible:outline-none focus-visible:shadow-coral"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h2 className="font-sans text-sm font-semibold text-dark leading-snug">
          {project.title}
        </h2>
        <span
          className={`font-mono text-[10px] tracking-[0.15em] uppercase rounded-sm px-2 py-1 shrink-0 ${STATUS_CLASSES[project.status]}`}
        >
          {STATUS_LABELS[project.status]}
        </span>
      </div>
      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-stone">
        Round {project.revisionRound}
      </span>
    </Link>
  )
}
