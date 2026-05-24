# SITEMAP.md
# Lily Pad Strategy & Design — Site Map & Route Registry

> Every route in the application is documented here.
> Update this file whenever a new route is added, renamed, or removed.
> Phase status is updated as each phase ships to production.

---

## Route Overview

| Route                                  | Page Name              | Phase | Status       | Auth Required |
|----------------------------------------|------------------------|-------|--------------|---------------|
| /                                      | Home                   | 1     | 🟢 Live      | No            |
| /services                              | Services Overview      | 1     | 🟢 Live      | No            |
| /about                                 | About                  | 1     | 🟢 Live      | No            |
| /start                                 | Start a Project        | 1     | 🟢 Live      | No            |
| /work                                  | Case Studies Index     | 2     | 🟢 Live      | No            |
| /work/[slug]                           | Individual Case Study  | 2     | 🟢 Live      | No            |
| /insights                              | Blog Index             | 2     | 🟢 Live      | No            |
| /insights/[slug]                       | Blog Article           | 2     | 🟢 Live      | No            |
| /portal                                | Portal Login/Redirect  | 3     | ⏳ Upcoming  | Yes           |
| /portal/[client-slug]                  | Client Dashboard       | 3     | ⏳ Upcoming  | Yes           |
| /portal/[client-slug]/[project-slug]   | Demo Viewer            | 3     | ⏳ Upcoming  | Yes           |
| /portal/[client-slug]/feedback         | Feedback Form          | 3     | ⏳ Upcoming  | Yes           |
| /resources                             | Lead Magnets           | 4     | ⏳ Upcoming  | No            |
| /speaking                              | Media Kit & Talks      | 7     | ⏳ Upcoming  | No            |

Status key:
- 🔴 Not built — route does not exist yet
- 🟡 In progress — currently being built
- 🟢 Live — deployed to production
- ⏳ Upcoming — planned for a future phase
- 🚫 Deprecated — route removed or redirected

---

## Phase 1 Routes

### / — Home
Persona: Sarah (primary), Marcus (secondary)
Sections: Hero, Proof Strip, Problem Framing, Services Summary,
Featured Case Study, Process Preview, Testimonials, Insight Teaser, Final CTA

### /services — Services Overview
Persona: Marcus (primary), Sarah (secondary)
Sections: Page Hero, Service Blocks x4, Process Walkthrough, Pricing Signal, FAQ, CTA

### /about — About Lily Pad
Persona: Marcus (primary), Sarah (secondary)
Sections: Founder Story, Founder Photo + Bio, Values, How We Work, Press, CTA

### /start — Start a Project
Persona: Sarah (primary), Marcus (secondary)
Sections: Headline, What to expect, Cal.com embed, Contact form fallback, Trust signals

---

## Shared Layout

### RootLayout (all public routes)
- Navbar: logo, nav links, coral CTA button, mobile hamburger drawer
- Footer: logo, tagline, nav links, social links, CTA, copyright

### PortalLayout (all /portal/* routes)
- No public Navbar or Footer
- Portal header: logo + client name + sign out
- Auth gate: redirects to magic link flow if no valid session

---

## File Naming Conventions

| Route type           | Location                                    |
|----------------------|---------------------------------------------|
| Page component       | src/pages/PageName.tsx                      |
| Layout component     | src/layouts/LayoutName.tsx                  |
| Marketing component  | src/components/marketing/ComponentName.tsx  |
| Portal component     | src/components/portal/ComponentName.tsx     |
| UI primitive         | src/components/ui/ComponentName.tsx         |
| Case study content   | src/content/case-studies/[slug].mdx         |
| Blog content         | src/content/blog/[slug].mdx                 |

---

Last updated: 2026-05-24 — P1 and P2 pages fully complete; routes set to 🟢 Live.
