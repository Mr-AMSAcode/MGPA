import { useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Badge,
  IconButton,
  Avatar,
  Box,
  Typography,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { colors, spacing } from "../theme";
import { useAuthStore } from "../store/authStore";
import { PRIORITY_ALERTS } from "../data/mockDashboard";
import BurgerButton from "../components/BurgerButton";

/**
 * Barre supérieure de l'ossature principale (recherche, notifications, profil).
 *
 * @param {boolean} [showBurger] - true sur mobile/tablette : affiche le bouton
 *   burger qui ouvre la barre latérale (cf. MainLayout + useResponsiveNav).
 * @param {() => void} [onBurgerClick] - épingle/désépingle le menu au clic.
 * @param {object} [burgerHoverHandlers] - ouvre un aperçu du menu au survol.
 */
export default function Navbar({ showBurger, onBurgerClick, burgerHoverHandlers }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        height: spacing.navbarHeight,
        justifyContent: "center",
        backgroundColor: colors.neutral.surface,
        color: "text.primary",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Toolbar sx={{ height: "100%", gap: { xs: 1, md: 2 }, px: { xs: 1.5, md: 3 } }}>
        {showBurger && (
          <BurgerButton onClick={onBurgerClick} hoverHandlers={burgerHoverHandlers} color={colors.primary.main} />
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            backgroundColor: colors.neutral.background,
            borderRadius: `${spacing.radius.field}px`,
            px: 1.5,
            py: 0.75,
            flex: 1,
            maxWidth: 420,
          }}
        >
          <SearchOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
          <InputBase placeholder="Rechercher…" fullWidth sx={{ fontSize: 14, minWidth: 0 }} />
        </Box>

        <Box sx={{ flex: 1 }} />

        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Badge badgeContent={PRIORITY_ALERTS.length} color="error">
            <NotificationsOutlinedIcon sx={{ color: colors.primary.main }} />
          </Badge>
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {PRIORITY_ALERTS.map((a) => (
            <MenuItem key={a.id} onClick={() => setAnchorEl(null)} sx={{ fontSize: 13, maxWidth: 320, whiteSpace: "normal" }}>
              {a.message}
            </MenuItem>
          ))}
        </Menu>

        <Divider orientation="vertical" flexItem sx={{ my: 1.5 }} />

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ bgcolor: colors.secondary.main, color: colors.primary.dark, fontWeight: 700 }}>
            {user?.name?.[0] ?? "A"}
          </Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{user?.name}</Typography>
            <Typography sx={{ fontSize: 11, color: "text.secondary" }}>{user?.role}</Typography>
          </Box>
          <IconButton onClick={handleLogout} title="Déconnexion">
            <LogoutOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
