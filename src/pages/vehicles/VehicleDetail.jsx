import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@mui/material";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useVehicle } from "../../hooks/useVehicles";
import LoadingState from "../../components/LoadingState";
import StatusChip from "../../components/StatusChip";
import { colors, spacing } from "../../theme";

const FIELDS = [
  { key: "marque", label: "Marque" },
  { key: "modele", label: "Modèle" },
  { key: "annee", label: "Année" },
  { key: "categorie", label: "Catégorie" },
  { key: "carburant", label: "Carburant" },
  { key: "km", label: "Kilométrage" },
];

/**
 * Fiche détaillée d'un véhicule : infos générales, documents de bord
 * (carte grise, assurance...), historique des interventions avec la
 * tendance kilométrique (cf. cahier des charges §4 "Dossiers du véhicule").
 */
export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useVehicle(id);
  const [tab, setTab] = useState(0);

  if (isLoading || !data?.vehicle) return <LoadingState />;

  const { vehicle, documents, history, mileageTrend } = data;

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
        <IconButton onClick={() => navigate("/vehicules")}>
          <ArrowBackOutlinedIcon />
        </IconButton>
        <Typography variant="h5">{vehicle.immat}</Typography>
        <StatusChip status={vehicle.statut} />
      </Box>

      <Paper sx={{ boxShadow: spacing.shadow.card }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ px: 2, borderBottom: "1px solid #EEF1F5" }}>
          <Tab label="Infos" />
          <Tab label="Documents" />
          <Tab label="Historique" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {tab === 0 && (
            <Grid container spacing={3}>
              {FIELDS.map((f) => (
                <Grid key={f.key} size={{ xs: 6, md: 4 }}>
                  <Typography variant="caption" color="text.secondary">
                    {f.label}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {f.key === "km" ? `${vehicle.km.toLocaleString("fr-FR")} km` : vehicle[f.key]}
                  </Typography>
                </Grid>
              ))}
              <Grid size={{ xs: 6, md: 4 }}>
                <Typography variant="caption" color="text.secondary">
                  Prochain entretien
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {new Date(vehicle.prochainEntretien).toLocaleDateString("fr-FR")}
                </Typography>
              </Grid>
            </Grid>
          )}

          {tab === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {documents.length === 0 && (
                <Typography color="text.secondary">Aucun document enregistré pour ce véhicule.</Typography>
              )}
              {documents.map((doc) => (
                <Box
                  key={doc.nom}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 1.5,
                    borderRadius: `${spacing.radius.field}px`,
                    backgroundColor: colors.neutral.background,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckCircleOutlinedIcon fontSize="small" sx={{ color: colors.success.main }} />
                    <Typography sx={{ fontWeight: 500 }}>{doc.nom}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {doc.fin ? `Expire le ${new Date(doc.fin).toLocaleDateString("fr-FR")}` : "Sans échéance"}
                    </Typography>
                    <Chip label={doc.statut} color="success" size="small" />
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {tab === 2 && (
            <Box>
              {mileageTrend.length > 0 && (
                <Box sx={{ height: 260, mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Évolution du kilométrage
                  </Typography>
                  <ResponsiveContainer width="100%" height="88%">
                    <LineChart data={mileageTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F5" />
                      <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} domain={["dataMin - 2000", "dataMax + 2000"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="km" stroke={colors.primary.main} strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              )}

              <Box sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 520 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Coût</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((h, i) => (
                      <TableRow key={i}>
                        <TableCell>{new Date(h.date).toLocaleDateString("fr-FR")}</TableCell>
                        <TableCell>{h.type}</TableCell>
                        <TableCell>{h.desc}</TableCell>
                        <TableCell align="right">{h.cout.toLocaleString("fr-FR")} FCFA</TableCell>
                      </TableRow>
                    ))}
                    {history.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center" sx={{ py: 4, color: "text.secondary" }}>
                          Aucune intervention enregistrée.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
