# DECISIONS.md
# Lily Pad Strategy & Design — Architecture Decision Log

> Log every decision that changes architecture, adds a dependency, or affects the schema.
> Format: `YYYY-MM-DD — Decision and rationale`

---

## 2026-05-24 — Adopted React Router v7 (library mode) for client-side routing

Used `createBrowserRouter` / `RouterProvider` from `react-router-dom` v7. Chose library mode (not framework mode) to stay within the existing Vite setup without requiring the React Router CLI or file-based routing. All public P1 routes (`/`, `/services`, `/about`, `/start`) are nested under a single `RootLayout` outlet.

---

## 2026-05-24 — Tailwind CSS v4 configured via CSS `@theme` block in `src/index.css`

Migrated from Tailwind v3 PostCSS config to the Tailwind v4 native approach: `@import "tailwindcss"` + `@theme {}` in `src/index.css`. Added `@tailwindcss/vite` plugin to `vite.config.ts`. The `tailwind.config.ts` file is retained as a documentation reference but is no longer loaded at runtime. All brand tokens (colors, fonts, shadows, max-widths) are defined in `index.css @theme`.

---

## 2026-05-24 — `@` path alias added to `vite.config.ts`

Added `resolve.alias` mapping `@` → `./src` to match the alias already configured in `vitest.config.ts`. Allows consistent `@/components/...` imports across app and test code.

---

## 2026-05-24 — Route pages use `React.lazy()` + `Suspense` for code splitting

All four P1 page components are dynamically imported via `lazy()` in `App.tsx`. This keeps the initial JS bundle at ~415KB (gzipped: 133KB) and loads each page chunk (~3–12KB each) only on first navigation. Chosen over static imports to keep startup performance acceptable as the page count grows in P2–P7.

---

## 2026-05-24 — `MotionConfig reducedMotion="user"` applied globally in `RootLayout`

Wrapped all public routes in a `<MotionConfig reducedMotion="user">` provider rather than adding per-component `useReducedMotion()` hooks. This means every Framer Motion animation throughout the site automatically respects the user's OS-level "reduce motion" preference — one declaration covers all current and future pages nested under `RootLayout`.

---

## 2026-05-24 — MDX content pipeline uses @mdx-js/rollup + Zod; no Contentlayer

Content for `/work` and `/insights` is authored in `.mdx` files with YAML frontmatter. Vite's `import.meta.glob` loads files eagerly at build time; Zod validates frontmatter schemas in `src/lib/content/`. Contentlayer was considered and rejected — it was deprecated and archived in 2024. Full decision in `docs/adr/ADR-0004-content-pipeline.md`.

---

## 2026-05-24 — Cal.com embed on `/start` uses iframe, no `@calcom/embed-react` package

The `/start` page embeds Cal.com via a plain `<iframe>` to avoid adding a dependency before an ADR is written. When the Cal.com account is created, replace the placeholder `src` attribute with the real booking URL (`https://cal.com/USERNAME/discovery`). If the richer embed API is needed (pre-fill, theming), open an ADR first.

---

## 2026-05-24 — Native React 19 document metadata for SEO

Used React 19's native support for document metadata tags (`<title>` and `<meta>` rendered inside page components, automatically hoisted to the HTML `<head>` by React). This avoids adding `react-helmet` or `react-helmet-async` to the bundle, reducing dependency footprint and maintaining zero-configuration runtime setup.
