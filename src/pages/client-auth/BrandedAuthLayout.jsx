import { Box, Typography } from "@mui/material";
import logo from "../../assets/logo-mgpa.png";

const CLOUD_SX = {
  position: "absolute",
  borderRadius: "50%",
  background: "rgba(255,255,255,0.55)",
  filter: "blur(6px)",
  pointerEvents: "none",
};

/**
 * Habillage commun des écrans du portail client (`/connexion-client`) : fond
 * dégradé bleu ciel avec nuages décoratifs, en-tête MGPA (logo + titre +
 * slogan manuscrit) et une carte centrale (`children`). Reproduction fidèle
 * du mockup `page _de_connexion.jpeg` fourni par le client (couleurs et
 * dispositions vérifiées directement sur l'image, cf. mémoire projet).
 */
export default function BrandedAuthLayout({ children }) {
  return (
    <Box
      sx={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 50% 0%, #8ECBF5 0%, #4FA8E8 45%, #1E70C7 100%)",
        px: 2,
        py: 1.5,
      }}
    >
      {/* Nuages décoratifs */}
      <Box sx={{ ...CLOUD_SX, top: "6%", left: "4%", width: 90, height: 40 }} />
      <Box sx={{ ...CLOUD_SX, top: "4%", left: "10%", width: 60, height: 30 }} />
      <Box sx={{ ...CLOUD_SX, top: "14%", right: "6%", width: 110, height: 46 }} />
      <Box sx={{ ...CLOUD_SX, top: "22%", right: "14%", width: 60, height: 28 }} />
      <Box sx={{ ...CLOUD_SX, top: "40%", left: "2%", width: 70, height: 32, opacity: 0.4 }} />

      {/* Vague décorative dorée/bleue en bas */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: { xs: 50, md: 70 },
          background: "linear-gradient(90deg, #FFC107 0%, #1565C0 15%, #0D47A1 50%, #1565C0 85%, #FFC107 100%)",
          opacity: 0.85,
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          transform: "scaleX(1.4)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, textAlign: "center", mb: 1, maxWidth: 560, flexShrink: 0 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: 15, md: 20 },
            lineHeight: 1.15,
            background: "linear-gradient(90deg, #FFC107, #FFF59D, #FFC107)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: 0.5,
          }}
        >
          MAINTENANCE ET GESTION DES PARCS AUTOMOBILES
        </Typography>
        <Box component="img" src={logo} alt="MGPA" sx={{ width: { xs: 90, md: 120 }, my: 0.5 }} />
        <Typography sx={{ fontFamily: "'Permanent Marker', cursive", color: "#4A3728", fontSize: { xs: 15, md: 18 } }}>
          Votre Parc en un Clic
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          overflow: "auto",
          minHeight: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
