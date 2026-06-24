import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";

const NAV_ITEMS = [
  { to: "/admin/produtos", label: "Produtos" },
  { to: "/admin/categorias", label: "Categorias" },
  { to: "/admin/hero", label: "Fotos da Home" },
];

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-white border-b border-cream/70 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/admin/produtos" className="font-serif text-xl">
            Doce Essência — Admin
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-ink/70 hover:text-rose transition-colors"
          >
            <LogOut size={18} strokeWidth={1.5} />
            Sair
          </button>
        </div>
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-6 text-sm">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `pb-3 border-b-2 transition-colors ${
                  isActive ? "border-rose text-rose" : "border-transparent text-ink/60 hover:text-rose"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
