-- Script d'insertion de 8 chefs de centre complets
-- Basé sur la structure de la table ChefCentres

-- Vérifier que les CCTs existent
IF NOT EXISTS (SELECT 1 FROM CCTs WHERE Id = 1)
BEGIN
    PRINT 'Erreur: Aucun CCT trouvé dans la base de données. Veuillez d''abord créer des CCTs.'
    RETURN
END

-- Vérifier que les niveaux de formation existent
IF NOT EXISTS (SELECT 1 FROM NiveauFormations WHERE Id = 1)
BEGIN
    PRINT 'Erreur: Aucun niveau de formation trouvé dans la base de données. Veuillez d''abord créer des niveaux de formation.'
    RETURN
END

-- Supprimer les chefs de centre existants (optionnel)
-- DELETE FROM ChefCentres;
-- DBCC CHECKIDENT ('ChefCentres', RESEED, 0);

-- Insérer 8 chefs de centre complets
INSERT INTO ChefCentres (
    Nom, 
    Prenom, 
    CIN, 
    CCTId, 
    ReferenceApprobationCNEH, 
    DateApprobationCNEH, 
    Tel, 
    Mail, 
    CNSS, 
    Sexe, 
    DateNaissance, 
    NiveauFormationInitialId, 
    DateAffectationCCT, 
    AnneeAutorisation
) VALUES 
-- Chef de centre 1
(
    'Alaoui',
    'Ahmed',
    'AB123456',
    1, -- CCTId (doit exister)
    'REF-CNEH-2024-001',
    '2024-01-15',
    '0612345678',
    'ahmed.alaoui@cct-casablanca.ma',
    'CNSS123456789',
    1, -- 1 = Masculin, 0 = Féminin
    '1985-06-15',
    5, -- NiveauFormationInitialId (Technicien spécialisé en électronique automobile)
    '2024-01-20',
    2024
),

-- Chef de centre 2
(
    'Benjelloun',
    'Fatima',
    'CD789012',
    2, -- CCTId
    'REF-CNEH-2024-002',
    '2024-02-10',
    '0623456789',
    'fatima.benjelloun@cct-rabat.ma',
    'CNSS987654321',
    0, -- Féminin
    '1988-03-22',
    7, -- Licence professionnelle en électromécanique / maintenance industrielle
    '2024-02-15',
    2024
),

-- Chef de centre 3
(
    'Tazi',
    'Mohammed',
    'EF345678',
    3, -- CCTId
    'REF-CNEH-2024-003',
    '2024-03-05',
    '0634567890',
    'mohammed.tazi@cct-marrakech.ma',
    'CNSS456789123',
    1, -- Masculin
    '1982-11-08',
    9, -- Master en ingénierie automobile ou maintenance industrielle
    '2024-03-10',
    2024
),

-- Chef de centre 4
(
    'El Fassi',
    'Khadija',
    'GH901234',
    1, -- CCTId (même CCT que le premier)
    'REF-CNEH-2024-004',
    '2024-04-12',
    '0645678901',
    'khadija.elfassi@cct-casablanca.ma',
    'CNSS789123456',
    0, -- Féminin
    '1990-07-14',
    6, -- Licence professionnelle en mécanique
    '2024-04-18',
    2024
),

-- Chef de centre 5
(
    'Bennani',
    'Omar',
    'IJ567890',
    2, -- CCTId
    'REF-CNEH-2024-005',
    '2024-05-20',
    '0656789012',
    'omar.bennani@cct-rabat.ma',
    'CNSS321654987',
    1, -- Masculin
    '1987-12-03',
    8, -- Licence technique en génie mécanique / génie industriel
    '2024-05-25',
    2024
),

-- Chef de centre 6
(
    'Chaibi',
    'Amina',
    'KL234567',
    3, -- CCTId
    'REF-CNEH-2024-006',
    '2024-06-08',
    '0667890123',
    'amina.chaibi@cct-marrakech.ma',
    'CNSS654321987',
    0, -- Féminin
    '1984-09-17',
    4, -- Technicien spécialisé en électromécanique / maintenance industrielle
    '2024-06-12',
    2024
),

-- Chef de centre 7
(
    'Resouany',
    'Mustapha',
    'MN890123',
    1, -- CCTId
    'REF-CNEH-2024-007',
    '2024-07-15',
    '0678901234',
    'mustapha.resouany@cct-casablanca.ma',
    'CNSS147258369',
    1, -- Masculin
    '1981-04-25',
    10, -- Ingénieur d'État en génie mécanique, électromécanique ou industriel
    '2024-07-20',
    2024
),

-- Chef de centre 8
(
    'Bouazza',
    'Samira',
    'OP456789',
    2, -- CCTId
    'REF-CNEH-2024-008',
    '2024-08-30',
    '0689012345',
    'samira.bouazza@cct-rabat.ma',
    'CNSS963852741',
    0, -- Féminin
    '1989-01-11',
    3, -- Technicien spécialisé en mécanique automobile
    '2024-09-05',
    2024
);

-- Vérifier l'insertion
SELECT 
    'Chefs de centre insérés avec succès' AS Message,
    COUNT(*) AS TotalChefsCentre
FROM ChefCentres;

-- Afficher les chefs de centre insérés avec leurs détails
SELECT 
    cc.Id,
    cc.Nom,
    cc.Prenom,
    cc.CIN,
    cct.Nom AS CCT,
    cc.ReferenceApprobationCNEH,
    cc.DateApprobationCNEH,
    cc.Tel,
    cc.Mail,
    cc.CNSS,
    CASE cc.Sexe 
        WHEN 1 THEN 'Masculin' 
        WHEN 0 THEN 'Féminin' 
        ELSE 'Non spécifié' 
    END AS Sexe,
    cc.DateNaissance,
    nf.Libelle AS NiveauFormation,
    cc.DateAffectationCCT,
    cc.AnneeAutorisation
FROM ChefCentres cc
LEFT JOIN CCTs cct ON cc.CCTId = cct.Id
LEFT JOIN NiveauFormations nf ON cc.NiveauFormationInitialId = nf.Id
ORDER BY cc.Id;
