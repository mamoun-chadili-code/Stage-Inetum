-- Script de diagnostic pour l'historique CCT
-- Vérifier l'état des tables et des données

USE [CT_CNEH_DB]
GO

PRINT '=== DIAGNOSTIC HISTORIQUE CCT ==='
PRINT ''

-- 1. Vérifier l'existence des tables
PRINT '1. VÉRIFICATION DES TABLES:'
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[HistoriqueCCTs]') AND type in (N'U'))
    PRINT '✓ Table HistoriqueCCTs existe'
ELSE
    PRINT '❌ Table HistoriqueCCTs N''EXISTE PAS'
    
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CCTs]') AND type in (N'U'))
    PRINT '✓ Table CCTs existe'
ELSE
    PRINT '❌ Table CCTs N''EXISTE PAS'
    
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Reseaux]') AND type in (N'U'))
    PRINT '✓ Table Reseaux existe'
ELSE
    PRINT '❌ Table Reseaux N''EXISTE PAS'

PRINT ''

-- 2. Vérifier le nombre d'enregistrements
PRINT '2. NOMBRE D''ENREGISTREMENTS:'
DECLARE @HistoriqueCount INT, @CCTCount INT, @ReseauCount INT

SELECT @HistoriqueCount = COUNT(*) FROM HistoriqueCCTs
SELECT @CCTCount = COUNT(*) FROM CCTs
SELECT @ReseauCount = COUNT(*) FROM Reseaux

PRINT 'HistoriqueCCTs: ' + CAST(@HistoriqueCount AS VARCHAR) + ' enregistrements'
PRINT 'CCTs: ' + CAST(@CCTCount AS VARCHAR) + ' enregistrements'
PRINT 'Reseaux: ' + CAST(@ReseauCount AS VARCHAR) + ' enregistrements'

PRINT ''

-- 3. Vérifier la structure de la table HistoriqueCCTs
PRINT '3. STRUCTURE DE LA TABLE HistoriqueCCTs:'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueCCTs'
ORDER BY ORDINAL_POSITION

PRINT ''

-- 4. Vérifier les contraintes de clé étrangère
PRINT '4. CONTRAINTES DE CLÉ ÉTRANGÈRE:'
SELECT 
    fk.name AS FK_Name,
    OBJECT_NAME(fk.parent_object_id) AS Table_Name,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS Column_Name,
    OBJECT_NAME(fk.referenced_object_id) AS Referenced_Table_Name,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS Referenced_Column_Name
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) = 'HistoriqueCCTs'

PRINT ''

-- 5. Afficher les données existantes (si il y en a)
PRINT '5. DONNÉES EXISTANTES:'
IF @HistoriqueCount > 0
BEGIN
    SELECT 
        h.Id,
        h.CCTId,
        c.Nom AS CCTNom,
        h.ReseauId,
        r.Nom AS ReseauNom,
        h.DateDebut,
        h.DateFin
    FROM HistoriqueCCTs h
    LEFT JOIN CCTs c ON h.CCTId = c.Id
    LEFT JOIN Reseaux r ON h.ReseauId = r.Id
    ORDER BY h.DateDebut DESC
END
ELSE
BEGIN
    PRINT 'Aucune donnée trouvée dans HistoriqueCCTs'
    
    -- Afficher quelques exemples de CCTs et réseaux disponibles
    PRINT ''
    PRINT 'Exemples de CCTs disponibles:'
    SELECT TOP 3 Id, Nom FROM CCTs ORDER BY Id
    
    PRINT ''
    PRINT 'Exemples de réseaux disponibles:'
    SELECT TOP 3 Id, Nom FROM Reseaux ORDER BY Id
END

PRINT ''
PRINT '=== DIAGNOSTIC TERMINÉ ==='

-- 6. Suggestions de correction
PRINT ''
PRINT '=== SUGGESTIONS DE CORRECTION ==='
IF @HistoriqueCount = 0
BEGIN
    PRINT '• Exécuter le script Exemples_Historique_CCT.sql pour créer des données de test'
    PRINT '• Vérifier que les services backend sont correctement configurés'
    PRINT '• Vérifier que les contrôleurs sont accessibles via l''API'
END

IF @CCTCount = 0
BEGIN
    PRINT '• Créer des CCTs avant de créer l''historique'
END

IF @ReseauCount = 0
BEGIN
    PRINT '• Créer des réseaux avant de créer l''historique'
END

GO
