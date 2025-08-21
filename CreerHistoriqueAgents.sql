-- Script de création de l'historique des affectations pour les 7 agents
-- Basé sur la structure de la table dbo.HistoriqueAffectations

USE [CT_CNEH_DB]
GO

-- Historique pour ALAOUI MOHAMMED (Agent 1)
INSERT INTO [dbo].[HistoriqueAffectations] (
    [agentId], [dateAffectation], [dateFinAffectation], [motifAffectation], 
    [motifFinAffectation], [isActive], [dateCreation], [cctId], [cct]
) VALUES 
    (1, '1995-03-15', '2000-03-14', 'Affectation initiale au CCT', 'Promotion et transfert', 0, '1995-03-15', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (1, '2000-03-15', '2010-03-14', 'Transfert vers nouveau CCT', 'Retour au CCT d''origine', 0, '2000-03-15', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (1, '2010-03-15', '2020-01-14', 'Retour au CCT d''origine', 'Formation spécialisée', 0, '2010-03-15', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (1, '2020-01-15', NULL, 'Retour après formation', NULL, 1, '2020-01-15', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE')

-- Historique pour BENNANI FATIMA (Agent 2)
INSERT INTO [dbo].[HistoriqueAffectations] (
    [agentId], [dateAffectation], [dateFinAffectation], [motifAffectation], 
    [motifFinAffectation], [isActive], [dateCreation], [cctId], [cct]
) VALUES 
    (2, '1998-06-20', '2005-06-19', 'Affectation initiale au CCT', 'Formation véhicules lourds', 0, '1998-06-20', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (2, '2005-06-20', '2015-06-19', 'Retour après formation', 'Promotion chef équipe', 0, '2005-06-20', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (2, '2015-06-20', '2021-02-28', 'Promotion chef équipe', 'Formation continue', 0, '2015-06-20', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (2, '2021-03-01', NULL, 'Retour après formation continue', NULL, 1, '2021-03-01', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE')

-- Historique pour CHERKAOUI AHMED (Agent 3)
INSERT INTO [dbo].[HistoriqueAffectations] (
    [agentId], [dateAffectation], [dateFinAffectation], [motifAffectation], 
    [motifFinAffectation], [isActive], [dateCreation], [cctId], [cct]
) VALUES 
    (3, '2000-09-10', '2008-09-09', 'Affectation initiale au CCT', 'Formation motos', 0, '2000-09-10', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (3, '2008-09-10', '2018-09-09', 'Retour après formation motos', 'Formation continue', 0, '2008-09-10', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (3, '2018-09-10', '2022-06-30', 'Retour après formation continue', 'Formation spécialisée', 0, '2018-09-10', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (3, '2022-07-01', NULL, 'Retour après formation spécialisée', NULL, 1, '2022-07-01', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE')

-- Historique pour DAHMANI KHADIJA (Agent 4)
INSERT INTO [dbo].[HistoriqueAffectations] (
    [agentId], [dateAffectation], [dateFinAffectation], [motifAffectation], 
    [motifFinAffectation], [isActive], [dateCreation], [cctId], [cct]
) VALUES 
    (4, '2002-11-25', '2010-11-24', 'Affectation initiale au CCT', 'Formation remorques', 0, '2002-11-25', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (4, '2010-11-25', '2020-11-24', 'Retour après formation remorques', 'Formation continue', 0, '2010-11-25', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (4, '2020-11-25', '2023-01-14', 'Retour après formation continue', 'Formation spécialisée', 0, '2020-11-25', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (4, '2023-01-15', NULL, 'Retour après formation spécialisée', NULL, 1, '2023-01-15', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE')

-- Historique pour EL FASSI HASSAN (Agent 5)
INSERT INTO [dbo].[HistoriqueAffectations] (
    [agentId], [dateAffectation], [dateFinAffectation], [motifAffectation], 
    [motifFinAffectation], [isActive], [dateCreation], [cctId], [cct]
) VALUES 
    (5, '2005-04-12', '2013-04-11', 'Affectation initiale au CCT', 'Formation véhicules agricoles', 0, '2005-04-12', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (5, '2013-04-12', '2023-05-31', 'Retour après formation véhicules agricoles', 'Formation continue', 0, '2013-04-12', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (5, '2023-06-01', NULL, 'Retour après formation continue', NULL, 1, '2023-06-01', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE')

-- Historique pour FARES AMINA (Agent 6)
INSERT INTO [dbo].[HistoriqueAffectations] (
    [agentId], [dateAffectation], [dateFinAffectation], [motifAffectation], 
    [motifFinAffectation], [isActive], [dateCreation], [cctId], [cct]
) VALUES 
    (6, '2008-07-30', '2016-07-29', 'Affectation initiale au CCT', 'Formation véhicules de transport', 0, '2008-07-30', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (6, '2016-07-30', '2023-08-31', 'Retour après formation véhicules de transport', 'Formation continue', 0, '2016-07-30', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (6, '2023-09-01', NULL, 'Retour après formation continue', NULL, 1, '2023-09-01', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE')

-- Historique pour GHAZI YOUSSEF (Agent 7)
INSERT INTO [dbo].[HistoriqueAffectations] (
    [agentId], [dateAffectation], [dateFinAffectation], [motifAffectation], 
    [motifFinAffectation], [isActive], [dateCreation], [cctId], [cct]
) VALUES 
    (7, '2010-12-05', '2018-12-04', 'Affectation initiale au CCT', 'Formation véhicules spéciaux', 0, '2010-12-05', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (7, '2018-12-05', '2023-12-31', 'Retour après formation véhicules spéciaux', 'Formation continue', 0, '2018-12-05', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE'),
    (7, '2024-01-01', NULL, 'Retour après formation continue', NULL, 1, '2024-01-01', 1, 'CENTRE DE CONTRÔLE TECHNIQUE CASABLANCA CENTRE')

-- Vérifier l'insertion de l'historique
SELECT 
    ha.[id], ha.[agentId], a.[Nom] + ' ' + a.[Prenom] as 'Nom Agent',
    ha.[dateAffectation], ha.[dateFinAffectation], ha.[motifAffectation], 
    ha.[motifFinAffectation], ha.[isActive], ha.[cct]
FROM [dbo].[HistoriqueAffectations] ha
JOIN [dbo].[Agents] a ON ha.[agentId] = a.[Id]
ORDER BY ha.[agentId], ha.[dateAffectation]

-- Compter le nombre d'entrées d'historique créées
SELECT COUNT(*) as 'Nombre d\'entrées d\'historique créées' FROM [dbo].[HistoriqueAffectations]

PRINT 'Historique des agents créé avec succès!'
GO
