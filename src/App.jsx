import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { LogoProvider } from "./context/LogoContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const ProductPage = lazy(() => import("./components/ProductPage"));
const CategoryPage = lazy(() => import("./components/CategoryPage"));
const CartPage = lazy(() => import("./components/CartPage"));

const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const ProductsAdminList = lazy(() => import("./components/admin/ProductsAdminList"));
const ProductForm = lazy(() => import("./components/admin/ProductForm"));
const CategoriesAdminList = lazy(() => import("./components/admin/CategoriesAdminList"));
const CategoryForm = lazy(() => import("./components/admin/CategoryForm"));
const HeroImagesAdmin = lazy(() => import("./components/admin/HeroImagesAdmin"));
const LogoAdmin = lazy(() => import("./components/admin/LogoAdmin"));

function PublicLayout({ children }) {
  return (
    <div className="font-sans text-ink">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

function PageFallback() {
  return <div className="py-20 text-center text-ink-soft">Carregando...</div>;
}

function App() {
  return (
    <AdminAuthProvider>
      <LogoProvider>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/produto/:id" element={<PublicLayout><ProductPage /></PublicLayout>} />
          <Route path="/categoria/:name" element={<PublicLayout><CategoryPage /></PublicLayout>} />
          <Route path="/carrinho" element={<PublicLayout><CartPage /></PublicLayout>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<ProductsAdminList />} />
            <Route path="produtos" element={<ProductsAdminList />} />
            <Route path="produtos/novo" element={<ProductForm />} />
            <Route path="produtos/:id" element={<ProductForm />} />
            <Route path="categorias" element={<CategoriesAdminList />} />
            <Route path="categorias/nova" element={<CategoryForm />} />
            <Route path="categorias/:id" element={<CategoryForm />} />
            <Route path="hero" element={<HeroImagesAdmin />} />
            <Route path="logo" element={<LogoAdmin />} />
          </Route>
        </Routes>
      </Suspense>
      </LogoProvider>
    </AdminAuthProvider>
  );
}

export default App;
