import type { ComponentType } from 'react'
import { CaseStudyFrontmatter, type CaseStudy } from './schemas'

interface CaseStudyModule {
  default: ComponentType
  frontmatter: unknown
}

const modules = import.meta.glob<CaseStudyModule>('/src/content/case-studies/*.mdx', { eager: true })

export function getCaseStudies(): CaseStudy[] {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const slug = path.split('/').pop()!.replace('.mdx', '')
      const parsed = CaseStudyFrontmatter.safeParse(mod.frontmatter)
      if (!parsed.success) return null
      return { slug, ...parsed.data }
    })
    .filter((cs): cs is CaseStudy => cs !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getCaseStudyModule(slug: string): CaseStudyModule | undefined {
  return modules[`/src/content/case-studies/${slug}.mdx`]
}
