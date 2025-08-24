-- =====================================================
-- SCRIPT DE SAUVEGARDE COMPLÈTE DE LA BASE DE DONNÉES
-- Base: CT_CNEH_DB
-- Date: $(Get-Date)
-- Description: Sauvegarde complète de toutes les tables et données
-- =====================================================

USE [master]
GO

PRINT ' === SAUVEGARDE COMPLÈTE DE LA BASE CT_CNEH_DB ==='
PRINT ''

-- Vérifier que la base existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'CT_CNEH_DB')
BEGIN
    PRINT '❌ ERREUR: La base CT_CNEH_DB n''existe pas!'
    RETURN
END

PRINT '✅ Base CT_CNEH_DB trouvée'
PRINT ''

-- Créer la base de sauvegarde si elle n'existe pas
DECLARE @backupDBName NVARCHAR(128) = 'CT_CNEH_DB_BACKUP_' + CONVERT(NVARCHAR(8), GETDATE(), 112) + '_' + REPLACE(CONVERT(NVARCHAR(8), GETDATE(), 108), ':', '')
DECLARE @backupPath NVARCHAR(500) = 'C:\Backup\' + @backupDBName + '.bak'

PRINT '📁 Nom de la base de sauvegarde: ' + @backupDBName
PRINT '📂 Chemin de sauvegarde: ' + @backupPath
PRINT ''

-- Créer le dossier de sauvegarde s'il n'existe pas
DECLARE @cmd NVARCHAR(500) = 'IF NOT EXIST "C:\Backup" MKDIR "C:\Backup"'
EXEC xp_cmdshell @cmd

-- Effectuer la sauvegarde complète
PRINT '🔄 Début de la sauvegarde...'
BACKUP DATABASE [CT_CNEH_DB] 
TO DISK = @backupPath
WITH 
    FORMAT,
    INIT,
    NAME = N'CT_CNEH_DB-Full Database Backup',
    SKIP,
    NOREWIND,
    NOUNLOAD,
    STATS = 10

IF @@ERROR = 0
BEGIN
    PRINT '✅ Sauvegarde complète réussie!'
    PRINT '📁 Fichier créé: ' + @backupPath
    
    -- Vérifier la taille du fichier de sauvegarde
    DECLARE @fileSize BIGINT
    SELECT @fileSize = size FROM sys.database_files WHERE name = 'CT_CNEH_DB'
    PRINT '💾 Taille de la base: ' + CAST(@fileSize / 1024 / 1024 AS VARCHAR) + ' MB'
END
ELSE
BEGIN
    PRINT '❌ ERREUR lors de la sauvegarde!'
    RETURN
END

PRINT ''
PRINT ' === SAUVEGARDE DES DONNÉES PAR TABLE ==='
PRINT ''

USE [CT_CNEH_DB]
GO

-- Fonction pour obtenir le nombre d'enregistrements d'une table
CREATE OR ALTER FUNCTION dbo.GetTableRowCount(@tableName NVARCHAR(128))
RETURNS INT
AS
BEGIN
    DECLARE @sql NVARCHAR(MAX) = 'SELECT @count = COUNT(*) FROM [' + @tableName + ']'
    DECLARE @count INT
    EXEC sp_executesql @sql, N'@count INT OUTPUT', @count OUTPUT
    RETURN @count
END
GO

-- Liste de toutes les tables de la base
DECLARE @tables TABLE (
    TableName NVARCHAR(128),
    RowCount INT,
    Script NVARCHAR(MAX)
)

-- Récupérer toutes les tables et leurs données
INSERT INTO @tables (TableName, RowCount)
SELECT 
    TABLE_NAME,
    dbo.GetTableRowCount(TABLE_NAME)
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE' 
AND TABLE_SCHEMA = 'dbo'
ORDER BY TABLE_NAME

-- Générer les scripts de données pour chaque table
DECLARE @tableName NVARCHAR(128)
DECLARE @rowCount INT
DECLARE @sql NVARCHAR(MAX)
DECLARE @script NVARCHAR(MAX)

DECLARE table_cursor CURSOR FOR
SELECT TableName, RowCount FROM @tables

OPEN table_cursor
FETCH NEXT FROM table_cursor INTO @tableName, @rowCount

WHILE @@FETCH_STATUS = 0
BEGIN
    PRINT '📋 Table: ' + @tableName + ' (' + CAST(@rowCount AS VARCHAR) + ' enregistrements)'
    
    IF @rowCount > 0
    BEGIN
        -- Générer le script INSERT pour cette table
        SET @sql = 'SELECT ''INSERT INTO [' + @tableName + '] ('' + STUFF((SELECT '', '' + COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ''' + @tableName + ''' ORDER BY ORDINAL_POSITION FOR XML PATH('''')), 1, 2, '''') + '') VALUES ('' + STUFF((SELECT '', '' + CASE WHEN DATA_TYPE IN (''char'', ''varchar'', ''nchar'', ''nvarchar'', ''text'', ''ntext'', ''datetime'', ''datetime2'', ''date'', ''time'') THEN ''N'''''' + ISNULL(CAST(['' + COLUMN_NAME + ''] AS NVARCHAR(MAX)), '''') + '''''''' ELSE CAST(ISNULL(['' + COLUMN_NAME + ''], 0) AS NVARCHAR(MAX)) END FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ''' + @tableName + ''' ORDER BY ORDINAL_POSITION FOR XML PATH('''')), 1, 2, '''') + '');'' FROM [' + @tableName + ']'
        
        BEGIN TRY
            EXEC sp_executesql @sql
            PRINT '   ✅ Script généré pour ' + @tableName
        END TRY
        BEGIN CATCH
            PRINT '   ⚠️  Impossible de générer le script pour ' + @tableName + ': ' + ERROR_MESSAGE()
        END CATCH
    END
    ELSE
    BEGIN
        PRINT '   ℹ️  Table vide - aucun script nécessaire'
    END
    
    FETCH NEXT FROM table_cursor INTO @tableName, @rowCount
END

CLOSE table_cursor
DEALLOCATE table_cursor

PRINT ''
PRINT ' === RÉSUMÉ DE LA SAUVEGARDE ==='

-- Afficher le résumé de toutes les tables
SELECT 
    TableName as 'Table',
    RowCount as 'Enregistrements',
    CASE 
        WHEN RowCount = 0 THEN 'Table vide'
        WHEN RowCount > 0 THEN 'Données présentes'
    END as 'Statut'
FROM @tables
ORDER BY TableName

PRINT ''
PRINT ' === INSTRUCTIONS DE RESTAURATION ==='
PRINT 'Pour restaurer cette base de données:'
PRINT '1. Ouvrir SQL Server Management Studio'
PRINT '2. Clic droit sur "Databases" → "Restore Database"'
PRINT '3. Sélectionner "Device" et choisir le fichier: ' + @backupPath
PRINT '4. Cliquer sur "OK" pour restaurer'
PRINT ''
PRINT ' === SAUVEGARDE TERMINÉE ==='
PRINT '✅ Base de données sauvegardée avec succès!'
PRINT '📁 Fichier de sauvegarde: ' + @backupPath
PRINT '🕒 Date: ' + CONVERT(NVARCHAR(30), GETDATE(), 120)
PRINT '💾 Taille: Vérifier le fichier .bak créé'
GO

-- Nettoyer la fonction temporaire
DROP FUNCTION IF EXISTS dbo.GetTableRowCount
GO
