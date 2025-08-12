-- Script pour créer la table ChefsCentre si elle n'existe pas
-- Exécutez ce script avant d'exécuter SeedDataChefsCentre.sql

-- 1. Créer la table ChefsCentre si elle n'existe pas
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
    
    PRINT 'Table ChefsCentre créée avec succès';
END
ELSE
BEGIN
    PRINT 'La table ChefsCentre existe déjà';
END

-- 2. Créer les contraintes de clé étrangère si elles n'existent pas
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_ChefsCentre_CCTs_CCTId')
    BEGIN
        ALTER TABLE ChefsCentre 
        ADD CONSTRAINT FK_ChefsCentre_CCTs_CCTId 
        FOREIGN KEY (CCTId) REFERENCES CCTs(Id);
        
        PRINT 'Contrainte de clé étrangère FK_ChefsCentre_CCTs_CCTId créée';
    END
    ELSE
    BEGIN
        PRINT 'La contrainte FK_ChefsCentre_CCTs_CCTId existe déjà';
    END
END
ELSE
BEGIN
    PRINT 'ATTENTION: La table CCTs n''existe pas, impossible de créer la contrainte de clé étrangère';
END

-- 3. Créer la contrainte pour NiveauxFormation si la table existe
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NiveauxFormation')
BEGIN
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_ChefsCentre_NiveauxFormation_NiveauFormationInitialId')
    BEGIN
        ALTER TABLE ChefsCentre 
        ADD CONSTRAINT FK_ChefsCentre_NiveauxFormation_NiveauFormationInitialId 
        FOREIGN KEY (NiveauFormationInitialId) REFERENCES NiveauxFormation(Id);
        
        PRINT 'Contrainte de clé étrangère FK_ChefsCentre_NiveauxFormation_NiveauFormationInitialId créée';
    END
    ELSE
    BEGIN
        PRINT 'La contrainte FK_ChefsCentre_NiveauxFormation_NiveauFormationInitialId existe déjà';
    END
END
ELSE
BEGIN
    PRINT 'ATTENTION: La table NiveauxFormation n''existe pas, impossible de créer la contrainte de clé étrangère';
END

-- 4. Vérifier la structure de la table créée
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'ChefsCentre'
ORDER BY ORDINAL_POSITION;

-- 5. Afficher les contraintes créées
SELECT 
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE TABLE_NAME = 'ChefsCentre'; 