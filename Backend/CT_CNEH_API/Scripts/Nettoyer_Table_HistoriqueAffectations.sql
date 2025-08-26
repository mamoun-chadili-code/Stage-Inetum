-- =====================================================
-- NETTOYAGE : Table HistoriqueAffectations
-- =====================================================
USE [CT_CNEH_DB]
GO

PRINT '=== NETTOYAGE TABLE HistoriqueAffectations ==='
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

-- 2. Supprimer la colonne ChefCentreId
PRINT ''
PRINT '--- SUPPRESSION ChefCentreId ---'
ALTER TABLE HistoriqueAffectations 
DROP COLUMN ChefCentreId

PRINT '✅ Colonne ChefCentreId supprimée'

-- 3. Vérifier la structure nettoyée
PRINT ''
PRINT '--- STRUCTURE NETTOYÉE ---'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueAffectations'
ORDER BY ORDINAL_POSITION

-- 4. Vérifier les données
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
PRINT '✅ Table HistoriqueAffectations nettoyée !'
PRINT '=== FIN NETTOYAGE ==='
GO
