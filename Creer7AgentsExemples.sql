-- Script de création de 7 agents complets avec exemples
-- Basé sur la structure de la table dbo.Agents

USE [CT_CNEH_DB]
GO

-- Agent 1: Agent senior avec longue expérience
INSERT INTO [dbo].[Agents] (
    [Nom], [Prenom], [CIN], [Tel], [Mail], [CNSS], [CCTId], 
    [NumeroCAP], [DateCAP], [DateExpirationCAP], [CategorieCAPId], 
    [StatutAdministratifId], [AnneeAutorisation], [DateAffectationCCT], 
    [NumDecisionRenouv], [DateDecisionRenouv], [Adresse]
) VALUES (
    'ALAOUI', 'MOHAMMED', 'AB123456', '0612345678', 'mohammed.alaoui@ctc.ma', '123456789001',
    1, 'CAP001/95', '1995-03-15', '2025-03-15', 1, 1, 2024, '2020-01-15',
    'REN001/2024', '2024-01-10', '123 Avenue Hassan II, Casablanca'
)

-- Agent 2: Agent spécialisé véhicules lourds
INSERT INTO [dbo].[Agents] (
    [Nom], [Prenom], [CIN], [Tel], [Mail], [CNSS], [CCTId], 
    [NumeroCAP], [DateCAP], [DateExpirationCAP], [CategorieCAPId], 
    [StatutAdministratifId], [AnneeAutorisation], [DateAffectationCCT], 
    [NumDecisionRenouv], [DateDecisionRenouv], [Adresse]
) VALUES (
    'BENNANI', 'FATIMA', 'CD789012', '0623456789', 'fatima.bennani@ctc.ma', '987654321002',
    1, 'CAP002/98', '1998-06-20', '2026-06-20', 2, 1, 2024, '2021-03-01',
    'REN002/2024', '2024-02-15', '456 Boulevard Mohammed V, Rabat'
)

-- Agent 3: Agent spécialisé motos
INSERT INTO [dbo].[Agents] (
    [Nom], [Prenom], [CIN], [Tel], [Mail], [CNSS], [CCTId], 
    [NumeroCAP], [DateCAP], [DateExpirationCAP], [CategorieCAPId], 
    [StatutAdministratifId], [AnneeAutorisation], [DateAffectationCCT], 
    [NumDecisionRenouv], [DateDecisionRenouv], [Adresse]
) VALUES (
    'CHERKAOUI', 'AHMED', 'EF345678', '0634567890', 'ahmed.cherkaoui@ctc.ma', '456789123003',
    1, 'CAP003/00', '2000-09-10', '2027-09-10', 3, 1, 2024, '2022-07-01',
    'REN003/2024', '2024-03-01', '789 Rue Ibn Khaldoun, Fès'
)

-- Agent 4: Agent spécialisé remorques
INSERT INTO [dbo].[Agents] (
    [Nom], [Prenom], [CIN], [Tel], [Mail], [CNSS], [CCTId], 
    [NumeroCAP], [DateCAP], [DateExpirationCAP], [CategorieCAPId], 
    [StatutAdministratifId], [AnneeAutorisation], [DateAffectationCCT], 
    [NumDecisionRenouv], [DateDecisionRenouv], [Adresse]
) VALUES (
    'DAHMANI', 'KHADIJA', 'GH567890', '0645678901', 'khadija.dahmani@ctc.ma', '567890123004',
    1, 'CAP004/02', '2002-11-25', '2028-11-25', 4, 1, 2024, '2023-01-15',
    'REN004/2024', '2024-04-15', '321 Rue Al Andalous, Marrakech'
)

-- Agent 5: Agent spécialisé véhicules agricoles
INSERT INTO [dbo].[Agents] (
    [Nom], [Prenom], [CIN], [Tel], [Mail], [CNSS], [CCTId], 
    [NumeroCAP], [DateCAP], [DateExpirationCAP], [CategorieCAPId], 
    [StatutAdministratifId], [AnneeAutorisation], [DateAffectationCCT], 
    [NumDecisionRenouv], [DateDecisionRenouv], [Adresse]
) VALUES (
    'EL FASSI', 'HASSAN', 'IJ901234', '0656789012', 'hassan.elfassi@ctc.ma', '678901234005',
    1, 'CAP005/05', '2005-04-12', '2029-04-12', 5, 1, 2024, '2023-06-01',
    'REN005/2024', '2024-05-20', '654 Avenue Mohammed VI, Agadir'
)

-- Agent 6: Agent spécialisé véhicules de transport
INSERT INTO [dbo].[Agents] (
    [Nom], [Prenom], [CIN], [Tel], [Mail], [CNSS], [CCTId], 
    [NumeroCAP], [DateCAP], [DateExpirationCAP], [CategorieCAPId], 
    [StatutAdministratifId], [AnneeAutorisation], [DateAffectationCCT], 
    [NumDecisionRenouv], [DateDecisionRenouv], [Adresse]
) VALUES (
    'FARES', 'AMINA', 'KL234567', '0667890123', 'amina.fares@ctc.ma', '789012345006',
    1, 'CAP006/08', '2008-07-30', '2030-07-30', 6, 1, 2024, '2023-09-01',
    'REN006/2024', '2024-06-10', '987 Rue Ibn Sina, Tanger'
)

-- Agent 7: Agent spécialisé véhicules spéciaux
INSERT INTO [dbo].[Agents] (
    [Nom], [Prenom], [CIN], [Tel], [Mail], [CNSS], [CCTId], 
    [NumeroCAP], [DateCAP], [DateExpirationCAP], [CategorieCAPId], 
    [StatutAdministratifId], [AnneeAutorisation], [DateAffectationCCT], 
    [NumDecisionRenouv], [DateDecisionRenouv], [Adresse]
) VALUES (
    'GHAZI', 'YOUSSEF', 'MN456789', '0678901234', 'youssef.ghazi@ctc.ma', '890123456007',
    1, 'CAP007/10', '2010-12-05', '2031-12-05', 7, 1, 2024, '2024-01-01',
    'REN007/2024', '2024-07-01', '147 Rue Al Qods, Meknès'
)

-- Vérifier l'insertion
SELECT 
    [Id], [Nom], [Prenom], [CIN], [Tel], [Mail], [CNSS], [CCTId],
    [NumeroCAP], [DateCAP], [DateExpirationCAP], [CategorieCAPId],
    [StatutAdministratifId], [AnneeAutorisation], [DateAffectationCCT],
    [NumDecisionRenouv], [DateDecisionRenouv], [Adresse]
FROM [dbo].[Agents]
ORDER BY [Id]

-- Compter le nombre d'agents créés
SELECT COUNT(*) as 'Nombre d\'agents créés' FROM [dbo].[Agents]

PRINT '7 agents ont été créés avec succès!'
GO
