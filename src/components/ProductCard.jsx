import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ImageCarousel from "./ImageCarousel";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  const goToProduct = () => navigate(`/produto/${product.id}`);

  function handleAddToCart(e) {
    e.stopPropagation();
    addItem(product, selectedSize, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div
      onClick={goToProduct}
      className="group bg-white rounded-2xl overflow-hidden border border-cream hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <ImageCarousel
          images={product.images}
          alt={product.name}
          imgClassName="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <span className="absolute top-3 left-3 bg-mint text-white text-xs font-sans font-semibold px-3 py-1 rounded-full">
            {product.discount}
          </span>
        )}
      </div>
      <div className="p-4 text-left flex flex-col flex-1">
        <p className="font-sans text-[11px] uppercase tracking-wide text-rose-dark">
          {product.category}
          {product.brand && ` | ${product.brand}`}
        </p>
        <h3 className="font-sans text-sm font-semibold text-ink mt-1 leading-snug">{product.name}</h3>

        <div className="flex gap-2 mt-3 min-h-[26px]">
          {product.sizes.length > 1 &&
            product.sizes.map((size) => (
              <button
                key={size.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`font-sans text-xs px-3 py-1 rounded-full border transition-colors ${
                  selectedSize.label === size.label
                    ? "bg-ink text-white border-ink"
                    : "bg-white text-ink-soft border-cream hover:border-rose"
                }`}
              >
                {size.label}
              </button>
            ))}
        </div>

        <div className="flex items-center gap-2 mt-3">
          {selectedSize.originalPrice > selectedSize.price && (
            <p className="font-sans text-sm text-ink-soft line-through">
              R$ {formatPrice(selectedSize.originalPrice)}
            </p>
          )}
          <p className="font-sans text-lg font-bold text-ink">R$ {formatPrice(selectedSize.price)}</p>
        </div>
        {selectedSize.originalPrice > selectedSize.price && (
          <p className="font-sans text-[11px] text-rose-dark font-semibold">
            R$ {formatPrice(selectedSize.originalPrice - selectedSize.price)} a menos
          </p>
        )}
        <p className="font-sans text-xs text-ink-soft">{selectedSize.installments}</p>
        <p className="font-sans text-[11px] text-mint mt-0.5">5% OFF no Pix em pedidos acima de R$200</p>
        <div className="mt-auto pt-3">
          <button
            onClick={handleAddToCart}
            className="w-full bg-rose text-white font-sans text-sm uppercase tracking-wide py-2 rounded-full hover:bg-rose-dark transition-colors"
          >
            {added ? "Adicionado ✓" : "Comprar"}
          </button>
        </div>
      </div>
    </div>
  );
}
