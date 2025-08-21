-- Script de vérification des agents et de leur historique
-- À exécuter après la création des agents et de l'historique

USE [CT_CNEH_DB]
GO

PRINT '=== VÉRIFICATION DES AGENTS ==='
-- Vérifier tous les agents créés
SELECT 
    [Id], [Nom], [Prenom], [CIN], [Tel], [Mail], [CNSS], [CCTId],
    [NumeroCAP], [DateCAP], [DateExpirationCAP], [CategorieCAPId],
    [StatutAdministratifId], [AnneeAutorisation], [DateAffectationCCT],
    [NumDecisionRenouv], [DateDecisionRenouv], [Adresse]
FROM [dbo].[Agents]
ORDER BY [Id]

PRINT '=== COMPTAGE DES AGENTS ==='
-- Compter le nombre total d'agents
SELECT COUNT(*) as 'Nombre total d\'agents' FROM [dbo].[Agents]

PRINT '=== VÉRIFICATION DE L\'HISTORIQUE ==='
-- Vérifier l'historique de chaque agent
SELECT 
    ha.[id], ha.[agentId], a.[Nom] + ' ' + a.[Prenom] as 'Nom Agent',
    ha.[dateAffectation], ha.[dateFinAffectation], ha.[motifAffectation], 
    ha.[motifFinAffectation], ha.[isActive], ha.[cct]
FROM [dbo].[HistoriqueAffectations] ha
JOIN [dbo].[Agents] a ON ha.[agentId] = a.[Id]
ORDER BY ha.[agentId], ha.[dateAffectation]

PRINT '=== COMPTAGE DE L\'HISTORIQUE ==='
-- Compter le nombre total d'entrées d'historique
SELECT COUNT(*) as 'Nombre total d\'entrées d\'historique' FROM [dbo].[HistoriqueAffectations]

PRINT '=== RÉSUMÉ PAR AGENT ==='
-- Résumé de l'historique par agent
SELECT 
    a.[Id], a.[Nom] + ' ' + a.[Prenom] as 'Nom Agent',
    COUNT(ha.[id]) as 'Nombre d\'entrées d\'historique',
    MAX(CASE WHEN ha.[isActive] = 1 THEN ha.[dateAffectation] END) as 'Dernière affectation active',
    MAX(CASE WHEN ha.[isActive] = 1 THEN ha.[motifAffectation] END) as 'Motif affectation actuelle'
FROM [dbo].[Agents] a
LEFT JOIN [dbo].[HistoriqueAffectations] ha ON a.[Id] = ha.[agentId]
GROUP BY a.[Id], a.[Nom], a.[Prenom]
ORDER BY a.[Id]

PRINT '=== VÉRIFICATION DES DONNÉES ==='
-- Vérifier la cohérence des données
SELECT 
    'Agents sans historique' as 'Type de vérification',
    COUNT(*) as 'Nombre'
FROM [dbo].[Agents] a
LEFT JOIN [dbo].[HistoriqueAffectations] ha ON a.[Id] = ha.[agentId]
WHERE ha.[id] IS NULL

UNION ALL

SELECT 
    'Agents avec historique' as 'Type de vérification',
    COUNT(DISTINCT ha.[agentId]) as 'Nombre'
FROM [dbo].[HistoriqueAffectations] ha

UNION ALL

SELECT 
    'Entrées d\'historique actives' as 'Type de vérification',
    COUNT(*) as 'Nombre'
FROM [dbo].[HistoriqueAffectations]
WHERE [isActive] = 1

UNION ALL

SELECT 
    'Entrées d\'historique inactives' as 'Type de vérification',
    COUNT(*) as 'Nombre'
FROM [dbo].[HistoriqueAffectations]
WHERE [isActive] = 0

PRINT '=== VÉRIFICATION TERMINÉE ==='
GO
