import { supabase } from "./supabase";

export async function fetchCategories() {
  const { data } = await supabase.from("categories").select("*").order("name");
  return data ?? [];
}

export async function fetchCategoryById(id) {
  const { data } = await supabase.from("categories").select("*").eq("id", id).single();
  return data ?? null;
}

export async function createCategory({ name }) {
  const { error } = await supabase.from("categories").insert({ name });
  if (error) throw error;
}

export async function updateCategory(id, { name }) {
  const { error } = await supabase.from("categories").update({ name }).eq("id", id);
  if (error) throw error;
}

export async function deleteCategory(id) {
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) {
    if (error.code === "23503") {
      throw new Error("Não é possível excluir: existem produtos usando essa categoria.");
    }
    throw error;
  }
}
