# P3 — Client Portal Plan

**Feature:** Client Portal (Phase 3)
**Roadmap file:** `docs/roadmap/P3_CLIENT_PORTAL.md`
**Created:** 2026-05-25
**Status:** Awaiting `/approve`

---

## Phase 1 — Persona & Compliance Gate

### Primary Persona: Dana (Active Client)
Dana is the principal user of the portal. She reviews deliverables on desktop during
business hours and checks back from her iPhone on evenings and weekends. She expects
professional clarity — not a Dropbox link. Her key needs:

- Log in without a password (magic link to her email)
- Immediately see her project(s) and their current status
- View a deliverable embed (Figma, PDF, or video) in a clean, distraction-free layout
- Leave structured feedback on specific sections in under 2 minutes
- Download brand assets when she needs them

**Secondary Persona: Robert (Legacy Business Owner)**
Robert is less tech-literate. He expects a controlled review environment and may share
the portal URL with an internal stakeholder. The auth flow must handle an unauthenticated
visit gracefully — redirect to magic link request, not a 404 or a broken page.

### Compliance Checks

| Check | Status | Notes |
|-------|--------|-------|
| Handles PII? | Yes | Client email and project data stored in Firestore. |
| Firestore security | Required | `clients/{clientId}` readable only by the matching authenticated email. Cross-client isolation is a hard requirement — must be explicitly tested. |
| Firebase Auth | Yes | Email link (passwordless / magic link) provider. 30-day session persistence. |
| Accessibility | Yes | All portal views must be keyboard-navigable and screen-reader friendly. Focus management through auth flow is critical on mobile. |

---

## Phase 2 — Schema Audit

> **Important note:** The current `docs/firestore-schema.md` does not contain any
> portal-specific collections. All collections below are **net-new** and must be added
> to `docs/firestore-schema.md` before any implementation begins. Each addition also
> requires a one-liner in `DECISIONS.md` per schema governance rules.

### Collections read (new — not yet in schema)

- `clients/{clientId}` — client profile and metadata
- `clients/{clientId}/projects/{projectId}` — per-client project records
- `clients/{clientId}/projects/{projectId}/deliverables/{deliverableId}` — embed URLs, type, revision round
- `clients/{clientId}/projects/{projectId}/feedback/{feedbackId}` — structured feedback submissions

### Collections written (new — not yet in schema)

- `clients/{clientId}/projects/{projectId}/feedback/{feedbackId}` — on feedback submission

### New fields required (all net-new — no existing schema to reference)

**`clients/{clientId}`**

| Field | Type | Notes |
|-------|------|-------|
| `email` | string | Must match the authenticated user's email for Firestore rule enforcement |
| `displayName` | string | Shown in portal header |
| `slug` | string | URL-safe identifier, e.g. `acme-corp` |
| `createdAt` | timestamp | Server timestamp |

**`clients/{clientId}/projects/{projectId}`**

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Project display name |
| `slug` | string | URL-safe identifier |
| `status` | string | `in-review` \| `approved` \| `archived` |
| `revisionRound` | number | Current revision round (1, 2, 3…) |
| `createdAt` | timestamp | Server timestamp |
| `updatedAt` | timestamp | Server timestamp |

**`clients/{clientId}/projects/{projectId}/deliverables/{deliverableId}`**

| Field | Type | Notes |
|-------|------|-------|
| `type` | string | `figma` \| `video` \| `pdf` \| `web-preview` |
| `embedUrl` | string | Figma embed URL, Loom URL, Firebase Storage URL, etc. |
| `revisionRound` | number | Which round this deliverable belongs to |
| `label` | string | Display label, e.g. `"Brand Identity — Round 2"` |
| `createdAt` | timestamp | Server timestamp |

**`clients/{clientId}/projects/{projectId}/feedback/{feedbackId}`**

| Field | Type | Notes |
|-------|------|-------|
| `section` | string | Client-selected section label (e.g. `"Logo", "Color Palette"`) |
| `body` | string | Free-text feedback |
| `revisionRound` | number | Which round this feedback targets |
| `submittedBy` | string | Authenticated user email |
| `createdAt` | timestamp | Server timestamp |

**Firebase Storage paths (new — not Firestore)**

- `clients/{clientId}/assets/{filename}` — brand kit ZIPs and exported assets

> Signed URL access controlled per client. No direct path guessing. Firestore Security Rules + Storage Rules enforce isolation.

---

## Phase 3 — Three-Strategy Proposal

### Strategy A — Minimal
*Fastest possible portal: auth-gated pages with manually-managed embed links. Zero Firestore reads for deliverables.*

**Architecture:**
- Firebase Auth with email link provider (required in all strategies)
- Auth guard HOC wrapping `/portal/*` routes — redirect to magic link request page if unauthenticated
- Single Firestore collection: `clients/{clientId}` with an embedded `projects` array containing deliverable embed URLs and status as plain strings
- Portal dashboard renders from this flat array — no subcollection reads
- Feedback is an external form (Tally or Typeform) embedded as an iframe — no Firestore write from the app
- Asset downloads: manually-generated signed URLs, pasted into Firestore document
- No Cloud Functions

**Trade-offs:**
- Fast to ship (estimated 3–4 days)
- No real-time feedback in Firestore — loses the "structured feedback → notification" deliverable
- Array-based project model breaks down past 2–3 projects per client
- Revision history is impossible without subcollections
- Manually managing signed URLs is error-prone and doesn't scale

**Scope:** Small

---

### Strategy B — Recommended
*Full portal as designed in the P3 roadmap: proper Firestore schema, magic link auth, deliverable embeds, structured feedback → notification, and signed asset downloads. Buildable without Cloud Functions for the core flow.*

**Architecture:**
- Firebase Auth with email link provider — 30-day persistence, `/portal/auth` entry page handles link confirmation
- `PortalLayout` wraps all `/portal/*` routes — auth guard checks Firebase Auth state, redirects unauthenticated visitors to `/portal/auth`
- Firestore collections as defined in Phase 2 — subcollection model supports revision rounds and multi-project clients
- Firestore Security Rules enforce per-client isolation: `request.auth.token.email == resource.data.email` on `clients/{clientId}`
- Portal routes:
  - `/portal` — redirects to `/portal/[client-slug]` after auth
  - `/portal/[client-slug]` — project list with status badges and revision round
  - `/portal/[client-slug]/[project-slug]` — deliverable embed (Figma iframe, Loom iframe, PDF viewer, or web preview depending on `type` field) with revision history toggle
  - `/portal/[client-slug]/feedback` — section selector + text area, writes to Firestore feedback subcollection
- Feedback notification: Firebase Extension "Trigger Email" (or `nodemailer` in a lightweight Cloud Function) sends an email to the Lily Pad team when a new feedback document is written — no Slack required for MVP
- Asset downloads: Firebase Storage with signed URLs generated server-side (simple Cloud Function or the Admin SDK pattern from a callable function)
- All Firebase calls abstracted in `src/lib/firebase/` — portal components consume hooks only

**Trade-offs:**
- 7–10 days of build time (auth flow, layout, three page-level components, feedback form, one Cloud Function for notification)
- One Cloud Function required (email notification) — adds Firebase Blaze plan dependency if not already on it
- Signed URL generation requires either a Cloud Function or a backend call — cannot safely generate from the client SDK without exposing private keys
- No real-time updates (Framer polling is not needed for V1 — client submits feedback and leaves)

**Scope:** Medium

---

### Strategy C — Robust
*All of Strategy B plus real-time collaboration features, Slack integration, full audit trail, and all writes mediated by Cloud Functions.*

**Architecture:**
- Everything in Strategy B, plus:
- All Firestore writes (feedback submission, status updates) go through callable Cloud Functions — no direct client SDK writes to any collection
- Real-time feedback panel: `onSnapshot` listener on the feedback subcollection so Dana sees her submitted feedback confirmed instantly without a page reload
- Slack webhook on feedback submission (Cloud Function posts a formatted message to `#client-feedback` or a dedicated channel per client)
- Client-facing revision comparison: side-by-side or toggle between deliverable rounds using the `revisionRound` field
- `auditLogs/{id}` entries for portal events: `portal_feedback_submitted`, `portal_asset_downloaded`, `portal_login`
- Invite management UI: admin screen (auth-gated, admin claim) to add clients, send magic links, and archive projects
- Storage rule: download URL only accessible when a signed URL token is present — callable Cloud Function mints a time-limited token scoped to `clients/{clientId}`

**Trade-offs:**
- 3–5 weeks of build time — significantly larger scope
- Requires admin claim on Firebase Auth (another Cloud Function or manual Firebase console step)
- Real-time listener for a single-user review session is over-engineered for V1 — Dana submits feedback and leaves; she doesn't need a live feed
- Audit log events add complexity to every write path
- Slack integration is nice-to-have; email notification in Strategy B is sufficient for a single-consultant business at this stage

**Scope:** Large

---

## Phase 4 — Recommendation

**Recommend Strategy B.**

Lily Pad has one consultant, one or two active clients at a time, and the portal's primary
job is to eliminate email threads — not to build a real-time collaboration platform.
Strategy B delivers every deliverable in the P3 roadmap (auth, dashboard, embed viewer,
structured feedback, signed asset downloads, notification) in a scope that can ship within
two weeks without over-engineering.

The single Cloud Function for email notification is a reasonable addition — it keeps the
client SDK clean and Firebase Blaze is a prerequisite for production anyway (Storage egress).

Strategy A sacrifices the feedback-to-Firestore flow (a named P3 deliverable) and won't
hold up past the first real client. Strategy C is the right direction for P6 Portal v2 —
once we have 5+ active clients and need admin tooling.

**Before any implementation:**
1. Add all new collections to `docs/firestore-schema.md`
2. Add a one-liner per collection to `DECISIONS.md`
3. Run `/approve` to unlock the build

**Proposed implementation order (once approved):**
1. Schema additions to `firestore-schema.md` and `DECISIONS.md`
2. Firebase Auth email link setup (Firebase console + `src/lib/firebase/auth.ts`)
3. `PortalLayout` and auth guard
4. `/portal/auth` — magic link request + confirmation handler
5. `clients/{clientId}` Firestore rules + test
6. `/portal/[client-slug]` — dashboard
7. `/portal/[client-slug]/[project-slug]` — embed viewer + revision toggle
8. `/portal/[client-slug]/feedback` — feedback form
9. Cloud Function — email notification on feedback write
10. Firebase Storage rules + signed URL Cloud Function
11. Persona gate: end-to-end test with first real client (Dana scenario)

---

*Lily Pad Strategy & Design · docs/plans/P3_CLIENT_PORTAL_PLAN.md*
*Run `/approve` to begin implementation.*
