-- Script pour vérifier les données dans la base
-- Exécute ce script dans SSMS pour diagnostiquer les problèmes

-- 1. Vérifier les CCTs et leurs relations
SELECT 
    c.Id,
    c.Nom,
    c.Agrement,
    c.VilleId,
    v.Nom as VilleNom,
    c.ReseauId,
    r.Nom as ReseauNom,
    c.StatutId,
    s.Libelle as StatutLibelle,
    c.ProvinceId,
    p.Libelle as ProvinceLibelle,
    c.RegionId,
    reg.Libelle as RegionLibelle
FROM CCTs c
LEFT JOIN Villes v ON c.VilleId = v.Id
LEFT JOIN Reseaux r ON c.ReseauId = r.Id
LEFT JOIN StatutRCs s ON c.StatutId = s.Id
LEFT JOIN Provinces p ON c.ProvinceId = p.Id
LEFT JOIN Regions reg ON c.RegionId = reg.Id
ORDER BY c.Id;

-- 2. Vérifier les tables de référence
PRINT '=== VILLES ===';
SELECT * FROM Villes;

PRINT '=== RESEAUX ===';
SELECT * FROM Reseaux;

PRINT '=== STATUTS ===';
SELECT * FROM StatutRCs;

PRINT '=== PROVINCES ===';
SELECT * FROM Provinces;

PRINT '=== REGIONS ===';
SELECT * FROM Regions;

PRINT '=== CATEGORIES ===';
SELECT * FROM CategorieCCTs; 