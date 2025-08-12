-- Script pour mettre à jour les niveaux de formation avec des options plus spécifiques
-- Exécutez ce script pour avoir des niveaux de formation plus réalistes

PRINT '=== MISE À JOUR DES NIVEAUX DE FORMATION ===';

-- 1. Vérifier que la table existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NiveauFormations')
BEGIN
    PRINT '❌ La table NiveauFormations n''existe pas. Exécutez d''abord SetupChefsCentreComplete.sql';
    RETURN;
END

-- 2. Supprimer les anciens niveaux
DELETE FROM NiveauFormations WHERE Id > 0;
PRINT '✓ Anciens niveaux de formation supprimés';

-- 3. Insérer les nouveaux niveaux de formation
INSERT INTO NiveauFormations (Libelle, Code, Cible) VALUES
('Technicien en mécanique automobile', 'TECH_MEC', 'Techniciens spécialisés'),
('Licence technique en mécanique', 'LIC_TECH', 'Techniciens supérieurs'),
('Ingénieur en mécanique automobile', 'ING_MEC', 'Ingénieurs spécialisés'),
('Master en génie mécanique', 'MAST_GEN', 'Cadres supérieurs'),
('Doctorat en mécanique', 'DOC_MEC', 'Experts et chercheurs'),
('Formation continue - Diagnostic électronique', 'CONT_DIAG', 'Formation continue'),
('Formation continue - Systèmes de sécurité', 'CONT_SEC', 'Formation continue'),
('Formation continue - Véhicules hybrides', 'CONT_HYBR', 'Formation continue');

PRINT '✓ 8 nouveaux niveaux de formation ajoutés';

-- 4. Afficher les niveaux créés
PRINT 'Niveaux de formation créés:';
SELECT 
    Id,
    Libelle,
    Code,
    Cible
FROM NiveauFormations
ORDER BY Id;

-- 5. Statistiques
PRINT 'Statistiques:';
SELECT COUNT(*) as 'Nombre total de niveaux de formation' FROM NiveauFormations;

PRINT '=== FIN DE LA MISE À JOUR ===';
PRINT 'Les niveaux de formation sont maintenant plus spécifiques et réalistes !'; 