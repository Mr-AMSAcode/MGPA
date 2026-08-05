// Données extraites de dashboard_app.jpg (exemple client SORETAC CAMEROUN)
export const CLIENT_KPIS = [
  { key: "clientsInscrits", label: "Clients inscrits", value: "128", sub: "Total des clients", color: "primary", type: "people" },
  { key: "clientsActifs", label: "Clients actifs", value: "96", sub: "75,0% du total", color: "success", type: "people" },
  { key: "clientsInactifs", label: "Clients inactifs", value: "32", sub: "25,0% du total", color: "error", type: "people" },
  { key: "totalVehicules", label: "Total véhicules", value: "1 256", sub: "Tous statuts confondus", color: "primary", type: "car" },
  { key: "vehiculesActifs", label: "Véhicules actifs", value: "987", sub: "78,6% du total", color: "success", type: "car" },
  { key: "vehiculesInactifs", label: "Véhicules inactifs", value: "269", sub: "21,4% du total", color: "error", type: "car" },
];

export const SECTIONS = ["EPN1", "EPN2", "DOUALA", "YAOUNDE", "NORD", "OUEST", "SUD"];

export const VEHICLES_BY_SECTION = {
  declares: [280, 230, 190, 160, 150, 120, 126],
  actifs: [235, 182, 148, 125, 120, 95, 82],
  inactifs: [45, 48, 42, 35, 30, 25, 44],
};

export const SUBSCRIPTIONS = [
  { societe: "SORETAC CAMEROUN", debut: "15/01/2026", fin: "14/01/2027", mois: 8, statut: "Actif" },
  { societe: "CAMWATER", debut: "20/02/2026", fin: "19/02/2027", mois: 9, statut: "Actif" },
  { societe: "ENERGIE DU CAMEROUN", debut: "05/01/2026", fin: "04/01/2027", mois: 8, statut: "Actif" },
  { societe: "CAMAIR-CO", debut: "01/03/2026", fin: "28/02/2027", mois: 9, statut: "Actif" },
  { societe: "SOCAPALM", debut: "10/10/2025", fin: "09/10/2026", mois: 4, statut: "Expire bientôt" },
  { societe: "MAETUR", debut: "15/09/2025", fin: "14/09/2026", mois: 3, statut: "Expire bientôt" },
  { societe: "KRIBI PORT AUTHORITY", debut: "01/06/2025", fin: "31/05/2026", mois: 0, statut: "Expiré" },
  { societe: "SABC", debut: "20/05/2025", fin: "19/05/2026", mois: -1, statut: "Expiré" },
  { societe: "CDC", debut: "10/03/2025", fin: "09/03/2026", mois: -3, statut: "Expiré" },
];

export const CLIENT_ACTIVITIES = [
  { label: "Entretiens préventifs programmés", m: 145, m1: 132 },
  { label: "Entretiens réalisés", m: 112, m1: 98 },
  { label: "Entretiens non réalisés", m: 33, m1: 34, alert: true },
  { label: "Réparations", m: 87, m1: 76 },
];

export const FLEET_METRICS = {
  disponibilite: 78,
  coutTotal: { value: "2,45", unit: "Milliards FCFA" },
  parcours: { value: "352 660", unit: "Kilomètres" },
  consommation: { value: "24,8", unit: "L / 100 km" },
};

export const OIL_CHANGE_OVERRUNS = [
  { societe: "MAETUR", section: "EPN2", vehicules: 18, km: 2350, pct: 12.0 },
  { societe: "SOCAPALM", section: "NORD", vehicules: 15, km: 1980, pct: 10.3 },
  { societe: "CAMWATER", section: "DOUALA", vehicules: 12, km: 1750, pct: 8.1 },
  { societe: "ENERGIE DU CAMEROUN", section: "YAOUNDE", vehicules: 10, km: 1620, pct: 6.5 },
  { societe: "CAMAIR-CO", section: "SUD", vehicules: 9, km: 1450, pct: 5.4 },
];

export const CURRENT_ALERTS = [
  { key: "assurance", label: "Assurance", value: 12, sub: "À renouveler", color: "error" },
  { key: "visite", label: "Visite technique", value: 8, sub: "À planifier", color: "warning" },
  { key: "vidange", label: "Vidange", value: 23, sub: "En retard", color: "error" },
  { key: "pneus", label: "Pneus", value: 15, sub: "À vérifier", color: "info" },
  { key: "batterie", label: "Batterie", value: 7, sub: "Faible", color: "warning" },
  { key: "moteur", label: "Contrôle moteur", value: 5, sub: "Anomalies", color: "error" },
];

export const FLEET_SHARE_BY_COMPANY = [
  { name: "SORETAC CAMEROUN", value: 28, color: "#1E88E5" },
  { name: "CAMWATER", value: 10, color: "#FFC107" },
  { name: "ENERGIE DU CAMEROUN", value: 12, color: "#43A047" },
  { name: "CAMAIR-CO", value: 18, color: "#7B1FA2" },
  { name: "SOCAPALM", value: 22, color: "#26C6DA" },
  { name: "Autres sociétés", value: 10, color: "#9E9E9E" },
];

export const STATUS_TONE = {
  Actif: { bg: "#E8F5E9", color: "#2E7D32" },
  "Expire bientôt": { bg: "#FFF3E0", color: "#EF6C00" },
  Expiré: { bg: "#FFEBEE", color: "#C62828" },
};
