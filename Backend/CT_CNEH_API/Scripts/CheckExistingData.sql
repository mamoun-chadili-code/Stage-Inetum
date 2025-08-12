-- Script pour vérifier les données existantes
-- Exécutez ce script dans SQL Server Management Studio

USE CT_CNEH_DB;
GO

PRINT '=== VÉRIFICATION DES DONNÉES EXISTANTES ===';
PRINT '';

-- Vérifier les CCTs
PRINT '--- CCTs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    DECLARE @CCTCount INT;
    SELECT @CCTCount = COUNT(*) FROM CCTs;
    PRINT 'Nombre de CCTs : ' + CAST(@CCTCount AS VARCHAR);
    
    IF @CCTCount > 0
    BEGIN
        SELECT TOP 5 Id, Nom FROM CCTs ORDER BY Id;
    END
    ELSE
    BEGIN
        PRINT 'Aucun CCT trouvé.';
    END
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
    DECLARE @CatCount INT;
    SELECT @CatCount = COUNT(*) FROM CategorieCCTs;
    PRINT 'Nombre de catégories : ' + CAST(@CatCount AS VARCHAR);
    
    IF @CatCount > 0
    BEGIN
        SELECT Id, Libelle FROM CategorieCCTs ORDER BY Id;
    END
    ELSE
    BEGIN
        PRINT 'Aucune catégorie trouvée.';
    END
END
ELSE
BEGIN
    PRINT 'Table CategorieCCTs n''existe pas.';
END

PRINT '';

-- Vérifier les statuts administratifs
PRINT '--- Statuts Administratifs ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutsAdministratifs')
BEGIN
    DECLARE @StatutCount INT;
    SELECT @StatutCount = COUNT(*) FROM StatutsAdministratifs;
    PRINT 'Nombre de statuts administratifs : ' + CAST(@StatutCount AS VARCHAR);
    
    IF @StatutCount > 0
    BEGIN
        SELECT Id, Libelle FROM StatutsAdministratifs ORDER BY Id;
    END
    ELSE
    BEGIN
        PRINT 'Aucun statut administratif trouvé.';
    END
END
ELSE
BEGIN
    PRINT 'Table StatutsAdministratifs n''existe pas.';
END

PRINT '';

-- Vérifier les agents existants
PRINT '--- Agents existants ---';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    DECLARE @AgentCount INT;
    SELECT @AgentCount = COUNT(*) FROM Agents;
    PRINT 'Nombre d''agents : ' + CAST(@AgentCount AS VARCHAR);
    
    IF @AgentCount > 0
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
PRINT '=== FIN DE LA VÉRIFICATION ==='; 