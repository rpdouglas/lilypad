import { z } from 'zod'

export const CaseStudyFrontmatter = z.object({
  title: z.string(),
  client: z.string(),
  industry: z.string(),
  services: z.array(z.string()),
  heroImage: z.string(),
  excerpt: z.string(),
  result: z.string(),
  date: z.string(),
  featured: z.boolean().default(false),
})

export const BlogFrontmatter = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  readTime: z.string(),
  category: z.string(),
  featured: z.boolean().default(false),
})

export type CaseStudy = z.infer<typeof CaseStudyFrontmatter> & { slug: string }
export type BlogPost = z.infer<typeof BlogFrontmatter> & { slug: string }
