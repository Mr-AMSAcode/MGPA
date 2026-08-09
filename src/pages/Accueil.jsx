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
import fleetHero from "../assets/backgrounds/fleet-hero.jpeg";
import { colors } from "../theme";

const MODULE_ROWS = [MODULE_TILES.slice(0, 4), MODULE_TILES.slice(4, 8), MODULE_TILES.slice(8, 12)];

const HEADER_ICON_BTN_SX = {
  backgroundColor: "#fff",
  boxShadow: "0 2px 8px rgba(21,101,192,.18)",
  "&:hover": { backgroundColor: "#fff" },
};

/**
 * Écran d'accueil (hub) : sélection de la société cliente + accès aux
 * 12 modules MGPA. Fond plein écran = image fournie par le client
 * (`acc.jpeg`, flotte de véhicules autour d'un globe connecté), un seul
 * exemplaire en cover (pas de répétition) avec un voile bleu marine dégradé
 * par-dessus pour garder le texte et les icônes lisibles. Icônes posées
 * directement sur le fond (sans carte), vague bleue en pied de page. Mise
 * en page autonome (pas de MainLayout) car l'écran a son propre chrome.
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
        background: "linear-gradient(180deg, #5CC5FE 0%, #BFE3FB 45%, #EAF6FF 100%)",
        display: "flex",
        overflowX: "hidden",
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

      {/* Contenu principal — l'image ne démarre qu'ici pour ne pas passer derrière la barre latérale */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          backgroundImage: `linear-gradient(180deg, rgba(92,197,254,0.45) 0%, rgba(191,227,251,0.6) 55%, rgba(234,246,255,0.8) 100%), url(${fleetHero})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", p: { xs: 1.5, md: 2.5 } }}>
          {!nav.isDesktop ? (
            <BurgerButton onClick={nav.toggle} hoverHandlers={nav.hoverHandlers} color={colors.primary.dark} />
          ) : (
            <Box />
          )}

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 1,
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(21,101,192,.18)",
              borderRadius: "12px",
              px: 1.5,
              py: 0.75,
              cursor: "pointer",
            }}
          >
            <Avatar sx={{ bgcolor: colors.primary.main, color: "#fff", width: 32, height: 32, fontWeight: 700 }}>
              {user?.name?.[0] ?? "A"}
            </Avatar>
            <Box>
              <Typography sx={{ color: colors.primary.dark, fontSize: 13, fontWeight: 700, lineHeight: 1.1 }}>
                {user?.name ?? "Administrateur"}
              </Typography>
              <Typography sx={{ color: "text.secondary", fontSize: 11 }}>{user?.role ?? "Super Admin"}</Typography>
            </Box>
            <ExpandMoreOutlinedIcon sx={{ color: colors.primary.dark, fontSize: 18 }} />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={HEADER_ICON_BTN_SX}>
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

            <IconButton sx={{ display: { xs: "none", sm: "inline-flex" }, ...HEADER_ICON_BTN_SX }}>
              <Badge badgeContent={3} color="error">
                <MailOutlinedIcon sx={{ color: colors.primary.main }} />
              </Badge>
            </IconButton>

            <IconButton
              onClick={() => {
                logout();
                navigate("/login");
              }}
              sx={HEADER_ICON_BTN_SX}
            >
              <LogoutOutlinedIcon sx={{ color: colors.primary.main }} />
            </IconButton>
          </Box>
          </Box>
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
              sx={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontStyle: "italic",
                color: "#000",
                fontSize: { xs: 18, sm: 22, md: 30 },
                mt: 0.5,
              }}
            >
              Votre Parc en un Clic
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, md: 1 },
            px: { xs: 2, md: 4 },
            py: { xs: 1, md: 2 },
          }}
        >
          {MODULE_ROWS.map((row, i) => (
            <Box key={i} sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", py: 1.5 }}>
              {row.map((tile) => (
                <Box key={tile.key} sx={{ width: { xs: "45%", sm: "22%" } }}>
                  <ModuleTile tile={tile} onClick={() => navigate(tile.path)} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>

        <Box sx={{ position: "relative", mt: { xs: 2, md: 3 }, overflow: "hidden" }}>
          <Box
            sx={{
              height: { xs: 46, md: 60 },
              background: `linear-gradient(90deg, ${colors.primary.main} 0%, ${colors.primary.dark} 50%, ${colors.primary.main} 100%)`,
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
              transform: "scaleX(1.4)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              color: "#fff",
              fontSize: 13,
            }}
          >
            <ShieldOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography sx={{ fontSize: 13 }}>© 2026 MGPA - Tous droits réservés</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
