-- Doce Essência — múltiplas fotos por produto
-- Rodar no SQL Editor do Supabase.

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  image_url text not null,
  sort_order int not null default 0
);

alter table product_images enable row level security;

create policy "product_images_public_read" on product_images
  for select using (true);

create policy "product_images_admin_write" on product_images
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
