import { useQuery } from "@tanstack/react-query";
import { fetchClientDashboard } from "../services/clientDashboardService";

/** Données agrégées du tableau de bord client (KPI, graphiques, tables, alertes). */
export function useClientDashboard() {
  return useQuery({ queryKey: ["client-dashboard"], queryFn: fetchClientDashboard });
}
