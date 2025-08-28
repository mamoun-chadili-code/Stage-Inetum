USE CT_CNEH_DB;
GO

PRINT '=== INSERTION DE 30 NOUVELLES LIGNES ===';
GO

-- Vérification des données existantes
PRINT 'Vérification des données existantes...';
GO

-- Vérifier les CCTs disponibles
DECLARE @CCTCount INT = (SELECT COUNT(*) FROM CCTs);
PRINT 'Nombre de CCTs disponibles: ' + CAST(@CCTCount AS VARCHAR(10));

-- Vérifier les catégories de lignes disponibles
DECLARE @CategorieLigneCount INT = (SELECT COUNT(*) FROM CategorieLignes);
PRINT 'Nombre de catégories de lignes disponibles: ' + CAST(@CategorieLigneCount AS VARCHAR(10));

-- Vérifier les statuts disponibles
DECLARE @StatutCount INT = (SELECT COUNT(*) FROM Statuts);
PRINT 'Nombre de statuts disponibles: ' + CAST(@StatutCount AS VARCHAR(10));

-- Vérifier les décisions disponibles
DECLARE @DecisionCount INT = (SELECT COUNT(*) FROM TypeDecisions);
PRINT 'Nombre de types de décisions disponibles: ' + CAST(@DecisionCount AS VARCHAR(10));

GO

-- Insertion des 30 nouvelles lignes
INSERT INTO Lignes (
    NumeroLigne,
    CategorieId,
    CCTId,
    StatutId,
    DateStatut,
    DecisionId,
    DateDecision,
    AnneeDemarrage,
    DateCreation,
    DateModification,
    CategorieCCTId,
    StatutLigneId
)
VALUES
-- Lignes pour CCT Casablanca Oulfa
(110, 17, 28, 21, '2024-01-15', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(111, 18, 28, 21, '2024-02-20', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(112, 19, 28, 22, '2024-03-10', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),

-- Lignes pour CCT Casablanca Ain Sebaâ
(113, 17, 29, 21, '2024-01-20', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(114, 20, 29, 21, '2024-02-25', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(115, 18, 29, 23, '2024-03-15', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),

-- Lignes pour CCT Rabat Agdal
(116, 17, 30, 21, '2024-01-25', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(117, 19, 30, 21, '2024-02-28', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(118, 20, 30, 22, '2024-03-20', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),

-- Lignes pour CCT Rabat Yacoub El Mansour
(119, 17, 31, 21, '2024-02-01', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(120, 18, 31, 21, '2024-03-05', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(121, 19, 31, 23, '2024-04-01', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),

-- Lignes pour CCT Marrakech Gueliz
(122, 17, 32, 21, '2024-02-05', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(123, 20, 32, 21, '2024-03-10', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(124, 18, 32, 22, '2024-04-05', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),

-- Lignes pour CCT Marrakech Sidi Ghanem
(125, 17, 33, 21, '2024-02-10', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(126, 19, 33, 21, '2024-03-15', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(127, 20, 33, 23, '2024-04-10', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),

-- Lignes pour CCT Fès Saïs
(128, 17, 34, 21, '2024-02-15', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(129, 18, 34, 21, '2024-03-20', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(130, 19, 34, 22, '2024-04-15', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),

-- Lignes pour CCT Fès Narjiss
(131, 17, 35, 21, '2024-02-20', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(132, 20, 35, 21, '2024-03-25', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(133, 18, 35, 23, '2024-04-20', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),

-- Lignes pour CCT Tanger Malabata
(134, 17, 36, 21, '2024-02-25', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(135, 19, 36, 21, '2024-03-30', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(136, 20, 36, 22, '2024-04-25', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),

-- Lignes pour CCT Tanger Zone Franche
(137, 17, 37, 21, '2024-03-01', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(138, 18, 37, 21, '2024-04-05', NULL, NULL, 2024, GETDATE(), NULL, 1, 1),
(139, 19, 37, 23, '2024-05-01', NULL, NULL, 2024, GETDATE(), NULL, 1, 1);

GO

-- Vérification de l'insertion
PRINT 'Vérification de l''insertion...';
GO

DECLARE @LignesInserees INT = (SELECT COUNT(*) FROM Lignes WHERE NumeroLigne >= 110);
PRINT 'Nombre de lignes insérées: ' + CAST(@LignesInserees AS VARCHAR(10));

-- Affichage des nouvelles lignes
SELECT TOP 10
    l.Id,
    l.NumeroLigne,
    cl.Libelle AS CategorieLigne,
    c.Nom AS CCTNom,
    s.Nom AS StatutNom,
    l.DateStatut,
    l.AnneeDemarrage,
    l.DateCreation
FROM Lignes l
INNER JOIN CategorieLignes cl ON l.CategorieId = cl.Id
INNER JOIN CCTs c ON l.CCTId = c.Id
INNER JOIN Statuts s ON l.StatutId = s.Id
WHERE l.NumeroLigne >= 110
ORDER BY l.NumeroLigne;

GO

PRINT '=== INSERTION TERMINÉE AVEC SUCCÈS ===';
GO
