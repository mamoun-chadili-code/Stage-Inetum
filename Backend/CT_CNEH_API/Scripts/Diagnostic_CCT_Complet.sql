-- Script de diagnostic complet pour la création des CCTs
-- Voir toutes les données de référence nécessaires

USE [CT_CNEH_DB]
GO

PRINT '🔍 === DIAGNOSTIC COMPLET POUR CRÉATION DES CCTs ==='
PRINT ''

-- 1. CategorieCCTs
PRINT '📊 TABLE CategorieCCTs:'
SELECT 
    'CategorieCCTs' as TableName,
    COUNT(*) as TotalRecords
FROM CategorieCCTs;

PRINT '📋 CATÉGORIES CCT DISPONIBLES:'
SELECT 
    Id,
    libelle,
    code,
    'Utiliser ce nom exact' as Note
FROM CategorieCCTs 
ORDER BY Id;
PRINT ''

-- 2. StatutCCTs
PRINT '📊 TABLE StatutCCTs:'
SELECT 
    'StatutCCTs' as TableName,
    COUNT(*) as TotalRecords
FROM StatutCCTs;

PRINT '📋 STATUTS CCT DISPONIBLES:'
SELECT 
    Id,
    libelle,
    code,
    'Utiliser ce nom exact' as Note
FROM StatutCCTs 
ORDER BY Id;
PRINT ''

-- 3. Reseaux
PRINT '📊 TABLE Reseaux:'
SELECT 
    'Reseaux' as TableName,
    COUNT(*) as TotalRecords
FROM Reseaux;

IF EXISTS (SELECT 1 FROM Reseaux)
BEGIN
    PRINT '📋 RÉSEAUX DISPONIBLES:'
    SELECT 
        Id,
        Nom,
        Agrement,
        StatutId,
        VilleId
    FROM Reseaux 
    ORDER BY Id;
END
ELSE
BEGIN
    PRINT 'ℹ️ Aucun réseau existant - Créez d''abord les réseaux !'
END
PRINT ''

-- 4. Villes (TOP 15 pour éviter trop de résultats)
PRINT '📊 TABLE Villes:'
SELECT 
    'Villes' as TableName,
    COUNT(*) as TotalRecords
FROM Villes;

PRINT '📋 PREMIERS 15 VILLES DISPONIBLES:'
SELECT TOP 15
    Id,
    nom,
    code,
    RegionId,
    'Utiliser ce nom exact' as Note
FROM Villes 
ORDER BY Id;
PRINT ''

-- 5. CadreAutorisations
PRINT '📊 TABLE CadreAutorisations:'
SELECT 
    'CadreAutorisations' as TableName,
    COUNT(*) as TotalRecords
FROM CadreAutorisations;

PRINT '📋 CADRES D''AUTORISATION DISPONIBLES:'
SELECT 
    Id,
    libelle,
    code,
    'Utiliser ce nom exact' as Note
FROM CadreAutorisations 
ORDER BY Id;
PRINT ''

-- 6. TypeCCTs
PRINT '📊 TABLE TypeCCTs:'
SELECT 
    'TypeCCTs' as TableName,
    COUNT(*) as TotalRecords
FROM TypeCCTs;

PRINT '📋 TYPES CCT DISPONIBLES:'
SELECT 
    Id,
    libelle,
    code,
    'Utiliser ce nom exact' as Note
FROM TypeCCTs 
ORDER BY Id;
PRINT ''

-- 7. Provinces
PRINT '📊 TABLE Provinces:'
SELECT 
    'Provinces' as TableName,
    COUNT(*) as TotalRecords
FROM Provinces;

PRINT '📋 PROVINCES DISPONIBLES:'
SELECT TOP 10
    Id,
    nom,
    code,
    RegionId,
    'Utiliser ce nom exact' as Note
FROM Provinces 
ORDER BY Id;
PRINT ''

-- 8. Regions
PRINT '📊 TABLE Regions:'
SELECT 
    'Regions' as TableName,
    COUNT(*) as TotalRecords
FROM Regions;

PRINT '📋 RÉGIONS DISPONIBLES:'
SELECT 
    Id,
    nom,
    code,
    'Utiliser ce nom exact' as Note
FROM Regions 
ORDER BY Id;
PRINT ''

-- 9. CCTs actuels
PRINT '📊 TABLE CCTs (ACTUELLE):'
SELECT 
    'CCTs' as TableName,
    COUNT(*) as TotalRecords
FROM CCTs;

IF EXISTS (SELECT 1 FROM CCTs)
BEGIN
    PRINT '📋 CCTs EXISTANTS:'
    SELECT TOP 5
        Id,
        Nom,
        Agrement,
        CategorieId,
        StatutId,
        ReseauId,
        VilleId
    FROM CCTs 
    ORDER BY Id;
END
ELSE
BEGIN
    PRINT 'ℹ️ Aucun CCT existant'
END

PRINT ''
PRINT '✅ DIAGNOSTIC COMPLET TERMINÉ'
PRINT 'Copiez les noms exacts pour créer le script des CCTs !'
GO
