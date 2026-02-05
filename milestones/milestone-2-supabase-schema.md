# Milestone 2 - Supabase Schema, Storage, and Seed Data (SQL)

Goal
- Create the Supabase schema, storage bucket, and seed data so the admin and public site can be fully data-driven.

Notes
- This SQL is intended to be run in the Supabase SQL Editor.
- Replace <OWNER_USER_UUID> with the actual user id from Supabase Auth.
- Image policy: jpg/png/webp, 2 MB max.

SQL (copy/paste into Supabase SQL Editor)
```sql
-- Extensions
create extension if not exists pgcrypto;

-- Admins
create table if not exists app_admins (
  user_id uuid primary key,
  created_at timestamptz not null default now()
);

-- Menu categories
create table if not exists menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  image_url text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Menu items
create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references menu_categories(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Business hours (simple weekly hours, no date overrides)
create table if not exists business_hours (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  day_label text not null,
  open_time time,
  close_time time,
  is_closed boolean not null default false,
  position int not null default 0,
  created_at timestamptz not null default now(),
  unique (day_of_week)
);

-- Testimonials
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rating int not null check (rating between 1 and 5),
  text text not null,
  event text,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Contact details (single row)
create table if not exists contact_details (
  id uuid primary key default gen_random_uuid(),
  phone text,
  email text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  postal_code text,
  map_url text,
  map_embed_url text,
  facebook_url text,
  instagram_url text,
  twitter_url text,
  doordash_url text,
  ubereats_url text,
  updated_at timestamptz not null default now()
);

-- Row Level Security
alter table app_admins enable row level security;
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table business_hours enable row level security;
alter table testimonials enable row level security;
alter table contact_details enable row level security;

-- RLS policies
create policy "admin read self" on app_admins
  for select using (user_id = auth.uid());

create policy "admin insert self" on app_admins
  for insert with check (user_id = auth.uid());

-- Public read access
create policy "public read" on menu_categories for select using (true);
create policy "public read" on menu_items for select using (true);
create policy "public read" on business_hours for select using (true);
create policy "public read" on testimonials for select using (true);
create policy "public read" on contact_details for select using (true);

-- Admin write access
create policy "admin write" on menu_categories
  for all using (exists (select 1 from app_admins where user_id = auth.uid()))
  with check (exists (select 1 from app_admins where user_id = auth.uid()));

create policy "admin write" on menu_items
  for all using (exists (select 1 from app_admins where user_id = auth.uid()))
  with check (exists (select 1 from app_admins where user_id = auth.uid()));

create policy "admin write" on business_hours
  for all using (exists (select 1 from app_admins where user_id = auth.uid()))
  with check (exists (select 1 from app_admins where user_id = auth.uid()));

create policy "admin write" on testimonials
  for all using (exists (select 1 from app_admins where user_id = auth.uid()))
  with check (exists (select 1 from app_admins where user_id = auth.uid()));

create policy "admin write" on contact_details
  for all using (exists (select 1 from app_admins where user_id = auth.uid()))
  with check (exists (select 1 from app_admins where user_id = auth.uid()));

-- Storage bucket for menu images (public read)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('menu-images', 'menu-images', true, 2097152, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

-- Storage RLS policies (if needed)
create policy "public read" on storage.objects
  for select using (bucket_id = 'menu-images');

create policy "admin upload" on storage.objects
  for insert with check (
    bucket_id = 'menu-images'
    and exists (select 1 from app_admins where user_id = auth.uid())
  );

create policy "admin update" on storage.objects
  for update using (
    bucket_id = 'menu-images'
    and exists (select 1 from app_admins where user_id = auth.uid())
  );

create policy "admin delete" on storage.objects
  for delete using (
    bucket_id = 'menu-images'
    and exists (select 1 from app_admins where user_id = auth.uid())
  );

-- Seed admin (replace with your Supabase Auth user id)
insert into app_admins (user_id)
values ('<OWNER_USER_UUID>')
on conflict do nothing;

-- Seed business hours
insert into business_hours (day_of_week, day_label, open_time, close_time, is_closed, position) values
(1, 'Monday', '11:00', '22:00', false, 1),
(2, 'Tuesday', '11:00', '22:00', false, 2),
(3, 'Wednesday', '11:00', '22:00', false, 3),
(4, 'Thursday', '11:00', '22:00', false, 4),
(5, 'Friday', '11:00', '23:00', false, 5),
(6, 'Saturday', '08:00', '23:00', false, 6),
(0, 'Sunday', null, null, true, 7)
;

-- Seed testimonials
insert into testimonials (name, rating, text, event, position) values
('Sarah Johnson', 5, 'Zoe''s bakery catered my wedding and it was absolutely perfect! The pastries were fresh, beautiful, and delicious. Our guests are still talking about the amazing food.', 'Wedding Catering', 1),
('Michael Rodriguez', 5, 'I order from here weekly through DoorDash. Their cakes are the best in town, and the customer service is always excellent. Highly recommend!', 'Birthday Party', 2),
('Emily Chen', 5, 'They handled our company event beautifully. Professional service, incredible variety, and everything was ready exactly on time. Will definitely use them again!', 'Corporate Event', 3)
;

-- Seed contact details
insert into contact_details (
  phone, email, address_line1, address_line2, city, state, postal_code,
  map_url, map_embed_url, facebook_url, instagram_url, twitter_url,
  doordash_url, ubereats_url
) values (
  '(954) 306-3270',
  'zoetakeoutandbakery@gmail.com',
  '3250 Davie Blvd',
  null,
  'Fort Lauderdale',
  'FL',
  '33312',
  'https://maps.app.goo.gl/xjJnuP2gB2TtRVVA7',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.81414630707!2d-80.19128648949908!3d26.10498489424083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9074adf77ad23%3A0xb03898b22f12c2d8!2s3250%20Davie%20Blvd%2C%20Fort%20Lauderdale%2C%20FL%2033312!5e0!3m2!1sen!2sus!4v1756403760211!5m2!1sen!2sus',
  'https://facebook.com/zoetakeoutbakery',
  'https://instagram.com/zoetakeoutbakery',
  'https://twitter.com/zoetakeoutbakery',
  'https://www.doordash.com/store/zoe-take-out-&-bakery-fort-lauderdale-35400527/',
  'https://www.ubereats.com'
);

$menuSeed
```

Acceptance Criteria
- Supabase tables and storage bucket exist.
- RLS policies allow public read and admin-only write.
- Seed data appears in the Supabase table editor.
- An admin user (owner) can read/write data via Supabase Auth.
