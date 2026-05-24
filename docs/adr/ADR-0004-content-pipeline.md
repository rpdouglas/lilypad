# ADR-0004: Use MDX with @mdx-js/rollup for Content Pipeline

## Status
Accepted

## Date
May 2026

## Context
P2 requires a content authoring system for case studies (`/work/[slug]`) and blog posts (`/insights/[slug]`). Content needs to:

1. Support Markdown authoring — long-form prose with headings, blockquotes, and lists
2. Allow embedded React components inline — metrics cards, testimonial blocks
3. Support structured frontmatter — typed fields for title, client, date, result, etc.
4. Stay in version control alongside the codebase
5. Compile at build time — no runtime content fetching

## Decision

Use **MDX** (`@mdx-js/rollup`) as the content format, with:
- `remark-frontmatter` + `remark-mdx-frontmatter` for YAML frontmatter as named exports
- **Zod** for runtime frontmatter schema validation
- **Vite's `import.meta.glob`** as the content loader (no Contentlayer)

Content lives in `src/content/case-studies/*.mdx` and `src/content/blog/*.mdx`.
Content loaders in `src/lib/content/` expose typed arrays and per-slug component lookup.

## Why not Contentlayer

Contentlayer (the de-facto TypeScript-safe MDX layer) was deprecated and archived in 2024.
It is not safe to add as a dependency.

## Why not a headless CMS

Monthly cost and external dependency are not warranted at this stage. All content
authors are technical. Version-controlled MDX files satisfy the requirements at zero
additional cost.

## Why not TypeScript data files

TypeScript data files (`.ts` with exported objects) are viable for very small volumes
(< 5 items) but lose the Markdown authoring ergonomics and don't support embedded
React components in the content body.

## Consequences

**Positive:**
- YAML frontmatter is the universal standard — familiar to any developer
- Embedded React components are first-class — metrics cards, quotes, etc.
- Content compiles at build time — no runtime latency
- Full TypeScript safety via Zod schema validation at module load time
- No CMS cost or external dependency

**Negative:**
- Adds 5 packages: `@mdx-js/rollup`, `@mdx-js/react`, `remark-frontmatter`,
  `remark-mdx-frontmatter`, `zod`
- Zod adds ~16KB gzipped to the bundle (acceptable for a content site)
- Invalid frontmatter fails silently at runtime (surfaced only in dev console) rather than
  at the TypeScript type level — Zod `safeParse` handles this gracefully

## Bundle impact

- `schemas` chunk (Zod + schema definitions): 59.45KB / 16.13KB gzipped
- Per case study: ~3.5KB gzipped
- Per blog post: ~1.8KB gzipped
