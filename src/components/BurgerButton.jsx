import { IconButton } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

/**
 * Bouton "burger" affiché uniquement sur petit/moyen écran (le composant
 * appelant décide de son rendu conditionnel via `isDesktop`). À combiner avec
 * `useResponsiveNav` : `onClick` épingle/désépingle le menu, `hoverHandlers`
 * ouvre un aperçu au survol.
 */
export default function BurgerButton({ onClick, hoverHandlers, color = "inherit", sx }) {
  return (
    <IconButton onClick={onClick} {...hoverHandlers} sx={sx} aria-label="Ouvrir le menu">
      <MenuOutlinedIcon sx={{ color }} />
    </IconButton>
  );
}
