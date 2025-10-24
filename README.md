# 🔮 Voyance Premium - Plateforme de Voyance en Ligne

Plateforme professionnelle de consultations de voyance en ligne avec système de chat en temps réel (polling).

## 🌐 URLs

- **Local Dev**: https://3000-ilmymul113dil69asdznb-a402f90a.sandbox.novita.ai
- **GitHub**: https://github.com/revovation6-debug/voyons_clair
- **Production**: À déployer sur Cloudflare Pages

## ✨ Fonctionnalités Actuellement Complétées

### Page Publique ✅
- ✅ Page d'accueil attractive avec design moderne (purple gradient)
- ✅ Section "Nos Experts" avec liste dynamique des voyants
- ✅ Section "Avis Clients" avec affichage dynamique
- ✅ Section "Horoscope" avec 12 signes astrologiques
- ✅ Footer complet avec liens légaux
- ✅ Design responsive (mobile/desktop)

### Authentification ✅
- ✅ Page de connexion (clients, voyants, admin)
- ✅ Page d'inscription clients
- ✅ Gestion des sessions avec cookies
- ✅ Hashage des mots de passe (simple pour MVP)
- ✅ Redirection automatique selon le type d'utilisateur

### Dashboard Administrateur ✅
- ✅ **Statistiques en temps réel**
  - Visites du jour
  - Nombre total de clients inscrits
  - Nombre de voyants actifs
  - Voyants en ligne actuellement
  - Graphiques avec Chart.js (par jour/mois/année)

- ✅ **Gestion des Clients**
  - Liste complète des clients
  - Recherche et filtrage
  - Suppression de comptes

- ✅ **Gestion des Voyants**
  - Création de comptes voyants
  - Liste avec statut (en ligne/hors ligne)
  - Activation/désactivation
  - Suppression de comptes
  - Configuration (email, spécialité, tarifs)

- ✅ **Gestion des Avis**
  - Création d'avis (général ou par voyant)
  - Affichage/masquage des avis
  - Système de notation 1-5 étoiles
  - Suppression d'avis

## 🚧 Fonctionnalités En Cours de Développement

### Dashboard Voyant ⏳
- ⏳ Interface de chat avec clients
- ⏳ Statistiques personnelles (chiffre d'affaires, nombre de consultations)
- ⏳ Historique des conversations
- ⏳ Assistant IA pour suggestions de réponses

### Dashboard Client ⏳
- ⏳ Liste des voyants disponibles
- ⏳ Initier une conversation avec un voyant
- ⏳ Historique des consultations
- ⏳ Système de paiement

### Système de Chat ⏳
- ⏳ Chat en temps réel via polling (MVP)
- ⏳ Gestion des sessions de chat
- ⏳ Calcul automatique des coûts
- ⏳ Notifications

### Intelligence Artificielle ⏳
- ⏳ Intégration IA gratuite pour assistance voyants
- ⏳ Analyse des conversations en temps réel
- ⏳ Suggestions de réponses contextuelles

## 📊 Modèle de Données

### Tables Principales
- **users**: Clients de la plateforme
- **agents**: Voyants avec spécialités et tarifs
- **admins**: Administrateurs du site
- **chat_sessions**: Sessions de consultation
- **messages**: Messages du chat (polling)
- **reviews**: Avis clients
- **visit_stats**: Statistiques de visites
- **transactions**: Historique des paiements
- **ai_suggestions**: Suggestions de l'IA

### Services de Stockage
- **Cloudflare D1**: Base de données SQLite distribuée
- Mode local pour développement (`--local`)

## 🔐 Comptes de Test

### Admin
- Email: `admin@voyance.fr`
- Password: `admin123`
- Dashboard: `/admin/dashboard`

### Voyants
- Marie Martin (Tarot): `marie@voyance.fr` / `agent123`
- Sophie Bernard (Astrologie): `sophie@voyance.fr` / `agent123`
- Lucas Dubois (Numérologie): `lucas@voyance.fr` / `agent123`
- Emma Moreau (Médiumnité): `emma@voyance.fr` / `agent123`

### Clients
- Client 1: `client1@test.fr` / `client123`
- Client 2: `client2@test.fr` / `client123`
- Client 3: `client3@test.fr` / `client123`

## 🛠️ Stack Technique

- **Framework**: Hono (Edge-first web framework)
- **Runtime**: Cloudflare Workers
- **Base de données**: Cloudflare D1 (SQLite)
- **Frontend**: TailwindCSS + Vanilla JS
- **Icons**: Font Awesome
- **Charts**: Chart.js
- **HTTP Client**: Axios
- **Build**: Vite
- **Deployment**: Cloudflare Pages

## 🚀 Développement Local

### Installation
```bash
cd /home/user/webapp
npm install
```

### Base de données
```bash
# Appliquer les migrations
npm run db:migrate:local

# Charger les données de test
npm run db:seed

# Réinitialiser la DB
npm run db:reset
```

### Lancer le serveur
```bash
# Build
npm run build

# Démarrer avec PM2
pm2 start ecosystem.config.cjs

# Ou démarrer directement
npm run dev:sandbox
```

### Commandes utiles
```bash
# Nettoyer le port
npm run clean-port

# Tester l'API
npm test

# Voir les logs
pm2 logs voyance-platform --nostream
```

## 📦 Déploiement sur Cloudflare Pages

### Prérequis
1. Configurer l'API Cloudflare: `setup_cloudflare_api_key`
2. Créer la base de données D1 en production

### Déployer
```bash
# Build
npm run build

# Créer le projet
npx wrangler pages project create voyance-platform --production-branch main

# Déployer
npm run deploy

# Appliquer les migrations en production
npm run db:migrate:prod
```

## 📝 Prochaines Étapes Recommandées

1. **Système de Chat** (Priorité Haute)
   - Implémenter le polling toutes les 2-3 secondes
   - Créer l'interface de chat voyant/client
   - Gérer les sessions actives

2. **Dashboard Voyant** (Priorité Haute)
   - Interface de chat complète
   - Statistiques de productivité
   - Gestion du statut (en ligne/hors ligne)

3. **Dashboard Client** (Priorité Haute)
   - Liste des voyants disponibles
   - Initier une consultation
   - Historique des séances

4. **Intégration IA** (Priorité Moyenne)
   - API gratuite (Hugging Face ou similaire)
   - Analyse contextuelle des messages
   - Suggestions automatiques

5. **Système de Paiement** (Priorité Moyenne)
   - Intégration Stripe ou PayPal
   - Calcul automatique des coûts
   - Historique des transactions

6. **Améliorations Sécurité** (Priorité Haute)
   - Utiliser bcrypt pour hasher les mots de passe
   - Implémenter JWT pour les sessions
   - Rate limiting sur les API
   - Validation des inputs

## 📄 Pages Légales

- Contact: `/contact`
- Politique de confidentialité: `/confidentialite`
- Conditions générales: `/cgv`

## 🔄 Statut du Projet

- ✅ **Démarrage**: Structure de base et configuration
- ✅ **Phase 1**: Authentification et page publique
- ✅ **Phase 2**: Dashboard Admin complet
- 🔄 **Phase 3**: Dashboards Voyant/Client (en cours)
- ⏳ **Phase 4**: Système de chat avec polling
- ⏳ **Phase 5**: Intégration IA
- ⏳ **Phase 6**: Déploiement production

## 📅 Dernière Mise à Jour

**Date**: 24 Octobre 2025  
**Version**: 0.3.0 (MVP en développement)  
**Status**: ✅ Active - En développement actif
