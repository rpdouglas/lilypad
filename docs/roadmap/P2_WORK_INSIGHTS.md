# P2 — Work & Insights

**Status:** 🟢 Live
**Priority:** Critical
**Started:** 2026-05-24
**Target:** —
**Primary Personas:** Sarah (reads case studies obsessively), Marcus (reads Insights blog to assess expertise before booking)

## Goal

First 3 case studies live as MDX. Blog infrastructure running. SEO foundations in place. This phase turns the site from a brochure into evidence — the difference between a visitor thinking "they look good" and "they're exactly what I need."

## Deliverables

### Case Studies (`/work`)

- [x] Work index page — case study archive (`src/pages/WorkPage.tsx`)
- [x] Individual case study template — Brief → Approach → Payoff with metrics (`src/pages/WorkSlugPage.tsx`)
- [x] Case study 01 (`src/content/case-studies/atlas-saas.mdx`)
- [x] Case study 02 (`src/content/case-studies/meridian-consulting.mdx`)
- [x] Case study 03 (`src/content/case-studies/bloom-health.mdx`)
- [x] Dynamic route — `/work/:slug`
- [x] Results metrics on each study — quantified outcomes, not just process descriptions

### Insights Blog (`/insights`)

- [x] Insights index page — blog archive (`src/pages/InsightsPage.tsx`)
- [x] Individual article template (`src/pages/InsightsSlugPage.tsx`)
- [x] First article (`src/content/blog/why-founder-websites-fail.mdx`)
- [x] Dynamic route — `/insights/:slug`

### SEO

- [x] Meta title + description per page (React 19 native `<title>` and `<meta>`)
- [x] Open Graph tags for case study and blog pages
- [x] `sitemap.xml` generated at build time
- [x] `robots.txt`
- [x] Semantic HTML audit — headings hierarchy, alt text on all images

### Content Infrastructure

- [x] MDX processing pipeline wired in Vite (`@mdx-js/rollup`)
- [x] Content schema validated with Zod (`src/lib/content/schemas.ts`)
- [x] Content loaders (`src/lib/content/case-studies.ts`, `src/lib/content/blog.ts`)
- [x] Styled MDX component overrides (`src/components/ui/MDXComponents.tsx`)
- [x] `/scaffold` skill verified for generating new case study MDX files

## Persona Gate

Before closing this phase:

1. **Sarah:** Does the case study payoff section answer "what did they actually get?" with a specific number or outcome?
2. **Marcus:** Does the Insights page demonstrate methodology depth — not just tips, but a point of view? Would he return to read the next post?

## Decisions Made

2026-05-24 — MDX content pipeline: `@mdx-js/rollup` + Zod + `import.meta.glob`. No Contentlayer (deprecated 2024). See `docs/adr/ADR-0004-content-pipeline.md`.

2026-05-24 — Content directories use `case-studies/` and `blog/` naming (not `work/` and `insights/`), matching `docs/SITEMAP.md` and the actual directories already created. The original P2 doc used `work/` and `insights/` — corrected here.

2026-05-24 — SEO uses React 19 native document metadata (`<title>`, `<meta>` tags rendered from components, hoisted to `<head>`). No react-helmet required.
