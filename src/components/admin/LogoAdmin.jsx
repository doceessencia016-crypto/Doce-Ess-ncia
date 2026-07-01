import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { fetchLogoUrl, saveLogoUrl, uploadLogo } from "../../lib/settings";
import { useLogo } from "../../context/LogoContext";

export default function LogoAdmin() {
  const { setLogoUrl } = useLogo();
  const [currentUrl, setCurrentUrl] = useState(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchLogoUrl().then((url) => {
      if (url) setCurrentUrl(url);
    });
  }, []);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    e.target.value = "";
  }

  async function handleSave() {
    if (!file) return;
    setIsSaving(true);
    try {
      const url = await uploadLogo(file);
      await saveLogoUrl(url);
      setCurrentUrl(url);
      setLogoUrl(url);
      setFile(null);
      setPreview(null);
      setToast({ message: "Logo atualizado com sucesso!", type: "success" });
    } catch (err) {
      setToast({ message: err.message || "Erro ao salvar logo.", type: "error" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setToast(null), 2500);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <h1 className="font-serif text-2xl">Logo do site</h1>

      <div className="flex flex-col gap-1">
        <p className="text-sm text-ink/70">Logo atual (cabeçalho e rodapé)</p>
        <div className="border border-cream rounded-lg p-4 bg-white flex items-center justify-center min-h-32">
          <img
            src={preview ?? currentUrl ?? ""}
            alt="Logo atual"
            className="max-h-28 w-auto object-contain"
          />
        </div>
        {preview && (
          <p className="text-xs text-ink/50">Pré-visualização do novo logo — ainda não salvo.</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 border border-cream rounded px-4 py-2 text-sm text-ink/70 hover:border-rose hover:text-rose transition-colors w-fit"
        >
          <Upload size={16} strokeWidth={1.5} />
          Escolher novo logo
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleFile}
          className="hidden"
        />
        {file && (
          <p className="text-xs text-ink/60">Arquivo: {file.name}</p>
        )}
      </div>

      {preview && (
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-rose text-white rounded px-5 py-2 text-sm hover:bg-rose/90 transition-colors disabled:opacity-60 w-fit"
        >
          {isSaving ? "Salvando..." : "Salvar novo logo"}
        </button>
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
