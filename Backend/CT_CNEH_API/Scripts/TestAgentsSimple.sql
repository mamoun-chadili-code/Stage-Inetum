-- Script SQL Server simple pour ajouter 6 agents de test
-- Utilise directement les IDs 1, 2, 3 pour les CCTs

USE CT_CNEH_DB;
GO

-- Vérifier si la table Agents existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    PRINT 'La table Agents n''existe pas. Veuillez d''abord créer la table.';
    RETURN;
END

-- Utiliser directement les IDs 1, 2, 3 pour les CCTs
DECLARE @CCTId1 INT = 1;
DECLARE @CCTId2 INT = 2;
DECLARE @CCTId3 INT = 3;
DECLARE @CategorieId1 INT = 1;
DECLARE @CategorieId2 INT = 2;
DECLARE @StatutId1 INT = 1;
DECLARE @StatutId2 INT = 2;

PRINT 'Utilisation des IDs suivants :';
PRINT 'CCTs : ' + CAST(@CCTId1 AS VARCHAR) + ', ' + CAST(@CCTId2 AS VARCHAR) + ', ' + CAST(@CCTId3 AS VARCHAR);
PRINT 'Catégories : ' + CAST(@CategorieId1 AS VARCHAR) + ', ' + CAST(@CategorieId2 AS VARCHAR);
PRINT 'Statuts : ' + CAST(@StatutId1 AS VARCHAR) + ', ' + CAST(@StatutId2 AS VARCHAR);

-- Vérifier que les CCTs existent
IF NOT EXISTS (SELECT * FROM CCTs WHERE Id IN (1, 2, 3))
BEGIN
    PRINT 'ERREUR : Les CCTs avec les IDs 1, 2, 3 n''existent pas.';
    PRINT 'Veuillez vérifier les IDs des CCTs existants.';
    RETURN;
END

-- Insérer 6 agents de test
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, 
    DateCAP, DateExpirationCAP, CategorieCAPId, StatutAdministratifId, 
    AnneeAutorisation, DateAffectationCCT, NumDecisionRenouv, 
    DateDecisionRenouv, Adresse
) VALUES 
-- Agent 1 : AADNAN MY SMAIL (pour tester la modification)
('AADNAN', 'MY SMAIL', 'VA21008', '0600000000', 'my.smail@example.com', '123456789', @CCTId1, '134/98',
 '1998-05-28', '2024-11-25', @CategorieId1, @StatutId1,
 2023, '2024-03-08', '553/2021', '2021-11-26', '123 Rue Principale, Azrou'),

-- Agent 2 : AADNANE NACIRI (pour tester la suppression)
('AADNANE', 'NACIRI', 'BB75100', '0612345678', 'naciri@example.com', '987654321', @CCTId2, '1577/17',
 '2017-08-10', '2025-08-10', @CategorieId2, @StatutId1,
 2023, '2024-01-15', '789/2022', '2022-06-15', '456 Avenue Centrale, Tétouan'),

-- Agent 3 : AALAE KASMI (pour tester les détails)
('AALAE', 'KASMI', 'CC12345', '0623456789', 'kasmi@example.com', '456789123', @CCTId3, '302/08',
 '2008-11-10', '2024-11-10', @CategorieId1, @StatutId2,
 2024, '2024-04-04', '456/2023', '2023-09-20', '789 Boulevard Hassan II, Casablanca'),

-- Agent 4 : AAMOUMOUR OTMANE (pour tester l'ajout)
('AAMOUMOUR', 'OTMANE', 'DD67890', '0634567890', 'otmane@example.com', '789123456', @CCTId1, '759/13',
 '2013-07-15', '2025-07-15', @CategorieId2, @StatutId1,
 2004, '2024-02-29', '321/2024', '2024-01-10', '321 Rue Mohammed V, Azrou'),

-- Agent 5 : AARAB MOHAMED (pour tester la recherche)
('AARAB', 'MOHAMED', 'EE11111', '0645678901', 'mohamed@example.com', '111222333', @CCTId2, '190/98',
 '1998-07-28', '2024-07-28', @CategorieId1, @StatutId2,
 2023, '2024-05-12', '654/2023', '2023-12-01', '654 Avenue Mohammed VI, Tétouan'),

-- Agent 6 : BENNANI FATIMA (pour tester la pagination)
('BENNANI', 'FATIMA', 'FF22222', '0656789012', 'fatima@example.com', '444555666', @CCTId3, '445/99',
 '1999-03-15', '2025-03-15', @CategorieId2, @StatutId1,
 2024, '2024-06-20', '987/2024', '2024-02-15', '987 Rue Ibn Khaldoun, Casablanca');

PRINT '6 agents de test ont été ajoutés avec succès !';
PRINT '';
PRINT '=== INSTRUCTIONS DE TEST ===';
PRINT '1. Testez l''ajout : Cliquez sur "+ Ajouter Agent" et remplissez le formulaire';
PRINT '2. Testez la modification : Cliquez sur l''icône Modifier pour AADNAN MY SMAIL';
PRINT '3. Testez la suppression : Cliquez sur l''icône Supprimer pour AADNANE NACIRI';
PRINT '4. Testez les détails : Cliquez sur l''icône Détails pour AALAE KASMI';
PRINT '5. Testez la recherche : Utilisez les filtres en haut de la page';
PRINT '6. Testez la pagination : Changez de page si vous avez plus de 10 agents';
PRINT '';
PRINT '=== DONNÉES DE TEST ===';
PRINT 'Agent 1 (AADNAN MY SMAIL) - ID: VA21008 - Pour modification';
PRINT 'Agent 2 (AADNANE NACIRI) - ID: BB75100 - Pour suppression';
PRINT 'Agent 3 (AALAE KASMI) - ID: CC12345 - Pour détails';
PRINT 'Agent 4 (AAMOUMOUR OTMANE) - ID: DD67890 - Pour ajout';
PRINT 'Agent 5 (AARAB MOHAMED) - ID: EE11111 - Pour recherche';
PRINT 'Agent 6 (BENNANI FATIMA) - ID: FF22222 - Pour pagination'; 