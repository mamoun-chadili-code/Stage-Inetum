-- Diagnostic simple des relations CCT -> Lignes -> Équipements
-- Exécutez ce script pour voir le problème

-- 1. Voir la structure des tables
SELECT '=== STRUCTURE ===' as Info;
SELECT 'CCTs' as TableName, COUNT(*) as Total FROM CCTs;
SELECT 'Lignes' as TableName, COUNT(*) as Total FROM Lignes;
SELECT 'Equipements' as TableName, COUNT(*) as Total FROM Equipements;

-- 2. Voir les CCTs disponibles
SELECT '=== CCTs ===' as Info;
SELECT Id, Nom FROM CCTs ORDER BY Id;

-- 3. Voir les lignes et leurs CCTs
SELECT '=== LIGNES ===' as Info;
SELECT Id, NumeroLigne, CCTId FROM Lignes ORDER BY Id;

-- 4. Voir les équipements et leurs lignes
SELECT '=== ÉQUIPEMENTS ===' as Info;
SELECT Id, Marque, Modele, LigneId FROM Equipements ORDER BY Id;

-- 5. Test de filtrage par CCT
SELECT '=== TEST FILTRAGE ===' as Info;

-- Test CCT 9
SELECT 'CCT 9' as CCT, COUNT(*) as Equipements
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
WHERE l.CCTId = 9;

-- Test CCT 10
SELECT 'CCT 10' as CCT, COUNT(*) as Equipements
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
WHERE l.CCTId = 10;

-- Test CCT 11
SELECT 'CCT 11' as CCT, COUNT(*) as Equipements
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
WHERE l.CCTId = 11;

-- Test CCT 12
SELECT 'CCT 12' as CCT, COUNT(*) as Equipements
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
WHERE l.CCTId = 12;

-- Test CCT 13
SELECT 'CCT 13' as CCT, COUNT(*) as Equipements
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
WHERE l.CCTId = 13;

-- Test CCT 14
SELECT 'CCT 14' as CCT, COUNT(*) as Equipements
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
WHERE l.CCTId = 14;
