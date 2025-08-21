# 🚀 Guide de Déploiement - Projet CT_CNEH

## 📋 Prérequis de Déploiement

### Environnement de Production
- **Serveur Web**: Windows Server 2019+ ou Linux (Ubuntu 20.04+)
- **Base de données**: SQL Server 2019+ ou Azure SQL Database
- **Runtime**: .NET 8.0 Runtime
- **Web Server**: IIS (Windows) ou Nginx (Linux)
- **SSL**: Certificat SSL valide pour HTTPS

### Environnement de Développement
- **IDE**: Visual Studio 2022 ou VS Code
- **SDK**: .NET 8.0 SDK
- **Base de données**: SQL Server Express ou LocalDB
- **Node.js**: Version 18+ pour le frontend

## 🔧 Déploiement Backend

### 1. Préparation de l'Environnement
```bash
# Vérifier la version .NET
dotnet --version

# Vérifier les outils EF Core
dotnet tool list --global
dotnet tool install --global dotnet-ef
```

### 2. Configuration de la Base de Données
```json
// appsettings.Production.json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=your-server;Database=CT_CNEH_Prod;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

### 3. Migration de la Base de Données
```bash
# Créer la base de production
dotnet ef database update --environment Production

# Vérifier les migrations appliquées
dotnet ef migrations list
```

### 4. Build et Publication
```bash
# Build en mode Release
dotnet build -c Release

# Publication pour IIS
dotnet publish -c Release -o ./publish

# Ou publication pour Linux
dotnet publish -c Release -r linux-x64 --self-contained -o ./publish
```

### 5. Configuration IIS (Windows)
```xml
<!-- web.config -->
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" arguments=".\CT_CNEH_API.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" hostingModel="inprocess" />
    </system.webServer>
  </location>
</configuration>
```

### 6. Configuration Nginx (Linux)
```nginx
# /etc/nginx/sites-available/ct-cneh
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🌐 Déploiement Frontend

### 1. Build de Production
```bash
# Installer les dépendances
npm install

# Build de production
npm run build

# Le dossier build contient l'application optimisée
```

### 2. Configuration des Variables d'Environnement
```bash
# .env.production
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_ENVIRONMENT=production
```

### 3. Déploiement sur Serveur Web
```bash
# Copier le contenu du dossier build vers le serveur web
# Exemple pour Apache
cp -r build/* /var/www/html/

# Exemple pour Nginx
cp -r build/* /usr/share/nginx/html/
```

### 4. Configuration des Routes (SPA)
```nginx
# Nginx - Redirection des routes vers index.html
location / {
    try_files $uri $uri/ /index.html;
}
```

## 🔒 Sécurité et Configuration

### 1. Variables d'Environnement Sensibles
```bash
# Ne jamais commiter ces fichiers
# .env.local (développement)
# .env.production (production)

# Exemples de variables sensibles
DB_CONNECTION_STRING=...
JWT_SECRET=...
API_KEYS=...
```

### 2. Configuration CORS
```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("ProductionPolicy", policy =>
    {
        policy.WithOrigins("https://your-frontend-domain.com")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});
```

### 3. Headers de Sécurité
```csharp
// Program.cs
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    context.Response.Headers.Add("X-XSS-Protection", "1; mode=block");
    await next();
});
```

## 📊 Monitoring et Logs

### 1. Configuration des Logs
```json
// appsettings.Production.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    },
    "ApplicationInsights": {
      "LogLevel": {
        "Default": "Information"
      }
    }
  },
  "ApplicationInsights": {
    "InstrumentationKey": "your-key-here"
  }
}
```

### 2. Health Checks
```csharp
// Program.cs
builder.Services.AddHealthChecks()
    .AddSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
    .AddCheck("self", () => HealthCheckResult.Healthy());
```

## 🚀 Scripts de Déploiement Automatisé

### 1. Script PowerShell (Windows)
```powershell
# deploy.ps1
param(
    [string]$Environment = "Production"
)

Write-Host "Déploiement en cours pour l'environnement: $Environment"

# Build
dotnet build -c Release
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Tests
dotnet test
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Publication
dotnet publish -c Release -o ./publish
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

# Migration base de données
dotnet ef database update --environment $Environment

Write-Host "Déploiement terminé avec succès!"
```

### 2. Script Bash (Linux)
```bash
#!/bin/bash
# deploy.sh

ENVIRONMENT=${1:-Production}

echo "Déploiement en cours pour l'environnement: $ENVIRONMENT"

# Build
dotnet build -c Release
if [ $? -ne 0 ]; then exit 1; fi

# Tests
dotnet test
if [ $? -ne 0 ]; then exit 1; fi

# Publication
dotnet publish -c Release -o ./publish
if [ $? -ne 0 ]; then exit 1; fi

# Migration base de données
dotnet ef database update --environment $ENVIRONMENT

echo "Déploiement terminé avec succès!"
```

## 🔍 Vérification Post-Déploiement

### 1. Tests de Connectivité
```bash
# Vérifier l'API
curl -k https://your-api-domain.com/api/health

# Vérifier la base de données
dotnet ef database update --environment Production

# Vérifier les logs
tail -f /var/log/nginx/error.log
```

### 2. Checklist de Vérification
- [ ] L'API répond sur tous les endpoints
- [ ] La base de données est accessible
- [ ] Les migrations sont appliquées
- [ ] Le frontend se charge correctement
- [ ] Les dropdowns affichent les données
- [ ] La recherche fonctionne
- [ ] La pagination fonctionne
- [ ] Les formulaires fonctionnent
- [ ] Les logs sont générés
- [ ] SSL est configuré et valide

## 📞 Support et Maintenance

### 1. Sauvegarde de la Base de Données
```bash
# Sauvegarde automatique
sqlcmd -S your-server -d CT_CNEH_Prod -Q "BACKUP DATABASE CT_CNEH_Prod TO DISK = 'C:\Backups\CT_CNEH_$(Get-Date -Format 'yyyyMMdd').bak'"
```

### 2. Mise à Jour de l'Application
```bash
# Arrêter l'application
systemctl stop ct-cneh-api

# Sauvegarder l'ancienne version
cp -r /var/www/ct-cneh /var/www/ct-cneh.backup.$(date +%Y%m%d)

# Déployer la nouvelle version
# Redémarrer l'application
systemctl start ct-cneh-api

# Vérifier le statut
systemctl status ct-cneh-api
```

## 🎉 Déploiement Réussi !

Une fois toutes ces étapes terminées, votre application CT_CNEH sera déployée et prête pour la production !

**N'oubliez pas de :**
- Tester toutes les fonctionnalités après le déploiement
- Configurer les sauvegardes automatiques
- Mettre en place le monitoring
- Documenter les procédures de maintenance
- Former les utilisateurs finaux

---

**Bon déploiement ! 🚀**
