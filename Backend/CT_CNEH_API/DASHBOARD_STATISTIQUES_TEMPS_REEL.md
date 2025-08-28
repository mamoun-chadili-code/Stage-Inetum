# Dashboard - Statistiques en Temps Réel

## Vue d'ensemble

Le système de dashboard a été mis à jour pour récupérer les **vraies statistiques** depuis la base de données au lieu d'utiliser des données simulées. Cela permet d'avoir une vue d'ensemble précise et à jour de l'état du système.

## Architecture

### Frontend (React)
- **Service** : `frontend/src/services/dashboardService.js`
- **Composant** : `frontend/src/components/Dashboard/Dashboard.js`
- **Fonctionnalités** :
  - Récupération automatique des statistiques au chargement
  - Actualisation manuelle via bouton "Actualiser"
  - Actualisation automatique toutes les 5 minutes
  - Gestion des erreurs et états de chargement
  - Affichage de la dernière mise à jour

### Backend (.NET Core)
- **Contrôleur** : `Backend/CT_CNEH_API/Controllers/DashboardController.cs`
- **Endpoints** : API REST pour récupérer les statistiques
- **Base de données** : Requêtes SQL optimisées avec Entity Framework

## Endpoints API

### 1. Statistiques générales
```
GET /api/dashboard/stats
```
Retourne toutes les statistiques de base en une seule requête.

### 2. Statistiques individuelles
```
GET /api/dashboard/ccts/count          # Nombre de CCTs
GET /api/dashboard/agents/count        # Nombre d'agents
GET /api/dashboard/chefs-centre/count  # Nombre de chefs de centre
GET /api/dashboard/lignes/count        # Nombre de lignes
GET /api/dashboard/formations/count    # Nombre de formations
GET /api/dashboard/equipements/count   # Nombre d'équipements
GET /api/dashboard/decisions/count     # Nombre de décisions
GET /api/dashboard/reseaux/count       # Nombre de réseaux
```

### 3. Statistiques détaillées
```
GET /api/dashboard/detailed
```
Retourne des statistiques avancées incluant :
- Statistiques par statut (agents, CCTs)
- Statistiques par région (ville)
- Statistiques de performance (décisions par mois)
- Répartition des agents par formation

### 4. Statistiques en temps réel
```
GET /api/dashboard/real-time
```
Alias pour `/stats` - retourne les statistiques actuelles.

## Fonctionnalités du Dashboard

### Statistiques principales (4 cartes)
1. **Centres CCT** - Nombre total de centres de contrôle technique
2. **Agents** - Nombre total d'agents certifiés CAP
3. **Chefs de Centre** - Nombre total de responsables
4. **Lignes** - Nombre total de lignes de contrôle

### Statistiques supplémentaires (4 cartes)
1. **Formations** - Programmes de formation disponibles
2. **Équipements** - Matériel et maintenance
3. **Décisions** - Autorisations et décisions prises
4. **Réseaux** - Réseaux de transport gérés

### Fonctionnalités avancées
- **Actualisation automatique** : Toutes les 5 minutes
- **Actualisation manuelle** : Bouton "Actualiser" dans l'en-tête
- **Gestion des erreurs** : Messages d'erreur et bouton "Réessayer"
- **Indicateurs de chargement** : Spinners pendant les requêtes
- **Horodatage** : Affichage de la dernière mise à jour

## Configuration

### Variables d'environnement
```bash
# Frontend (.env)
REACT_APP_API_URL=http://localhost:7000/api

# Backend (appsettings.json)
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=CT_CNEH_DB;..."
  }
}
```

### Ports par défaut
- **Frontend** : 3000 (http://localhost:3000)
- **Backend** : 7000 (http://localhost:7000)

## Tests

### Test de l'API
```powershell
# Exécuter le script de test
.\test-dashboard-api.ps1
```

### Test manuel
```bash
# Test avec curl
curl http://localhost:7000/api/dashboard/stats
curl http://localhost:7000/api/dashboard/ccts/count
```

## Dépannage

### Erreurs courantes

#### 1. "Module not found: dashboardService"
- Vérifiez que le fichier `dashboardService.js` existe
- Vérifiez le chemin d'import dans `Dashboard.js`

#### 2. "Cannot connect to API"
- Vérifiez que l'API backend est en cours d'exécution
- Vérifiez l'URL dans `dashboardService.js`
- Vérifiez les paramètres CORS dans le backend

#### 3. "Database connection failed"
- Vérifiez la chaîne de connexion dans `appsettings.json`
- Vérifiez que SQL Server est accessible
- Vérifiez les permissions de l'utilisateur de base de données

### Vérifications
1. **Backend en cours d'exécution** : `dotnet run` dans le dossier backend
2. **Base de données accessible** : Test de connexion SQL Server
3. **Contrôleur enregistré** : Vérifiez `Program.cs`
4. **Frontend compilé** : `npm run build` sans erreurs

## Performance

### Optimisations
- **Requêtes parallèles** : Utilisation de `Promise.all()` pour les statistiques individuelles
- **Mise en cache** : Actualisation toutes les 5 minutes au lieu de chaque seconde
- **Gestion d'erreurs** : Retour de valeurs par défaut en cas d'échec
- **Requêtes SQL optimisées** : Utilisation de `COUNT(*)` et `GROUP BY`

### Métriques
- **Temps de réponse** : < 500ms pour les statistiques de base
- **Fréquence d'actualisation** : 5 minutes (configurable)
- **Gestion des erreurs** : Graceful degradation avec valeurs par défaut

## Maintenance

### Ajout de nouvelles statistiques
1. Ajouter la propriété dans le contrôleur backend
2. Ajouter la requête SQL correspondante
3. Mettre à jour le service frontend
4. Ajouter l'affichage dans le composant Dashboard

### Mise à jour des données
- Les statistiques sont automatiquement mises à jour
- Aucune intervention manuelle requise
- Les changements dans la base de données sont reflétés en temps réel

## Support

Pour toute question ou problème :
1. Vérifiez les logs de l'API backend
2. Vérifiez la console du navigateur
3. Testez les endpoints individuellement
4. Consultez cette documentation
