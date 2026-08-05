import { Box, Drawer } from "@mui/material";

/**
 * Panneau latéral responsive générique : bloc normal (dans le flux de la
 * page) sur grand écran, ou tiroir flottant par-dessus le contenu (ouverture
 * au clic/survol, piloté par `useResponsiveNav`) sur petit/moyen écran.
 *
 * Sur grand écran on rend un <Box> classique plutôt que le variant MUI
 * `permanent` du Drawer : ce variant se positionne toujours en `fixed` depuis
 * le haut de la fenêtre, ce qui passe au-dessus de tout en-tête placé
 * au-dessus de la barre latérale dans le DOM (cas de l'Accueil et du tableau
 * de bord client, qui ont un bandeau d'en-tête avant la ligne
 * sidebar+contenu). Le <Box> reste dans le flux normal et n'a donc pas ce
 * problème, tout en gardant un rendu identique.
 */
export default function ResponsiveDrawer({ isDesktop, open, onClose, width, bgcolor, hoverHandlers, children }) {
  if (isDesktop) {
    return (
      <Box sx={{ width, flexShrink: 0, background: bgcolor, display: "flex", flexDirection: "column" }}>
        {children}
      </Box>
    );
  }

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      slotProps={{
        paper: {
          sx: { width, boxSizing: "border-box", background: bgcolor, borderRight: "none" },
          ...hoverHandlers,
        },
      }}
    >
      {children}
    </Drawer>
  );
}
