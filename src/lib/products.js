import { supabase } from "./supabase";

function mapProduct(row) {
  const images = (row.product_images ?? [])
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.image_url);

  return {
    id: row.id,
    name: row.name,
    category: row.category,
    discount: row.discount_label,
    sold: row.sold_label,
    image: row.image_url,
    images: images.length ? images : row.image_url ? [row.image_url] : [],
    description: row.description,
    sizes: (row.product_sizes ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((s) => ({
        label: s.label,
        price: Number(s.price),
        originalPrice: s.original_price ? Number(s.original_price) : null,
        installments: s.installments,
      })),
  };
}

const PRODUCT_SELECT = "*, product_sizes(*), product_images(*)";

export function getLowestPrice(product) {
  return Math.min(...product.sizes.map((s) => s.price));
}

export async function fetchBestSellers() {
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("available", true)
    .eq("is_best_seller", true)
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapProduct);
}

export async function fetchNewArrivals() {
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("available", true)
    .eq("is_new_arrival", true)
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapProduct);
}

export async function fetchProductById(id) {
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", id)
    .eq("available", true)
    .single();
  return data ? mapProduct(data) : null;
}

export async function fetchProductsByCategory(category) {
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("available", true)
    .eq("category", category)
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapProduct);
}

export async function fetchSearchableProducts() {
  const { data } = await supabase
    .from("products")
    .select("id, name, category, image_url")
    .eq("available", true)
    .order("name");
  return data ?? [];
}

export async function fetchSimilarProducts(product, limit = 5) {
  const { data } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("available", true)
    .neq("id", product.id)
    .order("category", { ascending: true, nullsFirst: false })
    .limit(limit * 2);

  const mapped = (data ?? []).map(mapProduct);
  const sameCategory = mapped.filter((p) => p.category === product.category);
  const others = mapped.filter((p) => p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
}
