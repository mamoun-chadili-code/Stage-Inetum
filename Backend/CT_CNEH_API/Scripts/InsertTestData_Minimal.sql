-- Script SQL Server minimal pour insérer des données de test essentielles
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

-- 4. Insertion des réseaux
IF NOT EXISTS (SELECT 1 FROM Reseaux WHERE Nom = 'Réseau Transport Plus')
BEGIN
    INSERT INTO Reseaux (Nom, AdresseSiege, AdresseDomiciliation, AdressRepresentantLegal, 
                         NomRepresentantLegal, TelRepresentantLegal, MailRepresentant, 
                         Mail, Tel, Fax, Ice, IdFiscal, RegisterCommerce, 
                         Agrement, DateAgrement, DateStatut, StatutId, StatutRCId, 
                         CadreAutorisationId, VilleId, ThumbprintCertificat) VALUES
    ('Réseau Transport Plus', '123 Avenue Hassan II, Casablanca', '456 Boulevard Mohammed V, Casablanca',
     'Ahmed Benali', 'Ahmed Benali', '0522000001', 'ahmed.benali@transportplus.ma',
     'contact@transportplus.ma', '0522000000', '0522000002', '000123456789', '123456789',
     'RC123456', 'AGR001', '2023-01-15', '2023-01-15', 1, 1, 1, 1, 'CERT001');
    PRINT 'Réseaux insérés';
END

-- 5. Insertion des catégories CCT
IF NOT EXISTS (SELECT 1 FROM CategorieCCTs WHERE Code = 'CAT1')
BEGIN
    INSERT INTO CategorieCCTs (Code, Libelle) VALUES
    ('CAT1', 'Centre principal'),
    ('CAT2', 'Centre secondaire');
    PRINT 'Catégories CCT insérées';
END

-- 6. Insertion des types CCT
IF NOT EXISTS (SELECT 1 FROM TypeCTTs WHERE Code = 'T1')
BEGIN
    INSERT INTO TypeCTTs (Code, Libelle) VALUES
    ('T1', 'Contrôle véhicules légers'),
    ('T2', 'Contrôle poids lourds');
    PRINT 'Types CCT insérés';
END

-- 7. Insertion des CCTs
IF NOT EXISTS (SELECT 1 FROM CCTs WHERE Nom = 'CCT Casablanca Centre')
BEGIN
    INSERT INTO CCTs (Nom, AdresseCCT, AdresseDomiciliation, AdresseSiege, 
                      Agrement, DateAgrement, DateRalliement, DateStatut,
                      EngagementSpecifique, Fax, Ice, IdFiscal, IsPersonneMorale,
                      Latitude, Longitude, Mail, ProvinceId, QuotaPL, QuotaVL,
                      RegionId, ReseauId, StatutId, Tel, ThumbprintCertificat,
                      TypeId, VilleId) VALUES
    ('CCT Casablanca Centre', 'CCT001', '2023-01-20', 1, 1, '2023-02-01', 1, '2023-02-01',
     'Avenue Hassan II, Casablanca', '33.5731', '-7.5898', 'Boulevard Mohammed V, Casablanca',
     'Adresse domiciliation', '0522000004', '0522000003', 'cct.casablanca@transportplus.ma',
     '000123456789', '123456789', 1, 'Engagement qualité et sécurité', 1, 1, 1, 500, 100, 1, 1,
     'CCT001');
    PRINT 'CCTs insérés';
END

-- 8. Insertion des niveaux de formation
IF NOT EXISTS (SELECT 1 FROM NiveauFormations WHERE Code = 'NF1')
BEGIN
    INSERT INTO NiveauFormations (Code, Libelle, Cible) VALUES
    ('NF1', 'Baccalauréat', 'Tous'),
    ('NF2', 'Bac+2', 'Techniciens');
    PRINT 'Niveaux de formation insérés';
END

-- 9. Insertion des chefs de centre
IF NOT EXISTS (SELECT 1 FROM ChefCentres WHERE CIN = 'AB123456')
BEGIN
    INSERT INTO ChefCentres (Nom, Prenom, CIN, CNSS, Tel, Mail, DateNaissance, Sexe,
                            AnneeAutorisation, DateAffectationCCT, DateApprobationCNEH,
                            ReferenceApprobationCNEH, CCTId, NiveauFormationInitialId) VALUES
    ('Benali', 'Ahmed', 'AB123456', 'CNSS001', '0522000005', 'ahmed.benali@cct.ma',
     '1980-05-15', 1, 2023, '2023-02-01', '2023-01-25', 'REF001', 1, 1);
    PRINT 'Chefs de centre insérés';
END

-- 10. Insertion des statuts administratifs
IF NOT EXISTS (SELECT 1 FROM StatutAdministratifs WHERE Code = 'SA1')
BEGIN
    INSERT INTO StatutAdministratifs (Code, Libelle) VALUES
    ('SA1', 'Actif'),
    ('SA2', 'Inactif');
    PRINT 'Statuts administratifs insérés';
END

-- 11. Insertion des agents
IF NOT EXISTS (SELECT 1 FROM Agents WHERE CIN = 'MA123456')
BEGIN
    INSERT INTO Agents (Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, DateCAP,
                       DateExpirationCAP, CategorieCAPId, StatutAdministratifId,
                       AnneeAutorisation, DateAffectationCCT, NumDecisionRenouv,
                       DateDecisionRenouv, Adresse) VALUES
    ('Alaoui', 'Mohammed', 'MA123456', '0522000006', 'mohammed.alaoui@cct.ma',
     'CNSS004', 1, 'CAP001', '2023-01-15', '2025-01-15', 1, 1, 2023, '2023-02-01',
     'DEC001', '2023-01-20', '123 Rue Al Massira, Casablanca');
    PRINT 'Agents insérés';
END

-- 12. Insertion des types de formation
IF NOT EXISTS (SELECT 1 FROM TypesFormation WHERE Libelle = 'Formation initiale')
BEGIN
    INSERT INTO TypesFormation (Libelle) VALUES
    ('Formation initiale'),
    ('Formation continue');
    PRINT 'Types de formation insérés';
END

-- 13. Insertion des catégories de lignes
IF NOT EXISTS (SELECT 1 FROM Categories WHERE Nom = 'Ligne principale')
BEGIN
    INSERT INTO Categories (Nom, Description, IsActive) VALUES
    ('Ligne principale', 'Lignes principales du réseau', 1),
    ('Ligne secondaire', 'Lignes secondaires du réseau', 1);
    PRINT 'Catégories de lignes insérées';
END

-- 14. Insertion des statuts de lignes
IF NOT EXISTS (SELECT 1 FROM Statuts WHERE Nom = 'En exploitation')
BEGIN
    INSERT INTO Statuts (Nom, Description, IsActive) VALUES
    ('En exploitation', 'Ligne en exploitation normale', 1),
    ('En construction', 'Ligne en cours de construction', 1);
    PRINT 'Statuts de lignes insérés';
END

-- 15. Insertion des types de décisions
IF NOT EXISTS (SELECT 1 FROM TypeDecisions WHERE Code = 'TD1')
BEGIN
    INSERT INTO TypeDecisions (Code, Libelle) VALUES
    ('TD1', 'Approbation'),
    ('TD2', 'Rejet');
    PRINT 'Types de décisions insérés';
END

-- 16. Insertion des décisions
IF NOT EXISTS (SELECT 1 FROM Decisions WHERE Nom = 'Approbation ligne Casablanca-Rabat')
BEGIN
    INSERT INTO Decisions (Nom, Description, IsActive, TypeDecisionId) VALUES
    ('Approbation ligne Casablanca-Rabat', 'Approbation de la nouvelle ligne de transport', 1, 1);
    PRINT 'Décisions insérées';
END

-- 17. Insertion des lignes
IF NOT EXISTS (SELECT 1 FROM Lignes WHERE NumeroLigne = 'L001')
BEGIN
    INSERT INTO Lignes (NumeroLigne, CategorieId, CCTId, StatutId, DateStatut,
                       DecisionId, DateDecision, AnneeDemarrage, DateCreation,
                       DateModification, CategorieCCTId) VALUES
    ('L001', 1, 1, 1, '2023-02-01', 1, '2023-01-25', 2023, '2023-01-20', '2023-01-20', 1);
    PRINT 'Lignes insérées';
END

-- 18. Insertion des types d'équipements
IF NOT EXISTS (SELECT 1 FROM TypeEquipements WHERE Libelle = 'Informatique')
BEGIN
    INSERT INTO TypeEquipements (Code, Libelle, Etalonnable) VALUES
    ('TE1', 'Informatique', 0),
    ('TE2', 'Bureau', 0);
    PRINT 'Types d''équipements insérés';
END

-- 19. Insertion des statuts d'équipements
IF NOT EXISTS (SELECT 1 FROM StatutsEquipement WHERE Libelle = 'En service')
BEGIN
    INSERT INTO StatutsEquipement (Libelle, Description, IsActive) VALUES
    ('En service', 'Équipement en service normal', 1),
    ('En maintenance', 'Équipement en maintenance', 1);
    PRINT 'Statuts d''équipements insérés';
END

-- 20. Insertion des équipements
IF NOT EXISTS (SELECT 1 FROM Equipements WHERE NumeroSerie = 'LAP001')
BEGIN
    INSERT INTO Equipements (Nom, Description, TypeId, CCTId, DateAcquisition,
                            DateMaintenance, StatutId, NumeroSerie, Fabricant, Modele,
                            CoutAcquisition, Localisation) VALUES
    ('Ordinateur portable', 'Ordinateur portable pour le personnel administratif', 1, 1,
     '2022-01-15', '2024-01-15', 1, 'LAP001', 'Dell', 'Latitude 5520', 15000, 'Bureau administratif');
    PRINT 'Équipements insérés';
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
SELECT 'Reseaux', COUNT(*) FROM Reseaux
UNION ALL
SELECT 'CategorieCCTs', COUNT(*) FROM CategorieCCTs
UNION ALL
SELECT 'TypeCTTs', COUNT(*) FROM TypeCTTs
UNION ALL
SELECT 'CCTs', COUNT(*) FROM CCTs
UNION ALL
SELECT 'NiveauFormations', COUNT(*) FROM NiveauFormations
UNION ALL
SELECT 'ChefCentres', COUNT(*) FROM ChefCentres
UNION ALL
SELECT 'StatutAdministratifs', COUNT(*) FROM StatutAdministratifs
UNION ALL
SELECT 'Agents', COUNT(*) FROM Agents
UNION ALL
SELECT 'TypesFormation', COUNT(*) FROM TypesFormation
UNION ALL
SELECT 'Categories', COUNT(*) FROM Categories
UNION ALL
SELECT 'Statuts', COUNT(*) FROM Statuts
UNION ALL
SELECT 'TypeDecisions', COUNT(*) FROM TypeDecisions
UNION ALL
SELECT 'Decisions', COUNT(*) FROM Decisions
UNION ALL
SELECT 'Lignes', COUNT(*) FROM Lignes
UNION ALL
SELECT 'TypeEquipements', COUNT(*) FROM TypeEquipements
UNION ALL
SELECT 'StatutsEquipement', COUNT(*) FROM StatutsEquipement
UNION ALL
SELECT 'Equipements', COUNT(*) FROM Equipements;

PRINT 'Données de test minimales insérées avec succès !';
GO
