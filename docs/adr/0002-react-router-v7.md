# ADR-0002: Use React Router v7 for Client-Side Routing

## Status
Accepted

## Date
May 2026

## Context
The Lily Pad platform is a React single-page application with two distinct
routing contexts:

1. **Public site** — marketing pages (/, /services, /about, /start)
   that must be fast, SEO-friendly, and mobile-responsive
2. **Client portal** — protected routes (/portal/*) that require
   authentication state before rendering

The router needs to handle:
- Nested layouts (shared Navbar/Footer wrapping all public pages)
- Auth-gated routes (portal redirects unauthenticated users to login)
- Dynamic route segments (/portal/[client-slug]/[project-slug])
- Clean URLs with Firebase Hosting's SPA rewrite rule

## Decision
Use React Router v7 (the package formerly known as Remix, now merged).

## Consequences

**Positive:**
- createBrowserRouter provides a clean, declarative route config in one file
- Nested layouts via Outlet eliminate prop-drilling the Navbar and Footer
- Built-in loader and action patterns available for future phases
- First-class TypeScript support with typed route params
- Mature, battle-tested library with extensive documentation

**Negative:**
- React Router v7 is a significant API change from v5/v6
- Requires the Firebase Hosting SPA rewrite rule to be correctly configured
- Framework mode (SSR) is not being used in Phase 1

## Alternatives Considered

**TanStack Router** — type-safe by design, file-based routing. Rejected due to
steeper initial configuration and a less mature ecosystem at project start.

**Wouter** — ultra-lightweight (~2KB). Rejected because it lacks nested layout
support needed for the auth-gating pattern.

**Next.js file-based routing** — would require migrating from Vite to Next.js.
Rejected because the Vite + Firebase Hosting stack is already established.
