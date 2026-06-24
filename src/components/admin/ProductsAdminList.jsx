import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { deleteAllImagesForProduct } from "../../lib/productImages";

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function lowestPrice(product) {
  const prices = (product.product_sizes ?? []).map((s) => Number(s.price));
  return prices.length ? Math.min(...prices) : null;
}

export default function ProductsAdminList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    const [{ data: productData }, { data: categoryData }] = await Promise.all([
      supabase
        .from("products")
        .select("*, product_sizes(*)")
        .order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("name"),
    ]);
    setProducts(productData ?? []);
    setCategories(categoryData ?? []);
    setIsLoading(false);
  }

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }

  async function toggleAvailability(product) {
    setTogglingId(product.id);
    const nextAvailable = !product.available;
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, available: nextAvailable } : p))
    );

    const { error } = await supabase
      .from("products")
      .update({ available: nextAvailable })
      .eq("id", product.id);

    setTogglingId(null);

    if (error) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, available: !nextAvailable } : p))
      );
      showToast("Erro ao atualizar produto.", "error");
      return;
    }

    showToast("Produto atualizado com sucesso!");
  }

  async function handleDelete(product) {
    if (!window.confirm(`Excluir "${product.name}"? Essa ação não pode ser desfeita.`)) return;

    await deleteAllImagesForProduct(product.id, product.image_url);

    const { error } = await supabase.from("products").delete().eq("id", product.id);
    if (error) {
      showToast("Erro ao excluir produto.", "error");
      return;
    }
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    showToast("Produto excluído com sucesso!");
  }

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !categoryFilter || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="font-serif text-2xl">Produtos</h1>
        <Link
          to="/admin/produtos/novo"
          className="flex items-center gap-2 bg-rose text-white rounded px-4 py-2 text-sm hover:bg-rose/90 transition-colors"
        >
          <Plus size={18} strokeWidth={1.5} />
          Novo produto
        </Link>
      </div>

      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-cream rounded pl-10 pr-3 py-2 outline-none focus:border-rose bg-white"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white"
        >
          <option value="">Todas as categorias</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p className="text-ink/60">Carregando produtos...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-ink/60">Nenhum produto encontrado.</p>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream/60 text-ink/70 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Preço a partir de</th>
                <th className="px-4 py-3">Disponível</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
                const price = lowestPrice(product);
                return (
                  <tr key={product.id} className="border-t border-cream/70">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>{product.name}</span>
                    </td>
                    <td className="px-4 py-3 text-ink/70">{product.category}</td>
                    <td className="px-4 py-3 text-ink/70">
                      {price != null ? currency.format(price) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        role="switch"
                        aria-checked={product.available}
                        disabled={togglingId === product.id}
                        onClick={() => toggleAvailability(product)}
                        className={`relative w-12 h-6 rounded-full transition-colors disabled:opacity-60 ${
                          product.available ? "bg-mint" : "bg-ink/20"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            product.available ? "translate-x-6" : ""
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 justify-end">
                        <Link
                          to={`/admin/produtos/${product.id}`}
                          className="text-ink/60 hover:text-rose transition-colors"
                          aria-label="Editar produto"
                        >
                          <Pencil size={18} strokeWidth={1.5} />
                        </Link>
                        <button
                          onClick={() => handleDelete(product)}
                          className="text-ink/60 hover:text-red-600 transition-colors"
                          aria-label="Excluir produto"
                        >
                          <Trash2 size={18} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg text-white text-sm ${
            toast.type === "error" ? "bg-red-600" : "bg-mint"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
