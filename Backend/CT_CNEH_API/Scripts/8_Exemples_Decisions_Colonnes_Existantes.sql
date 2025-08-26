-- Script SIMPLE utilisant seulement les colonnes existantes
USE [CT_CNEH_DB]
GO

-- Vérifier d'abord la structure de la table Decisions
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Decisions' 
ORDER BY ORDINAL_POSITION;

PRINT 'Structure de la table Decisions verifiee!'
GO

-- Exemple 1: Décision de Formation pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId]
) VALUES (
    3, '2025-08-15 09:00:00', '2025-08-20 09:00:00', '2025-08-25 17:00:00',
    'https://example.com/formation-controle-technique.pdf', 2500.00,
    'Formation obligatoire sur les nouvelles normes de controle technique',
    1, 1, GETDATE(), NULL, 7, 3
);

-- Exemple 2: Décision de Suspension pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId]
) VALUES (
    4, '2025-08-18 14:30:00', '2025-08-19 00:00:00', '2025-08-26 23:59:59',
    'https://example.com/suspension-agent.pdf', NULL,
    'Suspension temporaire suite a manquement aux procedures de securite',
    2, 2, GETDATE(), NULL, 3, 3
);

-- Exemple 3: Décision de Promotion pour un Chef de Centre
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId]
) VALUES (
    2, '2025-08-20 10:00:00', '2025-09-01 00:00:00', NULL,
    'https://example.com/promotion-chef-centre.pdf', 5000.00,
    'Promotion au grade de Chef de Centre Principal avec augmentation de salaire',
    1, 1, GETDATE(), NULL, 6, 4
);

-- Exemple 4: Décision de Création d''une nouvelle Ligne
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId]
) VALUES (
    8, '2025-08-22 16:00:00', '2025-09-15 00:00:00', NULL,
    'https://example.com/creation-ligne.pdf', 15000.00,
    'Creation d''une nouvelle ligne de controle technique pour vehicules electriques',
    3, 3, GETDATE(), NULL, 2, 5
);

-- Exemple 5: Décision de Sanction pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId]
) VALUES (
    5, '2025-08-25 11:15:00', '2025-08-26 00:00:00', '2025-09-02 23:59:59',
    'https://example.com/sanction-agent.pdf', 500.00,
    'Sanction financiere pour retard repete dans les rapports de controle',
    2, 2, GETDATE(), NULL, 9, 3
);

-- Exemple 6: Décision de Mutation d''un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId]
) VALUES (
    6, '2025-08-28 13:45:00', '2025-09-10 00:00:00', NULL,
    'https://example.com/mutation-agent.pdf', NULL,
    'Mutation de l''agent vers le centre de controle technique de Casablanca',
    1, 1, GETDATE(), NULL, 7, 3
);

-- Exemple 7: Décision de Récompense pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId]
) VALUES (
    7, '2025-08-30 15:20:00', '2025-09-01 00:00:00', NULL,
    'https://example.com/recompense-agent.pdf', 1000.00,
    'Prime d''excellence pour performance exceptionnelle en controle qualite',
    3, 3, GETDATE(), NULL, 12, 3
);

-- Exemple 8: Décision de Changement de nom pour un Agent
INSERT INTO [Decisions] (
    [EntiteId], [DateReference], [DateDebut], [DateFin], [LienDocumentUrl], 
    [Montant], [Observation], [ReseauId], [CCTId], [CreatedAt], [UpdatedAt], 
    [TypeDecisionId], [EntiteTypeId]
) VALUES (
    9, '2025-09-01 08:00:00', '2025-09-01 00:00:00', NULL,
    'https://example.com/changement-nom.pdf', NULL,
    'Changement de nom suite a mariage - Mise a jour des documents officiels',
    1, 1, GETDATE(), NULL, 10, 3
);

-- Vérifier les insertions
SELECT 
    Id, EntiteId, DateReference, TypeDecisionId, EntiteTypeId, 
    ReseauId, CCTId, Montant, Observation
FROM [Decisions] 
ORDER BY Id DESC;

PRINT '8 exemples de decisions inseres avec succes!'
GO
