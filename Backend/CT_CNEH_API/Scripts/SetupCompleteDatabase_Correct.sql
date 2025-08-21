-- Script corrigé pour configurer la base de données CT_CNEH_DB
-- Ce script utilise les VRAIS noms de colonnes de la base existante

USE CT_CNEH_DB;
GO

PRINT '=== CONFIGURATION COMPLÈTE DE LA BASE DE DONNÉES (VERSION CORRIGÉE) ===';
PRINT '';

-- 1. Vérifier et ajouter des données dans la table Regions (si vide)
IF NOT EXISTS (SELECT TOP 1 * FROM Regions)
BEGIN
    PRINT '📋 Ajout des données dans la table Regions...';
    INSERT INTO Regions (Libelle, Code) VALUES
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
    
    PRINT '✅ ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' régions ajoutées';
END
ELSE
BEGIN
    PRINT '✅ Table Regions contient déjà des données';
END

-- 2. Vérifier et ajouter des données dans la table Provinces (si vide)
IF NOT EXISTS (SELECT TOP 1 * FROM Provinces)
BEGIN
    PRINT '📋 Ajout des données dans la table Provinces...';
    
    -- Récupérer les IDs des régions
    DECLARE @RegionCS INT, @RegionRSK INT, @RegionFM INT, @RegionMS INT, @RegionTTAH INT;
    DECLARE @RegionBMK INT, @RegionOR INT, @RegionSM INT, @RegionDT INT, @RegionGON INT;
    DECLARE @RegionLSH INT, @RegionDOD INT;
    
    SELECT @RegionCS = Id FROM Regions WHERE Code = 'CS';
    SELECT @RegionRSK = Id FROM Regions WHERE Code = 'RSK';
    SELECT @RegionFM = Id FROM Regions WHERE Code = 'FM';
    SELECT @RegionMS = Id FROM Regions WHERE Code = 'MS';
    SELECT @RegionTTAH = Id FROM Regions WHERE Code = 'TTAH';
    SELECT @RegionBMK = Id FROM Regions WHERE Code = 'BMK';
    SELECT @RegionOR = Id FROM Regions WHERE Code = 'OR';
    SELECT @RegionSM = Id FROM Regions WHERE Code = 'SM';
    SELECT @RegionDT = Id FROM Regions WHERE Code = 'DT';
    SELECT @RegionGON = Id FROM Regions WHERE Code = 'GON';
    SELECT @RegionLSH = Id FROM Regions WHERE Code = 'LSH';
    SELECT @RegionDOD = Id FROM Regions WHERE Code = 'DOD';
    
    -- Utiliser des valeurs par défaut si non trouvées
    SET @RegionCS = ISNULL(@RegionCS, 1);
    SET @RegionRSK = ISNULL(@RegionRSK, 2);
    SET @RegionFM = ISNULL(@RegionFM, 3);
    SET @RegionMS = ISNULL(@RegionMS, 4);
    SET @RegionTTAH = ISNULL(@RegionTTAH, 5);
    SET @RegionBMK = ISNULL(@RegionBMK, 6);
    SET @RegionOR = ISNULL(@RegionOR, 7);
    SET @RegionSM = ISNULL(@RegionSM, 8);
    SET @RegionDT = ISNULL(@RegionDT, 9);
    SET @RegionGON = ISNULL(@RegionGON, 10);
    SET @RegionLSH = ISNULL(@RegionLSH, 11);
    SET @RegionDOD = ISNULL(@RegionDOD, 12);
    
    INSERT INTO Provinces (Libelle, Code, RegionId) VALUES
    ('Casablanca', 'CASA', @RegionCS),
    ('Mohammedia', 'MOHA', @RegionCS),
    ('El Jadida', 'EJAD', @RegionCS),
    ('Settat', 'SETT', @RegionCS),
    ('Berrechid', 'BERR', @RegionCS),
    ('Benslimane', 'BENS', @RegionCS),
    ('Nouaceur', 'NOUA', @RegionCS),
    ('Rabat', 'RABA', @RegionRSK),
    ('Salé', 'SALE', @RegionRSK),
    ('Kénitra', 'KENI', @RegionRSK),
    ('Témara', 'TEMA', @RegionRSK),
    ('Skhirate', 'SKHI', @RegionRSK),
    ('Fès', 'FES', @RegionFM),
    ('Meknès', 'MEKN', @RegionFM),
    ('Taza', 'TAZA', @RegionFM),
    ('Sefrou', 'SEFR', @RegionFM),
    ('Marrakech', 'MARR', @RegionMS),
    ('Safi', 'SAFI', @RegionMS),
    ('Essaouira', 'ESSA', @RegionMS),
    ('El Kelaa des Sraghna', 'KELA', @RegionMS),
    ('Tanger', 'TANG', @RegionTTAH),
    ('Tétouan', 'TETO', @RegionTTAH),
    ('Al Hoceima', 'HOCI', @RegionTTAH),
    ('Chefchaouen', 'CHEF', @RegionTTAH),
    ('Larache', 'LARA', @RegionTTAH),
    ('Fahs-Anjra', 'FAHS', @RegionTTAH);
    
    PRINT '✅ ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' provinces ajoutées';
END
ELSE
BEGIN
    PRINT '✅ Table Provinces contient déjà des données';
END

-- 3. Vérifier et ajouter des données dans la table Villes (si vide)
IF NOT EXISTS (SELECT TOP 1 * FROM Villes)
BEGIN
    PRINT '📋 Ajout des données dans la table Villes...';
    
    -- Récupérer quelques IDs de provinces pour les villes
    DECLARE @ProvCasa INT, @ProvRabat INT, @ProvFes INT, @ProvMarr INT, @ProvTang INT;
    
    SELECT @ProvCasa = Id FROM Provinces WHERE Code = 'CASA';
    SELECT @ProvRabat = Id FROM Provinces WHERE Code = 'RABA';
    SELECT @ProvFes = Id FROM Provinces WHERE Code = 'FES';
    SELECT @ProvMarr = Id FROM Provinces WHERE Code = 'MARR';
    SELECT @ProvTang = Id FROM Provinces WHERE Code = 'TANG';
    
    -- Utiliser des valeurs par défaut si non trouvées
    SET @ProvCasa = ISNULL(@ProvCasa, 1);
    SET @ProvRabat = ISNULL(@ProvRabat, 8);
    SET @ProvFes = ISNULL(@ProvFes, 13);
    SET @ProvMarr = ISNULL(@ProvMarr, 17);
    SET @ProvTang = ISNULL(@ProvTang, 21);
    
    INSERT INTO Villes (Libelle, Code, ProvinceId) VALUES
    ('Casablanca Centre', 'CASA-C', @ProvCasa),
    ('Casablanca Anfa', 'CASA-A', @ProvCasa),
    ('Casablanca Hay Hassani', 'CASA-H', @ProvCasa),
    ('Casablanca Sidi Bernoussi', 'CASA-S', @ProvCasa),
    ('Casablanca Ain Chock', 'CASA-AC', @ProvCasa),
    ('Rabat Agdal', 'RABA-A', @ProvRabat),
    ('Rabat Hassan', 'RABA-H', @ProvRabat),
    ('Rabat Souissi', 'RABA-S', @ProvRabat),
    ('Rabat Yacoub El Mansour', 'RABA-Y', @ProvRabat),
    ('Fès Médina', 'FES-M', @ProvFes),
    ('Fès Saiss', 'FES-S', @ProvFes),
    ('Fès Zouagha', 'FES-Z', @ProvFes),
    ('Marrakech Médina', 'MARR-M', @ProvMarr),
    ('Marrakech Gueliz', 'MARR-G', @ProvMarr),
    ('Marrakech Ménara', 'MARR-ME', @ProvMarr),
    ('Tanger Médina', 'TANG-M', @ProvTang),
    ('Tanger Charf', 'TANG-C', @ProvTang),
    ('Tanger Bni Makada', 'TANG-B', @ProvTang);
    
    PRINT '✅ ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' villes ajoutées';
END
ELSE
BEGIN
    PRINT '✅ Table Villes contient déjà des données';
END

-- 4. Vérifier et ajouter des données dans la table CategorieCCTs (si vide)
IF NOT EXISTS (SELECT TOP 1 * FROM CategorieCCTs)
BEGIN
    PRINT '📋 Ajout des données dans la table CategorieCCTs...';
    INSERT INTO CategorieCCTs (Libelle, Description) VALUES
    ('Toute catégorie', 'Autorisation pour tous types de véhicules'),
    ('Véhicules légers', 'Véhicules de transport de personnes jusqu''à 9 places'),
    ('Véhicules lourds', 'Véhicules de transport de marchandises > 3.5T'),
    ('Transport urbain', 'Véhicules de transport urbain et périurbain'),
    ('Transport interurbain', 'Véhicules de transport entre villes'),
    ('Transport rural', 'Véhicules de transport en milieu rural'),
    ('Transport touristique', 'Véhicules de transport touristique'),
    ('Transport scolaire', 'Véhicules de transport scolaire');
    
    PRINT '✅ ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' catégories CCT ajoutées';
END
ELSE
BEGIN
    PRINT '✅ Table CategorieCCTs contient déjà des données';
END

-- 5. Vérifier et ajouter des données dans la table StatutAdministratifs (si vide)
IF NOT EXISTS (SELECT TOP 1 * FROM StatutAdministratifs)
BEGIN
    PRINT '📋 Ajout des données dans la table StatutAdministratifs...';
    INSERT INTO StatutAdministratifs (Libelle, Description, IsActif) VALUES
    ('CAP Valide', 'Certificat d''Aptitude Professionnelle valide', 1),
    ('CAP En cours', 'Certificat d''Aptitude Professionnelle en cours de traitement', 1),
    ('CAP Expiré', 'Certificat d''Aptitude Professionnelle expiré', 0),
    ('CAP Suspendu', 'Certificat d''Aptitude Professionnelle suspendu', 0),
    ('CAP Annulé', 'Certificat d''Aptitude Professionnelle annulé', 0),
    ('En formation', 'Agent en cours de formation', 1),
    ('Stagiaire', 'Agent stagiaire', 1),
    ('Titulaire', 'Agent titulaire du poste', 1),
    ('Contractuel', 'Agent sous contrat', 1),
    ('Retraité', 'Agent à la retraite', 0),
    ('Démissionnaire', 'Agent ayant démissionné', 0);
    
    PRINT '✅ ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' statuts administratifs ajoutés';
END
ELSE
BEGIN
    PRINT '✅ Table StatutAdministratifs contient déjà des données';
END

-- 6. Vérifier et ajouter des données dans la table CCTs (si vide)
IF NOT EXISTS (SELECT TOP 1 * FROM CCTs)
BEGIN
    PRINT '📋 Ajout des données dans la table CCTs...';
    
    -- Récupérer quelques IDs de villes pour les CCTs
    DECLARE @VilleCasa1 INT, @VilleCasa2 INT, @VilleRabat1 INT, @VilleFes1 INT, @VilleMarr1 INT;
    DECLARE @VilleTang1 INT;
    
    SELECT @VilleCasa1 = Id FROM Villes WHERE Code = 'CASA-C';
    SELECT @VilleCasa2 = Id FROM Villes WHERE Code = 'CASA-A';
    SELECT @VilleRabat1 = Id FROM Villes WHERE Code = 'RABA-A';
    SELECT @VilleFes1 = Id FROM Villes WHERE Code = 'FES-M';
    SELECT @VilleMarr1 = Id FROM Villes WHERE Code = 'MARR-M';
    SELECT @VilleTang1 = Id FROM Villes WHERE Code = 'TANG-M';
    
    -- Utiliser des valeurs par défaut si non trouvées
    SET @VilleCasa1 = ISNULL(@VilleCasa1, 1);
    SET @VilleCasa2 = ISNULL(@VilleCasa2, 2);
    SET @VilleRabat1 = ISNULL(@VilleRabat1, 6);
    SET @VilleFes1 = ISNULL(@VilleFes1, 10);
    SET @VilleMarr1 = ISNULL(@VilleMarr1, 13);
    SET @VilleTang1 = ISNULL(@VilleTang1, 16);
    
    INSERT INTO CCTs (Libelle, Code, Adresse, Tel, Email, VilleId, IsActif, DateCreation) VALUES
    ('CCT Casablanca Centre', 'CCT-CASA-01', '123 Boulevard Mohammed V, Casablanca', '0522123456', 'casa.centre@cct.ma', @VilleCasa1, 1, GETDATE()),
    ('CCT Casablanca Anfa', 'CCT-CASA-02', '456 Avenue Hassan II, Anfa', '0522234567', 'casa.anfa@cct.ma', @VilleCasa2, 1, GETDATE()),
    ('CCT Rabat Agdal', 'CCT-RABA-01', '789 Avenue Mohammed VI, Agdal', '0537345678', 'rabat.agdal@cct.ma', @VilleRabat1, 1, GETDATE()),
    ('CCT Fès Médina', 'CCT-FES-01', '321 Rue Ibn Khaldoun, Fès', '0535456789', 'fes.medina@cct.ma', @VilleFes1, 1, GETDATE()),
    ('CCT Marrakech Médina', 'CCT-MARR-01', '654 Place Jemaa El Fna, Marrakech', '0524567890', 'marrakech.medina@cct.ma', @VilleMarr1, 1, GETDATE()),
    ('CCT Tanger Médina', 'CCT-TANG-01', '987 Rue de la Liberté, Tanger', '0539678901', 'tanger.medina@cct.ma', @VilleTang1, 1, GETDATE()),
    ('CCT Azrou', 'CCT-AZRO-01', '159 Avenue Hassan II, Azrou', '0535789012', 'azrou@cct.ma', @VilleFes1, 1, GETDATE()),
    ('CCT Salama', 'CCT-SALA-01', '753 Boulevard Mohammed V, Salé', '0537890123', 'salama@cct.ma', @VilleRabat1, 1, GETDATE()),
    ('CCT Hans', 'CCT-HANS-01', '486 Rue Al Amal, Hans', '0535901234', 'hans@cct.ma', @VilleFes1, 1, GETDATE()),
    ('CCT Tétouan Centre', 'CCT-TETO-01', '258 Avenue Mohammed VI, Tétouan', '0539012345', 'tetouan@cct.ma', @VilleTang1, 1, GETDATE());
    
    PRINT '✅ ' + CAST(@@ROWCOUNT AS VARCHAR(10)) + ' CCTs ajoutés';
END
ELSE
BEGIN
    PRINT '✅ Table CCTs contient déjà des données';
END

-- 7. Vérifier et ajouter des agents de test (si la table est vide)
IF NOT EXISTS (SELECT TOP 1 * FROM Agents)
BEGIN
    PRINT '📋 Ajout des agents de test...';
    
    -- Récupérer les IDs des références
    DECLARE @CCTId1 INT, @CCTId2 INT, @CCTId3 INT, @CCTId4 INT, @CCTId5 INT;
    DECLARE @CategorieId1 INT, @CategorieId2 INT;
    DECLARE @StatutId1 INT, @StatutId2 INT;
    
    SELECT @CCTId1 = Id FROM CCTs WHERE Libelle LIKE '%Azrou%';
    SELECT @CCTId2 = Id FROM CCTs WHERE Libelle LIKE '%Salama%';
    SELECT @CCTId3 = Id FROM CCTs WHERE Libelle LIKE '%Hans%';
    SELECT @CCTId4 = Id FROM CCTs WHERE Libelle LIKE '%Tétouan%';
    SELECT @CCTId5 = Id FROM CCTs WHERE Libelle LIKE '%Casablanca%';
    
    SELECT @CategorieId1 = Id FROM CategorieCCTs WHERE Libelle LIKE '%toute catégorie%';
    SELECT @CategorieId2 = Id FROM CategorieCCTs WHERE Libelle LIKE '%légers%';
    
    SELECT @StatutId1 = Id FROM StatutAdministratifs WHERE Libelle LIKE '%CAP Valide%';
    SELECT @StatutId2 = Id FROM StatutAdministratifs WHERE Libelle LIKE '%CAP En cours%';
    
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
END
ELSE
BEGIN
    PRINT '✅ Table Agents contient déjà des données';
END

-- 8. Vérifier et ajouter l'historique des affectations (si la table est vide)
IF NOT EXISTS (SELECT TOP 1 * FROM HistoriqueAffectations)
BEGIN
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
    
    -- Récupérer à nouveau les IDs des CCTs
    SELECT @CCTId1 = Id FROM CCTs WHERE Libelle LIKE '%Azrou%';
    SELECT @CCTId2 = Id FROM CCTs WHERE Libelle LIKE '%Salama%';
    SELECT @CCTId3 = Id FROM CCTs WHERE Libelle LIKE '%Hans%';
    SELECT @CCTId4 = Id FROM CCTs WHERE Libelle LIKE '%Tétouan%';
    SELECT @CCTId5 = Id FROM CCTs WHERE Libelle LIKE '%Casablanca%';
    
    SET @CCTId1 = ISNULL(@CCTId1, 1);
    SET @CCTId2 = ISNULL(@CCTId2, 2);
    SET @CCTId3 = ISNULL(@CCTId3, 3);
    SET @CCTId4 = ISNULL(@CCTId4, 4);
    SET @CCTId5 = ISNULL(@CCTId5, 5);
    
    -- Insérer l'historique des affectations pour les agents
    INSERT INTO HistoriqueAffectations (
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
END
ELSE
BEGIN
    PRINT '✅ Table HistoriqueAffectations contient déjà des données';
END

PRINT '';
PRINT '=== VÉRIFICATION FINALE ===';
PRINT '';

-- Vérifier le nombre total d'agents
DECLARE @TotalAgents INT;
SELECT @TotalAgents = COUNT(*) FROM Agents;
PRINT '📊 Nombre total d''agents: ' + CAST(@TotalAgents AS VARCHAR(10));

-- Vérifier le nombre total d'enregistrements d'historique
DECLARE @TotalHistorique INT;
SELECT @TotalHistorique = COUNT(*) FROM HistoriqueAffectations;
PRINT '📊 Nombre total d''enregistrements d''historique: ' + CAST(@TotalHistorique AS VARCHAR(10));

-- Vérifier les autres tables
DECLARE @TotalRegions INT, @TotalProvinces INT, @TotalVilles INT, @TotalCCTs INT;
DECLARE @TotalCategories INT, @TotalStatuts INT;

SELECT @TotalRegions = COUNT(*) FROM Regions;
SELECT @TotalProvinces = COUNT(*) FROM Provinces;
SELECT @TotalVilles = COUNT(*) FROM Villes;
SELECT @TotalCCTs = COUNT(*) FROM CCTs;
SELECT @TotalCategories = COUNT(*) FROM CategorieCCTs;
SELECT @TotalStatuts = COUNT(*) FROM StatutAdministratifs;

PRINT '📊 Nombre total de régions: ' + CAST(@TotalRegions AS VARCHAR(10));
PRINT '📊 Nombre total de provinces: ' + CAST(@TotalProvinces AS VARCHAR(10));
PRINT '📊 Nombre total de villes: ' + CAST(@TotalVilles AS VARCHAR(10));
PRINT '📊 Nombre total de CCTs: ' + CAST(@TotalCCTs AS VARCHAR(10));
PRINT '📊 Nombre total de catégories: ' + CAST(@TotalCategories AS VARCHAR(10));
PRINT '📊 Nombre total de statuts: ' + CAST(@TotalStatuts AS VARCHAR(10));

-- Vérifier les relations
PRINT '';
PRINT '🔗 Vérification des relations Agents-CCTs:';
SELECT TOP 5
    a.Id as AgentId,
    a.Nom + ' ' + a.Prenom as NomComplet,
    a.CCTId,
    c.Libelle as CCTNom,
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
