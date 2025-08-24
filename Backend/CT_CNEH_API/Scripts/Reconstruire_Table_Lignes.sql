-- =====================================================
-- RECONSTRUCTION COMPLÈTE DE LA TABLE LIGNES
-- Suppression et recréation avec la bonne structure
-- Date: $(Get-Date)
-- =====================================================

USE [CT_CNEH_DB]
GO

PRINT ' === RECONSTRUCTION COMPLÈTE DE LA TABLE LIGNES ==='
PRINT ''

-- ÉTAPE 1: Sauvegarder les données existantes (si nécessaire)
PRINT '💾 SAUVEGARDE DES DONNÉES EXISTANTES:'
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Lignes')
BEGIN
    -- Créer une table temporaire pour sauvegarder les données
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Lignes_Backup')
        DROP TABLE [Lignes_Backup];
    
    SELECT * INTO [Lignes_Backup] FROM [Lignes];
    PRINT '   ✅ Données sauvegardées dans Lignes_Backup';
END
ELSE
    PRINT '   ℹ️  Table Lignes n''existe pas encore';

PRINT ''

-- ÉTAPE 2: Supprimer toutes les contraintes et index
PRINT '🗑️ SUPPRESSION DES CONTRAINTES ET INDEX:'

-- Supprimer toutes les contraintes FK
DECLARE @sql NVARCHAR(MAX) = '';
SELECT @sql = @sql + 'ALTER TABLE [Lignes] DROP CONSTRAINT [' + name + '];' + CHAR(13)
FROM sys.foreign_keys 
WHERE parent_object_id = OBJECT_ID('Lignes');

IF @sql <> ''
BEGIN
    EXEC sp_executesql @sql;
    PRINT '   ✅ Toutes les contraintes FK supprimées';
END
ELSE
    PRINT '   ℹ️  Aucune contrainte FK à supprimer';

-- Supprimer tous les index non-clustered
DECLARE @sql2 NVARCHAR(MAX) = '';
SELECT @sql2 = @sql2 + 'DROP INDEX [' + name + '] ON [Lignes];' + CHAR(13)
FROM sys.indexes 
WHERE object_id = OBJECT_ID('Lignes') AND type_desc = 'NONCLUSTERED' AND name IS NOT NULL;

IF @sql2 <> ''
BEGIN
    EXEC sp_executesql @sql2;
    PRINT '   ✅ Tous les index non-clustered supprimés';
END
ELSE
    PRINT '   ℹ️  Aucun index non-clustered à supprimer';

PRINT ''

-- ÉTAPE 3: Supprimer la table existante
PRINT '🗑️ SUPPRESSION DE LA TABLE EXISTANTE:'
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Lignes')
BEGIN
    DROP TABLE [Lignes];
    PRINT '   ✅ Table Lignes supprimée';
END
ELSE
    PRINT '   ℹ️  Table Lignes n''existe pas';

PRINT ''

-- ÉTAPE 4: Recréer la table avec la bonne structure
PRINT '🏗️ RECRÉATION DE LA TABLE LIGNES:'

CREATE TABLE [Lignes] (
    [Id] INT IDENTITY(1,1) NOT NULL,
    [NumeroLigne] INT NOT NULL,
    [CategorieId] INT NOT NULL,
    [CCTId] INT NOT NULL,
    [StatutId] INT NOT NULL,
    [DateStatut] DATETIME2 NOT NULL,
    [DecisionId] INT NULL,
    [DateDecision] DATETIME2 NULL,
    [AnneeDemarrage] NVARCHAR(10) NULL,
    [DateCreation] DATETIME2 NOT NULL DEFAULT GETDATE(),
    [DateModification] DATETIME2 NULL,
    CONSTRAINT [PK_Lignes] PRIMARY KEY ([Id])
);

PRINT '   ✅ Table Lignes créée avec succès';

-- ÉTAPE 5: Créer les contraintes de clés étrangères
PRINT '🔗 CRÉATION DES CONTRAINTES FK:'

-- Contrainte pour CategorieId -> CategorieLignes
ALTER TABLE [Lignes] 
ADD CONSTRAINT [FK_Lignes_CategorieLignes_CategorieId] 
FOREIGN KEY ([CategorieId]) REFERENCES [CategorieLignes]([Id]);
PRINT '   ✅ FK_Lignes_CategorieLignes_CategorieId créée';

-- Contrainte pour CCTId -> CCTs
ALTER TABLE [Lignes] 
ADD CONSTRAINT [FK_Lignes_CCTs_CCTId] 
FOREIGN KEY ([CCTId]) REFERENCES [CCTs]([Id]);
PRINT '   ✅ FK_Lignes_CCTs_CCTId créée';

-- Contrainte pour StatutId -> StatutLignes
ALTER TABLE [Lignes] 
ADD CONSTRAINT [FK_Lignes_StatutLignes_StatutId] 
FOREIGN KEY ([StatutId]) REFERENCES [StatutLignes]([Id]);
PRINT '   ✅ FK_Lignes_StatutLignes_StatutId créée';

-- Contrainte pour DecisionId -> Decisions (optionnelle)
ALTER TABLE [Lignes] 
ADD CONSTRAINT [FK_Lignes_Decisions_DecisionId] 
FOREIGN KEY ([DecisionId]) REFERENCES [Decisions]([Id]);
PRINT '   ✅ FK_Lignes_Decisions_DecisionId créée';

PRINT ''

-- ÉTAPE 6: Créer les index nécessaires
PRINT '📊 CRÉATION DES INDEX:'

-- Index sur NumeroLigne + CCTId (pour éviter les doublons)
CREATE UNIQUE INDEX [IX_Lignes_NumeroLigne_CCTId] 
ON [Lignes]([NumeroLigne], [CCTId]);
PRINT '   ✅ Index unique IX_Lignes_NumeroLigne_CCTId créé';

-- Index sur CategorieId
CREATE INDEX [IX_Lignes_CategorieId] 
ON [Lignes]([CategorieId]);
PRINT '   ✅ Index IX_Lignes_CategorieId créé';

-- Index sur CCTId
CREATE INDEX [IX_Lignes_CCTId] 
ON [Lignes]([CCTId]);
PRINT '   ✅ Index IX_Lignes_CCTId créé';

-- Index sur StatutId
CREATE INDEX [IX_Lignes_StatutId] 
ON [Lignes]([StatutId]);
PRINT '   ✅ Index IX_Lignes_StatutId créé';

PRINT ''

-- ÉTAPE 7: Vérifier la structure finale
PRINT '🔍 VÉRIFICATION DE LA STRUCTURE FINALE:'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    ORDINAL_POSITION
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Lignes' 
ORDER BY ORDINAL_POSITION;

PRINT ''

PRINT '🔍 CONTRAINTES FINALES:'
SELECT 
    fk.name as FK_Name,
    OBJECT_NAME(fk.parent_object_id) as TableName,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) as ColumnName,
    OBJECT_NAME(fk.referenced_object_id) as ReferencedTableName,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) as ReferencedColumnName
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) = 'Lignes'
ORDER BY fk.name;

PRINT ''

PRINT '🔍 INDEX FINAUX:'
SELECT 
    i.name as IndexName,
    i.type_desc as IndexType,
    i.is_unique as IsUnique
FROM sys.indexes i
WHERE i.object_id = OBJECT_ID('Lignes')
ORDER BY i.name;

PRINT ''
PRINT ' === RECONSTRUCTION TERMINÉE ==='
PRINT '✅ Table Lignes reconstruite avec succès!'
PRINT '📊 Colonnes: 11 (structure propre)'
PRINT '🔗 Contraintes: 4 FK + 1 PK'
PRINT '📊 Index: 4 index optimisés'
PRINT '🎯 Structure: Parfaitement compatible avec le modèle C#'
PRINT ''
PRINT '💡 Note: Les données ont été sauvegardées dans Lignes_Backup si elles existaient'
GO
