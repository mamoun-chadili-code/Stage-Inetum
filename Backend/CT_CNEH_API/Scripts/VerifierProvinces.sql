-- Script pour vérifier les données des provinces
-- Exécute ce script dans SSMS pour diagnostiquer le problème

-- 1. Vérifier si la table Provinces existe et contient des données
SELECT '=== PROVINCES ===' as Info;
SELECT * FROM Provinces;

-- 2. Vérifier les régions
SELECT '=== REGIONS ===' as Info;
SELECT * FROM Regions;

-- 3. Vérifier la relation Provinces-Regions
SELECT '=== PROVINCES AVEC REGIONS ===' as Info;
SELECT 
    p.Id,
    p.Libelle as Province,
    p.Code as CodeProvince,
    r.Libelle as Region,
    r.Code as CodeRegion
FROM Provinces p
LEFT JOIN Regions r ON p.RegionId = r.Id
ORDER BY p.Id;

-- 4. Insérer des provinces si la table est vide
IF NOT EXISTS (SELECT * FROM Provinces)
BEGIN
    PRINT 'Table Provinces vide, insertion de données...';
    
    INSERT INTO Provinces (Libelle, Code, RegionId) VALUES 
    ('MEDIOUNA', 'MDN', 1),
    ('KENITRA', 'KNT', 2),
    ('Fquih ben salah', 'FBS', 3);
    
    PRINT 'Provinces insérées avec succès !';
END
ELSE
BEGIN
    PRINT 'Table Provinces contient déjà des données.';
END

-- 5. Vérifier le résultat final
SELECT '=== RESULTAT FINAL ===' as Info;
SELECT 
    p.Id,
    p.Libelle as Province,
    p.Code as CodeProvince,
    r.Libelle as Region
FROM Provinces p
LEFT JOIN Regions r ON p.RegionId = r.Id
ORDER BY p.Id; 