# P0 — Foundation

**Status:** ✅ Done
**Priority:** Critical
**Completed:** 2026-05-24
**Primary Persona:** All — this phase has no user-facing output; it is the foundation everything else builds on.

## Goal

Establish the repository, tooling, documentation baseline, and CI/CD pipeline before a single component is built. Phase 0 cannot be skipped — everything in P1–P7 depends on it.

## Deliverables

- [x] Repository created and structured
- [x] CLAUDE.md — AI context file with brand, stack, personas, and conventions
- [x] `/docs/personas/` — Sarah, Marcus, Dana (website personas) as Markdown files
- [x] `/docs/BRAND-TOKENS.md` — color, typography, and spacing tokens
- [x] `/docs/SITEMAP.md` — agreed page architecture
- [x] Firebase project created (`freshnest-aa51e`)
- [x] CI/CD pipeline — `ci-dev.yml` (develop → dev channel) and `ci-prod.yml` (main → live)
- [x] GitHub Actions secrets wired (Firebase service account + VITE_ env vars)
- [x] `.claude/commands/` — 8 governance skills (read-state, plan, approve, testing, ticket-close, fix, audit, scaffold)
- [x] `docs/roadmap/` — phase-driven milestone files (this file)
- [ ] `.devcontainer/devcontainer.json` — reproducible Codespaces environment

## Persona Gate

No user-facing gate. Gate is operational: does the CI pipeline pass? Does Claude Code read CLAUDE.md correctly on session start? Can you run `/scaffold` and get a correctly branded output?

## Decisions Made

- 2026-05-24 — Chose `ci-dev.yml` / `ci-prod.yml` (Approach B, solo developer) over PR-gated workflow. Deleted 5 duplicate/broken Firebase CLI auto-generated workflows. See plan: `docs/plans/can-you-review-the-deep-honey.md`.
- 2026-05-24 — Archived `antigravity.js` to `scripts/archive/`. Replaced by `/scaffold` Claude Code skill which provides real brand and persona context rather than static templates.
- 2026-05-24 — Claude Code skills scoped to project (`.claude/commands/`) and committed to git — not user-global.
- 2026-05-24 — `docs/roadmap/` structure adopted (Approach B: Phase-Driven Milestone Files) for project governance.
