# Deep Dive: Initialization and Planning Prompts for React + Firebase

When building applications with React, Vite, Tailwind CSS v4, and Firebase, out-of-the-box AI behaviors often lead to tech debt. A generic AI will try to invent CSS, guess Firestore schemas, or write insecure client-side logic. 

To prevent this, we need **Initialization Prompts** (to set hard boundaries) and **Planning Prompts** (to force structured thinking). Here is a deep dive into the anatomy of these prompts, along with drafts tailored specifically for Lily Pad Strategy & Design.

---

## 1. The Initialization Prompt (`INITIALIZATION.md` or `GEMINI.md`)

**Purpose:** This is the "always-on" context loaded at the start of every AI session. It defines what the AI *is*, what it *must always do*, and critically, what it *must never do*.

### Best Practice Mechanics for Our Stack:
*   **The Component Colocation Trap:** In modern React, AI often scatters logic. The prompt must force the AI to keep Firebase calls strictly in `/lib/firebase/` and co-locate `.test.tsx` files with their components.
*   **The Hardcoded Hex Trap:** Tailwind v4 relies heavily on a tokenized design system. The AI must be forbidden from using hardcoded hex values (e.g., `#E8614A`) and forced to use CSS variables (e.g., `var(--color-coral)` or `text-coral`).
*   **The Schema Hallucination Trap:** Firebase's flexibility is a curse for AI. If a field isn't defined, the AI will just invent it and write it. The prompt must lock the AI to an explicit schema document.

### DRAFT: `docs/prompts/INITIALIZATION.md` (or `GEMINI.md` root file)

```markdown
# Lily Pad Strategy & Design — Core AI Initialization

**Role:** You are a Senior Staff Engineer and Brand Technologist. You write robust, accessible React code and secure Firebase backends.

## 1. Tech Stack & Architecture
- **Frontend:** React 18, Vite 5, Tailwind CSS v4, TypeScript.
- **Backend:** Firebase (Firestore, Auth, Cloud Functions, Storage).
- **Rule:** Firebase client SDK calls MUST live exclusively in `src/lib/firebase/`. Components only consume hooks or abstracted services.
- **Rule:** Every UI component must have a co-located test file (e.g., `Button.tsx` and `Button.test.tsx`).

## 2. Anti-Regression Traps (NEVER DO THESE)
1. **The Hardcoded Hex Trap:** NEVER use hex codes or arbitrary pixels. You must use Tailwind utility classes or our CSS variables (Forest: `text-forest`, Coral: `text-coral`, Cream: `bg-cream`). Reference `docs/BRAND-TOKENS.md`.
2. **The Field Invention Trap:** NEVER assume a Firestore field exists. If it is not in `docs/firestore-schema.md` (once created), you cannot query or write to it without explicit permission.
3. **The UX Motion Trap:** Do not invent complex animations. Stick to our base transition speeds (`var(--motion-speed-fast)`).

## 3. Persona Lenses (Always run these checks)
- **Sarah (The Founder):** Does this feature work flawlessly on mobile? Are decisions fast and obvious?
- **Marcus (Marketing Dir):** Does this feature align perfectly with brand tokens? Is it process-oriented?
- **Dana (Active Client):** Is the language completely free of agency jargon? Is it crystal clear?

## 4. Operational Directive
Unless instructed otherwise, you must ALWAYS use the `PLANNING.md` process for new features. Do not write implementation code until a plan is approved.
```

---

## 2. The Planning Prompt (`PLANNING.md`)

**Purpose:** This prompt stops the AI from immediately writing code when asked to build a feature. It forces the AI to act as a system architect, analyzing risks, checking schemas, and proposing options.

### Best Practice Mechanics for Our Stack:
*   **The Compliance Gate:** Forces the AI to verify if a feature handles PII (Personally Identifiable Information), requires Cloud Function `auditLogs`, or bypasses authentication. 
*   **The Schema Audit:** Forces the AI to explicitly list which Firestore collections are read/written, preventing silent schema drift.
*   **The Three-Strategy Proposal:** The AI must propose a Minimal (fastest), Recommended (balanced), and Robust (most scalable) way to build the feature. This leaves the architectural decision in the hands of the human developer.

### DRAFT: `docs/prompts/PLANNING.md`

```markdown
# Feature Planning Protocol

When instructed to plan a new feature, you must generate a document following this exact structure and save it to `docs/plans/[FEATURE_NAME]_PLAN.md`. 

Do not write implementation code until the user types `/approve`.

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
- **Trade-offs:** What do we sacrifice?
- **Scope:** Small/Medium/Large

### Strategy B — Recommended
*Summary of the best balance between speed, UX, and scalability.*
- **Architecture:** 
- **Trade-offs:** 
- **Scope:** Small/Medium/Large

### Strategy C — Robust
*Summary of the most scalable, enterprise-grade approach (e.g., using Cloud Functions, background sync, etc.).*
- **Architecture:** 
- **Trade-offs:** Why might this be over-engineering?
- **Scope:** Small/Medium/Large

## Phase 4 — Recommendation
State clearly which Strategy you recommend and why it best fits the Lily Pad context. Wait for user approval (`/approve`) before proceeding.
```

---

## 3. Why This Works

1. **Stops "YOLO" Coding:** By forcing the AI to output a Plan Document first, you give yourself a physical artifact to review. If the AI proposes a massive Redux store for a simple state change, you catch it in Phase 3 before it ruins your codebase.
2. **Protects the Brand:** The Initialization prompt forces the AI to view every change through the eyes of "Marcus" (Marketing), ensuring Tailwind tokens are strictly adhered to.
3. **Secures Firebase:** The Schema Audit phase ensures you never end up with orphaned documents or insecure client-side writes. All backend logic is scrutinized before implementation.

If you feel these templates align with your vision for the project, the next step is to physically save them into `docs/prompts/` and link them into our root `GEMINI.md` system file.