import { Paper, Box, Typography, Button } from "@mui/material";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CLIENT_COMPANIES } from "../../data/mockAccueil";
import { colors, spacing } from "../../theme";
import IconField from "./IconField";
import TrustBadges from "./TrustBadges";

/** Petit trait horizontal décoratif encadrant l'icône du titre / le badge "SÉCURISÉ". */
function FlankLine() {
  return <Box sx={{ width: 32, height: "1px", backgroundColor: colors.primary.light }} />;
}

/**
 * Étape 1 du portail client : identification de la société (nom + code
 * d'accès). En cas de succès, `onValidated(company)` est appelé pour passer
 * à l'authentification personnelle (cf. ClientLoginFlow.jsx).
 */
export default function ClientCompanyGate({ onValidated }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ defaultValues: { companyName: "", accessCode: "" } });

  const onSubmit = async ({ companyName, accessCode }) => {
    await new Promise((r) => setTimeout(r, 400));
    const company = CLIENT_COMPANIES.find(
      (c) => c.name.toLowerCase().trim() === companyName.toLowerCase().trim()
    );
    if (!company || company.accessCode.toLowerCase() !== accessCode.toLowerCase().trim()) {
      setError("accessCode", { message: "Nom d'entreprise ou code d'accès incorrect" });
      toast.error("Nom d'entreprise ou code d'accès incorrect");
      return;
    }
    onValidated(company);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", gap: 2 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 2.5, md: 3 },
          boxShadow: spacing.shadow.card,
          display: "flex",
          flexDirection: "column",
          gap: 1.75,
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 0.5 }}>
            <FlankLine />
            <ShieldOutlinedIcon sx={{ color: colors.primary.main, fontSize: 28 }} />
            <FlankLine />
          </Box>
          <Typography sx={{ fontWeight: 800, fontSize: 20, color: colors.primary.dark }}>
            AUTHENTIFICATION
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 13 }}>
            Veuillez vous connecter pour accéder à votre espace
          </Typography>
        </Box>

        <IconField
          icon={ApartmentOutlinedIcon}
          label="Nom de l'entreprise"
          error={Boolean(errors.companyName)}
          helperText={errors.companyName ? "Nom d'entreprise requis" : " "}
          {...register("companyName", { required: true })}
        />

        <IconField
          icon={LockOutlinedIcon}
          label="Code d'accès"
          type="password"
          error={Boolean(errors.accessCode)}
          helperText={errors.accessCode?.message ?? " "}
          {...register("accessCode", { required: true })}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isSubmitting}
          startIcon={<LoginOutlinedIcon />}
          sx={{ fontWeight: 700 }}
        >
          SE CONNECTER
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
          <FlankLine />
          <VerifiedUserOutlinedIcon sx={{ fontSize: 16, color: colors.primary.main }} />
          <Typography variant="caption" sx={{ fontWeight: 700, color: colors.primary.main }}>
            SÉCURISÉ
          </Typography>
          <FlankLine />
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
          Démo — essayez « Société Alpha » avec le code « ALPHA2026 ».
        </Typography>
      </Paper>

      <TrustBadges />
    </Box>
  );
}
