# ADR-0003: Use Tailwind CSS v4 for Styling

## Status
Accepted

## Date
May 2026

## Context
The Lily Pad platform needs a styling approach that satisfies three constraints:

1. **Speed** — a solo developer needs to build and iterate on UI quickly without
   context-switching between component files and separate stylesheet files
2. **Consistency** — all brand tokens (colors, fonts, spacing, radius, shadows)
   must be enforced at the tooling level, not just by convention
3. **AI compatibility** — Claude Code generates Tailwind utility classes natively.
   A token system that maps directly to Tailwind classes means AI-generated
   components are on-brand without manual correction

The project uses **Vite 5** as the build tool. The styling approach must integrate
cleanly with Vite's plugin architecture and produce minimal CSS bundle sizes
in production.

## Decision
Use **Tailwind CSS v4** with the official Vite plugin.

Install via:
```bash
npm install tailwindcss@4 @tailwindcss/vite
```

Configure brand tokens in `tailwind.config.ts` under `theme.extend` — colors,
font families, custom shadows, and max-width — as documented in `docs/BRAND-TOKENS.md`.

**Hard conventions enforced by this decision:**
- Tailwind utility classes only — no CSS Modules, no inline styles, no `styled-components`
- All brand values referenced via named Tailwind classes (`bg-forest`, `text-coral`)
  not arbitrary values (`bg-[#2C3E2D]`)
- `CLAUDE.md` explicitly instructs Claude Code to follow these constraints

## Consequences

**Positive:**
- Utility-first approach eliminates the need to name CSS classes for every element —
  a significant time saving for a solo developer
- Brand tokens in `tailwind.config.ts` are enforced by the build tool — it is
  impossible to use an off-brand color that isn't in the config without writing
  an arbitrary value (which CLAUDE.md explicitly forbids)
- Tailwind v4's Vite plugin compiles only the classes actually used — production
  CSS bundles are minimal with zero unused styles
- Claude Code generates Tailwind classes natively and accurately — the AI workflow
  described in `CLAUDE.md` depends on Tailwind being the styling layer
- Tailwind IntelliSense in VS Code and GitHub Codespaces provides autocomplete
  for all custom brand token classes
- v4 introduces CSS-first configuration via `@theme` as an alternative to the JS
  config — this is available as a future migration path if needed

**Negative:**
- Long class strings on complex components can reduce HTML readability
- Tailwind v4 is a major version — some v3 utility names and config patterns have
  changed; older Stack Overflow answers and tutorials may reference v3 syntax
- No CSS Modules means component styles are not scoped by default — discipline
  around Tailwind conventions is required to avoid specificity conflicts
- Tailwind IntelliSense must be installed and configured in Codespaces to get
  full autocomplete benefit (handled in `.devcontainer/devcontainer.json`)

## Alternatives Considered

**CSS Modules** — scoped styles, zero runtime, familiar to most React developers.
Rejected because they require naming every class, create a separate file per
component, and do not provide the token-enforcement benefit that Tailwind's config
system offers. Claude Code also generates Tailwind more reliably than bespoke
CSS Module class names.

**styled-components / Emotion** — CSS-in-JS with runtime theming support.
Rejected because CSS-in-JS adds JavaScript bundle weight, introduces a runtime
styling layer that conflicts with Vite's optimisation, and the theming system
is redundant given that Tailwind config already handles brand tokens.

**Vanilla CSS with custom properties** — maximum control, zero dependencies.
Rejected because it provides no token enforcement, no utility class system, and
significantly slower iteration speed for a solo developer building multiple pages
quickly across Phase 1 and beyond.