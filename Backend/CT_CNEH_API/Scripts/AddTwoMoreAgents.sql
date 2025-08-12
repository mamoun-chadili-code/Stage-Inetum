-- Script SQL Server pour ajouter 2 agents supplémentaires pour tester la pagination
-- Utilise les mêmes IDs de référence que les scripts existants

USE CT_CNEH_DB;
GO

-- Vérifier si la table Agents existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    PRINT 'La table Agents n''existe pas. Veuillez d''abord créer la table.';
    RETURN;
END

-- Utiliser les mêmes IDs de référence que les scripts existants
DECLARE @CCTId1 INT = 1;
DECLARE @CCTId2 INT = 2;
DECLARE @CCTId3 INT = 3;
DECLARE @CategorieId1 INT = 1;
DECLARE @CategorieId2 INT = 2;
DECLARE @StatutId1 INT = 1;
DECLARE @StatutId2 INT = 2;

PRINT 'Ajout de 2 agents supplémentaires pour tester la pagination...';
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

-- Vérifier que les catégories existent
IF NOT EXISTS (SELECT * FROM CategorieCCTs WHERE Id IN (1, 2))
BEGIN
    PRINT 'ERREUR : Les catégories avec les IDs 1, 2 n''existent pas.';
    PRINT 'Veuillez vérifier les IDs des catégories existantes.';
    RETURN;
END

-- Vérifier que les statuts existent
IF NOT EXISTS (SELECT * FROM StatutAdministratifs WHERE Id IN (1, 2))
BEGIN
    PRINT 'ERREUR : Les statuts avec les IDs 1, 2 n''existent pas.';
    PRINT 'Veuillez vérifier les IDs des statuts existants.';
    RETURN;
END

-- Insérer 2 agents supplémentaires pour tester la pagination
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, 
    DateCAP, DateExpirationCAP, CategorieCAPId, StatutAdministratifId, 
    AnneeAutorisation, DateAffectationCCT, NumDecisionRenouv, 
    DateDecisionRenouv, Adresse
) VALUES 
-- Agent 7 : CHAIBI AHMED (pour tester la pagination - page 2)
('CHAIBI', 'AHMED', 'GG33333', '0667890123', 'ahmed.chaibi@example.com', '777888999', @CCTId1, '567/00',
 '2000-09-20', '2025-09-20', @CategorieId1, @StatutId1,
 2023, '2024-07-15', '111/2024', '2024-03-20', '111 Rue Al Massira, Azrou'),

-- Agent 8 : DAOUDI KHADIJA (pour tester la pagination - page 2)
('DAOUDI', 'KHADIJA', 'HH44444', '0678901234', 'khadija.daoudi@example.com', '000111222', @CCTId2, '890/01',
 '2001-12-05', '2026-12-05', @CategorieId2, @StatutId2,
 2024, '2024-08-10', '222/2024', '2024-04-15', '222 Avenue Hassan II, Tétouan');

PRINT '2 agents supplémentaires ont été ajoutés avec succès !';
PRINT '';
PRINT '=== AGENTS AJOUTÉS POUR PAGINATION ===';
PRINT 'Agent 7 (CHAIBI AHMED) - ID: GG33333 - CCT: 1 - Statut: 1';
PRINT 'Agent 8 (DAOUDI KHADIJA) - ID: HH44444 - CCT: 2 - Statut: 2';
PRINT '';
PRINT '=== TEST DE PAGINATION ===';
PRINT '1. Allez dans le module Agent';
PRINT '2. Vérifiez que vous avez maintenant 8 agents au total';
PRINT '3. Testez la pagination en changeant de page (5, 10, 20 éléments par page)';
PRINT '4. Testez les filtres avec les nouveaux agents';
PRINT '5. Testez la recherche avec les noms : CHAIBI, DAOUDI';
PRINT '';
PRINT '=== DONNÉES DE TEST ===';
PRINT 'Total attendu : 8 agents (6 existants + 2 nouveaux)';
PRINT 'Pagination : 5 éléments/page = 2 pages, 10 éléments/page = 1 page';
PRINT 'Filtres : Testez par CCT, Statut, Catégorie';
PRINT 'Recherche : Testez par nom, CIN, Numéro CAP'; 