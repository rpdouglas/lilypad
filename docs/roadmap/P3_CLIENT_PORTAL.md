# P3 — Client Portal

**Status:** 📋 Planned
**Priority:** Critical
**Started:** —
**Target:** —
**Primary Persona:** Dana (active client — clarity-focused, accesses from desktop during business hours, reviews from mobile on weekends)
**Secondary Persona:** Robert Lalonde (Legacy Business Owner persona — expects a controlled, professional review environment, not Dropbox links)

## Goal

A protected section of the React app (not a separate product) where clients log in via magic link, see only their own projects, review deliverables, and leave structured feedback — without ever opening an email thread.

## Deliverables

### Authentication

- [ ] Firebase Auth configured — email link (magic link) provider enabled
- [ ] Magic link send flow — add client email in Firebase, they receive invite, one click logs them in
- [ ] Session persistence — 30-day sessions, no re-login friction
- [ ] Auth guard — `/portal` routes redirect unauthenticated users
- [ ] Firestore security rules — clients can only read their own project data (zero cross-client exposure)

### Portal Dashboard (`/portal`)

- [ ] Project list — all active projects for the logged-in client
- [ ] Status badges — In Review, Approved, Archived
- [ ] Revision round number displayed per project

### Demo Viewer (`/portal/[client]/[project]`)

- [ ] Deliverable embed — Figma iframe, web preview, video, or PDF viewer (clean full-screen layout)
- [ ] Revision history toggle — "Round 1," "Round 2," etc. for comparing changes

### Feedback Form

- [ ] Section selector — client chooses which section they're commenting on
- [ ] Feedback text input
- [ ] Submit to Firestore
- [ ] Cloud Function trigger — Slack/email notification on new feedback submission

### Asset Downloads

- [ ] Brand kit ZIPs, style guides, exported assets via signed Firebase Storage URLs
- [ ] Access-controlled per client — no cross-client URL guessing

### First Client

- [ ] First real client onboarded to portal — magic link sent and confirmed working
- [ ] End-to-end test: invite → login → view deliverable → submit feedback → notification received

## Persona Gate

Before closing this phase:

1. **Dana:** Can she log in from her iPhone at 8pm without a password? Can she find her project immediately? Can she submit feedback in under 2 minutes?
2. **Dana:** If she shares the portal link with an internal stakeholder, does it handle auth gracefully (redirect to magic link request)?
3. **Security check:** Confirm Firestore rules prevent Client A from reading Client B's data. Test this explicitly.

## Decisions Made

<!-- Log decisions as you build -->
