-- =====================================================
-- NETTOYAGE COMPLET DE LA TABLE LIGNES
-- Suppression des index, contraintes et colonnes en trop
-- Date: $(Get-Date)
-- =====================================================

USE [CT_CNEH_DB]
GO

PRINT ' === NETTOYAGE COMPLET DE LA TABLE LIGNES ==='
PRINT ''

-- ÉTAPE 1: Supprimer tous les index sur les colonnes à supprimer
PRINT '🗑️ SUPPRESSION DES INDEX:'

-- Supprimer IX_Lignes_CategorieCCTId
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Lignes_CategorieCCTId')
BEGIN
    DROP INDEX [IX_Lignes_CategorieCCTId] ON [Lignes];
    PRINT '   ✅ Index IX_Lignes_CategorieCCTId supprimé';
END
ELSE
    PRINT '   ℹ️  Index IX_Lignes_CategorieCCTId n''existe pas';

-- Supprimer IX_Lignes_CategorieId1
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Lignes_CategorieId1')
BEGIN
    DROP INDEX [IX_Lignes_CategorieId1] ON [Lignes];
    PRINT '   ✅ Index IX_Lignes_CategorieId1 supprimé';
END
ELSE
    PRINT '   ℹ️  Index IX_Lignes_CategorieId1 n''existe pas';

-- Supprimer IX_Lignes_CategorieLigneId
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Lignes_CategorieLigneId')
BEGIN
    DROP INDEX [IX_Lignes_CategorieLigneId] ON [Lignes];
    PRINT '   ✅ Index IX_Lignes_CategorieLigneId supprimé';
END
ELSE
    PRINT '   ℹ️  Index IX_Lignes_CategorieLigneId n''existe pas';

-- Supprimer IX_Lignes_StatutLigneId
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Lignes_StatutLigneId')
BEGIN
    DROP INDEX [IX_Lignes_StatutLigneId] ON [Lignes];
    PRINT '   ✅ Index IX_Lignes_StatutLigneId supprimé';
END
ELSE
    PRINT '   ℹ️  Index IX_Lignes_StatutLigneId n''existe pas';

PRINT ''

-- ÉTAPE 2: Supprimer toutes les contraintes de clés étrangères
PRINT '🗑️ SUPPRESSION DE TOUTES LES CONTRAINTES FK:'

-- Supprimer FK_Lignes_CategorieCCTs_CategorieCCTId
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_CategorieCCTs_CategorieCCTId')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_CategorieCCTs_CategorieCCTId];
    PRINT '   ✅ FK_Lignes_CategorieCCTs_CategorieCCTId supprimée';
END

-- Supprimer FK_Lignes_CategorieLignes_CategorieLigneId
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_CategorieLignes_CategorieLigneId')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_CategorieLignes_CategorieLigneId];
    PRINT '   ✅ FK_Lignes_CategorieLignes_CategorieLigneId supprimée';
END

-- Supprimer FK_Lignes_Categories_CategorieId1
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_Categories_CategorieId1')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_Categories_CategorieId1];
    PRINT '   ✅ FK_Lignes_Categories_CategorieId1 supprimée';
END

-- Supprimer FK_Lignes_StatutLignes_StatutLigneId
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_StatutLignes_StatutLigneId')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_StatutLignes_StatutLigneId];
    PRINT '   ✅ FK_Lignes_StatutLignes_StatutLigneId supprimée';
END

-- Supprimer FK_Lignes_Statuts_StatutId
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_Statuts_StatutId')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_Statuts_StatutId];
    PRINT '   ✅ FK_Lignes_Statuts_StatutId supprimée';
END

PRINT ''

-- ÉTAPE 3: Supprimer les colonnes en trop
PRINT '🗑️ SUPPRESSION DES COLONNES EN TROP:'

-- Supprimer CategorieCCTId
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Lignes' AND COLUMN_NAME = 'CategorieCCTId')
BEGIN
    ALTER TABLE [Lignes] DROP COLUMN [CategorieCCTId];
    PRINT '   ✅ Colonne CategorieCCTId supprimée';
END

-- Supprimer CategorieId1
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Lignes' AND COLUMN_NAME = 'CategorieId1')
BEGIN
    ALTER TABLE [Lignes] DROP COLUMN [CategorieId1];
    PRINT '   ✅ Colonne CategorieId1 supprimée';
END

-- Supprimer CategorieLigneId
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Lignes' AND COLUMN_NAME = 'CategorieLigneId')
BEGIN
    ALTER TABLE [Lignes] DROP COLUMN [CategorieLigneId];
    PRINT '   ✅ Colonne CategorieLigneId supprimée';
END

-- Supprimer StatutLigneId
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Lignes' AND COLUMN_NAME = 'StatutLigneId')
BEGIN
    ALTER TABLE [Lignes] DROP COLUMN [StatutLigneId];
    PRINT '   ✅ Colonne StatutLigneId supprimée';
END

PRINT ''

-- ÉTAPE 4: Recréer les bonnes contraintes de clés étrangères
PRINT '🔗 RECRÉATION DES BONNES CONTRAINTES:'

-- Contrainte pour CategorieId -> CategorieLignes
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_CategorieLignes_CategorieId')
BEGIN
    ALTER TABLE [Lignes] 
    ADD CONSTRAINT [FK_Lignes_CategorieLignes_CategorieId] 
    FOREIGN KEY ([CategorieId]) REFERENCES [CategorieLignes]([Id]);
    PRINT '   ✅ FK_Lignes_CategorieLignes_CategorieId créée';
END

-- Contrainte pour CCTId -> CCTs
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_CCTs_CCTId')
BEGIN
    ALTER TABLE [Lignes] 
    ADD CONSTRAINT [FK_Lignes_CCTs_CCTId] 
    FOREIGN KEY ([CCTId]) REFERENCES [CCTs]([Id]);
    PRINT '   ✅ FK_Lignes_CCTs_CCTId créée';
END

-- Contrainte pour StatutId -> StatutLignes
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_StatutLignes_StatutId')
BEGIN
    ALTER TABLE [Lignes] 
    ADD CONSTRAINT [FK_Lignes_StatutLignes_StatutId] 
    FOREIGN KEY ([StatutId]) REFERENCES [StatutLignes]([Id]);
    PRINT '   ✅ FK_Lignes_StatutLignes_StatutId créée';
END

-- Contrainte pour DecisionId -> Decisions (optionnelle)
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_Decisions_DecisionId')
BEGIN
    ALTER TABLE [Lignes] 
    ADD CONSTRAINT [FK_Lignes_Decisions_DecisionId] 
    FOREIGN KEY ([DecisionId]) REFERENCES [Decisions]([Id]);
    PRINT '   ✅ FK_Lignes_Decisions_DecisionId créée';
END

PRINT ''

-- ÉTAPE 5: Vérifier l'état final
PRINT '🔍 ÉTAT FINAL DE LA TABLE LIGNES:'
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
PRINT ' === NETTOYAGE COMPLET TERMINÉ ==='
PRINT '✅ Table Lignes nettoyée avec succès!'
PRINT '📊 Colonnes: 11 (au lieu de 15)'
PRINT '🔗 Contraintes: 4 (au lieu de 8)'
PRINT '🎯 Structure: Maintenant compatible avec le modèle C#'
GO
