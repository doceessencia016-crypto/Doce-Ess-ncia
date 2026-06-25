import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import {
  fetchProductImages,
  uploadProductImage,
  setProductImages,
  deleteProductImage,
} from "../../lib/productImages";

const emptySize = { sizeUnit: "ml", sizeValue: "", price: "", originalPrice: "", installmentsCount: 1 };

function parseInstallmentsCount(installmentsText) {
  const match = /^(\d+)x/.exec(installmentsText ?? "");
  return match ? Number(match[1]) : 1;
}

function parseSizeLabel(label) {
  const match = /^(\d+)\s*ml$/i.exec(label ?? "");
  return match ? { sizeUnit: "ml", sizeValue: match[1] } : { sizeUnit: "unico", sizeValue: "" };
}

function buildSizeLabel(size) {
  return size.sizeUnit === "ml" ? `${size.sizeValue}ml` : "Único";
}

function calcSavingsText(price, originalPrice) {
  const numPrice = Number(price);
  const numOriginal = Number(originalPrice);
  if (!numPrice || !numOriginal || numOriginal <= numPrice) return null;
  const savings = numOriginal - numPrice;
  const formatted = savings.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `R$ ${formatted} a menos`;
}

function calcInstallmentsText(price, count) {
  const numPrice = Number(price);
  const numCount = Number(count);
  if (!numPrice || !numCount || numCount <= 1) return null;
  const perInstallment = numPrice / numCount;
  const formatted = perInstallment.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${numCount}x de R$ ${formatted}`;
}

export default function ProductForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discountLabel, setDiscountLabel] = useState("");
  const [soldLabel, setSoldLabel] = useState("");
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([{ ...emptySize }]);

  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [duplicateProduct, setDuplicateProduct] = useState(null);

  useEffect(() => {
    supabase
      .from("categories")
      .select("*")
      .order("name")
      .then(({ data }) => setCategories(data ?? []));
  }, []);

  useEffect(() => {
    if (!isEditing) return;
    supabase
      .from("products")
      .select("*, product_sizes(*)")
      .eq("id", id)
      .single()
      .then(async ({ data, error: fetchError }) => {
        if (fetchError || !data) {
          setError("Produto não encontrado.");
          setIsLoading(false);
          return;
        }
        setName(data.name);
        setBrand(data.brand ?? "");
        setDescription(data.description ?? "");
        setCategory(data.category);
        setDiscountLabel(data.discount_label ?? "");
        setSoldLabel(data.sold_label ?? "");
        setIsBestSeller(data.is_best_seller);
        setIsNewArrival(data.is_new_arrival);

        const imageRows = await fetchProductImages(id);
        if (imageRows.length) {
          setImages(imageRows.map((row) => ({ id: row.id, url: row.image_url, file: null })));
        } else if (data.image_url) {
          setImages([{ id: "legacy", url: data.image_url, file: null }]);
        }

        setSizes(
          data.product_sizes.length
            ? data.product_sizes
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((s) => ({
                  ...parseSizeLabel(s.label),
                  price: s.price,
                  originalPrice: s.original_price ?? "",
                  installmentsCount: parseInstallmentsCount(s.installments),
                }))
            : [{ ...emptySize }]
        );
        setIsLoading(false);
      });
  }, [id, isEditing]);

  function updateSize(index, field, value) {
    setSizes((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function addSize() {
    setSizes((prev) => [...prev, { ...emptySize }]);
  }

  function removeSize(index) {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAddImages(e) {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [
      ...prev,
      ...files.map((file) => ({ id: crypto.randomUUID(), url: URL.createObjectURL(file), file })),
    ]);
    e.target.value = "";
  }

  async function handleRemoveImage(image) {
    if (!image.file) {
      if (!window.confirm("Excluir esta foto? Ela será removida do Supabase também.")) return;
      await deleteProductImage(image.url);
    }
    setImages((prev) => prev.filter((img) => img.id !== image.id));
  }

  async function uploadPendingImages() {
    const uploaded = [];
    for (const image of images) {
      uploaded.push(image.file ? await uploadProductImage(image.file) : image.url);
    }
    return uploaded;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setDuplicateProduct(null);

    const validSizes = sizes.filter(
      (s) => s.price && (s.sizeUnit === "unico" || s.sizeValue)
    );
    if (!validSizes.length) {
      setError("Adicione ao menos um tamanho com preço.");
      return;
    }

    const trimmedBrand = brand.trim().toLowerCase();
    let nameQuery = supabase.from("products").select("id, name, brand").ilike("name", name.trim());
    if (isEditing) nameQuery = nameQuery.neq("id", id);
    const { data: sameNameProducts, error: duplicateError } = await nameQuery;
    if (duplicateError) {
      setError(duplicateError.message);
      return;
    }
    const duplicate = (sameNameProducts ?? []).find((p) => {
      const existingBrand = (p.brand ?? "").trim().toLowerCase();
      return !existingBrand || !trimmedBrand || existingBrand === trimmedBrand;
    });
    if (duplicate) {
      setError("Já existe um produto cadastrado com esse nome e marca.");
      setDuplicateProduct(duplicate);
      return;
    }

    setIsSaving(true);
    try {
      const finalImages = await uploadPendingImages();

      const payload = {
        name,
        brand: brand.trim() || null,
        description,
        category,
        discount_label: discountLabel || null,
        sold_label: soldLabel || null,
        is_best_seller: isBestSeller,
        is_new_arrival: isNewArrival,
        image_url: finalImages[0] ?? null,
      };

      let productId = id;

      if (isEditing) {
        const { error: updateError } = await supabase.from("products").update(payload).eq("id", id);
        if (updateError) throw updateError;

        const { error: deleteSizesError } = await supabase
          .from("product_sizes")
          .delete()
          .eq("product_id", id);
        if (deleteSizesError) throw deleteSizesError;
      } else {
        const { data: inserted, error: insertError } = await supabase
          .from("products")
          .insert(payload)
          .select("id")
          .single();
        if (insertError) throw insertError;
        productId = inserted.id;
      }

      const sizeRows = validSizes.map((s, index) => ({
        product_id: productId,
        label: buildSizeLabel(s),
        price: Number(s.price),
        original_price: calcSavingsText(s.price, s.originalPrice) ? Number(s.originalPrice) : null,
        installments: calcInstallmentsText(s.price, s.installmentsCount),
        sort_order: index,
      }));
      const { error: sizesError } = await supabase.from("product_sizes").insert(sizeRows);
      if (sizesError) throw sizesError;

      await setProductImages(productId, finalImages);

      navigate("/admin/produtos");
    } catch (err) {
      if (err.code === "23505") {
        const { data: existing } = await supabase
          .from("products")
          .select("id, name")
          .ilike("name", name.trim())
          .neq("id", id ?? "")
          .limit(1)
          .maybeSingle();
        setError("Já existe um produto cadastrado com esse nome e marca.");
        setDuplicateProduct(existing ?? null);
      } else {
        setError(err.message || "Erro ao salvar produto.");
      }
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <p className="text-ink/60">Carregando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
      <h1 className="font-serif text-2xl">{isEditing ? "Editar produto" : "Novo produto"}</h1>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/70">Nome</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/70">Marca</label>
        <input
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/70">Descrição</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/70">Categoria</label>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white"
        >
          <option value="" disabled>
            Selecione...
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-ink/70">
          Fotos do produto {images.length > 1 && "(a primeira é a foto de capa)"}
        </label>
        {images.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-1">
            {images.map((image) => (
              <div key={image.id} className="relative">
                <img src={image.url} alt={name} className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image)}
                  aria-label="Excluir foto"
                  className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleAddImages}
          className="text-sm"
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-ink/70">Tamanhos e preços</label>
          <button
            type="button"
            onClick={addSize}
            className="flex items-center gap-1 text-sm text-rose hover:underline"
          >
            <Plus size={16} strokeWidth={1.5} />
            Adicionar tamanho
          </button>
        </div>

        {sizes.map((size, index) => {
          const installmentsPreview = calcInstallmentsText(size.price, size.installmentsCount);
          const savingsPreview = calcSavingsText(size.price, size.originalPrice);
          return (
            <div key={index} className="flex flex-col gap-2 border border-cream rounded p-3">
              <div className="flex gap-2 items-center flex-wrap">
                <select
                  value={size.sizeUnit}
                  onChange={(e) => updateSize(index, "sizeUnit", e.target.value)}
                  className="border border-cream rounded px-2 py-2 outline-none focus:border-rose bg-white"
                >
                  <option value="ml">ML</option>
                  <option value="unico">Único</option>
                </select>
                {size.sizeUnit === "ml" && (
                  <div className="flex items-center border border-cream rounded bg-white overflow-hidden w-28">
                    <input
                      type="number"
                      min="1"
                      placeholder="Ex: 10"
                      value={size.sizeValue}
                      onChange={(e) => updateSize(index, "sizeValue", e.target.value)}
                      className="w-full px-3 py-2 outline-none"
                    />
                    <span className="px-2 text-sm text-ink-soft">ML</span>
                  </div>
                )}
                <input
                  type="number"
                  step="0.01"
                  placeholder="Preço"
                  value={size.price}
                  onChange={(e) => updateSize(index, "price", e.target.value)}
                  className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white w-28"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Preço antigo (opcional)"
                  value={size.originalPrice}
                  onChange={(e) => updateSize(index, "originalPrice", e.target.value)}
                  className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white w-40"
                />
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={size.installmentsCount}
                    onChange={(e) => updateSize(index, "installmentsCount", e.target.value)}
                    className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white w-16"
                  />
                  <span className="text-sm text-ink-soft">parcelas</span>
                </div>
                {sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="text-ink/40 hover:text-red-600 transition-colors ml-auto"
                  >
                    <Trash2 size={18} strokeWidth={1.5} />
                  </button>
                )}
              </div>
              <p className="text-xs text-ink-soft">
                {installmentsPreview
                  ? `Vai aparecer: "${installmentsPreview}"`
                  : "À vista, sem texto de parcelamento."}
              </p>
              {size.originalPrice && (
                <p className="text-xs text-ink-soft">
                  {savingsPreview
                    ? `Vai aparecer: preço antigo riscado + "${savingsPreview}"`
                    : "Preço antigo precisa ser maior que o preço atual para aparecer."}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/70">Selo (opcional, ex: "15% OFF", "NOVO")</label>
        <input
          value={discountLabel}
          onChange={(e) => setDiscountLabel(e.target.value)}
          className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/70">Texto de vendas (opcional, ex: "+150 vendidos")</label>
        <input
          value={soldLabel}
          onChange={(e) => setSoldLabel(e.target.value)}
          className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isBestSeller} onChange={(e) => setIsBestSeller(e.target.checked)} />
          Mais vendido
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isNewArrival} onChange={(e) => setIsNewArrival(e.target.checked)} />
          Novidade
        </label>
      </div>

      {error && (
        <div className="flex flex-col gap-2 bg-red-50 rounded px-3 py-2">
          <p className="text-sm text-red-600">{error}</p>
          {duplicateProduct && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-ink/80">{duplicateProduct.name}</span>
              <Link
                to={`/admin/produtos/${duplicateProduct.id}`}
                className="shrink-0 text-sm text-rose hover:underline"
              >
                Editar produto existente
              </Link>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="bg-rose text-white rounded px-5 py-2 text-sm hover:bg-rose/90 transition-colors disabled:opacity-60"
        >
          {isSaving ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin/produtos")}
          className="text-ink/60 text-sm hover:text-rose transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
