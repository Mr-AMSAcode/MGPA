import { Box, Typography, Badge } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import TireRepairOutlinedIcon from "@mui/icons-material/TireRepairOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuthStore } from "../../store/authStore";
import { colors } from "../../theme";

const NAV_ITEMS = [
  { key: "dashboard", label: "Tableau de bord", icon: DashboardOutlinedIcon, path: "/dashboard" },
  { key: "vehicules", label: "Parc automobile", icon: DirectionsCarFilledOutlinedIcon, path: "/vehicules" },
  { key: "maintenance", label: "Maintenance", icon: BuildOutlinedIcon, path: "/module/maintenance" },
  { key: "carburant", label: "Carburant", icon: LocalGasStationOutlinedIcon, path: "/module/carburant" },
  { key: "pneumatiques", label: "Pneumatiques", icon: TireRepairOutlinedIcon, path: "/module/pneumatiques" },
  { key: "assurances", label: "Assurances", icon: MarkEmailUnreadOutlinedIcon, path: "/module/assurances" },
  { key: "controles", label: "Contrôles", icon: FactCheckOutlinedIcon, path: "/module/controles" },
  { key: "couts", label: "Coûts", icon: PaidOutlinedIcon, path: "/module/couts" },
  { key: "magasin", label: "Magasin MPR", icon: Inventory2OutlinedIcon, path: "/module/magasin" },
  { key: "personnel", label: "Personnel", icon: GroupOutlinedIcon, path: "/module/personnel" },
  { key: "fournisseurs", label: "Fournisseurs", icon: LocalShippingOutlinedIcon, path: "/module/fournisseurs" },
  { key: "rapports", label: "Rapports", icon: AssessmentOutlinedIcon, path: "/module/rapports" },
  { key: "parametres", label: "Paramètres", icon: SettingsOutlinedIcon, path: "/module/parametres" },
  { key: "alertes", label: "Alertes", icon: NotificationsOutlinedIcon, path: "/module/alertes", badge: 8 },
  { key: "documents", label: "Documents", icon: DescriptionOutlinedIcon, path: "/module/documents" },
];

/**
 * Barre latérale dédiée au module Véhicules (reproduction fidèle du mockup
 * `vehicule.jpg`) : liste de navigation propre à ce module, distincte de la
 * barre latérale générique des 16 modules (Sidebar.jsx/MainLayout) — le
 * mockup a son propre chrome complet (en-tête + barre latérale), cf.
 * VehicleList.jsx.
 */
export default function FleetSidebar({ onNavigate }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const goTo = (path) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ py: 1, flex: 1, overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Box
              key={item.key}
              onClick={() => goTo(item.path)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                px: 2,
                py: 1.1,
                mx: 1,
                mb: 0.5,
                borderRadius: `${10}px`,
                cursor: "pointer",
                backgroundColor: isActive ? colors.sidebar.activeBackground : "transparent",
                color: isActive ? colors.sidebar.activeText : colors.sidebar.text,
                "&:hover": { backgroundColor: isActive ? colors.sidebar.activeBackground : "rgba(255,255,255,0.08)" },
              }}
            >
              <Icon sx={{ fontSize: 19, color: isActive ? colors.sidebar.activeText : colors.sidebar.icon }} />
              <Typography sx={{ fontSize: 13, fontWeight: isActive ? 700 : 600, flex: 1 }}>{item.label}</Typography>
              {item.badge != null && (
                <Badge badgeContent={item.badge} color="error" sx={{ "& .MuiBadge-badge": { position: "static", transform: "none" } }} />
              )}
            </Box>
          );
        })}
      </Box>

      <Box sx={{ p: 1.5 }}>
        <Box
          onClick={() => {
            logout();
            navigate("/login");
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            py: 1.1,
            borderRadius: "10px",
            cursor: "pointer",
            backgroundColor: colors.primary.main,
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            "&:hover": { opacity: 0.9 },
          }}
        >
          <LogoutOutlinedIcon sx={{ fontSize: 18 }} />
          Déconnexion
        </Box>
        <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 10.5, textAlign: "center", mt: 1.5 }}>
          © 2026 MGPA · Tous droits réservés
        </Typography>
      </Box>
    </Box>
  );
}
