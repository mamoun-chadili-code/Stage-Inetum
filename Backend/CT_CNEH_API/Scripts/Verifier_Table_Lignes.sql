-- =====================================================
-- VÉRIFICATION COMPLÈTE DE LA TABLE LIGNES
-- Diagnostic et correction des problèmes potentiels
-- Date: $(Get-Date)
-- =====================================================

USE [CT_CNEH_DB]
GO

PRINT ' === VÉRIFICATION COMPLÈTE DE LA TABLE LIGNES ==='
PRINT ''

-- ÉTAPE 1: Vérifier la structure de la table
PRINT '🔍 STRUCTURE DE LA TABLE LIGNES:'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    ORDINAL_POSITION,
    COLUMN_DEFAULT,
    CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Lignes' 
ORDER BY ORDINAL_POSITION;

PRINT ''

-- ÉTAPE 2: Vérifier les contraintes de clés étrangères
PRINT '🔍 CONTRAINTES DE CLÉS ÉTRANGÈRES:'
SELECT 
    fk.name as FK_Name,
    OBJECT_NAME(fk.parent_object_id) as TableName,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) as ColumnName,
    OBJECT_NAME(fk.referenced_object_id) as ReferencedTableName,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) as ReferencedColumnName,
    fk.delete_referential_action_desc as DeleteAction,
    fk.update_referential_action_desc as UpdateAction
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) = 'Lignes'
ORDER BY fk.name;

PRINT ''

-- ÉTAPE 3: Vérifier les index
PRINT '🔍 INDEX SUR LA TABLE LIGNES:'
SELECT 
    i.name as IndexName,
    i.type_desc as IndexType,
    i.is_unique as IsUnique,
    i.is_primary_key as IsPrimaryKey,
    i.allow_page_locks as AllowPageLocks,
    i.allow_row_locks as AllowRowLocks
FROM sys.indexes i
WHERE i.object_id = OBJECT_ID('Lignes')
ORDER BY i.name;

PRINT ''

-- ÉTAPE 4: Vérifier les données de référence
PRINT '🔍 DONNÉES DE RÉFÉRENCE:'

-- Vérifier CategorieLignes
SELECT 'CategorieLignes' as TableName, COUNT(*) as TotalRecords, MIN(Id) as MinId, MAX(Id) as MaxId FROM CategorieLignes;

-- Vérifier CCTs
SELECT 'CCTs' as TableName, COUNT(*) as TotalRecords, MIN(Id) as MinId, MAX(Id) as MaxId FROM CCTs;

-- Vérifier StatutLignes
SELECT 'StatutLignes' as TableName, COUNT(*) as TotalRecords, MIN(Id) as MinId, MAX(Id) as MaxId FROM StatutLignes;

-- Vérifier Decisions
SELECT 'Decisions' as TableName, COUNT(*) as TotalRecords, MIN(Id) as MinId, MAX(Id) as MaxId FROM Decisions;

PRINT ''

-- ÉTAPE 5: Vérifier les triggers
PRINT '🔍 TRIGGERS SUR LA TABLE LIGNES:'
SELECT 
    t.name as TriggerName,
    t.is_disabled as IsDisabled,
    t.is_instead_of_trigger as IsInsteadOfTrigger
FROM sys.triggers t
WHERE t.parent_id = OBJECT_ID('Lignes');

PRINT ''

-- ÉTAPE 6: Test d'insertion simple
PRINT '🧪 TEST D''INSERTION SIMPLE:'
BEGIN TRY
    INSERT INTO [Lignes] (
        [NumeroLigne], 
        [CategorieId], 
        [CCTId], 
        [StatutId], 
        [DateStatut], 
        [DateCreation]
    ) VALUES (
        999,  -- NumeroLigne de test
        1,    -- CategorieId existant
        1,    -- CCTId existant
        1,    -- StatutId existant
        GETDATE(),  -- DateStatut
        GETDATE()   -- DateCreation
    );
    
    PRINT '   ✅ Test d''insertion réussi!';
    
    -- Nettoyer le test
    DELETE FROM [Lignes] WHERE [NumeroLigne] = 999;
    PRINT '   ✅ Données de test supprimées';
    
END TRY
BEGIN CATCH
    PRINT '   ❌ ERREUR lors du test d''insertion:';
    PRINT '      Message: ' + ERROR_MESSAGE();
    PRINT '      Procédure: ' + ISNULL(ERROR_PROCEDURE(), 'N/A');
    PRINT '      Ligne: ' + CAST(ERROR_LINE() AS VARCHAR);
    PRINT '      Numéro: ' + CAST(ERROR_NUMBER() AS VARCHAR);
    PRINT '      État: ' + CAST(ERROR_STATE() AS VARCHAR);
    PRINT '      Gravité: ' + CAST(ERROR_SEVERITY() AS VARCHAR);
END CATCH

PRINT ''
PRINT ' === VÉRIFICATION TERMINÉE ==='
PRINT '💡 Analysez les résultats ci-dessus pour identifier les problèmes'
GO
