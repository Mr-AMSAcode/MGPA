import { createTheme } from "@mui/material/styles";
import { colors } from "./colors";
import { typography } from "./typography";
import { spacing } from "./spacing";

/**
 * Thème MUI généré à partir de la charte graphique (colors.js/typography.js/
 * spacing.js) : palette, typographie et overrides de composants (boutons,
 * cartes, champs, tableaux) pour que chaque écran respecte automatiquement
 * les règles visuelles sans les redéfinir localement.
 */
export const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    success: colors.success,
    error: colors.error,
    info: colors.info,
    warning: colors.warning,
    background: {
      default: colors.neutral.background,
      paper: colors.neutral.surface,
    },
  },
  typography,
  shape: {
    borderRadius: spacing.radius.field,
  },
  spacing: spacing.base,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: spacing.radius.button,
          height: 48,
          boxShadow: spacing.shadow.soft,
          transition: `all ${spacing.transition} ease`,
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0,0,0,.12)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: spacing.radius.card,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: spacing.radius.card,
          boxShadow: spacing.shadow.card,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: spacing.radius.field,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary.main,
          "& .MuiTableCell-root": {
            color: "#FFFFFF",
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root:nth-of-type(odd)": {
            backgroundColor: "#FAFBFC",
          },
          "& .MuiTableRow-root:hover": {
            backgroundColor: colors.primary.light,
          },
        },
      },
    },
  },
});

export { colors, spacing };
