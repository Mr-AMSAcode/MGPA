import { create } from "zustand";

/**
 * État d'authentification global (Zustand).
 *
 * Deux portails distincts partagent ce store : le portail admin (`/login`,
 * email + mot de passe) et le portail client (`/connexion-client`, société +
 * code d'accès puis authentification personnelle) — cf. cahier des charges
 * §4 "Gestion des accès". `user.role` ("admin" | "client") distingue les deux
 * une fois connecté ; `user.companyId`/`companyName` ne sont renseignés que
 * pour un client, rattaché à une société précise.
 *
 * `token` est prévu pour recevoir le JWT renvoyé par le back-end une fois
 * l'API branchée (cf. cahier des charges §8 "Authentification & Autorisation :
 * OAuth2, JWT") — il est lu automatiquement par `httpClient` pour l'en-tête
 * `Authorization`. En mode mock, les actions ci-dessous génèrent un jeton
 * factice pour que ce circuit soit déjà testable de bout en bout.
 */
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  /** Connexion administrateur MGPA (portail interne, email + mot de passe). */
  loginAdmin: (email, token = "demo-token") =>
    set({
      user: { role: "admin", email, name: "Administrateur", roleLabel: "Super Admin" },
      token,
      isAuthenticated: true,
    }),

  /** Connexion (ou inscription) d'un client rattaché à une société validée au portail client. */
  loginClient: ({ name, email, company }, token = "demo-token") =>
    set({
      user: {
        role: "client",
        email,
        name,
        roleLabel: "Client",
        companyId: company.id,
        companyName: company.name,
      },
      token,
      isAuthenticated: true,
    }),

  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
