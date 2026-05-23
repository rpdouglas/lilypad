# BRAND-TOKENS.md
# Lily Pad Strategy & Design — Brand Tokens

> Single source of truth for all visual decisions.
> Claude Code reads this file automatically via CLAUDE.md.
> When building any component, use only the values defined here —
> no arbitrary hex codes, no hardcoded pixel values.

---

## Colors

### Brand Palette

| Name            | Tailwind Class        | Hex       | When to use                                   |
|-----------------|-----------------------|-----------|-----------------------------------------------|
| Forest (dark)   | `text-dark` / `bg-dark`       | `#1A2418` | Headings, deepest text                        |
| Forest (primary)| `text-forest` / `bg-forest`   | `#2C3E2D` | Nav, footer, section backgrounds, logo        |
| Forest (mid)    | `text-forest-mid` / `bg-forest-mid` | `#3D5240` | Hover states on forest elements         |
| Coral (primary) | `text-coral` / `bg-coral`     | `#E8614A` | CTAs, buttons, italic accents, highlights     |
| Coral (light)   | `text-coral-light` / `bg-coral-light` | `#F08070` | Coral on dark backgrounds, hover states |
| Cream           | `text-cream` / `bg-cream`     | `#FAF8F4` | Page background, text on dark backgrounds     |
| Stone           | `text-stone` / `bg-stone`     | `#8A9080` | Muted text, captions, placeholders, borders   |

### Semantic Shortcuts (use these in components — not raw hex)

| Intent                  | Tailwind Class           | Notes                                      |
|-------------------------|--------------------------|--------------------------------------------|
| Page background         | `bg-cream`               | Default for all pages                      |
| Card / surface          | `bg-white`               | White cards on cream background            |
| Alt section background  | `bg-[#F0EDE6]`           | Every other section for visual rhythm      |
| Primary heading         | `text-forest`            | All h1–h3 on light backgrounds             |
| Body copy               | `text-dark`              | Paragraphs, list items                     |
| Muted / secondary text  | `text-stone`             | Captions, labels, meta info                |
| Text on dark bg         | `text-cream`             | Any text sitting on forest backgrounds     |
| Muted text on dark bg   | `text-stone`             | Secondary text on forest backgrounds       |
| CTA / accent            | `bg-coral` / `text-coral`| Buttons, links, highlighted words          |
| Dividers / borders      | `border-stone/40`        | Section rules, card borders                |

### Utility Colors

| Name      | Hex       | Tailwind Approach       | When to use              |
|-----------|-----------|-------------------------|--------------------------|
| Success   | `#2D6B2D` | `text-[#2D6B2D]`        | Form success states      |
| Error     | `#C0392B` | `text-[#C0392B]`        | Validation errors        |
| Warning   | `#8B5E00` | `text-[#8B5E00]`        | Warning messages         |

---

## Typography

### Font Families

| Name            | Value                         | Tailwind Class   | When to use                              |
|-----------------|-------------------------------|------------------|------------------------------------------|
| Display (serif) | `'Cormorant Garamond', serif` | `font-display`   | All headings — h1 through h3, hero text  |
| Body (sans)     | `'Outfit', sans-serif`        | `font-sans`      | All body copy, nav, UI labels, buttons   |
| Mono            | `'DM Mono', monospace`        | `font-mono`      | Tags, badges, section numbers, code      |

**Google Fonts import — add to `index.html` `<head>`:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Type Scale & Usage

| Role               | Font Family    | Size          | Weight        | Use case                             |
|--------------------|----------------|---------------|---------------|--------------------------------------|
| Hero headline      | `font-display` | `text-5xl` / `text-6xl` (desktop) | `font-light` (300) | Homepage hero only   |
| Section title      | `font-display` | `text-3xl` / `text-4xl` (desktop) | `font-normal` (400) | Section headings    |
| Card title         | `font-sans`    | `text-sm` (14px)  | `font-semibold`   | Card and callout headings        |
| Body copy          | `font-sans`    | `text-base` (15px)| `font-normal`     | All paragraphs                   |
| Lead paragraph     | `font-sans`    | `text-base` (16px)| `font-normal`     | Intro text below section titles  |
| Nav links          | `font-sans`    | `text-[13px]`     | `font-medium`     | Navbar and footer links          |
| Overline label     | `font-mono`    | `text-[10px]`     | `font-normal`, `tracking-[0.2em]`, `uppercase` | Section numbers, badges |
| Caption / meta     | `font-mono`    | `text-[11px]`     | `font-normal`     | Dates, tags, small labels        |

### Key Typographic Rules

- Headings always use `font-display` (Cormorant Garamond). Never use `font-sans` for h1–h3.
- Italic words in headings that appear in coral are the brand's signature accent pattern: `<em className="italic text-coral">word</em>`
- Line height for headings: `leading-tight` (1.15). Body copy: `leading-relaxed` (1.75).
- Letter spacing for mono labels: `tracking-[0.15em]` to `tracking-[0.2em]`. Body: default.

---

## Spacing

> All spacing uses Tailwind's default 4px base scale.
> The values below are the ones this project actually uses — don't reach for others.

| Token     | px   | Common use                                           |
|-----------|------|------------------------------------------------------|
| `p-2`     | 8px  | Badge / tag padding                                  |
| `p-4`     | 16px | Button padding (sm), tight card padding              |
| `p-6`     | 24px | Card internal padding (default)                      |
| `p-8`     | 32px | Section internal padding                             |
| `p-10`    | 40px | Horizontal page padding (desktop)                    |
| `p-12`    | 48px | Section vertical padding (mobile)                    |
| `p-16`    | 64px | Section vertical padding (desktop)                   |
| `p-20`    | 80px | Large hero vertical padding                          |
| `gap-4`   | 16px | Tight component gaps                                 |
| `gap-6`   | 24px | Card grid gaps                                       |
| `gap-8`   | 32px | Section element gaps                                 |
| `gap-16`  | 64px | Major layout gaps                                    |

**Max content width:** `max-w-[900px] mx-auto` — applied to all content containers.

---

## Border Radius

| Token          | Value  | Tailwind Class  | When to use                          |
|----------------|--------|-----------------|--------------------------------------|
| Small          | 3px    | `rounded-sm`    | Tags, badges, code labels            |
| Default        | 6px    | `rounded-md`    | Cards, buttons, inputs               |
| Large          | 8px    | `rounded-lg`    | Modals, featured image containers    |
| Full / pill    | 9999px | `rounded-full`  | Avatar circles, pill-shaped tags     |

---

## Shadows

| Token       | CSS Value                              | Tailwind Approach       | When to use                     |
|-------------|----------------------------------------|-------------------------|---------------------------------|
| Card        | `0 2px 6px rgba(26,36,24,0.08)`       | `shadow-sm`             | Default card elevation          |
| Card hover  | `0 4px 16px rgba(26,36,24,0.10)`      | `shadow-md`             | Card hover state                |
| Modal       | `0 8px 32px rgba(26,36,24,0.12)`      | `shadow-lg`             | Modals, drawers                 |
| Focus ring  | `0 0 0 4px rgba(232,97,74,0.25)`      | Custom in Tailwind config as `shadow-coral` | Keyboard focus on interactive elements |

> Shadows use forest-tinted rgba (not pure black) to stay on-brand.

---

## Motion

> Fast for interactions. Slow for reveals. Never animate anything that isn't adding meaning.

| Intent              | Duration | Easing                          | Use case                                 |
|---------------------|----------|---------------------------------|------------------------------------------|
| Hover / color change| 150ms    | `ease-in-out`                   | Button hover, link color, border reveals |
| Dropdown / accordion| 200ms    | `ease-out`                      | Nav menu, FAQ expand                     |
| Page element reveal | 500ms    | `cubic-bezier(0, 0, 0.2, 1)`   | Framer Motion entrance animations        |
| Stagger delay step  | +80ms    | —                               | Each subsequent item in a staggered list |

**Framer Motion entrance pattern (used on hero and section reveals):**
```tsx
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
```

---

## Breakpoints

| Name | Value  | Tailwind prefix | Notes                                      |
|------|--------|-----------------|--------------------------------------------|
| sm   | 640px  | `sm:`           | Large phones                               |
| md   | 768px  | `md:`           | Tablets                                    |
| lg   | 1024px | `lg:`           | Laptops — most desktop layout switches here|
| xl   | 1280px | `xl:`           | Wide desktop                               |

**Always mobile-first.** Base styles = mobile. Use `lg:` for desktop layout changes.
Minimum design target: 375px (iPhone SE). Primary test sizes: 390px and 1280px.

---

## Tailwind Config

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest:       '#2C3E2D',
        'forest-mid': '#3D5240',
        coral:        '#E8614A',
        'coral-light':'#F08070',
        cream:        '#FAF8F4',
        stone:        '#8A9080',
        dark:         '#1A2418',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans:    ['Outfit', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      boxShadow: {
        coral: '0 0 0 4px rgba(232,97,74,0.25)',
      },
      maxWidth: {
        content: '900px',
      },
    },
  },
  plugins: [],
} satisfies Config
```

---

## Rules for Claude Code

When generating any component for this project:

1. **Colors** — use only the named Tailwind classes above (`bg-forest`, `text-coral`, `bg-cream`, etc.). No raw hex codes like `text-[#2C3E2D]`.
2. **Fonts** — headings always `font-display`. Body always `font-sans`. Labels/tags always `font-mono`.
3. **Spacing** — use the spacing values from the table above. No arbitrary values like `p-[22px]`.
4. **Italic accent** — the coral italic word pattern in headings is the brand signature. Use it on section titles.
5. **Mobile first** — base styles target 375px. Add `lg:` classes for desktop.
6. **No inline styles** — Tailwind classes only, as stated in CLAUDE.md.