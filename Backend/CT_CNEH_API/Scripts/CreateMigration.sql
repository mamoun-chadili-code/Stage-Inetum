-- Instructions pour créer une migration Entity Framework
-- Exécuter ces commandes dans le terminal depuis le dossier Backend/CT_CNEH_API

-- 1. Supprimer les migrations existantes (si nécessaire)
-- rm -rf Migrations/

-- 2. Créer une nouvelle migration initiale
-- dotnet ef migrations add InitialCreate

-- 3. Mettre à jour la base de données
-- dotnet ef database update

-- OU en PowerShell :
-- Remove-Item -Recurse -Force Migrations\ (si le dossier existe)
-- dotnet ef migrations add InitialCreate
-- dotnet ef database update
