-- Script pour ajouter des catégories de lignes de test
USE CT_CNEH_DB;
GO

-- Vérifier si la table existe
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CategorieLignes')
BEGIN
    PRINT 'La table CategorieLignes n''existe pas.';
    RETURN;
END

-- Vérifier s'il y a déjà des données
IF EXISTS (SELECT TOP 1 1 FROM CategorieLignes)
BEGIN
    PRINT 'La table CategorieLignes contient déjà des données.';
    SELECT * FROM CategorieLignes;
    RETURN;
END

-- Ajouter des catégories de lignes de test
INSERT INTO CategorieLignes (Libelle, Code, Description) VALUES
('Véhicules toute catégorie', 'VTC', 'Autorisation pour tous types de véhicules'),
('Véhicules légers', 'VL', 'Véhicules de moins de 3,5 tonnes'),
('Véhicules lourds', 'VH', 'Véhicules de plus de 3,5 tonnes'),
('Véhicules de transport en commun', 'VTC', 'Bus, minibus et autocars'),
('Véhicules de transport de marchandises', 'VTM', 'Camions et véhicules utilitaires'),
('Véhicules agricoles', 'VA', 'Tracteurs et engins agricoles'),
('Véhicules de chantier', 'VC', 'Engins de construction et chantier'),
('Véhicules spéciaux', 'VS', 'Véhicules d''intervention et services spéciaux');

-- Vérifier les données insérées
PRINT 'Catégories de lignes ajoutées avec succès:';
SELECT * FROM CategorieLignes;

-- Vérifier le nombre total
SELECT COUNT(*) as TotalCategories FROM CategorieLignes;
GO







