-- Script de diagnostic complet pour le module Décisions
-- Exécuter ce script dans SSMS pour vérifier l'état des tables

USE [CT_CNEH_DB]
GO

PRINT '🔍 DIAGNOSTIC COMPLET DU MODULE DÉCISIONS'
PRINT '============================================='
PRINT ''

-- 1. Vérifier l'existence des tables principales
PRINT '📋 1. VÉRIFICATION DES TABLES PRINCIPALES'
PRINT '----------------------------------------'

DECLARE @TableExists TABLE (
    TableName NVARCHAR(128),
    Exists BIT,
    RowCount INT
)

INSERT INTO @TableExists (TableName, Exists, RowCount)
SELECT 
    'TypeDecisions',
    CASE WHEN EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeDecisions]') AND type in (N'U')) THEN 1 ELSE 0 END,
    CASE WHEN EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeDecisions]') AND type in (N'U')) THEN (SELECT COUNT(*) FROM [TypeDecisions]) ELSE 0 END

INSERT INTO @TableExists (TableName, Exists, RowCount)
SELECT 
    'TypeEntites',
    CASE WHEN EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeEntites]') AND type in (N'U')) THEN 1 ELSE 0 END,
    CASE WHEN EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeEntites]') AND type in (N'U')) THEN (SELECT COUNT(*) FROM [TypeEntites]) ELSE 0 END

INSERT INTO @TableExists (TableName, Exists, RowCount)
SELECT 
    'Decisions',
    CASE WHEN EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Decisions]') AND type in (N'U')) THEN 1 ELSE 0 END,
    CASE WHEN EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Decisions]') AND type in (N'U')) THEN (SELECT COUNT(*) FROM [Decisions]) ELSE 0 END

-- Afficher les résultats
SELECT 
    TableName AS 'Table',
    CASE WHEN Exists = 1 THEN '✅ EXISTE' ELSE '❌ MANQUANTE' END AS 'Statut',
    CASE WHEN Exists = 1 THEN CAST(RowCount AS VARCHAR) ELSE 'N/A' END AS 'Nombre d''enregistrements'
FROM @TableExists
ORDER BY TableName

PRINT ''

-- 2. Vérifier la structure de la table Decisions
PRINT '📋 2. STRUCTURE DE LA TABLE DECISIONS'
PRINT '-------------------------------------'

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Decisions]') AND type in (N'U'))
BEGIN
    SELECT 
        COLUMN_NAME AS 'Colonne',
        DATA_TYPE AS 'Type',
        IS_NULLABLE AS 'Nullable',
        COLUMN_DEFAULT AS 'Valeur par défaut'
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Decisions'
    ORDER BY ORDINAL_POSITION
END
ELSE
BEGIN
    PRINT '❌ La table Decisions n''existe pas !'
END

PRINT ''

-- 3. Vérifier le contenu des tables de référence
PRINT '📋 3. CONTENU DES TABLES DE RÉFÉRENCE'
PRINT '-------------------------------------'

-- TypeDecisions
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeDecisions]') AND type in (N'U'))
BEGIN
    PRINT '📊 Table TypeDecisions :'
    SELECT 
        [Id],
        [Code],
        [Libelle]
    FROM [TypeDecisions] 
    ORDER BY [Id]
    PRINT ''
END
ELSE
BEGIN
    PRINT '❌ Table TypeDecisions manquante !'
END

-- TypeEntites
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeEntites]') AND type in (N'U'))
BEGIN
    PRINT '📊 Table TypeEntites :'
    SELECT 
        [Id],
        [Code],
        [Libelle]
    FROM [TypeEntites] 
    ORDER BY [Id]
    PRINT ''
END
ELSE
BEGIN
    PRINT '❌ Table TypeEntites manquante !'
END

-- 4. Vérifier les contraintes de clés étrangères
PRINT '📋 4. CONTRAINTES DE CLÉS ÉTRANGÈRES'
PRINT '------------------------------------'

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Decisions]') AND type in (N'U'))
BEGIN
    SELECT 
        fk.name AS 'Nom de la contrainte',
        OBJECT_NAME(fk.parent_object_id) AS 'Table',
        COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS 'Colonne',
        OBJECT_NAME(fk.referenced_object_id) AS 'Table référencée',
        COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS 'Colonne référencée'
    FROM sys.foreign_keys fk
    INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
    WHERE OBJECT_NAME(fk.parent_object_id) = 'Decisions'
    ORDER BY fk.name
END
ELSE
BEGIN
    PRINT '❌ Impossible de vérifier les contraintes : table Decisions manquante'
END

PRINT ''

-- 5. Recommandations
PRINT '📋 5. RECOMMANDATIONS'
PRINT '---------------------'

DECLARE @TypeDecisionsExists BIT = (SELECT Exists FROM @TableExists WHERE TableName = 'TypeDecisions')
DECLARE @TypeEntitesExists BIT = (SELECT Exists FROM @TableExists WHERE TableName = 'TypeEntites')
DECLARE @DecisionsExists BIT = (SELECT Exists FROM @TableExists WHERE TableName = 'Decisions')

IF @TypeDecisionsExists = 0
BEGIN
    PRINT '❌ ACTION REQUISE: Créer et peupler la table TypeDecisions'
    PRINT '   - Exécuter le script Populate_TypeDecisions.sql'
END

IF @TypeEntitesExists = 0
BEGIN
    PRINT '❌ ACTION REQUISE: Créer et peupler la table TypeEntites'
    PRINT '   - Exécuter le script Populate_TypeEntites.sql'
END

IF @DecisionsExists = 0
BEGIN
    PRINT '❌ ACTION REQUISE: Créer la table Decisions'
    PRINT '   - Vérifier que les migrations Entity Framework sont appliquées'
END

IF @TypeDecisionsExists = 1 AND @TypeEntitesExists = 1 AND @DecisionsExists = 1
BEGIN
    PRINT '✅ Toutes les tables nécessaires existent'
    PRINT '✅ Le module Décisions devrait fonctionner correctement'
END

PRINT ''
PRINT '🎯 DIAGNOSTIC TERMINÉ !'
GO
