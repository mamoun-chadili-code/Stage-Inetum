-- Script pour tester toutes les APIs nécessaires au module Formation
-- Vérifie que toutes les données de référence sont disponibles

USE CT_CNEH_DB;
GO

PRINT '=== TEST DES APIS POUR LE MODULE FORMATION ===';
PRINT '';

-- 1. Test des Agents
PRINT '1. TEST API AGENTS';
PRINT '-------------------';
SELECT 
    'Agents' AS TableName,
    COUNT(*) AS TotalCount,
    'Disponible' AS Status
FROM Agents;

PRINT 'Exemple d''agents :';
SELECT TOP 5 Id, Nom, Prenom, CIN FROM Agents ORDER BY Id;
PRINT '';

-- 2. Test des CCTs
PRINT '2. TEST API CCTS';
PRINT '----------------';
SELECT 
    'CCTs' AS TableName,
    COUNT(*) AS TotalCount,
    'Disponible' AS Status
FROM CCTs;

PRINT 'Exemple de CCTs :';
SELECT TOP 5 Id, Nom, Agrement FROM CCTs ORDER BY Id;
PRINT '';

-- 3. Test des Chefs de Centre
PRINT '3. TEST API CHEFS CENTRE';
PRINT '-------------------------';
SELECT 
    'ChefCentres' AS TableName,
    COUNT(*) AS TotalCount,
    'Disponible' AS Status
FROM ChefCentres;

PRINT 'Exemple de chefs de centre :';
SELECT TOP 5 Id, Nom, Prenom FROM ChefCentres ORDER BY Id;
PRINT '';

-- 4. Test des Types de Formation
PRINT '4. TEST API TYPES FORMATION';
PRINT '-----------------------------';
SELECT 
    'TypesFormation' AS TableName,
    COUNT(*) AS TotalCount,
    'Disponible' AS Status
FROM TypesFormation;

PRINT 'Exemple de types de formation :';
SELECT TOP 5 Id, Libelle FROM TypesFormation ORDER BY Id;
PRINT '';

-- 5. Test des Formations
PRINT '5. TEST API FORMATIONS';
PRINT '----------------------';
SELECT 
    'Formations' AS TableName,
    COUNT(*) AS TotalCount,
    'Disponible' AS Status
FROM Formations;

PRINT 'Exemple de formations :';
SELECT TOP 3 Id, Intitule, CCTId, AgentId, ChefCentreId, TypeFormationId FROM Formations ORDER BY Id;
PRINT '';

-- 6. Vérification des relations
PRINT '6. VÉRIFICATION DES RELATIONS';
PRINT '------------------------------';
SELECT 
    'Formations avec relations complètes' AS Description,
    COUNT(*) AS Count
FROM Formations f
LEFT JOIN CCTs c ON f.CCTId = c.Id
LEFT JOIN Agents a ON f.AgentId = a.Id
LEFT JOIN ChefCentres cc ON f.ChefCentreId = cc.Id
LEFT JOIN TypesFormation tf ON f.TypeFormationId = tf.Id
WHERE c.Id IS NOT NULL AND a.Id IS NOT NULL AND tf.Id IS NOT NULL;

SELECT 
    'Formations avec relations manquantes' AS Description,
    COUNT(*) AS Count
FROM Formations f
LEFT JOIN CCTs c ON f.CCTId = c.Id
LEFT JOIN Agents a ON f.AgentId = a.Id
LEFT JOIN ChefCentres cc ON f.ChefCentreId = cc.Id
LEFT JOIN TypesFormation tf ON f.TypeFormationId = tf.Id
WHERE c.Id IS NULL OR a.Id IS NULL OR tf.Id IS NULL;

PRINT '';
PRINT '=== RÉSUMÉ ===';
PRINT '📋 APIs à tester dans le navigateur :';
PRINT '1. http://localhost:7000/api/Agents';
PRINT '2. http://localhost:7000/api/CCTs';
PRINT '3. http://localhost:7000/api/ChefsCentre';
PRINT '4. http://localhost:7000/api/Formations/types';
PRINT '5. http://localhost:7000/api/Formations';
PRINT '';
PRINT '🔧 Si une API renvoie 404, le problème vient du backend';
PRINT '🔧 Si une API renvoie des données vides, le problème vient de la base de données';
PRINT '🔧 Si une API fonctionne mais le frontend ne l''utilise pas, le problème vient du frontend'; 