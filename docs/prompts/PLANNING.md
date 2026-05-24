# Feature Planning Protocol

When instructed to plan a new feature, you must generate a document following this exact structure and save it to `docs/plans/[FEATURE_NAME]_PLAN.md`.

Do not write implementation code until the user types `/approve` or explicitly approves the plan.

## Phase 1 — Persona & Compliance Gate
1. **Identify the Persona:** Which of our primary personas (Sarah, Marcus, Dana) does this serve? How does it help them?
2. **Compliance Checks:**
   - Does this handle user data or PII? (If yes, how is it secured?)
   - Does this require a Cloud Function to write an `auditLog`?
   - Is this accessible (A11y/Screen reader friendly)?

## Phase 2 — Schema Audit
List the exact Firestore collections and fields impacted.
- **Collections read:** (List them)
- **Collections written:** (List them)
- **New fields required:** (If none, state NONE. Do not invent fields without highlighting them here).

## Phase 3 — Three-Strategy Proposal
Provide three distinct architectural approaches for building this feature:

### Strategy A — Minimal
*Summary of the fastest, lowest-complexity way to achieve the goal.*
- **Architecture:**
- **Trade-offs:**What do we sacrifice?
- **Scope:** Small/Medium/Large

### Strategy B — Recommended
*Summary of the best balance between speed, UX, and scalability.*
- **Architecture:**
- **Trade-offs:**
- **Scope:** Small/Medium/Large

### Strategy C — Robust
*Summary of the most scalable, enterprise-grade approach (e.g., using Cloud Functions, background sync, etc.).*
- **Architecture:**
- **Trade-offs:**Why might this be over-engineering?
- **Scope:** Small/Medium/Large

## Phase 4 — Recommendation
State clearly which Strategy you recommend and why it best fits the Lily Pad context. Wait for user approval before proceeding.