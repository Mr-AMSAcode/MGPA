import { Box, Typography } from "@mui/material";

/**
 * Tuile de module cliquable de l'écran d'accueil : icône, libellé et barre
 * de couleur sur une carte "vitre" (glassmorphism) plutôt qu'un fond blanc
 * opaque, cf. mémoire projet. Le texte est en blanc (avec ombre portée pour
 * rester lisible) car le fond translucide laisse deviner le dégradé bleu
 * marine de la page derrière la carte.
 */
export default function ModuleTile({ tile, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        background: "rgba(255,255,255,0.16)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.35)",
        borderRadius: "18px",
        p: 2,
        pb: 1.5,
        textAlign: "center",
        cursor: "pointer",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
        transition: "transform 200ms ease, box-shadow 200ms ease, background 200ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          background: "rgba(255,255,255,0.28)",
          boxShadow: "0 16px 36px rgba(0,0,0,.3)",
        },
      }}
    >
      <Box component="img" src={tile.icon} alt={tile.label} sx={{ width: "100%", height: 90, objectFit: "contain" }} />
      <Typography
        sx={{
          fontWeight: 800,
          fontSize: 14,
          color: "#fff",
          letterSpacing: 0.3,
          mt: 0.5,
          textShadow: "0 1px 3px rgba(0,0,0,.4)",
        }}
      >
        {tile.label}
      </Typography>
      <Box sx={{ height: 4, borderRadius: 2, backgroundColor: tile.underline, mt: 1 }} />
    </Box>
  );
}
