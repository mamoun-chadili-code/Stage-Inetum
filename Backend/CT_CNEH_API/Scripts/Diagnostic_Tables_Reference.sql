-- Script de diagnostic des tables de référence
-- Vérification avant d'ajouter les réseaux

USE [CT_CNEH_DB]
GO

PRINT '🔍 === DIAGNOSTIC DES TABLES DE RÉFÉRENCE ==='
PRINT ''

-- 1. Vérifier la table Statuts
PRINT '📊 TABLE STATUTS:'
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Statuts')
BEGIN
    SELECT 
        'Statuts' as TableName,
        COUNT(*) as TotalRecords,
        MIN(Id) as MinId,
        MAX(Id) as MaxId
    FROM Statuts;
    
    SELECT TOP 10 Id, nom, description, isActive FROM Statuts ORDER BY Id;
END
ELSE
BEGIN
    PRINT '❌ Table Statuts n''existe pas !'
END
PRINT ''

-- 2. Vérifier la table Villes
PRINT '📊 TABLE VILLES:'
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Villes')
BEGIN
    SELECT 
        'Villes' as TableName,
        COUNT(*) as TotalRecords,
        MIN(Id) as MinId,
        MAX(Id) as MaxId
    FROM Villes;
    
    SELECT TOP 10 Id, nom, code, RegionId FROM Villes ORDER BY Id;
END
ELSE
BEGIN
    PRINT '❌ Table Villes n''existe pas !'
END
PRINT ''

-- 3. Vérifier la table CadreAutorisations
PRINT '📊 TABLE CADREAUTORISATIONS:'
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CadreAutorisations')
BEGIN
    SELECT 
        'CadreAutorisations' as TableName,
        COUNT(*) as TotalRecords,
        MIN(Id) as MinId,
        MAX(Id) as MaxId
    FROM CadreAutorisations;
    
    SELECT TOP 10 Id, libelle, code FROM CadreAutorisations ORDER BY Id;
END
ELSE
BEGIN
    PRINT '❌ Table CadreAutorisations n''existe pas !'
END
PRINT ''

-- 4. Vérifier la table Reseaux actuelle
PRINT '📊 TABLE RESEAUX (ACTUELLE):'
IF EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Reseaux')
BEGIN
    SELECT 
        'Reseaux' as TableName,
        COUNT(*) as TotalRecords,
        MIN(Id) as MinId,
        MAX(Id) as MaxId
    FROM Reseaux;
    
    SELECT TOP 5 Id, Nom, Agrement, StatutId, VilleId, CadreAutorisationId FROM Reseaux ORDER BY Id;
END
ELSE
BEGIN
    PRINT '❌ Table Reseaux n''existe pas !'
END
PRINT ''

-- 5. Vérifier les contraintes de clés étrangères
PRINT '🔗 CONTRAINTES DE CLÉS ÉTRANGÈRES:'
SELECT 
    fk.name as FK_Name,
    OBJECT_NAME(fk.parent_object_id) as TableName,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) as ColumnName,
    OBJECT_NAME(fk.referenced_object_id) as ReferencedTableName,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) as ReferencedColumnName
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) = 'Reseaux'
ORDER BY fk.name;

PRINT ''
PRINT '✅ DIAGNOSTIC TERMINÉ'
GO
