import { useState } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

/**
 * État partagé pour un menu latéral responsive, réutilisé par les 3 barres
 * latérales de l'app (Sidebar principale, sociétés clientes sur l'Accueil,
 * mini-navigation du tableau de bord client).
 *
 * - Écran "normal" (≥ breakpoint md, ~900px) : le menu reste en permanence visible.
 * - Écran plus petit (mobile/tablette) : le menu est caché derrière un bouton
 *   burger, et s'affiche au clic (reste ouvert = "épinglé") ou au survol du
 *   bouton/du panneau (aperçu temporaire qui se referme quand la souris sort).
 *
 * Usage : appeler une seule fois dans le composant de layout parent, puis
 * distribuer `isDesktop`/`open`/`toggle`/`close`/`hoverHandlers` aux deux
 * enfants concernés (le bouton burger et le <ResponsiveDrawer>).
 */
export function useResponsiveNav() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [pinned, setPinned] = useState(false);
  const [hovering, setHovering] = useState(false);

  const open = isDesktop || pinned || hovering;

  return {
    isDesktop,
    open,
    toggle: () => setPinned((p) => !p),
    close: () => {
      setPinned(false);
      setHovering(false);
    },
    hoverHandlers: {
      onMouseEnter: () => setHovering(true),
      onMouseLeave: () => setHovering(false),
    },
  };
}
