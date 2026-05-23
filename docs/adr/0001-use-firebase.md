# ADR-0001: Use Firebase for Backend Services

## Status
Accepted

## Date
May 2026

## Context
Lily Pad Strategy & Design requires three backend capabilities to function:

1. **Authentication** — clients need to log into the demo portal via magic link
2. **Database** — storing client records, projects, and feedback submissions
3. **File storage** — hosting brand assets and deliverables for client download
4. **Hosting** — deploying the React app with preview channels per PR

The project is maintained by a single developer with a frontend-primary skillset.
There is no capacity to manage servers, configure infrastructure, or maintain a
separate backend codebase. The solution needs to be fully managed, quick to set up,
and deeply integrated with the CI/CD pipeline from day one.

## Decision
Use Firebase as the complete backend platform:

- **Firebase Auth** — email/password and magic link (email link) sign-in
- **Firestore** — NoSQL document database for clients, projects, and feedback
- **Firebase Storage** — signed URL asset delivery for client downloads
- **Cloud Functions** — serverless functions for email notifications and form handling
- **Firebase Hosting** — CDN hosting with native GitHub Actions integration
- **Firebase Analytics** — conversion event tracking from day one

## Consequences

**Positive:**
- Zero server maintenance — fully managed infrastructure
- Native GitHub Actions integration for CI/CD preview channels with one workflow step
- Firebase emulator suite runs the full backend locally during development
- Auth, database, storage, and hosting are all under one console and one billing account
- Magic link authentication is a first-class feature — no third-party auth library needed
- Firestore security rules enforce client data isolation without custom middleware

**Negative:**
- Vendor lock-in — migrating away from Firebase later would require significant effort
- Firestore has query limitations compared to SQL (no joins, limited compound queries)
- Cloud Functions cold start latency can be noticeable on infrequently-triggered functions
- Costs can scale unexpectedly on Firestore reads if security rules are misconfigured

## Alternatives Considered

**Supabase** — open source, PostgreSQL-based, no vendor lock-in. Rejected because
the GitHub Actions / hosting integration is not as seamless, and the team familiarity
with Firebase is higher. Worth revisiting if SQL querying becomes a requirement in
later phases.

**Vercel + PlanetScale** — excellent DX, great for Next.js. Rejected because the
project uses Vite + React (not Next.js), and splitting hosting (Vercel) from database
(PlanetScale) from auth (Auth.js) adds unnecessary complexity for a solo developer.

**AWS Amplify** — powerful and scalable. Rejected due to configuration complexity
and steep learning curve that would slow Phase 0 significantly.