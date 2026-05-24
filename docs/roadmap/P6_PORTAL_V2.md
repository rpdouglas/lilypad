# P6 — Portal v2

**Status:** 📋 Planned
**Priority:** Medium
**Started:** —
**Target:** —
**Primary Persona:** Dana (needs structured, granular feedback tools — not just a comment box)
**Secondary Persona:** Robert Lalonde (multi-stakeholder review — his son has aesthetic veto, Robert has budget veto)

## Goal

Upgrade the portal from a deliverable viewer with a feedback form into a structured review environment with inline commenting, formal approval workflow, multi-stakeholder access, and a project timeline. Reduces client-side confusion and eliminates "where are we?" emails.

## Deliverables

### Inline Commenting

- [ ] Click any part of a design to drop a pinned comment
- [ ] Firestore structure for coordinate-mapped comments (`x`, `y`, `section`, `text`, `author`, `timestamp`)
- [ ] CSS coordinate mapping — comment pins render at correct position on design
- [ ] Comment thread — reply to a pin, resolve a pin
- [ ] Notification on new comment — Cloud Function → Slack/email

### Approval Workflow

- [ ] "Approve this revision" button per project / revision round
- [ ] Cloud Function trigger on approval: project status updates → Slack notification → timestamp logged
- [ ] Approval is audit-ready — stored in Firestore with email + timestamp
- [ ] Client cannot un-approve (read-only after approval)

### Multi-Stakeholder Access

- [ ] Multiple email addresses per project in Firebase
- [ ] Permission levels: read-only (view + download) and comment (view + download + submit feedback)
- [ ] Each stakeholder gets their own magic link — no shared passwords
- [ ] Admin panel (internal only) to add/remove stakeholder emails per project

### Project Timeline

- [ ] Visual milestone tracker per project — where the engagement is and what's next
- [ ] Milestones map to Lily Pad Launch phases (Root → Submerge → Pad → Surface → Bloom → Flow)
- [ ] Timeline visible to client — read-only, set by internal admin
- [ ] Reduces "where are we?" emails — target: zero timeline questions from active clients

## Persona Gate

Before closing this phase:

1. **Dana:** Can she click a design, leave a pinned comment, and see it resolved — from her iPhone at 8pm? Does the timeline tell her what's happening next without her asking?
2. **Robert:** Can he add his son as a stakeholder with comment permissions and himself as read-only? Does the approval workflow feel formal enough for a 31-year business owner signing off on a rebrand?
3. **Security:** Confirm that stakeholder A on Project X cannot access Project Y — even with a valid session.

## Decisions Made

<!-- Log decisions as you build -->
