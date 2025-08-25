-- Script de peuplement de la table TypeEntites
-- Exécuter ce script dans SSMS pour peupler la table avec les données de base

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
    PRINT '⚠️ ATTENTION: La table TypeEntites contient déjà des données.'
    PRINT 'Contenu actuel :'
    SELECT * FROM [TypeEntites] ORDER BY [Libelle]
    PRINT ''
    PRINT 'Voulez-vous vider la table et la repeupler ? (Décommentez la ligne suivante)'
    -- DELETE FROM [TypeEntites]
    RETURN
END

PRINT '🚀 Début du peuplement de la table TypeEntites...'
PRINT ''

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

-- Vérifier l'insertion
DECLARE @RowCount INT = @@ROWCOUNT
PRINT '✅ Types d''entités insérés avec succès dans la table TypeEntites'
PRINT '📊 Nombre d''entités insérées : ' + CAST(@RowCount AS VARCHAR)

-- Afficher le contenu final
PRINT ''
PRINT '📋 Contenu final de la table TypeEntites :'
SELECT 
    [Id],
    [Code],
    [Libelle]
FROM [TypeEntites] 
ORDER BY [Libelle]

PRINT ''
PRINT '🎯 RÉSUMÉ:'
PRINT '- ' + CAST(@RowCount AS VARCHAR) + ' types d''entités ont été insérés'
PRINT '- Ces entités représentent tous les modules du système'
PRINT '- La table est maintenant prête pour le module Décisions'
PRINT '- Les dropdowns "Entité concernée" fonctionneront correctement'
PRINT ''
PRINT '✅ PEUPLEMENT TERMINÉ AVEC SUCCÈS !'
GO
