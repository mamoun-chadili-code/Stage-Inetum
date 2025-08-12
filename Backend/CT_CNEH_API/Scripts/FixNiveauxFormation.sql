-- Script pour corriger les niveaux de formation
-- Ce script gère correctement les contraintes de clé étrangère

PRINT '=== CORRECTION DES NIVEAUX DE FORMATION ===';

-- 1. Vérifier l'état actuel
PRINT 'État actuel des niveaux de formation:';
SELECT Id, Libelle, Code, Cible FROM NiveauFormations ORDER BY Id;

PRINT 'État actuel des chefs de centre:';
SELECT 
    cc.Id,
    cc.Nom,
    cc.Prenom,
    cc.CIN,
    nf.Libelle as NiveauFormation,
    cc.NiveauFormationInitialId
FROM ChefCentres cc
LEFT JOIN NiveauFormations nf ON cc.NiveauFormationInitialId = nf.Id
ORDER BY cc.Id;

-- 2. Mettre à jour les chefs de centre avec les nouveaux niveaux
-- D'abord, mettre à jour les références vers les nouveaux niveaux
UPDATE ChefCentres 
SET NiveauFormationInitialId = CASE 
    WHEN Id = 1 THEN (SELECT Id FROM NiveauFormations WHERE Libelle = 'Technicien en mécanique automobile')
    WHEN Id = 2 THEN (SELECT Id FROM NiveauFormations WHERE Libelle = 'Licence technique en mécanique')
    WHEN Id = 3 THEN (SELECT Id FROM NiveauFormations WHERE Libelle = 'Ingénieur en mécanique automobile')
    WHEN Id = 4 THEN (SELECT Id FROM NiveauFormations WHERE Libelle = 'Technicien en mécanique automobile')
    WHEN Id = 5 THEN (SELECT Id FROM NiveauFormations WHERE Libelle = 'Licence technique en mécanique')
    ELSE (SELECT Id FROM NiveauFormations WHERE Libelle = 'Technicien en mécanique automobile')
END
WHERE Id IN (1, 2, 3, 4, 5);

PRINT '✓ Chefs de centre mis à jour avec les nouveaux niveaux';

-- 3. Maintenant, supprimer les anciens niveaux qui ne sont plus utilisés
DELETE FROM NiveauFormations 
WHERE Libelle IN ('Débutant', 'Intermédiaire', 'Expert')
AND Id NOT IN (SELECT DISTINCT NiveauFormationInitialId FROM ChefCentres WHERE NiveauFormationInitialId IS NOT NULL);

PRINT '✓ Anciens niveaux supprimés';

-- 4. Afficher le résultat final
PRINT 'État final des niveaux de formation:';
SELECT Id, Libelle, Code, Cible FROM NiveauFormations ORDER BY Id;

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

PRINT '=== FIN DE LA CORRECTION ===';
PRINT 'Les niveaux de formation sont maintenant corrects !'; 