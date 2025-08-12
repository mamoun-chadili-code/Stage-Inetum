-- Script pour tester les endpoints et diagnostiquer les erreurs
-- Exécutez ce script pour voir les erreurs exactes

USE CT_CNEH_DB;
GO

PRINT '=== DIAGNOSTIC DES ENDPOINTS ===';
PRINT '';

-- Test 1: Vérifier la table StatutAdministratifs
PRINT '--- Test 1: Table StatutAdministratifs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutAdministratifs')
BEGIN
    SELECT COUNT(*) as NombreStatuts FROM StatutAdministratifs;
    SELECT TOP 3 * FROM StatutAdministratifs;
    PRINT '✅ Table StatutAdministratifs existe et contient des données.';
END
ELSE
BEGIN
    PRINT '❌ Table StatutAdministratifs n''existe pas.';
END
PRINT '';

-- Test 2: Vérifier la table Agents avec l'ID 6
PRINT '--- Test 2: Agent avec ID 6 ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    IF EXISTS (SELECT * FROM Agents WHERE Id = 6)
    BEGIN
        SELECT * FROM Agents WHERE Id = 6;
        PRINT '✅ Agent avec ID 6 existe.';
    END
    ELSE
    BEGIN
        PRINT '❌ Agent avec ID 6 n''existe pas.';
        SELECT TOP 5 Id, Nom, Prenom FROM Agents ORDER BY Id;
    END
END
ELSE
BEGIN
    PRINT '❌ Table Agents n''existe pas.';
END
PRINT '';

-- Test 3: Vérifier les relations
PRINT '--- Test 3: Relations des agents ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    SELECT TOP 3 
        a.Id,
        a.Nom,
        a.Prenom,
        a.CCTId,
        a.CategorieCAPId,
        a.StatutAdministratifId
    FROM Agents a
    ORDER BY a.Id;
    PRINT '✅ Relations des agents vérifiées.';
END
PRINT '';

-- Test 4: Vérifier les CCTs référencés
PRINT '--- Test 4: CCTs référencés ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    SELECT DISTINCT a.CCTId
    FROM Agents a
    WHERE a.CCTId IS NOT NULL;
    PRINT '✅ CCTs référencés vérifiés.';
END
PRINT '';

-- Test 5: Vérifier les catégories référencées
PRINT '--- Test 5: Catégories référencées ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CategorieCCTs')
BEGIN
    SELECT DISTINCT a.CategorieCAPId
    FROM Agents a
    WHERE a.CategorieCAPId IS NOT NULL;
    PRINT '✅ Catégories référencées vérifiées.';
END
PRINT '';

-- Test 6: Vérifier les statuts référencés
PRINT '--- Test 6: Statuts référencés ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutAdministratifs')
BEGIN
    SELECT DISTINCT a.StatutAdministratifId
    FROM Agents a;
    PRINT '✅ Statuts référencés vérifiés.';
END
PRINT '';

PRINT '=== FIN DU DIAGNOSTIC ===';
PRINT 'Utilisez ces informations pour identifier les problèmes.'; 