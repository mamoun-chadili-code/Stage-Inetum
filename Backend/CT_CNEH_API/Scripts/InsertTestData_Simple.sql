-- Script SQL Server simplifié pour insérer des données de test
-- CT_CNEH_API - Gestion de l'activité du contrôle technique

USE CT_CNEH_DB;
GO

-- 1. Insertion des données de base (Regions, Provinces, Villes)
IF NOT EXISTS (SELECT 1 FROM Regions WHERE Code = 'R1')
BEGIN
    INSERT INTO Regions (Code, Libelle) VALUES
    ('R1', 'Casablanca-Settat'),
    ('R2', 'Rabat-Salé-Kénitra'),
    ('R3', 'Fès-Meknès'),
    ('R4', 'Marrakech-Safi'),
    ('R5', 'Tanger-Tétouan-Al Hoceima');
    PRINT 'Regions insérées';
END

IF NOT EXISTS (SELECT 1 FROM Provinces WHERE Code = 'P1')
BEGIN
    INSERT INTO Provinces (Code, Libelle, RegionId) VALUES
    ('P1', 'Casablanca', 1),
    ('P2', 'Settat', 1),
    ('P3', 'Rabat', 2),
    ('P4', 'Salé', 2),
    ('P5', 'Fès', 3),
    ('P6', 'Meknès', 3),
    ('P7', 'Marrakech', 4),
    ('P8', 'Safi', 4),
    ('P9', 'Tanger', 5),
    ('P10', 'Tétouan', 5);
    PRINT 'Provinces insérées';
END

IF NOT EXISTS (SELECT 1 FROM Villes WHERE Code = 'V1')
BEGIN
    INSERT INTO Villes (Code, Nom, RegionId) VALUES
    ('V1', 'Casablanca', 1),
    ('V2', 'Settat', 1),
    ('V3', 'Rabat', 2),
    ('V4', 'Salé', 2),
    ('V5', 'Fès', 3),
    ('V6', 'Meknès', 3),
    ('V7', 'Marrakech', 4),
    ('V8', 'Safi', 4),
    ('V9', 'Tanger', 5),
    ('V10', 'Tétouan', 5);
    PRINT 'Villes insérées';
END

-- 2. Insertion des cadres d'autorisation
IF NOT EXISTS (SELECT 1 FROM CadreAutorisations WHERE Code = 'CA1')
BEGIN
    INSERT INTO CadreAutorisations (Code, Libelle) VALUES
    ('CA1', 'Autorisation nationale'),
    ('CA2', 'Autorisation régionale'),
    ('CA3', 'Autorisation provinciale'),
    ('CA4', 'Autorisation locale');
    PRINT 'Cadres d''autorisation insérés';
END

-- 3. Insertion des statuts RC
IF NOT EXISTS (SELECT 1 FROM StatutRCs WHERE Code = 'SRC1')
BEGIN
    INSERT INTO StatutRCs (Code, Libelle) VALUES
    ('SRC1', 'Actif'),
    ('SRC2', 'Inactif'),
    ('SRC3', 'En attente'),
    ('SRC4', 'Suspendu');
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
     'RC123456', 'AGR001', '2023-01-15', '2023-01-15', 1, 1, 1, 1, 'CERT001'),
    ('Réseau Express Maroc', '789 Rue Mohammed VI, Rabat', '321 Avenue Al Fida, Rabat',
     'Fatima Zahra', 'Fatima Zahra', '0537000001', 'fatima.zahra@expressmaroc.ma',
     'info@expressmaroc.ma', '0537000000', '0537000002', '000987654321', '987654321',
     'RC654321', 'AGR002', '2023-02-20', '2023-02-20', 1, 1, 2, 2, 'CERT002'),
    ('Réseau Logistique Pro', '456 Boulevard Al Massira, Fès', '789 Rue Ibn Khaldoun, Fès',
     'Karim Mansouri', 'Karim Mansouri', '0535000001', 'karim.mansouri@logpro.ma',
     'contact@logpro.ma', '0535000000', '0535000002', '000456789123', '456789123',
     'RC456789', 'AGR003', '2023-03-10', '2023-03-10', 1, 1, 3, 3, 'CERT003');
    PRINT 'Réseaux insérés';
END

-- 5. Insertion des catégories CCT
IF NOT EXISTS (SELECT 1 FROM CategorieCCTs WHERE Code = 'CAT1')
BEGIN
    INSERT INTO CategorieCCTs (Code, Libelle) VALUES
    ('CAT1', 'Centre principal'),
    ('CAT2', 'Centre secondaire'),
    ('CAT3', 'Centre de proximité'),
    ('CAT4', 'Centre spécialisé');
    PRINT 'Catégories CCT insérées';
END

-- 6. Insertion des types CCT
IF NOT EXISTS (SELECT 1 FROM TypeCTTs WHERE Code = 'T1')
BEGIN
    INSERT INTO TypeCTTs (Code, Libelle) VALUES
    ('T1', 'Contrôle véhicules légers'),
    ('T2', 'Contrôle poids lourds'),
    ('T3', 'Contrôle mixte'),
    ('T4', 'Contrôle spécialisé');
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
    ('CCT Casablanca Centre', 'Avenue Hassan II, Casablanca', 'Boulevard Mohammed V, Casablanca',
     '123 Avenue Hassan II, Casablanca', 'CCT001', '2023-01-20', '2023-02-01', '2023-02-01',
     'Engagement qualité et sécurité', '0522000003', '000123456789', '123456789', 1,
     33.5731, -7.5898, 'cct.casablanca@transportplus.ma', 1, 100, 500, 1, 1, 1,
     '0522000004', 'CCT001', 1, 1),
    ('CCT Rabat Central', 'Rue Mohammed VI, Rabat', 'Avenue Al Fida, Rabat',
     '789 Rue Mohammed VI, Rabat', 'CCT002', '2023-02-25', '2023-03-01', '2023-03-01',
     'Excellence du service', '0537000003', '000987654321', '987654321', 1,
     34.0209, -6.8416, 'cct.rabat@expressmaroc.ma', 3, 80, 400, 2, 2, 1,
     '0537000004', 'CCT002', 2, 3),
    ('CCT Fès Médina', 'Boulevard Al Massira, Fès', 'Rue Ibn Khaldoun, Fès',
     '456 Boulevard Al Massira, Fès', 'CCT003', '2023-03-15', '2023-04-01', '2023-04-01',
     'Innovation et qualité', '0535000003', '000456789123', '456789123', 1,
     34.0181, -5.0078, 'cct.fes@logpro.ma', 5, 60, 300, 3, 3, 1,
     '0535000004', 'CCT003', 3, 5);
    PRINT 'CCTs insérés';
END

-- 8. Insertion des niveaux de formation
IF NOT EXISTS (SELECT 1 FROM NiveauFormations WHERE Code = 'NF1')
BEGIN
    INSERT INTO NiveauFormations (Code, Libelle, Cible) VALUES
    ('NF1', 'Baccalauréat', 'Tous'),
    ('NF2', 'Bac+2', 'Techniciens'),
    ('NF3', 'Bac+3', 'Ingénieurs'),
    ('NF4', 'Bac+5', 'Managers');
    PRINT 'Niveaux de formation insérés';
END

-- 9. Insertion des chefs de centre
IF NOT EXISTS (SELECT 1 FROM ChefCentres WHERE CIN = 'AB123456')
BEGIN
    INSERT INTO ChefCentres (Nom, Prenom, CIN, CNSS, Tel, Mail, DateNaissance, Sexe,
                            AnneeAutorisation, DateAffectationCCT, DateApprobationCNEH,
                            ReferenceApprobationCNEH, CCTId, NiveauFormationInitialId) VALUES
    ('Benali', 'Ahmed', 'AB123456', 'CNSS001', '0522000005', 'ahmed.benali@cct.ma',
     '1980-05-15', 'M', 2023, '2023-02-01', '2023-01-25', 'REF001', 1, 3),
    ('Zahra', 'Fatima', 'FZ789012', 'CNSS002', '0537000005', 'fatima.zahra@cct.ma',
     '1985-08-22', 'F', 2023, '2023-03-01', '2023-02-28', 'REF002', 2, 3),
    ('Mansouri', 'Karim', 'KM345678', 'CNSS003', '0535000005', 'karim.mansouri@cct.ma',
     '1982-12-10', 'M', 2023, '2023-04-01', '2023-03-25', 'REF003', 3, 3);
    PRINT 'Chefs de centre insérés';
END

-- 10. Insertion des statuts administratifs
IF NOT EXISTS (SELECT 1 FROM StatutAdministratifs WHERE Code = 'SA1')
BEGIN
    INSERT INTO StatutAdministratifs (Code, Libelle) VALUES
    ('SA1', 'Actif'),
    ('SA2', 'Inactif'),
    ('SA3', 'En formation'),
    ('SA4', 'Suspendu'),
    ('SA5', 'Retraité');
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
     'DEC001', '2023-01-20', '123 Rue Al Massira, Casablanca'),
    ('Bennani', 'Amina', 'AB789012', '0537000006', 'amina.bennani@cct.ma',
     'CNSS005', 2, 'CAP002', '2023-02-20', '2025-02-20', 1, 1, 2023, '2023-03-01',
     'DEC002', '2023-02-25', '456 Avenue Hassan II, Rabat'),
    ('Cherkaoui', 'Hassan', 'HC345678', '0535000006', 'hassan.cherkaoui@cct.ma',
     'CNSS006', 3, 'CAP003', '2023-03-10', '2025-03-10', 1, 1, 2023, '2023-04-01',
     'DEC003', '2023-03-15', '789 Boulevard Mohammed V, Fès');
    PRINT 'Agents insérés';
END

-- 12. Insertion des types de formation
IF NOT EXISTS (SELECT 1 FROM TypesFormation WHERE Libelle = 'Formation initiale')
BEGIN
    INSERT INTO TypesFormation (Libelle) VALUES
    ('Formation initiale'),
    ('Formation continue'),
    ('Formation spécialisée'),
    ('Formation sécurité');
    PRINT 'Types de formation insérés';
END

-- 13. Insertion des catégories de lignes
IF NOT EXISTS (SELECT 1 FROM Categories WHERE Nom = 'Ligne principale')
BEGIN
    INSERT INTO Categories (Nom, Description, IsActive) VALUES
    ('Ligne principale', 'Lignes principales du réseau', 1),
    ('Ligne secondaire', 'Lignes secondaires du réseau', 1),
    ('Ligne de desserte', 'Lignes de desserte locale', 1),
    ('Ligne de connexion', 'Lignes de connexion entre centres', 1);
    PRINT 'Catégories de lignes insérées';
END

-- 14. Insertion des statuts de lignes
IF NOT EXISTS (SELECT 1 FROM Statuts WHERE Nom = 'En exploitation')
BEGIN
    INSERT INTO Statuts (Nom, Description, IsActive) VALUES
    ('En exploitation', 'Ligne en exploitation normale', 1),
    ('En construction', 'Ligne en cours de construction', 1),
    ('Hors service', 'Ligne hors service', 1),
    ('En maintenance', 'Ligne en maintenance', 1);
    PRINT 'Statuts de lignes insérés';
END

-- 15. Insertion des types de décisions
IF NOT EXISTS (SELECT 1 FROM TypeDecisions WHERE Code = 'TD1')
BEGIN
    INSERT INTO TypeDecisions (Code, Libelle) VALUES
    ('TD1', 'Approbation'),
    ('TD2', 'Rejet'),
    ('TD3', 'Suspension'),
    ('TD4', 'Annulation');
    PRINT 'Types de décisions insérés';
END

-- 16. Insertion des décisions
IF NOT EXISTS (SELECT 1 FROM Decisions WHERE Nom = 'Approbation ligne Casablanca-Rabat')
BEGIN
    INSERT INTO Decisions (Nom, Description, IsActive, TypeDecisionId) VALUES
    ('Approbation ligne Casablanca-Rabat', 'Approbation de la nouvelle ligne de transport', 1, 1),
    ('Suspension ligne Fès-Meknès', 'Suspension temporaire pour maintenance', 1, 3),
    ('Approbation ligne Tanger-Tétouan', 'Approbation de la ligne côtière', 1, 1);
    PRINT 'Décisions insérées';
END

-- 17. Insertion des lignes
IF NOT EXISTS (SELECT 1 FROM Lignes WHERE NumeroLigne = 'L001')
BEGIN
    INSERT INTO Lignes (NumeroLigne, CategorieId, CCTId, StatutId, DateStatut,
                       DecisionId, DateDecision, AnneeDemarrage, DateCreation,
                       DateModification, CategorieCCTId) VALUES
    ('L001', 1, 1, 1, '2023-02-01', 1, '2023-01-25', 2023, '2023-01-20', '2023-01-20', 1),
    ('L002', 2, 2, 1, '2023-03-01', 2, '2023-02-25', 2023, '2023-02-20', '2023-02-20', 2),
    ('L003', 1, 3, 1, '2023-04-01', 3, '2023-03-25', 2023, '2023-03-20', '2023-03-20', 1);
    PRINT 'Lignes insérées';
END

-- 18. Insertion des types d'équipements
IF NOT EXISTS (SELECT 1 FROM TypeEquipements WHERE Libelle = 'Informatique')
BEGIN
    INSERT INTO TypeEquipements (Code, Libelle, Etalonnable) VALUES
    ('TE1', 'Informatique', 0),
    ('TE2', 'Bureau', 0),
    ('TE3', 'Technique', 1),
    ('TE4', 'Sécurité', 0);
    PRINT 'Types d''équipements insérés';
END

-- 19. Insertion des statuts d'équipements
IF NOT EXISTS (SELECT 1 FROM StatutsEquipement WHERE Libelle = 'En service')
BEGIN
    INSERT INTO StatutsEquipement (Libelle, Description, IsActive, DateCreation) VALUES
    ('En service', 'Équipement en service normal', 1, GETDATE()),
    ('En maintenance', 'Équipement en maintenance', 1, GETDATE()),
    ('Hors service', 'Équipement hors service', 1, GETDATE()),
    ('En réparation', 'Équipement en réparation', 1, GETDATE());
    PRINT 'Statuts d''équipements insérés';
END

-- 20. Insertion des équipements
IF NOT EXISTS (SELECT 1 FROM Equipements WHERE NumeroSerie = 'LAP001')
BEGIN
    INSERT INTO Equipements (Nom, Description, TypeId, CCTId, DateAcquisition,
                            DateMaintenance, StatutId, NumeroSerie, Fabricant, Modele,
                            CoutAcquisition, Localisation, DateCreation) VALUES
    ('Ordinateur portable', 'Ordinateur portable pour le personnel administratif', 1, 1,
     '2022-01-15', '2024-01-15', 1, 'LAP001', 'Dell', 'Latitude 5520', 15000, 'Bureau administratif', GETDATE()),
    ('Imprimante multifonction', 'Imprimante, scanner et photocopieur', 2, 1,
     '2021-06-20', '2024-06-20', 1, 'IMP001', 'HP', 'LaserJet Pro', 8000, 'Salle d''accueil', GETDATE()),
    ('Scanner de contrôle', 'Scanner pour le contrôle technique des véhicules', 3, 2,
     '2023-03-10', '2024-03-10', 1, 'SCAN001', 'Bosch', 'KTS 590', 25000, 'Atelier de contrôle', GETDATE()),
    ('Caméra de surveillance', 'Caméra de surveillance pour la sécurité', 4, 3,
     '2022-09-15', '2024-09-15', 1, 'CAM001', 'Hikvision', 'DS-2CD2142', 3000, 'Entrée principale', GETDATE()),
    ('Serveur de données', 'Serveur pour le stockage des données de contrôle', 1, 1,
     '2020-12-01', '2024-12-01', 1, 'SRV001', 'IBM', 'System x3650', 45000, 'Salle serveur', GETDATE());
    PRINT 'Équipements insérés';
END

-- 21. Insertion des historiques d'affectation
IF NOT EXISTS (SELECT 1 FROM HistoriqueAffectations WHERE EntiteId = 1 AND TypeEntite = 'Agent')
BEGIN
    INSERT INTO HistoriqueAffectations (EntiteId, TypeEntite, CCTId, DateAffectation,
                                       MotifAffectation, IsActive, DateCreation) VALUES
    (1, 'Agent', 1, '2023-02-01', 'Affectation initiale', 1, GETDATE()),
    (2, 'Agent', 2, '2023-03-01', 'Affectation initiale', 1, GETDATE()),
    (3, 'Agent', 3, '2023-04-01', 'Affectation initiale', 1, GETDATE()),
    (1, 'ChefCentre', 1, '2023-02-01', 'Affectation initiale', 1, GETDATE()),
    (2, 'ChefCentre', 2, '2023-03-01', 'Affectation initiale', 1, GETDATE()),
    (3, 'ChefCentre', 3, '2023-04-01', 'Affectation initiale', 1, GETDATE());
    PRINT 'Historiques d''affectation insérés';
END

-- 22. Insertion des utilisateurs (pour l'authentification)
IF NOT EXISTS (SELECT 1 FROM Users WHERE Username = 'admin')
BEGIN
    INSERT INTO Users (Username, PasswordHash, Email, IsActive, DateCreation) VALUES
    ('admin', '$2a$11$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5u.Gi', 'admin@ctcneh.ma', 1, GETDATE()),
    ('chef.casablanca', '$2a$11$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5u.Gi', 'chef.casablanca@ctcneh.ma', 1, GETDATE()),
    ('chef.rabat', '$2a$11$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5u.Gi', 'chef.rabat@ctcneh.ma', 1, GETDATE()),
    ('agent.casablanca', '$2a$11$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.s5u.Gi', 'agent.casablanca@ctcneh.ma', 1, GETDATE());
    PRINT 'Utilisateurs insérés';
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
SELECT 'Equipements', COUNT(*) FROM Equipements
UNION ALL
SELECT 'HistoriqueAffectations', COUNT(*) FROM HistoriqueAffectations
UNION ALL
SELECT 'Users', COUNT(*) FROM Users;

PRINT 'Données de test insérées avec succès !';
GO
