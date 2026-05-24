import type { ComponentType } from 'react'
import { BlogFrontmatter, type BlogPost } from './schemas'

interface BlogModule {
  default: ComponentType
  frontmatter: unknown
}

const modules = import.meta.glob<BlogModule>('/src/content/blog/*.mdx', { eager: true })

export function getBlogPosts(): BlogPost[] {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const slug = path.split('/').pop()!.replace('.mdx', '')
      const parsed = BlogFrontmatter.safeParse(mod.frontmatter)
      if (!parsed.success) return null
      return { slug, ...parsed.data }
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogModule(slug: string): BlogModule | undefined {
  return modules[`/src/content/blog/${slug}.mdx`]
}
