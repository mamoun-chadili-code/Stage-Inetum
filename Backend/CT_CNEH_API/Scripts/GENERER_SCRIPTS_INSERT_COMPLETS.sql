-- =====================================================
-- GÉNÉRATION DE SCRIPTS INSERT COMPLETS
-- Base: CT_CNEH_DB
-- Date: $(Get-Date)
-- Description: Génère des scripts INSERT pour toutes les tables avec données
-- =====================================================

USE [CT_CNEH_DB]
GO

PRINT ' === GÉNÉRATION DE SCRIPTS INSERT COMPLETS ==='
PRINT ''

-- Créer une procédure pour générer les scripts INSERT
CREATE OR ALTER PROCEDURE dbo.GenerateInsertScripts
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @tableName NVARCHAR(128)
    DECLARE @columnList NVARCHAR(MAX)
    DECLARE @sql NVARCHAR(MAX)
    DECLARE @rowCount INT
    
    -- Cursor pour parcourir toutes les tables
    DECLARE table_cursor CURSOR FOR
    SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_TYPE = 'BASE TABLE' 
    AND TABLE_SCHEMA = 'dbo'
    ORDER BY TABLE_NAME
    
    OPEN table_cursor
    FETCH NEXT FROM table_cursor INTO @tableName
    
    WHILE @@FETCH_STATUS = 0
    BEGIN
        -- Vérifier le nombre d'enregistrements
        SET @sql = 'SELECT @count = COUNT(*) FROM [' + @tableName + ']'
        EXEC sp_executesql @sql, N'@count INT OUTPUT', @rowCount OUTPUT
        
        PRINT '📋 Table: ' + @tableName + ' (' + CAST(@rowCount AS VARCHAR) + ' enregistrements)'
        
        IF @rowCount > 0
        BEGIN
            -- Générer la liste des colonnes
            SELECT @columnList = STUFF((
                SELECT ', ' + COLUMN_NAME 
                FROM INFORMATION_SCHEMA.COLUMNS 
                WHERE TABLE_NAME = @tableName 
                ORDER BY ORDINAL_POSITION 
                FOR XML PATH('')
            ), 1, 2, '')
            
            PRINT '   📝 Colonnes: ' + @columnList
            
            -- Générer les scripts INSERT
            SET @sql = '
-- =====================================================
-- DONNÉES DE LA TABLE: ' + @tableName + '
-- Nombre d''enregistrements: ' + CAST(@rowCount AS VARCHAR) + '
-- Date de génération: ' + CONVERT(NVARCHAR(30), GETDATE(), 120) + '
-- =====================================================

'
            
            -- Ajouter les instructions INSERT
            SET @sql = @sql + '-- Supprimer les données existantes si nécessaire
-- DELETE FROM [' + @tableName + '];
-- GO

-- Insérer les données
'
            
            -- Générer les INSERT statements
            SET @sql = @sql + 'SELECT ''INSERT INTO [' + @tableName + '] ('' + ''' + @columnList + ''') VALUES ('' + 
    STUFF((
        SELECT '', '' + 
            CASE 
                WHEN DATA_TYPE IN (''char'', ''varchar'', ''nchar'', ''nvarchar'', ''text'', ''ntext'') 
                THEN ''N'''''' + ISNULL(CAST(['' + COLUMN_NAME + ''] AS NVARCHAR(MAX)), '''') + ''''''''
                WHEN DATA_TYPE IN (''datetime'', ''datetime2'', ''date'', ''time'') 
                THEN ''N'''''' + ISNULL(CONVERT(NVARCHAR(30), ['' + COLUMN_NAME + ''], 120), '''') + ''''''''
                WHEN DATA_TYPE = ''bit'' 
                THEN CAST(ISNULL(['' + COLUMN_NAME + ''], 0) AS NVARCHAR(1))
                WHEN DATA_TYPE IN (''int'', ''bigint'', ''smallint'', ''tinyint'') 
                THEN CAST(ISNULL(['' + COLUMN_NAME + ''], 0) AS NVARCHAR(20))
                WHEN DATA_TYPE IN (''decimal'', ''numeric'', ''float'', ''real'') 
                THEN CAST(ISNULL(['' + COLUMN_NAME + ''], 0) AS NVARCHAR(50))
                ELSE ''N'''''' + ISNULL(CAST(['' + COLUMN_NAME + ''] AS NVARCHAR(MAX)), '''') + ''''''''
            END
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = ''' + @tableName + ''' 
        ORDER BY ORDINAL_POSITION 
        FOR XML PATH('''')
    ), 1, 2, '''') + '');''
FROM [' + @tableName + ']
ORDER BY 1;
'
            
            -- Exécuter et afficher les scripts
            BEGIN TRY
                EXEC sp_executesql @sql
                PRINT '   ✅ Scripts INSERT générés pour ' + @tableName
            END TRY
            BEGIN CATCH
                PRINT '   ⚠️  Erreur lors de la génération pour ' + @tableName + ': ' + ERROR_MESSAGE()
            END CATCH
        END
        ELSE
        BEGIN
            PRINT '   ℹ️  Table vide - aucun script nécessaire'
        END
        
        PRINT ''
        FETCH NEXT FROM table_cursor INTO @tableName
    END
    
    CLOSE table_cursor
    DEALLOCATE table_cursor
    
    PRINT ' === GÉNÉRATION TERMINÉE ==='
    PRINT '✅ Tous les scripts INSERT ont été générés!'
    PRINT '📋 Copiez les résultats dans un fichier .sql pour les sauvegarder'
END
GO

-- Exécuter la procédure
EXEC dbo.GenerateInsertScripts

-- Nettoyer
DROP PROCEDURE IF EXISTS dbo.GenerateInsertScripts
GO
