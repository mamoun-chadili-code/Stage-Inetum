-- Script pour corriger la contrainte Foreign Key incorrecte sur ChefCentreId
USE [CT_CNEH_DB]
GO

PRINT 'Debut de la correction de la contrainte ChefCentreId...'
GO

-- Vérifier la contrainte actuelle
SELECT 
    fk.name AS FK_Name,
    OBJECT_NAME(fk.parent_object_id) AS TableName,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS ColumnName,
    OBJECT_NAME(fk.referenced_object_id) AS ReferencedTableName
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE fk.name = 'FK_Decisions_Agents_ChefCentreId';

-- Supprimer la contrainte incorrecte
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_Agents_ChefCentreId')
BEGIN
    ALTER TABLE [Decisions] DROP CONSTRAINT [FK_Decisions_Agents_ChefCentreId]
    PRINT 'Contrainte FK_Decisions_Agents_ChefCentreId supprimee'
END
ELSE
BEGIN
    PRINT 'Contrainte FK_Decisions_Agents_ChefCentreId n''existe pas'
END

-- Ajouter la contrainte correcte
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_ChefCentres_ChefCentreId')
BEGIN
    ALTER TABLE [Decisions] ADD CONSTRAINT [FK_Decisions_ChefCentres_ChefCentreId] 
    FOREIGN KEY ([ChefCentreId]) REFERENCES [ChefCentres]([Id])
    PRINT 'Contrainte FK_Decisions_ChefCentres_ChefCentreId ajoutee'
END
ELSE
BEGIN
    PRINT 'Contrainte FK_Decisions_ChefCentres_ChefCentreId existe deja'
END

-- Vérifier les contraintes finales
PRINT 'Contraintes finales sur la table Decisions:'
SELECT 
    fk.name AS FK_Name,
    OBJECT_NAME(fk.parent_object_id) AS TableName,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS ColumnName,
    OBJECT_NAME(fk.referenced_object_id) AS ReferencedTableName
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) = 'Decisions'
ORDER BY fk.name;

PRINT 'Correction terminee avec succes!'
GO
