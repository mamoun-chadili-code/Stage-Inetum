-- Script de correction des dates et insertion des formations
-- Corrige le format des dates et insère les formations

USE CT_CNEH_DB;
GO

PRINT '=== CORRECTION DES DATES ET INSERTION DES FORMATIONS ===';
PRINT '';

-- Vérifier que les tables existent
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations_New')
BEGIN
    PRINT '❌ ERREUR : La table Formations_New n''existe pas';
    PRINT 'Veuillez d''abord exécuter CreateFormationsSimple.sql';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation_New')
BEGIN
    PRINT '❌ ERREUR : La table TypesFormation_New n''existe pas';
    PRINT 'Veuillez d''abord exécuter CreateFormationsSimple.sql';
    RETURN;
END

PRINT '✓ Tables Formations_New et TypesFormation_New existent';

-- Vérifier le nombre de formations existantes
DECLARE @FormationsCount INT;
SELECT @FormationsCount = COUNT(*) FROM Formations_New;
PRINT 'Formations existantes : ' + CAST(@FormationsCount AS VARCHAR);

IF @FormationsCount > 0
BEGIN
    PRINT 'Suppression des formations existantes...';
    DELETE FROM Formations_New;
    PRINT '✓ Formations existantes supprimées';
END

-- Récupérer les IDs réels des CCTs, agents et chefs de centre existants
DECLARE @CCTId1 INT;
DECLARE @CCTId2 INT;
DECLARE @CCTId3 INT;
DECLARE @AgentId1 INT;
DECLARE @AgentId2 INT;
DECLARE @AgentId3 INT;
DECLARE @ChefCentreId1 INT;
DECLARE @ChefCentreId2 INT;
DECLARE @ChefCentreId3 INT;

-- Récupérer les 3 premiers CCTs disponibles
SELECT TOP 3 @CCTId1 = Id FROM CCTs ORDER BY Id;
SELECT TOP 1 @CCTId2 = Id FROM CCTs WHERE Id > @CCTId1 ORDER BY Id;
IF @CCTId2 IS NULL SET @CCTId2 = @CCTId1;
SELECT TOP 1 @CCTId3 = Id FROM CCTs WHERE Id > @CCTId2 ORDER BY Id;
IF @CCTId3 IS NULL SET @CCTId3 = @CCTId1;

-- Récupérer les 3 premiers agents disponibles
SELECT TOP 3 @AgentId1 = Id FROM Agents ORDER BY Id;
SELECT TOP 1 @AgentId2 = Id FROM Agents WHERE Id > @AgentId1 ORDER BY Id;
IF @AgentId2 IS NULL SET @AgentId2 = @AgentId1;
SELECT TOP 1 @AgentId3 = Id FROM Agents WHERE Id > @AgentId2 ORDER BY Id;
IF @AgentId3 IS NULL SET @AgentId3 = @AgentId1;

-- Récupérer les 3 premiers chefs de centre disponibles
SELECT TOP 3 @ChefCentreId1 = Id FROM ChefCentres ORDER BY Id;
SELECT TOP 1 @ChefCentreId2 = Id FROM ChefCentres WHERE Id > @ChefCentreId1 ORDER BY Id;
IF @ChefCentreId2 IS NULL SET @ChefCentreId2 = @ChefCentreId1;
SELECT TOP 1 @ChefCentreId3 = Id FROM ChefCentres WHERE Id > @ChefCentreId2 ORDER BY Id;
IF @ChefCentreId3 IS NULL SET @ChefCentreId3 = @ChefCentreId1;

PRINT 'Utilisation des IDs suivants :';
PRINT 'CCTs : ' + CAST(@CCTId1 AS VARCHAR) + ', ' + CAST(@CCTId2 AS VARCHAR) + ', ' + CAST(@CCTId3 AS VARCHAR);
PRINT 'Agents : ' + CAST(@AgentId1 AS VARCHAR) + ', ' + CAST(@AgentId2 AS VARCHAR) + ', ' + CAST(@AgentId3 AS VARCHAR);
PRINT 'Chefs de centre : ' + CAST(@ChefCentreId1 AS VARCHAR) + ', ' + CAST(@ChefCentreId2 AS VARCHAR) + ', ' + CAST(@ChefCentreId3 AS VARCHAR);

-- Insérer 7 formations de test avec le bon format de date
INSERT INTO Formations_New (
    Intitule, CCTId, AgentId, ChefCentreId, TypeFormationId, Matiere,
    DateDebut, DateFin, ValideParFormateur, PremierAnimateur, DeuxiemeAnimateur,
    ValideCHEH, ValideLe
) VALUES 
-- Formation 1 : Formation de maintien de qualification
('BK144610_FMQA72_06/06/2022', @CCTId1, @AgentId1, @ChefCentreId1, 1,
 'Formation de maintien de qualification des agents visiteurs par année calendaire',
 CAST('2022-06-06' AS DATETIME), CAST('2022-06-29' AS DATETIME), 1, 'BASSO ABDELFETTAH', 'BASSO ABDELFETTAH',
 1, CAST('2022-04-26' AS DATE)),

-- Formation 2 : Formation initiale des agents
('BK144611_FIQA73_15/07/2022', @CCTId2, @AgentId2, @ChefCentreId2, 2,
 'Formation initiale des agents visiteurs - Module théorique et pratique',
 CAST('2022-07-15' AS DATETIME), CAST('2022-08-15' AS DATETIME), 1, 'MOHAMED ALAMI', 'FATIMA BENNANI',
 1, CAST('2022-06-15' AS DATE)),

-- Formation 3 : Diagnostic électronique
('BK144612_FCDE74_10/09/2022', @CCTId1, @AgentId1, @ChefCentreId1, 3,
 'Formation continue - Diagnostic électronique des véhicules modernes',
 CAST('2022-09-10' AS DATETIME), CAST('2022-09-25' AS DATETIME), 0, 'AHMED CHAIBI', 'KHADIJA DAOUDI',
 0, NULL),

-- Formation 4 : Systèmes de sécurité
('BK144613_FCSS75_20/10/2022', @CCTId2, @AgentId2, @ChefCentreId2, 4,
 'Formation continue - Systèmes de sécurité active et passive',
 CAST('2022-10-20' AS DATETIME), CAST('2022-11-05' AS DATETIME), 1, 'MUSTAPHA RESOUANY', 'MOHAMED ALAMI',
 1, CAST('2022-10-15' AS DATE)),

-- Formation 5 : Véhicules hybrides et électriques
('BK144614_FCVH76_05/11/2022', @CCTId1, @AgentId1, @ChefCentreId1, 5,
 'Formation continue - Véhicules hybrides et électriques - Sécurité et contrôle',
 CAST('2022-11-05' AS DATETIME), CAST('2022-11-20' AS DATETIME), 0, 'FATIMA BENNANI', 'AHMED CHAIBI',
 0, NULL),

-- Formation 6 : Contrôle technique des poids lourds
('BK144615_FCPL77_15/12/2022', @CCTId3, @AgentId3, @ChefCentreId3, 6,
 'Formation spécialisée - Contrôle technique des poids lourds et remorques',
 CAST('2022-12-15' AS DATETIME), CAST('2023-01-15' AS DATETIME), 1, 'HASSAN EL AMRANI', 'KARIM BENNANI',
 1, CAST('2022-12-10' AS DATE)),

-- Formation 7 : Nouvelles technologies automobiles
('BK144616_FNTA78_20/01/2023', @CCTId1, @AgentId2, @ChefCentreId2, 7,
 'Formation avancée - Nouvelles technologies automobiles et connectivité',
 CAST('2023-01-20' AS DATETIME), CAST('2023-02-10' AS DATETIME), 1, 'SALMA EL FASSI', 'YOUSSEF TAHIRI',
 1, CAST('2023-01-15' AS DATE));

PRINT '✓ 7 formations de test ajoutées avec succès !';
PRINT '';

-- Vérification finale
DECLARE @TypesFormationCount INT;
DECLARE @FormationsCountFinal INT;

SELECT @TypesFormationCount = COUNT(*) FROM TypesFormation_New;
SELECT @FormationsCountFinal = COUNT(*) FROM Formations_New;

PRINT '=== VÉRIFICATION FINALE ===';
PRINT 'TypesFormation_New : ' + CAST(@TypesFormationCount AS VARCHAR) + ' enregistrements';
PRINT 'Formations_New : ' + CAST(@FormationsCountFinal AS VARCHAR) + ' enregistrements';

-- Afficher quelques formations pour vérification
PRINT '';
PRINT '=== EXEMPLE DE FORMATIONS ===';
SELECT TOP 3 Id, Intitule, DateDebut, DateFin, ValideParFormateur FROM Formations_New ORDER BY Id;

PRINT '';
PRINT '=== CORRECTION TERMINÉE ===';
PRINT '✓ Dates corrigées et formations insérées avec succès';
PRINT '✓ Module Formation prêt à être utilisé ! 🎉'; 