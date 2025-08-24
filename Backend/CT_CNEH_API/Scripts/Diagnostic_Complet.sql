-- Script de diagnostic complet
-- Voir tous les noms exacts des tables de référence

USE [CT_CNEH_DB]
GO

PRINT '🔍 === DIAGNOSTIC COMPLET DES TABLES DE RÉFÉRENCE ==='
PRINT ''

-- 1. STATUTS
PRINT '📊 TABLE STATUTS:'
SELECT 
    'Statuts' as TableName,
    COUNT(*) as TotalRecords
FROM Statuts;

PRINT '📋 NOMS EXACTS DES STATUTS:'
SELECT 
    Id,
    nom,
    description,
    'Utiliser ce nom exact' as Note
FROM Statuts 
ORDER BY Id;
PRINT ''

-- 2. VILLES (TOP 20 pour éviter trop de résultats)
PRINT '📊 TABLE VILLES:'
SELECT 
    'Villes' as TableName,
    COUNT(*) as TotalRecords
FROM Villes;

PRINT '📋 PREMIERS 20 NOMS EXACTS DES VILLES:'
SELECT TOP 20
    Id,
    nom,
    code,
    RegionId,
    'Utiliser ce nom exact' as Note
FROM Villes 
ORDER BY Id;
PRINT ''

-- 3. CADRE AUTORISATIONS
PRINT '📊 TABLE CADREAUTORISATIONS:'
SELECT 
    'CadreAutorisations' as TableName,
    COUNT(*) as TotalRecords
FROM CadreAutorisations;

PRINT '📋 NOMS EXACTS DES CADRES:'
SELECT 
    Id,
    libelle,
    code,
    'Utiliser ce nom exact' as Note
FROM CadreAutorisations 
ORDER BY Id;
PRINT ''

-- 4. RÉSEAUX ACTUELS
PRINT '📊 TABLE RESEAUX (ACTUELLE):'
SELECT 
    'Reseaux' as TableName,
    COUNT(*) as TotalRecords
FROM Reseaux;

IF EXISTS (SELECT 1 FROM Reseaux)
BEGIN
    PRINT '📋 RÉSEAUX EXISTANTS:'
    SELECT TOP 10
        Id,
        Nom,
        Agrement,
        StatutId,
        VilleId,
        CadreAutorisationId
    FROM Reseaux 
    ORDER BY Id;
END
ELSE
BEGIN
    PRINT 'ℹ️ Aucun réseau existant'
END

PRINT ''
PRINT '✅ DIAGNOSTIC COMPLET TERMINÉ'
PRINT 'Copiez les noms exacts pour adapter le script des réseaux !'
GO
