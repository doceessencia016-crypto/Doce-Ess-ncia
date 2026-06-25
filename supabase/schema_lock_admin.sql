-- Doce Essência — trava as políticas de escrita para a conta admin específica
-- (em vez de "qualquer usuário autenticado"). Rodar no SQL Editor do Supabase.
--
-- UID da conta admin (admpoly@gmail.com): a55a1336-b71b-47de-9164-39a5416ec214

alter policy "categories_admin_write" on categories
  using (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214')
  with check (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214');

alter policy "products_admin_write" on products
  using (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214')
  with check (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214');

alter policy "product_sizes_admin_write" on product_sizes
  using (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214')
  with check (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214');

alter policy "product_images_admin_write" on product_images
  using (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214')
  with check (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214');

alter policy "hero_images_admin_write" on hero_images
  using (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214')
  with check (auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214');

alter policy "product_images_admin_insert" on storage.objects
  with check (bucket_id = 'product-images' and auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214');

alter policy "product_images_admin_update" on storage.objects
  using (bucket_id = 'product-images' and auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214');

alter policy "product_images_admin_delete" on storage.objects
  using (bucket_id = 'product-images' and auth.uid() = 'a55a1336-b71b-47de-9164-39a5416ec214');
