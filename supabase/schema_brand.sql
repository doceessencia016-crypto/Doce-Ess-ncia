-- Doce Essência — marca do produto (usado para detectar duplicados nome+marca)
-- Rodar no SQL Editor do Supabase.

alter table products add column if not exists brand text;
