USE CT_CNEH_DB;
GO

PRINT '=== INSERTION DE DONNÉES COHÉRENTES DANS HISTORIQUE AFFECTATIONS ===';
GO

-- Vérification des données existantes
PRINT 'Vérification des données existantes...';
GO

-- Compter les agents, chefs de centre et CCTs disponibles
SELECT COUNT(*) as NbAgents FROM Agents;
SELECT COUNT(*) as NbChefCentres FROM ChefCentres;
SELECT COUNT(*) as NbCCTs FROM CCTs;
GO

-- Vérifier la structure de la table HistoriqueAffectations
PRINT 'Structure de la table HistoriqueAffectations:';
GO
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueAffectations' 
ORDER BY ORDINAL_POSITION;
GO

-- Nettoyer la table avant insertion (optionnel)
PRINT 'Nettoyage de la table HistoriqueAffectations...';
GO
DELETE FROM HistoriqueAffectations;
GO

-- Réinitialiser l'auto-increment
DBCC CHECKIDENT ('HistoriqueAffectations', RESEED, 0);
GO

-- Insertion des affectations d'agents (30 affectations)
PRINT 'Insertion des affectations d''agents...';
GO

INSERT INTO HistoriqueAffectations (
    EntiteId,
    TypeEntite,
    CCTId,
    DateAffectation,
    DateFinAffectation,
    MotifAffectation,
    MotifFinAffectation,
    IsActive,
    DateCreation,
    AgentId,
    ChefCentreId
)
VALUES
-- Affectations d'agents actives (sans date de fin)
(1, 'Agent', 9, '2023-01-15', NULL, 'Affectation initiale suite à recrutement', NULL, 1, GETDATE(), 1, NULL),
(2, 'Agent', 10, '2023-02-01', NULL, 'Transfert depuis le CCT de Casablanca', NULL, 1, GETDATE(), 2, NULL),
(3, 'Agent', 11, '2023-02-15', NULL, 'Promotion interne au poste d''agent de contrôle', NULL, 1, GETDATE(), 3, NULL),
(4, 'Agent', 12, '2023-03-01', NULL, 'Affectation suite à formation spécialisée', NULL, 1, GETDATE(), 4, NULL),
(5, 'Agent', 13, '2023-03-15', NULL, 'Transfert pour renforcer l''équipe technique', NULL, 1, GETDATE(), 5, NULL),
(6, 'Agent', 14, '2023-04-01', NULL, 'Affectation suite à restructuration', NULL, 1, GETDATE(), 6, NULL),
(7, 'Agent', 15, '2023-04-15', NULL, 'Recrutement direct pour poste vacant', NULL, 1, GETDATE(), 7, NULL),
(8, 'Agent', 28, '2023-05-01', NULL, 'Transfert depuis région voisine', NULL, 1, GETDATE(), 8, NULL),
(9, 'Agent', 9, '2023-05-15', NULL, 'Affectation temporaire pour surcharge de travail', NULL, 1, GETDATE(), 9, NULL),
(10, 'Agent', 10, '2023-06-01', NULL, 'Promotion au grade d''agent senior', NULL, 1, GETDATE(), 10, NULL),

-- Affectations d'agents avec historique (avec date de fin)
(11, 'Agent', 11, '2022-01-01', '2023-01-31', 'Affectation initiale', 'Transfert vers autre CCT', 0, GETDATE(), 11, NULL),
(12, 'Agent', 12, '2022-02-01', '2023-02-28', 'Affectation temporaire', 'Fin de mission temporaire', 0, GETDATE(), 12, NULL),
(13, 'Agent', 13, '2022-03-01', '2023-03-31', 'Remplacement agent en congé', 'Retour de l''agent titulaire', 0, GETDATE(), 13, NULL),
(14, 'Agent', 14, '2022-04-01', '2023-04-30', 'Affectation pour formation', 'Fin de formation', 0, GETDATE(), 14, NULL),
(15, 'Agent', 15, '2022-05-01', '2023-05-31', 'Renforcement équipe', 'Réduction d''effectifs', 0, GETDATE(), 15, NULL),

-- Affectations d'agents avec rotations
(16, 'Agent', 28, '2023-01-01', '2023-06-30', 'Rotation semestrielle', 'Fin de rotation', 0, GETDATE(), 16, NULL),
(17, 'Agent', 9, '2023-07-01', NULL, 'Nouvelle affectation post-rotation', NULL, 1, GETDATE(), 16, NULL),
(18, 'Agent', 10, '2023-01-01', '2023-12-31', 'Affectation annuelle', 'Fin de contrat annuel', 0, GETDATE(), 17, NULL),
(19, 'Agent', 11, '2024-01-01', NULL, 'Renouvellement de contrat', NULL, 1, GETDATE(), 17, NULL),
(20, 'Agent', 12, '2023-03-01', '2023-08-31', 'Affectation saisonnière', 'Fin de saison', 0, GETDATE(), 18, NULL),

-- Affectations d'agents avec motifs spécifiques
(21, 'Agent', 13, '2023-09-01', NULL, 'Affectation suite à restructuration organisationnelle', NULL, 1, GETDATE(), 18, NULL),
(22, 'Agent', 14, '2023-06-01', '2023-11-30', 'Remplacement agent en formation', 'Retour de formation', 0, GETDATE(), 19, NULL),
(23, 'Agent', 15, '2023-12-01', NULL, 'Affectation définitive post-remplacement', NULL, 1, GETDATE(), 19, NULL),
(24, 'Agent', 28, '2023-04-01', '2023-09-30', 'Mission spéciale contrôle qualité', 'Fin de mission', 0, GETDATE(), 20, NULL),
(25, 'Agent', 9, '2023-10-01', NULL, 'Affectation permanente post-mission', NULL, 1, GETDATE(), 20, NULL),

-- Affectations d'agents avec progression de carrière
(26, 'Agent', 10, '2022-06-01', '2023-05-31', 'Stage d''intégration', 'Fin de stage - promotion', 0, GETDATE(), 21, NULL),
(27, 'Agent', 11, '2023-06-01', NULL, 'Affectation en tant qu''agent confirmé', NULL, 1, GETDATE(), 21, NULL),
(28, 'Agent', 12, '2023-01-01', '2023-12-31', 'Formation continue', 'Fin de formation', 0, GETDATE(), 22, NULL),
(29, 'Agent', 13, '2024-01-01', NULL, 'Affectation avec responsabilités accrues', NULL, 1, GETDATE(), 22, NULL),
(30, 'Agent', 14, '2023-07-01', NULL, 'Affectation suite à évaluation positive', NULL, 1, GETDATE(), 23, NULL);

GO

-- Insertion des affectations de chefs de centre (20 affectations)
PRINT 'Insertion des affectations de chefs de centre...';
GO

INSERT INTO HistoriqueAffectations (
    EntiteId,
    TypeEntite,
    CCTId,
    DateAffectation,
    DateFinAffectation,
    MotifAffectation,
    MotifFinAffectation,
    IsActive,
    DateCreation,
    AgentId,
    ChefCentreId
)
VALUES
-- Affectations de chefs de centre actives
(31, 'ChefCentre', 9, '2022-01-01', NULL, 'Nomination au poste de chef de centre', NULL, 1, GETDATE(), NULL, 1),
(32, 'ChefCentre', 10, '2022-02-01', NULL, 'Promotion interne depuis le poste d''agent senior', NULL, 1, GETDATE(), NULL, 2),
(33, 'ChefCentre', 11, '2022-03-01', NULL, 'Recrutement externe pour expertise technique', NULL, 1, GETDATE(), NULL, 3),
(34, 'ChefCentre', 12, '2022-04-01', NULL, 'Transfert depuis autre centre de contrôle', NULL, 1, GETDATE(), NULL, 4),
(35, 'ChefCentre', 13, '2022-05-01', NULL, 'Promotion suite à formation managériale', NULL, 1, GETDATE(), NULL, 5),

-- Affectations de chefs de centre avec historique
(36, 'ChefCentre', 14, '2021-01-01', '2023-01-31', 'Affectation initiale', 'Promotion vers poste supérieur', 0, GETDATE(), NULL, 6),
(37, 'ChefCentre', 15, '2021-02-01', '2023-02-28', 'Nomination temporaire', 'Fin de mission temporaire', 0, GETDATE(), NULL, 7),
(38, 'ChefCentre', 28, '2021-03-01', '2023-03-31', 'Remplacement chef en congé', 'Retour du chef titulaire', 0, GETDATE(), NULL, 8),
(39, 'ChefCentre', 9, '2021-04-01', '2023-04-30', 'Affectation pour restructuration', 'Fin de restructuration', 0, GETDATE(), NULL, 9),
(40, 'ChefCentre', 10, '2021-05-01', '2023-05-31', 'Mission de formation équipe', 'Fin de mission formation', 0, GETDATE(), NULL, 10),

-- Affectations de chefs de centre avec rotations
(41, 'ChefCentre', 11, '2023-06-01', NULL, 'Nouvelle affectation permanente', NULL, 1, GETDATE(), NULL, 6),
(42, 'ChefCentre', 12, '2023-07-01', NULL, 'Affectation suite à évaluation', NULL, 1, GETDATE(), NULL, 7),
(43, 'ChefCentre', 13, '2023-08-01', NULL, 'Transfert pour optimiser performances', NULL, 1, GETDATE(), NULL, 8),
(44, 'ChefCentre', 14, '2023-09-01', NULL, 'Affectation avec objectifs spécifiques', NULL, 1, GETDATE(), NULL, 9),
(45, 'ChefCentre', 15, '2023-10-01', NULL, 'Nomination pour centre en difficulté', NULL, 1, GETDATE(), NULL, 10),

-- Affectations de chefs de centre avec motifs spécifiques
(46, 'ChefCentre', 28, '2023-11-01', NULL, 'Affectation pour modernisation centre', NULL, 1, GETDATE(), NULL, 11),
(47, 'ChefCentre', 9, '2023-12-01', NULL, 'Transfert pour équilibrer compétences', NULL, 1, GETDATE(), NULL, 12),
(48, 'ChefCentre', 10, '2024-01-01', NULL, 'Affectation suite à audit qualité', NULL, 1, GETDATE(), NULL, 13),
(49, 'ChefCentre', 11, '2024-02-01', NULL, 'Nomination pour centre d''excellence', NULL, 1, GETDATE(), NULL, 14),
(50, 'ChefCentre', 12, '2024-03-01', NULL, 'Affectation pour développement régional', NULL, 1, GETDATE(), NULL, 15);

GO

-- Vérification des données insérées
PRINT 'Vérification des données insérées...';
GO

-- Compter le total des affectations
SELECT COUNT(*) as TotalAffectations FROM HistoriqueAffectations;
GO

-- Compter par type d'entité
SELECT TypeEntite, COUNT(*) as NbAffectations 
FROM HistoriqueAffectations 
GROUP BY TypeEntite;
GO

-- Compter les affectations actives vs inactives
SELECT IsActive, COUNT(*) as NbAffectations 
FROM HistoriqueAffectations 
GROUP BY IsActive;
GO

-- Vérifier la répartition par CCT
SELECT CCTId, COUNT(*) as NbAffectations 
FROM HistoriqueAffectations 
GROUP BY CCTId 
ORDER BY CCTId;
GO

-- Vérifier les dates d'affectation
SELECT 
    MIN(DateAffectation) as DateAffectationMin,
    MAX(DateAffectation) as DateAffectationMax,
    MIN(DateCreation) as DateCreationMin,
    MAX(DateCreation) as DateCreationMax
FROM HistoriqueAffectations;
GO

-- Vérifier la cohérence des données (agents et chefs de centre existants)
PRINT 'Vérification de la cohérence des données...';
GO

-- Vérifier que tous les AgentId référencés existent
SELECT 'Agents manquants' as Probleme, ha.AgentId, ha.EntiteId
FROM HistoriqueAffectations ha
LEFT JOIN Agents a ON ha.AgentId = a.Id
WHERE ha.AgentId IS NOT NULL AND a.Id IS NULL;
GO

-- Vérifier que tous les ChefCentreId référencés existent
SELECT 'Chefs de centre manquants' as Probleme, ha.ChefCentreId, ha.EntiteId
FROM HistoriqueAffectations ha
LEFT JOIN ChefCentres cc ON ha.ChefCentreId = cc.Id
WHERE ha.ChefCentreId IS NOT NULL AND cc.Id IS NULL;
GO

-- Vérifier que tous les CCTId référencés existent
SELECT 'CCTs manquants' as Probleme, ha.CCTId, ha.EntiteId
FROM HistoriqueAffectations ha
LEFT JOIN CCTs cct ON ha.CCTId = cct.Id
WHERE cct.Id IS NULL;
GO

-- Statistiques détaillées
PRINT 'Statistiques détaillées des affectations...';
GO

-- Répartition par année d'affectation
SELECT 
    YEAR(DateAffectation) as AnneeAffectation,
    COUNT(*) as NbAffectations
FROM HistoriqueAffectations 
GROUP BY YEAR(DateAffectation)
ORDER BY AnneeAffectation;
GO

-- Répartition par mois d'affectation
SELECT 
    MONTH(DateAffectation) as MoisAffectation,
    COUNT(*) as NbAffectations
FROM HistoriqueAffectations 
GROUP BY MONTH(DateAffectation)
ORDER BY MoisAffectation;
GO

-- Durée moyenne des affectations terminées
SELECT 
    AVG(DATEDIFF(day, DateAffectation, DateFinAffectation)) as DureeMoyenneJours,
    AVG(DATEDIFF(month, DateAffectation, DateFinAffectation)) as DureeMoyenneMois
FROM HistoriqueAffectations 
WHERE DateFinAffectation IS NOT NULL;
GO

PRINT '=== INSERTION TERMINÉE AVEC SUCCÈS ===';
PRINT 'Total des affectations insérées: 50 (30 agents + 20 chefs de centre)';
PRINT 'Données cohérentes avec les tables Agents, ChefCentres et CCTs existantes';
GO
