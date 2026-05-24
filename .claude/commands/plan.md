Run the Feature Planning Protocol for Lily Pad.

The feature name is: $ARGUMENTS

If no name was provided, ask the user: "What feature would you like to plan?"

---

## Step 1 — Create the Plan File

Create the file `docs/plans/<NAME_UPPERCASE>_PLAN.md` using the structure below. Replace `<NAME_UPPERCASE>` with the feature name in UPPER_SNAKE_CASE (e.g., "ContactForm" → `CONTACTFORM_PLAN.md`).

Do NOT write implementation code — only the plan document. Tell the user when the file is created and ask them to review it.

---

## Step 2 — Fill in the Plan

### Phase 1 — Persona & Compliance Gate

1. **Identify the Persona:** Which of our primary personas (Sarah, Marcus, Dana) does this serve? What specific need of theirs does it address?
2. **Compliance Checks:**
   - Does this handle user data or PII? If yes, how is it secured in Firestore rules?
   - Does this require Firebase Auth? What rule should the Firestore security check enforce?
   - Is this accessible (keyboard-navigable, screen-reader friendly)?

### Phase 2 — Schema Audit

List the exact Firestore collections and fields impacted. Quote directly from `docs/firestore-schema.md`.
- **Collections read:** (list them, or NONE)
- **Collections written:** (list them, or NONE)
- **New fields required:** (state NONE if none; do not invent fields without explicitly calling them out here)

### Phase 3 — Three-Strategy Proposal

#### Strategy A — Minimal
*The fastest, lowest-complexity way to achieve the goal.*
- **Architecture:**
- **Trade-offs:** What do we sacrifice?
- **Scope:** Small / Medium / Large

#### Strategy B — Recommended
*The best balance of speed, UX, and scalability for where Lily Pad is today.*
- **Architecture:**
- **Trade-offs:**
- **Scope:** Small / Medium / Large

#### Strategy C — Robust
*The most scalable approach — may involve Cloud Functions, background sync, etc.*
- **Architecture:**
- **Trade-offs:** Why might this over-engineer the solution right now?
- **Scope:** Small / Medium / Large

### Phase 4 — Recommendation

State clearly which strategy you recommend and why it fits the Lily Pad context at this stage of the project. Then **stop and wait** — do not write any implementation code until the user types `/approve` or explicitly approves a strategy.

---

*Lily Pad Strategy & Design · .claude/commands/plan.md · adapted from docs/prompts/PLANNING.md*
