// Palette officielle — charte graphique MGPA (charte_graphique.txt)
export const colors = {
  primary: {
    main: "#1E88E5", // Bleu Ciel Premium — barre sup., boutons, icônes, liens
    dark: "#1565C0", // Bleu foncé — information, sidebar
    light: "#E3F2FD",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#FFC107", // Jaune Or — KPI, alertes, badges, mise en valeur
    contrastText: "#1565C0",
  },
  success: {
    main: "#43A047", // véhicules actifs, maintenance réalisée, validation
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#E53935", // alertes, véhicules immobilisés, dépassements, erreurs
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#1565C0",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#FFC107",
    contrastText: "#1565C0",
  },
  neutral: {
    background: "#F5F7FA", // fond général
    surface: "#FFFFFF", // cartes, fenêtres, tableaux
  },
  gradient: {
    main: "linear-gradient(180deg, #E3F2FD 0%, #BBDEFB 50%, #FFFFFF 100%)",
  },
  sidebar: {
    background: "#1565C0",
    icon: "#FFC107",
    text: "#FFFFFF",
    activeBackground: "#FFC107",
    activeText: "#1565C0",
  },
  chart: {
    palette: ["#1E88E5", "#FFC107", "#43A047", "#E53935", "#90A4AE"],
  },
};
