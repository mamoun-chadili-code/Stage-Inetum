-- Script de test pour vérifier le backend
-- Exécutez ce script pour vérifier que toutes les données nécessaires existent

USE CT_CNEH_DB;
GO

PRINT '=== TEST DU BACKEND ===';
PRINT '';

-- Vérifier les CCTs
PRINT '--- CCTs ---';
SELECT COUNT(*) as NombreCCTs FROM CCTs;
SELECT TOP 5 Id, Nom FROM CCTs ORDER BY Id;
PRINT '';

-- Vérifier les catégories
PRINT '--- Catégories CCT ---';
SELECT COUNT(*) as NombreCategories FROM CategorieCCTs;
SELECT Id, Libelle FROM CategorieCCTs ORDER BY Id;
PRINT '';

-- Vérifier les statuts administratifs
PRINT '--- Statuts Administratifs ---';
SELECT COUNT(*) as NombreStatuts FROM StatutAdministratifs;
SELECT Id, Libelle FROM StatutAdministratifs ORDER BY Id;
PRINT '';

-- Vérifier les agents
PRINT '--- Agents ---';
SELECT COUNT(*) as NombreAgents FROM Agents;
IF (SELECT COUNT(*) FROM Agents) > 0
BEGIN
    SELECT TOP 5 Id, Nom, Prenom, CIN FROM Agents ORDER BY Id;
END
ELSE
BEGIN
    PRINT 'Aucun agent trouvé.';
END
PRINT '';

-- Vérifier les régions
PRINT '--- Régions ---';
SELECT COUNT(*) as NombreRegions FROM Regions;
SELECT Id, Nom FROM Regions ORDER BY Id;
PRINT '';

-- Vérifier les villes
PRINT '--- Villes ---';
SELECT COUNT(*) as NombreVilles FROM Villes;
SELECT TOP 5 Id, Nom FROM Villes ORDER BY Id;
PRINT '';

-- Vérifier les réseaux
PRINT '--- Réseaux ---';
SELECT COUNT(*) as NombreReseaux FROM Reseaux;
SELECT Id, Nom FROM Reseaux ORDER BY Id;
PRINT '';

PRINT '=== FIN DU TEST ===';
PRINT 'Si toutes les données sont présentes, le backend devrait fonctionner correctement.'; 