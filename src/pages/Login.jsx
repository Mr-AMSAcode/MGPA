import { Box, Paper, Button, Checkbox, FormControlLabel, Typography, Link } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { colors, spacing } from "../theme";
import { useAuthStore } from "../store/authStore";
import BrandedAuthLayout from "./client-auth/BrandedAuthLayout";
import IconField from "./client-auth/IconField";
import TrustBadges from "./client-auth/TrustBadges";

/** Petit trait horizontal décoratif encadrant l'icône du titre / le badge "SÉCURISÉ" (même style que le portail client). */
function FlankLine() {
  return <Box sx={{ width: 32, height: "1px", backgroundColor: colors.primary.light }} />;
}

/**
 * Écran de connexion administrateur MGPA (portail interne, cf. cahier des
 * charges §4 "Gestion des accès"). Distinct du portail client
 * (/connexion-client, société + code d'accès) — voir authStore.js.
 * Mode démo : n'importe quel email/mot de passe non vides connecte
 * l'utilisateur (voir useAuthStore.loginAdmin) — à remplacer par un vrai
 * appel d'authentification une fois le back-end branché (USE_MOCK à false).
 */
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: "", password: "", remember: true } });
  const loginAdmin = useAuthStore((s) => s.loginAdmin);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async ({ email }) => {
    await new Promise((r) => setTimeout(r, 400));
    loginAdmin(email);
    toast.success("Connexion réussie — bienvenue sur MGPA");
    navigate(location.state?.from?.pathname ?? "/accueil", { replace: true });
  };

  return (
    <BrandedAuthLayout>
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
              CONNEXION SÉCURISÉE
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 13 }}>
              Accès réservé à l'équipe MGPA
            </Typography>
          </Box>

          <IconField
            icon={EmailOutlinedIcon}
            label="Email"
            type="email"
            autoComplete="username"
            error={Boolean(errors.email)}
            helperText={errors.email ? "Email requis" : " "}
            {...register("email", { required: true })}
          />

          <IconField
            icon={LockOutlinedIcon}
            label="Mot de passe"
            type="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password ? "Mot de passe requis" : " "}
            {...register("password", { required: true })}
          />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: -1 }}>
            <FormControlLabel control={<Checkbox defaultChecked {...register("remember")} />} label="Se souvenir de moi" />
            <Link component="button" type="button" underline="hover" sx={{ fontSize: 13 }}>
              Mot de passe oublié ?
            </Link>
          </Box>

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
            Démo — toute adresse email et mot de passe non vides fonctionnent.
          </Typography>

          <Typography variant="caption" sx={{ textAlign: "center" }}>
            Vous êtes un client ?{" "}
            <Link component={RouterLink} to="/connexion-client" underline="hover">
              Accédez à votre espace
            </Link>
          </Typography>
        </Paper>

        <TrustBadges />
      </Box>
    </BrandedAuthLayout>
  );
}
