-- Script de migration pour ajouter la table StatutsAdministratifs
-- Exécutez ce script dans SQL Server Management Studio

USE CT_CNEH_DB;
GO

-- Vérifier si la table existe déjà
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutsAdministratifs')
BEGIN
    -- Créer la table StatutsAdministratifs
    CREATE TABLE StatutsAdministratifs (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Libelle NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        DateCreation DATETIME2 DEFAULT GETDATE(),
        DateModification DATETIME2 DEFAULT GETDATE()
    );
    
    PRINT 'Table StatutsAdministratifs créée avec succès.';
    
    -- Insérer les données de référence
    INSERT INTO StatutsAdministratifs (Libelle, Description) VALUES 
    ('CAPV', 'Certificat d''Aptitude Professionnelle Validé'),
    ('CAP validé', 'Certificat d''Aptitude Professionnelle validé'),
    ('CAP en cours', 'Certificat d''Aptitude Professionnelle en cours de validation'),
    ('CAP expiré', 'Certificat d''Aptitude Professionnelle expiré'),
    ('CAP suspendu', 'Certificat d''Aptitude Professionnelle suspendu'),
    ('CAP révoqué', 'Certificat d''Aptitude Professionnelle révoqué'),
    ('En formation', 'Agent en cours de formation'),
    ('Stagiaire', 'Agent en stage'),
    ('Retraité', 'Agent retraité'),
    ('Démissionnaire', 'Agent ayant démissionné');
    
    PRINT '10 statuts administratifs de référence ont été ajoutés.';
END
ELSE
BEGIN
    PRINT 'La table StatutsAdministratifs existe déjà.';
END

-- Vérifier si la colonne StatutAdministratifId existe dans la table Agents
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Agents' AND COLUMN_NAME = 'StatutAdministratifId')
BEGIN
    -- Ajouter la colonne StatutAdministratifId à la table Agents
    ALTER TABLE Agents ADD StatutAdministratifId INT NULL;
    
    -- Ajouter la contrainte de clé étrangère
    ALTER TABLE Agents ADD CONSTRAINT FK_Agents_StatutsAdministratifs 
    FOREIGN KEY (StatutAdministratifId) REFERENCES StatutsAdministratifs(Id);
    
    PRINT 'Colonne StatutAdministratifId ajoutée à la table Agents.';
END
ELSE
BEGIN
    PRINT 'La colonne StatutAdministratifId existe déjà dans la table Agents.';
END

-- Afficher les statuts créés
SELECT Id, Libelle, Description FROM StatutsAdministratifs ORDER BY Id;

PRINT '';
PRINT '=== MIGRATION TERMINÉE ===';
PRINT 'Vous pouvez maintenant exécuter le script TestAgents.sql'; 