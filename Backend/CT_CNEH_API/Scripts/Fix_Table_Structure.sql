-- =====================================================
-- CORRECTION : Structure de la Table HistoriqueAffectations
-- =====================================================
USE [CT_CNEH_DB]
GO

PRINT '=== CORRECTION STRUCTURE TABLE ==='
PRINT ''

-- 1. Vérifier la structure actuelle
PRINT '--- STRUCTURE ACTUELLE ---'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    CASE 
        WHEN IS_NULLABLE = 'YES' THEN 'NULLABLE'
        ELSE 'NON-NULLABLE'
    END as NullableStatus
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueAffectations'
ORDER BY ORDINAL_POSITION

-- 2. Corriger AgentId pour permettre les NULL
PRINT ''
PRINT '--- CORRECTION AgentId ---'
ALTER TABLE HistoriqueAffectations 
ALTER COLUMN AgentId int NULL

PRINT '✅ AgentId modifié pour permettre les NULL'

-- 3. Vérifier la structure corrigée
PRINT ''
PRINT '--- STRUCTURE CORRIGÉE ---'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    CASE 
        WHEN IS_NULLABLE = 'YES' THEN 'NULLABLE'
        ELSE 'NON-NULLABLE'
    END as NullableStatus
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
    ChefCentreId,
    DateAffectation,
    DateFinAffectation,
    MotifAffectation
FROM HistoriqueAffectations 
WHERE AgentId = 2

PRINT ''
PRINT '✅ Structure de la table corrigée !'
PRINT '=== FIN CORRECTION ==='
GO
