import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

/**
 * Garde de route : redirige vers /login si l'utilisateur n'est pas
 * authentifié, en mémorisant la page demandée (`state.from`) pour y revenir
 * juste après la connexion (cf. src/pages/Login.jsx).
 */
export default function RequireAuth({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
