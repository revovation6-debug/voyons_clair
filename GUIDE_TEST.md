# 🧪 Guide de Test - Voyance Premium

Ce guide vous permet de tester toutes les fonctionnalités de la plateforme.

## 🌐 URL de Test
**Développement**: https://3000-ilmymul113dil69asdznb-a402f90a.sandbox.novita.ai

---

## 🔐 Comptes de Test

### Admin
- **Email**: admin@voyance.fr
- **Password**: admin123
- **Dashboard**: `/admin/dashboard`

### Voyants
- **Marie Martin** (Tarot): marie@voyance.fr / agent123
- **Sophie Bernard** (Astrologie): sophie@voyance.fr / agent123
- **Emma Moreau** (Médiumnité): emma@voyance.fr / agent123

### Clients
- **Client 1**: client1@test.fr / client123
- **Client 2**: client2@test.fr / client123
- **Client 3**: client3@test.fr / client123

---

## ✅ Scénarios de Test

### 1️⃣ Test Page Publique

1. **Accéder à la page d'accueil** (`/`)
   - ✅ Vérifier l'affichage du header avec logo
   - ✅ Vérifier la section Hero
   - ✅ Vérifier les 3 cartes avantages
   - ✅ Vérifier la liste des experts (4 voyants)
   - ✅ Vérifier la section avis (plusieurs avis)
   - ✅ Vérifier la section horoscope (12 signes)
   - ✅ Vérifier le footer avec liens légaux

2. **Navigation**
   - ✅ Cliquer sur "Connexion" → Redirection vers `/login`
   - ✅ Cliquer sur "Inscription" → Redirection vers `/register`

---

### 2️⃣ Test Inscription Client

1. **Accéder à** `/register`
2. **Remplir le formulaire**:
   - Prénom: Test
   - Nom: Utilisateur
   - Email: test@exemple.fr
   - Téléphone: 0612345678
   - Mot de passe: test123
   - Confirmer: test123
   - ✅ Cocher "J'accepte les CGV"
3. **Cliquer sur "S'inscrire"**
   - ✅ Message de succès
   - ✅ Redirection automatique vers `/login`

---

### 3️⃣ Test Connexion et Dashboard Admin

1. **Se connecter en tant qu'Admin**
   - Email: admin@voyance.fr
   - Password: admin123
   - Type: Administrateur
   
2. **Dashboard Admin** (`/admin/dashboard`)
   
   **Onglet Statistiques**:
   - ✅ Voir les 4 cartes de stats (Visites, Clients, Voyants, En ligne)
   - ✅ Changer la période (Jour/Mois/Année)
   - ✅ Vérifier le graphique Chart.js

   **Onglet Clients**:
   - ✅ Voir la liste des clients inscrits
   - ✅ Tester la recherche
   - ✅ Supprimer un client

   **Onglet Voyants**:
   - ✅ Voir la liste des voyants
   - ✅ Créer un nouveau voyant:
     - Prénom: Lucas
     - Nom: Dupont
     - Email: lucas@test.fr
     - Password: test123
     - Spécialité: Cartomancie
     - Tarif: 2.50€/min
   - ✅ Activer/Désactiver un voyant
   - ✅ Supprimer un voyant

   **Onglet Avis**:
   - ✅ Voir la liste des avis
   - ✅ Créer un nouvel avis:
     - Nom: Paul M.
     - Voyant: Marie Martin
     - Note: 5 étoiles
     - Commentaire: "Excellente consultation !"
   - ✅ Masquer/Afficher un avis
   - ✅ Supprimer un avis

3. **Se déconnecter**

---

### 4️⃣ Test Dashboard Voyant

1. **Se connecter en tant que Voyant**
   - Email: marie@voyance.fr
   - Password: agent123
   - Type: Voyant

2. **Dashboard Voyant** (`/agent/dashboard`)
   
   **Statistiques**:
   - ✅ Voir les 4 cartes (Consultations, CA, Sessions actives, Durée moy.)
   
   **Statut**:
   - ✅ Cliquer sur "En ligne" / "Hors ligne"
   - ✅ Vérifier le changement de couleur
   
   **Zone de chat**:
   - ✅ Voir "Aucun client..." si pas de session active
   - ⏳ Attendre qu'un client démarre une consultation

3. **Rester connecté** pour le test suivant

---

### 5️⃣ Test Dashboard Client et Chat Complet

**IMPORTANT**: Ouvrir 2 navigateurs/onglets différents:
- Navigateur 1: Voyant (marie@voyance.fr)
- Navigateur 2: Client (client1@test.fr)

#### Sur le Navigateur Client:

1. **Se connecter en tant que Client**
   - Email: client1@test.fr
   - Password: client123
   - Type: Client

2. **Dashboard Client** (`/client/dashboard`)
   
   **Onglet "Nos Voyants"**:
   - ✅ Voir la liste des voyants
   - ✅ Identifier les voyants "En ligne" (badge vert)
   - ✅ Cliquer sur "Consulter" pour Marie Martin

3. **Consultation démarre**:
   - ✅ Redirection vers onglet "Consultation"
   - ✅ Voir les infos du voyant (nom, spécialité, tarif)
   - ✅ Voir le message de bienvenue automatique
   - ✅ Taper un message: "Bonjour Marie, j'ai une question..."
   - ✅ Cliquer sur envoyer (icône avion)
   - ✅ Voir le message apparaître immédiatement

#### Sur le Navigateur Voyant:

4. **Session active apparaît**:
   - ✅ Voir le client dans "Clients en attente"
   - ✅ Cliquer sur le client pour ouvrir le chat
   - ✅ Voir le message du client
   - ✅ Répondre: "Bonjour, je vous écoute..."

#### Retour Navigateur Client:

5. **Polling automatique**:
   - ✅ Attendre 3 secondes maximum
   - ✅ Le message du voyant apparaît automatiquement
   - ✅ Envoyer un autre message
   - ✅ Vérifier la conversation en temps réel

6. **Continuer la conversation** (2-3 messages de chaque côté)

#### Test de Fin de Consultation:

7. **Terminer la consultation** (côté client):
   - ✅ Cliquer sur "Terminer"
   - ✅ Confirmer
   - ✅ Voir le popup avec:
     - Durée en minutes
     - Montant total en €
   - ✅ Redirection vers onglet "Historique"

8. **Vérifier l'historique**:
   - ✅ Voir la consultation terminée
   - ✅ Vérifier les infos (voyant, durée, coût, date)

#### Sur le Navigateur Voyant:

9. **Vérifier les statistiques**:
   - ✅ Les stats sont mises à jour
   - ✅ Voir la session disparaître de "Clients en attente"

---

### 6️⃣ Test Historique et Statistiques

#### Client:
1. **Onglet Historique**:
   - ✅ Voir toutes les consultations passées
   - ✅ Vérifier les détails (voyant, date, durée, coût)
   - ✅ Voir le statut (Terminée)

#### Voyant:
1. **Statistiques**:
   - ✅ Total consultations (devrait être > 0)
   - ✅ Chiffre d'affaires (devrait être > 0€)
   - ✅ Durée moyenne

---

### 7️⃣ Test Déconnexion

1. **Depuis n'importe quel dashboard**:
   - ✅ Cliquer sur "Déconnexion"
   - ✅ Vérifier la redirection vers page d'accueil
   - ✅ Essayer d'accéder directement au dashboard
   - ✅ Vérifier la redirection vers `/login`

---

## 🐛 Bugs Connus / À Tester

- [ ] Test de sessions simultanées (1 voyant, 2 clients)
- [ ] Test de rafraîchissement de page pendant le chat
- [ ] Test de déconnexion pendant une consultation
- [ ] Test avec voyant hors ligne
- [ ] Test de validation des formulaires (champs vides)

---

## 📝 Résultats Attendus

### ✅ Fonctionnel
- Page publique avec données dynamiques
- Inscription/Connexion multi-rôles
- Dashboard Admin complet avec CRUD
- Dashboard Voyant avec chat et stats
- Dashboard Client avec consultation et historique
- Système de chat avec polling (3s)
- Calcul automatique durée/coût
- Sessions et historique

### ⚠️ Limitations Actuelles
- Pas de vraie IA (à intégrer)
- Pas de paiement réel (Stripe à intégrer)
- Pas de notifications push
- Pas de chat vocal/vidéo
- Hashage de mot de passe simple (bcrypt en production)

---

## 🎯 Conclusion

Si tous les tests passent ✅, la plateforme est fonctionnelle et prête pour:
1. Tests utilisateurs
2. Ajout de l'IA
3. Intégration du paiement
4. Déploiement en production

**Durée estimée des tests complets**: 15-20 minutes
