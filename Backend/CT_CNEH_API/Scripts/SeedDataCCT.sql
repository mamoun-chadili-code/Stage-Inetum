-- Script d'insertion de données de test pour le module CCT
-- Exécute ce script dans SSMS pour remplir la base avec des exemples

-- 1. Insérer les régions
INSERT INTO Regions (Libelle, Code) VALUES 
('CASABLANCA-SETTAT', 'CS'),
('RABAT-SALE-KENITRA', 'RSK'),
('BENI MELLAL-KHENIFRA', 'BMK');

-- 2. Insérer les provinces
INSERT INTO Provinces (Libelle, Code, RegionId) VALUES 
('MEDIOUNA', 'MDN', 1),
('KENITRA', 'KNT', 2),
('Fquih ben salah', 'FBS', 3);

-- 3. Insérer les villes
INSERT INTO Villes (Nom, Code, RegionId) VALUES 
('MEDIOUNA', 'MDN', 1),
('KENITRA', 'KNT', 2),
('Fquih ben salah', 'FBS', 3);

-- 4. Insérer les catégories de CCT
INSERT INTO CategorieCCTs (Libelle, Code) VALUES 
('Véhicules toute catégorie', 'VTC'),
('Véhicules légers', 'VL');

-- 5. Insérer les statuts
INSERT INTO StatutRCs (Libelle, Code) VALUES 
('En activité', 'ACT'),
('Suspendu', 'SUS'),
('Fermé', 'FER');

-- 6. Insérer les cadres d'autorisation
INSERT INTO CadreAutorisations (Libelle, Code) VALUES 
('Avant 2012', 'AV2012'),
('Après 2012', 'AP2012');

-- 7. Insérer les types de CCT
INSERT INTO TypeCTTs (Libelle, Code) VALUES 
('RALLIES', 'RALL'),
('INDEPENDANT', 'IND');

-- 8. Insérer les réseaux
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, AdresseSiege, VilleId, Tel, Fax, Mail, CadreAutorisationId) VALUES 
('REVITEX', 'R001', '2019-01-01', 1, '2019-01-01', 'Adresse REVITEX', 1, '0600000000', '0520000000', 'revitex@mail.com', 1),
('SGS', 'R002', '2019-01-01', 1, '2019-01-01', 'Adresse SGS', 1, '0600000001', '0520000001', 'sgs@mail.com', 1),
('SALAMA', 'R003', '2019-01-01', 1, '2019-01-01', 'Adresse SALAMA', 1, '0600000002', '0520000002', 'salama@mail.com', 1),
('DEBRA', 'R004', '2019-01-01', 1, '2019-01-01', 'Adresse DEBRA', 1, '0600000003', '0520000003', 'debra@mail.com', 1);

-- 9. Insérer les CCTs d'exemple (conformes au cahier des charges)
INSERT INTO CCTs (
    Nom, Agrement, DateAgrement, CategorieId, StatutId, DateStatut, ReseauId, DateRalliement,
    AdresseCCT, Latitude, Longitude, VilleId, Tel, CadreAutorisationId, IsPersonneMorale, TypeId, ProvinceId, RegionId
) VALUES
('A.A VISITE', '030/19', '2019-01-08', 1, 1, '2019-01-08', 1, '2019-01-08',
 'AL SALMIYA, OUELAD HADOU, LA COMMUNE HARAOUYIN PROVINE MADYOUNA', '33.5731', '-7.5898', 1, '0600000000', 1, 1, 1, 1, 1),

('A.M.T ESC SYSTEME', '45/19', '2019-01-08', 2, 1, '2019-01-08', 2, '2019-01-08',
 'Adresse 2', '34.0209', '-6.8416', 1, '0600000001', 1, 1, 1, 1, 1),

('AZZ BASSOU (VISITE TECH)', '37/97', '2019-01-08', 1, 1, '2019-01-08', 3, '2019-01-08',
 'Adresse 3', '35.7595', '-5.8339', 1, '0600000002', 1, 1, 1, 1, 1),

('ARBOUW VISITE TECHNIQUE', '030/98', '2019-01-08', 1, 1, '2019-01-08', 4, '2019-01-08',
 'Adresse 4', '32.2942', '-9.2272', 1, '0600000003', 1, 1, 1, 1, 1),

('ADITARA SERVICES', '129/017', '2019-01-08', 2, 1, '2019-01-08', 4, '2019-01-08',
 'Adresse 5', '31.7917', '-7.0926', 1, '0600000004', 1, 1, 1, 1, 1),

('B.B CONTROLE', '031/19', '2019-02-10', 1, 1, '2019-02-10', 1, '2019-02-10',
 'Adresse 6', '34.0209', '-6.8416', 1, '0600000005', 1, 0, 1, 1, 1),

('C.C TECH', '032/19', '2019-03-15', 1, 1, '2019-03-15', 2, '2019-03-15',
 'Adresse 7', '35.7595', '-5.8339', 1, '0600000006', 1, 1, 1, 1, 1),

('D.D SECURITE', '033/19', '2019-04-20', 1, 1, '2019-04-20', 3, '2019-04-20',
 'Adresse 8', '32.2942', '-9.2272', 1, '0600000007', 1, 0, 1, 1, 1),

('E.E AUTO', '034/19', '2019-05-25', 1, 1, '2019-05-25', 4, '2019-05-25',
 'Adresse 9', '31.7917', '-7.0926', 1, '0600000008', 1, 1, 1, 1, 1),

('F.F EXPERT', '035/19', '2019-06-30', 1, 1, '2019-06-30', 1, '2019-06-30',
 'Adresse 10', '30.4278', '-9.5981', 1, '0600000009', 1, 0, 1, 1, 1);

-- 10. Insérer quelques exemples d'historique de ralliement
INSERT INTO HistoriqueCCTs (CCTId, ReseauId, DateDebut, DateFin) VALUES
(1, 1, '2019-01-08', NULL),
(1, 2, '2018-01-01', '2018-12-31'),
(2, 2, '2019-01-08', NULL),
(3, 3, '2019-01-08', NULL),
(4, 4, '2019-01-08', NULL); 