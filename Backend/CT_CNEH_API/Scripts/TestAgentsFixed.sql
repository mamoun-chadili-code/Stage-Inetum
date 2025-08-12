-- Script SQL Server corrigé pour ajouter 6 agents de test
-- Utilise les vrais IDs des CCTs existants (1-29)

USE CT_CNEH_DB;
GO

-- Vérifier si la table Agents existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    PRINT 'La table Agents n''existe pas. Veuillez d''abord créer la table.';
    RETURN;
END

-- Récupérer les vrais IDs des CCTs existants
DECLARE @CCTId1 INT, @CCTId2 INT, @CCTId3 INT;
DECLARE @CategorieId1 INT, @CategorieId2 INT;
DECLARE @StatutId1 INT, @StatutId2 INT;

-- Récupérer les 3 premiers CCTs disponibles
SELECT TOP 1 @CCTId1 = Id FROM CCTs ORDER BY Id;
SELECT TOP 1 @CCTId2 = Id FROM CCTs WHERE Id > @CCTId1 ORDER BY Id;
SELECT TOP 1 @CCTId3 = Id FROM CCTs WHERE Id > @CCTId2 ORDER BY Id;

-- Si on n'a pas trouvé assez de CCTs, utiliser le premier pour tous
IF @CCTId2 IS NULL SET @CCTId2 = @CCTId1;
IF @CCTId3 IS NULL SET @CCTId3 = @CCTId1;

-- Récupérer les 2 premières catégories
SELECT TOP 1 @CategorieId1 = Id FROM CategorieCCTs ORDER BY Id;
SELECT TOP 1 @CategorieId2 = Id FROM CategorieCCTs WHERE Id > @CategorieId1 ORDER BY Id;

-- Si on n'a qu'une seule catégorie, utiliser la même
IF @CategorieId2 IS NULL SET @CategorieId2 = @CategorieId1;

-- Récupérer les 2 premiers statuts
SELECT TOP 1 @StatutId1 = Id FROM StatutsAdministratifs ORDER BY Id;
SELECT TOP 1 @StatutId2 = Id FROM StatutsAdministratifs WHERE Id > @StatutId1 ORDER BY Id;

-- Si on n'a qu'un seul statut, utiliser le même
IF @StatutId2 IS NULL SET @StatutId2 = @StatutId1;

PRINT 'Utilisation des IDs suivants :';
PRINT 'CCTs : ' + CAST(@CCTId1 AS VARCHAR) + ', ' + CAST(@CCTId2 AS VARCHAR) + ', ' + CAST(@CCTId3 AS VARCHAR);
PRINT 'Catégories : ' + CAST(@CategorieId1 AS VARCHAR) + ', ' + CAST(@CategorieId2 AS VARCHAR);
PRINT 'Statuts : ' + CAST(@StatutId1 AS VARCHAR) + ', ' + CAST(@StatutId2 AS VARCHAR);

-- Vérifier que les IDs sont valides
IF @CCTId1 IS NULL OR @CategorieId1 IS NULL OR @StatutId1 IS NULL
BEGIN
    PRINT 'ERREUR : Impossible de trouver les données de référence nécessaires.';
    PRINT 'Veuillez d''abord créer des CCTs, catégories et statuts.';
    RETURN;
END

-- Insérer 6 agents de test avec les vrais IDs
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