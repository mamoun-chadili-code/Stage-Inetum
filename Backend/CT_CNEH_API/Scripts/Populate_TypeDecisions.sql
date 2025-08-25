-- Script de peuplement de la table TypeDecisions
-- Exécuter ce script dans SSMS pour peupler la table avec les données de base

USE [CT_CNEH_DB]
GO

-- Vérifier si la table TypeDecisions existe
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeDecisions]') AND type in (N'U'))
BEGIN
    PRINT '❌ ERREUR: La table TypeDecisions n''existe pas. Veuillez d''abord créer la table.'
    RETURN
END

-- Vérifier si des données existent déjà
IF EXISTS (SELECT TOP 1 1 FROM [TypeDecisions])
BEGIN
    PRINT '⚠️ ATTENTION: La table TypeDecisions contient déjà des données.'
    PRINT 'Contenu actuel :'
    SELECT * FROM [TypeDecisions] ORDER BY [Libelle]
    PRINT ''
    PRINT 'Voulez-vous vider la table et la repeupler ? (Décommentez la ligne suivante)'
    -- DELETE FROM [TypeDecisions]
    RETURN
END

PRINT '🚀 Début du peuplement de la table TypeDecisions...'
PRINT ''

-- Insérer les types de décisions de base
INSERT INTO [TypeDecisions] ([Code], [Libelle]) VALUES
('APPROBATION', 'Approbation'),
('REJET', 'Rejet'),
('SUSPENSION', 'Suspension'),
('CREATION', 'Création'),
('FORMATION', 'Formation'),
('PROMOTION', 'Promotion'),
('CHANGEMENT_NOM', 'Changement de nom'),
('AFFECTATION', 'Affectation'),
('MUTATION', 'Mutation'),
('LICENCIEMENT', 'Licenciement'),
('RETRAITE', 'Retraite'),
('AUTRE', 'Autre')

-- Vérifier l'insertion
DECLARE @RowCount INT = @@ROWCOUNT
PRINT '✅ Types de décisions insérés avec succès dans la table TypeDecisions'
PRINT '📊 Nombre de types insérés : ' + CAST(@RowCount AS VARCHAR)

-- Afficher le contenu final
PRINT ''
PRINT '📋 Contenu final de la table TypeDecisions :'
SELECT 
    [Id],
    [Code],
    [Libelle]
FROM [TypeDecisions] 
ORDER BY [Libelle]

PRINT ''
PRINT '🎯 RÉSUMÉ:'
PRINT '- ' + CAST(@RowCount AS VARCHAR) + ' types de décisions ont été insérés'
PRINT '- Ces types couvrent tous les cas d''usage du module Décisions'
PRINT '- La table est maintenant prête pour le module Décisions'
PRINT '- Les dropdowns "Type de décision" fonctionneront correctement'
PRINT ''
PRINT '✅ PEUPLEMENT TERMINÉ AVEC SUCCÈS !'
GO
