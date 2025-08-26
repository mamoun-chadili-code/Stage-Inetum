# 📚 Modules d'Historique - Documentation Complète

## 🎯 Vue d'ensemble

Ce document décrit l'implémentation complète des modules d'historique pour l'application "Gestion de l'activité du contrôle technique".

## 🏗️ Architecture des Modules

### 1. **Module HistoriqueCCT**
- **Objectif** : Suivre l'historique des ralliements des CCTs aux réseaux
- **Fonctionnalités** :
  - Création d'un nouvel historique de ralliement
  - Modification des dates de début/fin
  - Suppression d'un historique
  - Consultation par CCT

### 2. **Module HistoriqueAffectations**
- **Objectif** : Suivre l'historique des affectations des agents et chefs de centre
- **Fonctionnalités** :
  - Gestion des affectations d'agents
  - Gestion des affectations de chefs de centre
  - Suivi des motifs d'affectation
  - Gestion du statut actif/inactif

## 🗄️ Structure de la Base de Données

### Table `HistoriqueCCTs`
```sql
- Id (int, PK, Identity)
- CCTId (int, FK vers CCTs)
- ReseauId (int, FK vers Reseaux)
- DateDebut (datetime, NOT NULL)
- DateFin (datetime, NULL)
```

### Table `HistoriqueAffectations`
```sql
- Id (int, PK, Identity)
- EntiteId (int, NOT NULL)
- TypeEntite (nvarchar(50), NOT NULL) -- "Agent" ou "ChefCentre"
- CCTId (int, FK vers CCTs)
- DateAffectation (datetime, NOT NULL)
- DateFinAffectation (datetime, NULL)
- MotifAffectation (nvarchar(500), NULL)
- MotifFinAffectation (nvarchar(500), NULL)
- IsActive (bit, NOT NULL, DEFAULT 1)
- DateCreation (datetime, NOT NULL, DEFAULT GETDATE())
- AgentId (int, FK vers Agents, NULL)
- ChefCentreId (int, FK vers ChefCentres, NULL)
```

## 🔧 Services Backend

### `HistoriqueCCTService`
- `GetAllAsync()` : Récupérer tous les historiques
- `GetByIdAsync(int id)` : Récupérer par ID
- `GetByCCTIdAsync(int cctId)` : Récupérer par CCT
- `CreateAsync(HistoriqueCCTDto dto)` : Créer un historique
- `UpdateAsync(int id, HistoriqueCCTDto dto)` : Modifier
- `DeleteAsync(int id)` : Supprimer

### `HistoriqueAffectationsService`
- `GetAllAsync()` : Récupérer tous les historiques
- `GetByIdAsync(int id)` : Récupérer par ID
- `GetByAgentIdAsync(int agentId)` : Récupérer par agent
- `GetByChefCentreIdAsync(int chefCentreId)` : Récupérer par chef de centre
- `GetByCCTIdAsync(int cctId)` : Récupérer par CCT
- `CreateAsync(HistoriqueAffectationDto dto)` : Créer une affectation
- `UpdateAsync(int id, HistoriqueAffectationDto dto)` : Modifier
- `DeleteAsync(int id)` : Supprimer

## 🎨 Composants Frontend

### `HistoriqueCCT`
- Interface de gestion des historiques CCT
- Formulaire d'ajout/modification
- Tableau des historiques avec actions
- Filtrage par CCT et réseau

### `HistoriqueAffectations`
- Interface de gestion des affectations
- Formulaire dynamique selon le type d'entité
- Gestion des motifs et statuts
- Tableau des affectations avec actions

## 🚀 API Endpoints

### HistoriqueCCTs
- `GET /api/HistoriqueCCTs` : Liste complète
- `GET /api/HistoriqueCCTs/{id}` : Par ID
- `GET /api/HistoriqueCCTs/cct/{cctId}` : Par CCT
- `POST /api/HistoriqueCCTs` : Créer
- `PUT /api/HistoriqueCCTs/{id}` : Modifier
- `DELETE /api/HistoriqueCCTs/{id}` : Supprimer

### HistoriqueAffectations
- `GET /api/HistoriqueAffectations` : Liste complète
- `GET /api/HistoriqueAffectations/{id}` : Par ID
- `GET /api/HistoriqueAffectations/agent/{agentId}` : Par agent
- `GET /api/HistoriqueAffectations/chefcentre/{chefCentreId}` : Par chef de centre
- `GET /api/HistoriqueAffectations/cct/{cctId}` : Par CCT
- `POST /api/HistoriqueAffectations` : Créer
- `PUT /api/HistoriqueAffectations/{id}` : Modifier
- `DELETE /api/HistoriqueAffectations/{id}` : Supprimer

## 📋 Utilisation

### 1. **Démarrage du Backend**
```bash
cd Backend/CT_CNEH_API
dotnet run
```

### 2. **Exécution de la Migration**
```sql
-- Exécuter le script de migration
EXEC Migration_Historique_Tables.sql
```

### 3. **Démarrage du Frontend**
```bash
cd frontend
npm start
```

### 4. **Accès aux Modules**
- **Historique CCT** : `/historique-cct`
- **Historique Affectations** : `/historique-affectations`

## 🔒 Sécurité

- Authentification JWT requise
- Autorisation basée sur les rôles utilisateur
- Validation des données côté serveur
- Protection contre les injections SQL

## 🧪 Tests

### Tests Backend
```bash
dotnet test
```

### Tests Frontend
```bash
npm test
```

## 📝 Notes de Développement

- Les modèles correspondent exactement aux structures de base de données existantes
- Utilisation d'Entity Framework Core avec Include() pour les relations
- Interface utilisateur responsive avec Material-UI
- Gestion d'erreurs complète côté client et serveur

## 🚨 Dépannage

### Problèmes Courants
1. **Erreur de connexion à la base** : Vérifier la chaîne de connexion
2. **Tables manquantes** : Exécuter le script de migration
3. **Erreurs CORS** : Vérifier la configuration CORS dans Program.cs
4. **Problèmes de navigation** : Vérifier les routes dans App.js

### Logs
- Backend : Console et fichiers de log
- Frontend : Console du navigateur
- Base de données : SQL Server Profiler

## 📞 Support

Pour toute question ou problème :
1. Vérifier la documentation
2. Consulter les logs
3. Contacter l'équipe de développement

---

**Version** : 1.0.0  
**Date** : $(Get-Date)  
**Auteur** : Équipe de Développement CT_CNEH
