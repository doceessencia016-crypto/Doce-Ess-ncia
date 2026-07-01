-- Doce Essência — configurações globais do site (logo, etc.)
-- Rodar no SQL Editor do Supabase.

create table if not exists site_settings (
  key text primary key,
  value text
);

-- Leitura pública
create policy "site_settings_public_read" on site_settings
  for select using (true);

-- Escrita só para admin
create policy "site_settings_admin_write" on site_settings
  for all using (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214')
  with check (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214');

alter table site_settings enable row level security;
