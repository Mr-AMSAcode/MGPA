import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import RequireAuth from "./routes/RequireAuth";
import Login from "./pages/Login";
import ClientLoginFlow from "./pages/client-auth/ClientLoginFlow";
import Accueil from "./pages/Accueil";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import VehicleList from "./pages/vehicles/VehicleList";
import VehicleDetail from "./pages/vehicles/VehicleDetail";
import ComingSoon from "./pages/ComingSoon";

/**
 * Arborescence des routes de l'application.
 *
 * Deux portails d'entrée distincts (cf. authStore.js) :
 *  - /login → /accueil (hub multi-société + modules, réservé à l'admin MGPA)
 *  - /connexion-client → société + code d'accès puis auth. personnelle → /dashboard
 * Depuis /accueil, un module ouvre /dashboard ou /vehicules (mise en page
 * autonome, chrome dédié) soit un module sous MainLayout (ossature avec barre
 * latérale des 16 modules, cf. layouts/navConfig.js).
 * Toutes les routes sauf /login et /connexion-client sont protégées par `RequireAuth`.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/connexion-client" element={<ClientLoginFlow />} />

      <Route
        path="/accueil"
        element={
          <RequireAuth>
            <Accueil />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <ClientDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/vehicules"
        element={
          <RequireAuth>
            <VehicleList />
          </RequireAuth>
        }
      />

      <Route
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="/accueil" replace />} />
        <Route path="/vehicules/:id" element={<VehicleDetail />} />
        <Route path="/module/:key" element={<ComingSoon />} />
      </Route>

      <Route path="*" element={<Navigate to="/accueil" replace />} />
    </Routes>
  );
}
