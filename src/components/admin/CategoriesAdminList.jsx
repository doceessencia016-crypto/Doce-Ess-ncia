import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { fetchCategories, deleteCategory } from "../../lib/categories";

export default function CategoriesAdminList() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setIsLoading(true);
    setCategories(await fetchCategories());
    setIsLoading(false);
  }

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }

  async function handleDelete(category) {
    if (!window.confirm(`Excluir a categoria "${category.name}"?`)) return;
    try {
      await deleteCategory(category.id);
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
      showToast("Categoria excluída com sucesso!");
    } catch (err) {
      showToast(err.message || "Erro ao excluir categoria.", "error");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="font-serif text-2xl">Categorias</h1>
        <Link
          to="/admin/categorias/nova"
          className="flex items-center gap-2 bg-rose text-white rounded px-4 py-2 text-sm hover:bg-rose/90 transition-colors"
        >
          <Plus size={18} strokeWidth={1.5} />
          Nova categoria
        </Link>
      </div>

      {isLoading ? (
        <p className="text-ink/60">Carregando...</p>
      ) : categories.length === 0 ? (
        <p className="text-ink/60">Nenhuma categoria cadastrada.</p>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream/60 text-ink/70 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t border-cream/70">
                  <td className="px-4 py-3">{category.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        to={`/admin/categorias/${category.id}`}
                        className="text-ink/60 hover:text-rose transition-colors"
                        aria-label="Editar categoria"
                      >
                        <Pencil size={18} strokeWidth={1.5} />
                      </Link>
                      <button
                        onClick={() => handleDelete(category)}
                        className="text-ink/60 hover:text-red-600 transition-colors"
                        aria-label="Excluir categoria"
                      >
                        <Trash2 size={18} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
