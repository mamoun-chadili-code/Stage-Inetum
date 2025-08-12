-- Script simplifié pour ajouter des chefs de centre de test
-- Exécutez ce script pour ajouter des données de test

PRINT '=== AJOUT DE CHEFS DE CENTRE DE TEST ===';

-- 1. Vérifier que les tables existent
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ChefsCentre')
BEGIN
    PRINT '❌ La table ChefsCentre n''existe pas. Exécutez d''abord SetupChefsCentreComplete.sql';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    PRINT '❌ La table CCTs n''existe pas.';
    RETURN;
END

-- 2. Récupérer les premiers CCTs disponibles
DECLARE @CCT1 INT, @CCT2 INT, @CCT3 INT, @CCT4 INT, @CCT5 INT;

SELECT @CCT1 = Id FROM CCTs WHERE Id = 17;
SELECT @CCT2 = Id FROM CCTs WHERE Id = 19;
SELECT @CCT3 = Id FROM CCTs WHERE Id = 20;
SELECT @CCT4 = Id FROM CCTs WHERE Id = 21;
SELECT @CCT5 = Id FROM CCTs WHERE Id = 22;

-- 3. Récupérer les niveaux de formation
DECLARE @Niveau1 INT, @Niveau2 INT, @Niveau3 INT;

SELECT @Niveau1 = Id FROM NiveauxFormation WHERE Id = 1;
SELECT @Niveau2 = Id FROM NiveauxFormation WHERE Id = 2;
SELECT @Niveau3 = Id FROM NiveauxFormation WHERE Id = 3;

-- 4. Supprimer les chefs de centre existants pour éviter les doublons
DELETE FROM ChefsCentre WHERE Id > 0;
PRINT '✓ Anciens chefs de centre supprimés';

-- 5. Insérer des chefs de centre de test
INSERT INTO ChefsCentre (Nom, Prenom, CIN, CCTId, DateAffectationCCT, ReferenceApprobationCNEH, AnneeAutorisation, DateApprobationCNEH, Tel, Mail, CNSS, Sexe, DateNaissance, NiveauFormationInitialId) VALUES
-- Chef de centre 1
('0000000', 'Khadija', 'JA122536', @CCT1, '2015-05-12', 'REF001', 0, '2024-05-20', '0666427590', 'khadija.fetouh19@gmail.com', '0000000', 1, '1990-05-20', @Niveau1),

-- Chef de centre 2
('AAMER', 'Mohamed', 'BB75100', @CCT2, '2015-02-24', 'REF002', 2024, '2024-01-15', '0663884078', 'mohamed.aamer@sgs.com', '144056184', 0, '1985-03-15', @Niveau2),

-- Chef de centre 3
('AATI', 'SAID', 'PA29905', @CCT3, '2016-01-10', 'REF003', 2024, '2024-02-10', '0600384111', 'said.aati@cct.com', '123456789', 0, '1988-07-22', @Niveau3),

-- Chef de centre 4
('AAYADI', 'IDRISS', 'V307199', @CCT4, '2017-03-08', 'REF004', 2024, '2024-03-01', '0600000000', 'idriss.aayadi@cct.com', '987654321', 0, '1992-11-30', @Niveau1),

-- Chef de centre 5
('ABAD', 'YOUSSEF', '1663590', @CCT5, '2018-06-15', 'REF005', 0, '2024-04-05', '0600000000', 'youssef.abad@cct.com', '456789123', 0, '1987-09-12', @Niveau2);

PRINT '✓ 5 chefs de centre ajoutés avec succès';

-- 6. Afficher les chefs de centre créés
PRINT 'Chefs de centre créés:';
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

-- 7. Statistiques
PRINT 'Statistiques:';
SELECT COUNT(*) as 'Nombre total de chefs de centre' FROM ChefsCentre;

PRINT '=== FIN DE L''AJOUT ===';
PRINT 'Vous pouvez maintenant tester l''application !'; 