-- Doce Essência — preço antigo (de/por) por tamanho
-- Rodar no SQL Editor do Supabase.

alter table product_sizes add column if not exists original_price numeric(10,2);
