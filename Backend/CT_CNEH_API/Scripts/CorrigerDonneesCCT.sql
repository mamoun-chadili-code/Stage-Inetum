-- Script pour corriger les données manquantes dans les CCTs
-- Exécute ce script dans SSMS pour corriger les problèmes

-- 1. Vérifier et corriger les données de référence si nécessaire
IF NOT EXISTS (SELECT * FROM Regions WHERE Code = 'CS')
INSERT INTO Regions (Libelle, Code) VALUES ('CASABLANCA-SETTAT', 'CS');

IF NOT EXISTS (SELECT * FROM Provinces WHERE Code = 'MDN')
INSERT INTO Provinces (Libelle, Code, RegionId) VALUES ('MEDIOUNA', 'MDN', 1);

IF NOT EXISTS (SELECT * FROM Villes WHERE Code = 'MDN')
INSERT INTO Villes (Nom, Code, RegionId) VALUES ('MEDIOUNA', 'MDN', 1);

IF NOT EXISTS (SELECT * FROM CategorieCCTs WHERE Code = 'VTC')
INSERT INTO CategorieCCTs (Libelle, Code) VALUES ('Véhicules toute catégorie', 'VTC');

IF NOT EXISTS (SELECT * FROM CategorieCCTs WHERE Code = 'VL')
INSERT INTO CategorieCCTs (Libelle, Code) VALUES ('Véhicules légers', 'VL');

IF NOT EXISTS (SELECT * FROM StatutRCs WHERE Code = 'ACT')
INSERT INTO StatutRCs (Libelle, Code) VALUES ('En activité', 'ACT');

IF NOT EXISTS (SELECT * FROM CadreAutorisations WHERE Code = 'AV2012')
INSERT INTO CadreAutorisations (Libelle, Code) VALUES ('Avant 2012', 'AV2012');

IF NOT EXISTS (SELECT * FROM TypeCTTs WHERE Code = 'RALL')
INSERT INTO TypeCTTs (Libelle, Code) VALUES ('RALLIES', 'RALL');

-- 2. Corriger les réseaux avec toutes les colonnes obligatoires
IF NOT EXISTS (SELECT * FROM Reseaux WHERE Nom = 'REVITEX')
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, AdresseSiege, VilleId, Tel, Fax, Mail, CadreAutorisationId, NomRepresentantLegal, AdressRepresentantLegal) 
VALUES ('REVITEX', 'R001', '2019-01-01', 1, '2019-01-01', 'Adresse REVITEX', 1, '0600000000', '0520000000', 'revitex@mail.com', 1, 'Représentant REVITEX', 'Adresse Représentant REVITEX');

IF NOT EXISTS (SELECT * FROM Reseaux WHERE Nom = 'SGS')
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, AdresseSiege, VilleId, Tel, Fax, Mail, CadreAutorisationId, NomRepresentantLegal, AdressRepresentantLegal) 
VALUES ('SGS', 'R002', '2019-01-01', 1, '2019-01-01', 'Adresse SGS', 1, '0600000001', '0520000001', 'sgs@mail.com', 1, 'Représentant SGS', 'Adresse Représentant SGS');

IF NOT EXISTS (SELECT * FROM Reseaux WHERE Nom = 'SALAMA')
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, AdresseSiege, VilleId, Tel, Fax, Mail, CadreAutorisationId, NomRepresentantLegal, AdressRepresentantLegal) 
VALUES ('SALAMA', 'R003', '2019-01-01', 1, '2019-01-01', 'Adresse SALAMA', 1, '0600000002', '0520000002', 'salama@mail.com', 1, 'Représentant SALAMA', 'Adresse Représentant SALAMA');

IF NOT EXISTS (SELECT * FROM Reseaux WHERE Nom = 'DEBRA')
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, AdresseSiege, VilleId, Tel, Fax, Mail, CadreAutorisationId, NomRepresentantLegal, AdressRepresentantLegal) 
VALUES ('DEBRA', 'R004', '2019-01-01', 1, '2019-01-01', 'Adresse DEBRA', 1, '0600000003', '0520000003', 'debra@mail.com', 1, 'Représentant DEBRA', 'Adresse Représentant DEBRA');

-- 3. Mettre à jour les CCTs pour s'assurer qu'ils ont les bonnes relations
UPDATE CCTs SET 
    VilleId = 1,
    ReseauId = CASE 
        WHEN Nom LIKE '%VISITE%' THEN 1
        WHEN Nom LIKE '%ESC%' THEN 2
        WHEN Nom LIKE '%BASSOU%' THEN 3
        WHEN Nom LIKE '%ARBOUW%' THEN 4
        WHEN Nom LIKE '%ADITARA%' THEN 4
        WHEN Nom LIKE '%CONTROLE%' THEN 1
        WHEN Nom LIKE '%TECH%' THEN 2
        WHEN Nom LIKE '%SECURITE%' THEN 3
        WHEN Nom LIKE '%AUTO%' THEN 4
        WHEN Nom LIKE '%EXPERT%' THEN 1
        ELSE 1
    END,
    StatutId = 1,
    CategorieId = CASE 
        WHEN Nom LIKE '%SERVICES%' OR Nom LIKE '%ESC%' THEN 2
        ELSE 1
    END,
    ProvinceId = 1,
    RegionId = 1,
    CadreAutorisationId = 1,
    TypeId = 1
WHERE VilleId IS NULL OR ReseauId IS NULL OR StatutId IS NULL;

-- 4. Afficher le résultat après correction
SELECT 
    c.Id,
    c.Nom,
    c.Agrement,
    c.VilleId,
    v.Nom as VilleNom,
    c.ReseauId,
    r.Nom as ReseauNom,
    c.StatutId,
    s.Libelle as StatutLibelle,
    c.ProvinceId,
    p.Libelle as ProvinceLibelle,
    c.RegionId,
    reg.Libelle as RegionLibelle
FROM CCTs c
LEFT JOIN Villes v ON c.VilleId = v.Id
LEFT JOIN Reseaux r ON c.ReseauId = r.Id
LEFT JOIN StatutRCs s ON c.StatutId = s.Id
LEFT JOIN Provinces p ON c.ProvinceId = p.Id
LEFT JOIN Regions reg ON c.RegionId = reg.Id
ORDER BY c.Id;

PRINT 'Données corrigées avec succès !'; 