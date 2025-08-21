# Module CCT - Centres de Contrôle Technique

## Vue d'ensemble

Le module CCT (Centres de Contrôle Technique) est une interface complète pour la gestion des centres de contrôle technique des véhicules. Il permet aux utilisateurs de rechercher, consulter, ajouter, modifier et supprimer des centres de contrôle technique.

## Fonctionnalités principales

### 1. Section Recherche
- **Région** : Menu déroulant pour sélectionner une région
- **Ville** : Menu déroulant pour sélectionner une ville  
- **Réseau de ralliement** : Menu déroulant pour sélectionner un réseau
- **Année de démarrage** : Champ pour spécifier l'année de démarrage
- **Boutons** : Rechercher et Annuler

### 2. Section CCTs
- **Affichage** : Sélection du nombre d'éléments par page (5, 10, 20, 50)
- **Recherche** : Champ de recherche pour filtrer les résultats
- **Bouton Ajouter** : "+ Ajouter CCT" pour créer un nouveau centre

### 3. Liste des CCTs
Le tableau affiche les colonnes suivantes :
- **CCT** : Nom du centre de contrôle technique
- **Agrément** : Numéro d'agrément du centre
- **Catégorie** : Catégorie de véhicules contrôlés
- **Réseau** : Nom du réseau auquel le centre est rattaché
- **Ville** : Ville où le centre est situé
- **Statut** : Statut actuel du centre (avec code couleur)
- **Actions** : 5 boutons d'action pour chaque CCT

### 4. Actions disponibles
- **Détails** (Info) : Voir les détails complets du CCT
- **Modifier** (Crayon) : Éditer les informations du centre
- **Supprimer** (Poubelle) : Supprimer le centre
- **Gérer le personnel** (Personne) : Gérer le personnel du centre
- **Gérer les équipements** (Rouage) : Gérer les équipements du centre

### 5. Pagination
- Navigation entre les pages
- Affichage du nombre total d'éléments
- Sélection du nombre d'éléments par page

## Formulaire d'ajout/modification

### Champs obligatoires (*)
- **CCT** : Nom du centre
- **Agrément** : Numéro d'agrément
- **Date agrément** : Date d'obtention de l'agrément
- **Catégorie** : Catégorie de véhicules
- **Statut** : Statut du centre
- **Date statut** : Date de mise à jour du statut
- **Réseau** : Réseau de rattachement
- **Date ralliement** : Date de ralliement au réseau
- **Région** : Région géographique
- **Province** : Province géographique
- **Ville** : Ville géographique
- **Adresse** : Adresse du centre
- **Latitude/Longitude** : Coordonnées géographiques
- **Téléphone** : Numéro de contact
- **Cadre d'autorisation** : Cadre légal
- **Type** : Type de centre
- **Quota VL** : Quota véhicules légers
- **Personne morale** : Case à cocher

### Champs optionnels
- **Adresse siège** : Adresse du siège social
- **Adresse domiciliation** : Adresse de domiciliation
- **Fax** : Numéro de fax
- **Email** : Adresse email
- **ICE** : Identifiant Commun de l'Entreprise
- **Id. Fiscal** : Identifiant fiscal
- **Engagements spécifiques** : Engagements particuliers
- **Quota PL** : Quota poids lourds

## Modal de détails

### Onglet "DETAILS DE CCT"
- **Informations d'identification** : CCT, agrément, dates, catégorie, statut, réseau, type
- **Informations géographiques** : Région, province, ville, adresse, coordonnées
- **Informations de contact** : Adresses, téléphone, fax, email, ICE, ID fiscal
- **Informations complémentaires** : Engagements, personne morale, quotas

### Onglet "LIGNES / AGENTS CCT"
- Tableau des lignes de contrôle avec :
  - Numéro de ligne
  - Catégorie de véhicules
  - Nom de l'agent
  - CIN (Carte d'Identité Nationale)
  - CAP (Certificat d'Aptitude Professionnelle)

### Onglet "HISTORIQUE CCT"
- Tableau de l'historique des ralliements avec :
  - Nom du CCT
  - Réseau
  - Date de ralliement
  - Date de fin de ralliement

## Validation des données

Le système valide automatiquement :
- Les champs obligatoires
- Les types de données (string, number, boolean, date)
- Les formats de dates
- Les valeurs numériques

## Gestion des erreurs

- Messages d'erreur clairs et contextuels
- Validation côté client et serveur
- Gestion des erreurs de réseau
- Logs détaillés pour le débogage

## Style et interface

- Design moderne et responsive
- Couleurs cohérentes avec le thème de l'application
- Icônes Material-UI pour une meilleure UX
- Layout en grille pour une organisation claire
- Modals pour les formulaires et détails

## Navigation

- Intégration avec le système de routage React
- Sidebar avec accès direct au module CCT
- Breadcrumbs et navigation contextuelle

## Performance

- Pagination côté serveur
- Chargement asynchrone des données
- Mise en cache des dropdowns
- Optimisation des requêtes API

## Sécurité

- Validation des données côté client et serveur
- Gestion des permissions utilisateur
- Protection contre les injections
- Logs d'audit des actions

## Maintenance

- Code modulaire et réutilisable
- Documentation complète
- Tests unitaires et d'intégration
- Gestion des erreurs robuste
