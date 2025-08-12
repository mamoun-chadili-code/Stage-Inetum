-- Script pour diagnostiquer la formation avec l'ID 5
-- Vérifie l'état de cette formation et ses relations

USE CT_CNEH_DB;
GO

PRINT '=== DIAGNOSTIC FORMATION ID 5 ===';
PRINT '';

-- 1. Vérifier si la formation existe
PRINT '1. VÉRIFICATION DE L''EXISTENCE DE LA FORMATION';
PRINT '-----------------------------------------------';
IF EXISTS (SELECT * FROM Formations WHERE Id = 5)
BEGIN
    PRINT '✓ Formation avec ID 5 existe';
    
    -- Afficher les données de base
    SELECT 
        Id,
        Intitule,
        CCTId,
        AgentId,
        ChefCentreId,
        TypeFormationId,
        Matiere,
        DateDebut,
        DateFin,
        ValideParFormateur,
        PremierAnimateur,
        DeuxiemeAnimateur,
        ValideCHEH,
        ValideLe
    FROM Formations 
    WHERE Id = 5;
END
ELSE
BEGIN
    PRINT '❌ Formation avec ID 5 n''existe pas';
    RETURN;
END

PRINT '';

-- 2. Vérifier les relations
PRINT '2. VÉRIFICATION DES RELATIONS';
PRINT '-------------------------------';

-- Vérifier CCT
DECLARE @CCTId INT;
SELECT @CCTId = CCTId FROM Formations WHERE Id = 5;

IF @CCTId IS NOT NULL
BEGIN
    IF EXISTS (SELECT * FROM CCTs WHERE Id = @CCTId)
    BEGIN
        PRINT '✓ CCT existe (ID: ' + CAST(@CCTId AS VARCHAR) + ')';
        SELECT Nom FROM CCTs WHERE Id = @CCTId;
    END
    ELSE
    BEGIN
        PRINT '❌ CCT avec ID ' + CAST(@CCTId AS VARCHAR) + ' n''existe pas';
    END
END
ELSE
BEGIN
    PRINT '⚠️  CCTId est NULL';
END

-- Vérifier Agent
DECLARE @AgentId INT;
SELECT @AgentId = AgentId FROM Formations WHERE Id = 5;

IF @AgentId IS NOT NULL
BEGIN
    IF EXISTS (SELECT * FROM Agents WHERE Id = @AgentId)
    BEGIN
        PRINT '✓ Agent existe (ID: ' + CAST(@AgentId AS VARCHAR) + ')';
        SELECT Nom, Prenom FROM Agents WHERE Id = @AgentId;
    END
    ELSE
    BEGIN
        PRINT '❌ Agent avec ID ' + CAST(@AgentId AS VARCHAR) + ' n''existe pas';
    END
END
ELSE
BEGIN
    PRINT '⚠️  AgentId est NULL';
END

-- Vérifier ChefCentre
DECLARE @ChefCentreId INT;
SELECT @ChefCentreId = ChefCentreId FROM Formations WHERE Id = 5;

IF @ChefCentreId IS NOT NULL
BEGIN
    IF EXISTS (SELECT * FROM ChefCentres WHERE Id = @ChefCentreId)
    BEGIN
        PRINT '✓ ChefCentre existe (ID: ' + CAST(@ChefCentreId AS VARCHAR) + ')';
        SELECT Nom, Prenom FROM ChefCentres WHERE Id = @ChefCentreId;
    END
    ELSE
    BEGIN
        PRINT '❌ ChefCentre avec ID ' + CAST(@ChefCentreId AS VARCHAR) + ' n''existe pas';
    END
END
ELSE
BEGIN
    PRINT '⚠️  ChefCentreId est NULL';
END

-- Vérifier TypeFormation
DECLARE @TypeFormationId INT;
SELECT @TypeFormationId = TypeFormationId FROM Formations WHERE Id = 5;

IF @TypeFormationId IS NOT NULL
BEGIN
    IF EXISTS (SELECT * FROM TypesFormation WHERE Id = @TypeFormationId)
    BEGIN
        PRINT '✓ TypeFormation existe (ID: ' + CAST(@TypeFormationId AS VARCHAR) + ')';
        SELECT Libelle FROM TypesFormation WHERE Id = @TypeFormationId;
    END
    ELSE
    BEGIN
        PRINT '❌ TypeFormation avec ID ' + CAST(@TypeFormationId AS VARCHAR) + ' n''existe pas';
    END
END
ELSE
BEGIN
    PRINT '⚠️  TypeFormationId est NULL';
END

PRINT '';

-- 3. Test de jointure complète
PRINT '3. TEST DE JOINTURE COMPLÈTE';
PRINT '------------------------------';
SELECT 
    f.Id,
    f.Intitule,
    c.Nom AS CCTNom,
    a.Nom AS AgentNom,
    a.Prenom AS AgentPrenom,
    cc.Nom AS ChefCentreNom,
    tf.Libelle AS TypeFormationLibelle
FROM Formations f
LEFT JOIN CCTs c ON f.CCTId = c.Id
LEFT JOIN Agents a ON f.AgentId = a.Id
LEFT JOIN ChefCentres cc ON f.ChefCentreId = cc.Id
LEFT JOIN TypesFormation tf ON f.TypeFormationId = tf.Id
WHERE f.Id = 5;

PRINT '';
PRINT '=== DIAGNOSTIC TERMINÉ ==='; 