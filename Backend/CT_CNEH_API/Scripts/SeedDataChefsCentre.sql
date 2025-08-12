-- Script SQL Server pour ajouter des exemples de chefs de centre
-- Assurez-vous que les CCTs existent déjà

-- 1. Vérifier si la table NiveauxFormation existe et créer les niveaux si nécessaire
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NiveauxFormation')
BEGIN
    -- Insérer les niveaux de formation (si ils n'existent pas déjà)
    IF NOT EXISTS (SELECT * FROM NiveauxFormation WHERE Code = 'TECH')
    BEGIN
        INSERT INTO NiveauxFormation (Libelle, Code) VALUES 
        ('Technicien en mécanique automobile', 'TECH'),
        ('Licence technique', 'LIC'),
        ('Ingénieur en mécanique', 'ING'),
        ('Master en génie mécanique', 'MST'),
        ('Doctorat en mécanique', 'DOC');
        
        PRINT 'Niveaux de formation insérés avec succès';
    END
    ELSE
    BEGIN
        PRINT 'Les niveaux de formation existent déjà';
    END
END
ELSE
BEGIN
    PRINT 'ATTENTION: La table NiveauxFormation n''existe pas. Exécutez d''abord CreateNiveauxFormationTable.sql';
    PRINT 'Les chefs de centre seront créés avec NiveauFormationInitialId = NULL';
END

-- 2. Supprimer les chefs de centre existants pour éviter les doublons
DELETE FROM ChefsCentre WHERE Id > 0;

-- 3. Insérer des exemples de chefs de centre
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NiveauxFormation')
BEGIN
    -- Avec niveaux de formation
    INSERT INTO ChefsCentre (Nom, Prenom, CIN, CCTId, DateAffectationCCT, ReferenceApprobationCNEH, AnneeAutorisation, DateApprobationCNEH, Tel, Mail, CNSS, Sexe, DateNaissance, NiveauFormationInitialId) VALUES
    -- Chef de centre 1
    ('0000000', 'Khadija', 'JA122536', 17, '2015-05-12', 'REF001', 0, '2024-05-20', '0666427590', 'khadija.fetouh19@gmail.com', '0000000', 1, '1990-05-20', 1),
    -- Chef de centre 2
    ('AAMER', 'Mohamed', 'BB75100', 19, '2015-02-24', 'REF002', 2024, '2024-01-15', '0663884078', 'mohamed.aamer@sgs.com', '144056184', 0, '1985-03-15', 2),
    -- Chef de centre 3
    ('AATI', 'SAID', 'PA29905', 20, '2016-01-10', 'REF003', 2024, '2024-02-10', '0600384111', 'said.aati@cct.com', '123456789', 0, '1988-07-22', 3),
    -- Chef de centre 4
    ('AAYADI', 'IDRISS', 'V307199', 21, '2017-03-08', 'REF004', 2024, '2024-03-01', '0600000000', 'idriss.aayadi@cct.com', '987654321', 0, '1992-11-30', 1),
    -- Chef de centre 5
    ('ABAD', 'YOUSSEF', '1663590', 22, '2018-06-15', 'REF005', 0, '2024-04-05', '0600000000', 'youssef.abad@cct.com', '456789123', 0, '1987-09-12', 2),
    -- Chef de centre 6
    ('ABDELAZIZ', 'FATIMA', 'AB123456', 23, '2019-01-20', 'REF006', 2024, '2024-01-20', '0661234567', 'fatima.abdelaziz@cct.com', '789123456', 1, '1991-04-18', 3),
    -- Chef de centre 7
    ('BENNANI', 'AHMED', 'BN789012', 24, '2020-03-12', 'REF007', 2024, '2024-02-15', '0667890123', 'ahmed.bennani@cct.com', '321654987', 0, '1986-12-03', 1),
    -- Chef de centre 8
    ('CHERKAOUI', 'AMINA', 'CK456789', 25, '2021-07-08', 'REF008', 2024, '2024-03-10', '0664567890', 'amina.cherkaoui@cct.com', '654321987', 1, '1993-08-25', 2),
    -- Chef de centre 9
    ('DAHMANI', 'KARIM', 'DH234567', 26, '2022-09-14', 'REF009', 2024, '2024-04-20', '0662345678', 'karim.dahmani@cct.com', '147258369', 0, '1989-01-07', 3),
    -- Chef de centre 10
    ('EL AMRANI', 'SOUAD', 'EA890123', 27, '2023-11-05', 'REF010', 2024, '2024-05-12', '0668901234', 'souad.elamrani@cct.com', '963852741', 1, '1994-06-14', 1);
END
ELSE
BEGIN
    -- Sans niveaux de formation (NULL)
    INSERT INTO ChefsCentre (Nom, Prenom, CIN, CCTId, DateAffectationCCT, ReferenceApprobationCNEH, AnneeAutorisation, DateApprobationCNEH, Tel, Mail, CNSS, Sexe, DateNaissance, NiveauFormationInitialId) VALUES
    -- Chef de centre 1
    ('0000000', 'Khadija', 'JA122536', 17, '2015-05-12', 'REF001', 0, '2024-05-20', '0666427590', 'khadija.fetouh19@gmail.com', '0000000', 1, '1990-05-20', NULL),
    -- Chef de centre 2
    ('AAMER', 'Mohamed', 'BB75100', 19, '2015-02-24', 'REF002', 2024, '2024-01-15', '0663884078', 'mohamed.aamer@sgs.com', '144056184', 0, '1985-03-15', NULL),
    -- Chef de centre 3
    ('AATI', 'SAID', 'PA29905', 20, '2016-01-10', 'REF003', 2024, '2024-02-10', '0600384111', 'said.aati@cct.com', '123456789', 0, '1988-07-22', NULL),
    -- Chef de centre 4
    ('AAYADI', 'IDRISS', 'V307199', 21, '2017-03-08', 'REF004', 2024, '2024-03-01', '0600000000', 'idriss.aayadi@cct.com', '987654321', 0, '1992-11-30', NULL),
    -- Chef de centre 5
    ('ABAD', 'YOUSSEF', '1663590', 22, '2018-06-15', 'REF005', 0, '2024-04-05', '0600000000', 'youssef.abad@cct.com', '456789123', 0, '1987-09-12', NULL),
    -- Chef de centre 6
    ('ABDELAZIZ', 'FATIMA', 'AB123456', 23, '2019-01-20', 'REF006', 2024, '2024-01-20', '0661234567', 'fatima.abdelaziz@cct.com', '789123456', 1, '1991-04-18', NULL),
    -- Chef de centre 7
    ('BENNANI', 'AHMED', 'BN789012', 24, '2020-03-12', 'REF007', 2024, '2024-02-15', '0667890123', 'ahmed.bennani@cct.com', '321654987', 0, '1986-12-03', NULL),
    -- Chef de centre 8
    ('CHERKAOUI', 'AMINA', 'CK456789', 25, '2021-07-08', 'REF008', 2024, '2024-03-10', '0664567890', 'amina.cherkaoui@cct.com', '654321987', 1, '1993-08-25', NULL),
    -- Chef de centre 9
    ('DAHMANI', 'KARIM', 'DH234567', 26, '2022-09-14', 'REF009', 2024, '2024-04-20', '0662345678', 'karim.dahmani@cct.com', '147258369', 0, '1989-01-07', NULL),
    -- Chef de centre 10
    ('EL AMRANI', 'SOUAD', 'EA890123', 27, '2023-11-05', 'REF010', 2024, '2024-05-12', '0668901234', 'souad.elamrani@cct.com', '963852741', 1, '1994-06-14', NULL);
END

-- 4. Afficher les chefs de centre créés pour vérification
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NiveauxFormation')
BEGIN
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
ELSE
BEGIN
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
        'Non défini' as NiveauFormation
    FROM ChefsCentre cc
    LEFT JOIN CCTs c ON cc.CCTId = c.Id
    ORDER BY cc.Id;
END

-- 5. Afficher le nombre total de chefs de centre créés
SELECT COUNT(*) as 'Nombre total de chefs de centre' FROM ChefsCentre;

-- 6. Statistiques par CCT
SELECT 
    c.Nom as CCT,
    COUNT(cc.Id) as 'Nombre de chefs de centre',
    STRING_AGG(CONCAT(cc.Prenom, ' ', cc.Nom), ', ') as 'Chefs de centre'
FROM CCTs c
LEFT JOIN ChefsCentre cc ON c.Id = cc.CCTId
GROUP BY c.Id, c.Nom
ORDER BY c.Nom;

-- 7. Statistiques par niveau de formation
SELECT 
    nf.Libelle as NiveauFormation,
    COUNT(cc.Id) as 'Nombre de chefs de centre'
FROM NiveauxFormation nf
LEFT JOIN ChefsCentre cc ON nf.Id = cc.NiveauFormationInitialId
GROUP BY nf.Id, nf.Libelle
ORDER BY COUNT(cc.Id) DESC; 