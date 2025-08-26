-- Script SQL 100% compatible pour insérer 8 exemples de décisions
USE [CT_CNEH_DB]
GO

-- Exemple 1: Décision de Formation pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId], [AgentId], [ChefCentreId], [LigneId]
) VALUES (
    3, '2025-08-15 09:00:00', '2025-08-20 09:00:00', '2025-08-25 17:00:00',
    'https://example.com/formation-controle-technique.pdf', 2500.00,
    'Formation obligatoire sur les nouvelles normes de controle technique',
    1, 1, GETDATE(), NULL, 7, 3, 3, 1, 5
);

-- Exemple 2: Décision de Suspension pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId], [AgentId], [ChefCentreId], [LigneId]
) VALUES (
    4, '2025-08-18 14:30:00', '2025-08-19 00:00:00', '2025-08-26 23:59:59',
    'https://example.com/suspension-agent.pdf', NULL,
    'Suspension temporaire suite a manquement aux procedures de securite',
    2, 2, GETDATE(), NULL, 3, 3, 4, 2, 7
);

-- Exemple 3: Décision de Promotion pour un Chef de Centre
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId], [AgentId], [ChefCentreId], [LigneId]
) VALUES (
    2, '2025-08-20 10:00:00', '2025-09-01 00:00:00', NULL,
    'https://example.com/promotion-chef-centre.pdf', 5000.00,
    'Promotion au grade de Chef de Centre Principal avec augmentation de salaire',
    1, 1, GETDATE(), NULL, 6, 4, NULL, 2, NULL
);

-- Exemple 4: Décision de Création d''une nouvelle Ligne (apostrophe échappée)
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId], [AgentId], [ChefCentreId], [LigneId]
) VALUES (
    8, '2025-08-22 16:00:00', '2025-09-15 00:00:00', NULL,
    'https://example.com/creation-ligne.pdf', 15000.00,
    'Creation d''une nouvelle ligne de controle technique pour vehicules electriques',
    3, 3, GETDATE(), NULL, 2, 5, NULL, 3, 8
);

-- Exemple 5: Décision de Sanction pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId], [AgentId], [ChefCentreId], [LigneId]
) VALUES (
    5, '2025-08-25 11:15:00', '2025-08-26 00:00:00', '2025-09-02 23:59:59',
    'https://example.com/sanction-agent.pdf', 500.00,
    'Sanction financiere pour retard repete dans les rapports de controle',
    2, 2, GETDATE(), NULL, 9, 3, 5, 4, 6
);

-- Exemple 6: Décision de Mutation d''un Agent (apostrophe échappée)
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId], [AgentId], [ChefCentreId], [LigneId]
) VALUES (
    6, '2025-08-28 13:45:00', '2025-09-10 00:00:00', NULL,
    'https://example.com/mutation-agent.pdf', NULL,
    'Mutation de l''agent vers le centre de controle technique de Casablanca',
    1, 1, GETDATE(), NULL, 7, 3, 6, 5, 4
);

-- Exemple 7: Décision de Récompense pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId], [AgentId], [ChefCentreId], [LigneId]
) VALUES (
    7, '2025-08-30 15:20:00', '2025-09-01 00:00:00', NULL,
    'https://example.com/recompense-agent.pdf', 1000.00,
    'Prime d''excellence pour performance exceptionnelle en controle qualite',
    3, 3, GETDATE(), NULL, 12, 3, 7, 6, 9
);

-- Exemple 8: Décision de Changement de nom pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId], [AgentId], [ChefCentreId], [LigneId]
) VALUES (
    9, '2025-09-01 08:00:00', '2025-09-01 00:00:00', NULL,
    'https://example.com/changement-nom.pdf', NULL,
    'Changement de nom suite a mariage - Mise a jour des documents officiels',
    1, 1, GETDATE(), NULL, 10, 3, 9, 7, 5
);

-- Vérifier les insertions
SELECT 
    Id, EntiteId, DateReference, TypeDecisionId, EntiteTypeId, 
    AgentId, ChefCentreId, LigneId, ReseauId, CCTId,
    Montant, Observation
FROM [Decisions] 
ORDER BY Id DESC;

PRINT '8 exemples de decisions inseres avec succes!'
GO
