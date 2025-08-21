-- Script complet pour configurer la base de données CT_CNEH_DB
-- Ce script crée toutes les tables nécessaires et ajoute les données de test
-- Exécutez ce script dans SQL Server Management Studio

USE CT_CNEH_DB;
GO

PRINT '=== CONFIGURATION COMPLÈTE DE LA BASE DE DONNÉES ===';
PRINT '';

-- 1. Vérifier et créer la table Regions si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Regions')
BEGIN
    PRINT '📋 Création de la table Regions...';
    CREATE TABLE Regions (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nom NVARCHAR(100) NOT NULL,
        Code NVARCHAR(10)
    );
    
    -- Insérer des régions de base
    INSERT INTO Regions (Nom, Code) VALUES 
    ('Casablanca-Settat', 'CS'),
    ('Rabat-Salé-Kénitra', 'RSK'),
    ('Fès-Meknès', 'FM'),
    ('Marrakech-Safi', 'MS'),
    ('Tanger-Tétouan-Al Hoceima', 'TTAH'),
    ('Béni Mellal-Khénifra', 'BMK'),
    ('Oriental', 'OR'),
    ('Souss-Massa', 'SM'),
    ('Drâa-Tafilalet', 'DT'),
    ('Guelmim-Oued Noun', 'GON'),
    ('Laâyoune-Sakia El Hamra', 'LSH'),
    ('Dakhla-Oued Ed-Dahab', 'DOD');
    
    PRINT '✅ Table Regions créée avec ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' régions';
END
ELSE
BEGIN
    PRINT '✅ Table Regions existe déjà';
END

-- 2. Vérifier et créer la table Provinces si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Provinces')
BEGIN
    PRINT '📋 Création de la table Provinces...';
    CREATE TABLE Provinces (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nom NVARCHAR(100) NOT NULL,
        RegionId INT,
        FOREIGN KEY (RegionId) REFERENCES Regions(Id)
    );
    
    -- Insérer des provinces de base
    INSERT INTO Provinces (Nom, RegionId) VALUES 
    ('Casablanca', 1),
    ('Settat', 1),
    ('Rabat', 2),
    ('Salé', 2),
    ('Kénitra', 2),
    ('Fès', 3),
    ('Meknès', 3),
    ('Marrakech', 4),
    ('Safi', 4),
    ('Tanger', 5),
    ('Tétouan', 5),
    ('Al Hoceima', 5),
    ('Béni Mellal', 6),
    ('Khénifra', 6),
    ('Oujda', 7),
    ('Nador', 7),
    ('Agadir', 8),
    ('Taroudant', 8),
    ('Ouarzazate', 9),
    ('Zagora', 9),
    ('Guelmim', 10),
    ('Tan-Tan', 10),
    ('Laâyoune', 11),
    ('El Aaiún', 11),
    ('Dakhla', 12),
    ('Oued Ed-Dahab', 12);
    
    PRINT '✅ Table Provinces créée avec ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' provinces';
END
ELSE
BEGIN
    PRINT '✅ Table Provinces existe déjà';
END

-- 3. Vérifier et créer la table Villes si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Villes')
BEGIN
    PRINT '📋 Création de la table Villes...';
    CREATE TABLE Villes (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nom NVARCHAR(100) NOT NULL,
        ProvinceId INT,
        FOREIGN KEY (ProvinceId) REFERENCES Provinces(Id)
    );
    
    -- Insérer des villes de base
    INSERT INTO Villes (Nom, ProvinceId) VALUES 
    ('Casablanca Centre', 1),
    ('Ain Sebaa', 1),
    ('Ain Chock', 1),
    ('Settat Centre', 2),
    ('Rabat Centre', 3),
    ('Salé Centre', 4),
    ('Kénitra Centre', 5),
    ('Fès Centre', 6),
    ('Meknès Centre', 7),
    ('Marrakech Centre', 8),
    ('Safi Centre', 9),
    ('Tanger Centre', 10),
    ('Tétouan Centre', 11),
    ('Al Hoceima Centre', 12),
    ('Béni Mellal Centre', 13),
    ('Khénifra Centre', 14),
    ('Oujda Centre', 15),
    ('Nador Centre', 16),
    ('Agadir Centre', 17),
    ('Taroudant Centre', 18),
    ('Ouarzazate Centre', 19),
    ('Zagora Centre', 20),
    ('Guelmim Centre', 21),
    ('Tan-Tan Centre', 22),
    ('Laâyoune Centre', 23),
    ('El Aaiún Centre', 24),
    ('Dakhla Centre', 25),
    ('Oued Ed-Dahab Centre', 26);
    
    PRINT '✅ Table Villes créée avec ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' villes';
END
ELSE
BEGIN
    PRINT '✅ Table Villes existe déjà';
END

-- 4. Vérifier et créer la table CCTs si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    PRINT '📋 Création de la table CCTs...';
    CREATE TABLE CCTs (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nom NVARCHAR(200) NOT NULL,
        Adresse NVARCHAR(500),
        RegionId INT,
        ProvinceId INT,
        VilleId INT,
        Telephone NVARCHAR(20),
        Email NVARCHAR(100),
        DateCreation DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (RegionId) REFERENCES Regions(Id),
        FOREIGN KEY (ProvinceId) REFERENCES Provinces(Id),
        FOREIGN KEY (VilleId) REFERENCES Villes(Id)
    );
    
    -- Insérer des CCTs de base
    INSERT INTO CCTs (Nom, Adresse, RegionId, ProvinceId, VilleId, Telephone, Email) VALUES 
    ('CCT AZROU', '123 Rue Principale, Azrou', 3, 6, 6, '0535-123456', 'cct.azrou@example.com'),
    ('CCT SALAMA', '456 Avenue Centrale, Tétouan', 5, 11, 11, '0539-123456', 'cct.salama@example.com'),
    ('CCT HANS', '789 Boulevard Hassan II, Casablanca', 1, 1, 1, '0522-123456', 'cct.hans@example.com'),
    ('CCT TETOUAN', '321 Rue Mohammed V, Tétouan', 5, 11, 11, '0539-654321', 'cct.tetouan@example.com'),
    ('CCT CASABLANCA', '654 Avenue Mohammed VI, Casablanca', 1, 1, 1, '0522-654321', 'cct.casablanca@example.com'),
    ('CCT RABAT', '987 Rue Ibn Khaldoun, Rabat', 2, 3, 3, '0537-123456', 'cct.rabat@example.com'),
    ('CCT FES', '654 Boulevard Mohammed V, Fès', 3, 6, 6, '0535-654321', 'cct.fes@example.com'),
    ('CCT MEKNES', '321 Avenue Hassan II, Meknès', 3, 7, 7, '0535-789123', 'cct.meknes@example.com'),
    ('CCT MARRAKECH', '789 Rue Ibn Sina, Marrakech', 4, 8, 8, '0524-123456', 'cct.marrakech@example.com'),
    ('CCT AGADIR', '456 Boulevard Mohammed VI, Agadir', 8, 17, 17, '0528-123456', 'cct.agadir@example.com');
    
    PRINT '✅ Table CCTs créée avec ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' CCTs';
END
ELSE
BEGIN
    PRINT '✅ Table CCTs existe déjà';
END

-- 5. Vérifier et créer la table CategorieCCTs si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CategorieCCTs')
BEGIN
    PRINT '📋 Création de la table CategorieCCTs...';
    CREATE TABLE CategorieCCTs (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Libelle NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500)
    );
    
    -- Insérer des catégories de base
    INSERT INTO CategorieCCTs (Libelle, Description) VALUES 
    ('Toute catégorie', 'Centre autorisé pour toutes les catégories de transport'),
    ('Véhicules légers', 'Centre autorisé uniquement pour les véhicules légers'),
    ('Transport de marchandises', 'Centre spécialisé dans le transport de marchandises'),
    ('Transport de voyageurs', 'Centre spécialisé dans le transport de voyageurs'),
    ('Transport mixte', 'Centre autorisé pour le transport mixte'),
    ('Transport international', 'Centre autorisé pour le transport international'),
    ('Transport urbain', 'Centre spécialisé dans le transport urbain'),
    ('Transport rural', 'Centre spécialisé dans le transport rural');
    
    PRINT '✅ Table CategorieCCTs créée avec ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' catégories';
END
ELSE
BEGIN
    PRINT '✅ Table CategorieCCTs existe déjà';
END

-- 6. Vérifier et créer la table StatutsAdministratifs si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutsAdministratifs')
BEGIN
    PRINT '📋 Création de la table StatutsAdministratifs...';
    CREATE TABLE StatutsAdministratifs (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Libelle NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500),
        Couleur NVARCHAR(20) DEFAULT '#1976d2'
    );
    
    -- Insérer des statuts de base
    INSERT INTO StatutsAdministratifs (Libelle, Description, Couleur) VALUES 
    ('CAP Valide', 'CAP en cours de validité', '#4caf50'),
    ('CAP En cours', 'CAP en cours de traitement', '#2196f3'),
    ('CAP En attente', 'CAP en attente de validation', '#ff9800'),
    ('CAP Non valide', 'CAP rejeté ou invalide', '#f44336'),
    ('CAP Expiré', 'CAP dont la validité est expirée', '#9c27b0'),
    ('CAP Renouvelé', 'CAP renouvelé avec succès', '#00bcd4'),
    ('CAP Suspendu', 'CAP temporairement suspendu', '#ff5722'),
    ('CAP Annulé', 'CAP définitivement annulé', '#795548'),
    ('Activité autorisée', 'Agent autorisé à exercer', '#4caf50'),
    ('Activité suspendue', 'Activité temporairement suspendue', '#ff9800'),
    ('Activité fermée', 'Activité définitivement fermée', '#9e9e9e');
    
    PRINT '✅ Table StatutsAdministratifs créée avec ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' statuts';
END
ELSE
BEGIN
    PRINT '✅ Table StatutsAdministratifs existe déjà';
END

-- 7. Vérifier et créer la table Agents si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    PRINT '📋 Création de la table Agents...';
    CREATE TABLE Agents (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nom NVARCHAR(100) NOT NULL,
        Prenom NVARCHAR(100) NOT NULL,
        CIN NVARCHAR(20) UNIQUE NOT NULL,
        Tel NVARCHAR(20),
        Mail NVARCHAR(100),
        CNSS NVARCHAR(20),
        CCTId INT,
        NumeroCAP NVARCHAR(50),
        DateCAP DATE,
        DateExpirationCAP DATE,
        CategorieCAPId INT,
        StatutAdministratifId INT,
        AnneeAutorisation INT,
        DateAffectationCCT DATE,
        NumDecisionRenouv NVARCHAR(50),
        DateDecisionRenouv DATE,
        Adresse NVARCHAR(500),
        DateCreation DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (CCTId) REFERENCES CCTs(Id),
        FOREIGN KEY (CategorieCAPId) REFERENCES CategorieCCTs(Id),
        FOREIGN KEY (StatutAdministratifId) REFERENCES StatutsAdministratifs(Id)
    );
    
    PRINT '✅ Table Agents créée';
END
ELSE
BEGIN
    PRINT '✅ Table Agents existe déjà';
END

-- 8. Vérifier et créer la table HistoriqueAffectation si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'HistoriqueAffectation')
BEGIN
    PRINT '📋 Création de la table HistoriqueAffectation...';
    CREATE TABLE HistoriqueAffectation (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        EntiteId INT NOT NULL,
        TypeEntite NVARCHAR(20) NOT NULL, -- "Agent" ou "ChefCentre"
        CCTId INT NOT NULL,
        DateAffectation DATETIME NOT NULL,
        DateFinAffectation DATETIME NULL,
        MotifAffectation NVARCHAR(500),
        MotifFinAffectation NVARCHAR(500),
        IsActive BIT DEFAULT 1,
        DateCreation DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (CCTId) REFERENCES CCTs(Id)
    );
    
    PRINT '✅ Table HistoriqueAffectation créée';
END
ELSE
BEGIN
    PRINT '✅ Table HistoriqueAffectation existe déjà';
END

PRINT '';
PRINT '=== AJOUT DES DONNÉES DE TEST ===';
PRINT '';

-- 9. Ajouter des agents de test
PRINT '📋 Ajout des agents de test...';

-- Récupérer les IDs des références
DECLARE @CCTId1 INT, @CCTId2 INT, @CCTId3 INT, @CCTId4 INT, @CCTId5 INT;
DECLARE @CategorieId1 INT, @CategorieId2 INT;
DECLARE @StatutId1 INT, @StatutId2 INT;

SELECT @CCTId1 = Id FROM CCTs WHERE Nom LIKE '%AZROU%';
SELECT @CCTId2 = Id FROM CCTs WHERE Nom LIKE '%SALAMA%';
SELECT @CCTId3 = Id FROM CCTs WHERE Nom LIKE '%HANS%';
SELECT @CCTId4 = Id FROM CCTs WHERE Nom LIKE '%TETOUAN%';
SELECT @CCTId5 = Id FROM CCTs WHERE Nom LIKE '%CASABLANCA%';

SELECT @CategorieId1 = Id FROM CategorieCCTs WHERE Libelle LIKE '%toute catégorie%';
SELECT @CategorieId2 = Id FROM CategorieCCTs WHERE Libelle LIKE '%légers%';

SELECT @StatutId1 = Id FROM StatutsAdministratifs WHERE Libelle LIKE '%CAP Valide%';
SELECT @StatutId2 = Id FROM StatutsAdministratifs WHERE Libelle LIKE '%CAP En cours%';

-- Utiliser des valeurs par défaut si les IDs ne sont pas trouvés
SET @CCTId1 = ISNULL(@CCTId1, 1);
SET @CCTId2 = ISNULL(@CCTId2, 2);
SET @CCTId3 = ISNULL(@CCTId3, 3);
SET @CCTId4 = ISNULL(@CCTId4, 4);
SET @CCTId5 = ISNULL(@CCTId5, 5);

SET @CategorieId1 = ISNULL(@CategorieId1, 1);
SET @CategorieId2 = ISNULL(@CategorieId2, 2);
SET @StatutId1 = ISNULL(@StatutId1, 1);
SET @StatutId2 = ISNULL(@StatutId2, 2);

-- Insérer les agents de test
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, 
    DateCAP, DateExpirationCAP, CategorieCAPId, StatutAdministratifId, 
    AnneeAutorisation, DateAffectationCCT, NumDecisionRenouv, 
    DateDecisionRenouv, Adresse
) VALUES 
-- Agent 1
('AADNAN', 'MY SMAIL', 'VA21008', '0600000000', 'my.smail@example.com', '123456789', @CCTId1, '134/98',
 '1998-05-28', '2024-11-25', @CategorieId1, @StatutId1,
 2023, '2024-03-08', '553/2021', '2021-11-26', '123 Rue Principale, Azrou'),

-- Agent 2
('AADNANE', 'NACIRI', 'BB75100', '0612345678', 'naciri@example.com', '987654321', @CCTId2, '1577/17',
 '2017-08-10', '2025-08-10', @CategorieId2, @StatutId1,
 2023, '2024-01-15', '789/2022', '2022-06-15', '456 Avenue Centrale, Tétouan'),

-- Agent 3
('AALAE', 'KASMI', 'CC12345', '0623456789', 'kasmi@example.com', '456789123', @CCTId3, '302/08',
 '2008-11-10', '2024-11-10', @CategorieId1, @StatutId2,
 2024, '2024-04-04', '456/2023', '2023-09-20', '789 Boulevard Hassan II, Casablanca'),

-- Agent 4
('AAMOUMOUR', 'OTMANE', 'DD67890', '0634567890', 'otmane@example.com', '789123456', @CCTId1, '759/13',
 '2013-07-15', '2025-07-15', @CategorieId2, @StatutId1,
 2004, '2024-02-29', '321/2024', '2024-01-10', '321 Rue Mohammed V, Azrou'),

-- Agent 5
('AARAB', 'MOHAMED', 'EE11111', '0645678901', 'mohamed@example.com', '111222333', @CCTId2, '190/98',
 '1998-07-28', '2024-07-28', @CategorieId1, @StatutId2,
 2023, '2024-05-12', '654/2023', '2023-12-01', '654 Avenue Mohammed VI, Tétouan'),

-- Agent 6
('BENNANI', 'FATIMA', 'FF22222', '0656789012', 'fatima@example.com', '444555666', @CCTId3, '445/99',
 '1999-03-15', '2025-03-15', @CategorieId2, @StatutId1,
 2024, '2024-06-20', '987/2024', '2024-02-15', '987 Rue Ibn Khaldoun, Casablanca'),

-- Agent 7
('CHERKAOUI', 'AHMED', 'GG33333', '0667890123', 'ahmed@example.com', '777888999', @CCTId1, '556/00',
 '2000-09-22', '2024-09-22', @CategorieId1, @StatutId2,
 2023, '2024-07-01', '654/2023', '2023-11-30', '654 Boulevard Mohammed V, Azrou'),

-- Agent 8
('DAHMANI', 'KHADIJA', 'HH44444', '0678901234', 'khadija@example.com', '000111222', @CCTId2, '667/01',
 '2001-12-05', '2025-12-05', @CategorieId2, @StatutId1,
 2024, '2024-08-15', '321/2024', '2024-03-20', '321 Avenue Hassan II, Tétouan'),

-- Agent 9
('EL AMRANI', 'YOUSSEF', 'II55555', '0689012345', 'youssef@example.com', '333444555', @CCTId3, '778/02',
 '2002-06-18', '2024-06-18', @CategorieId1, @StatutId2,
 2023, '2024-09-10', '789/2023', '2023-10-15', '789 Rue Ibn Sina, Casablanca'),

-- Agent 10
('FADILI', 'AMINA', 'JJ66666', '0690123456', 'amina@example.com', '666777888', @CCTId1, '889/03',
 '2003-01-30', '2025-01-30', @CategorieId2, @StatutId1,
 2024, '2024-10-25', '456/2024', '2024-04-05', '456 Boulevard Mohammed VI, Azrou');

PRINT '✅ ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' agents ajoutés avec succès !';

-- 10. Ajouter l'historique des affectations
PRINT '';
PRINT '📋 Ajout de l''historique des affectations...';

-- Récupérer quelques agents et CCTs existants pour créer l'historique
DECLARE @Agent1Id INT, @Agent2Id INT, @Agent3Id INT, @Agent4Id INT, @Agent5Id INT;

-- Récupérer les IDs des agents
SELECT @Agent1Id = Id FROM Agents WHERE Nom = 'AADNAN' AND Prenom = 'MY SMAIL';
SELECT @Agent2Id = Id FROM Agents WHERE Nom = 'AADNANE' AND Prenom = 'NACIRI';
SELECT @Agent3Id = Id FROM Agents WHERE Nom = 'AALAE' AND Prenom = 'KASMI';
SELECT @Agent4Id = Id FROM Agents WHERE Nom = 'AAMOUMOUR' AND Prenom = 'OTMANE';
SELECT @Agent5Id = Id FROM Agents WHERE Nom = 'AARAB' AND Prenom = 'MOHAMED';

-- Utiliser des valeurs par défaut si les IDs ne sont pas trouvés
SET @Agent1Id = ISNULL(@Agent1Id, 1);
SET @Agent2Id = ISNULL(@Agent2Id, 2);
SET @Agent3Id = ISNULL(@Agent3Id, 3);
SET @Agent4Id = ISNULL(@Agent4Id, 4);
SET @Agent5Id = ISNULL(@Agent5Id, 5);

-- Insérer l'historique des affectations pour les agents
INSERT INTO HistoriqueAffectation (
    EntiteId, TypeEntite, CCTId, DateAffectation, DateFinAffectation, 
    MotifAffectation, MotifFinAffectation, IsActive, DateCreation
) VALUES 
-- Agent 1: AADNAN MY SMAIL - Historique complet
(@Agent1Id, 'Agent', @CCTId1, '2020-01-15', '2022-06-30', 
 'Affectation initiale au CCT Azrou', 'Transfert vers nouveau CCT', 0, '2020-01-15'),

(@Agent1Id, 'Agent', @CCTId2, '2022-07-01', '2023-12-31', 
 'Transfert vers CCT Salama', 'Retour au CCT d''origine', 0, '2022-07-01'),

(@Agent1Id, 'Agent', @CCTId1, '2024-01-01', NULL, 
 'Retour au CCT Azrou', NULL, 1, '2024-01-01'),

-- Agent 2: AADNANE NACIRI - Historique avec plusieurs affectations
(@Agent2Id, 'Agent', @CCTId2, '2019-03-01', '2021-08-31', 
 'Première affectation au CCT Salama', 'Promotion et transfert', 0, '2019-03-01'),

(@Agent2Id, 'Agent', @CCTId3, '2021-09-01', '2023-05-31', 
 'Transfert vers CCT Hans pour formation', 'Retour après formation', 0, '2021-09-01'),

(@Agent2Id, 'Agent', @CCTId2, '2023-06-01', NULL, 
 'Retour au CCT Salama', NULL, 1, '2023-06-01'),

-- Agent 3: AALAE KASMI - Historique simple
(@Agent3Id, 'Agent', @CCTId3, '2022-01-10', '2023-11-30', 
 'Affectation au CCT Hans', 'Transfert temporaire', 0, '2022-01-10'),

(@Agent3Id, 'Agent', @CCTId4, '2023-12-01', NULL, 
 'Transfert vers CCT Tétouan', NULL, 1, '2023-12-01'),

-- Agent 4: AAMOUMOUR OTMANE - Historique avec affectations multiples
(@Agent4Id, 'Agent', @CCTId1, '2018-06-01', '2020-12-31', 
 'Affectation initiale au CCT Azrou', 'Transfert pour projet spécial', 0, '2018-06-01'),

(@Agent4Id, 'Agent', @CCTId5, '2021-01-01', '2022-08-31', 
 'Projet spécial au CCT Casablanca', 'Fin du projet', 0, '2021-01-01'),

(@Agent4Id, 'Agent', @CCTId3, '2022-09-01', '2023-07-31', 
 'Affectation temporaire au CCT Hans', 'Retour au CCT d''origine', 0, '2022-09-01'),

(@Agent4Id, 'Agent', @CCTId1, '2023-08-01', NULL, 
 'Retour définitif au CCT Azrou', NULL, 1, '2023-08-01'),

-- Agent 5: AARAB MOHAMED - Historique avec une seule affectation
(@Agent5Id, 'Agent', @CCTId2, '2023-01-01', NULL, 
 'Affectation au CCT Salama', NULL, 1, '2023-01-01');

PRINT '✅ ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' enregistrements d''historique ajoutés !';

PRINT '';
PRINT '=== VÉRIFICATION FINALE ===';
PRINT '';

-- Vérifier le nombre total d'agents
DECLARE @TotalAgents INT;
SELECT @TotalAgents = COUNT(*) FROM Agents;
PRINT '📊 Nombre total d''agents: ' + CAST(@TotalAgents AS VARCHAR(10));

-- Vérifier le nombre total d'enregistrements d'historique
DECLARE @TotalHistorique INT;
SELECT @TotalHistorique = COUNT(*) FROM HistoriqueAffectation;
PRINT '📊 Nombre total d''enregistrements d''historique: ' + CAST(@TotalHistorique AS VARCHAR(10));

-- Vérifier les relations
PRINT '';
PRINT '🔗 Vérification des relations Agents-CCTs:';
SELECT 
    a.Id as AgentId,
    a.Nom + ' ' + a.Prenom as NomComplet,
    a.CCTId,
    c.Nom as CCTNom,
    CASE 
        WHEN c.Id IS NULL THEN '❌ CCT non trouvé'
        ELSE '✅ CCT trouvé'
    END as StatutRelation
FROM Agents a
LEFT JOIN CCTs c ON a.CCTId = c.Id
ORDER BY a.Id;

PRINT '';
PRINT '=== CONFIGURATION TERMINÉE AVEC SUCCÈS ! ===';
PRINT '🎉 Vous pouvez maintenant tester le module Agents dans l''application.';
PRINT '📋 ' + CAST(@TotalAgents AS VARCHAR(10)) + ' agents et ' + CAST(@TotalHistorique AS VARCHAR(10)) + ' enregistrements d''historique sont disponibles.';
