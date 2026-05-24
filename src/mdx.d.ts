declare module '*.mdx' {
  import type { ComponentType, ComponentPropsWithoutRef } from 'react'

  type MDXComponents = Record<string, ComponentType<ComponentPropsWithoutRef<never>>>

  const MDXContent: ComponentType<{ components?: MDXComponents }>
  export default MDXContent
  export const frontmatter: Record<string, unknown>
}
