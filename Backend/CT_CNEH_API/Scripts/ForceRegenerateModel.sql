-- Script pour forcer la régénération du modèle Entity Framework
USE CT_CNEH_DB;
GO

PRINT '=== FORÇAGE DE LA RÉGÉNÉRATION DU MODÈLE ===';
PRINT '';

-- 1. Vérifier et nettoyer les contraintes problématiques
PRINT '1. NETTOYAGE DES CONTRAINTES';
PRINT '---------------------------';

-- Supprimer les contraintes de clé étrangère si elles existent
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_Formations_LexiqueFormations_LexiqueFormationId')
BEGIN
    PRINT 'Suppression de la contrainte FK_Formations_LexiqueFormations_LexiqueFormationId...';
    ALTER TABLE Formations DROP CONSTRAINT FK_Formations_LexiqueFormations_LexiqueFormationId;
    PRINT '✓ Contrainte supprimée';
END
ELSE
BEGIN
    PRINT '✓ Contrainte FK_Formations_LexiqueFormations_LexiqueFormationId n''existe pas';
END

-- 2. Vérifier la structure finale
PRINT '';
PRINT '2. STRUCTURE FINALE DE LA TABLE FORMATIONS';
PRINT '------------------------------------------';
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Formations'
ORDER BY ORDINAL_POSITION;

PRINT '';
PRINT '3. VÉRIFICATION DES CONTRAINTES';
PRINT '-------------------------------';
SELECT 
    CONSTRAINT_NAME,
    CONSTRAINT_TYPE
FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS 
WHERE TABLE_NAME = 'Formations';

PRINT '';
PRINT '=== NETTOYAGE TERMINÉ ===';
PRINT '✓ Modèle prêt pour régénération';
PRINT '';
PRINT '🎯 Prochaines étapes :';
PRINT '1. Redémarrez l''API avec nettoyage complet';
PRINT '2. Testez : http://localhost:7000/api/Formations/5'; 