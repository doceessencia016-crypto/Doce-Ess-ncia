import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById, getSimilarProducts } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function ProductPage() {
  const { id } = useParams();
  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="font-sans text-ink-soft">Produto não encontrado.</p>
        <Link to="/" className="font-sans text-rose-dark underline mt-4 inline-block">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  const similar = getSimilarProducts(product);

  function handleAddToCart() {
    addItem(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <nav className="font-sans text-xs text-ink-soft mb-4">
        <Link to="/" className="hover:text-rose transition-colors">Início</Link>
        <span className="mx-2">›</span>
        <span className="text-ink">{product.category}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-[4/5] object-cover rounded-2xl"
        />

        <div className="text-left">
          <p className="font-sans text-xs text-ink-soft">{product.sold}</p>
          <h1 className="font-serif text-2xl sm:text-3xl font-light text-ink leading-tight mt-1">
            {product.name}
          </h1>

          <div className="mt-4">
            <p className="font-sans text-2xl font-bold text-ink">R$ {formatPrice(selectedSize.price)}</p>
            <p className="font-sans text-sm text-ink-soft mt-1">{selectedSize.installments}</p>
            <p className="font-sans text-xs text-mint mt-1">5% OFF no Pix em pedidos acima de R$200</p>
          </div>

          {product.sizes.length > 1 && (
            <div className="mt-5">
              <p className="font-sans text-xs uppercase tracking-wide text-ink-soft mb-2">Tamanho</p>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className={`font-sans text-sm px-4 py-1.5 rounded-full border transition-colors ${
                      selectedSize.label === size.label
                        ? "bg-ink text-white border-ink"
                        : "bg-white text-ink-soft border-cream hover:border-rose"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-cream rounded-full">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="w-9 h-9 flex items-center justify-center text-ink-soft hover:text-rose transition-colors"
              >
                −
              </button>
              <span className="w-8 text-center font-sans text-sm text-ink">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar quantidade"
                className="w-9 h-9 flex items-center justify-center text-ink-soft hover:text-rose transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-rose text-white font-sans text-sm uppercase tracking-wide py-3 rounded-full hover:bg-rose-dark transition-colors"
            >
              {added ? "Adicionado ✓" : "Comprar"}
            </button>
          </div>

          {added && (
            <button
              onClick={() => navigate("/carrinho")}
              className="mt-3 w-full text-center font-sans text-sm text-rose-dark underline hover:text-rose transition-colors"
            >
              Ver carrinho
            </button>
          )}

          <div className="mt-8 border border-cream rounded-2xl p-5">
            <h2 className="font-sans text-sm font-semibold text-ink mb-2">Sobre a Fragrância</h2>
            <p className="font-sans text-sm text-ink-soft leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink text-center mb-8">
            Produtos similares
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
