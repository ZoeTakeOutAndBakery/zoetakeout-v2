# Milestone 4 - Public Site Data Integration

Goal
- Replace all hardcoded content with Supabase-driven data, while keeping the current design and layout.

Scope
- Menu page and sections are fully data-driven.
- Hours, testimonials, and contact details load from Supabase.
- Public pages are SEO-friendly (SSR/SSG where possible).

Key Tasks
- Wire menu categories/items from Supabase and render in order.
- Load business hours into the Hours section.
- Load testimonials into the Testimonials section.
- Load contact details into Header, Contact section, and Footer.
- Add fallbacks for missing images or optional fields.
- Ensure caching/revalidation strategy is set (e.g., ISR or timed revalidate).

Acceptance Criteria
- No hardcoded menu/hours/testimonials/contact data remains in the UI.
- Public pages render with data from Supabase and match existing design.
- Menu order and category order reflect admin drag-and-drop settings.
- Site loads fast and without client-side flicker for content.
