import { Box, Typography, Avatar } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import { colors, spacing } from "../../theme";

const KPI_ICONS = {
  people: GroupsOutlinedIcon,
  car: DirectionsCarFilledOutlinedIcon,
};

/** Carte KPI compacte (icône + valeur + sous-texte) de la ligne d'indicateurs du tableau de bord client. */
export default function ClientKpiTile({ kpi }) {
  const Icon = KPI_ICONS[kpi.type];
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: `${spacing.radius.card}px`,
        boxShadow: spacing.shadow.card,
        p: 1.75,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
      }}
    >
      <Avatar sx={{ bgcolor: colors[kpi.color]?.main ?? colors.primary.main, width: 40, height: 40, flexShrink: 0 }}>
        <Icon sx={{ fontSize: 20 }} />
      </Avatar>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: 11, color: "text.secondary", fontWeight: 600 }}>{kpi.label}</Typography>
        <Typography className="kpi-value" sx={{ fontSize: 20, lineHeight: 1.2, color: colors.primary.dark }}>
          {kpi.value}
        </Typography>
        <Typography sx={{ fontSize: 10, color: "text.secondary" }}>{kpi.sub}</Typography>
      </Box>
    </Box>
  );
}
