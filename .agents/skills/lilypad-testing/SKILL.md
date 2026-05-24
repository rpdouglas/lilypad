---
name: lilypad-testing
description: >-
  QA, verification, and smoke testing for Lily Pad. Activate this skill when the user
  requests a build audit, design system token checks, lighthouse checks, or
  persona-specific mobile/desktop smoke tests before submitting pull requests.
---

# QA & Verification Protocol

**Run after code has been delivered. Before any PR is opened.**

## Setup Log
Provide a summary of what was just built:
```
Feature: [name]
Primary Persona: [Sarah / Marcus / Dana]
Files changed: [list]
```

---

## Part 1 — Build Health

Run these first. If either fails, stop and resolve errors before continuing.

```bash
npm run build    # Zero TypeScript errors
npm run lint     # Zero ESLint warnings or errors
```

### TypeScript Checks
- [ ] No `any` types introduced
- [ ] All new props and function parameters have explicit types
- [ ] All Firestore reads use a typed interface (not `as any` or untyped)

### Bundle Architecture Checks
- [ ] New route pages use `lazy()` — never a static import in the router
- [ ] No Firebase Firestore/Storage imports in layout components or contexts
- [ ] After `npm run build`, check `dist/assets/index-*.js` — if it grew significantly, investigate

---

## Part 2 — Persona Smoke Tests

Run the tests relevant to the primary persona. These are pass/fail.

### Sarah (Founder) — Mobile-First, Fast Decisions

- [ ] **The 48px Test:** All interactive elements ≥48px tall/wide on a 375px viewport? Open DevTools and inspect touch targets.
- [ ] **The One-Thumb Test:** Can the full feature flow be completed one-handed in portrait mode?
- [ ] **The Above-the-Fold Test:** Is the primary CTA visible without scrolling on mobile?
- [ ] **The 10-Second Test:** Does a first-time visitor understand the purpose of this page/feature in under 10 seconds?
- [ ] **The Fast Decision Test:** Can Sarah get from landing to the primary action (booking a call, filling the form) in under 3 minutes on mobile?

### Marcus (Marketing Director) — Desktop, Brand-Driven, Proof-Oriented

- [ ] **The Brand Token Test:** Every colour reference uses a named Tailwind class (`bg-forest`, `text-coral`, `bg-cream`, etc.)? No hex codes anywhere in new code?
- [ ] **The Typography Test:** All h1–h3 use `font-display` (Cormorant Garamond). All body copy uses `font-sans` (Outfit). All labels/overlines use `font-mono` (DM Mono)?
- [ ] **The Italic Accent Test:** At least one key heading uses `<em className="italic text-coral">` for the brand signature accent?
- [ ] **The Proof Test:** If this feature surfaces outcomes, case studies, or results — are they quantified? (e.g., "40% increase" not "significant improvement")
- [ ] **The Process Test:** If this is a multi-step flow, is each step clearly labelled with a progress indicator?

### Dana (Active Client) — Portal UX, Clarity Over Everything

- [ ] **The Jargon Test:** Read every label, heading, and body copy on the feature out loud. Any agency jargon a client wouldn't know? Replace it.
- [ ] **The Mobile Portal Test:** Can Dana complete the key action from an iPhone in portrait mode, including during evening hours (dim screen, no desktop)?
- [ ] **The Status Clarity Test:** Is the current state of the feature immediately obvious without explanation?
- [ ] **The Magic Link Test:** If auth is involved, does the magic link sign-in flow work end-to-end without error? Test on mobile.
- [ ] **The Session Test:** Does Dana stay logged in for 30 days without being re-prompted to authenticate mid-project?

### All Personas

- [ ] **Lighthouse:** Run against the local dev build (`npm run preview` or deployed dev URL). Accessibility ≥90, SEO ≥95, Performance ≥50.
- [ ] **Focus States:** All interactive elements show a visible focus ring? The `Button` component uses `focus:shadow-coral` — confirm custom elements do too.
- [ ] **Alt Text:** All images have descriptive `alt` text, or `alt=""` if purely decorative.
- [ ] **WCAG AA Contrast:** All new text meets 4.5:1 minimum contrast ratio.
- [ ] **Reduced Motion:** New animations respect the OS reduced-motion setting. Layouts wrapping animated routes must include `<MotionConfig reducedMotion="user">` — a single declaration at the layout level covers all descendant Framer Motion components automatically.

---

## Part 3 — Design System Check

Reference: `docs/BRAND-TOKENS.md`

### Tokens & Typography
- [ ] No hardcoded hex values anywhere in new code (use Tailwind classes only)
- [ ] No inline styles (no `style={{ ... }}` props)
- [ ] Section spacing: `py-16 lg:py-24` for standard sections
- [ ] Content width: `max-w-content mx-auto px-6 lg:px-10` applied to all content containers
- [ ] No arbitrary Tailwind sizing — run `grep -rn 'max-w-\[\|px-\[' src/` — zero matches required
- [ ] Overline labels: `font-mono text-[10px] tracking-[0.2em] uppercase text-coral`
- [ ] Copy strings with contractions use double-quoted strings — run: `grep -rPn "'[^'\"]*'[a-z]" src/ --include="*.tsx" --include="*.ts"` — any match inside a single-quoted string must be converted to a double-quoted string
- [ ] If `src/index.css` `@theme` was modified: verify size tokens use `--max-width-*` (not `--width-*`) for `max-w-*` utilities

### Components & Motion
- [ ] Buttons use `src/components/ui/Button.tsx` — not custom `<button>` elements with hand-rolled styles
- [ ] Hover transitions: `transition-colors duration-150` for colour changes
- [ ] Entrance animations (if any): Framer Motion with `opacity: 0 → 1, y: 16 → 0` over 500ms
- [ ] No bounce effects, particle effects, or constant micro-animations

### Brand Voice
- [ ] CTA copy is direct and action-oriented. No "Submit", "Click here", "Learn more" without context.
- [ ] No prohibited words: Cheap, Junk, BUY NOW!!!, SALE, Clearance, Liquidation

---

## Part 4 — Accessibility Check

- [ ] Run axe-core in browser DevTools on the new UI — zero violations
- [ ] All new interactive elements keyboard-navigable with Tab, activated with Enter/Space
- [ ] No colour-only information conveyance (use text label + colour together)

---

## Sign-Off

If all checks pass:

> **QA PASSED.** Feature: [name]. Persona: [name]. Build: clean. Design system: verified. Accessibility: clean. Ready for `/ticket-close`.

If any check fails:

> **QA BLOCKED.** Failures:
> 1. [Failure description] — severity: [blocking | non-blocking]
>
> Non-blocking issues may be tracked as GitHub Issues. Blocking issues must be resolved before the PR opens.

---

*Lily Pad Strategy & Design · Adapted from docs/prompts/TESTING.md*
