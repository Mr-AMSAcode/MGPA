import { Box, Typography } from "@mui/material";

/** En-tête de page standard (titre + sous-titre + zone d'action, ex. bouton "Ajouter"). */
export default function PageHeader({ title, subtitle, action }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
      <Box>
        <Typography variant="h5">{title}</Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>
      {action}
    </Box>
  );
}
