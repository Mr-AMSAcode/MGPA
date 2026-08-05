const DEFAULT_LATENCY_MS = 300;

/**
 * Simule la latence réseau d'un vrai appel API pendant que USE_MOCK est actif.
 * Centralisé ici pour éviter de dupliquer un `setTimeout` dans chaque service.
 */
export function simulateLatency(data, ms = DEFAULT_LATENCY_MS) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
