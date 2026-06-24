import { supabase } from "./supabase";
import { compressImage } from "./compressImage";
import { extractStoragePath } from "./productImages";

export async function fetchHeroImages() {
  const { data } = await supabase.from("hero_images").select("*").order("sort_order");
  return data ?? [];
}

export async function uploadHeroImage(file) {
  const compressed = await compressImage(file, { maxWidth: 1600 });
  const fileName = `hero/${crypto.randomUUID()}.jpg`;
  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(fileName, compressed);
  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(fileName);

  const { data: existing } = await supabase
    .from("hero_images")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextOrder = existing?.length ? existing[0].sort_order + 1 : 0;

  const { error: insertError } = await supabase
    .from("hero_images")
    .insert({ image_url: publicUrlData.publicUrl, sort_order: nextOrder });
  if (insertError) throw insertError;
}

export async function deleteHeroImage(heroImage) {
  const { error } = await supabase.from("hero_images").delete().eq("id", heroImage.id);
  if (error) throw error;

  const path = extractStoragePath(heroImage.image_url);
  if (path) {
    await supabase.storage.from("product-images").remove([path]);
  }
}

export async function reorderHeroImages(orderedImages) {
  await Promise.all(
    orderedImages.map((img, index) =>
      supabase.from("hero_images").update({ sort_order: index }).eq("id", img.id)
    )
  );
}
