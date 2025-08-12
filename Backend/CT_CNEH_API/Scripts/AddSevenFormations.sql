-- Script SQL Server pour ajouter 7 formations de test
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

PRINT 'Ajout de 7 formations de test...';
PRINT 'Utilisation des IDs suivants (récupérés automatiquement) :';
PRINT 'CCTs : ' + CAST(@CCTId1 AS VARCHAR) + ', ' + CAST(@CCTId2 AS VARCHAR) + ', ' + CAST(@CCTId3 AS VARCHAR);
PRINT 'Agents : ' + CAST(@AgentId1 AS VARCHAR) + ', ' + CAST(@AgentId2 AS VARCHAR) + ', ' + CAST(@AgentId3 AS VARCHAR);
PRINT 'Chefs de centre : ' + CAST(@ChefCentreId1 AS VARCHAR) + ', ' + CAST(@ChefCentreId2 AS VARCHAR) + ', ' + CAST(@ChefCentreId3 AS VARCHAR);
PRINT '';

-- Vérifier que les données existent
IF NOT EXISTS (SELECT * FROM CCTs WHERE Id IN (@CCTId1, @CCTId2, @CCTId3))
BEGIN
    PRINT 'ERREUR : Impossible de récupérer les CCTs existants.';
    PRINT 'Veuillez vérifier que des CCTs existent dans la base de données.';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM Agents WHERE Id IN (@AgentId1, @AgentId2, @AgentId3))
BEGIN
    PRINT 'ERREUR : Impossible de récupérer les agents existants.';
    PRINT 'Veuillez vérifier que des agents existent dans la base de données.';
    RETURN;
END

-- Insérer 7 formations de test
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

-- Formation 2 : Formation initiale des agents
('BK144611_FIQA73_15/07/2022 00:00:00', @CCTId2, @AgentId2, @ChefCentreId2, 2,
 'Formation initiale des agents visiteurs - Module théorique et pratique',
 '2022-07-15 00:00:00', '2022-08-15 00:00:00', 1, 'MOHAMED ALAMI', 'FATIMA BENNANI',
 1, '2022-06-15'),

-- Formation 3 : Diagnostic électronique
('BK144612_FCDE74_10/09/2022 00:00:00', @CCTId1, @AgentId1, @ChefCentreId1, 3,
 'Formation continue - Diagnostic électronique des véhicules modernes',
 '2022-09-10 00:00:00', '2022-09-25 00:00:00', 0, 'AHMED CHAIBI', 'KHADIJA DAOUDI',
 0, NULL),

-- Formation 4 : Systèmes de sécurité
('BK144613_FCSS75_20/10/2022 00:00:00', @CCTId2, @AgentId2, @ChefCentreId2, 4,
 'Formation continue - Systèmes de sécurité active et passive',
 '2022-10-20 00:00:00', '2022-11-05 00:00:00', 1, 'MUSTAPHA RESOUANY', 'MOHAMED ALAMI',
 1, '2022-10-15'),

-- Formation 5 : Véhicules hybrides et électriques
('BK144614_FCVH76_05/11/2022 00:00:00', @CCTId1, @AgentId1, @ChefCentreId1, 5,
 'Formation continue - Véhicules hybrides et électriques - Sécurité et contrôle',
 '2022-11-05 00:00:00', '2022-11-20 00:00:00', 0, 'FATIMA BENNANI', 'AHMED CHAIBI',
 0, NULL),

-- Formation 6 : Contrôle technique des poids lourds
('BK144615_FCPL77_15/12/2022 00:00:00', @CCTId3, @AgentId3, @ChefCentreId3, 6,
 'Formation spécialisée - Contrôle technique des poids lourds et remorques',
 '2022-12-15 00:00:00', '2023-01-15 00:00:00', 1, 'HASSAN EL AMRANI', 'KARIM BENNANI',
 1, '2022-12-10'),

-- Formation 7 : Nouvelles technologies automobiles
('BK144616_FNTA78_20/01/2023 00:00:00', @CCTId1, @AgentId2, @ChefCentreId2, 7,
 'Formation avancée - Nouvelles technologies automobiles et connectivité',
 '2023-01-20 00:00:00', '2023-02-10 00:00:00', 1, 'SALMA EL FASSI', 'YOUSSEF TAHIRI',
 1, '2023-01-15');

PRINT '7 formations de test ont été ajoutées avec succès !';
PRINT '';
PRINT '=== FORMATIONS AJOUTÉES ===';
PRINT 'Formation 1 : BK144610_FMQA72 - Formation de maintien de qualification';
PRINT 'Formation 2 : BK144611_FIQA73 - Formation initiale des agents';
PRINT 'Formation 3 : BK144612_FCDE74 - Diagnostic électronique';
PRINT 'Formation 4 : BK144613_FCSS75 - Systèmes de sécurité';
PRINT 'Formation 5 : BK144614_FCVH76 - Véhicules hybrides et électriques';
PRINT 'Formation 6 : BK144615_FCPL77 - Contrôle technique des poids lourds';
PRINT 'Formation 7 : BK144616_FNTA78 - Nouvelles technologies automobiles';
PRINT '';
PRINT '=== TEST DU MODULE FORMATION ===';
PRINT '1. Allez dans le module Formation';
PRINT '2. Vérifiez que vous avez 7 formations au total';
PRINT '3. Testez les filtres (Réseau, CCT, Agent, Type formation)';
PRINT '4. Testez la recherche avec les intitulés : BK144610, BK144611, BK144612';
PRINT '5. Testez la pagination avec différentes tailles de page (5, 10, 20 éléments)';
PRINT '6. Testez l''ajout, modification et suppression de formations';
PRINT '7. Testez les détails de chaque formation';
PRINT '';
PRINT '=== DONNÉES DE TEST ===';
PRINT 'Total attendu : 7 formations';
PRINT 'Filtres : Testez par CCT, Agent, Type formation, Validation';
PRINT 'Recherche : Testez par intitulé, nom agent, CCT, matière';
PRINT 'Pagination : Testez avec 5, 10, 20 éléments par page';
PRINT 'Validation : 4 formations validées, 3 non validées';
PRINT 'Périodes : Formations réparties sur 2022-2023'; 