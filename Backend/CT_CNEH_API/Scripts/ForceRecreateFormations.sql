-- Script de suppression et recréation forcée des tables Formation
-- Force la suppression et recréation complète

USE CT_CNEH_DB;
GO

PRINT '=== SUPPRESSION ET RECRÉATION FORCÉE DES TABLES FORMATION ===';
PRINT '';

-- 1. Supprimer les tables existantes (forcé)
PRINT '1. Suppression forcée des tables existantes...';

-- Supprimer les contraintes de clés étrangères d'abord
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE TABLE_NAME = 'Formations' AND CONSTRAINT_TYPE = 'FOREIGN KEY')
BEGIN
    DECLARE @sql NVARCHAR(MAX) = '';
    SELECT @sql = @sql + 'ALTER TABLE Formations DROP CONSTRAINT ' + CONSTRAINT_NAME + ';' + CHAR(13)
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
    WHERE TABLE_NAME = 'Formations' AND CONSTRAINT_TYPE = 'FOREIGN KEY';
    
    EXEC sp_executesql @sql;
    PRINT '   ✓ Contraintes de clés étrangères supprimées';
END

-- Supprimer les index
IF EXISTS (SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('Formations'))
BEGIN
    DECLARE @dropIndexSQL NVARCHAR(MAX) = '';
    SELECT @dropIndexSQL = @dropIndexSQL + 'DROP INDEX ' + i.name + ' ON Formations;' + CHAR(13)
    FROM sys.indexes i
    WHERE i.object_id = OBJECT_ID('Formations') AND i.is_primary_key = 0;
    
    IF @dropIndexSQL != ''
    BEGIN
        EXEC sp_executesql @dropIndexSQL;
        PRINT '   ✓ Index supprimés';
    END
END

-- Supprimer la table Formations
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    DROP TABLE Formations;
    PRINT '   ✓ Table Formations supprimée';
END
ELSE
BEGIN
    PRINT '   ✓ Table Formations n''existait pas';
END

-- Supprimer la table TypesFormation
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    DROP TABLE TypesFormation;
    PRINT '   ✓ Table TypesFormation supprimée';
END
ELSE
BEGIN
    PRINT '   ✓ Table TypesFormation n''existait pas';
END

PRINT '';

-- 2. Vérifier que les tables de référence existent
PRINT '2. Vérification des tables de référence...';

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    PRINT '   ❌ ERREUR : La table CCTs n''existe pas';
    PRINT '   Veuillez d''abord créer la table CCTs';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    PRINT '   ❌ ERREUR : La table Agents n''existe pas';
    PRINT '   Veuillez d''abord créer la table Agents';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ChefCentres')
BEGIN
    PRINT '   ❌ ERREUR : La table ChefCentres n''existe pas';
    PRINT '   Veuillez d''abord créer la table ChefCentres';
    RETURN;
END

PRINT '   ✓ Toutes les tables de référence existent';

-- 3. Créer la table TypesFormation
PRINT '3. Création de la table TypesFormation...';

CREATE TABLE TypesFormation (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Libelle NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    DureeEnJours INT,
    Actif BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- Insérer les types de formation de base
INSERT INTO TypesFormation (Libelle, Description, DureeEnJours) VALUES
('Formation de maintien de qualification des agents visiteurs par année calendaire', 
 'Formation obligatoire annuelle pour maintenir les qualifications des agents', 5),
('Formation initiale des agents visiteurs', 
 'Formation de base pour les nouveaux agents visiteurs', 15),
('Formation continue - Diagnostic électronique', 
 'Formation sur les systèmes de diagnostic électronique modernes', 3),
('Formation continue - Systèmes de sécurité', 
 'Formation sur les systèmes de sécurité active et passive', 4),
('Formation continue - Véhicules hybrides et électriques', 
 'Formation spécialisée sur les véhicules à technologies avancées', 5),
('Formation spécialisée - Contrôle technique des poids lourds', 
 'Formation pour le contrôle technique des véhicules lourds', 7),
('Formation avancée - Nouvelles technologies automobiles', 
 'Formation sur les dernières technologies automobiles', 6);

PRINT '   ✓ Table TypesFormation créée avec 7 types de formation';

-- 4. Créer la table Formations
PRINT '4. Création de la table Formations...';

CREATE TABLE Formations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Intitule NVARCHAR(255) NOT NULL,
    CCTId INT,
    AgentId INT,
    ChefCentreId INT,
    TypeFormationId INT,
    Matiere NVARCHAR(MAX),
    DateDebut DATETIME,
    DateFin DATETIME,
    ValideParFormateur BIT DEFAULT 0,
    PremierAnimateur NVARCHAR(100),
    DeuxiemeAnimateur NVARCHAR(100),
    ValideCHEH BIT DEFAULT 0,
    ValideLe DATE,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- Créer des index pour les performances
CREATE INDEX IX_Formations_CCTId ON Formations(CCTId);
CREATE INDEX IX_Formations_AgentId ON Formations(AgentId);
CREATE INDEX IX_Formations_DateDebut ON Formations(DateDebut);
CREATE INDEX IX_Formations_ValideParFormateur ON Formations(ValideParFormateur);

-- Ajouter les contraintes de clés étrangères
ALTER TABLE Formations ADD CONSTRAINT FK_Formations_CCT FOREIGN KEY (CCTId) REFERENCES CCTs(Id);
ALTER TABLE Formations ADD CONSTRAINT FK_Formations_Agent FOREIGN KEY (AgentId) REFERENCES Agents(Id);
ALTER TABLE Formations ADD CONSTRAINT FK_Formations_ChefCentre FOREIGN KEY (ChefCentreId) REFERENCES ChefCentres(Id);

PRINT '   ✓ Table Formations créée avec index et contraintes';

-- 5. Ajouter les données de test
PRINT '5. Ajout des données de test...';

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

PRINT '   Utilisation des IDs suivants :';
PRINT '   CCTs : ' + CAST(@CCTId1 AS VARCHAR) + ', ' + CAST(@CCTId2 AS VARCHAR) + ', ' + CAST(@CCTId3 AS VARCHAR);
PRINT '   Agents : ' + CAST(@AgentId1 AS VARCHAR) + ', ' + CAST(@AgentId2 AS VARCHAR) + ', ' + CAST(@AgentId3 AS VARCHAR);
PRINT '   Chefs de centre : ' + CAST(@ChefCentreId1 AS VARCHAR) + ', ' + CAST(@ChefCentreId2 AS VARCHAR) + ', ' + CAST(@ChefCentreId3 AS VARCHAR);

-- Vérifier que les données existent
IF NOT EXISTS (SELECT * FROM CCTs WHERE Id IN (@CCTId1, @CCTId2, @CCTId3))
BEGIN
    PRINT '   ERREUR : Impossible de récupérer les CCTs existants.';
    PRINT '   Veuillez vérifier que des CCTs existent dans la base de données.';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM Agents WHERE Id IN (@AgentId1, @AgentId2, @AgentId3))
BEGIN
    PRINT '   ERREUR : Impossible de récupérer les agents existants.';
    PRINT '   Veuillez vérifier que des agents existent dans la base de données.';
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

PRINT '   ✓ 7 formations de test ajoutées avec succès !';
PRINT '';

-- 6. Vérification finale
PRINT '6. Vérification finale...';

DECLARE @TypesFormationCount INT;
DECLARE @FormationsCount INT;

SELECT @TypesFormationCount = COUNT(*) FROM TypesFormation;
SELECT @FormationsCount = COUNT(*) FROM Formations;

PRINT '   TypesFormation : ' + CAST(@TypesFormationCount AS VARCHAR) + ' enregistrements';
PRINT '   Formations : ' + CAST(@FormationsCount AS VARCHAR) + ' enregistrements';

-- Vérifier la structure
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'Intitule')
BEGIN
    PRINT '   ✓ Structure de la table Formations correcte';
END
ELSE
BEGIN
    PRINT '   ❌ ERREUR : Structure de la table Formations incorrecte';
END

PRINT '';
PRINT '=== RECRÉATION FORCÉE TERMINÉE ===';
PRINT '';
PRINT '=== RÉSUMÉ ===';
PRINT '✓ Table TypesFormation recréée avec 7 types de formation';
PRINT '✓ Table Formations recréée avec index et contraintes';
PRINT '✓ 7 formations de test ajoutées';
PRINT '';
PRINT 'Le module Formation est maintenant prêt à être utilisé ! 🎉'; 