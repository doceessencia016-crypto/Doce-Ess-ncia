import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Lock, ShoppingBag } from "lucide-react";
import logo from "../assets/logo-transparent.png";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  "Perfumes de Nicho",
  "Perfumes Importados",
  "Perfumes Árabes",
  "Kiko Milano",
  "Victoria's Secret",
  "Bath & Body Works",
  "Produtos de Cabelo",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="bg-white border-b border-cream sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1 flex items-center justify-between gap-4">
        <button
          className="text-ink"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>

        <Link to="/" className="flex items-center">
          <img src={logo} alt="Doce Essência" className="h-24 sm:h-28 w-auto" />
        </Link>

        <div className="flex items-center gap-5 text-ink">
          <a href="/admin" aria-label="Login do administrador" title="Login do administrador" className="hover:text-rose transition-colors">
            <Lock size={20} strokeWidth={1.5} />
          </a>
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

      {menuOpen && (
        <nav className="flex flex-col gap-3 px-6 pb-4 font-sans text-sm uppercase tracking-wide text-ink">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="py-1 border-b border-cream/70 hover:text-rose transition-colors"
          >
            Início
          </Link>
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="py-1 border-b border-cream/70 hover:text-rose transition-colors">
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
