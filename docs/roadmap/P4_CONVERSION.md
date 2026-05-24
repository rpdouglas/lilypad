# P4 — Conversion Layer

**Status:** 📋 Planned
**Priority:** High
**Started:** —
**Target:** —
**Primary Persona:** Sarah (not-yet-ready prospects who need time before booking — capture them before they leave)

## Goal

Turn traffic that doesn't convert immediately into a warm pipeline. A lead magnet captures emails from visitors who aren't ready to book. Newsletter keeps them warm over weeks or months. Analytics tells you which pages are actually driving the `/start` funnel.

## Deliverables

### Lead Magnet (`/resources`)

- [ ] Lead magnet page — one high-value free resource (e.g. "Brand Audit Checklist" or "Launch Readiness Assessment")
- [ ] Email capture form — name + email, submits to Firebase + newsletter provider
- [ ] Confirmation flow — thank you page or inline confirmation
- [ ] PDF or resource delivered by email via Cloud Function

### Newsletter

- [ ] Newsletter provider chosen and integrated (e.g. Buttondown, ConvertKit, or Resend)
- [ ] Signup form in footer and on `/resources`
- [ ] Welcome email sequence wired
- [ ] Double opt-in confirmed working
- [ ] Subscriber list synced to Firestore (or newsletter provider is canonical)

### Booking

- [ ] Cal.com embed reviewed — confirmed working on mobile and desktop
- [ ] Booking confirmation triggers notification (email or Slack)
- [ ] `/start` page analytics event firing on successful booking

### Analytics Events

- [ ] Firebase Analytics event: `page_view` with persona tag (Sarah/Marcus/Dana implied by page)
- [ ] Firebase Analytics event: `cta_click` on all primary CTAs
- [ ] Firebase Analytics event: `booking_started` when Cal.com embed loads
- [ ] Firebase Analytics event: `booking_completed` on successful booking
- [ ] Firebase Analytics event: `lead_magnet_download` on resource capture

## Persona Gate

Before closing this phase:

1. **Sarah:** Is the lead magnet genuinely useful to her — something she'd share? Does the email capture feel low-friction, not salesy?
2. **Marcus:** Is the newsletter positioned as thought leadership, not promotions? Would he subscribe to something called "Launching Brands That Last"?

## Decisions Made

<!-- Log decisions as you build -->
