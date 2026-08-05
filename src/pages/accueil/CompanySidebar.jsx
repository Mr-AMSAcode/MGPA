import { Box, Typography, Avatar } from "@mui/material";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import { CLIENT_COMPANIES } from "../../data/mockAccueil";
import { colors } from "../../theme";

/**
 * Contenu de la barre latérale "Sociétés clientes" de l'écran d'accueil
 * (liste des 10 sociétés + sélection du "tenant" actif). Composant
 * présentationnel : le conteneur responsive vient de `ResponsiveDrawer`
 * (appelé avec `bgcolor="transparent"` — cette barre gère son propre fond
 * en verre ci-dessous).
 *
 * Effet "vitre" bleu ciel (glassmorphism) demandé par le client, cf. mémoire
 * projet : fond translucide + flou d'arrière-plan, cartes société elles-mêmes
 * légèrement vitrées plutôt que blanches opaques.
 *
 * @param {object} selectedCompany - société actuellement sélectionnée (tenantStore).
 * @param {(company: object) => void} onSelect - change la société sélectionnée.
 * @param {() => void} [onNavigate] - appelé après une sélection, pour refermer
 *   le tiroir mobile.
 */
export default function CompanySidebar({ selectedCompany, onSelect, onNavigate }) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, rgba(179,229,252,0.45) 0%, rgba(100,181,246,0.30) 100%)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRight: "1px solid rgba(255,255,255,0.5)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          background: "rgba(30,136,229,0.45)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.35)",
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ApartmentOutlinedIcon sx={{ color: "#fff", fontSize: 20 }} />
        </Box>
        <Typography sx={{ color: "#fff", fontWeight: 800, letterSpacing: 0.5, fontSize: 15 }}>
          SOCIÉTÉS CLIENTES
        </Typography>
      </Box>

      <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1, overflowY: "auto", flex: 1 }}>
        {CLIENT_COMPANIES.map((company) => {
          const Icon = company.icon;
          const isSelected = selectedCompany.id === company.id;
          return (
            <Box
              key={company.id}
              onClick={() => {
                onSelect(company);
                onNavigate?.();
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                p: 1,
                pr: 1.5,
                borderRadius: "14px",
                cursor: "pointer",
                background: isSelected ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
                backdropFilter: "blur(8px)",
                border: isSelected ? `1.5px solid ${colors.secondary.main}` : "1px solid rgba(255,255,255,0.6)",
                transition: "all 150ms ease",
                "&:hover": { background: "rgba(255,255,255,0.7)" },
              }}
            >
              <Avatar sx={{ bgcolor: colors.primary.dark, color: "#fff", width: 30, height: 30, fontSize: 11, fontWeight: 700 }}>
                {company.code}
              </Avatar>
              <Avatar sx={{ bgcolor: company.color, width: 30, height: 30 }}>
                <Icon sx={{ fontSize: 16, color: "#fff" }} />
              </Avatar>
              <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: colors.primary.dark }}>
                {company.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
