import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
  Avatar,
  Badge,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVehicles } from "../../hooks/useVehicles";
import { useTenantStore } from "../../store/tenantStore";
import { useAuthStore } from "../../store/authStore";
import { useResponsiveNav } from "../../hooks/useResponsiveNav";
import ResponsiveDrawer from "../../components/ResponsiveDrawer";
import BurgerButton from "../../components/BurgerButton";
import LoadingState from "../../components/LoadingState";
import StatusChip from "../../components/StatusChip";
import FleetSidebar from "./FleetSidebar";
import FleetPagination from "./FleetPagination";
import BrandLogo, { ICON_BRANDS } from "./BrandLogo";
import { VEHICLE_STATUS } from "../../data/mockVehicles";
import { colors, spacing } from "../../theme";
import logo from "../../assets/logo-mgpa.png";
import towTruckIcon from "../../assets/vehicles/tow_truck.png";

const STATUTS = ["Tous", ...Object.values(VEHICLE_STATUS)];
const FLEET_SIDEBAR_WIDTH = 240;

const TOOLBAR_ACTIONS = [
  { key: "modifier", label: "Modifier", icon: EditOutlinedIcon, color: colors.primary.main },
  { key: "supprimer", label: "Supprimer", icon: DeleteOutlineOutlinedIcon, color: colors.error.main },
  { key: "enregistrer", label: "Enregistrer", icon: SaveOutlinedIcon, color: colors.success.main, filled: true },
  { key: "import", label: "Importer Excel", icon: FileUploadOutlinedIcon, color: colors.success.main },
  { key: "export", label: "Exporter Excel", icon: FileDownloadOutlinedIcon, color: colors.success.main },
  { key: "imprimer", label: "Imprimer", icon: PrintOutlinedIcon, color: colors.primary.main },
  { key: "pdf", label: "Exporter PDF", icon: PictureAsPdfOutlinedIcon, color: colors.error.main },
];

const COLUMNS = [
  { key: "item", label: "Item", render: (v, i) => i + 1 },
  { key: "immat", label: "Immatriculation", bold: true },
  { key: "nParc", label: "N° Parc" },
  {
    key: "marque",
    label: "Marque",
    render: (v) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        <BrandLogo marque={v.marque} />
        {ICON_BRANDS[v.marque] && <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>{v.marque}</Typography>}
      </Box>
    ),
  },
  { key: "type", label: "Type" },
  { key: "modele", label: "Modèle", bold: true },
  {
    key: "chassis",
    label: "N° Chassis / Date mise en circ.",
    render: (v) => (
      <>
        {v.nChassis}
        <br />
        <Typography component="span" sx={{ fontSize: 11, color: "text.secondary" }}>
          {new Date(v.dateMiseCirc).toLocaleDateString("fr-FR")}
        </Typography>
      </>
    ),
  },
  { key: "puissanceCV", label: "Puissance CV" },
  { key: "energie", label: "Energie" },
  {
    key: "photo",
    label: "Photo",
    render: (v) =>
      v.photo ? (
        <Box component="img" src={v.photo} alt={v.type} sx={{ width: 64, height: 36, objectFit: "contain" }} />
      ) : (
        <Avatar sx={{ width: 30, height: 30, bgcolor: colors.neutral.background }}>
          <DirectionsCarOutlinedIcon sx={{ fontSize: 18, color: colors.primary.main }} />
        </Avatar>
      ),
  },
  { key: "section", label: "Section" },
  { key: "famille", label: "Famille" },
  { key: "direction", label: "Direction" },
  { key: "departement", label: "Département" },
  { key: "service", label: "Service" },
  { key: "region", label: "Région" },
  { key: "agence", label: "Agence" },
  { key: "site", label: "Site" },
  { key: "utilisateur1", label: "Utilisateur 1" },
  { key: "utilisateur2", label: "Utilisateur 2" },
  { key: "utilisateur3", label: "Utilisateur 3" },
  { key: "statut", label: "Statut", render: (v) => <StatusChip status={v.statut} /> },
  {
    key: "dateReforme",
    label: "Date réforme",
    render: (v) => (v.dateReforme ? new Date(v.dateReforme).toLocaleDateString("fr-FR") : "—"),
  },
];

/**
 * Liste des véhicules du parc : listing complet reproduisant fidèlement le
 * mockup `vehicule.jpg` (fourni par le client) — en-tête et barre latérale
 * dédiés au module (cf. FleetSidebar.jsx, distincte de la Sidebar générique
 * des 16 modules), barre de filtres, barre d'actions et tableau riche
 * (marque, section, affectations, utilisateurs...). Recherche + filtre
 * statut + pagination sont fonctionnels ; les autres filtres et actions
 * (Excel, PDF, impression...) sont démonstratifs (cf. cahier des charges
 * §6 "Module véhicules", intégration back-end à venir).
 *
 * Les logos officiels de marque (Toyota, Mercedes...) du mockup ne sont pas
 * disponibles ici (aucun asset sous licence dans le projet) — la colonne
 * "Marque" affiche une pastille monogramme colorée à la place, cf.
 * BRAND_STYLE ci-dessous.
 */
export default function VehicleList() {
  const { data: vehicles, isLoading } = useVehicles();
  const navigate = useNavigate();
  const nav = useResponsiveNav();
  const { selectedCompany } = useTenantStore();
  const { user } = useAuthStore();

  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("Tous");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const filtered = useMemo(() => {
    if (!vehicles) return [];
    return vehicles.filter((v) => {
      const matchesSearch =
        !search || [v.immat, v.nParc, v.marque, v.modele].some((f) => f.toLowerCase().includes(search.toLowerCase()));
      const matchesStatut = statut === "Tous" || v.statut === statut;
      return matchesSearch && matchesStatut;
    });
  }, [vehicles, search, statut]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const currentPage = Math.min(page, pageCount);
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const rangeEnd = Math.min(currentPage * rowsPerPage, filtered.length);

  const notImplemented = (label) => toast.info(`${label} — à venir`);

  if (isLoading) return <LoadingState />;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: colors.neutral.background }}>
      {/* En-tête */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #5CC5FE 0%, #8ECBF5 100%)",
          px: { xs: 1.5, md: 3 },
          py: 1.25,
          display: "flex",
          alignItems: "center",
          gap: { xs: 1.5, md: 2.5 },
          flexWrap: "wrap",
        }}
      >
        {!nav.isDesktop && <BurgerButton onClick={nav.toggle} hoverHandlers={nav.hoverHandlers} color={colors.primary.dark} />}

        <Box component="img" src={logo} alt="MGPA" sx={{ height: { xs: 40, md: 52 }, flexShrink: 0 }} />

        <Typography sx={{ display: { xs: "none", lg: "block" }, fontWeight: 800, fontSize: 12, color: colors.primary.dark, lineHeight: 1.25 }}>
          MAINTENANCE GÉNÉRALE
          <br />
          DES PARCS AUTOMOBILES
        </Typography>

        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: 16, md: 22 }, color: colors.primary.dark, lineHeight: 1.1 }}>
            LISTING DU PARC AUTOMOBILE
          </Typography>
          <Typography sx={{ display: { xs: "none", sm: "block" }, fontSize: 12, color: "text.secondary" }}>
            Gestion et suivi complet de l'ensemble des véhicules du parc
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ fontWeight: 800, fontSize: 13, color: colors.primary.dark }}>
              {selectedCompany?.name?.toUpperCase() ?? "TOUTES SOCIÉTÉS"}
            </Typography>
            <Typography sx={{ fontSize: 10.5, color: colors.secondary.main, fontWeight: 700 }}>SOLUTIONS DE FLOTTE MGPA</Typography>
          </Box>
          <Box component="img" src={towTruckIcon} alt="" sx={{ height: 44 }} />
        </Box>

        <IconButton onClick={() => notImplemented("Notifications")} sx={{ backgroundColor: "#fff", boxShadow: "0 2px 6px rgba(0,0,0,.1)" }}>
          <Badge badgeContent={5} color="error">
            <NotificationsOutlinedIcon sx={{ color: colors.primary.main, fontSize: 20 }} />
          </Badge>
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, cursor: "pointer" }} onClick={() => notImplemented("Menu du compte")}>
          <Avatar sx={{ bgcolor: colors.primary.main, width: 34, height: 34 }}>{user?.name?.[0] ?? "A"}</Avatar>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: colors.primary.dark, lineHeight: 1.1 }}>Admin</Typography>
            <Typography sx={{ fontSize: 10.5, color: "text.secondary" }}>{user?.roleLabel ?? "Superviseur"}</Typography>
          </Box>
          <ExpandMoreOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flex: 1, minWidth: 0 }}>
        <ResponsiveDrawer
          isDesktop={nav.isDesktop}
          open={nav.open}
          onClose={nav.close}
          width={FLEET_SIDEBAR_WIDTH}
          bgcolor={colors.sidebar.background}
          hoverHandlers={nav.hoverHandlers}
        >
          <FleetSidebar onNavigate={nav.close} />
        </ResponsiveDrawer>

        <Box sx={{ flex: 1, minWidth: 0, p: { xs: 1.5, md: 2.5 } }}>
          <Box sx={{ backgroundColor: "#fff", borderRadius: `${spacing.radius.card}px`, boxShadow: spacing.shadow.card, overflow: "hidden" }}>
            {/* Filtres */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",
                alignItems: "center",
                gap: 1.25,
                p: 1.5,
                borderBottom: "1px solid #EEF1F5",
              }}
            >
              {[
                { label: "Période :", value: "Mai 2026" },
                { label: "Société :", value: selectedCompany?.name ?? "Toutes" },
                { label: "Agence :", value: "Toutes" },
                { label: "Site :", value: "Tous" },
                { label: "Section :", value: "Toutes" },
              ].map((f) => (
                <Box key={f.label} sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: colors.primary.dark, whiteSpace: "nowrap" }}>{f.label}</Typography>
                  <Select
                    size="small"
                    value={f.value}
                    onChange={() => notImplemented("Ce filtre")}
                    sx={{ fontSize: 12, height: 30, minWidth: 88 }}
                  >
                    <MenuItem value={f.value} sx={{ fontSize: 12 }}>
                      {f.value}
                    </MenuItem>
                  </Select>
                </Box>
              ))}

              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: colors.primary.dark, whiteSpace: "nowrap" }}>Statut :</Typography>
                <Select
                  size="small"
                  value={statut}
                  onChange={(e) => {
                    setStatut(e.target.value);
                    setPage(1);
                  }}
                  sx={{ fontSize: 12, height: 30, minWidth: 88 }}
                >
                  {STATUTS.map((s) => (
                    <MenuItem key={s} value={s} sx={{ fontSize: 12 }}>
                      {s}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Box sx={{ flex: 1, minWidth: 12 }} />

              <Button
                variant="contained"
                size="small"
                startIcon={<TuneOutlinedIcon fontSize="small" />}
                onClick={() => notImplemented("Filtres avancés")}
                sx={{ fontSize: 12, fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" }}
              >
                Filtres avancés
              </Button>
            </Box>

            {/* Barre d'actions */}
            <Box sx={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", alignItems: "center", gap: 0.75, p: 1.5 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<AddOutlinedIcon fontSize="small" />}
                onClick={() => notImplemented("Création de véhicule")}
                sx={{ fontSize: 12, fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap", px: 1.25 }}
              >
                Nouveau véhicule
              </Button>
              {TOOLBAR_ACTIONS.map((a) => (
                <Button
                  key={a.key}
                  variant={a.filled ? "contained" : "outlined"}
                  size="small"
                  startIcon={<a.icon fontSize="small" />}
                  onClick={() => notImplemented(a.label)}
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                    px: 1.25,
                    ...(a.filled ? { backgroundColor: a.color } : { color: a.color, borderColor: a.color }),
                  }}
                >
                  {a.label}
                </Button>
              ))}
              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshOutlinedIcon fontSize="small" />}
                onClick={() => notImplemented("Actualisation")}
                sx={{ fontSize: 12, fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap", px: 1.25 }}
              >
                Actualiser
              </Button>

              <TextField
                placeholder="Rechercher…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                size="small"
                sx={{ ml: "auto", minWidth: 180, flexShrink: 0 }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box sx={{ px: 2, pb: 1 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700, color: colors.primary.dark }}>
                Total véhicules : {filtered.length}
              </Typography>
            </Box>

            {/* Tableau */}
            <Box sx={{ overflowX: "auto" }}>
              <Table sx={{ minWidth: 2200 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: colors.primary.main }}>
                    {COLUMNS.map((c) => (
                      <TableCell key={c.key} sx={{ color: "#fff", fontWeight: 700, fontSize: 12, whiteSpace: "nowrap" }}>
                        {c.label}
                      </TableCell>
                    ))}
                    <TableCell sx={{ color: "#fff", fontWeight: 700, fontSize: 12 }} align="right">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginated.map((v, i) => (
                    <TableRow key={v.id} hover>
                      {COLUMNS.map((c) => (
                        <TableCell key={c.key} sx={{ fontSize: 12.5, fontWeight: c.bold ? 700 : 400, whiteSpace: "nowrap" }}>
                          {c.render ? c.render(v, (currentPage - 1) * rowsPerPage + i) : v[c.key]}
                        </TableCell>
                      ))}
                      <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                        <IconButton size="small" onClick={() => notImplemented("Modification")}>
                          <EditOutlinedIcon fontSize="small" sx={{ color: colors.primary.main }} />
                        </IconButton>
                        <IconButton size="small" onClick={() => navigate(`/vehicules/${v.id}`)}>
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" onClick={() => notImplemented("Actions supplémentaires")}>
                          <MoreVertOutlinedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {paginated.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={COLUMNS.length + 1} align="center" sx={{ py: 4, color: "text.secondary" }}>
                        Aucun véhicule ne correspond à ces critères.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>

            <FleetPagination
              page={currentPage}
              pageCount={pageCount}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(n) => {
                setRowsPerPage(n);
                setPage(1);
              }}
              onPageChange={setPage}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              total={filtered.length}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
