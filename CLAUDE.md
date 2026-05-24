# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context
Lily Pad Strategy & Design — consulting site + client portal.
Stack: React 19, Vite, Tailwind CSS v4, Firebase, TypeScript, React Router v7, Framer Motion.

## Commands

```bash
npm run dev            # Start Vite dev server at localhost:5173
npm run build          # Type-check (tsc) then Vite build → dist/
npm run lint           # ESLint
npm run lint:fix       # ESLint with auto-fix
npm run format         # Prettier (src/**/*.{ts,tsx})
npm run test           # Run all tests (Vitest, single run)
npm run test:watch     # Vitest in watch mode
npm run test:coverage  # Coverage report → coverage/
```

Run a single test file:

```bash
npx vitest run src/components/ui/Button.test.tsx
```

## Environment

Copy `.env.local.example` → `.env.local` and fill in Firebase credentials. The six required vars are `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`. They are read in `src/lib/firebase/config.ts` which exports `auth`, `db`, and `storage`.

## Architecture

### Directory conventions

| Path | Purpose |
|---|---|
| `src/pages/` | Page-level components (one per route) |
| `src/layouts/` | RootLayout (public), PortalLayout (/portal/*) |
| `src/components/ui/` | Design-system primitives (Button, etc.) |
| `src/components/marketing/` | Public-site section components |
| `src/components/portal/` | Client-portal-only components |
| `src/lib/firebase/` | All Firebase calls — never import Firebase in components |
| `src/content/case-studies/` | MDX content for /work/[slug] |
| `src/content/blog/` | MDX content for /insights/[slug] |

Path alias `@` maps to `./src` (configured in `vitest.config.ts`; add to `vite.config.ts` when needed).

### Routing

Two layouts are planned (see `docs/SITEMAP.md`):
- **RootLayout** — wraps all public routes; includes Navbar and Footer
- **PortalLayout** — wraps `/portal/*` routes; auth-gated, no public nav

All routes and their build phase status are tracked in `docs/SITEMAP.md`. Update it when adding routes.

### Firebase

`auth`, `db`, `storage` are initialized once in `src/lib/firebase/config.ts`. Tests mock this module automatically via `src/test/setup.ts` — no real network calls in tests.

Firestore security: all collections are locked down by default; `clients/{clientId}` is readable only by the matching authenticated email.

### Testing

Vitest + jsdom + Testing Library. Firebase is mocked globally in `src/test/setup.ts`. Test files live next to the component they test (`Component.test.tsx`).

## Brand & Design

### Personas (always consider when building UI)
- **Sarah** (Founder): mobile-first, fast decisions, needs social proof
- **Marcus** (Marketing Dir): desktop, process-oriented, needs specifics
- **Dana** (Active Client): portal only, mobile + desktop, needs clarity

All new page files must include a persona annotation comment at the top (see `src/pages/PricingPage.tsx` for the pattern).

### Tailwind tokens

| Token | Value |
|---|---|
| `forest` | `#2C3E2D` — nav, footer, headings |
| `coral` | `#E8614A` — CTAs, italic accents |
| `cream` | `#FAF8F4` — page background |
| `stone` | `#8A9080` — muted text, borders |
| `dark` | `#1A2418` — deepest text |
| `font-display` | Cormorant Garamond — all h1–h3 |
| `font-sans` | Outfit — body, buttons, nav |
| `font-mono` | DM Mono — tags, labels, overlines |
| `max-w-content` | 900px — standard content container |

Full token reference: `docs/BRAND-TOKENS.md` (colors, type scale, spacing, motion, breakpoints).

Rules: use only named Tailwind classes (no raw hex, no arbitrary spacing). Headings always `font-display`. Italic accent words in headings: `<em className="italic text-coral">`. Always mobile-first (`lg:` for desktop).

## Anti-Regression Rules

These are hard stops — violations block the PR.

1. **No hardcoded hex values** — use named Tailwind classes only (`text-forest`, `text-coral`, `bg-cream`, etc.). No `#E8614A`, no `style={{ color: ... }}`. Reference `docs/BRAND-TOKENS.md`.
2. **No field invention** — never assume a Firestore field exists. If it is not in `docs/firestore-schema.md`, you cannot query or write it without adding it there first.
3. **No complex animations** — stick to `transition-colors duration-150` for hovers and the Framer Motion entrance pattern from `docs/BRAND-TOKENS.md`. No bounce, particles, or constant micro-animations.
4. **No Firebase in components** — client SDK calls live exclusively in `src/lib/firebase/`. Components consume hooks or abstracted service functions only.

## Governance Gate

For any new feature, run `/plan` first and wait for `/approve` before writing implementation code. The workflow:

```
/read-state → /plan → /approve → (code) → /testing → /ticket-close
```

Use `/scaffold` to create pages, components, case studies, and blog posts with brand context pre-applied. Use `/fix` for bugs. Use `/audit` to orient a new session.

## Project Roadmap

Phased build plan lives in `docs/roadmap/`. Start there to understand what phase is active and what comes next.

| File | Purpose |
|---|---|
| `docs/roadmap/ROADMAP.md` | Master index — phase status at a glance |
| `docs/roadmap/P0_FOUNDATION.md` | Foundation (done) |
| `docs/roadmap/P1_PUBLIC_SITE.md` | Public site MVP (active) |
| `docs/roadmap/P2_WORK_INSIGHTS.md` → `P7_SCALE.md` | Future phases |
| `docs/roadmap/BACKLOG.md` | Parking lot for unplaced ideas |

When starting a session: check `ROADMAP.md` for current phase, open the active phase file, run `/read-state`.

## Conventions
- Components: PascalCase, co-located test files (`Component.test.tsx`)
- Tailwind only — no inline styles, no CSS modules
- Firebase calls only in `src/lib/firebase/` — never in components directly
- ADR required when adding new dependencies (`docs/adr/`)
- Update `docs/` when changing architecture
