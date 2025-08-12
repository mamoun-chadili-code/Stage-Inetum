-- Script pour ajouter des données de test pour les Agents
-- Exécutez ce script dans SQL Server Management Studio

USE CT_CNEH_DB;
GO

-- Vérifier si la table Agents existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    PRINT 'La table Agents n''existe pas. Veuillez d''abord créer la table.';
    RETURN;
END

-- Vérifier si les tables de référence existent
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    PRINT 'La table CCTs n''existe pas. Veuillez d''abord créer les CCTs.';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CategorieCCTs')
BEGIN
    PRINT 'La table CategorieCCTs n''existe pas. Veuillez d''abord créer les catégories.';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutsAdministratifs')
BEGIN
    PRINT 'La table StatutsAdministratifs n''existe pas. Veuillez d''abord créer les statuts.';
    RETURN;
END

-- Récupérer les IDs existants
DECLARE @CCTId1 INT, @CCTId2 INT, @CCTId3 INT;
DECLARE @CategorieId1 INT, @CategorieId2 INT;
DECLARE @StatutId1 INT, @StatutId2 INT;

SELECT @CCTId1 = Id FROM CCTs WHERE Nom LIKE '%AZROU%' LIMIT 1;
SELECT @CCTId2 = Id FROM CCTs WHERE Nom LIKE '%SALAMA%' LIMIT 1;
SELECT @CCTId3 = Id FROM CCTs WHERE Nom LIKE '%HANS%' LIMIT 1;

SELECT @CategorieId1 = Id FROM CategorieCCTs WHERE Libelle LIKE '%toute catégorie%' LIMIT 1;
SELECT @CategorieId2 = Id FROM CategorieCCTs WHERE Libelle LIKE '%légers%' LIMIT 1;

SELECT @StatutId1 = Id FROM StatutsAdministratifs WHERE Libelle LIKE '%CAPV%' LIMIT 1;
SELECT @StatutId2 = Id FROM StatutsAdministratifs WHERE Libelle LIKE '%validé%' LIMIT 1;

-- Utiliser des valeurs par défaut si les IDs ne sont pas trouvés
SET @CCTId1 = ISNULL(@CCTId1, 17);
SET @CCTId2 = ISNULL(@CCTId2, 18);
SET @CCTId3 = ISNULL(@CCTId3, 19);
SET @CategorieId1 = ISNULL(@CategorieId1, 1);
SET @CategorieId2 = ISNULL(@CategorieId2, 2);
SET @StatutId1 = ISNULL(@StatutId1, 1);
SET @StatutId2 = ISNULL(@StatutId2, 2);

-- Supprimer les données existantes (optionnel)
-- DELETE FROM Agents;

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

PRINT '10 agents de test ont été ajoutés avec succès !';
PRINT 'Vous pouvez maintenant tester le module Agent dans l''application.'; 