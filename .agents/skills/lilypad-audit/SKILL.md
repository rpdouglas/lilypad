---
name: lilypad-audit
description: >-
  Traces systems architecture and documentation drift for Lily Pad. Activate this skill
  when onboarding to a new task session or checking code-docs synchronization to produce
  a comprehensive Gap Report without making files modifications.
---

# Codebase & Documentation Audit Protocol

**Run when onboarding a new AI session to the codebase, or after a long gap between sessions.**

## Role

Principal Architect — deep ingestion and gap analysis only. No code changes during this pass.

**Purpose:** Build a verified mental model of the current codebase, compare it against the docs to identify drift, produce a gap report, and wait for approval before fixing anything.

---

## Phase 1 — Architecture Trace

Start from the entry points and trace the key paths.

**Entry:** `index.html` → `src/main.tsx` → `src/App.tsx`
- How are routes structured? What is the top-level layout component?
- What is the difference between `RootLayout` (public) and `PortalLayout` (/portal/*)?
- Where are portal routes auth-gated? Is the check at the router level or inside components?
- Where is magic link auth handled? What Firebase Auth method is used?

**Firebase (`src/lib/firebase/`):**
- What services are initialized in `config.ts`? (Auth, Firestore, Storage?)
- List every file in `src/lib/firebase/` and what it exports.
- Are ALL Firebase client SDK calls contained within this directory? Search for any Firebase imports outside of it.
- Are any Firebase credentials present in `src/` outside of `import.meta.env` reads?

**Components:**
- What UI primitives exist in `src/components/ui/`? Do they all have co-located `.test.tsx` files?
- What marketing components exist in `src/components/marketing/`?
- What portal components exist in `src/components/portal/`?

**Types:**
- Does `src/lib/types.ts` exist? What interfaces are defined there?

---

## Phase 2 — Feature Map

For each area that exists in the codebase, identify:
- The React component(s) responsible for the UI.
- The hook(s) or Firebase functions managing data.
- The Firestore collection(s) it reads/writes (matched against `docs/firestore-schema.md`).
- The security rules that govern it.

Map these areas (skip if not yet built):
1. Public site pages — what exists vs what `docs/SITEMAP.md` shows as planned.
2. Client portal pages — what exists vs what's planned.
3. Firebase Auth flow (magic link, email/password).
4. All Firestore reads and writes (from `src/lib/firebase/`).

---

## Phase 3 — Documentation Comparison

### 3.1 Schema Drift

Compare `docs/firestore-schema.md` against actual Firestore reads/writes in `src/lib/firebase/`:
- All fields in code present in schema with correct type?
- All fields in schema still used in code (or should be marked deprecated)?
- Sub-fields of map types documented?

### 3.2 SITEMAP.md Drift

Compare `docs/SITEMAP.md` against routes defined in the app:
- Routes listed in SITEMAP.md — do they exist in code?
- Routes in code — are they in SITEMAP.md with the correct status?
- Persona annotations in page files — consistent with SITEMAP.md entries?

### 3.3 BRAND-TOKENS.md / tailwind.config.ts Drift

Compare `docs/BRAND-TOKENS.md` against `tailwind.config.ts` (or `@theme` in `src/index.css`):
- Are the colour values identical?
- Are the font families identical?
- Any custom tokens in the config not documented in BRAND-TOKENS.md?

### 3.4 Tech Debt Inventory

Run these searches and list every finding:

```bash
grep -r "console\.log" src/ --include="*.ts" --include="*.tsx"
grep -r "// TODO\|// FIXME" src/ --include="*.ts" --include="*.tsx"
grep -r ": any" src/ --include="*.ts" --include="*.tsx"
grep -rn "style={{" src/ --include="*.tsx"
```

List every finding with `file:line` and classify as blocking or non-blocking.

---

## Phase 4 — Gap Report

Produce a structured report. **Make no changes.** Present findings and wait for approval.

```
## Gap Report — Lily Pad Codebase Audit
Date: [YYYY-MM-DD]

### 1. Schema Drift
| Collection | Field | Issue | Severity |
|---|---|---|---|

### 2. Architecture Gaps
- [e.g., "Firebase called directly in ContactForm.tsx — must move to src/lib/firebase/"]
- [e.g., "Portal route /portal/dashboard has no auth gate at the router level"]

### 3. Documentation Gaps
- [e.g., "SITEMAP.md shows /pricing as 🔴 Not built but PricingPage.tsx exists"]
- [e.g., "tailwind.config.ts has forest-mid colour not documented in BRAND-TOKENS.md"]

### 4. Tech Debt Inventory
- [file:line] — [issue] — [blocking | non-blocking]

### Recommended Priorities
1. [Highest severity gap]
2. [Second priority]
3. [Third priority]
```

---

## Sign-Off

> **AUDIT COMPLETE.** Gap report delivered above. No changes made.
> Awaiting approval on which gaps to address and in what order.

---

*Lily Pad Strategy & Design · Adapted from docs/prompts/CODEBASE_AUDIT.md*
