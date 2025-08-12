-- Script complet pour créer toutes les tables nécessaires pour le module Chef de Centre
-- Exécutez ce script en premier, puis SeedDataChefsCentre.sql

PRINT '=== DÉBUT DU SCRIPT DE CONFIGURATION CHEF DE CENTRE ===';

-- 1. Créer la table NiveauxFormation si elle n'existe pas
PRINT '1. Création de la table NiveauxFormation...';
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
    
    PRINT '   ✓ Table NiveauxFormation créée avec succès';
END
ELSE
BEGIN
    PRINT '   ✓ La table NiveauxFormation existe déjà';
END

-- 2. Insérer les niveaux de formation de base
PRINT '2. Insertion des niveaux de formation...';
IF NOT EXISTS (SELECT * FROM NiveauxFormation WHERE Code = 'TECH')
BEGIN
    INSERT INTO NiveauxFormation (Libelle, Code, Description) VALUES 
    ('Technicien en mécanique automobile', 'TECH', 'Formation technique spécialisée en mécanique automobile'),
    ('Licence technique', 'LIC', 'Licence en techniques mécaniques'),
    ('Ingénieur en mécanique', 'ING', 'Formation d''ingénieur en mécanique'),
    ('Master en génie mécanique', 'MST', 'Master spécialisé en génie mécanique'),
    ('Doctorat en mécanique', 'DOC', 'Formation doctorale en mécanique');
    
    PRINT '   ✓ Niveaux de formation insérés avec succès';
END
ELSE
BEGIN
    PRINT '   ✓ Les niveaux de formation existent déjà';
END

-- 3. Créer la table ChefsCentre si elle n'existe pas
PRINT '3. Création de la table ChefsCentre...';
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ChefsCentre')
BEGIN
    CREATE TABLE ChefsCentre (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nom NVARCHAR(100) NOT NULL,
        Prenom NVARCHAR(100) NOT NULL,
        CIN NVARCHAR(50) NOT NULL,
        CCTId INT NULL,
        DateAffectationCCT DATETIME2 NULL,
        ReferenceApprobationCNEH NVARCHAR(100) NULL,
        AnneeAutorisation INT NOT NULL DEFAULT 0,
        DateApprobationCNEH DATETIME2 NULL,
        Tel NVARCHAR(20) NOT NULL,
        Mail NVARCHAR(100) NULL,
        CNSS NVARCHAR(50) NOT NULL,
        Sexe BIT NOT NULL DEFAULT 0,
        DateNaissance DATETIME2 NULL,
        NiveauFormationInitialId INT NULL,
        DateCreation DATETIME2 DEFAULT GETDATE(),
        DateModification DATETIME2 NULL
    );
    
    PRINT '   ✓ Table ChefsCentre créée avec succès';
END
ELSE
BEGIN
    PRINT '   ✓ La table ChefsCentre existe déjà';
END

-- 4. Créer les contraintes de clé étrangère
PRINT '4. Création des contraintes de clé étrangère...';

-- Contrainte vers CCTs
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_ChefsCentre_CCTs_CCTId')
    BEGIN
        ALTER TABLE ChefsCentre 
        ADD CONSTRAINT FK_ChefsCentre_CCTs_CCTId 
        FOREIGN KEY (CCTId) REFERENCES CCTs(Id);
        
        PRINT '   ✓ Contrainte FK_ChefsCentre_CCTs_CCTId créée';
    END
    ELSE
    BEGIN
        PRINT '   ✓ La contrainte FK_ChefsCentre_CCTs_CCTId existe déjà';
    END
END
ELSE
BEGIN
    PRINT '   ⚠ ATTENTION: La table CCTs n''existe pas';
END

-- Contrainte vers NiveauxFormation
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NiveauxFormation')
BEGIN
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_ChefsCentre_NiveauxFormation_NiveauFormationInitialId')
    BEGIN
        ALTER TABLE ChefsCentre 
        ADD CONSTRAINT FK_ChefsCentre_NiveauxFormation_NiveauFormationInitialId 
        FOREIGN KEY (NiveauFormationInitialId) REFERENCES NiveauxFormation(Id);
        
        PRINT '   ✓ Contrainte FK_ChefsCentre_NiveauxFormation_NiveauFormationInitialId créée';
    END
    ELSE
    BEGIN
        PRINT '   ✓ La contrainte FK_ChefsCentre_NiveauxFormation_NiveauFormationInitialId existe déjà';
    END
END
ELSE
BEGIN
    PRINT '   ⚠ ATTENTION: La table NiveauxFormation n''existe pas';
END

-- 5. Vérification finale
PRINT '5. Vérification finale...';

-- Vérifier les tables créées
SELECT 
    TABLE_NAME as 'Table',
    CASE 
        WHEN TABLE_NAME = 'CCTs' THEN (SELECT COUNT(*) FROM CCTs)
        WHEN TABLE_NAME = 'ChefsCentre' THEN (SELECT COUNT(*) FROM ChefsCentre)
        WHEN TABLE_NAME = 'NiveauxFormation' THEN (SELECT COUNT(*) FROM NiveauxFormation)
        ELSE 0
    END as 'Nombre d''enregistrements'
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_NAME IN ('CCTs', 'ChefsCentre', 'NiveauxFormation')
ORDER BY TABLE_NAME;

-- Afficher les niveaux de formation créés
PRINT 'Niveaux de formation disponibles:';
SELECT Id, Libelle, Code FROM NiveauxFormation ORDER BY Id;

-- Afficher quelques CCTs disponibles
PRINT 'CCTs disponibles (premiers 5):';
SELECT TOP 5 Id, Nom FROM CCTs ORDER BY Id;

PRINT '=== FIN DU SCRIPT DE CONFIGURATION ===';
PRINT 'Vous pouvez maintenant exécuter SeedDataChefsCentre.sql pour ajouter des données de test'; 