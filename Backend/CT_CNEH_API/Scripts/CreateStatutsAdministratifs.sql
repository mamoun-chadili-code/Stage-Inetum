-- Script pour créer la table StatutsAdministratifs et ajouter les données de référence
-- Exécutez ce script dans SQL Server Management Studio

USE CT_CNEH_DB;
GO

-- Créer la table StatutsAdministratifs si elle n'existe pas
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutsAdministratifs')
BEGIN
    CREATE TABLE StatutsAdministratifs (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Libelle NVARCHAR(100) NOT NULL,
        Description NVARCHAR(500) NULL,
        DateCreation DATETIME2 DEFAULT GETDATE(),
        DateModification DATETIME2 DEFAULT GETDATE()
    );
    
    PRINT 'Table StatutsAdministratifs créée avec succès.';
END
ELSE
BEGIN
    PRINT 'La table StatutsAdministratifs existe déjà.';
END

-- Vérifier si des données existent déjà
IF NOT EXISTS (SELECT * FROM StatutsAdministratifs)
BEGIN
    -- Insérer les statuts administratifs de référence
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
    
    PRINT '6 statuts administratifs de référence ont été ajoutés.';
END
ELSE
BEGIN
    PRINT 'Des données existent déjà dans la table StatutsAdministratifs.';
END

-- Afficher les statuts créés
SELECT Id, Libelle, Description FROM StatutsAdministratifs ORDER BY Id;

PRINT '';
PRINT '=== STATUTS ADMINISTRATIFS CRÉÉS ===';
PRINT 'Vous pouvez maintenant exécuter le script TestAgents.sql'; 