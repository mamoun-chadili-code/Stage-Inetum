-- Script pour créer la table NiveauxFormation si elle n'existe pas
-- Exécutez ce script avant d'exécuter SeedDataChefsCentre.sql

-- 1. Créer la table NiveauxFormation si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NiveauxFormation')
BEGIN
    CREATE TABLE NiveauxFormation (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Libelle NVARCHAR(100) NOT NULL,
        Code NVARCHAR(10) NULL,
        Description NVARCHAR(500) NULL,
        DateCreation DATETIME2 DEFAULT GETDATE(),
        DateModification DATETIME2 NULL
    );
    
    PRINT 'Table NiveauxFormation créée avec succès';
END
ELSE
BEGIN
    PRINT 'La table NiveauxFormation existe déjà';
END

-- 2. Insérer les niveaux de formation de base
IF NOT EXISTS (SELECT * FROM NiveauxFormation WHERE Code = 'TECH')
BEGIN
    INSERT INTO NiveauxFormation (Libelle, Code, Description) VALUES 
    ('Technicien en mécanique automobile', 'TECH', 'Formation technique spécialisée en mécanique automobile'),
    ('Licence technique', 'LIC', 'Licence en techniques mécaniques'),
    ('Ingénieur en mécanique', 'ING', 'Formation d''ingénieur en mécanique'),
    ('Master en génie mécanique', 'MST', 'Master spécialisé en génie mécanique'),
    ('Doctorat en mécanique', 'DOC', 'Formation doctorale en mécanique');
    
    PRINT 'Niveaux de formation insérés avec succès';
END
ELSE
BEGIN
    PRINT 'Les niveaux de formation existent déjà';
END

-- 3. Vérifier les données insérées
SELECT 
    Id,
    Libelle,
    Code,
    Description,
    DateCreation
FROM NiveauxFormation
ORDER BY Id;

-- 4. Afficher le nombre de niveaux de formation
SELECT COUNT(*) as 'Nombre de niveaux de formation' FROM NiveauxFormation; 