-- =====================================================
-- SCRIPT : 9 EXEMPLES COMPLETS DE LIGNES DE TRANSPORT
-- =====================================================
-- Ce script ajoute 9 lignes réalistes avec toutes les colonnes
-- Les colonnes problématiques CategorieCCTId et StatutLigneId 
-- reçoivent des valeurs par défaut fixes (1)

USE CT_CNEH_DB;
GO

-- Nettoyage des données existantes (optionnel)
-- DELETE FROM Lignes WHERE Id > 5;
-- GO

-- Ajout de 9 nouvelles lignes complètes
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
    CategorieCCTId,    -- Valeur fixe = 1
    StatutLigneId      -- Valeur fixe = 1
) VALUES 
-- Ligne 1 : Ligne principale Casablanca
(101, 17, 10, 21, '2024-01-15 08:00:00', NULL, NULL, '2024', GETDATE(), NULL, 1, 1),

-- Ligne 2 : Ligne secondaire Rabat
(102, 18, 11, 21, '2024-02-01 09:30:00', NULL, NULL, '2024', GETDATE(), NULL, 1, 1),

-- Ligne 3 : Ligne express Marrakech
(103, 17, 13, 23, '2024-02-15 07:00:00', 1, '2024-02-20 14:00:00', '2024', GETDATE(), GETDATE(), 1, 1),

-- Ligne 4 : Ligne interurbaine Fès
(104, 19, 12, 21, '2024-03-01 10:00:00', NULL, NULL, '2024', GETDATE(), NULL, 1, 1),

-- Ligne 5 : Ligne périurbaine Tanger
(105, 18, 9, 21, '2024-03-15 08:30:00', NULL, NULL, '2024', GETDATE(), NULL, 1, 1),

-- Ligne 6 : Ligne métropolitaine Casablanca
(106, 20, 10, 22, '2024-04-01 06:00:00', 2, '2024-04-10 16:00:00', '2024', GETDATE(), GETDATE(), 1, 1),

-- Ligne 7 : Ligne régionale Rabat
(107, 18, 11, 21, '2024-04-15 09:00:00', NULL, NULL, '2024', GETDATE(), NULL, 1, 1),

-- Ligne 8 : Ligne nationale Marrakech
(108, 19, 13, 23, '2024-05-01 07:30:00', NULL, NULL, '2024', GETDATE(), NULL, 1, 1),

-- Ligne 9 : Ligne internationale Fès
(109, 20, 12, 21, '2024-05-15 08:00:00', NULL, NULL, '2024', GETDATE(), NULL, 1, 1);

GO

-- Vérification des données insérées
SELECT 
    Id,
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
FROM Lignes 
WHERE NumeroLigne >= 101 
ORDER BY NumeroLigne;

GO

PRINT '9 exemples de lignes ajoutés avec succès !';
PRINT 'Colonnes problématiques CategorieCCTId et StatutLigneId = 1 (valeurs fixes)';
GO
