# Guide de Tests - API CT_CNEH

## 🧪 Tests Automatisés

### Exécution des tests
```bash
# Tests unitaires
dotnet test CT_CNEH_API.Tests.csproj

# Tests avec couverture de code
dotnet test --collect:"XPlat Code Coverage"
```

### Structure des tests
- **Tests unitaires** : Logique métier des services
- **Tests d'intégration** : Contrôleurs et base de données
- **Tests de performance** : Temps de réponse des endpoints

## 🔍 Tests Manuels

### 1. Test de l'API avec Swagger
1. Lancer l'API : `dotnet run --project CT_CNEH_API.csproj`
2. Ouvrir : https://localhost:7001/swagger
3. Tester chaque endpoint individuellement

### 2. Test avec Postman
- Importer le fichier `test-api.http`
- Configurer l'environnement avec les variables :
  - `baseUrl`: https://localhost:7001
  - `token`: JWT token d'authentification

### 3. Test avec PowerShell
```powershell
# Exécuter le script de test
.\test-api.ps1
```

## 📊 Endpoints à Tester

### Endpoints Publics
- `GET /api/Decisions` - Liste des décisions
- `GET /api/CCTs` - Liste des CCTs
- `GET /api/Agents` - Liste des agents
- `GET /api/Formations` - Liste des formations
- `GET /api/Equipements` - Liste des équipements
- `GET /api/Lignes` - Liste des lignes
- `GET /api/Reseaux` - Liste des réseaux

### Endpoints Authentifiés
- `POST /api/Auth/login` - Connexion utilisateur
- `POST /api/Decisions` - Créer une décision
- `PUT /api/Decisions/{id}` - Modifier une décision
- `DELETE /api/Decisions/{id}` - Supprimer une décision

## 🚨 Tests de Sécurité

### Authentification JWT
1. Tenter d'accéder aux endpoints protégés sans token
2. Vérifier que l'accès est refusé (401 Unauthorized)
3. Tester avec un token valide
4. Tester avec un token expiré

### Validation des données
1. Envoyer des données invalides
2. Vérifier les messages d'erreur
3. Tester les contraintes de base de données

## 📈 Tests de Performance

### Temps de réponse
- Endpoints de liste : < 500ms
- Endpoints de détail : < 200ms
- Endpoints de création/modification : < 1000ms

### Charge
- Tester avec 100+ requêtes simultanées
- Vérifier la stabilité de la base de données
- Monitorer l'utilisation mémoire

## 🐛 Débogage

### Logs
- Vérifier les logs de l'application
- Analyser les erreurs de base de données
- Tester les exceptions gérées

### Base de données
- Vérifier la connexion
- Contrôler les migrations
- Valider les données de test

## 📝 Rapport de Tests

### Format du rapport
```json
{
  "date": "2024-01-XX",
  "version": "1.0.0",
  "tests": {
    "unitaires": { "total": 0, "passés": 0, "échoués": 0 },
    "integration": { "total": 0, "passés": 0, "échoués": 0 },
    "performance": { "total": 0, "passés": 0, "échoués": 0 }
  },
  "endpoints": {
    "Decisions": "✅",
    "CCTs": "✅",
    "Agents": "✅"
  }
}
```

## 🔧 Configuration des Tests

### Variables d'environnement
```bash
# Base de données de test
ASPNETCORE_ENVIRONMENT=Testing
ConnectionStrings__DefaultConnection="Server=(localdb)\\mssqllocaldb;Database=CT_CNEH_Test_DB"

# JWT de test
JwtSettings__SecretKey="clé_de_test_très_longue_pour_les_tests_2024"
```

### Fichiers de configuration
- `appsettings.Testing.json` - Configuration des tests
- `test-api.http` - Tests HTTP
- `test-api.ps1` - Script PowerShell de test
