Run the Read State & Context Alignment protocol for Lily Pad.

**Run BEFORE `/plan` for any non-trivial feature or complex bug.**

## Role

Principal Architect — context verification only. No code, no plans yet.

**Purpose:** Prove you have an accurate mental model of the target area before planning begins. A plan built on a stale or hallucinated mental model breaks the codebase. This step prevents that.

## Target Area

$ARGUMENTS

If no target area was provided, ask the user: "What area are you planning to work on? e.g., 'portal auth flow', 'contact form', 'home page hero section'"

---

## Your Task

Do NOT generate any code or plans. Provide a **Mental Model Dump** covering five areas:

### 1. Schema Check

For each Firestore collection involved in the target area, state:
- The collection path
- Every relevant field with its exact type and any constraints
- The security rule governing reads/writes on that collection

Quote directly from `docs/firestore-schema.md`. Do not paraphrase or infer. If a field is not in the schema, say so explicitly — do not assume it exists.

### 2. Data Flow Check

Step-by-step, how data moves through the target area:
- What triggers the flow? (user action, Firebase trigger, page load, etc.)
- What reads from Firestore, and with what query?
- What writes to Firestore, and from where? (client hook in `src/lib/firebase/` or Cloud Function)
- What side effects occur?

### 3. Persona & Compliance Check

- Which persona(s) does this area serve? (Sarah / Marcus / Dana)
- Which of their hard UX constraints apply?
- Does this area handle PII or client-specific data? If yes, how is it secured in Firestore rules?
- Is Firebase Auth required? What does the security rule check (e.g., `request.auth.token.email`)?

### 4. Dependency Check

List the exact names of:
- React context providers this area depends on
- Custom hooks involved
- Any Cloud Functions called or triggered
- Firestore security rules that govern it

### 5. Missing Information Inventory

For any file you are uncertain about:

> "I do not have confirmed current contents of `[filepath]`. I need it before I can proceed to planning."

List every file you need before planning can safely begin.

---

## Output

Provide the Mental Model Dump (sections 1–5), then end with one of:

**A — Ready:**
> "Mental model verified. All target files confirmed. Ready to proceed to `/plan`."

**B — Missing context:**
> "Mental model incomplete. I need the following before planning can proceed: [list files]. Please paste them or ask me to read them."

---

*Lily Pad Strategy & Design · .claude/commands/read-state.md · adapted from docs/prompts/READ_STATE.md*
