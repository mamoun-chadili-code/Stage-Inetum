USE CT_CNEH_DB;
GO

-- Vérifier la structure de la table CCTs
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'CCTs' 
ORDER BY ORDINAL_POSITION;
GO

-- Vérifier les contraintes de clé étrangère
SELECT 
    fk.name AS FK_Name,
    OBJECT_NAME(fk.parent_object_id) AS Table_Name,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS Column_Name,
    OBJECT_NAME(fk.referenced_object_id) AS Referenced_Table_Name,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS Referenced_Column_Name
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) = 'CCTs';
GO

-- Vérifier les données de la table CCTs
SELECT TOP 5 * FROM CCTs;
GO
