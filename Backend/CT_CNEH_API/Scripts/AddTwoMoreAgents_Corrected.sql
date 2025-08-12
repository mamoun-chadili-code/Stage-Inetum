-- Script SQL Server corrigé pour ajouter 2 agents supplémentaires pour tester la pagination
-- Ce script utilise les IDs réels de votre base de données

USE CT_CNEH_DB;
GO

-- Vérifier si la table Agents existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Agents')
BEGIN
    PRINT 'La table Agents n''existe pas. Veuillez d''abord créer la table.';
    RETURN;
END

-- Récupérer les IDs réels des CCTs existants
DECLARE @CCTId1 INT;
DECLARE @CCTId2 INT;
DECLARE @CCTId3 INT;

-- Récupérer les 3 premiers CCTs disponibles
SELECT TOP 3 @CCTId1 = Id FROM CCTs ORDER BY Id;
SELECT TOP 1 @CCTId2 = Id FROM CCTs WHERE Id > @CCTId1 ORDER BY Id;
SELECT TOP 1 @CCTId3 = Id FROM CCTs WHERE Id > @CCTId2 ORDER BY Id;

-- Si on n'a pas 3 CCTs, utiliser le premier pour tous
IF @CCTId2 IS NULL SET @CCTId2 = @CCTId1;
IF @CCTId3 IS NULL SET @CCTId3 = @CCTId1;

-- Récupérer les IDs des catégories et statuts
DECLARE @CategorieId1 INT;
DECLARE @CategorieId2 INT;
DECLARE @StatutId1 INT;
DECLARE @StatutId2 INT;

SELECT TOP 1 @CategorieId1 = Id FROM CategorieCCTs ORDER BY Id;
SELECT TOP 1 @CategorieId2 = Id FROM CategorieCCTs WHERE Id > @CategorieId1 ORDER BY Id;
IF @CategorieId2 IS NULL SET @CategorieId2 = @CategorieId1;

SELECT TOP 1 @StatutId1 = Id FROM StatutAdministratifs ORDER BY Id;
SELECT TOP 1 @StatutId2 = Id FROM StatutAdministratifs WHERE Id > @StatutId1 ORDER BY Id;
IF @StatutId2 IS NULL SET @StatutId2 = @StatutId1;

PRINT 'Ajout de 2 agents supplémentaires pour tester la pagination...';
PRINT 'Utilisation des IDs suivants (récupérés automatiquement) :';
PRINT 'CCTs : ' + CAST(@CCTId1 AS VARCHAR) + ', ' + CAST(@CCTId2 AS VARCHAR) + ', ' + CAST(@CCTId3 AS VARCHAR);
PRINT 'Catégories : ' + CAST(@CategorieId1 AS VARCHAR) + ', ' + CAST(@CategorieId2 AS VARCHAR);
PRINT 'Statuts : ' + CAST(@StatutId1 AS VARCHAR) + ', ' + CAST(@StatutId2 AS VARCHAR);
PRINT '';

-- Vérifier que les CCTs existent
IF NOT EXISTS (SELECT * FROM CCTs WHERE Id IN (@CCTId1, @CCTId2, @CCTId3))
BEGIN
    PRINT 'ERREUR : Impossible de récupérer les CCTs existants.';
    PRINT 'Veuillez vérifier que des CCTs existent dans la base de données.';
    RETURN;
END

-- Vérifier que les catégories existent
IF NOT EXISTS (SELECT * FROM CategorieCCTs WHERE Id IN (@CategorieId1, @CategorieId2))
BEGIN
    PRINT 'ERREUR : Impossible de récupérer les catégories existantes.';
    PRINT 'Veuillez vérifier que des catégories existent dans la base de données.';
    RETURN;
END

-- Vérifier que les statuts existent
IF NOT EXISTS (SELECT * FROM StatutAdministratifs WHERE Id IN (@StatutId1, @StatutId2))
BEGIN
    PRINT 'ERREUR : Impossible de récupérer les statuts existants.';
    PRINT 'Veuillez vérifier que des statuts existent dans la base de données.';
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
PRINT 'Agent 7 (CHAIBI AHMED) - ID: GG33333 - CCT: ' + CAST(@CCTId1 AS VARCHAR) + ' - Statut: ' + CAST(@StatutId1 AS VARCHAR);
PRINT 'Agent 8 (DAOUDI KHADIJA) - ID: HH44444 - CCT: ' + CAST(@CCTId2 AS VARCHAR) + ' - Statut: ' + CAST(@StatutId2 AS VARCHAR);
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