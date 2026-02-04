# Zoe Take Out & Bakery Website

Astro static marketing site backed by Sanity CMS. Routes include `/` and `/menu` with content managed in Sanity and rendered at build time.

## Quick Facts
- Type: Static marketing site with two routes
- Primary audience: Local customers looking for menu, hours, catering, and contact info
- Data: Sanity CMS (core content)
- Hosting: Netlify

## Tech Stack
- Build: Astro 5 + TypeScript
- Styling: Tailwind CSS
- CMS: Sanity Studio (separate `/sanity` folder)

## Deploy-Only Workflow (Recommended)
You do not need to install dependencies locally. Push to GitHub and let Netlify build the site.

1. Push this repo to GitHub.
2. Connect the repo in Netlify.
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables in Netlify (Site settings → Environment variables).

## Sanity Studio (Hosted)
The studio lives in `sanity/` and is intended to be hosted by Sanity. You do not need it running locally for deploy-only.

Optional local use:
```bash
npm --prefix sanity install
npm run studio
```

## Environment Variables
Set these in Netlify (recommended) or a local `.env` if you do local dev:
```
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
```

## Project Structure
```
astro.config.mjs
sanity/
  sanity.config.ts
  schemaTypes/
src/
  layouts/
  components/
  pages/
  lib/
  styles/
```

## Content Managed in Sanity
- Site settings: hero, CTAs, contact info, social links
- Hours
- Menu categories and items
- Testimonials
- Delivery links

## Deployment (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`

---

If you want, I can add a starter Sanity dataset export or wire up a one-click Netlify config.
