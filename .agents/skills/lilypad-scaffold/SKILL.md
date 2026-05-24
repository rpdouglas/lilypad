---
name: lilypad-scaffold
description: >-
  Boilerplate files scaffolding for Lily Pad. Activate this skill when the user
  requests to create new pages, custom UI elements, MDX blog entries, or brand
  case studies.
---

# Scaffold New Branded Templates

Scaffold a new file for Lily Pad with brand context and project conventions already applied.

**Supported Scaffold Types:** `page`, `component`, `case-study`, `post`

Before creating any file, check if it already exists at the target path. If it does, warn the user and do not overwrite.

---

## 1. Page Boilerplate

**Command Pattern:** `Scaffold page <Name> [persona]`
Default persona: `Sarah (primary)` if not specified.

Create `src/pages/<Name>Page.tsx`:

```tsx
// Persona: <persona>
// Route: /<name-lowercase>

export default function <Name>Page() {
  return (
    <>
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-4 block">
            Section Label
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-light text-forest leading-tight mb-6">
            Page <em className="italic text-coral">Heading</em>
          </h1>
          <p className="font-sans text-base text-stone max-w-xl leading-relaxed">
            TODO: add lead paragraph
          </p>
        </div>
      </section>
    </>
  )
}
```

After creating the file:
1. Read the router file (`src/App.tsx`) and show the user exactly where to add the new route. Route pages MUST use `React.lazy()` — never a static import:
   ```tsx
   const <Name>Page = lazy(() => import('@/pages/<Name>Page'))
   // in the router:
   { path: '/<name>', element: <Suspense fallback={null}><Name>Page /></Suspense> }
   ```
2. Check `docs/SITEMAP.md` — if the route exists there with status 🔴 Not built, note that the status should be updated to 🟡 In progress.

---

## 2. Component Boilerplate

**Command Pattern:** `Scaffold component <Name> [folder]`
Default folder: `ui`. Valid folders: `ui`, `marketing`, `portal`.

Create `src/components/<folder>/<Name>.tsx`:

```tsx
// Persona: [choose: all / Sarah / Marcus / Dana — whichever is most relevant for this folder]
interface <Name>Props {
  // TODO: define props
}

export default function <Name>({ }: <Name>Props) {
  return (
    <div className="font-sans text-dark">
      {/* TODO: implement <Name> */}
    </div>
  )
}
```

Also create `src/components/<folder>/<Name>.test.tsx`:

```tsx
import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import <Name> from './<Name>'

describe('<Name>', () => {
  it('renders without crashing', () => {
    render(<Name />)
  })
})
```

---

## 3. Case Study Boilerplate

**Command Pattern:** `Scaffold case-study <slug>`

Create `src/content/case-studies/<slug>.mdx`:

```mdx
---
title: "TODO: Project Title"
client: "TODO: Client Name"
industry: "TODO: Industry"
services:
  - Brand Strategy
  - Web Development
heroImage: "/images/case-studies/<slug>-hero.jpg"
excerpt: "TODO: 1-2 sentence summary for the index card."
result: "TODO: Quantified outcome — e.g. 40% increase in conversions"
date: "<today's ISO date>"
featured: false
---

## The Brief

TODO: Describe the problem the client came to you with.

## The Approach

TODO: Describe what you did and why.

## The Result

TODO: Describe what changed. Lead with the quantified outcome.

> "TODO: Client quote"
> — Name, Title at Client
```

After creating:
- Remind the user to add the hero image to `public/images/case-studies/<slug>-hero.jpg`.
- Note the `/work/[slug]` route status in `docs/SITEMAP.md`.

---

## 4. Post Boilerplate

**Command Pattern:** `Scaffold post <slug>`

Create `src/content/blog/<slug>.mdx`:

```mdx
---
title: "TODO: Post Title"
excerpt: "TODO: 1-2 sentence summary."
date: "<today's ISO date>"
readTime: "5 min read"
category: "Brand Strategy"
featured: false
---

## Introduction

TODO: Opening paragraph.

## Main Point One

TODO: Content...

## Main Point Two

TODO: Content...

## Takeaway

TODO: Close with a clear, actionable insight.
```

After creating:
- Note the `/insights/[slug]` route status in `docs/SITEMAP.md`.

---

## After Scaffolding

Always confirm:
1. The exact path of the file created.
2. Any follow-up actions the user should take (add route to router, add hero image, update SITEMAP.md).
