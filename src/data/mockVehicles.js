// Données de démonstration du module Véhicules (liste, documents, historique,
// tendance kilométrique). Consommées par src/services/vehiclesService.js en
// mode mock ; le format reflète la forme attendue de l'API réelle.
//
// Le statut et les colonnes étendues (N° Parc, Section, Famille, Direction...)
// reproduisent le mockup `vehicule.jpg` (listing complet du parc, fourni par
// le client) — la liste ci-dessous est générée à partir de pools de valeurs
// réalistes plutôt qu'écrite à la main, pour obtenir un volume de données
// proche du mockup (248 véhicules) sans 248 lignes littérales.
import pickupPhoto from "../assets/vehicles/pickup.png";
import boxTruckPhoto from "../assets/vehicles/box_truck.png";
import tractorPhoto from "../assets/vehicles/tractor.png";
import dumpTruckPhoto from "../assets/vehicles/dump_truck.png";
import towTruckPhoto from "../assets/vehicles/tow_truck.png";
import wheelLoaderPhoto from "../assets/vehicles/wheel_loader.png";
import excavatorPhoto from "../assets/vehicles/excavator.png";
import forkliftPhoto from "../assets/vehicles/forklift.png";

export const VEHICLE_STATUS = {
  DISPONIBLE: "Disponible",
  PREVENTIF: "Préventif",
  CURATIF: "Curatif",
  REFORME: "Réformé",
};

export const STATUS_COLOR = {
  [VEHICLE_STATUS.DISPONIBLE]: "success",
  [VEHICLE_STATUS.PREVENTIF]: "warning",
  [VEHICLE_STATUS.CURATIF]: "error",
  [VEHICLE_STATUS.REFORME]: "default",
};

// Photo représentative par type (issues du mockup fournisseur "b.jpeg" —
// pas de photo dédiée pour SUV/Berline/Minibus, StatusChip retombe sur une
// icône générique dans ce cas, cf. VehicleList.jsx).
const TRUCK_PHOTOS = [boxTruckPhoto, tractorPhoto, dumpTruckPhoto, towTruckPhoto];
const ENGIN_PHOTOS = [wheelLoaderPhoto, excavatorPhoto, forkliftPhoto];

const TYPES = ["Pick-up", "Camion", "SUV", "Berline", "Minibus", "Engin"];
const MODELES = {
  "Pick-up": ["Hilux 2.4", "Navara", "Ranger", "L200", "D-Max"],
  Camion: ["Actros 3336", "Premium 380", "FMX 440", "FVR 34Q", "TGS 33.400"],
  SUV: ["Prado TX", "Pajero", "Duster", "Fortuner"],
  Berline: ["Corolla", "Sunny", "308", "Elantra"],
  Minibus: ["H-1", "Hiace", "Transit"],
  Engin: ["950 GC", "PC200", "FD30"],
};
const MARQUES = {
  "Pick-up": ["Toyota", "Nissan", "Ford", "Mitsubishi", "Isuzu"],
  Camion: ["Mercedes", "Renault", "Volvo", "Isuzu", "MAN"],
  SUV: ["Toyota", "Mitsubishi", "Dacia"],
  Berline: ["Toyota", "Nissan", "Peugeot", "Hyundai"],
  Minibus: ["Hyundai", "Toyota", "Ford"],
  Engin: ["Caterpillar", "Komatsu", "Hyster"],
};
const ENERGIES = ["Diesel", "Essence"];
const SECTIONS = ["Véhicules légers", "Poids lourds", "Engins de chantier"];
const FAMILLES = ["Exploitation", "Direction", "Conducteurs"];
const DIRECTIONS = ["Technique", "Direction", "Logistique"];
const DEPARTEMENTS = ["Maintenance", "Transport", "Administration"];
const SERVICES = ["Atelier", "Bureau", "Logistique"];
const REGIONS = ["Centre", "Littoral", "Ouest", "Nord", "Sud", "Est"];
const AGENCES = ["Yaoundé", "Douala", "Bafoussam", "Garoua", "Bonabéri", "Ebolowa"];
const SITES = ["Nsimalen", "Bonabéri", "Bafoussam", "Ndjamena", "Centre", "Est"];
const PRENOMS = ["Jean Pierre", "Paul", "Thomas", "Michel", "François", "Blaise", "Luc", "Oumar", "Chantal", "Armand", "Serge", "Guy"];
const NOMS = ["Martin", "Alain MBASSI", "Jacques YEMELE", "Brice EDIMO", "Guy NEMO", "Serge DJOU", "Bertrand", "Pierre MOUSSA", "Victor TCHAMO", "-"];

const STATUS_WEIGHTS = [
  VEHICLE_STATUS.DISPONIBLE,
  VEHICLE_STATUS.DISPONIBLE,
  VEHICLE_STATUS.DISPONIBLE,
  VEHICLE_STATUS.PREVENTIF,
  VEHICLE_STATUS.CURATIF,
  VEHICLE_STATUS.REFORME,
];

function pick(pool, i) {
  return pool[i % pool.length];
}

function photoFor(type, i) {
  if (type === "Camion") return pick(TRUCK_PHOTOS, i);
  if (type === "Engin") return pick(ENGIN_PHOTOS, i);
  if (type === "Pick-up") return pickupPhoto;
  return null;
}

function generateVehicles(count) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    const type = pick(TYPES, i);
    const marque = pick(MARQUES[type], i);
    const modele = pick(MODELES[type], i + 1);
    const statut = pick(STATUS_WEIGHTS, i);
    const anneeMiseCirc = 2018 + (i % 8);
    rows.push({
      id: i + 1,
      immat: `CE-${String(100 + i * 3).padStart(3, "0")}-${String.fromCharCode(65 + (i % 26))}${String.fromCharCode(65 + ((i + 3) % 26))}`,
      nParc: `P${String(i + 1).padStart(4, "0")}`,
      marque,
      type,
      modele,
      nChassis: `${marque.slice(0, 3).toUpperCase()}0J${(i % 9)}B3CD60${1000000 + i}`,
      dateMiseCirc: `${anneeMiseCirc}-${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 27)).padStart(2, "0")}`,
      puissanceCV: 90 + (i % 12) * 25,
      energie: pick(ENERGIES, i),
      photo: photoFor(type, i),
      section: pick(SECTIONS, type === "Engin" ? 2 : type === "Camion" ? 1 : 0),
      famille: pick(FAMILLES, i),
      direction: pick(DIRECTIONS, i + 2),
      departement: pick(DEPARTEMENTS, i + 1),
      service: pick(SERVICES, i),
      region: pick(REGIONS, i),
      agence: pick(AGENCES, i),
      site: pick(SITES, i + 1),
      utilisateur1: pick(PRENOMS, i),
      utilisateur2: pick(NOMS, i + 2),
      utilisateur3: i % 4 === 0 ? pick(PRENOMS, i + 5) : "-",
      statut,
      dateReforme: statut === VEHICLE_STATUS.REFORME ? `${2025}-${String(1 + (i % 12)).padStart(2, "0")}-${String(1 + (i % 27)).padStart(2, "0")}` : null,
      // Champs conservés pour compat avec VehicleDetail.jsx (fiche existante)
      annee: anneeMiseCirc,
      categorie: type,
      carburant: pick(ENERGIES, i),
      km: 8000 + i * 1450,
      prochainEntretien: `2026-${String(1 + (i % 12)).padStart(2, "0")}-${String(5 + (i % 20)).padStart(2, "0")}`,
    });
  }
  return rows;
}

export const VEHICLES = generateVehicles(42);

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
