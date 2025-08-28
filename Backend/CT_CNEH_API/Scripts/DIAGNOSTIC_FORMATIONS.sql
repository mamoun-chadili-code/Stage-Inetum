-- =====================================================
-- SCRIPT DE DIAGNOSTIC DES FORMATIONS
-- Vérification de l'état actuel des relations
-- =====================================================

USE [CT_CNEH_DB];
GO

PRINT '🔍 DIAGNOSTIC DES FORMATIONS';
PRINT '=============================';
PRINT '';

-- 1. Vérifier le nombre total de formations
PRINT '1️⃣ NOMBRE TOTAL DE FORMATIONS :';
PRINT '================================';
SELECT COUNT(*) as 'Total des formations' FROM [dbo].[Formations];
GO

-- 2. Vérifier les formations avec AgentId NULL
PRINT '';
PRINT '2️⃣ FORMATIONS AVEC AgentId NULL :';
PRINT '==================================';
SELECT 
    COUNT(*) as 'Nombre de formations avec AgentId NULL',
    (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM [dbo].[Formations])) as 'Pourcentage'
FROM [dbo].[Formations] 
WHERE [AgentId] IS NULL;
GO

-- 3. Vérifier les formations avec ChefCentreId NULL
PRINT '';
PRINT '3️⃣ FORMATIONS AVEC ChefCentreId NULL :';
PRINT '=======================================';
SELECT 
    COUNT(*) as 'Nombre de formations avec ChefCentreId NULL',
    (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM [dbo].[Formations])) as 'Pourcentage'
FROM [dbo].[Formations] 
WHERE [ChefCentreId] IS NULL;
GO

-- 4. Vérifier les formations avec les deux NULL
PRINT '';
PRINT '4️⃣ FORMATIONS AVEC AgentId ET ChefCentreId NULL :';
PRINT '==================================================';
SELECT 
    COUNT(*) as 'Nombre de formations avec les deux NULL',
    (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM [dbo].[Formations])) as 'Pourcentage'
FROM [dbo].[Formations] 
WHERE [AgentId] IS NULL AND [ChefCentreId] IS NULL;
GO

-- 5. Vérifier les agents disponibles
PRINT '';
PRINT '5️⃣ AGENTS DISPONIBLES :';
PRINT '=======================';
SELECT 
    COUNT(*) as 'Total des agents',
    MIN(Id) as 'ID minimum',
    MAX(Id) as 'ID maximum'
FROM [dbo].[Agents];
GO

-- 6. Vérifier les chefs de centre disponibles
PRINT '';
PRINT '6️⃣ CHEFS DE CENTRE DISPONIBLES :';
PRINT '=================================';
SELECT 
    COUNT(*) as 'Total des chefs de centre',
    MIN(Id) as 'ID minimum',
    MAX(Id) as 'ID maximum'
FROM [dbo].[ChefCentres];
GO

-- 7. Afficher quelques exemples de formations problématiques
PRINT '';
PRINT '7️⃣ EXEMPLES DE FORMATIONS PROBLÉMATIQUES :';
PRINT '==========================================';
SELECT TOP 5
    f.Id,
    f.Intitule,
    f.AgentId,
    CASE 
        WHEN f.AgentId IS NULL THEN '❌ NULL'
        WHEN a.Id IS NULL THEN '❌ Agent inexistant'
        ELSE '✅ ' + a.Nom + ' ' + a.Prenom
    END as AgentStatus,
    f.ChefCentreId,
    CASE 
        WHEN f.ChefCentreId IS NULL THEN '❌ NULL'
        WHEN cc.Id IS NULL THEN '❌ Chef de centre inexistant'
        ELSE '✅ ' + cc.Nom + ' ' + cc.Prenom
    END as ChefCentreStatus,
    f.CCTId,
    CASE 
        WHEN f.CCTId IS NULL THEN '❌ NULL'
        WHEN c.Id IS NULL THEN '❌ CCT inexistant'
        ELSE '✅ ' + c.Nom
    END as CCTStatus
FROM [dbo].[Formations] f
LEFT JOIN [dbo].[Agents] a ON f.AgentId = a.Id
LEFT JOIN [dbo].[ChefCentres] cc ON f.ChefCentreId = cc.Id
LEFT JOIN [dbo].[CCTs] c ON f.CCTId = c.Id
WHERE f.AgentId IS NULL OR f.ChefCentreId IS NULL OR a.Id IS NULL OR cc.Id IS NULL OR c.Id IS NULL
ORDER BY f.Id;
GO

-- 8. Vérifier la cohérence des IDs
PRINT '';
PRINT '8️⃣ VÉRIFICATION DE LA COHÉRENCE DES IDs :';
PRINT '==========================================';

-- Agents avec des formations
SELECT 
    'Agents avec formations' as Type,
    COUNT(DISTINCT a.Id) as Nombre
FROM [dbo].[Agents] a
INNER JOIN [dbo].[Formations] f ON a.Id = f.AgentId

UNION ALL

-- Agents sans formations
SELECT 
    'Agents sans formations' as Type,
    COUNT(DISTINCT a.Id) as Nombre
FROM [dbo].[Agents] a
LEFT JOIN [dbo].[Formations] f ON a.Id = f.AgentId
WHERE f.Id IS NULL

UNION ALL

-- Chefs de centre avec formations
SELECT 
    'Chefs de centre avec formations' as Type,
    COUNT(DISTINCT cc.Id) as Nombre
FROM [dbo].[ChefCentres] cc
INNER JOIN [dbo].[Formations] f ON cc.Id = f.ChefCentreId

UNION ALL

-- Chefs de centre sans formations
SELECT 
    'Chefs de centre sans formations' as Type,
    COUNT(DISTINCT cc.Id) as Nombre
FROM [dbo].[ChefCentres] cc
LEFT JOIN [dbo].[Formations] f ON cc.Id = f.ChefCentreId
WHERE f.Id IS NULL;
GO

PRINT '';
PRINT '🔍 DIAGNOSTIC TERMINÉ !';
PRINT '=======================';
PRINT 'Utilisez le script UPDATE_FORMATIONS_AGENTS.sql pour corriger les problèmes.';
