// Données de démonstration du module Véhicules (liste, documents, historique,
// tendance kilométrique). Consommées par src/services/vehiclesService.js en
// mode mock ; le format reflète la forme attendue de l'API réelle.
export const VEHICLE_STATUS = {
  ACTIF: "Actif",
  MAINTENANCE: "Maintenance",
  IMMOBILISE: "Immobilisé",
};

export const STATUS_COLOR = {
  [VEHICLE_STATUS.ACTIF]: "success",
  [VEHICLE_STATUS.MAINTENANCE]: "warning",
  [VEHICLE_STATUS.IMMOBILISE]: "error",
};

export const VEHICLES = [
  { id: 1, immat: "LT-123-AA", marque: "Toyota", modele: "Hilux", annee: 2021, categorie: "PL1", carburant: "Diesel", km: 120000, statut: VEHICLE_STATUS.ACTIF, prochainEntretien: "2026-11-08" },
  { id: 2, immat: "CE-456-BB", marque: "Nissan", modele: "Navara", annee: 2022, categorie: "PL1", carburant: "Diesel", km: 98000, statut: VEHICLE_STATUS.MAINTENANCE, prochainEntretien: "2026-08-03" },
  { id: 3, immat: "AB-234-CD", marque: "Peugeot", modele: "3008", annee: 2020, categorie: "VL", carburant: "Diesel", km: 78450, statut: VEHICLE_STATUS.ACTIF, prochainEntretien: "2026-09-12" },
  { id: 4, immat: "GH-789-EF", marque: "Renault", modele: "Kangoo", annee: 2019, categorie: "VL", carburant: "Essence", km: 45200, statut: VEHICLE_STATUS.ACTIF, prochainEntretien: "2026-10-03" },
  { id: 5, immat: "MK-456-BC", marque: "Ford", modele: "Transit", annee: 2018, categorie: "PL2", carburant: "Diesel", km: 200300, statut: VEHICLE_STATUS.IMMOBILISE, prochainEntretien: "2026-07-25" },
  { id: 6, immat: "NK-321-ZZ", marque: "Nissan", modele: "Navara", annee: 2022, categorie: "PL1", carburant: "Diesel", km: 32100, statut: VEHICLE_STATUS.ACTIF, prochainEntretien: "2026-10-10" },
  { id: 7, immat: "DA-007-XX", marque: "BMW", modele: "Série 3", annee: 2023, categorie: "VL", carburant: "Hybride", km: 12500, statut: VEHICLE_STATUS.ACTIF, prochainEntretien: "2026-09-01" },
  { id: 8, immat: "SO-852-KL", marque: "Toyota", modele: "Land Cruiser", annee: 2020, categorie: "EGC", carburant: "Diesel", km: 156000, statut: VEHICLE_STATUS.MAINTENANCE, prochainEntretien: "2026-07-30" },
];

export const VEHICLE_DOCUMENTS = {
  1: [
    { nom: "Carte grise", debut: "2021-03-01", fin: null, statut: "Valide" },
    { nom: "Assurance", debut: "2026-01-05", fin: "2027-01-05", statut: "Valide" },
    { nom: "Visite technique", debut: "2026-01-15", fin: "2026-07-15", statut: "Valide" },
    { nom: "Vignette", debut: "2026-01-01", fin: "2026-12-31", statut: "Valide" },
  ],
};

export const VEHICLE_HISTORY = {
  1: [
    { date: "2026-01-12", type: "Entretien préventif", desc: "Vidange + filtre à huile", cout: 45000 },
    { date: "2025-10-20", type: "Réparation", desc: "Remplacement plaquettes de frein", cout: 32000 },
    { date: "2025-06-05", type: "Contrôle", desc: "Visite technique annuelle", cout: 12000 },
  ],
};

export const VEHICLE_MILEAGE_TREND = {
  1: [
    { mois: "Fév", km: 108000 },
    { mois: "Mar", km: 111500 },
    { mois: "Avr", km: 114800 },
    { mois: "Mai", km: 117200 },
    { mois: "Juin", km: 119100 },
    { mois: "Juil", km: 120000 },
  ],
};
