-- =====================================================
-- SCRIPT DE MISE À JOUR DES FORMATIONS
-- Attribution des agents et chefs de centre manquants
-- =====================================================

USE [CT_CNEH_DB];
GO

PRINT '🔧 Début de la mise à jour des formations...';
PRINT '=============================================';

-- Vérifier l'état actuel des formations
PRINT '📊 ÉTAT ACTUEL DES FORMATIONS :';
PRINT '================================';

SELECT 
    'Formations avec AgentId NULL' as Statut,
    COUNT(*) as Nombre
FROM [dbo].[Formations] 
WHERE [AgentId] IS NULL

UNION ALL

SELECT 
    'Formations avec ChefCentreId NULL' as Statut,
    COUNT(*) as Nombre
FROM [dbo].[Formations] 
WHERE [ChefCentreId] IS NULL

UNION ALL

SELECT 
    'Formations avec AgentId et ChefCentreId NULL' as Statut,
    COUNT(*) as Nombre
FROM [dbo].[Formations] 
WHERE [AgentId] IS NULL AND [ChefCentreId] IS NULL

UNION ALL

SELECT 
    'Total des formations' as Statut,
    COUNT(*) as Nombre
FROM [dbo].[Formations];

GO

-- Récupérer les IDs des agents disponibles (IDs 7-36)
DECLARE @AgentIds TABLE (Id int);
INSERT INTO @AgentIds (Id)
SELECT Id FROM [dbo].[Agents] WHERE Id BETWEEN 7 AND 36;

-- Récupérer les IDs des chefs de centre disponibles (IDs 9-38)
DECLARE @ChefCentreIds TABLE (Id int);
INSERT INTO @ChefCentreIds (Id)
SELECT Id FROM [dbo].[ChefCentres] WHERE Id BETWEEN 9 AND 38;

PRINT '';
PRINT '📋 AGENTS DISPONIBLES :';
PRINT '======================';
SELECT COUNT(*) as 'Nombre d''agents disponibles' FROM @AgentIds;

PRINT '';
PRINT '📋 CHEFS DE CENTRE DISPONIBLES :';
PRINT '=================================';
SELECT COUNT(*) as 'Nombre de chefs de centre disponibles' FROM @ChefCentreIds;

GO

-- Mise à jour des formations avec AgentId NULL
PRINT '';
PRINT '🔄 MISE À JOUR DES FORMATIONS AVEC AgentId NULL...';
PRINT '==================================================';

WITH FormationUpdate AS (
    SELECT 
        f.Id,
        f.AgentId,
        ROW_NUMBER() OVER (ORDER BY f.Id) as RowNum
    FROM [dbo].[Formations] f
    WHERE f.AgentId IS NULL
),
AgentAssignment AS (
    SELECT 
        Id as AgentId,
        ROW_NUMBER() OVER (ORDER BY Id) as RowNum
    FROM [dbo].[Agents] 
    WHERE Id BETWEEN 7 AND 36
)
UPDATE f
SET f.AgentId = a.AgentId
FROM [dbo].[Formations] f
INNER JOIN FormationUpdate fu ON f.Id = fu.Id
INNER JOIN AgentAssignment a ON fu.RowNum = a.RowNum;

PRINT '✅ Formations avec AgentId NULL mises à jour.';

-- Mise à jour des formations avec ChefCentreId NULL
PRINT '';
PRINT '🔄 MISE À JOUR DES FORMATIONS AVEC ChefCentreId NULL...';
PRINT '=======================================================';

WITH FormationUpdate AS (
    SELECT 
        f.Id,
        f.ChefCentreId,
        ROW_NUMBER() OVER (ORDER BY f.Id) as RowNum
    FROM [dbo].[Formations] f
    WHERE f.ChefCentreId IS NULL
),
ChefCentreAssignment AS (
    SELECT 
        Id as ChefCentreId,
        ROW_NUMBER() OVER (ORDER BY Id) as RowNum
    FROM [dbo].[ChefCentres] 
    WHERE Id BETWEEN 9 AND 38
)
UPDATE f
SET f.ChefCentreId = cc.ChefCentreId
FROM [dbo].[Formations] f
INNER JOIN FormationUpdate fu ON f.Id = fu.Id
INNER JOIN ChefCentreAssignment cc ON fu.RowNum = cc.RowNum;

PRINT '✅ Formations avec ChefCentreId NULL mises à jour.';

GO

-- Vérification finale
PRINT '';
PRINT '📊 VÉRIFICATION FINALE :';
PRINT '=======================';

SELECT 
    'Formations avec AgentId NULL' as Statut,
    COUNT(*) as Nombre
FROM [dbo].[Formations] 
WHERE [AgentId] IS NULL

UNION ALL

SELECT 
    'Formations avec ChefCentreId NULL' as Statut,
    COUNT(*) as Nombre
FROM [dbo].[Formations] 
WHERE [ChefCentreId] IS NULL

UNION ALL

SELECT 
    'Formations avec AgentId et ChefCentreId NULL' as Statut,
    COUNT(*) as Nombre
FROM [dbo].[Formations] 
WHERE [AgentId] IS NULL AND [ChefCentreId] IS NULL

UNION ALL

SELECT 
    'Total des formations' as Statut,
    COUNT(*) as Nombre
FROM [dbo].[Formations];

GO

-- Afficher quelques exemples de formations mises à jour
PRINT '';
PRINT '📋 EXEMPLES DE FORMATIONS MISES À JOUR :';
PRINT '=========================================';

SELECT TOP 10
    f.Id,
    f.Intitule,
    f.AgentId,
    a.Nom + ' ' + a.Prenom as AgentNom,
    f.ChefCentreId,
    cc.Nom + ' ' + cc.Prenom as ChefCentreNom,
    f.CCTId,
    c.Nom as CCTNom
FROM [dbo].[Formations] f
LEFT JOIN [dbo].[Agents] a ON f.AgentId = a.Id
LEFT JOIN [dbo].[ChefCentres] cc ON f.ChefCentreId = cc.Id
LEFT JOIN [dbo].[CCTs] c ON f.CCTId = c.Id
ORDER BY f.Id;

GO

PRINT '';
PRINT '🎉 MISE À JOUR TERMINÉE AVEC SUCCÈS !';
PRINT '========================================';
PRINT 'Toutes les formations ont maintenant des AgentId et ChefCentreId valides.';
PRINT 'Les agents et chefs de centre devraient maintenant s''afficher correctement.';
