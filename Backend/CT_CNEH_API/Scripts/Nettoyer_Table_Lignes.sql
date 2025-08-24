-- =====================================================
-- NETTOYAGE DE LA TABLE LIGNES
-- Suppression des colonnes en trop et contraintes conflictuelles
-- Date: $(Get-Date)
-- =====================================================

USE [CT_CNEH_DB]
GO

PRINT ' === NETTOYAGE DE LA TABLE LIGNES ==='
PRINT ''

-- Vérifier l'état actuel
PRINT '🔍 ÉTAT ACTUEL DE LA TABLE LIGNES:'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    ORDINAL_POSITION
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Lignes' 
ORDER BY ORDINAL_POSITION;

PRINT ''

-- Vérifier les contraintes actuelles
PRINT '🔍 CONTRAINTES ACTUELLES:'
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

-- ÉTAPE 1: Supprimer les contraintes de clés étrangères conflictuelles
PRINT '🗑️ SUPPRESSION DES CONTRAINTES CONFLICTUELLES:'

-- Supprimer FK_Lignes_CategorieCCTs_CategorieCCTId
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_CategorieCCTs_CategorieCCTId')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_CategorieCCTs_CategorieCCTId];
    PRINT '   ✅ FK_Lignes_CategorieCCTs_CategorieCCTId supprimée';
END
ELSE
    PRINT '   ℹ️  FK_Lignes_CategorieCCTs_CategorieCCTId n''existe pas';

-- Supprimer FK_Lignes_CategorieLignes_CategorieLigneId
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_CategorieLignes_CategorieLigneId')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_CategorieLignes_CategorieLigneId];
    PRINT '   ✅ FK_Lignes_CategorieLignes_CategorieLigneId supprimée';
END
ELSE
    PRINT '   ℹ️  FK_Lignes_CategorieLignes_CategorieLigneId n''existe pas';

-- Supprimer FK_Lignes_Categories_CategorieId1
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_Categories_CategorieId1')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_Categories_CategorieId1];
    PRINT '   ✅ FK_Lignes_Categories_CategorieId1 supprimée';
END
ELSE
    PRINT '   ℹ️  FK_Lignes_Categories_CategorieId1 n''existe pas';

-- Supprimer FK_Lignes_StatutLignes_StatutLigneId
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_StatutLignes_StatutLigneId')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_StatutLignes_StatutLigneId];
    PRINT '   ✅ FK_Lignes_StatutLignes_StatutLigneId supprimée';
END
ELSE
    PRINT '   ℹ️  FK_Lignes_StatutLignes_StatutLigneId n''existe pas';

-- Supprimer FK_Lignes_Statuts_StatutId
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_Statuts_StatutId')
BEGIN
    ALTER TABLE [Lignes] DROP CONSTRAINT [FK_Lignes_Statuts_StatutId];
    PRINT '   ✅ FK_Lignes_Statuts_StatutId supprimée';
END
ELSE
    PRINT '   ℹ️  FK_Lignes_Statuts_StatutId n''existe pas';

PRINT ''

-- ÉTAPE 2: Supprimer les colonnes en trop
PRINT '🗑️ SUPPRESSION DES COLONNES EN TROP:'

-- Supprimer CategorieCCTId
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Lignes' AND COLUMN_NAME = 'CategorieCCTId')
BEGIN
    ALTER TABLE [Lignes] DROP COLUMN [CategorieCCTId];
    PRINT '   ✅ Colonne CategorieCCTId supprimée';
END
ELSE
    PRINT '   ℹ️  Colonne CategorieCCTId n''existe pas';

-- Supprimer CategorieId1
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Lignes' AND COLUMN_NAME = 'CategorieId1')
BEGIN
    ALTER TABLE [Lignes] DROP COLUMN [CategorieId1];
    PRINT '   ✅ Colonne CategorieId1 supprimée';
END
ELSE
    PRINT '   ℹ️  Colonne CategorieId1 n''existe pas';

-- Supprimer CategorieLigneId
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Lignes' AND COLUMN_NAME = 'CategorieLigneId')
BEGIN
    ALTER TABLE [Lignes] DROP COLUMN [CategorieLigneId];
    PRINT '   ✅ Colonne CategorieLigneId supprimée';
END
ELSE
    PRINT '   ℹ️  Colonne CategorieLigneId n''existe pas';

-- Supprimer StatutLigneId
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Lignes' AND COLUMN_NAME = 'StatutLigneId')
BEGIN
    ALTER TABLE [Lignes] DROP COLUMN [StatutLigneId];
    PRINT '   ✅ Colonne StatutLigneId supprimée';
END
ELSE
    PRINT '   ℹ️  Colonne StatutLigneId n''existe pas';

PRINT ''

-- ÉTAPE 3: Recréer les bonnes contraintes de clés étrangères
PRINT '🔗 RECRÉATION DES BONNES CONTRAINTES:'

-- Contrainte pour CategorieId -> CategorieLignes
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_CategorieLignes_CategorieId')
BEGIN
    ALTER TABLE [Lignes] 
    ADD CONSTRAINT [FK_Lignes_CategorieLignes_CategorieId] 
    FOREIGN KEY ([CategorieId]) REFERENCES [CategorieLignes]([Id]);
    PRINT '   ✅ FK_Lignes_CategorieLignes_CategorieId créée';
END
ELSE
    PRINT '   ℹ️  FK_Lignes_CategorieLignes_CategorieId existe déjà';

-- Contrainte pour CCTId -> CCTs
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_CCTs_CCTId')
BEGIN
    ALTER TABLE [Lignes] 
    ADD CONSTRAINT [FK_Lignes_CCTs_CCTId] 
    FOREIGN KEY ([CCTId]) REFERENCES [CCTs]([Id]);
    PRINT '   ✅ FK_Lignes_CCTs_CCTId créée';
END
ELSE
    PRINT '   ℹ️  FK_Lignes_CCTs_CCTId existe déjà';

-- Contrainte pour StatutId -> StatutLignes
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_StatutLignes_StatutId')
BEGIN
    ALTER TABLE [Lignes] 
    ADD CONSTRAINT [FK_Lignes_StatutLignes_StatutId] 
    FOREIGN KEY ([StatutId]) REFERENCES [StatutLignes]([Id]);
    PRINT '   ✅ FK_Lignes_StatutLignes_StatutId créée';
END
ELSE
    PRINT '   ℹ️  FK_Lignes_StatutLignes_StatutId existe déjà';

-- Contrainte pour DecisionId -> Decisions (optionnelle)
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Lignes_Decisions_DecisionId')
BEGIN
    ALTER TABLE [Lignes] 
    ADD CONSTRAINT [FK_Lignes_Decisions_DecisionId] 
    FOREIGN KEY ([DecisionId]) REFERENCES [Decisions]([Id]);
    PRINT '   ✅ FK_Lignes_Decisions_DecisionId créée';
END
ELSE
    PRINT '   ℹ️  FK_Lignes_Decisions_DecisionId existe déjà';

PRINT ''

-- ÉTAPE 4: Vérifier l'état final
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
PRINT ' === NETTOYAGE TERMINÉ ==='
PRINT '✅ Table Lignes nettoyée avec succès!'
PRINT '📊 Colonnes: 11 (au lieu de 15)'
PRINT '🔗 Contraintes: 4 (au lieu de 8)'
PRINT '🎯 Structure: Maintenant compatible avec le modèle C#'
GO
