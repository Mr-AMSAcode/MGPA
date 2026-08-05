import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/env";
import { useAuthStore } from "../store/authStore";

/**
 * Client HTTP unique pour tous les appels au back-end MGPA.
 * Utilisé uniquement quand `USE_MOCK` (src/config/env.js) est à `false`.
 *
 * - Injecte automatiquement le token d'authentification (Bearer) sur chaque requête.
 * - Déconnecte l'utilisateur et affiche un message clair en cas de 401 (session expirée).
 * - Centralise l'affichage des erreurs réseau/serveur pour éviter de dupliquer
 *   des try/catch dans chaque service.
 */
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      useAuthStore.getState().logout();
      toast.error("Session expirée, veuillez vous reconnecter.");
    } else if (status >= 500) {
      toast.error("Le serveur MGPA est momentanément indisponible. Réessayez plus tard.");
    } else if (!error.response) {
      toast.error("Impossible de contacter le serveur — vérifiez votre connexion.");
    }

    return Promise.reject(error);
  }
);
