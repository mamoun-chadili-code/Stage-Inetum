-- =====================================================
-- RESTAURATION DE LA BASE DE DONNÉES
-- =====================================================
-- Date : $(Get-Date -Format "yyyy-MM-dd")
-- Base : CT_CNEH_DB
-- Description : Script de restauration depuis un fichier .bak

USE master;
GO

-- Remplacer le chemin par votre fichier de sauvegarde
DECLARE @BackupFile NVARCHAR(255) = 'C:\CT_CNEH_DB_Backup_20241201.bak'; -- MODIFIEZ CETTE LIGNE

-- Vérifier que le fichier existe
IF NOT EXISTS (SELECT 1 FROM sys.dm_os_file_exists(@BackupFile))
BEGIN
    PRINT '❌ FICHIER DE SAUVEGARDE NON TROUVÉ : ' + @BackupFile;
    PRINT '📁 Vérifiez le chemin et le nom du fichier';
    RETURN;
END

-- Arrêter les connexions à la base
ALTER DATABASE CT_CNEH_DB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;

-- Restaurer la base de données
RESTORE DATABASE CT_CNEH_DB 
FROM DISK = @BackupFile
WITH 
    REPLACE,
    RECOVERY;

-- Remettre la base en mode multi-utilisateur
ALTER DATABASE CT_CNEH_DB SET MULTI_USER;

GO

PRINT '✅ RESTAURATION TERMINÉE AVEC SUCCÈS !';
PRINT '🔄 Base de données CT_CNEH_DB restaurée depuis : ' + @BackupFile;
GO
