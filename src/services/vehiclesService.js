import { VEHICLES, VEHICLE_DOCUMENTS, VEHICLE_HISTORY, VEHICLE_MILEAGE_TREND } from "../data/mockVehicles";
import { httpClient } from "./httpClient";
import { simulateLatency } from "./mockUtils";
import { USE_MOCK } from "../config/env";

/**
 * Service Véhicules (module "Parc véhicules", cahier des charges §2/§23).
 * Bascule automatique mock ⇄ API réelle via USE_MOCK (src/config/env.js) :
 * les hooks React Query (src/hooks/useVehicles.js) appellent ces fonctions
 * sans jamais savoir laquelle des deux implémentations répond.
 */
export function fetchVehicles() {
  if (USE_MOCK) return simulateLatency(VEHICLES);
  return httpClient.get("/vehicules").then((res) => res.data);
}

export function fetchVehicleById(id) {
  if (USE_MOCK) {
    const vehicle = VEHICLES.find((v) => v.id === Number(id));
    return simulateLatency({
      vehicle,
      documents: VEHICLE_DOCUMENTS[id] ?? [],
      history: VEHICLE_HISTORY[id] ?? [],
      mileageTrend: VEHICLE_MILEAGE_TREND[id] ?? [],
    });
  }
  return httpClient.get(`/vehicules/${id}`).then((res) => res.data);
}
