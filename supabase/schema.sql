-- Doce Essência — schema inicial do catálogo
-- Rodar uma vez em: Supabase Dashboard -> SQL Editor -> New query -> Run

create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  category text not null references categories(name) on update cascade,
  image_url text,
  discount_label text,
  sold_label text,
  is_best_seller boolean not null default false,
  is_new_arrival boolean not null default false,
  available boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists product_sizes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  label text not null,
  price numeric(10,2) not null,
  installments text,
  sort_order int not null default 0
);

-- Leitura pública liberada (catálogo não é sensível).
-- Escrita só pelo backend do Admin, usando a service_role key (que ignora RLS).
alter table categories enable row level security;
alter table products enable row level security;
alter table product_sizes enable row level security;

create policy "categories_public_read" on categories
  for select using (true);

create policy "products_public_read" on products
  for select using (true);

create policy "product_sizes_public_read" on product_sizes
  for select using (true);

-- Escrita liberada só para usuários autenticados (a admin logada via Supabase Auth).
create policy "categories_admin_write" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "products_admin_write" on products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "product_sizes_admin_write" on product_sizes
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
