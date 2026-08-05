import { Paper, Box, Typography } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import { colors, spacing } from "../theme";

/**
 * Carte KPI générique réutilisable (icône, valeur, libellé, variation
 * optionnelle avec flèche verte/rouge). Cf. charte graphique §8 "Cartes KPI".
 */
export default function KpiCard({ icon: Icon, label, value, unit, variation }) {
  const isPositive = variation?.startsWith("+");

  return (
    <Paper
      sx={{
        p: 2.5,
        boxShadow: spacing.shadow.card,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            backgroundColor: colors.primary.light,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon fontSize="small" sx={{ color: colors.primary.main }} />
        </Box>
        {variation && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.3,
              color: isPositive ? colors.success.main : colors.error.main,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {isPositive ? <TrendingUpOutlinedIcon sx={{ fontSize: 14 }} /> : <TrendingDownOutlinedIcon sx={{ fontSize: 14 }} />}
            {variation}
          </Box>
        )}
      </Box>
      <Typography className="kpi-value" sx={{ fontSize: 26, lineHeight: 1.1 }}>
        {value}
        {unit && (
          <Typography component="span" sx={{ fontSize: 13, fontWeight: 500, color: "text.secondary", ml: 0.5 }}>
            {unit}
          </Typography>
        )}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Paper>
  );
}
