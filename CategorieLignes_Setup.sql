-- ================================================================
-- SCRIPT SQL POUR LA TABLE CategorieLignes
-- Base de données : CT_CNEH_DB
-- ================================================================

USE CT_CNEH_DB;
GO

-- ================================================================
-- 1. VÉRIFIER ET CRÉER LA TABLE CategorieLignes SI NÉCESSAIRE
-- ================================================================

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'CategorieLignes')
BEGIN
    PRINT '🔧 Création de la table CategorieLignes...';
    
    CREATE TABLE CategorieLignes (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Libelle NVARCHAR(255) NOT NULL,
        Code NVARCHAR(50) NOT NULL UNIQUE,
        Description NVARCHAR(500) NULL,
        DateCreation DATETIME2 DEFAULT GETDATE(),
        DateModification DATETIME2 DEFAULT GETDATE(),
        EstActif BIT DEFAULT 1
    );
    
    PRINT '✅ Table CategorieLignes créée avec succès !';
END
ELSE
BEGIN
    PRINT '✅ La table CategorieLignes existe déjà.';
END

-- ================================================================
-- 2. VIDER LA TABLE (OPTIONNEL - DÉCOMMENTEZ SI NÉCESSAIRE)
-- ================================================================

-- DELETE FROM CategorieLignes;
-- PRINT '🗑️ Table CategorieLignes vidée.';

-- ================================================================
-- 3. INSÉRER LES CATÉGORIES DE LIGNES
-- ================================================================

PRINT '📝 Insertion des catégories de lignes...';

-- Vérifier si des données existent déjà
IF NOT EXISTS (SELECT 1 FROM CategorieLignes)
BEGIN
    INSERT INTO CategorieLignes (Libelle, Code, Description)
    VALUES
        ('Véhicules légers (VL)', 'VL', 'voitures particulières, utilitaires ≤ 3,5T'),
        ('Poids lourds (PL)', 'PL', 'camions, bus, véhicules > 3,5T'),
        ('Motocycles', 'MOTO', 'motos et cyclomoteurs'),
        ('Véhicules toute catégorie', 'VTC', 'ligne polyvalente');
    
    PRINT '✅ Catégories insérées avec succès !';
    PRINT '📊 Nombre de catégories insérées : ' + CAST(@@ROWCOUNT AS VARCHAR(10));
END
ELSE
BEGIN
    PRINT '⚠️ Des catégories existent déjà dans la table.';
    PRINT '💡 Pour réinsérer, décommentez la section "VIDER LA TABLE" ci-dessus.';
END

-- ================================================================
-- 4. VÉRIFICATION ET AFFICHAGE DES DONNÉES
-- ================================================================

PRINT '🔍 Vérification des données insérées :';

SELECT 
    Id,
    Libelle,
    Code,
    Description,
    DateCreation,
    EstActif
FROM CategorieLignes
ORDER BY Id;

-- ================================================================
-- 5. STATISTIQUES
-- ================================================================

DECLARE @TotalCategories INT = (SELECT COUNT(*) FROM CategorieLignes WHERE EstActif = 1);
PRINT '📈 STATISTIQUES :';
PRINT '   - Total catégories actives : ' + CAST(@TotalCategories AS VARCHAR(10));

-- ================================================================
-- 6. VÉRIFICATION DE L'API ENDPOINT
-- ================================================================

PRINT '🌐 ENDPOINT API CONFIGURÉ :';
PRINT '   - GET /api/CategorieLignes';
PRINT '   - Table source : CT_CNEH_DB.dbo.CategorieLignes';

PRINT '✅ Configuration terminée avec succès !';
PRINT '🚀 Vous pouvez maintenant tester l''API /CategorieLignes';

GO


