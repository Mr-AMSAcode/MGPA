import { useState } from "react";
import { Paper, Box, Typography, Button, Tabs, Tab, Avatar, IconButton } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useForm } from "react-hook-form";
import { colors, spacing } from "../../theme";
import IconField from "./IconField";

/**
 * Étape 2 du portail client : authentification personnelle, personnalisée
 * avec les informations de la société validée à l'étape 1 (nom, icône,
 * couleur). Deux onglets : connexion à un compte existant, ou inscription
 * (accessible uniquement après validation du nom d'entreprise + code
 * d'accès à l'étape précédente).
 *
 * @param {object} company - société validée (cf. tenantStore/mockAccueil).
 * @param {(values: {name, email}) => void} onAuthenticated
 * @param {() => void} onBack - retour à l'étape 1 (changer de société).
 */
export default function ClientPersonalAuth({ company, onAuthenticated, onBack }) {
  const [tab, setTab] = useState(0); // 0 = connexion, 1 = inscription
  const CompanyIcon = company.icon;

  const loginForm = useForm({ defaultValues: { email: "", password: "" } });
  const registerForm = useForm({ defaultValues: { name: "", email: "", password: "" } });

  const submitLogin = async ({ email }) => {
    await new Promise((r) => setTimeout(r, 400));
    onAuthenticated({ name: email.split("@")[0] || "Client", email });
  };

  const submitRegister = async ({ name, email }) => {
    await new Promise((r) => setTimeout(r, 400));
    onAuthenticated({ name, email });
  };

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 420,
        p: { xs: 2.5, md: 3 },
        boxShadow: spacing.shadow.card,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton size="small" onClick={onBack}>
          <ArrowBackOutlinedIcon fontSize="small" />
        </IconButton>
        <Avatar sx={{ bgcolor: company.color, width: 36, height: 36 }}>
          <CompanyIcon sx={{ fontSize: 18, color: "#fff" }} />
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{company.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            Espace personnel
          </Typography>
        </Box>
      </Box>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
        <Tab label="Se connecter" />
        <Tab label="S'inscrire" />
      </Tabs>

      {tab === 0 && (
        <Box component="form" onSubmit={loginForm.handleSubmit(submitLogin)} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <IconField
            icon={EmailOutlinedIcon}
            label="Email"
            type="email"
            error={Boolean(loginForm.formState.errors.email)}
            helperText={loginForm.formState.errors.email ? "Email requis" : " "}
            {...loginForm.register("email", { required: true })}
          />
          <IconField
            icon={LockOutlinedIcon}
            label="Mot de passe"
            type="password"
            error={Boolean(loginForm.formState.errors.password)}
            helperText={loginForm.formState.errors.password ? "Mot de passe requis" : " "}
            {...loginForm.register("password", { required: true })}
          />
          <Button type="submit" variant="contained" size="large" startIcon={<LoginOutlinedIcon />} sx={{ fontWeight: 700 }}>
            SE CONNECTER
          </Button>
        </Box>
      )}

      {tab === 1 && (
        <Box component="form" onSubmit={registerForm.handleSubmit(submitRegister)} sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          <IconField
            icon={PersonOutlinedIcon}
            label="Nom complet"
            error={Boolean(registerForm.formState.errors.name)}
            helperText={registerForm.formState.errors.name ? "Nom requis" : " "}
            {...registerForm.register("name", { required: true })}
          />
          <IconField
            icon={EmailOutlinedIcon}
            label="Email"
            type="email"
            error={Boolean(registerForm.formState.errors.email)}
            helperText={registerForm.formState.errors.email ? "Email requis" : " "}
            {...registerForm.register("email", { required: true })}
          />
          <IconField
            icon={LockOutlinedIcon}
            label="Mot de passe"
            type="password"
            error={Boolean(registerForm.formState.errors.password)}
            helperText={registerForm.formState.errors.password ? "Mot de passe requis" : " "}
            {...registerForm.register("password", { required: true })}
          />
          <Button type="submit" variant="contained" size="large" startIcon={<PersonAddAltOutlinedIcon />} sx={{ fontWeight: 700 }}>
            CRÉER MON COMPTE
          </Button>
        </Box>
      )}

      <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
        Démo — tous les champs non vides fonctionnent.
      </Typography>
    </Paper>
  );
}
