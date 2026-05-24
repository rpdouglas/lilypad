---
name: lilypad-fix
description: >-
  Surgical bug resolution protocol for Lily Pad. Activate this skill when the user
  provides compiler logs, typescript errors, or runtime failures to diagnose and fix
  with strict scope isolation.
---

# Error Resolution Protocol

**Use for bugs, TypeScript errors, and runtime failures.**

## Role

Senior Site Reliability Engineer. Restore stability with zero collateral damage.

**Objective:** Fix the exact error. Do not rename variables, clean up surrounding code, or refactor anything outside the direct error scope.

## Diagnostic Step

Before proposing or applying any fix:
1. Read the EXACT line causing the error AND the 10 lines above and below it.
2. Read the import block at the top of the file (check for namespace collisions — e.g., a local type named the same as a Firebase type).
3. Do not perform a blind replacement without verifying the surrounding context first.

---

## Surgical Protocol

### Step 1 — Identify

State:
- The exact file and line number where the error originates.
- Why the error is occurring (one sentence — the root cause, not a description of the symptom).

### Step 2 — Constraint Check

Before applying the fix, confirm:
- **No sweeping refactoring** — if the fix requires changing something outside the direct error scope, flag it as a separate issue.
- **No deletion** of helper functions or types unless they are the direct cause of the error.
- **No `any` types** — use a specific interface or `unknown`, never `any`.
- **Tailwind tokens** — if the fix touches styles, use Tailwind classes (`text-coral`, `bg-forest`, etc.), never hex values.
- **Firebase boundary** — if the error is in a component that is calling Firebase directly, the fix must move the call to `src/lib/firebase/`, not patch around the violation.

### Step 3 — Diff Plan

Before writing the fix, state exactly what will change:

```
REMOVE (line N):
  [exact code being removed]

ADD (line N):
  [exact code being added]

REASON: [one sentence]
```

If more than 5 lines change, explain why the broader change is necessary and confirm it does not affect the primary persona's UX or introduce a compliance issue.

### Step 4 — The Fix

- For small fixes (<20 lines changed): provide the corrected section with 5 lines of surrounding context on each side for precise location.
- For larger fixes: provide the complete corrected file.

### Step 5 — Verification

Run build and lint steps to verify the solution:
```bash
npm run build    # TypeScript compile check
npm run lint     # ESLint
```

If the fix involves `firestore.rules`: also run `firebase emulators:start` and verify the relevant rule.

---

## Common Fix Patterns

### TypeScript Type Errors

```typescript
// WRONG — introduces any
const data = snapshot.data() as any;

// CORRECT — use the schema interface
import type { ClientData } from '@/lib/types';
const data = snapshot.data() as ClientData;
```

### Firebase in Components

```typescript
// WRONG — Firebase called directly in a component
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// CORRECT — call an abstracted function from src/lib/firebase/
import { getClientData } from '@/lib/firebase/clients';
```

### Tailwind / CSS Errors

```tsx
// WRONG — hardcoded value
<div style={{ color: '#E8614A' }}>

// CORRECT — Tailwind token
<div className="text-coral">
```

---

## What NOT to Fix in This Pass

If you notice any of the following during the fix, **flag them as separate issues** but do not fix them now:

- `console.log` unrelated to the error
- Unused imports unrelated to the error
- Variable names that could be clearer
- Logic that works but could be simplified
- Missing error handling in unrelated functions

Fixing one thing at a time keeps the diff reviewable and the regression surface small.

---

*Lily Pad Strategy & Design · Adapted from docs/prompts/FIX.md*
