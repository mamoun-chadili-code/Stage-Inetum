USE CT_CNEH_DB;
GO

PRINT '=== INSERTION DE 20 NOUVELLES DÉCISIONS ===';
GO

-- Vérification des données existantes
PRINT 'Vérification des données existantes...';
GO

-- Vérifier les types de décisions disponibles
DECLARE @TypeDecisionCount INT = (SELECT COUNT(*) FROM TypeDecisions);
PRINT 'Nombre de types de décisions disponibles: ' + CAST(@TypeDecisionCount AS VARCHAR(10));

-- Vérifier les types d'entités disponibles
DECLARE @TypeEntiteCount INT = (SELECT COUNT(*) FROM TypeEntites);
PRINT 'Nombre de types d''entités disponibles: ' + CAST(@TypeEntiteCount AS VARCHAR(10));

-- Vérifier les agents disponibles
DECLARE @AgentsCount INT = (SELECT COUNT(*) FROM Agents);
PRINT 'Nombre d''agents disponibles: ' + CAST(@AgentsCount AS VARCHAR(10));

-- Vérifier les chefs de centre disponibles
DECLARE @ChefsCentreCount INT = (SELECT COUNT(*) FROM ChefCentres);
PRINT 'Nombre de chefs de centre disponibles: ' + CAST(@ChefsCentreCount AS VARCHAR(10));

-- Vérifier les lignes disponibles
DECLARE @LignesCount INT = (SELECT COUNT(*) FROM Lignes);
PRINT 'Nombre de lignes disponibles: ' + CAST(@LignesCount AS VARCHAR(10));

-- Vérifier les réseaux disponibles
DECLARE @ReseauxCount INT = (SELECT COUNT(*) FROM Reseaux);
PRINT 'Nombre de réseaux disponibles: ' + CAST(@ReseauxCount AS VARCHAR(10));

-- Vérifier les CCTs disponibles
DECLARE @CCTsCount INT = (SELECT COUNT(*) FROM CCTs);
PRINT 'Nombre de CCTs disponibles: ' + CAST(@CCTsCount AS VARCHAR(10));

GO

-- Insertion des 20 nouvelles décisions
INSERT INTO Decisions (
    EntiteId,
    DateReference,
    DateDebut,
    DateFin,
    LienDocumentUrl,
    Montant,
    Observation,
    ReseauId,
    CCTId,
    CreatedAt,
    UpdatedAt,
    TypeDecisionId,
    EntiteTypeId,
    AgentId,
    ChefCentreId,
    LigneId
)
VALUES
-- Décisions de suspension d'agents
(1, '2025-01-15', '2025-01-20', '2025-02-20', 'https://example.com/suspension-agent-1.pdf', NULL, 'Suspension temporaire de 30 jours suite à manquement aux procédures de sécurité lors du contrôle technique', 5, 10, GETDATE(), NULL, 3, 1, 28, NULL, NULL),
(2, '2025-01-20', '2025-01-25', '2025-03-25', 'https://example.com/suspension-agent-2.pdf', NULL, 'Suspension de 60 jours pour non-respect des normes de qualité dans les rapports de contrôle', 4, 9, GETDATE(), NULL, 3, 1, 29, NULL, NULL),

-- Décisions de promotion
(3, '2025-02-01', '2025-02-01', NULL, 'https://example.com/promotion-chef-centre-1.pdf', NULL, 'Promotion au grade de Chef de Centre Principal avec augmentation de salaire de 15%', NULL, 11, GETDATE(), NULL, 5, 2, NULL, 39, NULL),
(4, '2025-02-10', '2025-02-10', NULL, 'https://example.com/promotion-agent-1.pdf', NULL, 'Promotion au grade d''Agent Senior avec responsabilités accrues', 6, 12, GETDATE(), NULL, 5, 1, 30, NULL, NULL),

-- Décisions de création de lignes
(5, '2025-02-15', '2025-02-20', NULL, 'https://example.com/creation-ligne-1.pdf', 50000.00, 'Création d''une nouvelle ligne de contrôle technique pour véhicules électriques', 7, 13, GETDATE(), NULL, 1, 3, NULL, NULL, 42),
(6, '2025-02-25', '2025-03-01', NULL, 'https://example.com/creation-ligne-2.pdf', 35000.00, 'Installation d''une ligne spécialisée pour motocycles de compétition', 8, 14, GETDATE(), NULL, 1, 3, NULL, NULL, 43),

-- Décisions de sanctions financières
(7, '2025-03-01', '2025-03-01', NULL, 'https://example.com/sanction-financiere-1.pdf', 1000.00, 'Sanction financière pour retard répété dans la transmission des rapports mensuels', 9, 15, GETDATE(), NULL, 2, 1, 31, NULL, NULL),
(8, '2025-03-10', '2025-03-10', NULL, 'https://example.com/sanction-financiere-2.pdf', 750.00, 'Amende pour non-respect des délais de maintenance préventive des équipements', 10, 16, GETDATE(), NULL, 2, 2, NULL, 40, NULL),

-- Décisions de mutation
(9, '2025-03-15', '2025-04-01', NULL, 'https://example.com/mutation-agent-1.pdf', NULL, 'Mutation de l''agent vers le centre de contrôle technique de Casablanca Ain Sebaâ', 11, 17, GETDATE(), NULL, 4, 1, 32, NULL, NULL),
(10, '2025-03-20', '2025-04-05', NULL, 'https://example.com/mutation-chef-centre-1.pdf', NULL, 'Transfert du chef de centre vers le CCT de Rabat Agdal pour optimiser les performances', 12, 18, GETDATE(), NULL, 4, 2, NULL, 41, NULL),

-- Décisions de récompenses
(11, '2025-04-01', '2025-04-01', NULL, 'https://example.com/recompense-agent-1.pdf', 2500.00, 'Prime d''excellence pour performance exceptionnelle et taux de satisfaction client de 98%', 13, 19, GETDATE(), NULL, 5, 1, 33, NULL, NULL),
(12, '2025-04-10', '2025-04-10', NULL, 'https://example.com/recompense-chef-centre-1.pdf', 3000.00, 'Bonus de performance pour amélioration significative de la productivité du centre', 14, 20, GETDATE(), NULL, 5, 2, NULL, 42, NULL),

-- Décisions de formation
(13, '2025-04-15', '2025-05-01', '2025-05-31', 'https://example.com/formation-controle-technique.pdf', 15000.00, 'Formation obligatoire sur les nouvelles normes de contrôle technique européennes', 15, 21, GETDATE(), NULL, 1, 1, 34, NULL, NULL),
(14, '2025-04-20', '2025-05-05', '2025-06-05', 'https://example.com/formation-securite.pdf', 12000.00, 'Formation en sécurité et prévention des risques pour tout le personnel', 16, 22, GETDATE(), NULL, 1, 2, NULL, 43, NULL),

-- Décisions de révocation
(15, '2025-05-01', '2025-05-01', NULL, 'https://example.com/revocation-agent-1.pdf', NULL, 'Révocation de l''habilitation de contrôle technique suite à manquements graves répétés', 17, 23, GETDATE(), NULL, 4, 1, 35, NULL, NULL),
(16, '2025-05-10', '2025-05-10', NULL, 'https://example.com/revocation-chef-centre-1.pdf', NULL, 'Révocation du poste de chef de centre pour incompétence managériale', 18, 24, GETDATE(), NULL, 4, 2, NULL, 44, NULL),

-- Décisions d'approbation
(17, '2025-05-15', '2025-05-15', NULL, 'https://example.com/approbation-equipement.pdf', 45000.00, 'Approbation de l''acquisition de nouveaux équipements de diagnostic avancé', 19, 25, GETDATE(), NULL, 1, 3, NULL, NULL, 44),
(18, '2025-05-20', '2025-05-20', NULL, 'https://example.com/approbation-procedure.pdf', NULL, 'Approbation de nouvelles procédures de contrôle qualité pour les véhicules utilitaires', 20, 26, GETDATE(), NULL, 1, 4, NULL, NULL, NULL),

-- Décisions de changement de nom
(19, '2025-06-01', '2025-06-01', NULL, 'https://example.com/changement-nom-1.pdf', NULL, 'Changement de nom suite à mariage - Mise à jour de tous les documents officiels', 21, 27, GETDATE(), NULL, 5, 1, 36, NULL, NULL),
(20, '2025-06-10', '2025-06-10', NULL, 'https://example.com/changement-nom-2.pdf', NULL, 'Modification de la dénomination commerciale du centre de contrôle technique', 22, 28, GETDATE(), NULL, 5, 2, NULL, 45, NULL);

GO

-- Vérification de l'insertion
PRINT 'Vérification de l''insertion...';
GO

DECLARE @DecisionsInserees INT = (SELECT COUNT(*) FROM Decisions WHERE DateReference >= '2025-01-01');
PRINT 'Nombre de décisions insérées (2025): ' + CAST(@DecisionsInserees AS VARCHAR(10));

-- Affichage des nouvelles décisions
SELECT TOP 10
    d.Id,
    td.Libelle AS TypeDecision,
    d.DateReference,
    d.DateDebut,
    d.DateFin,
    d.Montant,
    d.Observation,
    d.CreatedAt
FROM Decisions d
INNER JOIN TypeDecisions td ON d.TypeDecisionId = td.Id
WHERE d.DateReference >= '2025-01-01'
ORDER BY d.DateReference;

GO

-- Statistiques par type de décision
SELECT 
    td.Libelle AS TypeDecision,
    COUNT(*) AS NombreDecisions,
    AVG(ISNULL(d.Montant, 0)) AS MontantMoyen
FROM Decisions d
INNER JOIN TypeDecisions td ON d.TypeDecisionId = td.Id
WHERE d.DateReference >= '2025-01-01'
GROUP BY td.Libelle, td.Id
ORDER BY td.Id;

GO

PRINT '=== INSERTION TERMINÉE AVEC SUCCÈS ===';
GO
