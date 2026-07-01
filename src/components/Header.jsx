import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Lock, ShoppingBag, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLogo } from "../context/LogoContext";
import { fetchSearchableProducts } from "../lib/products";
import { fetchCategories } from "../lib/categories";
import { searchProducts } from "../lib/search";

export default function Header() {
  const { logoUrl } = useLogo();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if ((menuOpen || searchOpen) && allProducts.length === 0) {
      fetchSearchableProducts().then(setAllProducts);
    }
  }, [menuOpen, searchOpen, allProducts.length]);

  useEffect(() => {
    if (menuOpen && categories.length === 0) {
      fetchCategories().then(setCategories);
    }
  }, [menuOpen, categories.length]);

  const searchResults = searchProducts(allProducts, searchTerm);

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleSearch() {
    setMenuOpen(false);
    setSearchOpen((v) => !v);
    setSearchTerm("");
  }

  function toggleMenu() {
    setSearchOpen(false);
    setMenuOpen((v) => !v);
  }

  function goToProduct(id) {
    navigate(`/produto/${id}`);
    setSearchOpen(false);
    setSearchTerm("");
  }

  return (
    <header className="bg-white border-b border-cream sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 grid grid-cols-3 items-center gap-4">
        <button className="text-ink justify-self-start" onClick={toggleMenu} aria-label="Abrir menu">
          <Menu size={24} strokeWidth={1.5} />
        </button>

        <Link to="/" className="flex items-center justify-self-center">
          <img src={logoUrl} alt="Doce Essência" className="h-24 sm:h-28 w-auto" />
        </Link>

        <div className="flex items-center gap-5 text-ink justify-self-end">
          <button onClick={toggleSearch} aria-label="Buscar produto" className="hover:text-rose transition-colors">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link to="/admin" aria-label="Login do administrador" title="Login do administrador" className="hover:text-rose transition-colors">
            <Lock size={20} strokeWidth={1.5} />
          </Link>
          <Link to="/carrinho" aria-label="Carrinho" className="relative hover:text-rose transition-colors">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {searchOpen && (
        <div className="px-6 pb-4">
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
            <input
              type="text"
              autoFocus
              placeholder="Buscar perfume pelo nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-cream rounded-full pl-9 pr-3 py-2 text-sm outline-none focus:border-rose bg-white"
            />

            {searchResults.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border border-cream rounded shadow-lg max-h-72 overflow-y-auto z-10">
                {searchResults.map((product) => (
                  <li key={product.id}>
                    <button
                      onClick={() => goToProduct(product.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-cream/50 transition-colors"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm text-ink">{product.name}</p>
                        <p className="text-xs text-ink-soft">{product.category}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <nav className="flex flex-col gap-3 px-6 pb-4 font-sans text-sm uppercase tracking-wide text-ink">
          <Link
            to="/"
            onClick={closeMenu}
            className="py-1 border-b border-cream/70 hover:text-rose transition-colors"
          >
            Início
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categoria/${encodeURIComponent(category.name)}`}
              onClick={closeMenu}
              className="py-1 border-b border-cream/70 hover:text-rose transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
