# Feature Plan — SEO Foundations (Sitemap, Robots, and HTML Audit)

**Created:** 2026-05-24  
**Phase:** P2 — Work & Insights  
**Status:** Awaiting `/approve`  

---

## Phase 1 — Persona & Compliance Gate

1. **Identify the Persona:**
   *   **Sarah (Founder):** Needs immediate search visibility to find Lily Pad when searching for boutique strategy and design agencies. Having a valid sitemap.xml ensures pages are indexed by Google Search Console.
   *   **Marcus (Marketing Director):** Evaluates our authority by searching for insights, strategy frameworks, and case studies. He expects clear heading structures, structured outlines, and indexable sub-pages.
   
2. **Compliance Checks:**
   *   **User data / PII:** Zero. The files `sitemap.xml` and `robots.txt` are public, static crawling instructions. They contain no user sessions, IP logs, or personal metrics.
   *   **Firebase Auth:** Not required. SEO files must be fully public for engine crawler access.
   *   **Accessibility (A11y):** The semantic HTML audit directly improves accessibility (verifying heading hierarchies h1→h2→h3, image `alt` attributes, clear keyboard focus ring states, and structural landmarks).

---

## Phase 2 — Schema Audit

This feature implements indexing metadata and semantic markup. No database reads or writes are performed.

*   **Collections read:** NONE
*   **Collections written:** NONE
*   **New fields required:** NONE

---

## Phase 3 — Three-Strategy Proposal

### Strategy A — Minimal (Static Public Assets)
*Manually create static crawling files and check off the task list.*
- **Architecture:** 
  *   Create a hardcoded `public/sitemap.xml` listing static paths.
  *   Create a hardcoded `public/robots.txt` targeting the root domain.
  *   Skip dynamic generation.
- **Trade-offs:** 
  *   High maintenance. Every time a new case study or blog post is added via the `/scaffold` CLI, the sitemap must be manually edited. If forgotten, search index drift accumulates immediately.
- **Scope:** Small

---

### Strategy B — Recommended (Automated Build-Time Script + Hoisting Fixes)
*Automatically generate dynamic sitemaps during the production build step and audit pages.*
- **Architecture:**
  1.  **Sitemap Script:** Create `scripts/generate-sitemap.js` in Node.js (ESM). It loads the static pages directory alongside MDX files from `src/content/case-studies/` and `src/content/blog/`, parses frontmatter for modification dates, and compiles a comprehensive `sitemap.xml`.
  2.  **Vite Hook:** Configure `package.json` to trigger this script automatically during `npm run build` (via a `postbuild` script: `tsc && vite build && node scripts/generate-sitemap.js`). The script outputs the file directly into `dist/sitemap.xml`.
  3.  **Robots.txt:** Add a clean, compliant `public/robots.txt` referencing the canonical sitemap address `https://lilypad.design/sitemap.xml`.
  4.  **Metadata & HTML Hoisting Audit:** 
      *   Fix pages like `HomePage.tsx`, `AboutPage.tsx`, and `ServicesPage.tsx` which currently lack self-contained React 19 `<title>` and `<meta name="description">` hoists, ensuring every public route defines its own custom metadata.
      *   Audit headings hierarchy (confirm single `h1` per page, sequential `h2` and `h3`).
      *   Verify descriptive `alt` tags on all brand illustrations.
- **Trade-offs:** 
  *   Adds a tiny build-time script (~60 lines) in Node, but guarantees zero-maintenance SEO and keeps MDX blog releases fully decoupled from manual configurations.
- **Scope:** Medium

---

### Strategy C — Robust (Third-Party Crawler Plugin)
*Integrate a heavy third-party crawl framework.*
- **Architecture:**
  *   Install a heavy external crawling dependency (e.g. `vite-plugin-sitemap` or similar third-party libraries).
  *   Boot up local dev servers on headless containers to scrape internal anchor tags at build time.
- **Trade-offs:** 
  *   Adds deep dependency chains in `package.json`, slows down build compilation pipelines, and introduces complexity that easily breaks on server port configuration changes.
- **Scope:** Large

---

## Phase 4 — Recommendation

**Recommend Strategy B.**

It is simple, automated, and robust without adding massive third-party package overhead. It integrates cleanly into our NPM build pipeline, keeps the dynamic `/work` and `/insights` content perfectly synchronized with crawler indexes, and ensures our semantic HTML hierarchy is optimized for search visibility.

### Proposed Action Items:
1.  Create the `public/robots.txt` file.
2.  Write the `scripts/generate-sitemap.js` Node script to dynamically build the map under `dist/` at compile time.
3.  Add the script hook to `package.json`'s build execution commands.
4.  Hoist SEO tags (`<title>` and `<meta>`) in `HomePage.tsx`, `AboutPage.tsx`, `ServicesPage.tsx`, and `StartPage.tsx` to align with dynamic pages.
5.  Audit header semantic hierarchy and `alt` tags on static images.
