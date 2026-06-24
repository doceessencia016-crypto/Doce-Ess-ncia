-- Doce Essência — imagens do carrossel da Home (Hero)
-- Rodar no SQL Editor do Supabase.

create table if not exists hero_images (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table hero_images enable row level security;

create policy "hero_images_public_read" on hero_images
  for select using (true);

create policy "hero_images_admin_write" on hero_images
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
