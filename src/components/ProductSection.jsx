import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import Eyebrow from "./Eyebrow";
import PriceFilterControls from "./PriceFilterControls";
import { getLowestPrice } from "../lib/products";

export default function ProductSection({ title, subtitle, products }) {
  const scrollRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = activeCategory
      ? products.filter((p) => p.category === activeCategory)
      : products;

    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;
    if (min != null || max != null) {
      result = result.filter((p) => {
        const price = getLowestPrice(p);
        return (min == null || price >= min) && (max == null || price <= max);
      });
    }

    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
    }

    return result;
  }, [products, activeCategory, sortOrder, minPrice, maxPrice]);

  function scrollByCard(direction) {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector("[data-card]");
    const cardWidth = card ? card.offsetWidth + 20 : container.clientWidth * 0.8;
    container.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="text-center mb-10">
        <Eyebrow>{subtitle}</Eyebrow>
        <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">{title}</h2>
      </div>

      <div className="flex items-center gap-2 mb-4 sm:justify-center">
        {categories.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto sm:flex-wrap sm:justify-center sm:overflow-visible pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 whitespace-nowrap font-sans text-xs uppercase tracking-wide px-4 py-1.5 rounded-full border transition-colors ${
                activeCategory === null
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-ink-soft border-cream hover:border-rose"
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 whitespace-nowrap font-sans text-xs uppercase tracking-wide px-4 py-1.5 rounded-full border transition-colors ${
                  activeCategory === category
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink-soft border-cream hover:border-rose"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setShowFilters((v) => !v)}
          aria-label="Filtrar por preço"
          aria-expanded={showFilters}
          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-colors ml-auto sm:ml-0 ${
            showFilters ? "bg-ink text-white border-ink" : "bg-white text-ink-soft border-cream hover:border-rose"
          }`}
        >
          <SlidersHorizontal size={14} strokeWidth={1.5} />
        </button>
      </div>

      {showFilters && (
        <div className="flex justify-center mb-8">
          <PriceFilterControls
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>
      )}

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              data-card
              className="snap-start shrink-0 w-[46%] sm:w-[32%] lg:w-[23%]"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {filteredProducts.length > 2 && (
          <>
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Produtos anteriores"
              className="flex items-center justify-center absolute left-1 sm:-left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-cream text-ink rounded-full w-9 h-9 sm:w-10 sm:h-10 shadow transition-colors"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Próximos produtos"
              className="flex items-center justify-center absolute right-1 sm:-right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-cream text-ink rounded-full w-9 h-9 sm:w-10 sm:h-10 shadow transition-colors"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
