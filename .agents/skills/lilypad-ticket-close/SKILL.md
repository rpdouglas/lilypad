---
name: lilypad-ticket-close
description: >-
  Runs the Ticket Close & Drift Detection protocol for Lily Pad. Activate this skill
  after a QA verification passes to synchronize Firestore schemas, record choices in
  DECISIONS.md, and compile PR documentation metadata.
---

# Ticket Close & Drift Detection Protocol

**Run after QA passes on any feature or bug fix, before opening a PR.**

## Setup Log
Provide a summary of the completed work:
```
What we just finished: [one sentence]
Files changed: [list]
New Firestore fields added: [list or NONE]
New decisions made: [list or NONE]
```

## Role

Senior Technical Writer & Systems Architect. Ensure the map (docs) matches the territory (code) before moving on.

**Rule:** A feature is not done when the code works. It is done when every doc that describes the system reflects the new reality.

---

## Phase 1 — Four-Point Drift Checklist

Work through each check. For each that has drift, state exactly what needs to change.

### 1. Schema Drift

Does `docs/firestore-schema.md` perfectly reflect the current Firestore data model?

- Every field written or read in new code — does it exist in the schema doc with the correct type?
- Any map sub-fields — are they documented?
- Any deprecated fields — still in the schema (mark or remove)?

> **Result:** Schema doc is current | Schema drift detected — updates required: [list]

### 2. DECISIONS.md Drift

Does `docs/DECISIONS.md` reflect every meaningful architectural or technical choice made in this ticket?

A decision worth logging: any choice where a reasonable engineer could have chosen differently. Examples:
- Why client-side query over a Cloud Function?
- Why this component structure over alternatives?
- Why this Firestore collection path?

Format:
```
YYYY-MM-DD — [Decision]. [One-sentence reason].
```

> **Result:** DECISIONS.md is current | New entries required: [list decisions]

### 3. SITEMAP.md Drift

If a new route or page was added or its status changed:
- Is it listed in `docs/SITEMAP.md` with the correct route, persona, and status?
- Did the page file get a persona annotation comment at the top matching the SITEMAP.md entry?
- Update the status column: 🔴 Not built → 🟡 In progress → 🟢 Live

> **Result:** SITEMAP.md is current | Updates required: [list]

### 4. Tech Debt Sweep

Check changed files for:
- [ ] `console.log` statements in production code paths
- [ ] `// TODO` or `// FIXME` comments added during implementation (intentional TODOs in templates are fine; unplanned ones are not)
- [ ] `eslint-disable` comments suppressing a real issue
- [ ] Commented-out legacy code
- [ ] `any` types introduced and not yet resolved
- [ ] Hardcoded hex values instead of Tailwind tokens
- [ ] Firebase calls in components (must only be in `src/lib/firebase/`)
- [ ] Firestore fields in code not documented in `docs/firestore-schema.md`

> **Result:** Clean | Tech debt found: [list with file:line]

---

## Phase 2 — Compliance Verification

| Item | Status |
|---|---|
| All Firebase calls are in `src/lib/firebase/` — none in components or pages | Verified / N/A |
| Auth-gated portal routes use `PortalLayout` (not ad-hoc auth checks in components) | Verified / N/A |
| Client Firestore reads enforce auth (`request.auth.token.email == resource.data.email`) | Verified / N/A |
| No PII logged to console, analytics, or error logs | Verified / N/A |
| New page files have persona annotation comment at the top | Verified / N/A |
| New UI components have co-located `.test.tsx` files | Verified / N/A |
| New `.github/workflows/` files using `FirebaseExtended/action-hosting-deploy` have `permissions: checks: write` | Verified / N/A |

---

## Phase 3 — Sync Script

List the exact updates needed before opening the PR:

```
UPDATES REQUIRED:

docs/firestore-schema.md:
  - Add field: [collection] / [fieldName] — [type] — [description]

docs/DECISIONS.md:
  - Add: "[YYYY-MM-DD] — [Decision]. [Reason]."

docs/SITEMAP.md:
  - Update route [/path] status: [old] → [new]
  - Add persona: [persona name]

Tech debt to resolve before PR:
  - [file:line] — [issue]
```

If nothing needs updating:
> **CLEAN.** No doc updates required. All compliance items verified. Ready to open PR.

---

## Phase 4 — PR Description Draft

```markdown
## Summary

- [What was built]
- [Which persona this serves and how it helps them]
- [Any schema or security rule changes]

## Schema changes
[None | list new or modified fields]

## Decisions logged
[None | list decisions added to docs/DECISIONS.md]

## Test plan
- [ ] npm run build — zero errors
- [ ] npm run lint — zero warnings
- [ ] [Persona-specific smoke test from /testing]
- [ ] [Firebase emulator test if firestore.rules changed]
```

---

## Sign-Off

> **TICKET CLOSED.** Drift resolved. Compliance verified. Ready to open PR.

or

> **TICKET BLOCKED.** Unresolved items:
> 1. [item]
> 2. [item]
> Resolve these before opening the PR.

---

*Lily Pad Strategy & Design · Adapted from docs/prompts/TICKET_CLOSE.md*
