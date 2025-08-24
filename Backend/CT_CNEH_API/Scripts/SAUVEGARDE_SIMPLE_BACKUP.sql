-- =====================================================
-- SAUVEGARDE SIMPLE DE LA BASE DE DONNÉES
-- Base: CT_CNEH_DB
-- Date: $(Get-Date)
-- Description: Sauvegarde complète en fichier .bak
-- =====================================================

USE [master]
GO

PRINT ' === SAUVEGARDE SIMPLE DE CT_CNEH_DB ==='
PRINT ''

-- Vérifier que la base existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'CT_CNEH_DB')
BEGIN
    PRINT '❌ ERREUR: La base CT_CNEH_DB n''existe pas!'
    RETURN
END

PRINT '✅ Base CT_CNEH_DB trouvée'
PRINT ''

-- Créer le dossier de sauvegarde
DECLARE @backupFolder NVARCHAR(500) = 'C:\Backup\'
DECLARE @backupFileName NVARCHAR(500) = 'CT_CNEH_DB_' + CONVERT(NVARCHAR(8), GETDATE(), 112) + '_' + REPLACE(CONVERT(NVARCHAR(8), GETDATE(), 108), ':', '') + '.bak'
DECLARE @fullBackupPath NVARCHAR(500) = @backupFolder + @backupFileName

PRINT '📁 Dossier de sauvegarde: ' + @backupFolder
PRINT '📂 Nom du fichier: ' + @backupFileName
PRINT '🔄 Chemin complet: ' + @fullBackupPath
PRINT ''

-- Créer le dossier s'il n'existe pas
DECLARE @cmd NVARCHAR(500) = 'IF NOT EXIST "' + @backupFolder + '" MKDIR "' + @backupFolder + '"'
EXEC xp_cmdshell @cmd

-- Effectuer la sauvegarde
PRINT '🔄 Début de la sauvegarde...'
BACKUP DATABASE [CT_CNEH_DB] 
TO DISK = @fullBackupPath
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
    PRINT ''
    PRINT '✅ SAUVEGARDE RÉUSSIE!'
    PRINT '📁 Fichier créé: ' + @fullBackupPath
    
    -- Informations sur la base
    DECLARE @dbSize BIGINT
    SELECT @dbSize = SUM(size) FROM sys.database_files WHERE database_id = DB_ID('CT_CNEH_DB')
    PRINT '💾 Taille de la base: ' + CAST(@dbSize / 1024 / 1024 AS VARCHAR) + ' MB'
    
    -- Vérifier le fichier créé
    DECLARE @fileExists BIT = 0
    SET @cmd = 'IF EXIST "' + @fullBackupPath + '" SET fileExists=1'
    EXEC xp_cmdshell @cmd
    
    IF @fileExists = 1
        PRINT '✅ Fichier de sauvegarde vérifié et accessible'
    ELSE
        PRINT '⚠️  Vérifiez manuellement l''existence du fichier'
        
    PRINT ''
    PRINT ' === INSTRUCTIONS DE RESTAURATION ==='
    PRINT 'Pour restaurer cette base:'
    PRINT '1. Ouvrir SQL Server Management Studio'
    PRINT '2. Clic droit sur "Databases" → "Restore Database"'
    PRINT '3. Sélectionner "Device" et choisir: ' + @fullBackupPath
    PRINT '4. Cliquer sur "OK" pour restaurer'
    PRINT ''
    PRINT '🕒 Sauvegarde effectuée le: ' + CONVERT(NVARCHAR(30), GETDATE(), 120)
END
ELSE
BEGIN
    PRINT '❌ ERREUR lors de la sauvegarde!'
    PRINT 'Vérifiez les permissions et l''espace disque disponible'
END

GO
