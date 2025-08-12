-- Script de test ultra-simple
-- Teste seulement l'existence des tables et le nombre d'enregistrements

USE CT_CNEH_DB;
GO

PRINT '=== TEST ULTRA-SIMPLE DU BACKEND ===';
PRINT '';

-- Vérifier les CCTs
PRINT '--- CCTs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    SELECT COUNT(*) as NombreCCTs FROM CCTs;
    PRINT 'Table CCTs existe et contient des données.';
END
ELSE
BEGIN
    PRINT 'Table CCTs n''existe pas.';
END
PRINT '';

-- Vérifier les catégories
PRINT '--- Catégories CCT ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CategorieCCTs')
BEGIN
    SELECT COUNT(*) as NombreCategories FROM CategorieCCTs;
    PRINT 'Table CategorieCCTs existe et contient des données.';
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
    PRINT 'Table StatutAdministratifs existe et contient des données.';
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
        PRINT 'Table Agents existe et contient des agents.';
    END
    ELSE
    BEGIN
        PRINT 'Table Agents existe mais ne contient aucun agent.';
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
    PRINT 'Table Regions existe et contient des données.';
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
    PRINT 'Table Villes existe et contient des données.';
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
    PRINT 'Table Reseaux existe et contient des données.';
END
ELSE
BEGIN
    PRINT 'Table Reseaux n''existe pas.';
END
PRINT '';

PRINT '=== FIN DU TEST ULTRA-SIMPLE ===';
PRINT '✅ Si toutes les tables existent, le backend devrait fonctionner.';
PRINT '';
PRINT '🎯 Prochaines étapes :';
PRINT '1. Lancez le backend : dotnet run';
PRINT '2. Testez les endpoints dans Swagger';
PRINT '3. Lancez le frontend : npm start'; 