# SITEMAP.md
# Lily Pad Strategy & Design — Site Map & Route Registry

> Every route in the application is documented here.
> Update this file whenever a new route is added, renamed, or removed.
> Phase status is updated as each phase ships to production.

---

## Route Overview

| Route                              | Page Name              | Phase | Status      | Auth Required |
|------------------------------------|------------------------|-------|-------------|---------------|
| `/`                                | Home                   | 1     | 🔴 Not built | No            |
| `/services`                        | Services Overview      | 1     | 🔴 Not built | No            |
| `/about`                           | About                  | 1     | 🔴 Not built | No            |
| `/start`                           | Start a Project        | 1     | 🔴 Not built | No            |
| `/work`                            | Case Studies Index     | 2     | ⏳ Upcoming  | No            |
| `/work/[slug]`                     | Individual Case Study  | 2     | ⏳ Upcoming  | No            |
| `/insights`                        | Blog Index             | 2     | ⏳ Upcoming  | No            |
| `/insights/[slug]`                 | Blog Article           | 2     | ⏳ Upcoming  | No            |
| `/portal`                          | Portal Login / Redirect| 3     | ⏳ Upcoming  | Yes           |
| `/portal/[client-slug]`            | Client Dashboard       | 3     | ⏳ Upcoming  | Yes           |
| `/portal/[client-slug]/[project-slug]` | Project / Demo Viewer | 3  | ⏳ Upcoming  | Yes           |
| `/portal/[client-slug]/feedback`   | Feedback Form          | 3     | ⏳ Upcoming  | Yes           |
| `/resources`                       | Lead Magnets           | 4     | ⏳ Upcoming  | No            |
| `/speaking`                        | Media Kit & Talks      | 7     | ⏳ Upcoming  | No            |

**Status key:**
- 🔴 Not built — route does not exist yet
- 🟡 In progress — currently being built
- 🟢 Live — deployed to production
- ⏳ Upcoming — planned for a future phase
- 🚫 Deprecated — route removed or redirected

---

## Phase 1 — Public Site MVP

> Target: 2–3 weeks · Priority: Critical

### `/` — Home

**Persona:** Sarah (primary), Marcus (secondary)

Sections, in order of conversion impact:

1. **Hero** — transformation headline, clarifying subhead, single CTA: "Start a Project" → `/start`
2. **Proof Strip** — quantified impact bar or client logo marquee
3. **Problem Framing** — articulates client pain before pitching anything
4. **Services Summary** — 3–4 outcome-focused cards linking to `/services`
5. **Featured Case Study** — strongest work in Problem → Approach → Result format
6. **Process Preview** — 3–5 step visual of how an engagement works
7. **Testimonials** — 2–3 client quotes (video embed placeholder ready for Phase 5)
8. **Insight Teaser** — latest 3 blog posts (hardcoded placeholders until Phase 2)
9. **Final CTA** — full-width forest block, "Book a discovery call" → `/start`

---

### `/services` — Services Overview

**Persona:** Marcus (primary), Sarah (secondary)

Sections:

1. **Page Hero** — outcome-focused headline
2. **Service Blocks** — one full-width section per service (alternating layout):
   - Brand Strategy
   - Web Development
   - Design Systems
   - Launch Packages
3. **Process Walkthrough** — detailed phase-by-phase engagement breakdown
4. **Pricing Signal** — package tiers with starting prices or ranges
5. **FAQ** — accordion covering 6–8 common pre-sales objections
6. **CTA** — → `/start`

> Note: Individual `/services/[slug]` sub-pages are deferred to Phase 2.
> Phase 1 covers all four services on a single overview page.

---

### `/about` — About Lily Pad

**Persona:** Marcus (primary), Sarah (secondary)

Sections:

1. **Founder Story** — narrative origin, mission, unique positioning
2. **Founder Photo + Bio** — large warm photo, asymmetric layout
3. **Values** — 3–4 principle cards (e.g. "Transparency over surprises")
4. **How We Work** — brief process philosophy
5. **Press / Appearances** — podcast mentions, press links, third-party validation
6. **CTA** — → `/start`

---

### `/start` — Start a Project

**Persona:** Sarah (primary), Marcus (secondary)

Sections:

1. **Short headline** — "Let's talk"
2. **What to expect** — mini-timeline: Book → Brief review → Discovery call → Proposal
3. **Cal.com booking embed** — full-width, mobile-optimised
4. **Contact form fallback** — name, email, company, project type, message
5. **Trust signals** — 3 brief proof points below the embed

---

## Phase 2 — Work & Insights

> Target: 1–2 weeks after Phase 1 · Priority: Critical

### `/work` — Case Studies Index

**Persona:** Marcus (primary), Sarah (secondary)

- Grid of all published case studies
- Filter by service type (optional, Phase 7)
- Each card: project name, client industry, services delivered, hero image

### `/work/[slug]` — Individual Case Study

**Persona:** Marcus (primary)

Structure per case study:
1. Hero image + client name
2. Brief (the problem)
3. Approach (the process)
4. Result (quantified outcome)
5. Client quote + photo
6. Next/Prev case study navigation
7. CTA → `/start`

Content format: **MDX files** in `src/content/case-studies/`
Minimum 3 case studies required before Phase 2 ships.

### `/insights` — Blog Index

**Persona:** Marcus (primary)

- Reverse-chronological list of all posts
- Each card: title, date, 2-line excerpt, read time, category tag

### `/insights/[slug]` — Blog Article

**Persona:** Marcus (primary)

- Full article in MDX format
- Author block, date, read time, category tags
- Related posts (2–3) at the bottom
- CTA → `/start`

Content format: **MDX files** in `src/content/blog/`

---

## Phase 3 — Client Portal

> Target: 2–3 weeks after Phase 2 · Priority: Critical · Auth Required

### `/portal` — Portal Entry

- Unauthenticated users: redirect to magic link login flow
- Authenticated users: redirect to their client dashboard
- No public-facing content at this route

### `/portal/[client-slug]` — Client Dashboard

**Persona:** Dana (exclusive)

- Lists all active projects for this client
- Project cards show: title, status badge (In Review / Approved / Archived), revision round
- Magic link login — 30-day session persistence

### `/portal/[client-slug]/[project-slug]` — Demo Viewer

**Persona:** Dana (exclusive)

- Embeds the deliverable: Figma prototype iframe, video, PDF, or web preview
- Revision history toggle (Round 1, Round 2, etc.)
- Link to feedback form

### `/portal/[client-slug]/feedback` — Feedback Form

**Persona:** Dana (exclusive)

- Section selector (which part of the deliverable)
- Comment field
- Submit → writes to Firestore + triggers Slack/email notification

---

## Phase 4 — Conversion Layer

> Target: 1 week after Phase 3 · Priority: High

### `/resources` — Lead Magnets

- Gated PDF downloads (email capture required)
- E.g. "Brand Audit Checklist", "Launch Readiness Assessment"
- Email capture feeds newsletter integration

---

## Phase 7 — Scale

> Priority: Low · Ongoing

### `/speaking` — Media Kit & Talks

- Speaking topics, bio, headshot downloads
- Past appearances and podcast links
- Booking inquiry form

---

## Layout & Shared Components

### RootLayout (wraps all public routes)

- **Navbar** — logo, nav links (Services, Work, About), coral "Start a Project" CTA
  - Sticky on scroll, transparent → white transition
  - Mobile: hamburger drawer
- **Footer** — logo, tagline, nav links, social links, "Book a discovery call" CTA
  - Background: `bg-forest`, text: `text-cream`

### PortalLayout (wraps all `/portal/*` routes)

- No public Navbar or Footer
- Portal-specific header: Lily Pad logo + client name + sign out link
- Auth gate: redirects to magic link flow if no valid session

---

## File Naming Conventions

| Route type          | File location                              | Example                              |
|---------------------|--------------------------------------------|--------------------------------------|
| Page component      | `src/pages/PageName.tsx`                   | `src/pages/HomePage.tsx`             |
| Layout component    | `src/layouts/LayoutName.tsx`               | `src/layouts/RootLayout.tsx`         |
| Marketing component | `src/components/marketing/ComponentName.tsx`| `src/components/marketing/Hero.tsx`  |
| Portal component    | `src/components/portal/ComponentName.tsx`  | `src/components/portal/ProjectCard.tsx`|
| UI primitive        | `src/components/ui/ComponentName.tsx`      | `src/components/ui/Button.tsx`       |
| Case study content  | `src/content/case-studies/[slug].mdx`      | `src/content/case-studies/acme-brand.mdx`|
| Blog content        | `src/content/blog/[slug].mdx`              | `src/content/blog/why-brand-strategy-first.mdx`|

---

*Last updated: May 2026 — update status column as each route ships to production.*