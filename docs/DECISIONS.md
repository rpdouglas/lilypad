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


## 2026-05-24 — MDX content pipeline uses @mdx-js/rollup + Zod; no Contentlayer

Content for `/work` and `/insights` is authored in `.mdx` files with YAML frontmatter. Vite's `import.meta.glob` loads files eagerly at build time; Zod validates frontmatter schemas in `src/lib/content/`. Contentlayer was considered and rejected — it was deprecated and archived in 2024. Full decision in `docs/adr/ADR-0004-content-pipeline.md`.

---

## 2026-05-24 — Cal.com embed on `/start` uses iframe, no `@calcom/embed-react` package

The `/start` page embeds Cal.com via a plain `<iframe>` to avoid adding a dependency before an ADR is written. When the Cal.com account is created, replace the placeholder `src` attribute with the real booking URL (`https://cal.com/USERNAME/discovery`). If the richer embed API is needed (pre-fill, theming), open an ADR first.

---

## 2026-05-24 — Native React 19 document metadata for SEO

Used React 19's native support for document metadata tags (`<title>` and `<meta>` rendered inside page components, automatically hoisted to the HTML `<head>` by React). This avoids adding `react-helmet` or `react-helmet-async` to the bundle, reducing dependency footprint and maintaining zero-configuration runtime setup.

---

## 2026-05-24 — Brand logo assets integrated into Navbar, Footer, and Favicon metadata

Integrated high-fidelity transparent brand PNG logos into the Navbar (using responsive scaling `h-6 lg:h-7`) and the Footer (at `h-8`), establishing descriptive screen-reader `alt` tags and active-state tap configurations. Integrated the circular logo stamp as an `apple-touch-icon` link in `index.html` for high-density platform shortcuts, establishing a structural governance model that mandates vector SVGs for all subsequent vector asset designs.

---

## 2026-05-24 — Automated build-time sitemap.xml generator script

Implemented a custom ES-module Node script (`scripts/generate-sitemap.js`) that automatically scans our dynamic case studies and blog posts to compile a complete XML sitemap at build time. Triggered via a `postbuild` hook in `package.json` to write directly to `dist/sitemap.xml`, ensuring search indexing remains up-to-date with dynamic MDX content without any manual maintenance.

---

## 2026-05-24 — robots.txt crawler configuration

Created a clean `public/robots.txt` specifying custom Allow and Disallow policies. Disallowed indexing on the `/portal/` directory to protect private client layouts and data from public crawl cycles, while declaring the canonical sitemap reference at `https://lilypad.design/sitemap.xml`.

---

## 2026-05-24 — Hoisted document metadata inside core pages

Completed the meta tag audit by adding React 19 native hoisting tags (`<title>` and `<meta name="description">`) directly inside `HomePage.tsx`, `AboutPage.tsx`, `ServicesPage.tsx`, and `StartPage.tsx` to ensure all core page routes define custom SEO indexing details.

---

## 2026-05-25 — P3 Client Portal: Firebase email link (magic link) authentication

Chose Firebase Auth's email link (passwordless) provider for portal sign-in. Rationale: clients (Dana, Robert) are non-technical and must not manage passwords. Magic links provide a friction-free sign-in with zero account creation UX. Firebase's default `LOCAL` persistence satisfies the 30-day session requirement without explicit `setPersistence` calls.

---

## 2026-05-25 — P3 Client Portal: Firestore subcollection schema

Chose a subcollection model (`clients/{clientId}/projects/{projectId}/deliverables`, `…/feedback`) over a flat array on `clients/{clientId}`. Subcollections support revision rounds, multi-project clients, and independent access-control rules on each level. See `docs/firestore-schema.md` for all field definitions.

---

## 2026-05-25 — P3 Client Portal: `PortalLayout` auth guard with `subscribeToAuthState` abstraction

The auth guard lives in `PortalLayout`. It subscribes to Firebase auth state via `subscribeToAuthState` (from `src/lib/firebase/auth.ts`) and looks up the client profile via `getClientByEmail` (from `src/lib/firebase/portal.ts`). Unauthenticated or unrecognized visitors are redirected to `/portal/auth`. The authenticated `user` and `client` are passed to child routes via React Router's `useOutletContext` hook.

---

## 2026-05-25 — P3 Client Portal: Cloud Functions deferred to follow-up PR

Email notification on feedback submission and signed asset download URLs both require Firebase Cloud Functions. These are excluded from the P3 initial build to keep the scope reviewable. The Firestore feedback collection is fully functional without the notification trigger. Signed asset downloads are documented as a manual workaround until the Cloud Function is shipped.

---

## 2026-05-25 — P3 Client Portal: `react-hooks/set-state-in-effect` downgraded to warn in ESLint config

The `eslint-plugin-react-hooks` v7 introduced `set-state-in-effect` as an error, which fires on all async `setState` calls inside `useEffect` — including the standard cancel-flag data-fetching pattern used throughout the portal pages. Rule downgraded to `warn` in `eslint.config.js`. Will revisit if/when portal data fetching adopts React 19's `use()` API with Suspense boundaries.

---

## 2026-05-25 — P3 Client Portal: Composite Firestore index for deliverables two-field `orderBy`

Added a composite index on `deliverables` (`revisionRound DESC, createdAt DESC`) in `firestore.indexes.json`. Required because Firestore cannot serve a query with two `orderBy` fields using its auto-generated single-field indexes. Without this, the deliverables query throws at runtime with a console link to create the index.

---

## 2026-05-25 — P3 Client Portal: `firebase.json` updated to include Firestore targets

Added `"firestore": { "rules": "firestore.rules", "indexes": "firestore.indexes.json" }` to `firebase.json`. Without this block, `firebase deploy --only firestore:rules,firestore:indexes` fails with "No targets match". The `hosting` block was the only pre-existing target.
