-- Script pour corriger la structure de la table Formations
-- Supprime les colonnes incorrectes générées par Entity Framework

USE CT_CNEH_DB;
GO

PRINT '=== CORRECTION DE LA STRUCTURE FORMATIONS ===';
PRINT '';

-- Vérifier la structure actuelle
PRINT 'Structure actuelle de la table Formations :';
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Formations' 
ORDER BY ORDINAL_POSITION;

PRINT '';

-- Supprimer les colonnes incorrectes si elles existent
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'ChefCentreId1')
BEGIN
    PRINT 'Suppression de la colonne ChefCentreId1...';
    ALTER TABLE Formations DROP COLUMN ChefCentreId1;
    PRINT '✓ Colonne ChefCentreId1 supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'LexiqueFormationId')
BEGIN
    PRINT 'Suppression de la colonne LexiqueFormationId...';
    ALTER TABLE Formations DROP COLUMN LexiqueFormationId;
    PRINT '✓ Colonne LexiqueFormationId supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'DateDebutFormation')
BEGIN
    PRINT 'Suppression de la colonne DateDebutFormation...';
    ALTER TABLE Formations DROP COLUMN DateDebutFormation;
    PRINT '✓ Colonne DateDebutFormation supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'DateFinFormation')
BEGIN
    PRINT 'Suppression de la colonne DateFinFormation...';
    ALTER TABLE Formations DROP COLUMN DateFinFormation;
    PRINT '✓ Colonne DateFinFormation supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'Animateur1')
BEGIN
    PRINT 'Suppression de la colonne Animateur1...';
    ALTER TABLE Formations DROP COLUMN Animateur1;
    PRINT '✓ Colonne Animateur1 supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'Animateur2')
BEGIN
    PRINT 'Suppression de la colonne Animateur2...';
    ALTER TABLE Formations DROP COLUMN Animateur2;
    PRINT '✓ Colonne Animateur2 supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'ValidationCNEH')
BEGIN
    PRINT 'Suppression de la colonne ValidationCNEH...';
    ALTER TABLE Formations DROP COLUMN ValidationCNEH;
    PRINT '✓ Colonne ValidationCNEH supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'NumeroValidationCNEH')
BEGIN
    PRINT 'Suppression de la colonne NumeroValidationCNEH...';
    ALTER TABLE Formations DROP COLUMN NumeroValidationCNEH;
    PRINT '✓ Colonne NumeroValidationCNEH supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'DateValidation')
BEGIN
    PRINT 'Suppression de la colonne DateValidation...';
    ALTER TABLE Formations DROP COLUMN DateValidation;
    PRINT '✓ Colonne DateValidation supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'ResultatFormation')
BEGIN
    PRINT 'Suppression de la colonne ResultatFormation...';
    ALTER TABLE Formations DROP COLUMN ResultatFormation;
    PRINT '✓ Colonne ResultatFormation supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'IntituleFormation')
BEGIN
    PRINT 'Suppression de la colonne IntituleFormation...';
    ALTER TABLE Formations DROP COLUMN IntituleFormation;
    PRINT '✓ Colonne IntituleFormation supprimée';
END

PRINT '';

-- Vérifier la structure finale
PRINT 'Structure finale de la table Formations :';
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Formations' 
ORDER BY ORDINAL_POSITION;

PRINT '';
PRINT '=== CORRECTION TERMINÉE ===';
PRINT '✓ Structure de la table Formations corrigée';
PRINT '✓ Colonnes incorrectes supprimées';
PRINT '';
PRINT '📋 Prochaines étapes :';
PRINT '1. Redémarrez l''API backend';
PRINT '2. Testez l''API : http://localhost:7000/api/Formations';
PRINT '3. Testez l''application : http://localhost:3000/formations'; 