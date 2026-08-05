import { Box, Typography } from "@mui/material";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { colors } from "../../theme";

const MINI_NAV = [
  { key: "vue", label: "Vue d'ensemble", icon: DashboardOutlinedIcon },
  { key: "clients", label: "Clients", icon: GroupOutlinedIcon },
  { key: "vehicules", label: "Véhicules", icon: DirectionsCarOutlinedIcon },
  { key: "entretiens", label: "Entretiens", icon: BuildOutlinedIcon },
  { key: "reparations", label: "Réparations", icon: HandymanOutlinedIcon },
  { key: "carburant", label: "Carburant", icon: LocalGasStationOutlinedIcon },
  { key: "alertes", label: "Alertes", icon: NotificationsOutlinedIcon },
  { key: "rapports", label: "Rapports", icon: AssessmentOutlinedIcon },
  { key: "parametres", label: "Paramètres", icon: SettingsOutlinedIcon },
];

/**
 * Contenu de la mini-navigation du tableau de bord client (onglets internes
 * "Vue d'ensemble", "Clients", etc. — reproduction du mockup `dashboard_app`).
 * Composant présentationnel : le conteneur responsive vient de `ResponsiveDrawer`.
 *
 * @param {string} active - clé de l'onglet actif.
 * @param {(key: string) => void} onSelect - change l'onglet actif.
 * @param {() => void} [onNavigate] - appelé après une sélection, pour refermer
 *   le tiroir mobile.
 */
export default function MiniSidebar({ active, onSelect, onNavigate }) {
  return (
    <>
      <Box sx={{ py: 1 }}>
        {MINI_NAV.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <Box
              key={item.key}
              onClick={() => {
                onSelect(item.key);
                onNavigate?.();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1.1,
                mx: 1,
                mb: 0.5,
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: isActive ? colors.sidebar.activeBackground : "transparent",
                color: isActive ? colors.sidebar.activeText : colors.sidebar.text,
                "&:hover": { backgroundColor: isActive ? colors.sidebar.activeBackground : "rgba(255,255,255,0.08)" },
              }}
            >
              <Icon sx={{ fontSize: 18, color: isActive ? colors.sidebar.activeText : colors.sidebar.icon }} />
              <Typography sx={{ fontSize: 12.5, fontWeight: isActive ? 700 : 500 }}>{item.label}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ mt: "auto", p: 2, color: "rgba(255,255,255,0.75)" }}>
        <Typography sx={{ fontSize: 10.5 }}>Dernière mise à jour</Typography>
        <Typography sx={{ fontSize: 11, fontWeight: 600, color: "#fff", mb: 1 }}>31/05/2026 08:30</Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: 11,
            color: colors.sidebar.icon,
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          <RefreshOutlinedIcon sx={{ fontSize: 14 }} />
          Actualiser
        </Box>
      </Box>
    </>
  );
}
