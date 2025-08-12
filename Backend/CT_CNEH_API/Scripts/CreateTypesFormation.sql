-- Script SQL Server pour créer la table TypesFormation
-- Types de formation disponibles

USE CT_CNEH_DB;
GO

-- Vérifier si la table TypesFormation existe déjà
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    PRINT 'La table TypesFormation existe déjà.';
    RETURN;
END

-- Créer la table TypesFormation
CREATE TABLE TypesFormation (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Libelle NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    DureeEnJours INT,
    Actif BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- Insérer les types de formation de base
INSERT INTO TypesFormation (Libelle, Description, DureeEnJours) VALUES
('Formation de maintien de qualification des agents visiteurs par année calendaire', 
 'Formation obligatoire annuelle pour maintenir les qualifications des agents', 5),

('Formation initiale des agents visiteurs', 
 'Formation de base pour les nouveaux agents visiteurs', 15),

('Formation continue - Diagnostic électronique', 
 'Formation sur les systèmes de diagnostic électronique modernes', 3),

('Formation continue - Systèmes de sécurité', 
 'Formation sur les systèmes de sécurité active et passive', 4),

('Formation continue - Véhicules hybrides et électriques', 
 'Formation spécialisée sur les véhicules à technologies avancées', 5),

('Formation spécialisée - Contrôle technique des poids lourds', 
 'Formation pour le contrôle technique des véhicules lourds', 7),

('Formation avancée - Nouvelles technologies automobiles', 
 'Formation sur les dernières technologies automobiles', 6);

PRINT 'Table TypesFormation créée avec succès !';
PRINT '';
PRINT '=== TYPES DE FORMATION AJOUTÉS ===';
PRINT '1. Formation de maintien de qualification des agents visiteurs par année calendaire';
PRINT '2. Formation initiale des agents visiteurs';
PRINT '3. Formation continue - Diagnostic électronique';
PRINT '4. Formation continue - Systèmes de sécurité';
PRINT '5. Formation continue - Véhicules hybrides et électriques';
PRINT '6. Formation spécialisée - Contrôle technique des poids lourds';
PRINT '7. Formation avancée - Nouvelles technologies automobiles';
PRINT '';
PRINT 'La table TypesFormation est maintenant prête !'; 