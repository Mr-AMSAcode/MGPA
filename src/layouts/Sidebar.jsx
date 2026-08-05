import { List, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "./navConfig";
import { colors, spacing } from "../theme";
import logo from "../assets/logo-mgpa.png";

/**
 * Contenu de la barre latérale principale (logo + navigation des 16 modules).
 * Composant purement présentationnel : le conteneur responsive (permanent vs
 * tiroir escamotable) est géré par `ResponsiveDrawer` dans MainLayout.jsx.
 *
 * @param {() => void} [onNavigate] - appelé après un clic sur un lien, pour
 *   refermer le tiroir mobile (sans effet sur grand écran où le menu reste ouvert).
 */
export default function Sidebar({ onNavigate }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    onNavigate?.();
  };

  return (
    <>
      <Box
        onClick={() => goTo("/accueil")}
        sx={{
          height: spacing.navbarHeight,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          px: 2.5,
          cursor: "pointer",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="MGPA"
          sx={{ width: 40, height: 40, objectFit: "contain", borderRadius: "8px" }}
        />
        <Box>
          <Typography sx={{ color: colors.sidebar.text, fontWeight: 700, lineHeight: 1.1 }}>MGPA</Typography>
          <Typography sx={{ color: colors.sidebar.icon, fontSize: 11, fontWeight: 600 }}>
            Votre Parc en un Clic
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 1.5, overflowY: "auto" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
          const Icon = item.icon;
          return (
            <ListItemButton
              key={item.key}
              selected={isActive}
              onClick={() => goTo(item.path)}
              sx={{
                borderRadius: `${spacing.radius.field}px`,
                mb: 0.5,
                color: colors.sidebar.text,
                opacity: item.implemented ? 1 : 0.65,
                "&.Mui-selected": {
                  backgroundColor: colors.sidebar.activeBackground,
                  color: colors.sidebar.activeText,
                  "& .MuiListItemIcon-root": { color: colors.sidebar.activeText },
                  "&:hover": { backgroundColor: colors.sidebar.activeBackground },
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: colors.sidebar.icon }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                slotProps={{ primary: { fontSize: 14, fontWeight: isActive ? 600 : 400 } }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </>
  );
}
