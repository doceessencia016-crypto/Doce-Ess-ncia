import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoading, isAuthenticated } = useAdminAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-ink/60">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
