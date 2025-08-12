-- Script pour corriger la table StatutAdministratifs
-- Supprime la colonne Description si elle existe

USE CT_CNEH_DB;
GO

PRINT '=== CORRECTION DE LA TABLE STATUTADMINISTRATIFS ===';
PRINT '';

-- Vérifier si la colonne Description existe
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
           WHERE TABLE_NAME = 'StatutAdministratifs' AND COLUMN_NAME = 'Description')
BEGIN
    PRINT 'Colonne Description trouvée. Suppression en cours...';
    
    -- Supprimer la colonne Description
    ALTER TABLE StatutAdministratifs DROP COLUMN Description;
    
    PRINT '✅ Colonne Description supprimée avec succès.';
END
ELSE
BEGIN
    PRINT '✅ Colonne Description n''existe pas. Aucune action nécessaire.';
END
PRINT '';

-- Vérifier la structure finale de la table
PRINT '--- Structure finale de StatutAdministratifs ---';
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'StatutAdministratifs'
ORDER BY ORDINAL_POSITION;
PRINT '';

-- Afficher les données
PRINT '--- Données de StatutAdministratifs ---';
SELECT * FROM StatutAdministratifs;
PRINT '';

PRINT '=== FIN DE LA CORRECTION ===';
PRINT 'La table StatutAdministratifs est maintenant corrigée.'; 