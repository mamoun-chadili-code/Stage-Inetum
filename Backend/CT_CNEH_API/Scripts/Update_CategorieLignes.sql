-- Script de mise à jour de la table CategorieLignes
-- Exécuter ce script dans SQL Server Management Studio ou Azure Data Studio

USE CT_CNEH_DB;
GO

-- Vérifier si la table existe
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CategorieLignes')
BEGIN
    PRINT '❌ Table CategorieLignes n''existe pas. Création...';
    
    CREATE TABLE CategorieLignes (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Libelle NVARCHAR(255) NOT NULL,
        Code NVARCHAR(50) NOT NULL UNIQUE,
        Description NVARCHAR(500) NULL,
        DateCreation DATETIME2 DEFAULT GETDATE(),
        DateModification DATETIME2 DEFAULT GETDATE(),
        EstActif BIT DEFAULT 1
    );
    
    PRINT '✅ Table CategorieLignes créée avec succès !';
END
ELSE
BEGIN
    PRINT '✅ Table CategorieLignes existe déjà.';
    
    -- Vérifier et ajouter les colonnes manquantes
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('CategorieLignes') AND name = 'DateCreation')
    BEGIN
        ALTER TABLE CategorieLignes ADD DateCreation DATETIME2 DEFAULT GETDATE();
        PRINT '✅ Colonne DateCreation ajoutée.';
    END
    
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('CategorieLignes') AND name = 'DateModification')
    BEGIN
        ALTER TABLE CategorieLignes ADD DateModification DATETIME2 DEFAULT GETDATE();
        PRINT '✅ Colonne DateModification ajoutée.';
    END
    
    IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('CategorieLignes') AND name = 'EstActif')
    BEGIN
        ALTER TABLE CategorieLignes ADD EstActif BIT DEFAULT 1;
        PRINT '✅ Colonne EstActif ajoutée.';
    END
    
    -- Mettre à jour les contraintes de longueur si nécessaire
    IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('CategorieLignes') AND name = 'Libelle' AND max_length < 510)
    BEGIN
        ALTER TABLE CategorieLignes ALTER COLUMN Libelle NVARCHAR(255) NOT NULL;
        PRINT '✅ Colonne Libelle mise à jour vers NVARCHAR(255).';
    END
    
    IF EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('CategorieLignes') AND name = 'Code' AND max_length < 100)
    BEGIN
        ALTER TABLE CategorieLignes ALTER COLUMN Code NVARCHAR(50) NOT NULL;
        PRINT '✅ Colonne Code mise à jour vers NVARCHAR(50).';
    END
END

-- Vider la table existante pour insérer les nouvelles données
DELETE FROM CategorieLignes;
PRINT '🗑️ Anciennes données supprimées.';

-- Insérer les nouvelles catégories avec descriptions
INSERT INTO CategorieLignes (Libelle, Code, Description, DateCreation, DateModification, EstActif)
VALUES
    ('Véhicules légers (VL)', 'VL', 'Voitures particulières, utilitaires ≤ 3,5T', GETDATE(), GETDATE(), 1),
    ('Poids lourds (PL)', 'PL', 'Camions, bus, véhicules > 3,5T', GETDATE(), GETDATE(), 1),
    ('Motocycles', 'MOTO', 'Motos et cyclomoteurs', GETDATE(), GETDATE(), 1),
    ('Véhicules toute catégorie', 'VTC', 'Ligne polyvalente pour tous types de véhicules', GETDATE(), GETDATE(), 1);

PRINT '✅ Nouvelles catégories insérées avec succès !';

-- Vérifier les données insérées
SELECT 
    Id,
    Libelle,
    Code,
    Description,
    DateCreation,
    DateModification,
    EstActif
FROM CategorieLignes
ORDER BY Id;

PRINT '🎯 Mise à jour de la table CategorieLignes terminée avec succès !';
GO


