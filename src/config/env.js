/**
 * Configuration d'environnement (variables VITE_* définies dans .env / .env.local).
 * Point d'entrée unique : le reste du code ne doit jamais lire `import.meta.env`
 * directement, pour garder un seul endroit à modifier si les noms changent.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

/**
 * Interrupteur mock/API réelle. À `true` : les services renvoient les données
 * de démonstration (src/data/) avec une latence simulée. À `false` : les mêmes
 * fonctions appellent le back-end via `httpClient` (src/services/httpClient.js).
 * Basculer ce flag ne doit rien changer côté composants/hooks : les services
 * gardent la même signature dans les deux cas.
 */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
