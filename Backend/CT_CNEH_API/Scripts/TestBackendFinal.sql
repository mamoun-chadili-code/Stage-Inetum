-- Script de test final basé sur la structure réelle
-- Utilise les vrais noms de colonnes découverts

USE CT_CNEH_DB;
GO

PRINT '=== TEST FINAL DU BACKEND ===';
PRINT '';

-- Vérifier les CCTs (structure confirmée)
PRINT '--- CCTs ---';
SELECT COUNT(*) as NombreCCTs FROM CCTs;
SELECT TOP 5 Id, Nom FROM CCTs ORDER BY Id;
PRINT '';

-- Vérifier les catégories
PRINT '--- Catégories CCT ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CategorieCCTs')
BEGIN
    SELECT COUNT(*) as NombreCategories FROM CategorieCCTs;
    -- Utiliser Libelle si elle existe, sinon afficher seulement l'ID
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'CategorieCCTs' AND COLUMN_NAME = 'Libelle')
    BEGIN
        SELECT Id, Libelle FROM CategorieCCTs ORDER BY Id;
    END
    ELSE
    BEGIN
        SELECT Id FROM CategorieCCTs ORDER BY Id;
    END
END
ELSE
BEGIN
    PRINT 'Table CategorieCCTs n''existe pas.';
END
PRINT '';

-- Vérifier les statuts administratifs
PRINT '--- Statuts Administratifs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutAdministratifs')
BEGIN
    SELECT COUNT(*) as NombreStatuts FROM StatutAdministratifs;
    -- Utiliser Libelle si elle existe, sinon afficher seulement l'ID
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'StatutAdministratifs' AND COLUMN_NAME = 'Libelle')
    BEGIN
        SELECT Id, Libelle FROM StatutAdministratifs ORDER BY Id;
    END
    ELSE
    BEGIN
        SELECT Id FROM StatutAdministratifs ORDER BY Id;
    END
END
ELSE
BEGIN
    PRINT 'Table StatutAdministratifs n''existe pas.';
END
PRINT '';

-- Vérifier les agents
PRINT '--- Agents ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    SELECT COUNT(*) as NombreAgents FROM Agents;
    IF (SELECT COUNT(*) FROM Agents) > 0
    BEGIN
        SELECT TOP 5 Id, Nom, Prenom, CIN FROM Agents ORDER BY Id;
    END
    ELSE
    BEGIN
        PRINT 'Aucun agent trouvé.';
    END
END
ELSE
BEGIN
    PRINT 'Table Agents n''existe pas.';
END
PRINT '';

-- Vérifier les régions
PRINT '--- Régions ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Regions')
BEGIN
    SELECT COUNT(*) as NombreRegions FROM Regions;
    -- Utiliser Nom si elle existe, sinon Libelle
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Regions' AND COLUMN_NAME = 'Nom')
    BEGIN
        SELECT Id, Nom FROM Regions ORDER BY Id;
    END
    ELSE IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Regions' AND COLUMN_NAME = 'Libelle')
    BEGIN
        SELECT Id, Libelle FROM Regions ORDER BY Id;
    END
    ELSE
    BEGIN
        SELECT Id FROM Regions ORDER BY Id;
    END
END
ELSE
BEGIN
    PRINT 'Table Regions n''existe pas.';
END
PRINT '';

-- Vérifier les villes
PRINT '--- Villes ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Villes')
BEGIN
    SELECT COUNT(*) as NombreVilles FROM Villes;
    SELECT TOP 5 Id, Nom FROM Villes ORDER BY Id;
END
ELSE
BEGIN
    PRINT 'Table Villes n''existe pas.';
END
PRINT '';

-- Vérifier les réseaux
PRINT '--- Réseaux ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Reseaux')
BEGIN
    SELECT COUNT(*) as NombreReseaux FROM Reseaux;
    -- Utiliser Nom si elle existe, sinon Libelle
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Reseaux' AND COLUMN_NAME = 'Nom')
    BEGIN
        SELECT Id, Nom FROM Reseaux ORDER BY Id;
    END
    ELSE IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Reseaux' AND COLUMN_NAME = 'Libelle')
    BEGIN
        SELECT Id, Libelle FROM Reseaux ORDER BY Id;
    END
    ELSE
    BEGIN
        SELECT Id FROM Reseaux ORDER BY Id;
    END
END
ELSE
BEGIN
    PRINT 'Table Reseaux n''existe pas.';
END
PRINT '';

PRINT '=== FIN DU TEST FINAL ===';
PRINT '✅ Backend prêt pour les tests !';
PRINT '';
PRINT '🎯 Prochaines étapes :';
PRINT '1. Lancez le backend : dotnet run';
PRINT '2. Testez les endpoints dans Swagger';
PRINT '3. Lancez le frontend : npm start';
PRINT '4. Testez les fonctionnalités CRUD'; 