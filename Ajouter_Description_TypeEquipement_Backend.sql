-- =====================================================
-- AJOUTER LA COLONNE DESCRIPTION AU MODÈLE BACKEND
-- =====================================================
-- Date : $(Get-Date -Format "yyyy-MM-dd")
-- Base : CT_CNEH_DB
-- Description : Ajouter la colonne Description si elle n'existe pas

USE CT_CNEH_DB;
GO

-- 1. Vérifier si la colonne Description existe déjà
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'TypeEquipements' 
    AND COLUMN_NAME = 'Description'
)
BEGIN
    -- 2. Ajouter la colonne Description
    ALTER TABLE TypeEquipements 
    ADD Description NVARCHAR(500) NULL;
    
    PRINT '✅ COLONNE DESCRIPTION AJOUTÉE À LA TABLE TYPEEQUIPEMENTS';
END
ELSE
BEGIN
    PRINT 'ℹ️ LA COLONNE DESCRIPTION EXISTE DÉJÀ DANS LA TABLE TYPEEQUIPEMENTS';
END

GO

-- 3. Vérifier la structure finale
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'TypeEquipements' 
ORDER BY ORDINAL_POSITION;

GO

-- 4. Vérifier que les descriptions sont bien présentes
SELECT TOP 5 Id, Code, Libelle, Etalonnable, Description
FROM TypeEquipements
ORDER BY Id;

GO

PRINT '✅ VÉRIFICATION TERMINÉE !';
PRINT '🎯 Maintenant redémarrez le backend pour que les changements prennent effet.';
GO
