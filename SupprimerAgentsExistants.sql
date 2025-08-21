-- Script de suppression des agents existants
-- ATTENTION: Ce script supprime TOUS les agents de la base de données

USE [CT_CNEH_DB]
GO

-- Supprimer d'abord les entrées d'historique liées aux agents
DELETE FROM [dbo].[HistoriqueAffectations]
WHERE [agentId] IN (SELECT [Id] FROM [dbo].[Agents])

-- Supprimer ensuite tous les agents
DELETE FROM [dbo].[Agents]

-- Vérifier que la suppression a bien fonctionné
SELECT COUNT(*) as 'Nombre d\'agents restants' FROM [dbo].[Agents]
SELECT COUNT(*) as 'Nombre d\'entrées d\'historique restantes' FROM [dbo].[HistoriqueAffectations]

PRINT 'Suppression des agents terminée avec succès!'
GO
