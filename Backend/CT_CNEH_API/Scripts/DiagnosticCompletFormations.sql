-- Script de diagnostic complet pour le module Formation
-- Identifie exactement le problème avec les tables

USE CT_CNEH_DB;
GO

PRINT '=== DIAGNOSTIC COMPLET DU MODULE FORMATION ===';
PRINT '';

-- 1. Vérifier l'existence des tables
PRINT '1. Vérification de l''existence des tables...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    PRINT '   ✓ Table TypesFormation existe';
    
    -- Vérifier la structure de TypesFormation
    PRINT '   Structure de TypesFormation :';
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'TypesFormation'
    ORDER BY ORDINAL_POSITION;
END
ELSE
BEGIN
    PRINT '   ❌ Table TypesFormation n''existe pas';
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    PRINT '   ✓ Table Formations existe';
    
    -- Vérifier la structure de Formations
    PRINT '   Structure de Formations :';
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Formations'
    ORDER BY ORDINAL_POSITION;
END
ELSE
BEGIN
    PRINT '   ❌ Table Formations n''existe pas';
END

PRINT '';

-- 2. Vérifier les contraintes de clés étrangères
PRINT '2. Vérification des contraintes de clés étrangères...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    SELECT 
        CONSTRAINT_NAME,
        COLUMN_NAME,
        REFERENCED_TABLE_NAME,
        REFERENCED_COLUMN_NAME
    FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE kcu
    INNER JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS rc 
        ON kcu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME
    WHERE kcu.TABLE_NAME = 'Formations';
END

PRINT '';

-- 3. Vérifier les index
PRINT '3. Vérification des index...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    SELECT 
        i.name AS IndexName,
        i.type_desc AS IndexType,
        i.is_unique,
        i.is_primary_key
    FROM sys.indexes i
    WHERE i.object_id = OBJECT_ID('Formations');
END

PRINT '';

-- 4. Vérifier les données existantes
PRINT '4. Vérification des données existantes...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    DECLARE @TypesFormationCount INT;
    SELECT @TypesFormationCount = COUNT(*) FROM TypesFormation;
    PRINT '   TypesFormation : ' + CAST(@TypesFormationCount AS VARCHAR) + ' enregistrements';
    
    IF @TypesFormationCount > 0
    BEGIN
        PRINT '   Types de formation disponibles :';
        SELECT TOP 5 Id, Libelle FROM TypesFormation ORDER BY Id;
    END
END

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    DECLARE @FormationsCount INT;
    SELECT @FormationsCount = COUNT(*) FROM Formations;
    PRINT '   Formations : ' + CAST(@FormationsCount AS VARCHAR) + ' enregistrements';
    
    IF @FormationsCount > 0
    BEGIN
        PRINT '   Formations disponibles (TOP 5) :';
        SELECT TOP 5 * FROM Formations ORDER BY Id;
    END
END

PRINT '';

-- 5. Vérifier les tables de référence
PRINT '5. Vérification des tables de référence...';

DECLARE @CCTsCount INT;
DECLARE @AgentsCount INT;
DECLARE @ChefCentresCount INT;

SELECT @CCTsCount = COUNT(*) FROM CCTs;
SELECT @AgentsCount = COUNT(*) FROM Agents;
SELECT @ChefCentresCount = COUNT(*) FROM ChefCentres;

PRINT '   CCTs : ' + CAST(@CCTsCount AS VARCHAR) + ' enregistrements';
PRINT '   Agents : ' + CAST(@AgentsCount AS VARCHAR) + ' enregistrements';
PRINT '   ChefCentres : ' + CAST(@ChefCentresCount AS VARCHAR) + ' enregistrements';

PRINT '';

-- 6. Tenter de supprimer les contraintes
PRINT '6. Tentative de suppression des contraintes...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    DECLARE @dropConstraintSQL NVARCHAR(MAX) = '';
    
    SELECT @dropConstraintSQL = @dropConstraintSQL + 
        'ALTER TABLE Formations DROP CONSTRAINT ' + CONSTRAINT_NAME + ';' + CHAR(13)
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
    WHERE TABLE_NAME = 'Formations' AND CONSTRAINT_TYPE = 'FOREIGN KEY';
    
    IF @dropConstraintSQL != ''
    BEGIN
        PRINT '   Contraintes à supprimer :';
        PRINT @dropConstraintSQL;
        
        BEGIN TRY
            EXEC sp_executesql @dropConstraintSQL;
            PRINT '   ✓ Contraintes supprimées avec succès';
        END TRY
        BEGIN CATCH
            PRINT '   ❌ Erreur lors de la suppression des contraintes :';
            PRINT ERROR_MESSAGE();
        END CATCH
    END
    ELSE
    BEGIN
        PRINT '   Aucune contrainte de clé étrangère trouvée';
    END
END

PRINT '';

-- 7. Tenter de supprimer les index
PRINT '7. Tentative de suppression des index...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    DECLARE @dropIndexSQL NVARCHAR(MAX) = '';
    
    SELECT @dropIndexSQL = @dropIndexSQL + 
        'DROP INDEX ' + i.name + ' ON Formations;' + CHAR(13)
    FROM sys.indexes i
    WHERE i.object_id = OBJECT_ID('Formations') AND i.is_primary_key = 0;
    
    IF @dropIndexSQL != ''
    BEGIN
        PRINT '   Index à supprimer :';
        PRINT @dropIndexSQL;
        
        BEGIN TRY
            EXEC sp_executesql @dropIndexSQL;
            PRINT '   ✓ Index supprimés avec succès';
        END TRY
        BEGIN CATCH
            PRINT '   ❌ Erreur lors de la suppression des index :';
            PRINT ERROR_MESSAGE();
        END CATCH
    END
    ELSE
    BEGIN
        PRINT '   Aucun index non-primaire trouvé';
    END
END

PRINT '';

-- 8. Tenter de supprimer la table Formations
PRINT '8. Tentative de suppression de la table Formations...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    BEGIN TRY
        DROP TABLE Formations;
        PRINT '   ✓ Table Formations supprimée avec succès';
    END TRY
    BEGIN CATCH
        PRINT '   ❌ Erreur lors de la suppression de la table Formations :';
        PRINT ERROR_MESSAGE();
        PRINT '   Code d''erreur : ' + CAST(ERROR_NUMBER() AS VARCHAR);
        PRINT '   État : ' + CAST(ERROR_STATE() AS VARCHAR);
    END CATCH
END
ELSE
BEGIN
    PRINT '   ✓ Table Formations n''existait pas';
END

PRINT '';

-- 9. Tenter de supprimer la table TypesFormation
PRINT '9. Tentative de suppression de la table TypesFormation...';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    BEGIN TRY
        DROP TABLE TypesFormation;
        PRINT '   ✓ Table TypesFormation supprimée avec succès';
    END TRY
    BEGIN CATCH
        PRINT '   ❌ Erreur lors de la suppression de la table TypesFormation :';
        PRINT ERROR_MESSAGE();
        PRINT '   Code d''erreur : ' + CAST(ERROR_NUMBER() AS VARCHAR);
        PRINT '   État : ' + CAST(ERROR_STATE() AS VARCHAR);
    END CATCH
END
ELSE
BEGIN
    PRINT '   ✓ Table TypesFormation n''existait pas';
END

PRINT '';
PRINT '=== DIAGNOSTIC COMPLET TERMINÉ ===';
PRINT '';
PRINT 'Si les tables n''ont pas pu être supprimées, vous devrez :';
PRINT '1. Identifier les contraintes bloquantes';
PRINT '2. Les supprimer manuellement';
PRINT '3. Puis exécuter le script de recréation'; 