import { TextField, InputAdornment, Box } from "@mui/material";

/**
 * Champ de formulaire avec pastille icône dégradée à gauche, reproduisant le
 * style des champs "Nom de l'entreprise" / "Code d'accès" du mockup
 * `page _de_connexion.jpeg`. Fine surcouche de MUI TextField.
 */
export default function IconField({ icon: Icon, ...textFieldProps }) {
  return (
    <TextField
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #1E88E5, #1565C0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 0.5,
                }}
              >
                <Icon sx={{ color: "#fff", fontSize: 18 }} />
              </Box>
            </InputAdornment>
          ),
        },
      }}
      {...textFieldProps}
    />
  );
}
