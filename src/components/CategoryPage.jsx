import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { fetchProductsByCategory, getLowestPrice as lowestPrice } from "../lib/products";
import ProductCard from "./ProductCard";
import PriceFilterControls from "./PriceFilterControls";

export default function CategoryPage() {
  const { name } = useParams();
  const categoryName = decodeURIComponent(name);
  const [products, setProducts] = useState(undefined);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeBrand, setActiveBrand] = useState(null);

  useEffect(() => {
    setProducts(undefined);
    setShowFilters(false);
    setSortOrder("default");
    setMinPrice("");
    setMaxPrice("");
    setActiveBrand(null);
    fetchProductsByCategory(categoryName).then(setProducts);
  }, [categoryName]);

  const brands = useMemo(() => {
    if (!products) return [];
    return [...new Set(products.map((p) => p.brand).filter(Boolean))].sort();
  }, [products]);

  const visibleProducts = useMemo(() => {
    if (!products) return [];

    let result = activeBrand ? products.filter((p) => p.brand === activeBrand) : products;
    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;
    if (min != null || max != null) {
      result = result.filter((p) => {
        const price = lowestPrice(p);
        return (min == null || price >= min) && (max == null || price <= max);
      });
    }

    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => lowestPrice(a) - lowestPrice(b));
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => lowestPrice(b) - lowestPrice(a));
    }

    return result;
  }, [products, activeBrand, sortOrder, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav className="font-sans text-xs text-ink-soft mb-4">
        <Link to="/" className="hover:text-rose transition-colors">Início</Link>
        <span className="mx-2">›</span>
        <span className="text-ink">{categoryName}</span>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-light text-ink leading-tight">
          {categoryName}
        </h1>
        {products && products.length > 0 && (
          <button
            onClick={() => setShowFilters((v) => !v)}
            aria-label="Filtrar por preço"
            aria-expanded={showFilters}
            className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
              showFilters ? "bg-ink text-white border-ink" : "bg-white text-ink-soft border-cream hover:border-rose"
            }`}
          >
            <SlidersHorizontal size={14} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {products === undefined ? (
        <p className="text-ink-soft">Carregando...</p>
      ) : products.length === 0 ? (
        <p className="text-ink-soft">Nenhum produto disponível nessa categoria por enquanto.</p>
      ) : (
        <>
          {showFilters && (
            <div className="mb-8">
              <PriceFilterControls
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                brands={brands}
                activeBrand={activeBrand}
                setActiveBrand={setActiveBrand}
              />
            </div>
          )}

          {visibleProducts.length === 0 ? (
            <p className="text-ink-soft">Nenhum produto encontrado nessa faixa de preço.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {visibleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
