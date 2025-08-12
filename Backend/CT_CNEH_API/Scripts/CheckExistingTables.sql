-- Script pour vérifier les tables existantes dans la base de données
-- Exécutez ce script pour voir quelles tables sont disponibles

-- 1. Lister toutes les tables de la base de données
SELECT 
    TABLE_NAME as 'Nom de la table',
    TABLE_TYPE as 'Type'
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;

-- 2. Vérifier si la table NiveauxFormation existe
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'NiveauxFormation')
BEGIN
    PRINT 'La table NiveauxFormation existe'
    SELECT * FROM NiveauxFormation;
END
ELSE
BEGIN
    PRINT 'La table NiveauxFormation n''existe pas'
END

-- 3. Vérifier la structure de la table ChefsCentre si elle existe
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'ChefsCentre')
BEGIN
    PRINT 'La table ChefsCentre existe'
    SELECT 
        COLUMN_NAME,
        DATA_TYPE,
        IS_NULLABLE,
        COLUMN_DEFAULT
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'ChefsCentre'
    ORDER BY ORDINAL_POSITION;
END
ELSE
BEGIN
    PRINT 'La table ChefsCentre n''existe pas'
END

-- 4. Vérifier les CCTs disponibles
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CCTs')
BEGIN
    PRINT 'CCTs disponibles:'
    SELECT Id, Nom FROM CCTs ORDER BY Id;
END
ELSE
BEGIN
    PRINT 'La table CCTs n''existe pas'
END

-- 5. Compter le nombre d'enregistrements dans chaque table
SELECT 
    'CCTs' as TableName,
    COUNT(*) as RecordCount
FROM CCTs
UNION ALL
SELECT 
    'ChefsCentre' as TableName,
    COUNT(*) as RecordCount
FROM ChefsCentre
UNION ALL
SELECT 
    'NiveauxFormation' as TableName,
    COUNT(*) as RecordCount
FROM NiveauxFormation; 