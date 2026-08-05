import { Box, Typography, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import { NAV_ITEMS } from "../layouts/navConfig";
import { colors, spacing } from "../theme";

/**
 * Écran "bientôt disponible" affiché pour tout module listé dans navConfig.js
 * avec `implemented: false`. Évite les liens morts tant que le module n'est
 * pas développé, tout en montrant l'architecture complète des écrans.
 */
export default function ComingSoon() {
  const { key } = useParams();
  const item = NAV_ITEMS.find((n) => n.key === key);

  return (
    <Paper
      sx={{
        p: 6,
        textAlign: "center",
        boxShadow: spacing.shadow.card,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: colors.primary.light,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ConstructionOutlinedIcon sx={{ color: colors.primary.main, fontSize: 32 }} />
      </Box>
      <Typography variant="h6">{item?.label ?? "Module"}</Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
        Ce module fait partie de l'architecture des écrans MGPA et sera développé dans une prochaine
        itération, une fois le module Véhicules et le tableau de bord validés.
      </Typography>
    </Paper>
  );
}
