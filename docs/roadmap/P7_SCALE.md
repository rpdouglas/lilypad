# P7 — Scale

**Status:** 📋 Planned
**Priority:** Low
**Started:** —
**Target:** Ongoing
**Primary Personas:** All — this phase improves the system for every persona simultaneously

## Goal

Harden the design system, add bilingual support, and explore performance and experimentation tooling. These are high-leverage improvements that compound over time but are not blocking any business-critical workflow.

## Deliverables

### Storybook Component Library

- [ ] Storybook installed and configured
- [ ] All design system primitives documented (Button, Card, Badge, Input, etc.)
- [ ] Marketing components documented (Hero, ProofStrip, Testimonial, CaseStudyCard)
- [ ] Portal components documented (ProjectCard, FeedbackForm, DemoViewer)
- [ ] Deployed Storybook URL for sharing with collaborators

### Bilingual Support (EN/FR)

- [ ] i18n library chosen and integrated (e.g. react-i18next)
- [ ] Language toggle in nav bar — trust signal for Denise and Marcel (Cornwall personas)
- [ ] All public site copy translated — EN and FR
- [ ] URL strategy decided: `/fr/` prefix or `?lang=fr` query param (ADR required)
- [ ] French content reviewed by a native speaker
- [ ] Bilingual meta tags and Open Graph

### A/B Testing

- [ ] A/B testing tool chosen (e.g. GrowthBook, Firebase Remote Config, or simple manual variant)
- [ ] First experiment defined — likely hero headline variants for Sarah conversion
- [ ] Analytics events tied to experiment variants

### Speaking Page (`/speaking`)

- [ ] Media kit — bio, headshot, talk topics
- [ ] Past appearances listed
- [ ] Speaking inquiry form or Cal.com link for speaking bookings

## Persona Gate

Before closing any deliverable in this phase:

1. **Bilingual:** Would Denise Beauchamp (bilingual French/English Cornwall boutique owner) feel respected by the French translation — or does it feel machine-translated?
2. **Marcel Chartrand (Franco-Ontarian trades persona):** Is the language toggle prominent enough that he notices it without hunting for it?
3. **Storybook:** Can a second developer onboard to this codebase using Storybook alone — without needing to read the source?

## Decisions Made

<!-- Log decisions as you build -->
