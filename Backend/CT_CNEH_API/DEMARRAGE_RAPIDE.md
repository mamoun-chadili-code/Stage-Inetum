# 🚀 Guide de Démarrage Rapide - API CT_CNEH

## ⚡ Démarrage Express

### 1. **Compiler le projet**
```bash
dotnet build CT_CNEH_API.csproj
```

### 2. **Lancer l'API**
```bash
dotnet run --project CT_CNEH_API.csproj
```

### 3. **Accéder à l'API**
- **Swagger UI** : https://localhost:7001/swagger
- **API Base** : https://localhost:7001/api
- **Santé** : https://localhost:7001/api/Health

## 🧪 Tests Rapides

### **Script PowerShell**
```powershell
# Exécuter le test rapide
.\test-rapide.ps1
```

### **Test Manuel avec PowerShell**
```powershell
# Test de santé
Invoke-RestMethod -Uri "https://localhost:7001/api/Health"

# Test des décisions
Invoke-RestMethod -Uri "https://localhost:7001/api/Decisions?Page=1&PageSize=5"
```

## 📋 Endpoints Principaux

### **Endpoints Publics (GET)**
- `/api/Health` - État de l'API
- `/api/Decisions` - Liste des décisions
- `/api/CCTs` - Liste des CCTs
- `/api/Agents` - Liste des agents
- `/api/Formations` - Liste des formations
- `/api/Equipements` - Liste des équipements
- `/api/Lignes` - Liste des lignes
- `/api/Reseaux` - Liste des réseaux

### **Endpoints Authentifiés**
- `POST /api/Auth/login` - Connexion utilisateur
- `POST /api/Decisions` - Créer une décision
- `PUT /api/Decisions/{id}` - Modifier une décision
- `DELETE /api/Decisions/{id}` - Supprimer une décision

## 🔧 Configuration

### **Fichiers Importants**
- `appsettings.json` - Configuration principale
- `appsettings.Testing.json` - Configuration de test
- `Program.cs` - Configuration de l'application

### **Variables d'Environnement**
```bash
# Base de données
ConnectionStrings__DefaultConnection="Server=DESKTOP-RU9PO3J;Database=CT_CNEH_DB;Trusted_Connection=true"

# JWT
JwtSettings__SecretKey="votre_clé_secrète_très_longue_et_complexe_pour_la_sécurité_jwt_token_2024"
```

## 🐳 Déploiement Docker

### **Lancer avec Docker Compose**
```bash
docker-compose up -d
```

### **Ports par défaut**
- **HTTP** : 5000
- **HTTPS** : 5001
- **SQL Server** : 1433

## 📊 Monitoring

### **Endpoints de Santé**
- `GET /api/Health` - État général
- `GET /api/Health/database` - Connexion BDD
- `GET /api/Health/stats` - Statistiques

### **Logs**
- Les logs s'affichent dans la console
- Niveau par défaut : Information
- Erreurs et avertissements visibles

## 🚨 Dépannage

### **Problèmes Courants**

#### **1. Erreur "Spécifiez le fichier projet"**
```bash
# Solution : Spécifier explicitement le projet
dotnet build CT_CNEH_API.csproj
dotnet run --project CT_CNEH_API.csproj
```

#### **2. Erreur de connexion à la base**
- Vérifier que SQL Server est démarré
- Vérifier la chaîne de connexion dans `appsettings.json`
- Exécuter : `dotnet ef database update`

#### **3. Port déjà utilisé**
- Changer le port dans `Properties/launchSettings.json`
- Ou arrêter l'application qui utilise le port

### **Vérifications**
```bash
# Vérifier la compilation
dotnet build CT_CNEH_API.csproj

# Vérifier les migrations
dotnet ef migrations list

# Vérifier la base de données
dotnet ef database update
```

## 🎯 Commandes Utiles

### **Développement**
```bash
# Compiler
dotnet build CT_CNEH_API.csproj

# Lancer
dotnet run --project CT_CNEH_API.csproj

# Watch mode (redémarrage automatique)
dotnet watch --project CT_CNEH_API.csproj
```

### **Base de Données**
```bash
# Créer une migration
dotnet ef migrations add NomMigration

# Appliquer les migrations
dotnet ef database update

# Supprimer la base
dotnet ef database drop
```

### **Tests**
```bash
# Tests unitaires
dotnet test CT_CNEH_API.Tests.csproj

# Tests avec couverture
dotnet test --collect:"XPlat Code Coverage"
```

## 📚 Documentation Complète

- **README.md** - Guide d'installation complet
- **TESTS.md** - Guide des tests détaillé
- **ETAT_PROJET.md** - État complet du projet
- **Swagger UI** - Documentation interactive des API

## 🎉 Succès !

**L'API est prête quand vous voyez :**
- ✅ Compilation réussie
- ✅ API démarrée sur https://localhost:7001
- ✅ Swagger accessible
- ✅ Endpoints répondent correctement

**Prochaines étapes :**
1. Tester les endpoints avec Swagger
2. Connecter le frontend React
3. Configurer l'authentification JWT
4. Déployer en production avec Docker
