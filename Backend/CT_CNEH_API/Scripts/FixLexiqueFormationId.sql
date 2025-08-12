-- Script pour supprimer définitivement LexiqueFormationId
USE CT_CNEH_DB;
GO

PRINT '=== SUPPRESSION DÉFINITIVE DE LEXIQUEFORMATIONID ===';
PRINT '';

-- 1. Vérifier la structure actuelle
PRINT '1. STRUCTURE ACTUELLE DE LA TABLE FORMATIONS';
PRINT '--------------------------------------------';
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Formations'
ORDER BY ORDINAL_POSITION;

PRINT '';

-- 2. Supprimer LexiqueFormationId s'il existe
PRINT '2. SUPPRESSION DE LEXIQUEFORMATIONID';
PRINT '------------------------------------';
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'LexiqueFormationId')
BEGIN
    PRINT 'Suppression de la colonne LexiqueFormationId...';
    ALTER TABLE Formations DROP COLUMN LexiqueFormationId;
    PRINT '✓ Colonne LexiqueFormationId supprimée avec succès';
END
ELSE
BEGIN
    PRINT '✓ Colonne LexiqueFormationId n''existe pas (déjà supprimée)';
END

PRINT '';

-- 3. Vérifier la structure finale
PRINT '3. STRUCTURE FINALE DE LA TABLE FORMATIONS';
PRINT '------------------------------------------';
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Formations'
ORDER BY ORDINAL_POSITION;

PRINT '';
PRINT '=== CORRECTION TERMINÉE ===';
PRINT '✓ LexiqueFormationId supprimé définitivement';
PRINT '';
PRINT '🎯 Prochaines étapes :';
PRINT '1. Redémarrez l''API backend';
PRINT '2. Testez : https://localhost:54875/api/Formations/5';
PRINT '3. Testez l''application : http://localhost:3000/formations'; 