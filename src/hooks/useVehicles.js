import { useQuery } from "@tanstack/react-query";
import { fetchVehicles, fetchVehicleById } from "../services/vehiclesService";

/** Liste des véhicules du parc (module Véhicules). */
export function useVehicles() {
  return useQuery({ queryKey: ["vehicles"], queryFn: fetchVehicles });
}

/** Fiche détaillée d'un véhicule (infos, documents, historique, tendance kilométrique). */
export function useVehicle(id) {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => fetchVehicleById(id),
    enabled: id != null,
  });
}
