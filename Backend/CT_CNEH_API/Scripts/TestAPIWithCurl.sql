-- Script avec des commandes curl pour tester l'API
-- Exécutez ces commandes dans un terminal pour tester l'API

PRINT '=== COMMANDES CURL POUR TESTER L''API ===';

PRINT '1. Test de base - Vérifier que l''API répond:';
PRINT 'curl -X GET "http://localhost:5000/api/ChefsCentre" -H "Content-Type: application/json"';

PRINT '2. Test avec pagination:';
PRINT 'curl -X GET "http://localhost:5000/api/ChefsCentre?page=1&pageSize=10" -H "Content-Type: application/json"';

PRINT '3. Test avec filtres:';
PRINT 'curl -X GET "http://localhost:5000/api/ChefsCentre?page=1&pageSize=10&regionId=&villeId=&reseauId=&cctId=&niveauFormationId=&anneeAffectation=" -H "Content-Type: application/json"';

PRINT '4. Test d''un chef de centre spécifique:';
PRINT 'curl -X GET "http://localhost:5000/api/ChefsCentre/1" -H "Content-Type: application/json"';

PRINT '5. Test des niveaux de formation:';
PRINT 'curl -X GET "http://localhost:5000/api/NiveauxFormation" -H "Content-Type: application/json"';

PRINT '6. Test des CCTs:';
PRINT 'curl -X GET "http://localhost:5000/api/CCTs" -H "Content-Type: application/json"';

PRINT '=== ALTERNATIVE AVEC POWERSHELL ===';

PRINT '1. Test de base avec PowerShell:';
PRINT 'Invoke-RestMethod -Uri "http://localhost:5000/api/ChefsCentre" -Method GET';

PRINT '2. Test avec pagination:';
PRINT 'Invoke-RestMethod -Uri "http://localhost:5000/api/ChefsCentre?page=1&pageSize=10" -Method GET';

PRINT '=== ALTERNATIVE AVEC BROWSER ===';

PRINT '1. Ouvrez votre navigateur et allez à:';
PRINT 'http://localhost:5000/api/ChefsCentre';

PRINT '2. Ou avec Swagger (si disponible):';
PRINT 'http://localhost:5000/swagger';

PRINT '=== VÉRIFICATION DES DONNÉES ===';

-- Vérifier les données dans la base
SELECT 
    'Données dans la base:' as Info,
    COUNT(*) as TotalChefsCentre
FROM ChefsCentre;

-- Afficher les premiers chefs de centre
SELECT TOP 3
    Id,
    Nom,
    Prenom,
    CIN,
    Tel,
    Mail
FROM ChefsCentre
ORDER BY Id;

PRINT '=== FIN DES TESTS ===';
PRINT 'Si l''API ne répond pas, vérifiez:';
PRINT '1. Que le serveur backend est démarré (dotnet run)';
PRINT '2. Que le port est correct (généralement 5000 ou 5001)';
PRINT '3. Que l''URL est accessible dans le navigateur';
PRINT '4. Que les logs du serveur ne montrent pas d''erreurs'; 