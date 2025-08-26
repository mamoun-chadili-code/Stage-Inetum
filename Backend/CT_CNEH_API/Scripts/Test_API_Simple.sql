-- =====================================================
-- TEST SIMPLE : Vérification des Données
-- =====================================================
USE [CT_CNEH_DB]
GO

PRINT '=== TEST SIMPLE API ==='
PRINT ''

-- 1. Vérifier la connexion
PRINT '1. Test de connexion...'
SELECT GETDATE() as DateTest, DB_NAME() as BaseActuelle
PRINT '✅ Connexion OK'

-- 2. Vérifier les données
PRINT ''
PRINT '2. Vérification des données...'
SELECT COUNT(*) as Total FROM HistoriqueAffectations
SELECT COUNT(*) as PourAgent2 FROM HistoriqueAffectations WHERE AgentId = 2

-- 3. Afficher les données
PRINT ''
PRINT '3. Données pour Agent ID 2:'
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
PRINT '=== FIN TEST ==='
GO
