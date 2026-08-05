# MGPA — Maintenance et Gestion des Parcs Automobiles

Front-end web de MGPA, application de gestion de parc automobile multi-sociétés
("Votre Parc en un Clic"). Construit à partir du cahier des charges et de la
charte graphique fournis par le client.

## Stack technique

- **React 19** + **Vite**
- **Material UI (MUI)** — composants + thème généré depuis la charte graphique (`src/theme/`)
- **React Router** — navigation
- **TanStack Query (React Query)** — cache des appels API/mock
- **Zustand** — état global léger (authentification, société sélectionnée)
- **Axios** — client HTTP (`src/services/httpClient.js`)
- **Recharts** — graphiques
- **React Hook Form** — formulaires
- **React Toastify** — notifications

## Démarrer le projet

```bash
npm install
npm run dev
```

L'application démarre sur `http://localhost:5173`. Aucun back-end n'est requis
pour la démo : toutes les données sont mockées (voir ci-dessous).

## Mode mock ↔ API réelle

Le fichier `.env` (voir `.env.example`) contrôle la source des données :

```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_USE_MOCK=true
```

- `VITE_USE_MOCK=true` (par défaut) : chaque service (`src/services/*.js`)
  renvoie les données de démonstration de `src/data/` avec une latence
  simulée. C'est le mode utilisé pour la démo actuelle.
- `VITE_USE_MOCK=false` : les mêmes fonctions appellent réellement
  `VITE_API_BASE_URL` via `httpClient` (axios, avec injection automatique du
  token d'authentification et gestion centralisée des erreurs). Aucune ligne
  des composants/hooks n'a besoin de changer — seule la variable d'env bascule.

## Structure du projet

```
src/
 ├── assets/         Logo, icônes extraites des mockups client
 ├── components/     Composants réutilisables (KpiCard, PageHeader, ResponsiveDrawer, BurgerButton...)
 ├── config/         Configuration d'environnement (env.js)
 ├── data/           Données mock, au format attendu de la future API
 ├── hooks/          Hooks React Query (useVehicles, useClientDashboard...)
 ├── layouts/        Ossature de l'app (Sidebar, Navbar, MainLayout, navConfig)
 ├── pages/          Écrans (Login, Accueil, Véhicules, Tableau de bord client...)
 ├── routes/         Garde d'authentification (RequireAuth)
 ├── services/       Appels API/mock (un fichier par domaine métier)
 ├── store/          État global Zustand (authStore, tenantStore)
 └── theme/          Thème MUI généré depuis la charte graphique
```

## Responsive & navigation

L'application est utilisable sur mobile, tablette et desktop. Sur les écrans
au-delà de ~900px ("écran normal"), les menus latéraux restent en permanence
visibles. En dessous, ils sont cachés derrière un bouton burger (☰) qui les
ouvre au clic ou au survol — voir `src/hooks/useResponsiveNav.js`,
`src/components/ResponsiveDrawer.jsx` et `src/components/BurgerButton.jsx`,
réutilisés par les 3 barres latérales de l'app (menu principal, sociétés
clientes sur l'Accueil, mini-navigation du tableau de bord client).

## Parcours utilisateur

```
/login → /accueil (choix de la société + les 16 modules)
                 ├── /dashboard        (rapport de suivi, mise en page autonome)
                 ├── /vehicules        (module développé)
                 └── /module/:key      (autres modules : écran "bientôt disponible")
```

## État d'avancement

Développés : Login, Accueil, Tableau de bord client, module Véhicules (liste +
fiche détaillée). Les autres modules listés dans `src/layouts/navConfig.js`
affichent un écran "bientôt disponible" en attendant leur développement —
aucun lien mort dans l'application.
