import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import TireRepairOutlinedIcon from "@mui/icons-material/TireRepairOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import GarageOutlinedIcon from "@mui/icons-material/GarageOutlined";

// Architecture des écrans — charte graphique §20 / cahier des charges §23
// `implemented: false` route vers un écran "bientôt disponible" en attendant
// le développement du module (évite les liens morts tout en montrant l'IA complète).
export const NAV_ITEMS = [
  { key: "dashboard", label: "Tableau de bord", icon: DashboardOutlinedIcon, path: "/dashboard", implemented: true },
  { key: "clients", label: "Clients & sociétés", icon: BusinessOutlinedIcon, path: "/module/clients", implemented: false },
  { key: "vehicules", label: "Véhicules", icon: DirectionsCarOutlinedIcon, path: "/vehicules", implemented: true },
  { key: "personnel", label: "Personnel & conducteurs", icon: BadgeOutlinedIcon, path: "/module/personnel", implemented: false },
  { key: "preventif", label: "Maintenance préventive", icon: BuildOutlinedIcon, path: "/module/preventif", implemented: false },
  { key: "corrective", label: "Maintenance corrective", icon: HandymanOutlinedIcon, path: "/module/corrective", implemented: false },
  { key: "carburant", label: "Carburant", icon: LocalGasStationOutlinedIcon, path: "/module/carburant", implemented: false },
  { key: "compteurs", label: "Compteurs", icon: SpeedOutlinedIcon, path: "/module/compteurs", implemented: false },
  { key: "pneumatiques", label: "Pneumatiques", icon: TireRepairOutlinedIcon, path: "/module/pneumatiques", implemented: false },
  { key: "magasin", label: "Pièces de rechange (Magasin)", icon: Inventory2OutlinedIcon, path: "/module/magasin", implemented: false },
  { key: "atelier", label: "Atelier", icon: GarageOutlinedIcon, path: "/module/atelier", implemented: false },
  { key: "fournisseurs", label: "Fournisseurs", icon: LocalShippingOutlinedIcon, path: "/module/fournisseurs", implemented: false },
  { key: "prestataires", label: "Prestataires & contrats", icon: HandshakeOutlinedIcon, path: "/module/prestataires", implemented: false },
  { key: "rapports", label: "Rapports & statistiques", icon: AssessmentOutlinedIcon, path: "/module/rapports", implemented: false },
  { key: "alertes", label: "Alertes", icon: NotificationsOutlinedIcon, path: "/module/alertes", implemented: false },
  { key: "utilisateurs", label: "Gestion des utilisateurs", icon: GroupOutlinedIcon, path: "/module/utilisateurs", implemented: false },
  { key: "journal", label: "Journal d'activités", icon: HistoryOutlinedIcon, path: "/module/journal", implemented: false },
  { key: "parametres", label: "Paramètres", icon: SettingsOutlinedIcon, path: "/module/parametres", implemented: false },
];
