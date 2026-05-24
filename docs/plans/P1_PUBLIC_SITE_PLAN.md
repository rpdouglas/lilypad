# P1 Public Site MVP — Feature Plan

**Created:** 2026-05-24
**Phase:** P1 — Public Site MVP
**Status:** In Progress — implementation delivered 2026-05-24, awaiting `/testing`

---

## Phase 1 — Persona & Compliance Gate

### Personas Served

| Persona | Primary pages | Core need |
|---------|---------------|-----------|
| **Sarah** (Founder, prospective client) | `/`, `/start` | Understands the offer in under 10 seconds on mobile; CTA visible without scrolling; can book a call with zero friction |
| **Marcus** (Marketing Director, prospective client) | `/services`, `/about` | Enough process depth to justify budget to stakeholders; clear methodology and defined deliverables |
| **Dana** (Active Client) | Not in scope | Portal is P3 |

### Compliance Checks

- **User data / PII:** No P1 page collects or stores user data in Firestore. The `/start` booking flow uses a Cal.com embed — scheduling data lives with Cal.com, not in our Firestore. No auth, no PII on our side.
- **Firebase Auth:** Not required for any P1 route. All four pages are fully public.
- **Accessibility:** All pages must use semantic HTML (landmark regions, proper heading hierarchy h1→h2→h3), descriptive `alt` text on images, keyboard-navigable interactive elements (nav, CTA buttons, Cal.com embed), and sufficient color contrast (forest on cream, cream on forest both pass WCAG AA).

---

## Phase 2 — Schema Audit

P1 is entirely static marketing content. No Firestore interaction is required.

- **Collections read:** NONE
- **Collections written:** NONE
- **New fields required:** NONE

The Cal.com embed on `/start` is a third-party iframe — no Firestore fields are needed to support it.

---

## Phase 3 — Three-Strategy Proposal

### Strategy A — Minimal
*Get content on screen as fast as possible.*

**Architecture:**
- Keep App.tsx as the entry point; add a simple `switch`/conditional render or minimal React Router setup to serve the four pages.
- Build each page as a self-contained component with its own hardcoded Navbar and Footer markup (copy-pasted per page).
- Skip Framer Motion for now.
- No shared layout component.

**Trade-offs:**
- Zero layout reuse: Navbar/Footer changes require editing four files.
- Motion deferred creates a second pass before the phase can close.
- Accumulates structural tech debt before content is even finalized.

**Scope:** Small

---

### Strategy B — Recommended
*Lay the right architecture once, then build four pages cleanly on top of it.*

**Architecture:**
1. **Router setup** — migrate `App.tsx` to React Router v7. Wire a `RootLayout` around all public routes (`/`, `/services`, `/about`, `/start`).
2. **RootLayout** — `src/layouts/RootLayout.tsx` with a shared `Navbar` and `Footer` component (both in `src/components/marketing/`).
3. **Navbar** — logo, nav links (Services, About, Start a Project), coral CTA button `"Start a Project"`, mobile hamburger drawer. Forest background, cream text.
4. **Footer** — logo, tagline, nav links, social links, coral CTA, copyright. Forest background.
5. **Pages** (built in priority order):
   - `HomePage.tsx` — all 9 sections from the P1 deliverables list; Sarah's needs (hero + CTA above the fold on 375px) gate delivery.
   - `ServicesPage.tsx` — overview + 4 service sub-cards; Marcus's needs (process depth, methodology) gate delivery.
   - `AboutPage.tsx` — founder story, values, team.
   - `StartPage.tsx` — Cal.com embed, minimal nav distraction (no footer nav on this page per P1 spec).
6. **Marketing section components** in `src/components/marketing/` — extracted as needed (e.g., `HeroSection`, `TestimonialCard`, `ServiceCard`, `ProcessStep`).
7. **Framer Motion** — entrance animations on section reveal using the standard pattern from `BRAND-TOKENS.md`; page transition on route change.
8. **Responsive** — all pages tested at 375px, 768px, 1280px before phase close.
9. **Deployment** — production domain + SSL (handled outside codebase; Vite `build` output to `dist/`).

**Trade-offs:**
- Router and layout scaffolding adds ~1–2 sessions before first content is visible, but this is unavoidable if we want to avoid the Strategy A rewrite.
- Cal.com embed requires a third-party script; load performance should be monitored but is acceptable for MVP.

**Scope:** Medium

---

### Strategy C — Robust
*CMS-driven content, full analytics instrumentation, A/B infrastructure from day one.*

**Architecture:**
- Replace all hardcoded page content with a headless CMS (e.g., Contentful, Sanity) so copy can be edited without a deploy.
- MDX-driven case study teasers and blog placeholders.
- Analytics events wired to every CTA click via a tracking abstraction layer.
- A/B test infrastructure on hero headline and CTA copy.
- i18n scaffold for potential future French-language version.

**Trade-offs:**
- CMS integration adds significant setup overhead for a solo-operator site where content changes infrequently and the owner is the only editor.
- MDX pipeline duplicates work already planned for P2.
- A/B infrastructure and analytics are explicitly P4 (Conversion Layer) scope.
- i18n has no stated requirement.
- This approach delays shipping a live site by weeks for features with no near-term payoff.

**Scope:** Large

---

## Phase 4 — Recommendation

**Recommend Strategy B.**

The project is at the very start of P1 — `App.tsx` is still the default Vite scaffold, no routing exists, and the only page file is `PricingPage.tsx` (an orphan with no route). The right move is to establish the router and shared layout once, correctly, so all four P1 pages can be built and maintained cleanly. Strategy A creates layout debt that will be painful to fix once four pages of content exist. Strategy C defers the live site for features with no active requirement.

**Recommended build order:**
1. Wire React Router v7 in `App.tsx` / `main.tsx`
2. Create `RootLayout` with `Navbar` and `Footer`
3. `HomePage` (highest persona priority — Sarah's gate)
4. `ServicesPage` (Marcus's gate)
5. `AboutPage`
6. `StartPage` with Cal.com embed
7. Add Framer Motion page transitions
8. Cross-device testing (375px / 768px / 1280px)
9. Production deploy + SSL

---

**Waiting for `/approve` before writing any implementation code.**
