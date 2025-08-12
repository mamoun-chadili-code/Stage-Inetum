-- Script pour vérifier les CCTs existants dans la base de données
USE CT_CNEH_DB;
GO

PRINT '=== VÉRIFICATION DES CCTs EXISTANTS ===';
PRINT '';

-- Vérifier si la table CCTs existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    PRINT 'ERREUR : La table CCTs n''existe pas.';
    RETURN;
END

-- Compter le nombre total de CCTs
DECLARE @TotalCCTs INT;
SELECT @TotalCCTs = COUNT(*) FROM CCTs;
PRINT 'Nombre total de CCTs : ' + CAST(@TotalCCTs AS VARCHAR);
PRINT '';

-- Afficher tous les CCTs avec leurs IDs
PRINT '=== LISTE DES CCTs EXISTANTS ===';
SELECT 
    Id,
    Nom,
    Agrement,
    CategorieId,
    StatutId,
    ReseauId,
    VilleId
FROM CCTs 
ORDER BY Id;

PRINT '';
PRINT '=== INFORMATIONS POUR LE SCRIPT D''AGENTS ===';
PRINT 'Utilisez ces IDs dans votre script AddTwoMoreAgents.sql :';

-- Afficher les 5 premiers CCTs pour le script
SELECT TOP 5
    'CCTId' + CAST(ROW_NUMBER() OVER (ORDER BY Id) AS VARCHAR) + ' = ' + CAST(Id AS VARCHAR) + '; -- ' + ISNULL(Nom, 'Sans nom')
FROM CCTs 
ORDER BY Id;

PRINT '';
PRINT '=== VÉRIFICATION DES CATÉGORIES ===';
SELECT 
    Id,
    Libelle,
    Code
FROM CategorieCCTs 
ORDER BY Id;

PRINT '';
PRINT '=== VÉRIFICATION DES STATUTS ===';
SELECT 
    Id,
    Libelle
FROM StatutAdministratifs 
ORDER BY Id; 