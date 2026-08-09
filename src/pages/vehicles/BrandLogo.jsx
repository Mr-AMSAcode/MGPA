import { Box, Typography } from "@mui/material";

/**
 * Logos de marque du listing véhicules (cf. mockup `vehicule.jpg`, colonne
 * "Marque"). Aucun asset officiel sous licence n'est disponible dans le
 * projet — reconstitutions vectorielles simplifiées (formes géométriques du
 * vrai logo) pour les marques à symbole, "wordmark" stylisé pour les
 * marques dont l'identité visuelle réelle est avant tout typographique
 * (Isuzu, Caterpillar...), comme sur le mockup lui-même (ligne Isuzu = texte
 * seul, sans icône).
 */
const ICON_BRANDS = {
  Toyota: (
    <svg viewBox="0 0 40 24" width="34" height="20">
      <ellipse cx="20" cy="12" rx="18" ry="10" fill="none" stroke="#333" strokeWidth="1.4" />
      <ellipse cx="20" cy="12" rx="7" ry="10" fill="none" stroke="#333" strokeWidth="1.4" />
      <ellipse cx="20" cy="12" rx="18" ry="4.2" fill="none" stroke="#333" strokeWidth="1.4" />
    </svg>
  ),
  Nissan: (
    <svg viewBox="0 0 32 32" width="26" height="26">
      <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="1.6" />
      <rect x="5" y="13.5" width="22" height="5" fill="#333" />
    </svg>
  ),
  Mercedes: (
    <svg viewBox="0 0 32 32" width="26" height="26">
      <circle cx="16" cy="16" r="13" fill="none" stroke="#333" strokeWidth="1.6" />
      <line x1="16" y1="16" x2="16" y2="4.5" stroke="#333" strokeWidth="1.6" />
      <line x1="16" y1="16" x2="6.5" y2="22" stroke="#333" strokeWidth="1.6" />
      <line x1="16" y1="16" x2="25.5" y2="22" stroke="#333" strokeWidth="1.6" />
    </svg>
  ),
  Renault: (
    <svg viewBox="0 0 32 32" width="24" height="24">
      <polygon points="16,4 27,16 16,28 5,16" fill="none" stroke="#333" strokeWidth="1.8" />
    </svg>
  ),
  Volvo: (
    <svg viewBox="0 0 32 32" width="26" height="26">
      <circle cx="14" cy="18" r="9.5" fill="none" stroke="#333" strokeWidth="1.6" />
      <line x1="7" y1="26" x2="27" y2="5" stroke="#333" strokeWidth="2" />
      <polygon points="27,5 20,7 25,12" fill="#333" />
    </svg>
  ),
  Mitsubishi: (
    <svg viewBox="0 0 32 32" width="24" height="24">
      <polygon points="16,3 20,11 16,15 12,11" fill="#E60012" />
      <polygon points="6,24 9,15 15,19 12,28" fill="#E60012" />
      <polygon points="26,24 23,15 17,19 20,28" fill="#E60012" />
    </svg>
  ),
  Hyundai: (
    <svg viewBox="0 0 40 24" width="34" height="20">
      <ellipse cx="20" cy="12" rx="18" ry="10.5" fill="none" stroke="#002C5F" strokeWidth="1.6" />
      <text x="21" y="18" fontSize="15" fontWeight="800" fontStyle="italic" textAnchor="middle" fill="#002C5F" transform="skewX(-10)">
        H
      </text>
    </svg>
  ),
  MAN: (
    <svg viewBox="0 0 32 32" width="26" height="26">
      <circle cx="16" cy="16" r="14" fill="none" stroke="#333" strokeWidth="1.6" />
      <text x="16" y="19.5" fontSize="8.5" fontWeight="800" textAnchor="middle" fill="#333">
        MAN
      </text>
    </svg>
  ),
  Ford: (
    <svg viewBox="0 0 44 26" width="38" height="22">
      <ellipse cx="22" cy="13" rx="21" ry="12" fill="#00274E" />
      <text x="22" y="18.5" fontSize="14" fontStyle="italic" fontFamily="Georgia, 'Times New Roman', serif" textAnchor="middle" fill="#fff">
        Ford
      </text>
    </svg>
  ),
};

const WORDMARK_BRANDS = {
  Isuzu: { text: "ISUZU", color: "#C8102E", fontStyle: "italic" },
  Dacia: { text: "DACIA", color: "#1A4C8B" },
  Peugeot: { text: "PEUGEOT", color: "#111" },
  Komatsu: { text: "KOMATSU", color: "#00378A", fontStyle: "italic" },
  Hyster: { text: "HYSTER", color: "#F7941E", fontStyle: "italic" },
  Caterpillar: { text: "CAT", color: "#111", bg: "#FFCD11" },
};

/** Rendu du logo (icône vectorielle ou wordmark) pour une marque donnée. */
export default function BrandLogo({ marque }) {
  if (ICON_BRANDS[marque]) return <Box sx={{ display: "flex", alignItems: "center" }}>{ICON_BRANDS[marque]}</Box>;

  const w = WORDMARK_BRANDS[marque];
  if (w) {
    return (
      <Typography
        component="span"
        sx={{
          fontSize: 12.5,
          fontWeight: 800,
          fontStyle: w.fontStyle ?? "normal",
          color: w.color,
          letterSpacing: 0.3,
          ...(w.bg && { backgroundColor: w.bg, borderRadius: "4px", px: 0.6, py: 0.1 }),
        }}
      >
        {w.text}
      </Typography>
    );
  }

  return null;
}

export { ICON_BRANDS, WORDMARK_BRANDS };
