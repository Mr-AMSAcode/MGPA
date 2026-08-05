import {
  CLIENT_KPIS,
  SECTIONS,
  VEHICLES_BY_SECTION,
  SUBSCRIPTIONS,
  CLIENT_ACTIVITIES,
  FLEET_METRICS,
  OIL_CHANGE_OVERRUNS,
  CURRENT_ALERTS,
  FLEET_SHARE_BY_COMPANY,
} from "../data/mockClientDashboard";
import { httpClient } from "./httpClient";
import { simulateLatency } from "./mockUtils";
import { USE_MOCK } from "../config/env";

/**
 * Service du tableau de bord client (écran "Vue d'ensemble" par société,
 * cf. cahier des charges §6 "Pilotage et indicateurs" / §18 "Tableau de bord").
 * Bascule automatique mock ⇄ API réelle via USE_MOCK (src/config/env.js).
 */
export function fetchClientDashboard() {
  if (USE_MOCK) {
    return simulateLatency({
      kpis: CLIENT_KPIS,
      sections: SECTIONS,
      vehiclesBySection: VEHICLES_BY_SECTION,
      subscriptions: SUBSCRIPTIONS,
      activities: CLIENT_ACTIVITIES,
      fleetMetrics: FLEET_METRICS,
      oilChangeOverruns: OIL_CHANGE_OVERRUNS,
      alerts: CURRENT_ALERTS,
      fleetShareByCompany: FLEET_SHARE_BY_COMPANY,
    });
  }
  return httpClient.get("/dashboard/client").then((res) => res.data);
}
