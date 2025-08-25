-- Test rapide des relations CCT -> Lignes -> Équipements
-- Exécutez ce script pour voir rapidement le problème

-- 1. Voir les CCTs disponibles
SELECT 'CCTs disponibles:' as Info;
SELECT Id, Nom FROM CCTs ORDER BY Id;

-- 2. Voir les lignes et leurs CCTs
SELECT 'Lignes et leurs CCTs:' as Info;
SELECT Id, NumeroLigne, CCTId FROM Lignes ORDER BY Id;

-- 3. Voir les équipements et leurs lignes
SELECT 'Équipements et leurs lignes:' as Info;
SELECT Id, Marque, Modele, LigneId FROM Equipements ORDER BY Id;

-- 4. Test simple : combien d'équipements par CCT ?
SELECT 'Test filtrage par CCT:' as Info;
SELECT 
    l.CCTId,
    COUNT(e.Id) as NombreEquipements
FROM Lignes l
LEFT JOIN Equipements e ON l.Id = e.LigneId
GROUP BY l.CCTId
ORDER BY l.CCTId;
