import type { ComponentPropsWithoutRef, ReactNode } from 'react'

const h2 = (props: ComponentPropsWithoutRef<'h2'>) => (
  <h2
    className="font-display text-2xl lg:text-3xl font-normal text-forest leading-tight mt-10 mb-4"
    {...props}
  />
)

const h3 = (props: ComponentPropsWithoutRef<'h3'>) => (
  <h3
    className="font-sans text-sm font-semibold text-dark mt-8 mb-3"
    {...props}
  />
)

const p = (props: ComponentPropsWithoutRef<'p'>) => (
  <p className="font-sans text-base text-dark leading-relaxed mb-5" {...props} />
)

const blockquote = (props: ComponentPropsWithoutRef<'blockquote'>) => (
  <blockquote
    className="border-l-2 border-coral pl-5 my-8 font-display text-xl font-light text-forest italic leading-snug"
    {...props}
  />
)

const ul = (props: ComponentPropsWithoutRef<'ul'>) => (
  <ul className="space-y-2 mb-5" {...props} />
)

const li = ({ children, ...props }: ComponentPropsWithoutRef<'li'> & { children?: ReactNode }) => (
  <li className="flex items-start gap-3" {...props}>
    <span className="text-coral font-mono text-sm mt-0.5 shrink-0">—</span>
    <span className="font-sans text-sm text-dark leading-relaxed">{children}</span>
  </li>
)

const strong = (props: ComponentPropsWithoutRef<'strong'>) => (
  <strong className="font-semibold text-dark" {...props} />
)

export const mdxComponents = { h2, h3, p, blockquote, ul, li, strong }
