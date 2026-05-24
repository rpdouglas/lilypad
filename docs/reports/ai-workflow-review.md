# AI Workflow & Project Management Review
**Date:** 2026-05-24
**Context:** Comparative analysis of Lily Pad Strategy & Design's current AI workflow against the "Pawn Shop" reference architecture (`docs_ac.txt`).

---

## 1. Current State: Lily Pad vs. The Reference Architecture

### Lily Pad Strategy & Design (Current)
Our current AI workflow is functional but **unregulated**.
*   **Rules Engine:** A single `CLAUDE.md` file providing basic context (stack, brand colors, 3 personas, 4 conventions). `GEMINI.md` is currently missing.
*   **Automation:** A lightweight `scripts/antigravity.js` CLI scaffolding tool that generates React components, pages, tests, and MDX content.
*   **Governance:** None. AI agents are trusted to follow the `CLAUDE.md` guidelines without verification gates. There is no formalized planning step before code is written.

### The Reference Architecture (docs_ac.txt / Pawn Shop)
The reference documentation reveals a **highly disciplined, gate-driven AI workflow**.
*   **Strict Lifecycle:** Every feature requires a `READ_STATE`, `PLANNING`, `APPROVAL`, and `TICKET_CLOSE` sequence.
*   **Phase-Gated Plans:** Before writing any code, the AI *must* generate a plan that clears:
    1.  **Persona & Compliance Gate:** Does this serve a primary persona? Does it violate any compliance rules (e.g., PII, Age Gates, Discretion Tests)?
    2.  **Schema Audit:** Verifying Firestore impacts against a source of truth (`firestore-schema.md`) to prevent hallucinated fields.
    3.  **Three-Strategy Proposal:** The AI provides Minimal, Recommended, and Robust architectures, highlighting trade-offs for human approval.
    4.  **Anti-Regression Protocol:** A checklist of "Traps" (e.g., Hardcoded Hex Trap, Field Invention Trap) to ensure brand and architectural consistency.
*   **Specialized Subagents:** Shifting from long, monolithic prompts to specialized roles (e.g., *Architect*, *Firebase_Specialist*, *Compliance_Officer*).

---

## 2. Deep Dive: AI-Assisted Workflows for Our Stack

Our stack (React 18, Vite, Tailwind CSS v4, Firebase, TypeScript) introduces specific challenges and opportunities for AI workflows:

### A. UI & Styling (React + Tailwind v4)
*   **The Threat:** AI tends to hallucinate hardcoded hex codes (`#E8614A`) or arbitrary pixel values (`padding: 15px`), degrading the design system.
*   **The AI Workflow Fix:** Implement an **"Anti-Regression Protocol"** specifically checking for the **Hardcoded Hex Trap**. The AI must be forced to validate its CSS against `docs/BRAND-TOKENS.md` and use CSS variables/Tailwind tokens exclusively.

### B. Backend & State (Firebase)
*   **The Threat:** AI "Schema Drift." An AI might assume a `purchaseHistory` array exists on a user document and write a Cloud Function assuming so, causing silent runtime failures.
*   **The AI Workflow Fix:** Enforce a **Schema Audit Gate**. The AI must never invent fields. It must read a locked `firestore-schema.md` or `firestore.rules` file to verify field existence before proposing data logic.

### C. Architecture (Client vs. Server)
*   **The Threat:** AI placing Firebase client SDK calls directly inside React components, violating our rule (`Firebase calls only in /lib/firebase/`).
*   **The AI Workflow Fix:** Integrate project-specific constraints into the initialization prompt, establishing a **"Component Colocation Trap"** check.

---

## 3. Roadmap: Making Lily Pad's AI Workflow the Best Possible

To elevate our repository's AI workflow from "unregulated scaffolding" to a "governance-driven engine," we should implement the following steps:

### Step 1: Establish the Prompt/Governance Library
Create a `docs/prompts/` directory to modularize AI instructions:
1.  **`INITIALIZATION.md` / `GEMINI.md`:** The "always-on" guardrails loaded at the start of a session. It contains our Persona tests and strict Anti-Regression Traps.
2.  **`PLANNING.md`:** The template forcing the AI to use the Phase 1-4 Gate system and the Three-Strategy proposal.
3.  **`TICKET_CLOSE.md`:** The checklist the AI runs when finishing a task (syncing docs, checking Lighthouse scores, preparing the PR).

### Step 2: Implement the "Three-Strategy" Rule
Update our AI mandates so that when a user asks for a feature (e.g., "Add a contact form"), the AI *refuses* to write the code immediately. Instead, it generates a `[FEATURE]_PLAN.md` proposing three ways to build it (Minimal, Recommended, Robust). The developer approves one, and *then* the AI codes.

### Step 3: Upgrade the Antigravity CLI for Governance
Extend `scripts/antigravity.js` (or add `scripts/governance/init-plan.js`) to automatically scaffold these markdown plan files.
*   *Why?* If creating a compliance plan takes 5 minutes of manual copy-pasting, developers will skip it. If `npm run plan "Contact Form"` generates the template in 1 second, they will use it.

### Step 4: Persona-Driven Quality Assurance
Formalize our Personas into "Tests" that the AI must run its code against:
*   **The Sarah (Founder) Speed Test:** Are critical actions visible on mobile above the fold?
*   **The Marcus (Marketing) Brand Test:** Does the copy align with our Brand Strategy and use exact CSS token colors?
*   **The Dana (Client) Clarity Test:** Is the portal UI completely free of jargon and unambiguous?

### Step 5: Define Subagents in `.antigravitycli/`
Transition to delegating specific tasks to subagents.
*   **`codebase_investigator`**: To perform Phase 2 (Schema Audits) before touching Firebase.
*   **`generalist`**: For large batch refactoring across Tailwind files.

---

## Conclusion
By adopting the gated planning phases and anti-regression protocols found in the reference document, we can eliminate AI-generated tech debt. The AI becomes less of a "code completion tool" and more of a **Senior Staff Engineer**, ensuring every feature strictly aligns with our brand tokens, schema, and personas before a single line of React is written.