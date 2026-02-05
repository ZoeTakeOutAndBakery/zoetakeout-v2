# Milestone 3 - Admin Panel (Auth + CRUD + Ordering + Images)

Goal
- Build a secure admin panel at /admin for the owner to manage menu, hours, testimonials, and contact details.

Scope
- Supabase Auth (email/password) for a single owner account.
- Admin CRUD for:
  - Menu categories (name, description, image, position)
  - Menu items (name, description, price, category, position)
  - Business hours
  - Testimonials
  - Contact details
- Drag-and-drop ordering for categories and items (smooth UX).
- Image upload to Supabase Storage with 2 MB limit and jpg/png/webp only.

Key Tasks
- Implement admin login flow (Supabase Auth).
- Protect /admin route and API actions (client + server guards).
- Add category and item management screens with reorder controls.
- Add image upload control with client-side validation (type + size + resize/compress).
- Add forms for hours, testimonials, and contact details.
- Add toasts and inline validation for all admin edits.

Acceptance Criteria
- Only the owner can access /admin after login.
- Admin can add/edit/delete categories and items.
- Drag-and-drop order is smooth and persists to the database.
- Admin can update hours, testimonials, and contact details.
- Image uploads reject files larger than 2 MB or invalid types.

Out of Scope
- Multi-user roles or permissions beyond a single owner.
