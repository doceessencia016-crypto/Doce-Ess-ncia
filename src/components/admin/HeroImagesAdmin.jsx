import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Trash2, Upload } from "lucide-react";
import { fetchHeroImages, uploadHeroImage, deleteHeroImage, reorderHeroImages } from "../../lib/heroImages";

export default function HeroImagesAdmin() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    setIsLoading(true);
    setImages(await fetchHeroImages());
    setIsLoading(false);
  }

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      await uploadHeroImage(file);
      await loadImages();
      showToast("Foto adicionada com sucesso!");
    } catch (err) {
      showToast(err.message || "Erro ao enviar foto.", "error");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  }

  async function handleDelete(image) {
    if (!window.confirm("Excluir esta foto do carrossel? Ela será removida do Supabase também.")) return;
    try {
      await deleteHeroImage(image);
      setImages((prev) => prev.filter((img) => img.id !== image.id));
      showToast("Foto excluída com sucesso!");
    } catch (err) {
      showToast(err.message || "Erro ao excluir foto.", "error");
    }
  }

  async function handleMove(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const reordered = [...images];
    [reordered[index], reordered[targetIndex]] = [reordered[targetIndex], reordered[index]];
    setImages(reordered);
    await reorderHeroImages(reordered);
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="font-serif text-2xl">Fotos do Carrossel (Home)</h1>
        <label className="flex items-center gap-2 bg-rose text-white rounded px-4 py-2 text-sm hover:bg-rose/90 transition-colors cursor-pointer">
          <Upload size={18} strokeWidth={1.5} />
          {isUploading ? "Enviando..." : "Adicionar foto"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            disabled={isUploading}
            className="hidden"
          />
        </label>
      </div>

      {isLoading ? (
        <p className="text-ink/60">Carregando...</p>
      ) : images.length === 0 ? (
        <p className="text-ink/60">Nenhuma foto cadastrada ainda.</p>
      ) : (
        <ul className="bg-white rounded-lg shadow-sm divide-y divide-cream/70">
          {images.map((image, index) => (
            <li key={image.id} className="flex items-center gap-4 px-4 py-3">
              <img src={image.image_url} alt="" className="w-16 h-20 object-cover rounded" />
              <div className="flex-1" />
              <button
                onClick={() => handleMove(index, -1)}
                disabled={index === 0}
                className="text-ink/40 hover:text-rose transition-colors disabled:opacity-30"
                aria-label="Mover para cima"
              >
                <ArrowUp size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => handleMove(index, 1)}
                disabled={index === images.length - 1}
                className="text-ink/40 hover:text-rose transition-colors disabled:opacity-30"
                aria-label="Mover para baixo"
              >
                <ArrowDown size={18} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => handleDelete(image)}
                className="text-ink/40 hover:text-red-600 transition-colors"
                aria-label="Excluir foto"
              >
                <Trash2 size={18} strokeWidth={1.5} />
              </button>
            </li>
          ))}
        </ul>
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
