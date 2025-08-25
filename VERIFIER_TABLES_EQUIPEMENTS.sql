-- Vérification du contenu des tables liées aux équipements
-- Exécutez ce script pour voir les données disponibles

-- 1. Vérifier le contenu de la table Lignes
SELECT '=== LIGNES DISPONIBLES ===' as Info;
SELECT Id, NumeroLigne, CCTId FROM Lignes ORDER BY Id;

-- 2. Vérifier le contenu de la table TypeEquipements
SELECT '=== TYPES D\'ÉQUIPEMENTS DISPONIBLES ===' as Info;
SELECT Id, Code, Libelle, Description, Etalonnable FROM TypeEquipements ORDER BY Id;

-- 3. Vérifier le contenu de la table CCTs
SELECT '=== CCTs DISPONIBLES ===' as Info;
SELECT Id, Nom FROM CCTs ORDER BY Id;

-- 4. Vérifier s'il existe une table StatutEquipements
SELECT '=== VÉRIFICATION TABLE STATUTS ===' as Info;
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutEquipements')
BEGIN
    SELECT 'Table StatutEquipements existe' as Status;
    SELECT Id, Libelle, Description FROM StatutEquipements ORDER BY Id;
END
ELSE
BEGIN
    SELECT 'Table StatutEquipements n''existe pas' as Status;
END

-- 5. Vérifier les contraintes et relations
SELECT '=== RELATIONS ET CONTRAINTES ===' as Info;
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Equipements' 
ORDER BY ORDINAL_POSITION;

-- 6. Vérifier les clés étrangères
SELECT '=== CLÉS ÉTRANGÈRES ===' as Info;
SELECT 
    fk.name AS FK_Name,
    OBJECT_NAME(fk.parent_object_id) AS Table_Name,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS Column_Name,
    OBJECT_NAME(fk.referenced_object_id) AS Referenced_Table_Name,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS Referenced_Column_Name
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) = 'Equipements';
