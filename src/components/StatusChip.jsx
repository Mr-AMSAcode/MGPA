import { Chip } from "@mui/material";
import { STATUS_COLOR } from "../data/mockVehicles";

/** Badge coloré pour un statut véhicule (Actif/Maintenance/Immobilisé), couleur définie dans STATUS_COLOR. */
export default function StatusChip({ status }) {
  return <Chip label={status} color={STATUS_COLOR[status] ?? "default"} size="small" sx={{ fontWeight: 600 }} />;
}
