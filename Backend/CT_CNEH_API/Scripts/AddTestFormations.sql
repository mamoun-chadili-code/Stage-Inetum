-- Script SQL Server pour ajouter des formations de test
-- Utilise les IDs réels de votre base de données

USE CT_CNEH_DB;
GO

-- Vérifier si la table Formations existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    PRINT 'La table Formations n''existe pas. Veuillez d''abord créer la table.';
    RETURN;
END

-- Récupérer les IDs réels des CCTs, agents et chefs de centre existants
DECLARE @CCTId1 INT;
DECLARE @CCTId2 INT;
DECLARE @AgentId1 INT;
DECLARE @AgentId2 INT;
DECLARE @ChefCentreId1 INT;
DECLARE @ChefCentreId2 INT;

-- Récupérer les 2 premiers CCTs disponibles
SELECT TOP 2 @CCTId1 = Id FROM CCTs ORDER BY Id;
SELECT TOP 1 @CCTId2 = Id FROM CCTs WHERE Id > @CCTId1 ORDER BY Id;
IF @CCTId2 IS NULL SET @CCTId2 = @CCTId1;

-- Récupérer les 2 premiers agents disponibles
SELECT TOP 2 @AgentId1 = Id FROM Agents ORDER BY Id;
SELECT TOP 1 @AgentId2 = Id FROM Agents WHERE Id > @AgentId1 ORDER BY Id;
IF @AgentId2 IS NULL SET @AgentId2 = @AgentId1;

-- Récupérer les 2 premiers chefs de centre disponibles
SELECT TOP 2 @ChefCentreId1 = Id FROM ChefCentres ORDER BY Id;
SELECT TOP 1 @ChefCentreId2 = Id FROM ChefCentres WHERE Id > @ChefCentreId1 ORDER BY Id;
IF @ChefCentreId2 IS NULL SET @ChefCentreId2 = @ChefCentreId1;

PRINT 'Ajout de formations de test...';
PRINT 'Utilisation des IDs suivants (récupérés automatiquement) :';
PRINT 'CCTs : ' + CAST(@CCTId1 AS VARCHAR) + ', ' + CAST(@CCTId2 AS VARCHAR);
PRINT 'Agents : ' + CAST(@AgentId1 AS VARCHAR) + ', ' + CAST(@AgentId2 AS VARCHAR);
PRINT 'Chefs de centre : ' + CAST(@ChefCentreId1 AS VARCHAR) + ', ' + CAST(@ChefCentreId2 AS VARCHAR);
PRINT '';

-- Vérifier que les données existent
IF NOT EXISTS (SELECT * FROM CCTs WHERE Id IN (@CCTId1, @CCTId2))
BEGIN
    PRINT 'ERREUR : Impossible de récupérer les CCTs existants.';
    PRINT 'Veuillez vérifier que des CCTs existent dans la base de données.';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM Agents WHERE Id IN (@AgentId1, @AgentId2))
BEGIN
    PRINT 'ERREUR : Impossible de récupérer les agents existants.';
    PRINT 'Veuillez vérifier que des agents existent dans la base de données.';
    RETURN;
END

-- Insérer des formations de test
INSERT INTO Formations (
    Intitule, CCTId, AgentId, ChefCentreId, TypeFormationId, Matiere,
    DateDebut, DateFin, ValideParFormateur, PremierAnimateur, DeuxiemeAnimateur,
    ValideCHEH, ValideLe
) VALUES 
-- Formation 1 : Formation de maintien de qualification
('BK144610_FMQA72_06/06/2022 00:00:00', @CCTId1, @AgentId1, @ChefCentreId1, 1,
 'Formation de maintien de qualification des agents visiteurs par année calendaire',
 '2022-06-06 00:00:00', '2022-06-29 00:00:00', 1, 'BASSO ABDELFETTAH', 'BASSO ABDELFETTAH',
 1, '2022-04-26'),

-- Formation 2 : Formation initiale
('BK144611_FIQA73_15/07/2022 00:00:00', @CCTId2, @AgentId2, @ChefCentreId2, 2,
 'Formation initiale des agents visiteurs',
 '2022-07-15 00:00:00', '2022-08-15 00:00:00', 1, 'MOHAMED ALAMI', 'FATIMA BENNANI',
 1, '2022-06-15'),

-- Formation 3 : Formation continue - Diagnostic électronique
('BK144612_FCDE74_10/09/2022 00:00:00', @CCTId1, @AgentId1, @ChefCentreId1, 3,
 'Formation continue - Diagnostic électronique',
 '2022-09-10 00:00:00', '2022-09-25 00:00:00', 0, 'AHMED CHAIBI', 'KHADIJA DAOUDI',
 0, NULL),

-- Formation 4 : Formation continue - Systèmes de sécurité
('BK144613_FCSS75_20/10/2022 00:00:00', @CCTId2, @AgentId2, @ChefCentreId2, 4,
 'Formation continue - Systèmes de sécurité',
 '2022-10-20 00:00:00', '2022-11-05 00:00:00', 1, 'MUSTAPHA RESOUANY', 'MOHAMED ALAMI',
 1, '2022-10-15'),

-- Formation 5 : Formation continue - Véhicules hybrides
('BK144614_FCVH76_05/11/2022 00:00:00', @CCTId1, @AgentId1, @ChefCentreId1, 5,
 'Formation continue - Véhicules hybrides',
 '2022-11-05 00:00:00', '2022-11-20 00:00:00', 0, 'FATIMA BENNANI', 'AHMED CHAIBI',
 0, NULL);

PRINT '5 formations de test ont été ajoutées avec succès !';
PRINT '';
PRINT '=== FORMATIONS AJOUTÉES ===';
PRINT 'Formation 1 : BK144610_FMQA72 - Formation de maintien de qualification';
PRINT 'Formation 2 : BK144611_FIQA73 - Formation initiale';
PRINT 'Formation 3 : BK144612_FCDE74 - Diagnostic électronique';
PRINT 'Formation 4 : BK144613_FCSS75 - Systèmes de sécurité';
PRINT 'Formation 5 : BK144614_FCVH76 - Véhicules hybrides';
PRINT '';
PRINT '=== TEST DU MODULE FORMATION ===';
PRINT '1. Allez dans le module Formation';
PRINT '2. Vérifiez que vous avez 5 formations au total';
PRINT '3. Testez les filtres (Réseau, CCT, Agent, Type formation)';
PRINT '4. Testez la recherche avec les intitulés : BK144610, BK144611';
PRINT '5. Testez la pagination avec différentes tailles de page';
PRINT '6. Testez l''ajout, modification et suppression de formations';
PRINT '';
PRINT '=== DONNÉES DE TEST ===';
PRINT 'Total attendu : 5 formations';
PRINT 'Filtres : Testez par CCT, Agent, Type formation, Validation';
PRINT 'Recherche : Testez par intitulé, nom agent, CCT';
PRINT 'Pagination : Testez avec 5, 10, 20 éléments par page'; 