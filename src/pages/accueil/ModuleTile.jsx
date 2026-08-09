import { Box, Typography } from "@mui/material";

/**
 * Tuile de module cliquable de l'écran d'accueil : icône, libellé et barre
 * de couleur posés directement sur le fond de la page (pas de carte). Le
 * fond est désormais une photo (flotte de véhicules, `acc.jpeg`) plutôt
 * qu'un aplat clair — libellé en blanc avec ombre portée pour rester lisible
 * quel que soit l'endroit de la photo derrière la tuile.
 */
export default function ModuleTile({ tile, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "14px",
        p: 1,
        transition: "transform 200ms ease",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box
        component="img"
        src={tile.icon}
        alt={tile.label}
        sx={{ width: "100%", height: 90, objectFit: "contain", filter: "drop-shadow(0 2px 6px rgba(0,0,0,.45))" }}
      />
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: 14,
          color: "#fff",
          letterSpacing: 0.3,
          mt: 0.5,
          textShadow: "0 1px 4px rgba(0,0,0,.65)",
        }}
      >
        {tile.label}
      </Typography>
      <Box sx={{ height: 4, width: "70%", borderRadius: 2, backgroundColor: tile.underline, mt: 1, mx: "auto", boxShadow: "0 1px 3px rgba(0,0,0,.4)" }} />
    </Box>
  );
}
