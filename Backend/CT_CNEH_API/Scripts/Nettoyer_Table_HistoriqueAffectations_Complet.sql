-- =====================================================
-- NETTOYAGE COMPLET : Table HistoriqueAffectations
-- =====================================================
USE [CT_CNEH_DB]
GO

PRINT '=== NETTOYAGE COMPLET TABLE HistoriqueAffectations ==='
PRINT ''

-- 1. Vérifier la structure actuelle
PRINT '--- STRUCTURE ACTUELLE ---'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueAffectations'
ORDER BY ORDINAL_POSITION

-- 2. Supprimer les dépendances
PRINT ''
PRINT '--- SUPPRESSION DES DÉPENDANCES ---'

-- Supprimer la clé étrangère
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_HistoriqueAffectations_ChefCentres_ChefCentreId')
BEGIN
    ALTER TABLE HistoriqueAffectations 
    DROP CONSTRAINT FK_HistoriqueAffectations_ChefCentres_ChefCentreId
    PRINT '✅ Clé étrangère FK_HistoriqueAffectations_ChefCentres_ChefCentreId supprimée'
END
ELSE
BEGIN
    PRINT 'ℹ️ Clé étrangère FK_HistoriqueAffectations_ChefCentres_ChefCentreId n''existe pas'
END

-- Supprimer l'index
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_HistoriqueAffectations_ChefCentreId')
BEGIN
    DROP INDEX IX_HistoriqueAffectations_ChefCentreId ON HistoriqueAffectations
    PRINT '✅ Index IX_HistoriqueAffectations_ChefCentreId supprimé'
END
ELSE
BEGIN
    PRINT 'ℹ️ Index IX_HistoriqueAffectations_ChefCentreId n''existe pas'
END

-- 3. Supprimer la colonne ChefCentreId
PRINT ''
PRINT '--- SUPPRESSION ChefCentreId ---'
ALTER TABLE HistoriqueAffectations 
DROP COLUMN ChefCentreId

PRINT '✅ Colonne ChefCentreId supprimée'

-- 4. Vérifier la structure nettoyée
PRINT ''
PRINT '--- STRUCTURE NETTOYÉE ---'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueAffectations'
ORDER BY ORDINAL_POSITION

-- 5. Vérifier les données
PRINT ''
PRINT '--- VÉRIFICATION DONNÉES ---'
SELECT 
    Id,
    EntiteId,
    TypeEntite,
    CCTId,
    AgentId,
    DateAffectation,
    DateFinAffectation,
    MotifAffectation
FROM HistoriqueAffectations 
WHERE AgentId = 2

PRINT ''
PRINT '✅ Table HistoriqueAffectations complètement nettoyée !'
PRINT '=== FIN NETTOYAGE ==='
GO
