-- Script pour appliquer manuellement les corrections de la migration Formation
-- Ce script corrige les problèmes de relations et supprime les colonnes problématiques

USE CT_CNEH_DB;
GO

PRINT '=== APPLICATION DES CORRECTIONS FORMATIONS ===';
PRINT '';

-- 1. Vérifier la structure actuelle
PRINT '1. VÉRIFICATION DE LA STRUCTURE ACTUELLE';
PRINT '----------------------------------------';
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Formations'
ORDER BY ORDINAL_POSITION;

PRINT '';

-- 2. Supprimer les colonnes problématiques si elles existent
PRINT '2. SUPPRESSION DES COLONNES PROBLÉMATIQUES';
PRINT '------------------------------------------';

-- Supprimer ChefCentreId1 s'il existe
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'ChefCentreId1')
BEGIN
    PRINT 'Suppression de la colonne ChefCentreId1...';
    ALTER TABLE Formations DROP COLUMN ChefCentreId1;
    PRINT '✓ Colonne ChefCentreId1 supprimée';
END
ELSE
BEGIN
    PRINT '✓ Colonne ChefCentreId1 n''existe pas (déjà supprimée)';
END

-- Supprimer LexiqueFormationId s'il existe
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Formations' AND COLUMN_NAME = 'LexiqueFormationId')
BEGIN
    PRINT 'Suppression de la colonne LexiqueFormationId...';
    ALTER TABLE Formations DROP COLUMN LexiqueFormationId;
    PRINT '✓ Colonne LexiqueFormationId supprimée';
END
ELSE
BEGIN
    PRINT '✓ Colonne LexiqueFormationId n''existe pas (déjà supprimée)';
END

PRINT '';

-- 3. Vérifier et corriger les contraintes de clé étrangère
PRINT '3. VÉRIFICATION DES CONTRAINTES';
PRINT '-------------------------------';

-- Vérifier si la contrainte FK_Formations_ChefCentres_ChefCentreId existe
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE CONSTRAINT_NAME = 'FK_Formations_ChefCentres_ChefCentreId')
BEGIN
    PRINT '✓ Contrainte FK_Formations_ChefCentres_ChefCentreId existe';
END
ELSE
BEGIN
    PRINT '⚠️  Contrainte FK_Formations_ChefCentres_ChefCentreId n''existe pas';
    PRINT 'Création de la contrainte...';
    
    -- Créer la contrainte si elle n'existe pas
    ALTER TABLE Formations 
    ADD CONSTRAINT FK_Formations_ChefCentres_ChefCentreId 
    FOREIGN KEY (ChefCentreId) REFERENCES ChefCentres(Id);
    
    PRINT '✓ Contrainte FK_Formations_ChefCentres_ChefCentreId créée';
END

PRINT '';

-- 4. Vérifier la structure finale
PRINT '4. VÉRIFICATION DE LA STRUCTURE FINALE';
PRINT '--------------------------------------';
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Formations'
ORDER BY ORDINAL_POSITION;

PRINT '';

-- 5. Test de la requête problématique
PRINT '5. TEST DE LA REQUÊTE PROBLÉMATIQUE';
PRINT '-----------------------------------';
BEGIN TRY
    SELECT TOP(1) 
        f.Id,
        f.Intitule,
        f.CCTId,
        f.AgentId,
        f.ChefCentreId,
        f.TypeFormationId,
        f.Matiere,
        f.DateDebut,
        f.DateFin,
        f.ValideParFormateur,
        f.PremierAnimateur,
        f.DeuxiemeAnimateur,
        f.ValideCHEH,
        f.ValideLe
    FROM Formations f
    WHERE f.Id = 1;
    
    PRINT '✓ Requête de test réussie - Pas d''erreur de colonne';
END TRY
BEGIN CATCH
    PRINT '❌ Erreur lors du test : ' + ERROR_MESSAGE();
END CATCH

PRINT '';
PRINT '=== CORRECTIONS APPLIQUÉES AVEC SUCCÈS ===';
PRINT '🎯 Prochaines étapes :';
PRINT '1. Redémarrez l''API backend';
PRINT '2. Testez les fonctionnalités Formation';
PRINT '3. Vérifiez que les erreurs 500 sont résolues'; 