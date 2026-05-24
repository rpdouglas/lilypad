## What does this PR do?

<!-- One sentence summary of the change. -->


## Type of change

- [ ] New feature
- [ ] Bug fix
- [ ] Content update (copy, MDX, images)
- [ ] Documentation update
- [ ] Refactor (no behaviour change)
- [ ] Config / tooling change

---

## Persona Checklist

**Sarah — The Founder** *(mobile-first, decides fast, books calls at 10pm)*
- [ ] Would Sarah understand this change in under 10 seconds on her phone?
- [ ] Are all interactive elements at least 44px tall for thumb taps?
- [ ] Does the path from landing to booking a call still work in under 3 minutes on mobile?

**Marcus — The Marketing Director** *(desktop, process-oriented, needs to justify budget)*
- [ ] Does Marcus have enough proof and specificity here to justify budget internally?
- [ ] Is any new copy outcome-focused rather than feature-focused?
- [ ] If this touches Services or About — does it reinforce expertise and process clarity?

**Dana — The Active Client** *(portal user, mobile + desktop, needs clarity)*
- [ ] If this touches the portal — can Dana complete her task on an iPhone without zooming?
- [ ] Is project status and next step immediately clear without hunting?
- [ ] Does anything here introduce ambiguity about revision rounds or project state?

---

## Technical Checklist

- [ ] Tailwind classes only — no inline styles, no arbitrary hex values
- [ ] Firebase calls are in /lib/firebase/ only — not inside components directly
- [ ] New page components include a persona annotation comment at the top
- [ ] No console.log statements left in the code
- [ ] Runs without errors locally (npm run dev)
- [ ] Lint passes (npm run lint)
- [ ] Tests pass (npm run test)
- [ ] Tested on mobile (375px) and desktop (1280px) via Firebase preview URL

## Documentation Checklist

- [ ] If a new route was added — docs/SITEMAP.md is updated
- [ ] If a new dependency was added — an ADR exists in docs/adr/
- [ ] If architecture changed — CLAUDE.md is updated

---

## Preview URL

<!-- Paste the Firebase preview channel URL posted by the GitHub Actions bot. -->
<!-- Test this URL on a real phone before marking the PR ready for review. -->


## Screenshots / recordings

<!-- For any UI change, include a screenshot or screen recording. -->
<!-- Mobile screenshot required if the change affects any public page or portal view. -->


---

## Notes for reviewer

<!-- Anything the reviewer should know — decisions made, things deferred, known rough edges. -->
