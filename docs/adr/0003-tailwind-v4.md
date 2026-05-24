# ADR-0003: Use Tailwind CSS v4 for Styling

## Status
Accepted

## Date
May 2026

## Context
The Lily Pad platform needs a styling approach that satisfies three constraints:

1. **Speed** — a solo developer needs to build and iterate on UI quickly
2. **Consistency** — brand tokens must be enforced at the tooling level
3. **AI compatibility** — Claude Code generates Tailwind utility classes natively

## Decision
Use Tailwind CSS v4 with the official Vite plugin.

Hard conventions enforced by this decision:
- Tailwind utility classes only — no CSS Modules, no inline styles
- All brand values via named Tailwind classes (bg-forest, text-coral)
- CLAUDE.md explicitly instructs Claude Code to follow these constraints

## Consequences

**Positive:**
- Utility-first approach eliminates naming CSS classes for every element
- Brand tokens in tailwind.config.ts enforced by the build tool
- Tailwind v4 Vite plugin compiles only classes actually used — minimal CSS bundle
- Claude Code generates Tailwind classes natively and accurately
- Tailwind IntelliSense provides autocomplete for all custom brand token classes

**Negative:**
- Long class strings on complex components can reduce HTML readability
- Tailwind v4 is a major version — some v3 patterns have changed
- No CSS Modules means discipline around conventions is required

## Alternatives Considered

**CSS Modules** — scoped styles, zero runtime. Rejected because they require
naming every class and do not provide token-enforcement at the tooling level.

**styled-components / Emotion** — CSS-in-JS with runtime theming. Rejected
because it adds bundle weight and is redundant given Tailwind's config system.

**Vanilla CSS** — maximum control, zero dependencies. Rejected due to slower
iteration speed and no token enforcement for a solo developer.
