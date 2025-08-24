-- Script de vérification et remplissage des dropdowns pour le formulaire Agent
-- Vérifie que toutes les tables de référence contiennent des données

USE [CT_CNEH_DB]
GO

PRINT ' === VÉRIFICATION DES DROPDOWNS POUR LE FORMULAIRE AGENT ==='
PRINT ''

-- 1. Vérifier la table StatutAdministratifs
PRINT '🔍 VÉRIFICATION DE LA TABLE StatutAdministratifs:'
IF EXISTS (SELECT * FROM StatutAdministratifs)
BEGIN
    DECLARE @countStatuts INT = (SELECT COUNT(*) FROM StatutAdministratifs)
    PRINT '   ✅ Table StatutAdministratifs: ' + CAST(@countStatuts AS VARCHAR) + ' enregistrement(s)'
    
    IF @countStatuts = 0
    BEGIN
        PRINT '   ⚠️  Table vide - Ajout de données d''exemple...'
        
        INSERT INTO StatutAdministratifs (Libelle, Code, DateCreation, DateModification)
        VALUES 
            ('En activité', 'ACTIF', GETDATE(), GETDATE()),
            ('Suspendu', 'SUSP', GETDATE(), GETDATE()),
            ('En formation', 'FORM', GETDATE(), GETDATE()),
            ('En congé', 'CONG', GETDATE(), GETDATE()),
            ('Retraité', 'RETR', GETDATE(), GETDATE()),
            ('Démissionné', 'DEMI', GETDATE(), GETDATE());
        
        PRINT '   ✅ 6 statuts administratifs ajoutés'
    END
    ELSE
    BEGIN
        PRINT '   📋 Statuts disponibles:'
        SELECT '     - ' + Libelle + ' (' + Code + ')' as Statut
        FROM StatutAdministratifs
        ORDER BY Libelle;
    END
END
ELSE
BEGIN
    PRINT '   ❌ ERREUR: Table StatutAdministratifs introuvable'
    PRINT '   Vérifiez que le modèle et la migration sont corrects'
END

PRINT ''

-- 2. Vérifier la table CategorieCCTs (utilisée pour les catégories CAP)
PRINT '🔍 VÉRIFICATION DE LA TABLE CategorieCCTs (catégories CAP):'
IF EXISTS (SELECT * FROM CategorieCCTs)
BEGIN
    DECLARE @countCategories INT = (SELECT COUNT(*) FROM CategorieCCTs)
    PRINT '   ✅ Table CategorieCCTs: ' + CAST(@countCategories AS VARCHAR) + ' enregistrement(s)'
    
    IF @countCategories = 0
    BEGIN
        PRINT '   ⚠️  Table vide - Ajout de données d''exemple...'
        
        INSERT INTO CategorieCCTs (Libelle, Code)
        VALUES 
            ('Véhicules toute catégorie', 'VTC'),
            ('Véhicules légers', 'VL'),
            ('Poids lourds', 'PL'),
            ('Motocycles', 'MC'),
            ('Véhicules agricoles', 'VA'),
            ('Véhicules spéciaux', 'VS');
        
        PRINT '   ✅ 6 catégories CAP ajoutées'
    END
    ELSE
    BEGIN
        PRINT '   📋 Catégories CAP disponibles:'
        SELECT '     - ' + Libelle + ' (' + ISNULL(Code, 'Sans code') + ')' as Categorie
        FROM CategorieCCTs
        ORDER BY Libelle;
    END
END
ELSE
BEGIN
    PRINT '   ❌ ERREUR: Table CategorieCCTs introuvable'
    PRINT '   Vérifiez que le modèle et la migration sont corrects'
END

PRINT ''

-- 3. Vérifier la table CCTs
PRINT '🔍 VÉRIFICATION DE LA TABLE CCTs:'
IF EXISTS (SELECT * FROM CCTs)
BEGIN
    DECLARE @countCCTs INT = (SELECT COUNT(*) FROM CCTs)
    PRINT '   ✅ Table CCTs: ' + CAST(@countCCTs AS VARCHAR) + ' enregistrement(s)'
    
    IF @countCCTs = 0
    BEGIN
        PRINT '   ⚠️  Table vide - Vérifiez que les scripts de remplissage CCTs ont été exécutés'
    END
    ELSE
    BEGIN
        PRINT '   📋 CCTs disponibles (top 5):'
        SELECT TOP 5 '     - ' + Nom + ' (ID: ' + CAST(Id AS VARCHAR) + ')' as CCT
        FROM CCTs
        ORDER BY Nom;
    END
END
ELSE
BEGIN
    PRINT '   ❌ ERREUR: Table CCTs introuvable'
    PRINT '   Vérifiez que le modèle et la migration sont corrects'
END

PRINT ''

-- 4. Vérifier la table Regions
PRINT '🔍 VÉRIFICATION DE LA TABLE Regions:'
IF EXISTS (SELECT * FROM Regions)
BEGIN
    DECLARE @countRegions INT = (SELECT COUNT(*) FROM Regions)
    PRINT '   ✅ Table Regions: ' + CAST(@countRegions AS VARCHAR) + ' enregistrement(s)'
    
    IF @countRegions = 0
    BEGIN
        PRINT '   ⚠️  Table vide - Vérifiez que les scripts de remplissage ont été exécutés'
    END
    ELSE
    BEGIN
        PRINT '   📋 Régions disponibles (top 5):'
        SELECT TOP 5 '     - ' + libelle + ' (ID: ' + CAST(Id AS VARCHAR) + ')' as Region
        FROM Regions
        ORDER BY libelle;
    END
END
ELSE
BEGIN
    PRINT '   ❌ ERREUR: Table Regions introuvable'
    PRINT '   Vérifiez que le modèle et la migration sont corrects'
END

PRINT ''

-- 5. Vérifier la table Villes
PRINT '🔍 VÉRIFICATION DE LA TABLE Villes:'
IF EXISTS (SELECT * FROM Villes)
BEGIN
    DECLARE @countVilles INT = (SELECT COUNT(*) FROM Villes)
    PRINT '   ✅ Table Villes: ' + CAST(@countVilles AS VARCHAR) + ' enregistrement(s)'
    
    IF @countVilles = 0
    BEGIN
        PRINT '   ⚠️  Table vide - Vérifiez que les scripts de remplissage ont été exécutés'
    END
    ELSE
    BEGIN
        PRINT '   📋 Villes disponibles (top 5):'
        SELECT TOP 5 '     - ' + nom + ' (ID: ' + CAST(Id AS VARCHAR) + ')' as Ville
        FROM Villes
        ORDER BY nom;
    END
END
ELSE
BEGIN
    PRINT '   ❌ ERREUR: Table Villes introuvable'
    PRINT '   Vérifiez que le modèle et la migration sont corrects'
END

PRINT ''

-- 6. Vérifier la table Reseaux
PRINT '🔍 VÉRIFICATION DE LA TABLE Reseaux:'
IF EXISTS (SELECT * FROM Reseaux)
BEGIN
    DECLARE @countReseaux INT = (SELECT COUNT(*) FROM Reseaux)
    PRINT '   ✅ Table Reseaux: ' + CAST(@countReseaux AS VARCHAR) + ' enregistrement(s)'
    
    IF @countReseaux = 0
    BEGIN
        PRINT '   ⚠️  Table vide - Vérifiez que les scripts de remplissage ont été exécutés'
    END
    ELSE
    BEGIN
        PRINT '   📋 Réseaux disponibles (top 5):'
        SELECT TOP 5 '     - ' + Nom + ' (ID: ' + CAST(Id AS VARCHAR) + ')' as Reseau
        FROM Reseaux
        ORDER BY Nom;
    END
END
ELSE
BEGIN
    PRINT '   ❌ ERREUR: Table Reseaux introuvable'
    PRINT '   Vérifiez que le modèle et la migration sont corrects'
END

PRINT ''
PRINT ' === RÉSUMÉ DE LA VÉRIFICATION ==='
PRINT ''

-- Résumé final
SELECT 
    'StatutAdministratifs' as TableName,
    COUNT(*) as TotalRecords,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ OK'
        ELSE '❌ VIDE'
    END as Status
FROM StatutAdministratifs
UNION ALL
SELECT 
    'CategorieCCTs (CAP)' as TableName,
    COUNT(*) as TotalRecords,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ OK'
        ELSE '❌ VIDE'
    END as Status
FROM CategorieCCTs
UNION ALL
SELECT 
    'CCTs' as TableName,
    COUNT(*) as TotalRecords,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ OK'
        ELSE '❌ VIDE'
    END as Status
FROM CCTs
UNION ALL
SELECT 
    'Regions' as TableName,
    COUNT(*) as TotalRecords,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ OK'
        ELSE '❌ VIDE'
    END as Status
FROM Regions
UNION ALL
SELECT 
    'Villes' as TableName,
    COUNT(*) as TotalRecords,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ OK'
        ELSE '❌ VIDE'
    END as Status
FROM Villes
UNION ALL
SELECT 
    'Reseaux' as TableName,
    COUNT(*) as TotalRecords,
    CASE 
        WHEN COUNT(*) > 0 THEN '✅ OK'
        ELSE '❌ VIDE'
    END as Status
FROM Reseaux;

PRINT ''
PRINT ' === INSTRUCTIONS ==='
PRINT '1. Si des tables sont vides, exécutez les scripts de remplissage correspondants'
PRINT '2. Vérifiez que le backend est démarré et accessible'
PRINT '3. Testez les endpoints API dans l''ordre:'
PRINT '   - GET /api/StatutsAdministratifs'
PRINT '   - GET /api/CategorieCAPs'
PRINT '   - GET /api/CCTs'
PRINT '   - GET /api/Regions'
PRINT '   - GET /api/Villes'
PRINT '   - GET /api/Reseaux'
PRINT ''
PRINT '✅ SCRIPT TERMINÉ !'
GO
