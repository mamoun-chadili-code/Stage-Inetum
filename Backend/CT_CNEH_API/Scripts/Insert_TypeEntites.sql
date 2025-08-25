-- Script d'insertion des types d'entités de base
-- Ces entités représentent tous les modules du système
-- et seront utilisées pour l'historique dans chaque module

USE [CT_CNEH_DB]
GO

-- Vérifier si la table TypeEntites existe
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeEntites]') AND type in (N'U'))
BEGIN
    PRINT '❌ ERREUR: La table TypeEntites n''existe pas. Veuillez d''abord créer la table.'
    RETURN
END

-- Vérifier si des données existent déjà
IF EXISTS (SELECT TOP 1 1 FROM [TypeEntites])
BEGIN
    PRINT '⚠️ ATTENTION: La table TypeEntites contient déjà des données. Vérifiez le contenu avant d''insérer.'
    SELECT * FROM [TypeEntites]
    RETURN
END

-- Insérer les types d'entités de base
INSERT INTO [TypeEntites] ([Code], [Libelle]) VALUES
('RESEAU', 'Réseau'),
('CCT', 'CCT'),
('AGENT', 'Agent'),
('CHEF_CENTRE', 'Chef de centre'),
('LIGNE', 'Ligne'),
('EQUIPEMENT', 'Équipement'),
('FORMATION', 'Formation'),
('DECISION', 'Décision')

PRINT '✅ Types d''entités insérés avec succès dans la table TypeEntites'

-- Vérifier l'insertion
SELECT * FROM [TypeEntites] ORDER BY [Libelle]

PRINT ''
PRINT '📋 RÉSUMÉ:'
PRINT '- ' + CAST(@@ROWCOUNT AS VARCHAR) + ' types d''entités ont été insérés'
PRINT '- Ces entités seront utilisées pour l''historique dans chaque module'
PRINT '- La table est maintenant prête pour le module Décisions'
GO
