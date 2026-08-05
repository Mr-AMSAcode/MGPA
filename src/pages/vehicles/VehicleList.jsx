import { useMemo, useState } from "react";
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Button,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVehicles } from "../../hooks/useVehicles";
import PageHeader from "../../components/PageHeader";
import LoadingState from "../../components/LoadingState";
import StatusChip from "../../components/StatusChip";
import { spacing } from "../../theme";

const STATUTS = ["Tous", "Actif", "Maintenance", "Immobilisé"];

/**
 * Liste des véhicules du parc : recherche multicritère, filtre par statut,
 * pagination côté client (cf. cahier des charges §6 "Module véhicules").
 */
export default function VehicleList() {
  const { data: vehicles, isLoading } = useVehicles();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("Tous");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filtered = useMemo(() => {
    if (!vehicles) return [];
    return vehicles.filter((v) => {
      const matchesSearch =
        !search ||
        [v.immat, v.marque, v.modele].some((field) => field.toLowerCase().includes(search.toLowerCase()));
      const matchesStatut = statut === "Tous" || v.statut === statut;
      return matchesSearch && matchesStatut;
    });
  }, [vehicles, search, statut]);

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (isLoading) return <LoadingState />;

  return (
    <Box>
      <PageHeader
        title="Véhicules"
        subtitle={`${filtered.length} véhicule(s) sur ${vehicles.length} au total`}
        action={
          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            onClick={() => toast.info("Création de véhicule — à venir")}
          >
            Ajouter
          </Button>
        }
      />

      <Paper sx={{ boxShadow: spacing.shadow.card, overflow: "hidden" }}>
        <Box sx={{ p: 2.5, display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            placeholder="Rechercher (immatriculation, marque, modèle)…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            size="small"
            sx={{ flex: 1, minWidth: 260 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Statut</InputLabel>
            <Select
              label="Statut"
              value={statut}
              onChange={(e) => {
                setStatut(e.target.value);
                setPage(0);
              }}
            >
              {STATUTS.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: 640 }}>
            <TableHead>
              <TableRow>
                <TableCell>Immatriculation</TableCell>
                <TableCell>Marque / Modèle</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell align="right">Kilométrage</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((v) => (
                <TableRow key={v.id}>
                  <TableCell sx={{ fontWeight: 600 }}>{v.immat}</TableCell>
                  <TableCell>
                    {v.marque} {v.modele}
                  </TableCell>
                  <TableCell>{v.categorie}</TableCell>
                  <TableCell>
                    <StatusChip status={v.statut} />
                  </TableCell>
                  <TableCell align="right">{v.km.toLocaleString("fr-FR")} km</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => navigate(`/vehicules/${v.id}`)}>
                      <VisibilityOutlinedIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4, color: "text.secondary" }}>
                    Aucun véhicule ne correspond à ces critères.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Lignes par page"
        />
      </Paper>
    </Box>
  );
}
