-- Script pour mettre à jour les chefs de centre avec les nouveaux niveaux de formation
-- Exécutez ce script après UpdateNiveauxFormation.sql

PRINT '=== MISE À JOUR DES CHEFS DE CENTRE AVEC NOUVEAUX NIVEAUX ===';

-- 1. Vérifier que les tables existent
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ChefCentres')
BEGIN
    PRINT '❌ La table ChefCentres n''existe pas.';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NiveauFormations')
BEGIN
    PRINT '❌ La table NiveauFormations n''existe pas.';
    RETURN;
END

-- 2. Afficher l'état actuel
PRINT 'État actuel des chefs de centre:';
SELECT 
    cc.Id,
    cc.Nom,
    cc.Prenom,
    cc.CIN,
    nf.Libelle as NiveauFormation
FROM ChefCentres cc
LEFT JOIN NiveauFormations nf ON cc.NiveauFormationInitialId = nf.Id
ORDER BY cc.Id;

-- 3. Mettre à jour les chefs de centre avec des niveaux de formation appropriés
UPDATE ChefCentres 
SET NiveauFormationInitialId = CASE 
    WHEN Id = 1 THEN 1  -- Khadija -> Technicien en mécanique automobile
    WHEN Id = 2 THEN 2  -- Mohamed -> Licence technique en mécanique
    WHEN Id = 3 THEN 3  -- SAID -> Ingénieur en mécanique automobile
    WHEN Id = 4 THEN 1  -- IDRISS -> Technicien en mécanique automobile
    WHEN Id = 5 THEN 2  -- YOUSSEF -> Licence technique en mécanique
    ELSE 1  -- Par défaut: Technicien en mécanique automobile
END
WHERE Id IN (1, 2, 3, 4, 5);

PRINT '✓ Niveaux de formation mis à jour pour les chefs de centre';

-- 4. Afficher le résultat final
PRINT 'État final des chefs de centre:';
SELECT 
    cc.Id,
    cc.Nom,
    cc.Prenom,
    cc.CIN,
    nf.Libelle as NiveauFormation
FROM ChefCentres cc
LEFT JOIN NiveauFormations nf ON cc.NiveauFormationInitialId = nf.Id
ORDER BY cc.Id;

PRINT '=== FIN DE LA MISE À JOUR ===';
PRINT 'Les chefs de centre ont maintenant des niveaux de formation spécifiques !'; 