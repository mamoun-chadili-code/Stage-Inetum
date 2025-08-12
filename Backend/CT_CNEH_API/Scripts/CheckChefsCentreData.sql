-- Script pour vérifier les données des chefs de centre
-- Exécutez ce script pour voir si les données existent

PRINT '=== VÉRIFICATION DES DONNÉES CHEFS DE CENTRE ===';

-- 1. Vérifier si la table ChefsCentre existe
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ChefsCentre')
BEGIN
    PRINT '✓ La table ChefsCentre existe';
    
    -- 2. Compter le nombre de chefs de centre
    DECLARE @CountChefsCentre INT = (SELECT COUNT(*) FROM ChefsCentre);
    PRINT 'Nombre de chefs de centre dans la table: ' + CAST(@CountChefsCentre AS VARCHAR);
    
    -- 3. Si aucun chef de centre, afficher un message
    IF @CountChefsCentre = 0
    BEGIN
        PRINT '⚠ Aucun chef de centre trouvé. Exécutez SeedDataChefsCentre.sql';
        
        -- 4. Vérifier les CCTs disponibles pour l'insertion
        PRINT 'CCTs disponibles pour l''insertion:';
        SELECT TOP 10 Id, Nom FROM CCTs ORDER BY Id;
        
        -- 5. Vérifier les niveaux de formation disponibles
        PRINT 'Niveaux de formation disponibles:';
        SELECT Id, Libelle, Code FROM NiveauxFormation ORDER BY Id;
    END
    ELSE
    BEGIN
        -- 6. Afficher les chefs de centre existants
        PRINT 'Chefs de centre existants:';
        SELECT 
            cc.Id,
            cc.Nom,
            cc.Prenom,
            cc.CIN,
            c.Nom as CCT,
            cc.DateAffectationCCT,
            cc.AnneeAutorisation,
            cc.Tel,
            cc.Mail,
            cc.CNSS,
            CASE cc.Sexe WHEN 1 THEN 'Féminin' ELSE 'Masculin' END as Sexe,
            nf.Libelle as NiveauFormation
        FROM ChefsCentre cc
        LEFT JOIN CCTs c ON cc.CCTId = c.Id
        LEFT JOIN NiveauxFormation nf ON cc.NiveauFormationInitialId = nf.Id
        ORDER BY cc.Id;
    END
END
ELSE
BEGIN
    PRINT '❌ La table ChefsCentre n''existe pas';
    PRINT 'Exécutez d''abord SetupChefsCentreComplete.sql';
END

-- 7. Vérifier les contraintes de clé étrangère
PRINT 'Contraintes de clé étrangère:';
SELECT 
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE TABLE_NAME = 'ChefsCentre';

PRINT '=== FIN DE LA VÉRIFICATION ==='; 