-- Doce Essência — permissões de Storage para o bucket product-images
-- Rodar no SQL Editor do Supabase.

create policy "product_images_public_read" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "product_images_admin_insert" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "product_images_admin_update" on storage.objects
  for update using (bucket_id = 'product-images' and auth.role() = 'authenticated');

create policy "product_images_admin_delete" on storage.objects
  for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');
