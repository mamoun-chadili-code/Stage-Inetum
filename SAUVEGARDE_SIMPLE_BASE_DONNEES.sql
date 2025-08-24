-- =====================================================
-- SAUVEGARDE SIMPLE ET RAPIDE DE LA BASE DE DONNÉES
-- =====================================================
-- Date : $(Get-Date -Format "yyyy-MM-dd")
-- Base : CT_CNEH_DB
-- Description : Sauvegarde rapide sans options complexes

-- Sauvegarde simple
BACKUP DATABASE CT_CNEH_DB 
TO DISK = 'C:\CT_CNEH_DB_Backup_' + CONVERT(NVARCHAR(8), GETDATE(), 112) + '.bak'
WITH FORMAT;

GO

PRINT '✅ SAUVEGARDE SIMPLE TERMINÉE !';
PRINT '📁 Fichier créé dans C:\ avec la date du jour';
GO
