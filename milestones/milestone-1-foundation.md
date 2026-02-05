# Milestone 1 - Next.js Foundation and UI Migration

Goal
- Move the site from Vite to Next.js (App Router) to enable SSR/SSG for stronger SEO, while keeping the current look and layout.

Scope
- Create a new Next.js app in the repo.
- Port the existing UI components and pages to Next.js routes:
  - / (home)
  - /menu
  - /admin (placeholder for now)
- Configure Tailwind and global styles.
- Set up environment variables for Supabase (keys only, no data usage yet).
- Replace any Vite-specific assumptions (e.g., asset imports, router usage).

Key Tasks
- Scaffold Next.js App Router project (TypeScript, Tailwind).
- Move current components into /app and /components structure.
- Update routing (react-router-dom -> Next.js routes).
- Update asset handling (move local images to /public or use next/image).
- Establish a base layout and metadata defaults.

Acceptance Criteria
- `npm run dev` runs the Next.js app and renders the home and menu pages.
- UI matches the current site visually (no layout regressions).
- No runtime errors in the console.
- /admin route exists and shows a placeholder "Admin coming soon" screen.

Out of Scope
- Supabase schema, auth, or CRUD work (handled in later milestones).
