# Feature Plan — AI Governance & Prompts Framework

Establishing the complete suite of AI instructions, prompts, and source-of-truth Firestore schema, and upgrading the Antigravity CLI scaffolding tool to automate feature plan creation.

## Phase 1 — Persona & Compliance Gate

1. **Identify the Persona:** 
   - **Jordan & Marcus (All Views):** Enforces high brand standards, photography/provenance requirements, and editorial quality across all views.
   - **Sarah (The Founder):** Systematically eliminates AI tech debt and undocumented "YOLO" changes, protecting the codebase and future roadmap.
2. **Compliance Checks:**
   - **PII / User Data:** No PII is handled or stored. This is purely engineering infrastructure.
   - **Cloud Functions / auditLogs:** No audit log writes are needed for local prompt updates.
   - **Accessibility:** All created documentation is fully screen-reader and keyboard accessible in Markdown format.

## Phase 2 — Schema Audit

This feature does not alter the live database schema. However, it extracts and locks down the **source-of-truth database schema document** which the AI planning process *must* audit against for all future tasks.
- **Collections read:** None.
- **Collections written:** None.
- **New fields required:** NONE.

---

## Phase 3 — Three-Strategy Proposal

Provide three distinct architectural approaches for building this feature:

### Strategy A — Minimal
*Summary of the fastest, lowest-complexity way to achieve the goal.*
- **Architecture:** 
  - Extract `docs/prompts/TESTING.md`, `docs/prompts/TICKET_CLOSE.md`, and `docs/firestore-schema.md` from the reference file `docs_ac.txt`.
  - Create the `docs/plans/` directory.
  - No changes to `scripts/antigravity.js`.
- **Trade-offs:** 
  - Misses several key prompt files (`READ_STATE.md`, `FIX.md`, `DOCS_AUDIT.md`, `APPROVAL.md`, `POST_SPRINT_AUDIT.md`, `CODEBASE_AUDIT.md`).
  - Developers must copy-paste plan templates manually when creating plans.
- **Scope:** Small (3 files created)

### Strategy B — Recommended
*Summary of the best balance between speed, UX, and scalability.*
- **Architecture:**
  - Extract **all** discovered prompt files from `docs_ac.txt` to `docs/prompts/`:
    - `docs/prompts/TESTING.md`
    - `docs/prompts/TICKET_CLOSE.md`
    - `docs/prompts/READ_STATE.md`
    - `docs/prompts/FIX.md`
    - `docs/prompts/DOCS_AUDIT.md`
    - `docs/prompts/APPROVAL.md`
    - `docs/prompts/POST_SPRINT_AUDIT.md`
    - `docs/prompts/CODEBASE_AUDIT.md`
  - Extract `docs/firestore-schema.md` from `docs_ac.txt`.
  - Create the `docs/plans/` directory to host future plans.
  - Extend the `scripts/antigravity.js` CLI script with a new `plan <FeatureName>` command that scaffolds a standard planning protocol template under `docs/plans/` to automate Step 3 of the AI governance roadmap.
- **Trade-offs:** Minimal extra file writes; extremely high value in establishing complete workflow automation.
- **Scope:** Medium (9 files created, 1 file modified)

### Strategy C — Robust
*Summary of the most scalable, enterprise-grade approach.*
- **Architecture:** 
  - All of Strategy B, plus copying and creating custom skills under `.gemini/skills/` (like `epic-planner`, `feature-executor`, `qa-verification`, `sprint-audit`) as found in `docs_ac.txt`.
- **Trade-offs:** The AI assistant already has highly sophisticated built-in agent capabilities and custom skills, so replicating those skills as static files may be redundant.
- **Scope:** Large (15+ files)

---

## Phase 4 — Recommendation

We highly recommend **Strategy B — Recommended**. It equips the repository with the complete governance prompt library, sets up the long-awaited `docs/firestore-schema.md` source of truth, and updates `scripts/antigravity.js` so that developers can run `node scripts/antigravity.js plan "ContactForm"` to scaffold their plan document instantly.

Awaiting user approval (`/approve`) before proceeding with any code or file changes.
