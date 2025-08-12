-- Script pour découvrir tous les noms de colonnes
-- Exécutez ce script pour voir les vrais noms de colonnes de chaque table

USE CT_CNEH_DB;
GO

PRINT '=== DÉCOUVERTE COMPLÈTE DES COLONNES ===';
PRINT '';

-- Fonction pour afficher les colonnes d'une table
DECLARE @sql NVARCHAR(MAX);
DECLARE @tableName NVARCHAR(128);

-- Découvrir les colonnes de CCTs
PRINT '--- Colonnes de la table CCTs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'CCTs'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données CCTs (toutes les colonnes) :';
    SELECT TOP 3 * FROM CCTs;
END
ELSE
BEGIN
    PRINT 'Table CCTs n''existe pas.';
END
PRINT '';

-- Découvrir les colonnes de CategorieCCTs
PRINT '--- Colonnes de la table CategorieCCTs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CategorieCCTs')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'CategorieCCTs'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données CategorieCCTs (toutes les colonnes) :';
    SELECT TOP 3 * FROM CategorieCCTs;
END
ELSE
BEGIN
    PRINT 'Table CategorieCCTs n''existe pas.';
END
PRINT '';

-- Découvrir les colonnes de StatutAdministratifs
PRINT '--- Colonnes de la table StatutAdministratifs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutAdministratifs')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'StatutAdministratifs'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données StatutAdministratifs (toutes les colonnes) :';
    SELECT TOP 3 * FROM StatutAdministratifs;
END
ELSE
BEGIN
    PRINT 'Table StatutAdministratifs n''existe pas.';
END
PRINT '';

-- Découvrir les colonnes de Agents
PRINT '--- Colonnes de la table Agents ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Agents'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données Agents (toutes les colonnes) :';
    SELECT TOP 3 * FROM Agents;
END
ELSE
BEGIN
    PRINT 'Table Agents n''existe pas.';
END
PRINT '';

-- Découvrir les colonnes de Regions
PRINT '--- Colonnes de la table Regions ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Regions')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Regions'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données Regions (toutes les colonnes) :';
    SELECT TOP 3 * FROM Regions;
END
ELSE
BEGIN
    PRINT 'Table Regions n''existe pas.';
END
PRINT '';

-- Découvrir les colonnes de Villes
PRINT '--- Colonnes de la table Villes ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Villes')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Villes'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données Villes (toutes les colonnes) :';
    SELECT TOP 3 * FROM Villes;
END
ELSE
BEGIN
    PRINT 'Table Villes n''existe pas.';
END
PRINT '';

-- Découvrir les colonnes de Reseaux
PRINT '--- Colonnes de la table Reseaux ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Reseaux')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Reseaux'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données Reseaux (toutes les colonnes) :';
    SELECT TOP 3 * FROM Reseaux;
END
ELSE
BEGIN
    PRINT 'Table Reseaux n''existe pas.';
END
PRINT '';

PRINT '=== FIN DE LA DÉCOUVERTE COMPLÈTE ===';
PRINT 'Utilisez ces informations pour créer le script de test parfait.'; 