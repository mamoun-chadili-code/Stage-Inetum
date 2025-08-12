-- Script pour découvrir la structure des tables
-- Exécutez ce script pour voir les vraies noms de colonnes

USE CT_CNEH_DB;
GO

PRINT '=== DÉCOUVERTE DE LA STRUCTURE DES TABLES ===';
PRINT '';

-- Découvrir la structure de la table CCTs
PRINT '--- Structure de la table CCTs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'CCTs'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données CCTs :';
    SELECT TOP 3 * FROM CCTs;
END
ELSE
BEGIN
    PRINT 'Table CCTs n''existe pas.';
END
PRINT '';

-- Découvrir la structure de la table CategorieCCTs
PRINT '--- Structure de la table CategorieCCTs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CategorieCCTs')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'CategorieCCTs'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données CategorieCCTs :';
    SELECT TOP 3 * FROM CategorieCCTs;
END
ELSE
BEGIN
    PRINT 'Table CategorieCCTs n''existe pas.';
END
PRINT '';

-- Découvrir la structure de la table StatutAdministratifs
PRINT '--- Structure de la table StatutAdministratifs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutAdministratifs')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'StatutAdministratifs'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données StatutAdministratifs :';
    SELECT TOP 3 * FROM StatutAdministratifs;
END
ELSE
BEGIN
    PRINT 'Table StatutAdministratifs n''existe pas.';
END
PRINT '';

-- Découvrir la structure de la table Agents
PRINT '--- Structure de la table Agents ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Agents'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données Agents :';
    SELECT TOP 3 * FROM Agents;
END
ELSE
BEGIN
    PRINT 'Table Agents n''existe pas.';
END
PRINT '';

-- Découvrir la structure de la table Regions
PRINT '--- Structure de la table Regions ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Regions')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Regions'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données Regions :';
    SELECT TOP 3 * FROM Regions;
END
ELSE
BEGIN
    PRINT 'Table Regions n''existe pas.';
END
PRINT '';

-- Découvrir la structure de la table Villes
PRINT '--- Structure de la table Villes ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Villes')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Villes'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données Villes :';
    SELECT TOP 3 * FROM Villes;
END
ELSE
BEGIN
    PRINT 'Table Villes n''existe pas.';
END
PRINT '';

-- Découvrir la structure de la table Reseaux
PRINT '--- Structure de la table Reseaux ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Reseaux')
BEGIN
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Reseaux'
    ORDER BY ORDINAL_POSITION;
    
    PRINT 'Données Reseaux :';
    SELECT TOP 3 * FROM Reseaux;
END
ELSE
BEGIN
    PRINT 'Table Reseaux n''existe pas.';
END
PRINT '';

PRINT '=== FIN DE LA DÉCOUVERTE ===';
PRINT 'Utilisez ces informations pour créer le bon script de test.'; 