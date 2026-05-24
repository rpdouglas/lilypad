Run the Execution Protocol for Lily Pad.

**Only run this after a plan from `/plan` has been reviewed and the user has approved a strategy.**

---

## Pre-Execution Gates

Complete all three gates before writing a single line of implementation code. If any gate fails, stop and resolve it first.

### Gate 1 — Plan Approval Confirmed

State which strategy was approved (A, B, or C) and summarise it in one sentence. Then read the approved plan file from `docs/plans/` to load the exact schema audit, persona constraints, and scope into context.

> "Strategy B approved: [one sentence]. Reading plan file now."

### Gate 2 — File Verification (The Read Gate)

For every file you intend to create or modify, read its current contents now using the Read tool. Do not rely on prior session memory or a previous conversation's context.

Reply for each file:
> "Read `[filepath]` — [N] lines. Key interfaces/functions noted: [brief summary]."

If you cannot confirm the current contents of a file you plan to modify:
> "I need the exact current contents of `[filename]`. Please let me read it before I proceed."

**For refactors:** If modifying a shared interface or renaming an exported component, search for all usages first. If blast radius is > 5 files, state this explicitly and confirm with the user before proceeding.

### Gate 3 — Scope Lock

List every file that will be created or modified. Do not touch files outside this list without explicit approval.

```
Files to CREATE:
- src/[path]

Files to MODIFY:
- src/[path] — [specific change]
- firestore.rules — [rule change, if any]
- docs/firestore-schema.md — [new fields, if any]
- docs/DECISIONS.md — [decision to log, if any]
```

---

## Code Quality Rules

Enforce on every file delivered:

- **No `any` types** — use specific interfaces or `unknown`. Never cast Firestore data as `any`.
- **No hardcoded hex values** — use Tailwind utility classes (`bg-forest`, `text-coral`, `bg-cream`, etc.) per `docs/BRAND-TOKENS.md`.
- **No inline styles** — Tailwind only.
- **No unused imports** — remove before delivering.
- **No unused variables** — prefix intentionally unused args with `_`.
- **No `console.log`** in production code paths.
- **Firebase calls only in `src/lib/firebase/`** — never in components or pages directly.
- **Compile-as-you-go** — after completing a set of related files, run `npm run build` before moving on.
- **Copy strings with contractions use double-quoted strings** — single-quoted JS strings break if copy contains apostrophes (`don't`, `We'll`, `it's`, `you're`, etc.). Always use double quotes for prose copy: `"We'll tell you..."` not `'We'll tell you...'`.
- **Route pages must use `React.lazy()`** — never a static import for a page component in the router. Pattern: `const MyPage = lazy(() => import('@/pages/MyPage'))` wrapped in `<Suspense fallback={null}>`.
- **New layouts wrapping animated routes need `<MotionConfig reducedMotion="user">`** — add as the outermost Framer Motion wrapper so all descendant animations automatically respect the OS "reduce motion" setting.
- **Interactive elements must have a visible focus ring** — custom `<button>` or `<a>` elements with non-default styles must add `focus-visible:outline-none focus-visible:shadow-coral`. No bare buttons without a focus indicator.
- **Tailwind v4 `@theme` size token naming** — `--max-width-*` → `max-w-*` utilities; `--width-*` → `w-*` (exact width). Never use `--width-content` expecting `max-w-content` — it generates `w-content`, not `max-w-content`.
- **No arbitrary Tailwind sizing** — use named tokens only. `max-w-content` not `max-w-[900px]`; `px-6 lg:px-10` not `px-[24px]`.

---

## Delivery Format

For each file:
1. State the file path
2. State what changed and why (one line)
3. Provide the complete implementation — full file for new files; changed section with 5 lines of surrounding context for edits to existing files

---

## Post-Execution Checklist

After all code is delivered, confirm each item:

- [ ] New Firestore fields added to `docs/firestore-schema.md` (if any)
- [ ] Architectural decisions logged in `docs/DECISIONS.md` with today's date (if any)
- [ ] `firestore.rules` updated if new collections or auth conditions were added
- [ ] New page files include persona annotation comment at the top
- [ ] No files modified outside the approved scope list

---

## Hand-off

End with:

> **Ready for QA.** Run `/testing` to verify. Suggested smoke tests: [list 2–3 specific tests relevant to this feature and its primary persona].
> Run `/ticket-close` after QA passes.

---

*Lily Pad Strategy & Design · .claude/commands/approve.md · adapted from docs/prompts/APPROVAL.md*
