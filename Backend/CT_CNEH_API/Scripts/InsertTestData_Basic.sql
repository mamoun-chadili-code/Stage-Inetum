-- Script SQL Server très simple pour insérer des données de test de base
-- CT_CNEH_API - Gestion de l'activité du contrôle technique

USE CT_CNEH_DB;
GO

-- 1. Insertion des données de base (Regions, Provinces, Villes)
IF NOT EXISTS (SELECT 1 FROM Regions WHERE Code = 'R1')
BEGIN
    INSERT INTO Regions (Code, Libelle) VALUES
    ('R1', 'Casablanca-Settat'),
    ('R2', 'Rabat-Salé-Kénitra'),
    ('R3', 'Fès-Meknès');
    PRINT 'Regions insérées';
END

IF NOT EXISTS (SELECT 1 FROM Provinces WHERE Code = 'P1')
BEGIN
    INSERT INTO Provinces (Code, Libelle, RegionId) VALUES
    ('P1', 'Casablanca', 1),
    ('P2', 'Rabat', 2),
    ('P3', 'Fès', 3);
    PRINT 'Provinces insérées';
END

IF NOT EXISTS (SELECT 1 FROM Villes WHERE Code = 'V1')
BEGIN
    INSERT INTO Villes (Code, Nom, RegionId) VALUES
    ('V1', 'Casablanca', 1),
    ('V2', 'Rabat', 2),
    ('V3', 'Fès', 3);
    PRINT 'Villes insérées';
END

-- 2. Insertion des cadres d'autorisation
IF NOT EXISTS (SELECT 1 FROM CadreAutorisations WHERE Code = 'CA1')
BEGIN
    INSERT INTO CadreAutorisations (Code, Libelle) VALUES
    ('CA1', 'Autorisation nationale'),
    ('CA2', 'Autorisation régionale');
    PRINT 'Cadres d''autorisation insérés';
END

-- 3. Insertion des statuts RC
IF NOT EXISTS (SELECT 1 FROM StatutRCs WHERE Code = 'SRC1')
BEGIN
    INSERT INTO StatutRCs (Code, Libelle) VALUES
    ('SRC1', 'Actif'),
    ('SRC2', 'Inactif');
    PRINT 'Statuts RC insérés';
END

-- 4. Insertion des catégories CCT
IF NOT EXISTS (SELECT 1 FROM CategorieCCTs WHERE Code = 'CAT1')
BEGIN
    INSERT INTO CategorieCCTs (Code, Libelle) VALUES
    ('CAT1', 'Centre principal'),
    ('CAT2', 'Centre secondaire');
    PRINT 'Catégories CCT insérées';
END

-- 5. Insertion des types CCT
IF NOT EXISTS (SELECT 1 FROM TypeCTTs WHERE Code = 'T1')
BEGIN
    INSERT INTO TypeCTTs (Code, Libelle) VALUES
    ('T1', 'Contrôle véhicules légers'),
    ('T2', 'Contrôle poids lourds');
    PRINT 'Types CCT insérés';
END

-- 6. Insertion des niveaux de formation
IF NOT EXISTS (SELECT 1 FROM NiveauFormations WHERE Code = 'NF1')
BEGIN
    INSERT INTO NiveauFormations (Code, Libelle, Cible) VALUES
    ('NF1', 'Baccalauréat', 'Tous'),
    ('NF2', 'Bac+2', 'Techniciens');
    PRINT 'Niveaux de formation insérés';
END

-- 7. Insertion des statuts administratifs
IF NOT EXISTS (SELECT 1 FROM StatutAdministratifs WHERE Code = 'SA1')
BEGIN
    INSERT INTO StatutAdministratifs (Code, Libelle) VALUES
    ('SA1', 'Actif'),
    ('SA2', 'Inactif');
    PRINT 'Statuts administratifs insérés';
END

-- 8. Insertion des types de formation
IF NOT EXISTS (SELECT 1 FROM TypesFormation WHERE Libelle = 'Formation initiale')
BEGIN
    INSERT INTO TypesFormation (Libelle) VALUES
    ('Formation initiale'),
    ('Formation continue');
    PRINT 'Types de formation insérés';
END

-- 9. Insertion des catégories de lignes
IF NOT EXISTS (SELECT 1 FROM Categories WHERE Nom = 'Ligne principale')
BEGIN
    INSERT INTO Categories (Nom, Description, IsActive) VALUES
    ('Ligne principale', 'Lignes principales du réseau', 1),
    ('Ligne secondaire', 'Lignes secondaires du réseau', 1);
    PRINT 'Catégories de lignes insérées';
END

-- 10. Insertion des statuts de lignes
IF NOT EXISTS (SELECT 1 FROM Statuts WHERE Nom = 'En exploitation')
BEGIN
    INSERT INTO Statuts (Nom, Description, IsActive) VALUES
    ('En exploitation', 'Ligne en exploitation normale', 1),
    ('En construction', 'Ligne en cours de construction', 1);
    PRINT 'Statuts de lignes insérés';
END

-- 11. Insertion des types de décisions
IF NOT EXISTS (SELECT 1 FROM TypeDecisions WHERE Code = 'TD1')
BEGIN
    INSERT INTO TypeDecisions (Code, Libelle) VALUES
    ('TD1', 'Approbation'),
    ('TD2', 'Rejet');
    PRINT 'Types de décisions insérés';
END

-- 12. Insertion des types d'équipements
IF NOT EXISTS (SELECT 1 FROM TypeEquipements WHERE Libelle = 'Informatique')
BEGIN
    INSERT INTO TypeEquipements (Code, Libelle, Etalonnable) VALUES
    ('TE1', 'Informatique', 0),
    ('TE2', 'Bureau', 0);
    PRINT 'Types d''équipements insérés';
END

-- 13. Insertion des statuts d'équipements
IF NOT EXISTS (SELECT 1 FROM StatutsEquipement WHERE Libelle = 'En service')
BEGIN
    INSERT INTO StatutsEquipement (Libelle, Description, IsActive) VALUES
    ('En service', 'Équipement en service normal', 1),
    ('En maintenance', 'Équipement en maintenance', 1);
    PRINT 'Statuts d''équipements insérés';
END

-- Affichage des données insérées
SELECT 'Regions' as TableName, COUNT(*) as Count FROM Regions
UNION ALL
SELECT 'Provinces', COUNT(*) FROM Provinces
UNION ALL
SELECT 'Villes', COUNT(*) FROM Villes
UNION ALL
SELECT 'CadreAutorisations', COUNT(*) FROM CadreAutorisations
UNION ALL
SELECT 'StatutRCs', COUNT(*) FROM StatutRCs
UNION ALL
SELECT 'CategorieCCTs', COUNT(*) FROM CategorieCCTs
UNION ALL
SELECT 'TypeCTTs', COUNT(*) FROM TypeCTTs
UNION ALL
SELECT 'NiveauFormations', COUNT(*) FROM NiveauFormations
UNION ALL
SELECT 'StatutAdministratifs', COUNT(*) FROM StatutAdministratifs
UNION ALL
SELECT 'TypesFormation', COUNT(*) FROM TypesFormation
UNION ALL
SELECT 'Categories', COUNT(*) FROM Categories
UNION ALL
SELECT 'Statuts', COUNT(*) FROM Statuts
UNION ALL
SELECT 'TypeDecisions', COUNT(*) FROM TypeDecisions
UNION ALL
SELECT 'TypeEquipements', COUNT(*) FROM TypeEquipements
UNION ALL
SELECT 'StatutsEquipement', COUNT(*) FROM StatutsEquipement;

PRINT 'Données de test de base insérées avec succès !';
GO
