import { Paper, Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Chip, LinearProgress } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import OilBarrelOutlinedIcon from "@mui/icons-material/OilBarrelOutlined";
import TireRepairOutlinedIcon from "@mui/icons-material/TireRepairOutlined";
import BatteryAlertOutlinedIcon from "@mui/icons-material/BatteryAlertOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { colors, spacing } from "../../theme";
import { STATUS_TONE } from "../../data/mockClientDashboard";

// Panneaux du tableau de bord client (ClientDashboard.jsx) : un composant par
// widget du mockup `dashboard_app` (graphiques par section, abonnements,
// activités, jauge/coûts, dépassements, alertes, répartition par société).
// Regroupés dans un seul fichier car ils ne sont utilisés que par cette page.
const ALERT_ICONS = {
  assurance: ShieldOutlinedIcon,
  visite: FactCheckOutlinedIcon,
  vidange: OilBarrelOutlinedIcon,
  pneus: TireRepairOutlinedIcon,
  batterie: BatteryAlertOutlinedIcon,
  moteur: ReportProblemOutlinedIcon,
};

const ALERT_TONE = {
  error: { bg: "#FFEBEE", fg: colors.error.main },
  warning: { bg: "#FFF8E1", fg: "#EF6C00" },
  info: { bg: "#ECEFF1", fg: "#455A64" },
};

function PanelHeader({ icon: Icon, title }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
      <Icon sx={{ fontSize: 18, color: colors.primary.main }} />
      <Typography sx={{ fontWeight: 700, fontSize: 13, letterSpacing: 0.4, color: colors.primary.dark }}>
        {title}
      </Typography>
    </Box>
  );
}

export function SectionBarPanel({ icon, title, data, sections, dataKey, color }) {
  const chartData = sections.map((s, i) => ({ section: s, value: data[i] }));
  return (
    <Paper sx={{ p: 2, boxShadow: spacing.shadow.card, height: 168 }}>
      <PanelHeader icon={icon} title={title} />
      <ResponsiveContainer width="100%" height="78%">
        <BarChart data={chartData} margin={{ top: 14, right: 4, left: -20, bottom: 0 }}>
          <XAxis dataKey="section" tick={{ fontSize: 9 }} interval={0} />
          <YAxis tick={{ fontSize: 9 }} />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} name={dataKey}>
            <LabelList dataKey="value" position="top" style={{ fontSize: 9, fontWeight: 700, fill: "#37474F" }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export function SubscriptionsPanel({ icon, subscriptions }) {
  return (
    <Paper sx={{ p: 2, boxShadow: spacing.shadow.card }}>
      <PanelHeader icon={icon} title="SUIVI DES ABONNEMENTS" />
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 10.5 }}>Société</TableCell>
              <TableCell sx={{ fontSize: 10.5 }}>Échéance</TableCell>
              <TableCell align="center" sx={{ fontSize: 10.5 }}>Mois</TableCell>
              <TableCell sx={{ fontSize: 10.5 }}>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((s) => (
              <TableRow key={s.societe}>
                <TableCell sx={{ fontSize: 10.5, fontWeight: 600 }}>{s.societe}</TableCell>
                <TableCell sx={{ fontSize: 10.5 }}>{s.fin}</TableCell>
                <TableCell align="center" sx={{ fontSize: 10.5, fontWeight: 700, color: STATUS_TONE[s.statut].color }}>
                  {s.mois}
                </TableCell>
                <TableCell>
                  <Chip
                    label={s.statut}
                    size="small"
                    sx={{
                      fontSize: 10,
                      height: 20,
                      fontWeight: 700,
                      backgroundColor: STATUS_TONE[s.statut].bg,
                      color: STATUS_TONE[s.statut].color,
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}

export function ActivitiesPanel({ icon, activities }) {
  return (
    <Paper sx={{ p: 2, boxShadow: spacing.shadow.card }}>
      <PanelHeader icon={icon} title="ACTIVITÉS DES CLIENTS" />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 10.5 }}></TableCell>
            <TableCell align="right" sx={{ fontSize: 10.5 }}>Mois (M)</TableCell>
            <TableCell align="right" sx={{ fontSize: 10.5 }}>Mois préc. (M-1)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((a) => (
            <TableRow key={a.label}>
              <TableCell sx={{ fontSize: 10.5, display: "flex", alignItems: "center", gap: 0.5 }}>
                {a.alert && <ReportProblemOutlinedIcon sx={{ fontSize: 13, color: colors.error.main }} />}
                {a.label}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: 11, fontWeight: 700 }}>{a.m}</TableCell>
              <TableCell align="right" sx={{ fontSize: 11, color: "text.secondary" }}>{a.m1}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export function ComparisonChartPanel({ activities }) {
  const chartData = activities.map((a) => ({
    label: a.label.split(" ").slice(0, 2).join(" "),
    "Mois (M)": a.m,
    "Mois précédent (M-1)": a.m1,
  }));
  return (
    <Paper sx={{ p: 2, boxShadow: spacing.shadow.card, height: 190 }}>
      <Typography sx={{ fontWeight: 700, fontSize: 12, color: colors.primary.dark, mb: 1 }}>
        COMPARAISON M VS M-1
      </Typography>
      <ResponsiveContainer width="100%" height="82%">
        <BarChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <XAxis dataKey="label" tick={{ fontSize: 8 }} interval={0} />
          <YAxis tick={{ fontSize: 9 }} />
          <Tooltip wrapperStyle={{ fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 9 }} />
          <Bar dataKey="Mois (M)" fill={colors.primary.main} radius={[3, 3, 0, 0]} />
          <Bar dataKey="Mois précédent (M-1)" fill="#B0BEC5" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}

export function FleetMetricsRow({ metrics }) {
  const tiles = [
    { label: "Coût total du parc", value: metrics.coutTotal.value, unit: metrics.coutTotal.unit },
    { label: "Parcours du mois", value: metrics.parcours.value, unit: metrics.parcours.unit },
    { label: "Consommation moyenne", value: metrics.consommation.value, unit: metrics.consommation.unit },
  ];

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" }, gap: 2 }}>
      <Paper sx={{ p: 2, boxShadow: spacing.shadow.card, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary", mb: 0.5 }}>
          DISPONIBILITÉ DU PARC
        </Typography>
        <Box sx={{ position: "relative", width: 110, height: 58, overflow: "hidden" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 110,
              height: 110,
              borderRadius: "50%",
              background: `conic-gradient(from -90deg, ${colors.primary.main} 0deg ${
                metrics.disponibilite * 1.8
              }deg, #E3EAF3 ${metrics.disponibilite * 1.8}deg 180deg, transparent 180deg 360deg)`,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 14,
              left: 14,
              width: 82,
              height: 82,
              borderRadius: "50%",
              backgroundColor: "#fff",
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              bottom: 2,
              left: 0,
              right: 0,
              textAlign: "center",
              fontWeight: 800,
              fontSize: 18,
              color: colors.primary.dark,
            }}
          >
            {metrics.disponibilite}%
          </Typography>
        </Box>
      </Paper>
      {tiles.map((t) => (
        <Paper
          key={t.label}
          sx={{
            p: 2,
            boxShadow: spacing.shadow.card,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary", textAlign: "center" }}>
            {t.label}
          </Typography>
          <Typography className="kpi-value" sx={{ fontSize: 22, color: colors.primary.dark, mt: 0.5 }}>
            {t.value}
          </Typography>
          <Typography sx={{ fontSize: 11, color: "text.secondary" }}>{t.unit}</Typography>
        </Paper>
      ))}
    </Box>
  );
}

export function OverrunsPanel({ icon, rows }) {
  return (
    <Paper sx={{ p: 2, boxShadow: spacing.shadow.card, height: "100%" }}>
      <PanelHeader icon={icon} title="DÉPASSEMENTS DES VIDANGES" />
      <Box sx={{ overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 360 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 10.5 }}>Société</TableCell>
              <TableCell sx={{ fontSize: 10.5 }}>Section</TableCell>
              <TableCell align="right" sx={{ fontSize: 10.5 }}>Véh.</TableCell>
              <TableCell sx={{ fontSize: 10.5 }}>% du parc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.societe + r.section}>
                <TableCell sx={{ fontSize: 10.5, fontWeight: 600 }}>{r.societe}</TableCell>
                <TableCell sx={{ fontSize: 10.5 }}>{r.section}</TableCell>
                <TableCell align="right" sx={{ fontSize: 10.5 }}>{r.vehicules}</TableCell>
                <TableCell sx={{ minWidth: 90 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                    <LinearProgress
                      variant="determinate"
                      value={r.pct * 4}
                      sx={{
                        width: 40,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "#FFEBEE",
                        "& .MuiLinearProgress-bar": { backgroundColor: colors.error.main },
                      }}
                    />
                    <Typography sx={{ fontSize: 10.5, fontWeight: 700 }}>{r.pct}%</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}

export function AlertsPanel({ alerts }) {
  return (
    <Paper sx={{ p: 2, boxShadow: spacing.shadow.card, height: "100%" }}>
      <PanelHeader icon={NotificationsActiveOutlinedIcon} title="ALERTES EN COURS" />
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
        {alerts.map((a) => {
          const Icon = ALERT_ICONS[a.key];
          const tone = ALERT_TONE[a.color];
          return (
            <Box
              key={a.key}
              sx={{
                textAlign: "center",
                p: 1,
                borderRadius: "12px",
                backgroundColor: tone.bg,
              }}
            >
              <Icon sx={{ color: tone.fg, fontSize: 20 }} />
              <Typography sx={{ fontWeight: 800, fontSize: 18, color: tone.fg, lineHeight: 1.2 }}>{a.value}</Typography>
              <Typography sx={{ fontSize: 9.5, fontWeight: 600, color: "text.secondary" }}>{a.label}</Typography>
              <Typography sx={{ fontSize: 9, color: tone.fg }}>{a.sub}</Typography>
            </Box>
          );
        })}
      </Box>
    </Paper>
  );
}

export function FleetSharePiePanel({ data }) {
  return (
    <Paper sx={{ p: 2, boxShadow: spacing.shadow.card, height: "100%" }}>
      <Typography sx={{ fontWeight: 700, fontSize: 12, color: colors.primary.dark, mb: 1 }}>
        RÉPARTITION DES VÉHICULES ACTIFS PAR SOCIÉTÉ
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ width: 120, height: 120, flexShrink: 0 }}>
          <PieChart width={120} height={120}>
            <Pie data={data} dataKey="value" cx={60} cy={60} innerRadius={30} outerRadius={56} paddingAngle={1}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {data.map((d) => (
            <Box key={d.name} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: "2px", backgroundColor: d.color }} />
              <Typography sx={{ fontSize: 10, color: "text.secondary" }}>
                {d.name} <b>{d.value}%</b>
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
