import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCategoryById, createCategory, updateCategory } from "../../lib/categories";

export default function CategoryForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditing) return;
    fetchCategoryById(id).then((data) => {
      if (!data) {
        setError("Categoria não encontrada.");
        setIsLoading(false);
        return;
      }
      setName(data.name);
      setIsLoading(false);
    });
  }, [id, isEditing]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSaving(true);
    try {
      if (isEditing) {
        await updateCategory(id, { name });
      } else {
        await createCategory({ name });
      }
      navigate("/admin/categorias");
    } catch (err) {
      setError(err.message || "Erro ao salvar categoria.");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <p className="text-ink/60">Carregando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md">
      <h1 className="font-serif text-2xl">{isEditing ? "Editar categoria" : "Nova categoria"}</h1>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/70">Nome</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-cream rounded px-3 py-2 outline-none focus:border-rose bg-white"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

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
          onClick={() => navigate("/admin/categorias")}
          className="text-ink/60 text-sm hover:text-rose transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
