-- Doce Essência — impede duplicidade de produto (mesmo nome + marca) a nível de banco
-- Rodar no SQL Editor do Supabase. Requer schema_brand.sql já aplicado.

create unique index if not exists products_name_brand_unique
  on products (lower(trim(name)), coalesce(lower(trim(brand)), ''));
