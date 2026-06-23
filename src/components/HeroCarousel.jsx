import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = Object.values(
  import.meta.glob("../assets/hero/*.{jpg,jpeg,png,webp}", { eager: true, import: "default" })
);

const AUTO_ADVANCE_MS = 4000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [index]);

  if (images.length === 0) return null;

  const goTo = (newIndex) => setIndex((newIndex + images.length) % images.length);

  return (
    <div className="relative">
      <img
        src={images[index]}
        alt={`Doce Essência ${index + 1}`}
        className="rounded-2xl shadow-xl aspect-[3/4] h-[50vh] sm:h-[58vh] lg:h-[68vh] w-auto object-cover"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Imagem anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-ink rounded-full w-9 h-9 flex items-center justify-center shadow transition-colors"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Próxima imagem"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-ink rounded-full w-9 h-9 flex items-center justify-center shadow transition-colors"
          >
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Ir para imagem ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
