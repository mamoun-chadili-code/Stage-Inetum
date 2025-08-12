-- Script final pour renommer les tables Formation avec les noms standards
-- Utilise les noms standards pour l'application

USE CT_CNEH_DB;
GO

PRINT '=== RENOMMAGE FINAL DES TABLES FORMATION ===';
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

-- Vérifier le nombre d'enregistrements
DECLARE @FormationsCount INT;
DECLARE @TypesFormationCount INT;

SELECT @FormationsCount = COUNT(*) FROM Formations_New;
SELECT @TypesFormationCount = COUNT(*) FROM TypesFormation_New;

PRINT 'Formations_New : ' + CAST(@FormationsCount AS VARCHAR) + ' enregistrements';
PRINT 'TypesFormation_New : ' + CAST(@TypesFormationCount AS VARCHAR) + ' enregistrements';

-- Supprimer les anciennes tables si elles existent
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    PRINT '⚠️  Suppression de l''ancienne table Formations...';
    DROP TABLE Formations;
    PRINT '✓ Ancienne table Formations supprimée';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    PRINT '⚠️  Suppression de l''ancienne table TypesFormation...';
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
    DECLARE @TypesFormationCountFinal INT;
    SELECT @TypesFormationCountFinal = COUNT(*) FROM TypesFormation;
    PRINT '✓ Table TypesFormation : ' + CAST(@TypesFormationCountFinal AS VARCHAR) + ' enregistrements';
END
ELSE
BEGIN
    PRINT '❌ ERREUR : La table TypesFormation n''existe pas';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    DECLARE @FormationsCountFinal INT;
    SELECT @FormationsCountFinal = COUNT(*) FROM Formations;
    PRINT '✓ Table Formations : ' + CAST(@FormationsCountFinal AS VARCHAR) + ' enregistrements';
END
ELSE
BEGIN
    PRINT '❌ ERREUR : La table Formations n''existe pas';
END

PRINT '';
PRINT '=== RENOMMAGE FINAL TERMINÉ ===';
PRINT '✓ Tables renommées avec succès';
PRINT '✓ Module Formation prêt à être utilisé avec les noms standards ! 🎉';
PRINT '';
PRINT 'Les tables sont maintenant :';
PRINT '   - TypesFormation (au lieu de TypesFormation_New)';
PRINT '   - Formations (au lieu de Formations_New)';
PRINT '';
PRINT 'Vous pouvez maintenant utiliser le module Formation dans l''application !';
PRINT '';
PRINT '📋 Prochaines étapes :';
PRINT '1. Redémarrez l''API backend';
PRINT '2. Testez le module Formation dans l''application';
PRINT '3. Vérifiez que les données s''affichent correctement'; 