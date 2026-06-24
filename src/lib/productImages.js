import { supabase } from "./supabase";
import { compressImage } from "./compressImage";

export function extractStoragePath(publicUrl) {
  const marker = "/product-images/";
  const index = publicUrl?.indexOf(marker);
  return index === -1 || index === undefined ? null : publicUrl.slice(index + marker.length);
}

export async function deleteProductImage(imageUrl) {
  const path = extractStoragePath(imageUrl);
  if (!path) return;
  await supabase.storage.from("product-images").remove([path]);
}

export async function fetchProductImages(productId) {
  const { data } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("sort_order");
  return data ?? [];
}

export async function uploadProductImage(file) {
  const compressed = await compressImage(file);
  const fileName = `${crypto.randomUUID()}.jpg`;
  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(fileName, compressed);
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function deleteAllImagesForProduct(productId, fallbackImageUrl) {
  const images = await fetchProductImages(productId);
  const urls = images.length ? images.map((img) => img.image_url) : [fallbackImageUrl].filter(Boolean);
  await Promise.all(urls.map((url) => deleteProductImage(url)));
}

export async function setProductImages(productId, images) {
  const { error: deleteError } = await supabase
    .from("product_images")
    .delete()
    .eq("product_id", productId);
  if (deleteError) throw deleteError;

  if (!images.length) return;

  const rows = images.map((imageUrl, index) => ({
    product_id: productId,
    image_url: imageUrl,
    sort_order: index,
  }));
  const { error: insertError } = await supabase.from("product_images").insert(rows);
  if (insertError) throw insertError;
}
