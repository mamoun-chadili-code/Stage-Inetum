-- Script pour renommer les tables Formation avec les noms originaux
-- Utilise les noms standards pour l'application

USE CT_CNEH_DB;
GO

PRINT '=== RENOMMAGE DES TABLES FORMATION ===';
PRINT '';

-- Vérifier que les tables existent
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations_New')
BEGIN
    PRINT '❌ ERREUR : La table Formations_New n''existe pas';
    RETURN;
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation_New')
BEGIN
    PRINT '❌ ERREUR : La table TypesFormation_New n''existe pas';
    RETURN;
END

PRINT '✓ Tables Formations_New et TypesFormation_New existent';

-- Vérifier si les tables originales existent déjà
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    PRINT '⚠️  La table Formations existe déjà';
    PRINT 'Suppression de l''ancienne table Formations...';
    DROP TABLE Formations;
    PRINT '✓ Ancienne table Formations supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    PRINT '⚠️  La table TypesFormation existe déjà';
    PRINT 'Suppression de l''ancienne table TypesFormation...';
    DROP TABLE TypesFormation;
    PRINT '✓ Ancienne table TypesFormation supprimée';
END

-- Renommer les tables
PRINT '';
PRINT 'Renommage des tables...';

-- Renommer TypesFormation_New en TypesFormation
EXEC sp_rename 'TypesFormation_New', 'TypesFormation';
PRINT '✓ TypesFormation_New → TypesFormation';

-- Renommer Formations_New en Formations
EXEC sp_rename 'Formations_New', 'Formations';
PRINT '✓ Formations_New → Formations';

PRINT '';
PRINT '=== VÉRIFICATION FINALE ===';

-- Vérifier que les tables ont été renommées
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    DECLARE @TypesFormationCount INT;
    SELECT @TypesFormationCount = COUNT(*) FROM TypesFormation;
    PRINT '✓ Table TypesFormation : ' + CAST(@TypesFormationCount AS VARCHAR) + ' enregistrements';
END
ELSE
BEGIN
    PRINT '❌ ERREUR : La table TypesFormation n''existe pas';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    DECLARE @FormationsCount INT;
    SELECT @FormationsCount = COUNT(*) FROM Formations;
    PRINT '✓ Table Formations : ' + CAST(@FormationsCount AS VARCHAR) + ' enregistrements';
END
ELSE
BEGIN
    PRINT '❌ ERREUR : La table Formations n''existe pas';
END

PRINT '';
PRINT '=== RENOMMAGE TERMINÉ ===';
PRINT '✓ Tables renommées avec succès';
PRINT '✓ Module Formation prêt à être utilisé avec les noms standards ! 🎉';
PRINT '';
PRINT 'Les tables sont maintenant :';
PRINT '   - TypesFormation (au lieu de TypesFormation_New)';
PRINT '   - Formations (au lieu de Formations_New)';
PRINT '';
PRINT 'Vous pouvez maintenant utiliser le module Formation dans l''application !'; 