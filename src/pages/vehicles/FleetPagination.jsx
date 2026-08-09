import { Box, IconButton, Select, MenuItem, Typography } from "@mui/material";
import FirstPageOutlinedIcon from "@mui/icons-material/FirstPageOutlined";
import LastPageOutlinedIcon from "@mui/icons-material/LastPageOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { colors } from "../../theme";

/** Numéros de page à afficher : toujours 1 et la dernière page, un voisinage autour de la page active, "…" ailleurs. */
function pageList(page, pageCount) {
  const pages = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== "…") pages.push("…");
  }
  return pages;
}

/**
 * Pied de tableau du listing véhicules : sélecteur "lignes par page" +
 * boutons de pagination numérotés + compteur, reproduction du mockup
 * `vehicule.jpg` (plus riche que le `TablePagination` MUI par défaut).
 */
export default function FleetPagination({ page, pageCount, rowsPerPage, onRowsPerPageChange, onPageChange, rangeStart, rangeEnd, total }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        px: 2,
        py: 1.5,
        borderTop: "1px solid #EEF1F5",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>Affichage :</Typography>
        <Select
          size="small"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          sx={{ fontSize: 13, height: 32 }}
        >
          {[12, 25, 50].map((n) => (
            <MenuItem key={n} value={n} sx={{ fontSize: 13 }}>
              {n}
            </MenuItem>
          ))}
        </Select>
        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>lignes par page</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton size="small" disabled={page === 1} onClick={() => onPageChange(1)}>
          <FirstPageOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" disabled={page === 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeftOutlinedIcon fontSize="small" />
        </IconButton>
        {pageList(page, pageCount).map((p, i) =>
          p === "…" ? (
            <Typography key={`e${i}`} sx={{ px: 0.5, color: "text.secondary", fontSize: 13 }}>
              …
            </Typography>
          ) : (
            <Box
              key={p}
              onClick={() => onPageChange(p)}
              sx={{
                width: 30,
                height: 30,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                backgroundColor: p === page ? colors.primary.main : "transparent",
                color: p === page ? "#fff" : colors.primary.dark,
                "&:hover": { backgroundColor: p === page ? colors.primary.main : colors.primary.light },
              }}
            >
              {p}
            </Box>
          )
        )}
        <IconButton size="small" disabled={page === pageCount} onClick={() => onPageChange(page + 1)}>
          <ChevronRightOutlinedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" disabled={page === pageCount} onClick={() => onPageChange(pageCount)}>
          <LastPageOutlinedIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
        {rangeStart} à {rangeEnd} sur {total} véhicules
      </Typography>
    </Box>
  );
}
