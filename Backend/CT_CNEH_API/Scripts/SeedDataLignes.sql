-- Script SQL Server pour ajouter 12 exemples de lignes
-- Utilise les vrais IDs des CCTs existants (17-44)

-- 1. Insérer les statuts de ligne (si ils n'existent pas déjà)
IF NOT EXISTS (SELECT * FROM StatutLignes WHERE Code = 'ACT')
BEGIN
    INSERT INTO StatutLignes (Libelle, Code) VALUES 
    ('En activité', 'ACT'),
    ('Suspendu', 'SUS'),
    ('Fermé', 'FER'),
    ('En maintenance', 'MAINT'),
    ('Désactivé', 'DESACT'),
    ('En attente', 'ATT'),
    ('Réactivation', 'REACT');
END

-- 2. Insérer les catégories de ligne (si elles n'existent pas déjà)
IF NOT EXISTS (SELECT * FROM CategorieCCTs WHERE Code = 'VL')
BEGIN
    INSERT INTO CategorieCCTs (Libelle, Code) VALUES 
    ('Véhicules légers', 'VL'),
    ('Véhicules utilitaires', 'VU'),
    ('Poids lourds', 'PL'),
    ('Motos', 'MOTO'),
    ('Toutes catégories', 'ALL'),
    ('Véhicules spéciaux', 'VS'),
    ('Remorques', 'REM');
END

-- 3. Supprimer les lignes existantes pour éviter les doublons
DELETE FROM Lignes WHERE Id > 0;

-- 4. Insérer 12 exemples de lignes avec les vrais IDs des CCTs (17-44)
INSERT INTO Lignes (CCTId, NumLigne, TypeLigneId, StatutId, DateStatut, Decision, DecisionDate) VALUES
-- Ligne 1: A.A VISITES (ID 17) - Véhicules légers - En activité (1997)
(17, 1, 1, 1, '1997-01-02', 'Création de la ligne', '1997-01-02'),

-- Ligne 2: AZZ BASSOU (ID 19) - Véhicules utilitaires - En activité (1997)
(19, 1, 2, 1, '1997-01-15', 'Extension des services', '1997-01-15'),

-- Ligne 3: ARBOUW VISITE TECHNIQUE (ID 20) - Véhicules légers - En activité (1997)
(20, 1, 1, 1, '1997-01-10', 'Création de la ligne', '1997-01-10'),

-- Ligne 4: ADITARA SERVICES (ID 21) - Poids lourds - Suspendu (1997)
(21, 1, 3, 2, '1997-02-20', 'Suspension temporaire - Maintenance équipements', '1997-02-20'),

-- Ligne 5: B.B CONTROLE (ID 22) - Véhicules légers - En activité (1997)
(22, 1, 1, 1, '1997-02-25', 'Création de la ligne', '1997-02-25'),

-- Ligne 6: C.C TECH (ID 23) - Motos - En maintenance (1997)
(23, 1, 4, 4, '1997-03-10', 'Maintenance préventive - Calibration équipements', '1997-03-10'),

-- Ligne 7: D.D SECURITE (ID 24) - Véhicules légers - En activité (1997)
(24, 1, 1, 1, '1997-01-29', 'Création de la ligne', '1997-01-29'),

-- Ligne 8: E.E AUTO (ID 25) - Véhicules utilitaires - Fermé (1997)
(25, 1, 2, 3, '1997-04-15', 'Fermeture définitive - Faible rentabilité', '1997-04-15'),

-- Ligne 9: F.F EXPERT (ID 26) - Véhicules légers - En activité (1997)
(26, 1, 1, 1, '1997-02-04', 'Création de la ligne', '1997-02-04'),

-- Ligne 10: A.A VISITE (ID 27) - Toutes catégories - En activité (1997)
(27, 1, 5, 1, '1997-03-01', 'Extension des services - Polyvalence', '1997-03-01'),

-- Ligne 11: A.M.T ESC SYSTEME (ID 28) - Véhicules légers - En activité (2019)
(28, 1, 1, 1, '2019-03-15', 'Création de la ligne', '2019-03-15'),

-- Ligne 12: AZZ BASSOU (ID 29) - Poids lourds - Désactivé (2019)
(29, 1, 3, 5, '2019-05-20', 'Désactivation temporaire - Renouvellement équipements', '2019-05-20');

-- 5. Afficher les lignes créées pour vérification
SELECT 
    l.Id,
    l.NumLigne,
    c.Nom as CCT,
    cat.Libelle as Categorie,
    s.Libelle as Statut,
    l.DateStatut,
    l.Decision,
    l.DecisionDate
FROM Lignes l
JOIN CCTs c ON l.CCTId = c.Id
JOIN CategorieCCTs cat ON l.TypeLigneId = cat.Id
JOIN StatutLignes s ON l.StatutId = s.Id
ORDER BY l.Id;

-- 6. Afficher le nombre total de lignes créées
SELECT COUNT(*) as 'Nombre total de lignes' FROM Lignes;

-- 7. Statistiques par CCT
SELECT 
    c.Nom as CCT,
    COUNT(l.Id) as 'Nombre de lignes',
    STRING_AGG(CONCAT('Ligne ', l.NumLigne, ' (', cat.Libelle, ')'), ', ') as 'Détail des lignes'
FROM CCTs c
LEFT JOIN Lignes l ON c.Id = l.CCTId
LEFT JOIN CategorieCCTs cat ON l.TypeLigneId = cat.Id
GROUP BY c.Id, c.Nom
ORDER BY c.Nom;

-- 8. Statistiques par statut
SELECT 
    s.Libelle as Statut,
    COUNT(l.Id) as 'Nombre de lignes'
FROM StatutLignes s
LEFT JOIN Lignes l ON s.Id = l.StatutId
GROUP BY s.Id, s.Libelle
ORDER BY COUNT(l.Id) DESC; 