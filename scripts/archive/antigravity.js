#!/usr/bin/env node
// scripts/antigravity.js
// Antigravity CLI — scaffolds pages and components with brand context baked in

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const [,, command, ...args] = process.argv

const templates = {

  page: (name, persona) => ({
    path: `src/pages/${name}Page.tsx`,
    content: `// Persona: ${persona}
// Route: /${name.toLowerCase()}
import PageMeta from '@/components/PageMeta'

export default function ${name}Page() {
  return (
    <>
      <PageMeta
        title="${name}"
        description="TODO: add description for ${name} page"
      />
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-content mx-auto px-10">
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
`
  }),

  component: (name, folder = 'ui') => ({
    path: `src/components/${folder}/${name}.tsx`,
    content: `// Component: ${name}
// Folder: ${folder}
interface ${name}Props {
  // TODO: define props
}

export default function ${name}({ }: ${name}Props) {
  return (
    <div className="font-sans text-dark">
      {/* TODO: implement ${name} */}
    </div>
  )
}
`
  }),

  test: (name, folder = 'ui') => ({
    path: `src/components/${folder}/${name}.test.tsx`,
    content: `import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ${name} from './${name}'

describe('${name}', () => {
  it('renders without crashing', () => {
    render(<${name} />)
    // TODO: add assertions
  })
})
`
  }),

  'case-study': (slug) => ({
    path: `src/content/case-studies/${slug}.mdx`,
    content: `---
title: "TODO: Project Title"
client: "TODO: Client Name"
industry: "TODO: Industry"
services:
  - Brand Strategy
  - Web Development
heroImage: "/images/case-studies/${slug}-hero.jpg"
excerpt: "TODO: 1-2 sentence summary for the index card."
result: "TODO: Quantified outcome — e.g. 40% increase in conversions"
date: "${new Date().toISOString().split('T')[0]}"
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
`
  }),

  post: (slug) => ({
    path: `src/content/blog/${slug}.mdx`,
    content: `---
title: "TODO: Post Title"
excerpt: "TODO: 1-2 sentence summary for the index card."
date: "${new Date().toISOString().split('T')[0]}"
readTime: "5 min read"
category: "Brand Strategy"
featured: false
---

## Introduction

TODO: Write your opening paragraph here.

## Main Point One

TODO: Content...

## Main Point Two

TODO: Content...

## Takeaway

TODO: Close with a clear, actionable insight.
`
  }),

  plan: (name) => ({
    path: `docs/plans/${name.toUpperCase()}_PLAN.md`,
    content: `# Feature Plan — ${name}

## Phase 1 — Persona & Compliance Gate

1. **Identify the Persona:** Which of our primary personas (Sarah, Marcus, Dana) does this serve? How does it help them?
2. **Compliance Checks:**
   - Does this handle user data or PII? (If yes, how is it secured?)
   - Does this require a Cloud Function to write an \`auditLog\`?
   - Is this accessible (A11y/Screen reader friendly)?

## Phase 2 — Schema Audit

List the exact Firestore collections and fields impacted. Quote directly from \`docs/firestore-schema.md\`.
- **Collections read:** 
- **Collections written:** 
- **New fields required:** 

---

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

---

## Phase 4 — Recommendation

State clearly which Strategy you recommend and why it best fits the Lily Pad context. Wait for user approval before proceeding.
`
  }),
}

function writeFile(path, content) {
  const fullPath = join(root, path)
  const dir = dirname(fullPath)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  if (existsSync(fullPath)) {
    console.log(`⚠  Already exists: ${path}`)
    return
  }
  writeFileSync(fullPath, content, 'utf8')
  console.log(`✔  Created: ${path}`)
}

// ── Commands ──────────────────────────────────────────────────────

if (command === 'add') {
  const [type, name, extra] = args

  if (type === 'page') {
    const persona = extra || 'Sarah (primary)'
    const { path, content } = templates.page(name, persona)
    writeFile(path, content)
    console.log(`\n📄 Page scaffolded. Add the route to src/main.tsx:`)
    console.log(`   { path: '${name.toLowerCase()}', element: <${name}Page /> }`)
  }

  else if (type === 'component') {
    const folder = extra || 'ui'
    const comp = templates.component(name, folder)
    const test = templates.test(name, folder)
    writeFile(comp.path, comp.content)
    writeFile(test.path, test.content)
  }

  else if (type === 'case-study') {
    const { path, content } = templates['case-study'](name)
    writeFile(path, content)
    console.log(`\n📝 Case study scaffolded. Add the hero image to:`)
    console.log(`   public/images/case-studies/${name}-hero.jpg`)
    console.log(`   Then update sitemap.xml and docs/SITEMAP.md`)
  }

  else if (type === 'post') {
    const { path, content } = templates.post(name)
    writeFile(path, content)
    console.log(`\n📝 Blog post scaffolded at /insights/${name}`)
    console.log(`   Remember to update sitemap.xml when the post is ready`)
  }

  else {
    console.log(`Unknown type: ${type}`)
    console.log(`Available types: page, component, case-study, post`)
  }
}

else if (command === 'plan') {
  const [name] = args
  if (!name) {
    console.log('Error: Please provide a plan name, e.g. node scripts/antigravity.js plan ContactForm')
    process.exit(1)
  }
  const { path, content } = templates.plan(name)
  writeFile(path, content)
  console.log(`\n📋 Plan scaffolded. Open and complete it at:`)
  console.log(`   ${path}`)
}

else if (command === 'help' || !command) {
  console.log(`
Antigravity CLI — Lily Pad scaffolding tool

Commands:
  add page <Name> [persona]       Scaffold a new page with brand context
  add component <Name> [folder]   Scaffold a component + co-located test
  add case-study <slug>           Scaffold a new MDX case study
  add post <slug>                 Scaffold a new MDX blog post
  plan <Name>                     Scaffold a new feature implementation plan

Examples:
  node scripts/antigravity.js add page Pricing "Marcus (primary)"
  node scripts/antigravity.js add component TestimonialCard marketing
  node scripts/antigravity.js add case-study greenfield-rebrand
  node scripts/antigravity.js add post why-strategy-comes-first
  node scripts/antigravity.js plan contact-form
  `)
}

else {
  console.log(`Unknown command: ${command}. Run with 'help' to see available commands.`)
}