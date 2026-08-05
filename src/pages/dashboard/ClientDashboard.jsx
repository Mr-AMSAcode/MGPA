import { useState } from "react";
import { Box, Typography, Select, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

import { useClientDashboard } from "../../hooks/useClientDashboard";
import { useTenantStore } from "../../store/tenantStore";
import { useResponsiveNav } from "../../hooks/useResponsiveNav";
import LoadingState from "../../components/LoadingState";
import ResponsiveDrawer from "../../components/ResponsiveDrawer";
import BurgerButton from "../../components/BurgerButton";
import { colors } from "../../theme";
import soretacLogo from "../../assets/icons/soretac-logo.png";
import mgpaLogo from "../../assets/logo-mgpa.png";
import MiniSidebar from "./MiniSidebar";
import ClientKpiTile from "./ClientKpiTile";
import {
  SectionBarPanel,
  SubscriptionsPanel,
  ActivitiesPanel,
  ComparisonChartPanel,
  FleetMetricsRow,
  OverrunsPanel,
  AlertsPanel,
  FleetSharePiePanel,
} from "./DashboardPanels";

const MINI_SIDEBAR_WIDTH = 190;

/**
 * Tableau de bord "suivi des clients" par société (reproduction fidèle du
 * mockup `dashboard_app` fourni par le client — cf. mémoire projet). Mise en
 * page autonome, atteinte depuis l'Accueil ou la barre latérale principale.
 */
export default function ClientDashboard() {
  const navigate = useNavigate();
  const { selectedCompany } = useTenantStore();
  const { data, isLoading } = useClientDashboard();
  const [period, setPeriod] = useState("Mai 2026");
  const [scope, setScope] = useState("Toutes les sociétés");
  const [active, setActive] = useState("vue");
  const nav = useResponsiveNav();

  if (isLoading || !data) return <LoadingState />;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#EEF3FB" }}>
      {/* Header */}
      <Box sx={{ backgroundColor: "#fff", borderBottom: "1px solid #E3E9F0", px: { xs: 1.5, md: 3 }, py: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
          {!nav.isDesktop && (
            <BurgerButton onClick={nav.toggle} hoverHandlers={nav.hoverHandlers} color={colors.primary.dark} />
          )}
          <IconButton size="small" onClick={() => navigate("/accueil")}>
            <ArrowBackOutlinedIcon fontSize="small" />
          </IconButton>
          <Box component="img" src={soretacLogo} alt="SORETAC CAMEROUN" sx={{ height: { xs: 30, md: 40 } }} />
          <Box sx={{ flex: 1, textAlign: "center", minWidth: 0 }}>
            <Typography
              noWrap
              sx={{ fontWeight: 800, fontSize: { xs: 11, sm: 14, md: 18 }, color: colors.primary.dark }}
            >
              TABLEAU DE BORD DE SUIVI DES CLIENTS — SORETAC CAMEROUN
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: { xs: 10, md: 13 }, color: colors.secondary.main }}>
              MGPA - Votre Parc en un Clic
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1 }}>
            <Box component="img" src={mgpaLogo} alt="MGPA" sx={{ height: 38 }} />
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: 9, lineHeight: 1.2, color: colors.primary.dark }}>
                MAINTENANCE ET GESTION
                <br />
                DES PARCS AUTOMOBILES
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 9, color: colors.secondary.main }}>
                Votre Parc en un Clic
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 1, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Période</Typography>
            <Select size="small" value={period} onChange={(e) => setPeriod(e.target.value)} sx={{ fontSize: 12, height: 32 }}>
              <MenuItem value="Mai 2026">Mai 2026</MenuItem>
              <MenuItem value="Avril 2026">Avril 2026</MenuItem>
              <MenuItem value="Mars 2026">Mars 2026</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Filtrer par</Typography>
            <Select size="small" value={scope} onChange={(e) => setScope(e.target.value)} sx={{ fontSize: 12, height: 32 }}>
              <MenuItem value="Toutes les sociétés">Toutes les sociétés</MenuItem>
              <MenuItem value={selectedCompany.name}>{selectedCompany.name}</MenuItem>
            </Select>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flex: 1 }}>
        <ResponsiveDrawer
          isDesktop={nav.isDesktop}
          open={nav.open}
          onClose={nav.close}
          width={MINI_SIDEBAR_WIDTH}
          bgcolor={colors.sidebar.background}
          hoverHandlers={nav.hoverHandlers}
        >
          <MiniSidebar active={active} onSelect={setActive} onNavigate={nav.close} />
        </ResponsiveDrawer>

        {/* Main content */}
        <Box sx={{ flex: 1, minWidth: 0, p: { xs: 1.5, md: 2.5 }, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(3, 1fr)", md: "repeat(6, 1fr)" }, gap: 1.5 }}>
            {data.kpis.map((kpi) => (
              <ClientKpiTile key={kpi.key} kpi={kpi} />
            ))}
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2, alignItems: "start" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <SectionBarPanel
                icon={BarChartOutlinedIcon}
                title="VÉHICULES DÉCLARÉS PAR SECTION"
                data={data.vehiclesBySection.declares}
                sections={data.sections}
                dataKey="Déclarés"
                color={colors.primary.main}
              />
              <SectionBarPanel
                icon={BarChartOutlinedIcon}
                title="VÉHICULES ACTIFS PAR SECTION"
                data={data.vehiclesBySection.actifs}
                sections={data.sections}
                dataKey="Actifs"
                color={colors.success.main}
              />
              <SectionBarPanel
                icon={BarChartOutlinedIcon}
                title="VÉHICULES INACTIFS PAR SECTION"
                data={data.vehiclesBySection.inactifs}
                sections={data.sections}
                dataKey="Inactifs"
                color={colors.error.main}
              />
            </Box>

            <SubscriptionsPanel icon={DescriptionOutlinedIcon} subscriptions={data.subscriptions} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <ActivitiesPanel icon={TrendingUpOutlinedIcon} activities={data.activities} />
              <ComparisonChartPanel activities={data.activities} />
            </Box>
          </Box>

          <FleetMetricsRow metrics={data.fleetMetrics} />

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 2, alignItems: "stretch" }}>
            <OverrunsPanel icon={LocalShippingOutlinedIcon} rows={data.oilChangeOverruns} />
            <AlertsPanel alerts={data.alerts} />
            <FleetSharePiePanel data={data.fleetShareByCompany} />
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: colors.sidebar.background,
          color: "#fff",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: 1.5, md: 4 },
          px: 3,
          py: 1.25,
          fontSize: 12,
        }}
      >
        <Typography sx={{ fontSize: 12 }}>MGPA - Maintenance et Gestion des Parcs Automobiles</Typography>
        <Typography sx={{ fontSize: 12, color: colors.sidebar.icon }}>★ Votre parc, notre priorité !</Typography>
        <Typography sx={{ fontSize: 12 }}>(+237) 233 42 34 56</Typography>
        <Typography sx={{ fontSize: 12 }}>www.soretac.cm</Typography>
        <Typography sx={{ fontSize: 12 }}>contact@soretac.cm</Typography>
      </Box>
    </Box>
  );
}
