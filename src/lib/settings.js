import { supabase } from "./supabase";

export async function fetchLogoUrl() {
  const { data } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "logo_url")
    .maybeSingle();
  return data?.value ?? null;
}

export async function saveLogoUrl(url) {
  const { error } = await supabase
    .from("site_settings")
    .upsert({ key: "logo_url", value: url });
  if (error) throw error;
}

export async function uploadLogo(file) {
  const ext = file.name.split(".").pop();
  const newPath = `logo/logo.${ext}`;

  const { data: existing } = await supabase.storage.from("product-images").list("logo");
  if (existing?.length) {
    const toDelete = existing.map((f) => `logo/${f.name}`).filter((p) => p !== newPath);
    if (toDelete.length) await supabase.storage.from("product-images").remove(toDelete);
  }

  const { error } = await supabase.storage
    .from("product-images")
    .upload(newPath, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(newPath);
  return `${data.publicUrl}?t=${Date.now()}`;
}
