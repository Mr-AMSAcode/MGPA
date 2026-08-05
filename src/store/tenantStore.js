import { create } from "zustand";
import { CLIENT_COMPANIES } from "../data/mockAccueil";

/**
 * Société cliente ("tenant") actuellement sélectionnée dans l'app multi-tenant
 * (choisie sur l'écran d'accueil). Consommée par ClientDashboard pour le
 * filtre "Filtrer par" et par tout futur module ayant besoin de scoper ses
 * données à une société.
 */
export const useTenantStore = create((set) => ({
  selectedCompany: CLIENT_COMPANIES[0],
  selectCompany: (company) => set({ selectedCompany: company }),
}));
