USE CT_CNEH_DB;
GO

-- Script pour corriger la structure de la table CCTs
-- Si la colonne StatutRCId existe encore, la renommer en StatutId

-- Vérifier si la colonne StatutRCId existe
IF EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'CCTs' AND COLUMN_NAME = 'StatutRCId'
)
BEGIN
    PRINT 'Colonne StatutRCId trouvée. Correction en cours...';
    
    -- Vérifier si StatutId existe déjà
    IF NOT EXISTS (
        SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_NAME = 'CCTs' AND COLUMN_NAME = 'StatutId'
    )
    BEGIN
        -- Renommer StatutRCId en StatutId
        EXEC sp_rename 'CCTs.StatutRCId', 'StatutId', 'COLUMN';
        PRINT 'Colonne StatutRCId renommée en StatutId avec succès.';
    END
    ELSE
    BEGIN
        PRINT 'La colonne StatutId existe déjà. Suppression de StatutRCId...';
        -- Supprimer la colonne StatutRCId
        ALTER TABLE CCTs DROP COLUMN StatutRCId;
        PRINT 'Colonne StatutRCId supprimée avec succès.';
    END
END
ELSE
BEGIN
    PRINT 'La colonne StatutRCId n''existe pas. Aucune correction nécessaire.';
END

-- Vérifier la structure finale
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'CCTs' 
ORDER BY ORDINAL_POSITION;
GO
