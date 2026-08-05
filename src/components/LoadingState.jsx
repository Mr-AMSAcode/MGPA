import { Box, CircularProgress } from "@mui/material";

/** Indicateur de chargement générique, affiché pendant qu'un hook React Query est en `isLoading`. */
export default function LoadingState() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
      <CircularProgress />
    </Box>
  );
}
