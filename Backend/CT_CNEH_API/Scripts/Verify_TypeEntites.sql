-- Script de vérification de la table TypeEntites
-- Exécuter ce script après le peuplement pour vérifier les données

USE [CT_CNEH_DB]
GO

PRINT '🔍 VÉRIFICATION DE LA TABLE TypeEntites'
PRINT '====================================='
PRINT ''

-- Vérifier l'existence de la table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeEntites]') AND type in (N'U'))
BEGIN
    PRINT '❌ ERREUR: La table TypeEntites n''existe pas !'
    RETURN
END

PRINT '✅ Table TypeEntites existe'

-- Vérifier le nombre total d'enregistrements
DECLARE @TotalCount INT
SELECT @TotalCount = COUNT(*) FROM [TypeEntites]

PRINT '📊 Nombre total d''enregistrements : ' + CAST(@TotalCount AS VARCHAR)

IF @TotalCount = 0
BEGIN
    PRINT '❌ ATTENTION: La table est vide !'
    PRINT 'Exécutez d''abord le script Populate_TypeEntites.sql'
    RETURN
END

IF @TotalCount < 8
BEGIN
    PRINT '⚠️ ATTENTION: Données incomplètes !'
    PRINT 'Nombre attendu : 8, Nombre actuel : ' + CAST(@TotalCount AS VARCHAR)
END

IF @TotalCount = 8
BEGIN
    PRINT '✅ Données complètes ! (8/8 entités)'
END

PRINT ''

-- Afficher le contenu détaillé
PRINT '📋 CONTENU DÉTAILLÉ DE LA TABLE :'
PRINT '--------------------------------'

SELECT 
    [Id],
    [Code],
    [Libelle],
    CASE 
        WHEN [Code] IS NULL THEN '❌ Code manquant'
        ELSE '✅ Code présent'
    END AS StatutCode,
    CASE 
        WHEN [Libelle] IS NULL THEN '❌ Libellé manquant'
        ELSE '✅ Libellé présent'
    END AS StatutLibelle
FROM [TypeEntites] 
ORDER BY [Libelle]

PRINT ''

-- Vérifier les entités manquantes
PRINT '🔍 VÉRIFICATION DES ENTITÉS REQUISES :'

DECLARE @RequiredEntities TABLE (Code NVARCHAR(20), Libelle NVARCHAR(50))
INSERT INTO @RequiredEntities VALUES
('RESEAU', 'Réseau'),
('CCT', 'CCT'),
('AGENT', 'Agent'),
('CHEF_CENTRE', 'Chef de centre'),
('LIGNE', 'Ligne'),
('EQUIPEMENT', 'Équipement'),
('FORMATION', 'Formation'),
('DECISION', 'Décision')

SELECT 
    r.Code,
    r.Libelle,
    CASE 
        WHEN t.Code IS NOT NULL THEN '✅ Présent'
        ELSE '❌ MANQUANT'
    END AS Statut
FROM @RequiredEntities r
LEFT JOIN [TypeEntites] t ON r.Code = t.Code
ORDER BY r.Libelle

PRINT ''
PRINT '🎯 RÉSUMÉ DE LA VÉRIFICATION :'
PRINT '- Total enregistrements : ' + CAST(@TotalCount AS VARCHAR)
PRINT '- Entités requises : 8'
PRINT '- Conformité : ' + CAST((@TotalCount * 100 / 8) AS VARCHAR) + '%'

IF @TotalCount = 8
BEGIN
    PRINT '✅ La table TypeEntites est prête pour le module Décisions !'
    PRINT '✅ Les dropdowns "Entité concernée" fonctionneront correctement !'
END
ELSE
BEGIN
    PRINT '❌ La table TypeEntites nécessite un peuplement complet !'
    PRINT '❌ Exécutez le script Populate_TypeEntites.sql'
END

GO
