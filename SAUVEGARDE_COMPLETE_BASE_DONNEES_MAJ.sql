-- =====================================================
-- SAUVEGARDE COMPLÈTE ET À JOUR DE LA BASE DE DONNÉES
-- =====================================================
-- Date de création : $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
-- Base de données : CT_CNEH_DB
-- Description : Sauvegarde complète avec toutes les tables et données

USE master;
GO

-- Créer la sauvegarde avec un nom unique
DECLARE @BackupFileName NVARCHAR(255) = 'CT_CNEH_DB_Backup_' + CONVERT(NVARCHAR(8), GETDATE(), 112) + '_' + REPLACE(CONVERT(NVARCHAR(8), GETDATE(), 108), ':', '') + '.bak';
DECLARE @BackupPath NVARCHAR(255) = 'C:\Backups\CT_CNEH_DB\' + @BackupFileName;

-- Créer le dossier de sauvegarde s'il n'existe pas
DECLARE @Cmd NVARCHAR(500) = 'IF NOT EXIST "C:\Backups\CT_CNEH_DB" MKDIR "C:\Backups\CT_CNEH_DB"';
EXEC xp_cmdshell @Cmd;

-- Effectuer la sauvegarde complète
BACKUP DATABASE CT_CNEH_DB 
TO DISK = @BackupPath
WITH 
    FORMAT,
    INIT,
    NAME = N'CT_CNEH_DB-Full Database Backup',
    SKIP,
    NOREWIND,
    NOUNLOAD,
    STATS = 10,
    COMPRESSION;

GO

-- Vérifier la sauvegarde
RESTORE VERIFYONLY 
FROM DISK = @BackupPath;

GO

-- Afficher les informations de la sauvegarde
SELECT 
    b.database_name,
    b.backup_start_date,
    b.backup_finish_date,
    CAST(b.backup_size / 1024 / 1024 AS DECIMAL(10,2)) AS BackupSizeMB,
    b.backup_type,
    b.recovery_model,
    b.server_name,
    b.user_name
FROM msdb.dbo.backupset b
WHERE b.database_name = 'CT_CNEH_DB'
ORDER BY b.backup_start_date DESC;

GO

PRINT '✅ SAUVEGARDE COMPLÈTE TERMINÉE AVEC SUCCÈS !';
PRINT '📁 Fichier de sauvegarde : ' + @BackupPath;
PRINT '📊 Taille de la base : Vérifiez la taille dans les résultats ci-dessus';
GO
