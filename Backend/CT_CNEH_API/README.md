# API CT_CNEH - Centre de Contrôle Technique

## Description
API REST pour la gestion des centres de contrôle technique (CCT) au Maroc, développée avec ASP.NET Core 8.0 et Entity Framework Core.

## Fonctionnalités principales

### 🏢 Gestion des entités
- **Réseaux** : Gestion des réseaux de transport
- **CCTs** : Centres de Contrôle Technique
- **Agents** : Personnel des CCTs
- **Chefs de Centre** : Responsables des CCTs
- **Lignes** : Lignes de transport
- **Équipements** : Matériel et véhicules
- **Formations** : Formation du personnel
- **Décisions** : Décisions administratives

### 🔍 Fonctionnalités avancées
- Recherche et filtrage avancés
- Pagination des résultats
- Gestion des fichiers (logos, documents)
- Historique des affectations
- Système d'authentification JWT

## Architecture

### Technologies utilisées
- **Backend** : ASP.NET Core 8.0
- **Base de données** : SQL Server avec Entity Framework Core
- **Authentification** : JWT Bearer Tokens
- **Documentation** : Swagger/OpenAPI
- **Validation** : Data Annotations et Fluent Validation

### Structure du projet
```
CT_CNEH_API/
├── Controllers/          # Contrôleurs API
├── Models/              # Modèles de données
├── DTOs/                # Objets de transfert de données
├── Services/            # Logique métier
├── Data/                # Contexte de base de données
├── Scripts/             # Scripts de seeding
├── wwwroot/             # Fichiers statiques
└── Migrations/          # Migrations Entity Framework
```

## Installation et configuration

### Prérequis
- .NET 8.0 SDK
- SQL Server (LocalDB ou serveur)
- Visual Studio 2022 ou VS Code

### Configuration
1. **Cloner le projet**
   ```bash
   git clone [url-du-repo]
   cd CT_CNEH_API
   ```

2. **Configurer la base de données**
   - Modifier `appsettings.json` avec votre chaîne de connexion
   - Exécuter les migrations : `dotnet ef database update`

3. **Lancer l'application**
   ```bash
   dotnet run
   ```

4. **Accéder à la documentation**
   - Swagger UI : https://localhost:5001/swagger
   - API : https://localhost:5001/api

## Endpoints principaux

### Décisions
- `GET /api/Decisions` - Liste des décisions avec pagination
- `GET /api/Decisions/{id}` - Détail d'une décision
- `POST /api/Decisions` - Créer une décision
- `PUT /api/Decisions/{id}` - Modifier une décision
- `DELETE /api/Decisions/{id}` - Supprimer une décision

### CCTs
- `GET /api/CCTs` - Liste des CCTs
- `GET /api/CCTs/{id}` - Détail d'un CCT
- `POST /api/CCTs` - Créer un CCT
- `PUT /api/CCTs/{id}` - Modifier un CCT

### Agents
- `GET /api/Agents` - Liste des agents
- `GET /api/Agents/{id}` - Détail d'un agent
- `POST /api/Agents` - Créer un agent
- `PUT /api/Agents/{id}` - Modifier un agent

### Formations
- `GET /api/Formations` - Liste des formations
- `GET /api/Formations/{id}` - Détail d'une formation
- `POST /api/Formations` - Créer une formation
- `PUT /api/Formations/{id}` - Modifier une formation

## Base de données

### Tables principales
- **Users** : Utilisateurs du système
- **Reseaux** : Réseaux de transport
- **CCTs** : Centres de contrôle technique
- **Agents** : Personnel des CCTs
- **Lignes** : Lignes de transport
- **Equipements** : Matériel et véhicules
- **Formations** : Formation du personnel
- **Decisions** : Décisions administratives

### Relations
- Un réseau peut avoir plusieurs CCTs
- Un CCT peut avoir plusieurs agents et lignes
- Une ligne peut avoir plusieurs équipements
- Les formations sont liées aux agents et CCTs

## Sécurité

### Authentification
- JWT Bearer Tokens
- Gestion des rôles (Admin, User)
- Validation des tokens côté serveur

### Autorisation
- Contrôle d'accès basé sur les rôles
- Validation des permissions par endpoint

## Tests

### Fichier de test
Utilisez le fichier `test-api.http` pour tester les endpoints avec :
- VS Code + Extension REST Client
- IntelliJ IDEA + Plugin HTTP Client
- Postman

### Exemples de tests
```http
GET https://localhost:5001/api/Decisions?Page=1&PageSize=5
GET https://localhost:5001/api/CCTs?Page=1&PageSize=10
```

## Déploiement

### Production
1. Configurer la chaîne de connexion de production
2. Configurer les variables d'environnement
3. Publier l'application : `dotnet publish -c Release`
4. Déployer sur le serveur

### Docker (optionnel)
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
COPY bin/Release/net8.0/publish/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "CT_CNEH_API.dll"]
```

## Support et maintenance

### Logs
- Logs structurés avec Serilog
- Niveaux de log configurables
- Rotation automatique des fichiers

### Monitoring
- Health checks intégrés
- Métriques de performance
- Gestion des erreurs centralisée

## Contribution

### Standards de code
- Suivre les conventions C# Microsoft
- Utiliser des noms explicites
- Documenter les méthodes publiques
- Tests unitaires pour la logique métier

### Workflow
1. Créer une branche feature
2. Développer et tester
3. Créer une pull request
4. Code review et merge

## Licence
Propriétaire - Tous droits réservés

## Contact
- **Développeur** : [Votre nom]
- **Organisation** : [Votre organisation]
- **Email** : [votre-email@domaine.com]
