-- Script pour vérifier les relations CCT -> Lignes -> Équipements
-- Exécutez ce script dans votre base de données pour diagnostiquer le problème

-- 1. Vérifier la structure des tables
SELECT '=== STRUCTURE DES TABLES ===' as Info;

SELECT 'CCTs' as TableName, COUNT(*) as TotalRows FROM CCTs;
SELECT 'Lignes' as TableName, COUNT(*) as TotalRows FROM Lignes;
SELECT 'Equipements' as TableName, COUNT(*) as TotalRows FROM Equipements;

-- 2. Vérifier les CCTs disponibles
SELECT '=== CCTs DISPONIBLES ===' as Info;
SELECT Id, Nom, Code FROM CCTs ORDER BY Id;

-- 3. Vérifier les lignes et leurs CCTs
SELECT '=== LIGNES ET LEURS CCTs ===' as Info;
SELECT 
    l.Id as LigneId,
    l.NumeroLigne,
    l.CCTId,
    c.Nom as CCTNom,
    c.Code as CCTCode
FROM Lignes l
LEFT JOIN CCTs c ON l.CCTId = c.Id
ORDER BY l.Id;

-- 4. Vérifier les équipements et leurs lignes
SELECT '=== ÉQUIPEMENTS ET LEURS LIGNES ===' as Info;
SELECT 
    e.Id as EquipementId,
    e.Marque,
    e.Modele,
    e.LigneId,
    l.NumeroLigne,
    l.CCTId,
    c.Nom as CCTNom
FROM Equipements e
LEFT JOIN Lignes l ON e.LigneId = l.Id
LEFT JOIN CCTs c ON l.CCTId = c.Id
ORDER BY e.Id;

-- 5. Test de filtrage par CCT (simulation de notre logique)
SELECT '=== TEST FILTRAGE PAR CCT ===' as Info;

-- Test CCT 14
SELECT 'CCT 14' as CCTTest, COUNT(*) as TotalEquipements
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
WHERE l.CCTId = 14;

-- Test CCT 11  
SELECT 'CCT 11' as CCTTest, COUNT(*) as TotalEquipements
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
WHERE l.CCTId = 11;

-- Test CCT 9
SELECT 'CCT 9' as CCTTest, COUNT(*) as TotalEquipements
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
WHERE l.CCTId = 9;

-- 6. Vérifier s'il y a des lignes sans CCT
SELECT '=== LIGNES SANS CCT ===' as Info;
SELECT COUNT(*) as LignesSansCCT
FROM Lignes l
LEFT JOIN CCTs c ON l.CCTId = c.Id
WHERE c.Id IS NULL;

-- 7. Vérifier s'il y a des équipements sans ligne
SELECT '=== ÉQUIPEMENTS SANS LIGNE ===' as Info;
SELECT COUNT(*) as EquipementsSansLigne
FROM Equipements e
LEFT JOIN Lignes l ON e.LigneId = l.Id
WHERE l.Id IS NULL;
