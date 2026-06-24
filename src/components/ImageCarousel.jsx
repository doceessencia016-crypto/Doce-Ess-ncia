import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_ADVANCE_MS = 4000;

export default function ImageCarousel({ images, alt, imgClassName, showDots = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [images, index]);

  if (images.length === 0) return null;

  function goTo(e, newIndex) {
    e.stopPropagation();
    setIndex((newIndex + images.length) % images.length);
  }

  return (
    <div className="relative">
      <img src={images[index]} alt={alt} className={imgClassName} />

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => goTo(e, index - 1)}
            aria-label="Imagem anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-ink rounded-full w-8 h-8 flex items-center justify-center shadow transition-colors"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => goTo(e, index + 1)}
            aria-label="Próxima imagem"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-ink rounded-full w-8 h-8 flex items-center justify-center shadow transition-colors"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>

          {showDots && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => goTo(e, i)}
                  aria-label={`Ir para imagem ${i + 1}`}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === index ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
