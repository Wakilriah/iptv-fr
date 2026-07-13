# Rapport d'Analyse du Projet IPTV-FR

## 1. Vue d'Ensemble du Projet
Le projet **IPTV-FR** est une application web moderne (Landing Page & E-commerce) conçue pour la vente d'abonnements IPTV. Elle est optimisée pour la conversion, la rapidité, et l'accessibilité.

### Technologies Clés
- **Framework Front-end :** Next.js 15 (App Router)
- **Bibliothèque UI :** React 19
- **Style :** Tailwind CSS
- **Base de données :** SQLite (via Prisma ORM) pour la gestion des commandes et de l'administration.
- **Déploiement :** Vercel
- **Langage :** TypeScript

---

## 2. Architecture & Composants Principaux

### 2.1 Interface Utilisateur (UI)
- **Hero Section Animé (`AnimatedHero.tsx`) :** Section d'accueil dynamique avec des animations fluides.
- **Section Tarifs & Packs :** Affichage clair des offres (Standard, Premium, VIP) avec appels à l'action (CTA) optimisés.
- **Catalogue VOD (`TrendingVOD.tsx`) :** Affichage des films et séries tendances avec requêtes API vers TMDB pour récupérer les affiches en temps réel.
- **Explorateur de Chaînes (`src/app/chaines/page.tsx`) :** Interface permettant aux utilisateurs de rechercher et filtrer les chaînes par pays.
- **Modal de Commande (`OrderModal.tsx`) :** Formulaire de capture de leads qui redirige directement vers WhatsApp pour finaliser l'achat.

### 2.2 Espace Administration (`/admin`)
- **Authentification :** Système de login sécurisé par JWT (`/api/admin/login`).
- **Dashboard :** Visualisation des commandes générées par les clients.

---

## 3. Optimisations Récentes & Résolutions

### 3.1 Tracking & Marketing (TikTok Pixel)
L'intégration du Pixel TikTok a été entièrement refondue pour répondre aux normes strictes de commerce électronique (Events API) :
- **Dédoublonnage :** Suppression des événements parasites. `ViewContent` ne se déclenche plus lors de l'achat.
- **Structure des Payloads :** Implémentation du format `contents: [{content_id, content_type, content_name, quantity}]` avec transmission correcte de la `value` et de la `currency` (EUR).
- **Gestion des Concurrences (Race Conditions) :** Ajout d'un système de *retry* asynchrone (500ms) garantissant que les événements ne sont jamais perdus lors du chargement de la page.

### 3.2 Performance & SEO (Lighthouse 95+ Mobile)
- **Images :** Conversion massive des bannières et logos au format `WebP`.
- **CSS Blocking :** Nettoyage du fichier `globals.css` et optimisation du chargement des polices (Inter, Roboto).
- **SEO :** Métadonnées complètes ajoutées à chaque page, balisage sémantique HTML5.

### 3.3 Accessibilité & UI Mobile (WCAG 2.2 AA)
- **Contraste :** Ajustement global des couleurs (ex: le bouton de contact WhatsApp) pour garantir un ratio de contraste d'au moins 4.5:1.
- **Responsive Design :** 
  - Résolution des problèmes de débordement horizontal (Horizontal Overflow) sur mobile causés par des largeurs fixes (`100vw`, `w-[900px]`).
  - Ajustement contextuel des textes (ex: masquage du texte "VOD" sur les petits écrans pour éviter la cassure des boutons).

---

## 4. Recommandations Futures

Bien que le projet soit actuellement très performant, voici quelques pistes d'amélioration pour le futur :
1. **Intégration de Paiement Automatique :** Remplacer (ou proposer en alternative) le tunnel WhatsApp par une passerelle de paiement comme Stripe.
2. **Mise en cache Redis :** Mettre en cache les requêtes TMDB pour la section VOD afin d'améliorer le Time-to-First-Byte (TTFB).
3. **Tests E2E :** Intégrer Cypress ou Playwright pour simuler et sécuriser automatiquement le parcours d'achat.

*Généré par Antigravity - 2026*
