# Lily Pad Strategy & Design

Consulting site and client portal built with React, Vite, Tailwind CSS v4, and Firebase.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS v4
- Firebase (Auth, Firestore, Storage, Hosting, Functions)
- React Router v7
- Framer Motion

## Development

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server at localhost:5173 |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier |
| `npm run test` | Run Vitest test suite |
| `npm run test:coverage` | Run tests with coverage report |

## Docs

- [CLAUDE.md](./CLAUDE.md) — AI context file, read automatically by Claude Code
- [docs/BRAND-TOKENS.md](./docs/BRAND-TOKENS.md) — colors, typography, spacing
- [docs/SITEMAP.md](./docs/SITEMAP.md) — all routes and their status
- [docs/personas/](./docs/personas/) — Sarah, Marcus, Dana
- [docs/adr/](./docs/adr/) — architecture decision records

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Firebase credentials.
See `src/lib/firebase/config.ts` for usage.

## Phase Status

| Phase | Description | Status |
|---|---|---|
| 0 | Foundation — repo, CI/CD, Firebase, dev environment | 🟢 Live |
| 1 | Public Site MVP — Home, Services, About, /start | 🔴 Not built |
| 2 | Work & Insights — case studies, blog | ⏳ Upcoming |
| 3 | Client Portal — magic link auth, demo viewer | ⏳ Upcoming |
| 4 | Conversion Layer — lead magnets, booking, analytics | ⏳ Upcoming |