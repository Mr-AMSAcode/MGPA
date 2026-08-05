import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import { useResponsiveNav } from "../hooks/useResponsiveNav";
import { colors, spacing } from "../theme";

/**
 * Ossature de l'application (hors Login/Accueil/Dashboard client, qui ont
 * leur propre mise en page plein écran) : barre latérale des 16 modules +
 * barre supérieure + zone de contenu (`<Outlet/>`).
 *
 * La barre latérale est responsive : permanente sur grand écran, tiroir à
 * bouton burger (clic ou survol) sur mobile/tablette — cf. useResponsiveNav.
 */
export default function MainLayout() {
  const nav = useResponsiveNav();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: colors.neutral.background }}>
      <ResponsiveDrawer
        isDesktop={nav.isDesktop}
        open={nav.open}
        onClose={nav.close}
        width={spacing.sidebarWidth}
        bgcolor={colors.sidebar.background}
        hoverHandlers={nav.hoverHandlers}
      >
        <Sidebar onNavigate={nav.close} />
      </ResponsiveDrawer>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Navbar showBurger={!nav.isDesktop} onBurgerClick={nav.toggle} burgerHoverHandlers={nav.hoverHandlers} />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
