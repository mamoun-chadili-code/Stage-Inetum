-- Script de diagnostic des cadres d'autorisation
-- Voir les vrais noms existants

USE [CT_CNEH_DB]
GO

PRINT '🔍 === DIAGNOSTIC DES CADRES D''AUTORISATION ==='
PRINT ''

-- Voir tous les cadres d'autorisation existants
SELECT 
    'CadreAutorisations' as TableName,
    COUNT(*) as TotalRecords,
    MIN(Id) as MinId,
    MAX(Id) as MaxId
FROM CadreAutorisations;

PRINT ''
PRINT '📋 TOUS LES CADRES D''AUTORISATION EXISTANTS:'
SELECT 
    Id,
    libelle,
    code,
    'Utiliser ce nom exact' as Note
FROM CadreAutorisations 
ORDER BY Id;

PRINT ''
PRINT '✅ DIAGNOSTIC TERMINÉ'
PRINT 'Copiez les noms exacts pour le script des réseaux !'
GO
