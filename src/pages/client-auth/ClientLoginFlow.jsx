import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";
import { useTenantStore } from "../../store/tenantStore";
import BrandedAuthLayout from "./BrandedAuthLayout";
import ClientCompanyGate from "./ClientCompanyGate";
import ClientPersonalAuth from "./ClientPersonalAuth";

/**
 * Portail de connexion client (`/connexion-client`), distinct du portail
 * admin (`/login`) — cf. cahier des charges §4 "Gestion des accès". Flux en
 * deux étapes : (1) identification de la société par nom + code d'accès,
 * (2) authentification personnelle (connexion ou inscription), personnalisée
 * avec les informations de la société validée à l'étape 1.
 */
export default function ClientLoginFlow() {
  const [company, setCompany] = useState(null);
  const loginClient = useAuthStore((s) => s.loginClient);
  const selectCompany = useTenantStore((s) => s.selectCompany);
  const navigate = useNavigate();

  const handleAuthenticated = ({ name, email }) => {
    selectCompany(company);
    loginClient({ name, email, company });
    toast.success(`Bienvenue ${name} — ${company.name}`);
    navigate("/dashboard", { replace: true });
  };

  return (
    <BrandedAuthLayout>
      {company ? (
        <ClientPersonalAuth company={company} onAuthenticated={handleAuthenticated} onBack={() => setCompany(null)} />
      ) : (
        <ClientCompanyGate onValidated={setCompany} />
      )}
    </BrandedAuthLayout>
  );
}
