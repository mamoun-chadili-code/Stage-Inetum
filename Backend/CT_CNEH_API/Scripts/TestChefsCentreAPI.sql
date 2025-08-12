-- Script pour tester l'API des chefs de centre
-- Ce script simule les requêtes que l'application fait

PRINT '=== TEST DE L''API CHEFS DE CENTRE ===';

-- 1. Vérifier que les données existent dans la base
PRINT '1. Vérification des données dans la base:';
SELECT COUNT(*) as 'Nombre de chefs de centre dans la base' FROM ChefsCentre;

-- 2. Simuler la requête que fait l'application
PRINT '2. Simulation de la requête API (GET /api/ChefsCentre):';
SELECT 
    cc.Id,
    cc.Nom,
    cc.Prenom,
    cc.CIN,
    c.Nom as CCT,
    cc.DateNaissance,
    nf.Libelle as NiveauFormation,
    cc.DateAffectationCCT,
    cc.AnneeAutorisation,
    cc.ReferenceApprobationCNEH,
    cc.DateApprobationCNEH,
    cc.Tel,
    cc.Mail,
    cc.CNSS,
    cc.Sexe
FROM ChefsCentre cc
LEFT JOIN CCTs c ON cc.CCTId = c.Id
LEFT JOIN NiveauxFormation nf ON cc.NiveauFormationInitialId = nf.Id
ORDER BY cc.Id;

-- 3. Vérifier les filtres possibles
PRINT '3. Test des filtres:';

-- Test par région
PRINT 'Filtre par région (ID 1):';
SELECT COUNT(*) as 'Nombre de chefs de centre dans la région 1'
FROM ChefsCentre cc
LEFT JOIN CCTs c ON cc.CCTId = c.Id
WHERE c.RegionId = 1;

-- Test par CCT
PRINT 'Filtre par CCT (ID 17):';
SELECT COUNT(*) as 'Nombre de chefs de centre dans le CCT 17'
FROM ChefsCentre cc
WHERE cc.CCTId = 17;

-- Test par niveau de formation
PRINT 'Filtre par niveau de formation (ID 1):';
SELECT COUNT(*) as 'Nombre de chefs de centre avec niveau 1'
FROM ChefsCentre cc
WHERE cc.NiveauFormationInitialId = 1;

-- 4. Vérifier la pagination
PRINT '4. Test de pagination (page 1, 10 éléments):';
DECLARE @Page INT = 1;
DECLARE @PageSize INT = 10;
DECLARE @Offset INT = (@Page - 1) * @PageSize;

SELECT 
    cc.Id,
    cc.Nom,
    cc.Prenom,
    cc.CIN,
    c.Nom as CCT,
    cc.DateNaissance,
    nf.Libelle as NiveauFormation,
    cc.DateAffectationCCT,
    cc.AnneeAutorisation,
    cc.Tel,
    cc.Mail,
    cc.CNSS,
    cc.Sexe
FROM ChefsCentre cc
LEFT JOIN CCTs c ON cc.CCTId = c.Id
LEFT JOIN NiveauxFormation nf ON cc.NiveauFormationInitialId = nf.Id
ORDER BY cc.Id
OFFSET @Offset ROWS
FETCH NEXT @PageSize ROWS ONLY;

-- 5. Compter le total pour les headers de pagination
PRINT '5. Total pour pagination:';
SELECT COUNT(*) as 'TotalCount' FROM ChefsCentre;

PRINT '=== FIN DU TEST ===';
PRINT 'Si les données s''affichent ici mais pas dans l''application,';
PRINT 'le problème vient de la communication frontend-backend.'; 