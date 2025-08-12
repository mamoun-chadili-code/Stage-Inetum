-- Script de diagnostic pour le module Formation
-- Vérifie l'état des tables et corrige les problèmes

USE CT_CNEH_DB;
GO

PRINT '=== DIAGNOSTIC DU MODULE FORMATION ===';
PRINT '';

-- 1. Vérifier si les tables existent
PRINT '1. Vérification de l''existence des tables...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    PRINT '   ✓ Table TypesFormation existe';
    
    -- Vérifier la structure de TypesFormation
    PRINT '   Structure de TypesFormation :';
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'TypesFormation'
    ORDER BY ORDINAL_POSITION;
END
ELSE
BEGIN
    PRINT '   ❌ Table TypesFormation n''existe pas';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    PRINT '   ✓ Table Formations existe';
    
    -- Vérifier la structure de Formations
    PRINT '   Structure de Formations :';
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Formations'
    ORDER BY ORDINAL_POSITION;
END
ELSE
BEGIN
    PRINT '   ❌ Table Formations n''existe pas';
END

PRINT '';

-- 2. Vérifier les données existantes
PRINT '2. Vérification des données existantes...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    DECLARE @TypesFormationCount INT;
    SELECT @TypesFormationCount = COUNT(*) FROM TypesFormation;
    PRINT '   TypesFormation : ' + CAST(@TypesFormationCount AS VARCHAR) + ' enregistrements';
    
    IF @TypesFormationCount > 0
    BEGIN
        PRINT '   Types de formation disponibles :';
        SELECT Id, Libelle FROM TypesFormation ORDER BY Id;
    END
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    DECLARE @FormationsCount INT;
    SELECT @FormationsCount = COUNT(*) FROM Formations;
    PRINT '   Formations : ' + CAST(@FormationsCount AS VARCHAR) + ' enregistrements';
    
    IF @FormationsCount > 0
    BEGIN
        PRINT '   Formations disponibles :';
        SELECT TOP 5 Id, Intitule, CCTId, AgentId FROM Formations ORDER BY Id;
    END
END

PRINT '';

-- 3. Vérifier les tables de référence
PRINT '3. Vérification des tables de référence...';

DECLARE @CCTsCount INT;
DECLARE @AgentsCount INT;
DECLARE @ChefCentresCount INT;

SELECT @CCTsCount = COUNT(*) FROM CCTs;
SELECT @AgentsCount = COUNT(*) FROM Agents;
SELECT @ChefCentresCount = COUNT(*) FROM ChefCentres;

PRINT '   CCTs : ' + CAST(@CCTsCount AS VARCHAR) + ' enregistrements';
PRINT '   Agents : ' + CAST(@AgentsCount AS VARCHAR) + ' enregistrements';
PRINT '   ChefCentres : ' + CAST(@ChefCentresCount AS VARCHAR) + ' enregistrements';

PRINT '';

-- 4. Proposer des solutions
PRINT '4. Solutions proposées...';

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    PRINT '   → Exécuter le script CreateTypesFormation.sql';
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    PRINT '   → Exécuter le script CreateFormationsTable.sql';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    -- Vérifier si la table a la bonne structure
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'Intitule')
    BEGIN
        PRINT '   → La table Formations existe mais n''a pas la bonne structure';
        PRINT '   → Supprimer et recréer la table Formations';
    END
END

PRINT '';
PRINT '=== DIAGNOSTIC TERMINÉ ===';
PRINT '';
PRINT 'Si des problèmes sont détectés, exécutez les scripts suivants dans l''ordre :';
PRINT '1. CreateTypesFormation.sql (si TypesFormation n''existe pas)';
PRINT '2. CreateFormationsTable.sql (si Formations n''existe pas)';
PRINT '3. SetupFormationsComplete.sql (pour tout configurer)'; 