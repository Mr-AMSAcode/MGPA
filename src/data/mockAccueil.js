// Données de démonstration de l'écran d'accueil : sociétés clientes (multi-tenant)
// et grille des 16 modules. À remplacer par un appel API (liste des sociétés
// rattachées à l'utilisateur connecté) une fois le back-end branché.
import ChangeHistoryOutlinedIcon from "@mui/icons-material/ChangeHistoryOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import TerrainOutlinedIcon from "@mui/icons-material/TerrainOutlined";
import WavesOutlinedIcon from "@mui/icons-material/WavesOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

import iconVehicules from "../assets/icons/icon_vehicules.png";
import iconPersonnel from "../assets/icons/icon_personnel.png";
import iconPreventif from "../assets/icons/icon_preventif.png";
import iconCuratif from "../assets/icons/icon_curatif.png";
import iconConsommation from "../assets/icons/icon_consommation.png";
import iconCompteurs from "../assets/icons/icon_compteurs.png";
import iconFournisseurs from "../assets/icons/icon_fournisseurs.png";
import iconPrestataires from "../assets/icons/icon_prestataires.png";
import iconParametre from "../assets/icons/icon_parametre.png";
import iconAtelier from "../assets/icons/icon_atelier.png";
import iconTableauDeBord from "../assets/icons/icon_tableaudebord.png";
import iconMagasinPR from "../assets/icons/icon_magasinpr.png";

// Icônes extraites d'acceul_app.jpg (pas de génération d'image disponible :
// on réutilise les icônes 3D telles quelles plutôt que de les approximer).
// `accessCode` : code d'accès démo pour le portail client (écran
// /connexion-client — cf. cahier des charges §4 "Gestion des accès").
// En production, ce code serait vérifié côté back-end, pas stocké en clair
// côté front — ici il permet de simuler le flux complet sans API.
export const CLIENT_COMPANIES = [
  { id: 1, code: "01", name: "Société Alpha", icon: ChangeHistoryOutlinedIcon, color: "#3F51B5", accessCode: "ALPHA2026" },
  { id: 2, code: "02", name: "Global Industries", icon: PublicOutlinedIcon, color: "#43A047", accessCode: "GLOBAL2026" },
  { id: 3, code: "03", name: "Transco SARL", icon: LocalShippingOutlinedIcon, color: "#1E88E5", accessCode: "TRANSCO2026" },
  { id: 4, code: "04", name: "Bati Plus", icon: ApartmentOutlinedIcon, color: "#1565C0", accessCode: "BATIPLUS2026" },
  { id: 5, code: "05", name: "Mines & Co", icon: TerrainOutlinedIcon, color: "#37474F", accessCode: "MINESCO2026" },
  { id: 6, code: "06", name: "Oceanic SA", icon: WavesOutlinedIcon, color: "#0097A7", accessCode: "OCEANIC2026" },
  { id: 7, code: "07", name: "Energie Plus", icon: BoltOutlinedIcon, color: "#FFC107", accessCode: "ENERGIE2026" },
  { id: 8, code: "08", name: "Solutions Pro", icon: AutoAwesomeOutlinedIcon, color: "#1E88E5", accessCode: "SOLUTIONS2026" },
  { id: 9, code: "09", name: "Afrik Logistics", icon: ExploreOutlinedIcon, color: "#E53935", accessCode: "AFRIK2026" },
  { id: 10, code: "10", name: "Nova Corporate", icon: StarOutlinedIcon, color: "#43A047", accessCode: "NOVA2026" },
];

export const MODULE_TILES = [
  { key: "vehicules", label: "VEHICULES", icon: iconVehicules, underline: "#1E88E5", path: "/vehicules" },
  { key: "personnel", label: "PERSONNEL", icon: iconPersonnel, underline: "#FFC107", path: "/module/personnel" },
  { key: "preventif", label: "PREVENTIF", icon: iconPreventif, underline: "#43A047", path: "/module/preventif" },
  { key: "curatif", label: "CURATIF", icon: iconCuratif, underline: "#FB8C00", path: "/module/corrective" },
  { key: "consommation", label: "CONSOMMATION", icon: iconConsommation, underline: "#E53935", path: "/module/carburant" },
  { key: "compteurs", label: "COMPTEURS", icon: iconCompteurs, underline: "#1E88E5", path: "/module/compteurs" },
  { key: "fournisseurs", label: "FOURNISSEURS", icon: iconFournisseurs, underline: "#7B1FA2", path: "/module/fournisseurs" },
  { key: "prestataires", label: "PRESTATAIRES", icon: iconPrestataires, underline: "#00ACC1", path: "/module/prestataires" },
  { key: "parametre", label: "PARAMETRE", icon: iconParametre, underline: "#1E88E5", path: "/module/parametres" },
  { key: "atelier", label: "ATELIER", icon: iconAtelier, underline: "#1565C0", path: "/module/atelier" },
  { key: "tableaudebord", label: "TABLEAU DE BORD", icon: iconTableauDeBord, underline: "#7B1FA2", path: "/dashboard" },
  { key: "magasinpr", label: "MAGASIN PR", icon: iconMagasinPR, underline: "#FB8C00", path: "/module/magasin" },
];
