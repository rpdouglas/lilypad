# ADR-0002: Use React Router v7 for Client-Side Routing

## Status
Accepted

## Date
May 2026

## Context
The Lily Pad platform is a React single-page application with two distinct
routing contexts:

1. **Public site** — marketing pages (`/`, `/services`, `/about`, `/start`)
   that must be fast, SEO-friendly, and mobile-responsive
2. **Client portal** — protected routes (`/portal/*`) that require
   authentication state before rendering

The router needs to handle:
- Nested layouts (shared Navbar/Footer wrapping all public pages)
- Auth-gated routes (portal redirects unauthenticated users to login)
- Dynamic route segments (`/portal/[client-slug]/[project-slug]`)
- Clean URLs with Firebase Hosting's SPA rewrite rule

The project uses **Vite 5** as the build tool and **React 18** as the UI library.
The chosen router must integrate cleanly with both.

## Decision
Use **React Router v7** (the package formerly known as Remix, now merged).

Install via:
```bash
npm install react-router-dom@7
```

Configure using `createBrowserRouter` with a nested route tree, where `RootLayout`
wraps all public routes via `<Outlet />`, and portal routes are wrapped in a
separate `PortalLayout` that checks Firebase Auth state before rendering.

## Consequences

**Positive:**
- `createBrowserRouter` provides a clean, declarative route config in one file —
  easy to read and reason about as the app grows
- Nested layouts via `<Outlet />` eliminate prop-drilling the Navbar and Footer
  through every page component
- Built-in `loader` and `action` patterns (v7 feature) are available if
  server-side data fetching is needed in future phases
- First-class TypeScript support with typed route params
- Mature, battle-tested library with extensive documentation and community support
- v7 supports progressive enhancement — routes can be upgraded to framework mode
  for SSR if SEO requirements grow beyond what the current SPA + react-helmet-async
  approach handles

**Negative:**
- React Router v7 is a significant API change from v5/v6 — any existing React
  Router knowledge from older tutorials may not apply directly
- `createBrowserRouter` requires the Firebase Hosting SPA rewrite rule
  (`"source": "**", "destination": "/index.html"`) to be correctly configured
  or all direct URL navigation returns a 404
- Framework mode (full SSR) is not being used in Phase 1, so some v7 features
  are underutilised for now

## Alternatives Considered

**TanStack Router** — type-safe by design, file-based routing, excellent DX.
Rejected because it has a steeper initial configuration curve and the ecosystem
around it (loaders, actions, devtools) is still maturing compared to React Router.
Worth revisiting in Phase 7 if the project scales to need more complex data patterns.

**Wouter** — ultra-lightweight (~2KB) alternative. Rejected because it lacks
nested layout support and the auth-gating pattern for the client portal requires
more routing primitives than Wouter provides out of the box.

**Next.js file-based routing** — would require migrating from Vite to Next.js.
Rejected because the Vite + Firebase Hosting stack is already established in
Phase 0 and the migration cost outweighs the routing benefit at this project scale.