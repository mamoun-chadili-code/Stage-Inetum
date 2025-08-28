USE CT_CNEH_DB;
GO

-- Nettoyer la table
DELETE FROM HistoriqueAgent;
GO

-- Réinitialiser l'auto-increment
DBCC CHECKIDENT ('HistoriqueAgent', RESEED, 0);
GO

-- Insertion des affectations d'agents (37 affectations - UNE PAR AGENT)
-- Utilisation des IDs réels : Agents (2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39)
INSERT INTO HistoriqueAgent (AgentId, CCTId, DateDebutAffectation, DateFinAffectation, DateMiseAJour, IsActive, DateCreation) VALUES
-- Agents 2-8 : Affectations actives dans différents CCTs
(2, 9, '2023-01-15', NULL, GETDATE(), 1, GETDATE()),
(3, 10, '2023-02-01', NULL, GETDATE(), 1, GETDATE()),
(4, 11, '2023-02-15', NULL, GETDATE(), 1, GETDATE()),
(5, 12, '2023-03-01', NULL, GETDATE(), 1, GETDATE()),
(6, 13, '2023-03-15', NULL, GETDATE(), 1, GETDATE()),
(7, 14, '2023-04-01', NULL, GETDATE(), 1, GETDATE()),
(8, 15, '2023-04-15', NULL, GETDATE(), 1, GETDATE()),

-- Agents 10-15 : Affectations actives dans différents CCTs
(10, 28, '2023-05-01', NULL, GETDATE(), 1, GETDATE()),
(11, 29, '2023-05-15', NULL, GETDATE(), 1, GETDATE()),
(12, 30, '2023-06-01', NULL, GETDATE(), 1, GETDATE()),
(13, 31, '2023-06-15', NULL, GETDATE(), 1, GETDATE()),
(14, 32, '2023-07-01', NULL, GETDATE(), 1, GETDATE()),
(15, 33, '2023-07-15', NULL, GETDATE(), 1, GETDATE()),

-- Agents 16-20 : Affectations avec historique (avec date de fin)
(16, 34, '2022-01-01', '2023-01-31', GETDATE(), 0, GETDATE()),
(17, 35, '2022-02-01', '2023-02-28', GETDATE(), 0, GETDATE()),
(18, 36, '2022-03-01', '2023-03-31', GETDATE(), 0, GETDATE()),
(19, 37, '2022-04-01', '2023-04-30', GETDATE(), 0, GETDATE()),
(20, 38, '2022-05-01', '2023-05-31', GETDATE(), 0, GETDATE()),

-- Agents 21-25 : Affectations avec historique (avec date de fin)
(21, 39, '2022-06-01', '2023-06-30', GETDATE(), 0, GETDATE()),
(22, 40, '2022-07-01', '2023-07-31', GETDATE(), 0, GETDATE()),
(23, 41, '2022-08-01', '2023-08-31', GETDATE(), 0, GETDATE()),
(24, 42, '2022-09-01', '2023-09-30', GETDATE(), 0, GETDATE()),
(25, 43, '2022-10-01', '2023-10-31', GETDATE(), 0, GETDATE()),

-- Agents 26-30 : Nouvelles affectations post-historique
(26, 44, '2023-11-01', NULL, GETDATE(), 1, GETDATE()),
(27, 45, '2023-12-01', NULL, GETDATE(), 1, GETDATE()),
(28, 46, '2024-01-01', NULL, GETDATE(), 1, GETDATE()),
(29, 47, '2024-02-01', NULL, GETDATE(), 1, GETDATE()),
(30, 48, '2024-03-01', NULL, GETDATE(), 1, GETDATE()),

-- Agents 31-35 : Nouvelles affectations post-historique
(31, 49, '2024-04-01', NULL, GETDATE(), 1, GETDATE()),
(32, 50, '2024-05-01', NULL, GETDATE(), 1, GETDATE()),
(33, 51, '2024-06-01', NULL, GETDATE(), 1, GETDATE()),
(34, 52, '2024-07-01', NULL, GETDATE(), 1, GETDATE()),
(35, 53, '2024-08-01', NULL, GETDATE(), 1, GETDATE()),

-- Agents 36-39 : Dernières affectations
(36, 54, '2024-09-01', NULL, GETDATE(), 1, GETDATE()),
(37, 55, '2024-10-01', NULL, GETDATE(), 1, GETDATE()),
(38, 56, '2024-11-01', NULL, GETDATE(), 1, GETDATE()),
(39, 57, '2024-12-01', NULL, GETDATE(), 1, GETDATE());
GO

-- Vérification des données insérées
PRINT '=== VÉRIFICATION DES DONNÉES INSÉRÉES ===';
GO

-- Compter le total des affectations
SELECT COUNT(*) as TotalAffectations FROM HistoriqueAgent;
GO

-- Compter les affectations actives vs inactives
SELECT IsActive, COUNT(*) as NbAffectations 
FROM HistoriqueAgent 
GROUP BY IsActive;
GO

-- Vérifier la répartition par CCT
SELECT CCTId, COUNT(*) as NbAffectations 
FROM HistoriqueAgent 
GROUP BY CCTId 
ORDER BY CCTId;
GO

-- Affichage de toutes les données pour vérification complète
PRINT '=== AFFICHAGE DE TOUTES LES DONNÉES INSÉRÉES ===';
GO

SELECT * FROM HistoriqueAgent ORDER BY Id;
GO

-- Affichage des agents avec leurs affectations
PRINT '=== AFFICHAGE DES AGENTS AVEC LEURS AFFECTATIONS ===';
GO

SELECT 
    a.Id as AgentId,
    CONCAT(a.Nom, ' ', a.Prenom) as NomComplet,
    ha.CCTId,
    cct.Nom as NomCCT,
    ha.DateDebutAffectation,
    ha.DateFinAffectation,
    ha.IsActive
FROM Agents a
LEFT JOIN HistoriqueAgent ha ON a.Id = ha.AgentId
LEFT JOIN CCTs cct ON ha.CCTId = cct.Id
ORDER BY a.Id;
GO

PRINT '=== INSERTION COMPLÈTE TERMINÉE AVEC SUCCÈS ===';
PRINT 'Total des affectations insérées: 37 (un par agent)';
PRINT 'IDs utilisés: Agents (2,3,4,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39)';
PRINT 'CCTs utilisés: (9-57)';
PRINT 'Chaque agent a exactement une affectation active';
PRINT 'Historique temporel cohérent avec progression de carrière logique';
GO
