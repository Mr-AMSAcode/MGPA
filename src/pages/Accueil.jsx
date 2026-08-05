import { Box, Typography, IconButton, Badge, Avatar, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { MODULE_TILES } from "../data/mockAccueil";
import { useTenantStore } from "../store/tenantStore";
import { useAuthStore } from "../store/authStore";
import { PRIORITY_ALERTS } from "../data/mockDashboard";
import { useResponsiveNav } from "../hooks/useResponsiveNav";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import BurgerButton from "../components/BurgerButton";
import CompanySidebar from "./accueil/CompanySidebar";
import ModuleTile from "./accueil/ModuleTile";
import logo from "../assets/logo-mgpa.png";

/**
 * Écran d'accueil (hub) : sélection de la société cliente + accès aux
 * 16 modules MGPA. Reproduction fidèle du mockup d'origine `acceul_app.jpg`
 * (fond bleu marine dégradé, cartes blanches) — le client a testé une
 * variante plus claire avec bandeau photo (`new_acceuil.jpeg`) puis est
 * revenu sur cette version-ci, cf. mémoire projet. Mise en page autonome
 * (pas de MainLayout) car le mockup a son propre chrome.
 */
export default function Accueil() {
  const navigate = useNavigate();
  const { selectedCompany, selectCompany } = useTenantStore();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const nav = useResponsiveNav();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0D47A1 0%, #1565C0 35%, #1E88E5 65%, #64B5F6 100%)",
        display: "flex",
      }}
    >
      <ResponsiveDrawer
        isDesktop={nav.isDesktop}
        open={nav.open}
        onClose={nav.close}
        width={300}
        bgcolor="transparent"
        hoverHandlers={nav.hoverHandlers}
      >
        <CompanySidebar selectedCompany={selectedCompany} onSelect={selectCompany} onNavigate={nav.close} />
      </ResponsiveDrawer>

      {/* Contenu principal */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: { xs: 1, md: 2 }, p: { xs: 1.5, md: 2.5 } }}>
          {!nav.isDesktop && (
            <BurgerButton onClick={nav.toggle} hoverHandlers={nav.hoverHandlers} color="#fff" sx={{ mr: "auto" }} />
          )}

          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
              backgroundColor: "rgba(255,255,255,0.14)",
              borderRadius: "12px",
              px: 1.5,
              py: 0.75,
              cursor: "pointer",
            }}
          >
            <Avatar sx={{ bgcolor: "#FFC107", color: "#0D47A1", width: 32, height: 32, fontWeight: 700 }}>
              {user?.name?.[0] ?? "A"}
            </Avatar>
            <Box>
              <Typography sx={{ color: "#fff", fontSize: 13, fontWeight: 700, lineHeight: 1.1 }}>
                {user?.name ?? "Administrateur"}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>{user?.role ?? "Super Admin"}</Typography>
            </Box>
            <ExpandMoreOutlinedIcon sx={{ color: "#fff", fontSize: 18 }} />
          </Box>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ backgroundColor: "rgba(255,255,255,0.14)" }}>
            <Badge badgeContent={PRIORITY_ALERTS.length} color="error">
              <NotificationsOutlinedIcon sx={{ color: "#fff" }} />
            </Badge>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {PRIORITY_ALERTS.map((a) => (
              <MenuItem key={a.id} onClick={() => setAnchorEl(null)} sx={{ fontSize: 13, maxWidth: 320, whiteSpace: "normal" }}>
                {a.message}
              </MenuItem>
            ))}
          </Menu>

          <IconButton sx={{ display: { xs: "none", sm: "inline-flex" }, backgroundColor: "rgba(255,255,255,0.14)" }}>
            <Badge badgeContent={3} color="error">
              <MailOutlinedIcon sx={{ color: "#fff" }} />
            </Badge>
          </IconButton>

          <IconButton
            onClick={() => {
              logout();
              navigate("/login");
            }}
            sx={{ backgroundColor: "rgba(255,255,255,0.14)" }}
          >
            <LogoutOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 2, md: 3 },
            mb: 1,
            px: 2,
            flexWrap: "wrap",
          }}
        >
          <Box component="img" src={logo} alt="MGPA" sx={{ width: { xs: 150, sm: 200, md: 260 }, flexShrink: 0, display: "block" }} />
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: 16, sm: 20, md: 26 },
                lineHeight: 1.15,
                background: "linear-gradient(90deg, #FFC107, #FFF59D, #FFC107)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: 1,
              }}
            >
              MAINTENANCE ET GESTION
              <br />
              DES PARCS AUTOMOBILES
            </Typography>
            <Typography
              sx={{ fontFamily: "'Permanent Marker', cursive", color: "#fff", fontSize: { xs: 18, sm: 22, md: 28 }, mt: 0.5 }}
            >
              Votre Parc en un Clic
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
            gap: { xs: 2, md: 2.5 },
            p: { xs: 2, md: 4 },
            alignContent: "start",
          }}
        >
          {MODULE_TILES.map((tile) => (
            <ModuleTile key={tile.key} tile={tile} onClick={() => navigate(tile.path)} />
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            py: 2,
            color: "rgba(255,255,255,0.85)",
            fontSize: 13,
          }}
        >
          <ShieldOutlinedIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: 13 }}>© 2026 MGPA - Tous droits réservés</Typography>
        </Box>
      </Box>
    </Box>
  );
}
