# P2 — Work & Insights

**Status:** ⏳ Next
**Priority:** Critical
**Started:** —
**Target:** —
**Primary Personas:** Sarah (reads case studies obsessively), Marcus (reads Insights blog to assess expertise before booking)

## Goal

First 3 case studies live as MDX. Blog infrastructure running. SEO foundations in place. This phase turns the site from a brochure into evidence — the difference between a visitor thinking "they look good" and "they're exactly what I need."

## Deliverables

### Case Studies (`/work`)

- [ ] Work index page — case study archive
- [ ] Individual case study template — Brief → Approach → Payoff with metrics
- [ ] Case study 01 (MDX file in `/src/content/work/`)
- [ ] Case study 02 (MDX file in `/src/content/work/`)
- [ ] Case study 03 (MDX file in `/src/content/work/`)
- [ ] Dynamic route — `/work/[slug]`
- [ ] Results metrics on each study — quantified outcomes, not just process descriptions

### Insights Blog (`/insights`)

- [ ] Insights index page — blog archive
- [ ] Individual article template
- [ ] First article (MDX file in `/src/content/insights/`)
- [ ] Dynamic route — `/insights/[slug]`

### SEO

- [ ] Meta title + description per page
- [ ] Open Graph tags for social sharing
- [ ] `sitemap.xml` generated at build time
- [ ] `robots.txt`
- [ ] Semantic HTML audit — headings hierarchy, alt text on all images

### Content Infrastructure

- [ ] MDX processing pipeline wired in Vite
- [ ] Content schema validated (frontmatter: title, date, persona, excerpt, metrics)
- [ ] `/scaffold` skill tested for generating new case study MDX files

## Persona Gate

Before closing this phase:

1. **Sarah:** Does the case study payoff section answer "what did they actually get?" with a specific number or outcome?
2. **Marcus:** Does the Insights page demonstrate methodology depth — not just tips, but a point of view? Would he return to read the next post?

## Decisions Made

<!-- Log decisions as you build -->
