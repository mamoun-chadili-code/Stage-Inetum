-- Script pour supprimer les colonnes MotifAffectation et MotifFinAffectation
-- de la table HistoriqueAgent selon le cahier des charges

USE [CT_CNEH_DB];
GO

PRINT '=== SUPPRESSION DES COLONNES MOTIF DE LA TABLE HistoriqueAgent ===';
GO

-- Vérifier la structure actuelle
PRINT '1. Structure actuelle de la table HistoriqueAgent:';
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueAgent'
ORDER BY ORDINAL_POSITION;
GO

-- Supprimer la colonne MotifAffectation
PRINT '2. Suppression de la colonne MotifAffectation...';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'HistoriqueAgent' AND COLUMN_NAME = 'MotifAffectation')
BEGIN
    ALTER TABLE [HistoriqueAgent] DROP COLUMN [MotifAffectation];
    PRINT '   ✅ Colonne MotifAffectation supprimée avec succès';
END
ELSE
BEGIN
    PRINT '   ℹ️ Colonne MotifAffectation n''existe pas';
END
GO

-- Supprimer la colonne MotifFinAffectation
PRINT '3. Suppression de la colonne MotifFinAffectation...';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'HistoriqueAgent' AND COLUMN_NAME = 'MotifFinAffectation')
BEGIN
    ALTER TABLE [HistoriqueAgent] DROP COLUMN [MotifFinAffectation];
    PRINT '   ✅ Colonne MotifFinAffectation supprimée avec succès';
END
ELSE
BEGIN
    PRINT '   ℹ️ Colonne MotifFinAffectation n''existe pas';
END
GO

-- Vérifier la structure finale
PRINT '4. Structure finale de la table HistoriqueAgent:';
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueAgent'
ORDER BY ORDINAL_POSITION;
GO

-- Afficher un échantillon des données
PRINT '5. Échantillon des données après suppression:';
SELECT TOP 3 * FROM [HistoriqueAgent];
GO

PRINT '=== SUPPRESSION TERMINÉE ===';
GO
