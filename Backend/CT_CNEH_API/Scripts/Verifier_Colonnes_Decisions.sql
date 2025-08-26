-- Script pour vérifier les colonnes de la table Decisions
USE [CT_CNEH_DB]
GO

-- Vérifier la structure de la table Decisions
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Decisions' 
ORDER BY ORDINAL_POSITION

-- Vérifier les contraintes de clé étrangère
SELECT 
    fk.name AS FK_Name,
    OBJECT_NAME(fk.parent_object_id) AS Table_Name,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS Column_Name,
    OBJECT_NAME(fk.referenced_object_id) AS Referenced_Table_Name,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS Referenced_Column_Name
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) = 'Decisions'

-- Vérifier le contenu de la table Decisions (dernières 5 lignes)
SELECT TOP 5 * FROM Decisions ORDER BY Id DESC

GO
