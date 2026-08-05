import { Box, Typography } from "@mui/material";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { colors } from "../../theme";

const BADGES = [
  { icon: ShieldOutlinedIcon, lines: ["GESTION", "OPTIMISÉE"] },
  { icon: HandymanOutlinedIcon, lines: ["MAINTENANCE", "EFFICACE"] },
  { icon: TrendingUpOutlinedIcon, lines: ["PERFORMANCE", "ASSURÉE"] },
];

/**
 * Badges de confiance affichés en dehors de la carte blanche du portail
 * d'authentification (login admin et connexion client) : colonne latérale
 * à côté de la carte sur desktop, rangée horizontale en dessous sur mobile.
 */
export default function TrustBadges() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        flexWrap: "wrap",
        gap: 1.25,
        justifyContent: "center",
      }}
    >
      {BADGES.map((b) => (
        <Box key={b.lines[0]} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 10px rgba(0,0,0,.12)",
            }}
          >
            <b.icon sx={{ fontSize: 16, color: colors.primary.main }} />
          </Box>
          <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
            {b.lines[0]}
            <br />
            {b.lines[1]}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
