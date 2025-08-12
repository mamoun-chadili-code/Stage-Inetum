-- Script pour vérifier les tables Formation existantes
-- Diagnostic complet des tables Formation

USE CT_CNEH_DB;
GO

PRINT '=== DIAGNOSTIC DES TABLES FORMATION ===';
PRINT '';

-- Vérifier toutes les tables qui contiennent "Formation" dans le nom
PRINT '1. TABLES CONTENANT "FORMATION" DANS LE NOM :';
PRINT '--------------------------------------------';
SELECT TABLE_NAME, TABLE_TYPE 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_NAME LIKE '%Formation%' 
ORDER BY TABLE_NAME;

PRINT '';

-- Vérifier toutes les tables qui contiennent "Type" dans le nom
PRINT '2. TABLES CONTENANT "TYPE" DANS LE NOM :';
PRINT '----------------------------------------';
SELECT TABLE_NAME, TABLE_TYPE 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_NAME LIKE '%Type%' 
ORDER BY TABLE_NAME;

PRINT '';

-- Vérifier spécifiquement les tables Formation
PRINT '3. VÉRIFICATION SPÉCIFIQUE DES TABLES FORMATION :';
PRINT '------------------------------------------------';

-- Vérifier Formations
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    DECLARE @FormationsCount INT;
    SELECT @FormationsCount = COUNT(*) FROM Formations;
    PRINT '✓ Table Formations existe avec ' + CAST(@FormationsCount AS VARCHAR) + ' enregistrements';
    
    -- Afficher la structure
    PRINT '   Structure de la table Formations :';
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Formations' 
    ORDER BY ORDINAL_POSITION;
END
ELSE
BEGIN
    PRINT '❌ Table Formations n''existe pas';
END

PRINT '';

-- Vérifier Formations_New
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations_New')
BEGIN
    DECLARE @FormationsNewCount INT;
    SELECT @FormationsNewCount = COUNT(*) FROM Formations_New;
    PRINT '✓ Table Formations_New existe avec ' + CAST(@FormationsNewCount AS VARCHAR) + ' enregistrements';
END
ELSE
BEGIN
    PRINT '❌ Table Formations_New n''existe pas';
END

PRINT '';

-- Vérifier TypesFormation
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    DECLARE @TypesFormationCount INT;
    SELECT @TypesFormationCount = COUNT(*) FROM TypesFormation;
    PRINT '✓ Table TypesFormation existe avec ' + CAST(@TypesFormationCount AS VARCHAR) + ' enregistrements';
    
    -- Afficher la structure
    PRINT '   Structure de la table TypesFormation :';
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'TypesFormation' 
    ORDER BY ORDINAL_POSITION;
END
ELSE
BEGIN
    PRINT '❌ Table TypesFormation n''existe pas';
END

PRINT '';

-- Vérifier TypesFormation_New
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation_New')
BEGIN
    DECLARE @TypesFormationNewCount INT;
    SELECT @TypesFormationNewCount = COUNT(*) FROM TypesFormation_New;
    PRINT '✓ Table TypesFormation_New existe avec ' + CAST(@TypesFormationNewCount AS VARCHAR) + ' enregistrements';
END
ELSE
BEGIN
    PRINT '❌ Table TypesFormation_New n''existe pas';
END

PRINT '';

-- Afficher quelques données si les tables existent
PRINT '4. DONNÉES DISPONIBLES :';
PRINT '------------------------';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    PRINT 'Formations (premières 3 lignes) :';
    SELECT TOP 3 Id, Intitule, DateDebut, DateFin FROM Formations ORDER BY Id;
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations_New')
BEGIN
    PRINT 'Formations_New (premières 3 lignes) :';
    SELECT TOP 3 Id, Intitule, DateDebut, DateFin FROM Formations_New ORDER BY Id;
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    PRINT 'TypesFormation :';
    SELECT Id, Libelle FROM TypesFormation ORDER BY Id;
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation_New')
BEGIN
    PRINT 'TypesFormation_New :';
    SELECT Id, Libelle FROM TypesFormation_New ORDER BY Id;
END

PRINT '';
PRINT '=== DIAGNOSTIC TERMINÉ ===';
PRINT '';
PRINT '📋 RECOMMANDATIONS :';
PRINT '1. Si Formations et TypesFormation existent → Module prêt';
PRINT '2. Si Formations_New et TypesFormation_New existent → Renommer';
PRINT '3. Si aucune table n''existe → Créer les tables'; 