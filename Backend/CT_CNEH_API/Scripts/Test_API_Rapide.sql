-- Test rapide de l'API Historique CCT
-- Vérifier que les données sont accessibles

USE [CT_CNEH_DB]
GO

PRINT '=== TEST RAPIDE API HISTORIQUE CCT ==='
PRINT ''

-- 1. Vérifier que les données existent toujours
SELECT COUNT(*) AS TotalHistoriques FROM HistoriqueCCTs

-- 2. Afficher un résumé des données
SELECT 
    'Total CCTs' AS Type,
    COUNT(*) AS Nombre
FROM CCTs
UNION ALL
SELECT 
    'Total Réseaux',
    COUNT(*)
FROM Reseaux
UNION ALL
SELECT 
    'Total Historiques',
    COUNT(*)
FROM HistoriqueCCTs

-- 3. Afficher les 4 historiques existants
PRINT ''
PRINT '=== HISTORIQUES EXISTANTS ==='
SELECT 
    h.Id,
    c.Nom AS CCTNom,
    r.Nom AS ReseauNom,
    h.DateDebut AS DateRalliement,
    h.DateFin AS DateFinRalliement,
    CASE 
        WHEN h.DateFin IS NULL THEN '🟢 Ralliement actif'
        ELSE '🔴 Ralliement terminé'
    END AS Statut
FROM HistoriqueCCTs h
INNER JOIN CCTs c ON h.CCTId = c.Id
INNER JOIN Reseaux r ON h.ReseauId = r.Id
ORDER BY h.DateDebut DESC

PRINT ''
PRINT '=== INSTRUCTIONS POUR TESTER L''API ==='
PRINT '1. Backend doit être démarré: dotnet run'
PRINT '2. Ouvrir: https://localhost:7000/swagger'
PRINT '3. Tester: GET /api/HistoriqueCCTs'
PRINT '4. Vérifier la réponse dans la console du navigateur'
PRINT '5. Si l''API retourne des données mais le frontend affiche "Aucun historique",'
PRINT '   le problème est dans le service frontend ou la configuration CORS'

GO
