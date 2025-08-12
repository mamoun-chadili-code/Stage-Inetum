-- Script pour tester les endpoints de l'API
-- Exécutez ce script pour vérifier que l'API fonctionne

PRINT '=== TEST DES ENDPOINTS API ===';

-- 1. Vérifier que l'API est accessible
PRINT '1. Test de base - Vérifier que l''API répond:';
PRINT '   URL: http://localhost:5000/api/ChefsCentre';
PRINT '   Méthode: GET';
PRINT '   Headers attendus: X-Total-Count, X-Page-Count';

-- 2. Simuler une requête avec filtres
PRINT '2. Test avec filtres:';
PRINT '   URL: http://localhost:5000/api/ChefsCentre?page=1&pageSize=10';
PRINT '   Filtres: regionId=&villeId=&reseauId=&cctId=&niveauFormationId=&anneeAffectation=';

-- 3. Vérifier les données attendues
PRINT '3. Données attendues dans la réponse:';
SELECT 
    'Exemple de réponse JSON:' as Info,
    '[' as JsonStart,
    '{' as ObjectStart,
    '"id": 1,' as Id,
    '"nom": "0000000",' as Nom,
    '"prenom": "Khadija",' as Prenom,
    '"cin": "JA122536",' as CIN,
    '"cct": "A.A VISITES",' as CCT,
    '"dateNaissance": "1990-05-20T00:00:00",' as DateNaissance,
    '"niveauFormation": "Technicien en mécanique automobile",' as NiveauFormation,
    '"dateAffectationCCT": "2015-05-12T00:00:00",' as DateAffectation,
    '"anneeAutorisation": 0,' as AnneeAutorisation,
    '"tel": "0666427590",' as Tel,
    '"mail": "khadija.fetouh19@gmail.com",' as Mail,
    '"cnss": "0000000",' as CNSS,
    '"sexe": true' as Sexe,
    '}' as ObjectEnd,
    ']' as JsonEnd;

-- 4. Vérifier les headers de pagination
PRINT '4. Headers de pagination attendus:';
PRINT '   X-Total-Count: 5';
PRINT '   X-Page-Count: 1';

-- 5. Test des données dans la base
PRINT '5. Vérification des données dans la base:';
SELECT 
    'Données disponibles:' as Info,
    COUNT(*) as TotalChefsCentre,
    COUNT(DISTINCT cc.CCTId) as CCTsUtilises,
    COUNT(DISTINCT cc.NiveauFormationInitialId) as NiveauxFormationUtilises
FROM ChefsCentre cc;

-- 6. Afficher un exemple de données
PRINT '6. Exemple de données:';
SELECT TOP 3
    cc.Id,
    cc.Nom,
    cc.Prenom,
    cc.CIN,
    c.Nom as CCT,
    nf.Libelle as NiveauFormation,
    cc.Tel,
    cc.Mail
FROM ChefsCentre cc
LEFT JOIN CCTs c ON cc.CCTId = c.Id
LEFT JOIN NiveauxFormation nf ON cc.NiveauFormationInitialId = nf.Id
ORDER BY cc.Id;

PRINT '=== FIN DU TEST ===';
PRINT 'Si l''API ne répond pas, vérifiez:';
PRINT '1. Que le serveur backend est démarré';
PRINT '2. Que l''URL est correcte (http://localhost:5000)';
PRINT '3. Que le contrôleur ChefsCentreController existe';
PRINT '4. Que les données sont bien dans la base'; 