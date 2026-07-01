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
  const path = `logo/logo.${ext}`;
  const { error } = await supabase.storage
    .from("product-images")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw error;
  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return `${data.publicUrl}?t=${Date.now()}`;
}
