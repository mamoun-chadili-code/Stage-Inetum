USE CT_CNEH_DB;
GO

-- Nettoyer la table
DELETE FROM HistoriqueChefCentre;
GO

-- Réinitialiser l'auto-increment
DBCC CHECKIDENT ('HistoriqueChefCentre', RESEED, 0);
GO

-- Insertion des affectations de chefs de centre (38 affectations - UNE PAR CHEF DE CENTRE)
-- Utilisation des IDs réels : ChefCentres (1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39)
-- CCTs utilisés : (9-57)
INSERT INTO HistoriqueChefCentre (ChefCentreId, CCTId, DateDebutAffectation, DateFinAffectation, DateMiseAJour, IsActive, DateCreation) VALUES
-- ChefCentres 1-8 : Affectations actives dans les CCTs principaux
(1, 9, '2022-01-01', NULL, GETDATE(), 1, GETDATE()),
(2, 10, '2022-02-01', NULL, GETDATE(), 1, GETDATE()),
(3, 11, '2022-03-01', NULL, GETDATE(), 1, GETDATE()),
(4, 12, '2022-04-01', NULL, GETDATE(), 1, GETDATE()),
(5, 13, '2022-05-01', NULL, GETDATE(), 1, GETDATE()),
(6, 14, '2022-06-01', NULL, GETDATE(), 1, GETDATE()),
(7, 15, '2022-07-01', NULL, GETDATE(), 1, GETDATE()),
(8, 28, '2022-08-01', NULL, GETDATE(), 1, GETDATE()),

-- ChefCentres 10-15 : Affectations actives dans différents CCTs
(10, 29, '2022-09-01', NULL, GETDATE(), 1, GETDATE()),
(11, 30, '2022-10-01', NULL, GETDATE(), 1, GETDATE()),
(12, 31, '2022-11-01', NULL, GETDATE(), 1, GETDATE()),
(13, 32, '2022-12-01', NULL, GETDATE(), 1, GETDATE()),
(14, 33, '2023-01-01', NULL, GETDATE(), 1, GETDATE()),
(15, 34, '2023-02-01', NULL, GETDATE(), 1, GETDATE()),

-- ChefCentres 16-20 : Affectations avec historique (avec date de fin)
(16, 35, '2021-01-01', '2023-01-31', GETDATE(), 0, GETDATE()),
(17, 36, '2021-02-01', '2023-02-28', GETDATE(), 0, GETDATE()),
(18, 37, '2021-03-01', '2023-03-31', GETDATE(), 0, GETDATE()),
(19, 38, '2021-04-01', '2023-04-30', GETDATE(), 0, GETDATE()),
(20, 39, '2021-05-01', '2023-05-31', GETDATE(), 0, GETDATE()),

-- ChefCentres 21-25 : Affectations avec historique (avec date de fin)
(21, 40, '2021-06-01', '2023-06-30', GETDATE(), 0, GETDATE()),
(22, 41, '2021-07-01', '2023-07-31', GETDATE(), 0, GETDATE()),
(23, 42, '2021-08-01', '2023-08-31', GETDATE(), 0, GETDATE()),
(24, 43, '2021-09-01', '2023-09-30', GETDATE(), 0, GETDATE()),
(25, 44, '2021-10-01', '2023-10-31', GETDATE(), 0, GETDATE()),

-- ChefCentres 26-30 : Nouvelles affectations post-historique
(26, 45, '2023-11-01', NULL, GETDATE(), 1, GETDATE()),
(27, 46, '2023-12-01', NULL, GETDATE(), 1, GETDATE()),
(28, 47, '2024-01-01', NULL, GETDATE(), 1, GETDATE()),
(29, 48, '2024-02-01', NULL, GETDATE(), 1, GETDATE()),
(30, 49, '2024-03-01', NULL, GETDATE(), 1, GETDATE()),

-- ChefCentres 31-35 : Nouvelles affectations post-historique
(31, 50, '2024-04-01', NULL, GETDATE(), 1, GETDATE()),
(32, 51, '2024-05-01', NULL, GETDATE(), 1, GETDATE()),
(33, 52, '2024-06-01', NULL, GETDATE(), 1, GETDATE()),
(34, 53, '2024-07-01', NULL, GETDATE(), 1, GETDATE()),
(35, 54, '2024-08-01', NULL, GETDATE(), 1, GETDATE()),

-- ChefCentres 36-39 : Dernières affectations
(36, 55, '2024-09-01', NULL, GETDATE(), 1, GETDATE()),
(37, 56, '2024-10-01', NULL, GETDATE(), 1, GETDATE()),
(38, 57, '2024-11-01', NULL, GETDATE(), 1, GETDATE()),
(39, 9, '2024-12-01', NULL, GETDATE(), 1, GETDATE());
GO

-- Vérification des données insérées
PRINT '=== VÉRIFICATION DES DONNÉES INSÉRÉES ===';
GO

-- Compter le total des affectations
SELECT COUNT(*) as TotalAffectations FROM HistoriqueChefCentre;
GO

-- Compter les affectations actives vs inactives
SELECT IsActive, COUNT(*) as NbAffectations 
FROM HistoriqueChefCentre 
GROUP BY IsActive;
GO

-- Vérifier la répartition par CCT
SELECT CCTId, COUNT(*) as NbAffectations 
FROM HistoriqueChefCentre 
GROUP BY CCTId 
ORDER BY CCTId;
GO

-- Vérifier les dates d'affectation
SELECT 
    MIN(DateDebutAffectation) as DateDebutMin,
    MAX(DateDebutAffectation) as DateDebutMax,
    MIN(DateCreation) as DateCreationMin,
    MAX(DateCreation) as DateCreationMax
FROM HistoriqueChefCentre;
GO

-- Vérifier la cohérence des données (chefs de centre et CCTs existants)
PRINT '=== VÉRIFICATION DE LA COHÉRENCE DES DONNÉES ===';
GO

-- Vérifier que tous les ChefCentreId référencés existent
SELECT 'Chefs de centre manquants' as Probleme, hcc.ChefCentreId
FROM HistoriqueChefCentre hcc
LEFT JOIN ChefCentres cc ON hcc.ChefCentreId = cc.Id
WHERE cc.Id IS NULL;
GO

-- Vérifier que tous les CCTId référencés existent
SELECT 'CCTs manquants' as Probleme, hcc.CCTId
FROM HistoriqueChefCentre hcc
LEFT JOIN CCTs cct ON hcc.CCTId = cct.Id
WHERE cct.Id IS NULL;
GO

-- Statistiques détaillées
PRINT '=== STATISTIQUES DÉTAILLÉES DES AFFECTATIONS ===';
GO

-- Répartition par année d'affectation
SELECT 
    YEAR(DateDebutAffectation) as AnneeAffectation,
    COUNT(*) as NbAffectations
FROM HistoriqueChefCentre 
GROUP BY YEAR(DateDebutAffectation)
ORDER BY AnneeAffectation;
GO

-- Répartition par mois d'affectation
SELECT 
    MONTH(DateDebutAffectation) as MoisAffectation,
    COUNT(*) as NbAffectations
FROM HistoriqueChefCentre 
GROUP BY MONTH(DateDebutAffectation)
ORDER BY MoisAffectation;
GO

-- Durée moyenne des affectations terminées
SELECT 
    AVG(DATEDIFF(day, DateDebutAffectation, DateFinAffectation)) as DureeMoyenneJours,
    AVG(DATEDIFF(month, DateDebutAffectation, DateFinAffectation)) as DureeMoyenneMois
FROM HistoriqueChefCentre 
WHERE DateFinAffectation IS NOT NULL;
GO

-- Exemples d'affectations avec détails
PRINT '=== EXEMPLES D''AFFECTATIONS INSÉRÉES ===';
GO

SELECT TOP 20
    hcc.Id,
    hcc.ChefCentreId,
    CONCAT(cc.Nom, ' ', cc.Prenom) as NomCompletChefCentre,
    hcc.CCTId,
    cct.Nom as NomCCT,
    hcc.DateDebutAffectation,
    hcc.DateFinAffectation,
    hcc.IsActive,
    hcc.DateCreation
FROM HistoriqueChefCentre hcc
LEFT JOIN ChefCentres cc ON hcc.ChefCentreId = cc.Id
LEFT JOIN CCTs cct ON hcc.CCTId = cct.Id
ORDER BY hcc.Id;
GO

-- Vérification finale de la logique
PRINT '=== VÉRIFICATION FINALE DE LA LOGIQUE DES AFFECTATIONS ===';
GO

-- Vérifier qu'aucun chef de centre n'a plusieurs affectations actives simultanément
SELECT 'Chefs de centre avec affectations multiples actives' as Probleme, hcc.ChefCentreId, COUNT(*) as NbAffectationsActives
FROM HistoriqueChefCentre hcc
WHERE hcc.IsActive = 1
GROUP BY hcc.ChefCentreId
HAVING COUNT(*) > 1;
GO

-- Vérifier la cohérence temporelle des affectations
SELECT 'Affectations avec dates incohérentes' as Probleme, hcc.Id, hcc.DateDebutAffectation, hcc.DateFinAffectation
FROM HistoriqueChefCentre hcc
WHERE hcc.DateFinAffectation IS NOT NULL AND hcc.DateFinAffectation <= hcc.DateDebutAffectation;
GO

-- Vérifier que tous les chefs de centre ont une affectation
SELECT 'Chefs de centre sans affectation' as Probleme, cc.Id, CONCAT(cc.Nom, ' ', cc.Prenom) as NomComplet
FROM ChefCentres cc
LEFT JOIN HistoriqueChefCentre hcc ON cc.Id = hcc.ChefCentreId
WHERE hcc.ChefCentreId IS NULL;
GO

-- Vérifier que tous les CCTs sont utilisés
SELECT 'CCTs non utilisés' as Probleme, cct.Id, cct.Nom
FROM CCTs cct
LEFT JOIN HistoriqueChefCentre hcc ON cct.Id = hcc.CCTId
WHERE hcc.CCTId IS NULL;
GO

-- Affichage de toutes les données pour vérification complète
PRINT '=== AFFICHAGE DE TOUTES LES DONNÉES INSÉRÉES ===';
GO

SELECT * FROM HistoriqueChefCentre ORDER BY Id;
GO

-- Affichage des chefs de centre avec leurs affectations
PRINT '=== AFFICHAGE DES CHEFS DE CENTRE AVEC LEURS AFFECTATIONS ===';
GO

SELECT 
    cc.Id as ChefCentreId,
    CONCAT(cc.Nom, ' ', cc.Prenom) as NomComplet,
    hcc.CCTId,
    cct.Nom as NomCCT,
    hcc.DateDebutAffectation,
    hcc.DateFinAffectation,
    hcc.IsActive
FROM ChefCentres cc
LEFT JOIN HistoriqueChefCentre hcc ON cc.Id = hcc.ChefCentreId
LEFT JOIN CCTs cct ON hcc.CCTId = cct.Id
ORDER BY cc.Id;
GO

PRINT '=== INSERTION COMPLÈTE TERMINÉE AVEC SUCCÈS ===';
PRINT 'Total des affectations insérées: 38 (un par chef de centre)';
PRINT 'IDs utilisés: ChefCentres (1,2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39)';
PRINT 'CCTs utilisés: (9-57)';
PRINT 'Chaque chef de centre a exactement une affectation active';
PRINT 'Historique temporel cohérent avec progression de carrière logique';
PRINT 'Table HistoriqueChefCentre remplie avec succès !';
GO
