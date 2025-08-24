-- Script pour remplir les tables de référence
-- Exécuter ce script si les tables sont vides

USE [CT_CNEH_DB]
GO

PRINT '🚀 === REMPLISSAGE DES TABLES DE RÉFÉRENCE ==='
PRINT ''

-- 1. Remplir la table Statuts si elle est vide
PRINT '📊 REMPLISSAGE TABLE STATUTS:'
IF NOT EXISTS (SELECT 1 FROM Statuts)
BEGIN
    INSERT INTO Statuts (nom, description, isActive) VALUES
    ('En activité', 'Statut actif pour les entités en fonctionnement', 1),
    ('Suspendu', 'Statut suspendu pour les entités temporairement arrêtées', 1),
    ('En attente d''agrément', 'Statut en attente d''agrément officiel', 1),
    ('Fermé', 'Statut fermé pour les entités définitivement arrêtées', 1);
    
    PRINT '✅ 4 statuts ajoutés'
END
ELSE
BEGIN
    PRINT 'ℹ️ Table Statuts déjà remplie'
END
PRINT ''

-- 2. Remplir la table Villes si elle est vide
PRINT '📊 REMPLISSAGE TABLE VILLES:'
IF NOT EXISTS (SELECT 1 FROM Villes)
BEGIN
    INSERT INTO Villes (nom, code, RegionId) VALUES
    ('Rabat', 'RAB', 1),
    ('Casablanca', 'CASA', 2),
    ('Fès', 'FES', 3),
    ('Marrakech', 'MAR', 4),
    ('Tanger', 'TAN', 5),
    ('Agadir', 'AGA', 6),
    ('Tétouan', 'TET', 7);
    
    PRINT '✅ 7 villes ajoutées'
END
ELSE
BEGIN
    PRINT 'ℹ️ Table Villes déjà remplie'
END
PRINT ''

-- 3. Remplir la table CadreAutorisations si elle est vide
PRINT '📊 REMPLISSAGE TABLE CADREAUTORISATIONS:'
IF NOT EXISTS (SELECT 1 FROM CadreAutorisations)
BEGIN
    INSERT INTO CadreAutorisations (libelle, code) VALUES
    ('Autorisation Standard', 'AS'),
    ('Autorisation Spéciale', 'ASP'),
    ('Autorisation Temporaire', 'AT');
    
    PRINT '✅ 3 cadres d''autorisation ajoutés'
END
ELSE
BEGIN
    PRINT 'ℹ️ Table CadreAutorisations déjà remplie'
END
PRINT ''

-- 4. Vérification finale
PRINT '🔍 VÉRIFICATION FINALE:'
SELECT 
    'Statuts' as TableName,
    COUNT(*) as TotalRecords
FROM Statuts
UNION ALL
SELECT 
    'Villes' as TableName,
    COUNT(*) as TotalRecords
FROM Villes
UNION ALL
SELECT 
    'CadreAutorisations' as TableName,
    COUNT(*) as TotalRecords
FROM CadreAutorisations;

PRINT ''
PRINT '✅ REMPLISSAGE TERMINÉ - Vous pouvez maintenant exécuter le script des réseaux !'
GO
