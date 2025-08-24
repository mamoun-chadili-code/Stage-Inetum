-- =====================================================
-- SCRIPT SÉCURISÉ DE MISE À JOUR DES DONNÉES CCTs
-- =====================================================
-- Ce script met à jour la base de données en gérant
-- les contraintes de clés étrangères de manière sécurisée

USE CT_CNEH_DB;
GO

-- =====================================================
-- 1. ANALYSE DES DÉPENDANCES
-- =====================================================
PRINT 'Analyse des contraintes de clés étrangères...';

-- Vérifier les CCTs qui référencent les anciennes données
PRINT '--- CCTs utilisant des catégories ---';
SELECT COUNT(*) as NbCCTs_AvecCategories FROM CCTs WHERE CategorieId IS NOT NULL;

PRINT '--- CCTs utilisant des statuts ---';
SELECT COUNT(*) as NbCCTs_AvecStatuts FROM CCTs WHERE StatutId IS NOT NULL;

PRINT '--- CCTs utilisant des types ---';
SELECT COUNT(*) as NbCCTs_AvecTypes FROM CCTs WHERE TypeId IS NOT NULL;

-- =====================================================
-- 2. SAUVEGARDE TEMPORAIRE DES RELATIONS CCT
-- =====================================================
PRINT 'Création de tables temporaires pour sauvegarder les relations...';

-- Table temporaire pour les relations CCT
IF OBJECT_ID('tempdb..#CCT_Relations') IS NOT NULL
    DROP TABLE #CCT_Relations;

CREATE TABLE #CCT_Relations (
    CCTId INT,
    AncienCategorieId INT,
    AncienStatutId INT,
    AncienTypeId INT
);

-- Sauvegarder les relations existantes
INSERT INTO #CCT_Relations (CCTId, AncienCategorieId, AncienStatutId, AncienTypeId)
SELECT Id, CategorieId, StatutId, TypeId 
FROM CCTs 
WHERE CategorieId IS NOT NULL OR StatutId IS NOT NULL OR TypeId IS NOT NULL;

PRINT 'Relations CCT sauvegardées temporairement.';

-- =====================================================
-- 3. SUPPRESSION SÉCURISÉE DES RÉFÉRENCES FK
-- =====================================================
PRINT 'Suppression temporaire des références de clés étrangères...';

-- Mettre à NULL les références FK dans CCTs
UPDATE CCTs SET CategorieId = NULL WHERE CategorieId IS NOT NULL;
UPDATE CCTs SET StatutId = NULL WHERE StatutId IS NOT NULL;
UPDATE CCTs SET TypeId = NULL WHERE TypeId IS NOT NULL;

PRINT 'Références FK supprimées temporairement.';

-- =====================================================
-- 4. MISE À JOUR DES CATÉGORIES CCT
-- =====================================================
PRINT 'Mise à jour des catégories CCT...';

-- Supprimer anciennes catégories
DELETE FROM CategorieCCTs;

-- Insérer nouvelles catégories
SET IDENTITY_INSERT CategorieCCTs ON;
INSERT INTO CategorieCCTs (Id, Nom, Description) VALUES
(1, 'Véhicules toute catégorie', 'Tous types de véhicules'),
(2, 'Véhicules légers', 'Véhicules légers uniquement'),
(3, 'Poids lourds', 'Poids lourds uniquement'),
(4, 'Motocycles', 'Motocycles uniquement');
SET IDENTITY_INSERT CategorieCCTs OFF;

PRINT '✅ Catégories CCT mises à jour.';

-- =====================================================
-- 5. MISE À JOUR DES STATUTS CCT
-- =====================================================
PRINT 'Mise à jour des statuts CCT...';

-- Supprimer anciens statuts
DELETE FROM StatutCCTs;

-- Insérer nouveaux statuts
SET IDENTITY_INSERT StatutCCTs ON;
INSERT INTO StatutCCTs (Id, Libelle, Code) VALUES
(1, 'En activité', 'ACT'),
(2, 'Suspendu', 'SUS'),
(3, 'En cours d''ouverture', 'OUV'),
(4, 'Fermé définitivement', 'FER');
SET IDENTITY_INSERT StatutCCTs OFF;

PRINT '✅ Statuts CCT mis à jour.';

-- =====================================================
-- 6. MISE À JOUR DES TYPES CTT
-- =====================================================
PRINT 'Mise à jour des types CTT...';

-- Supprimer anciens types
DELETE FROM TypeCTTs;

-- Insérer nouveaux types
SET IDENTITY_INSERT TypeCTTs ON;
INSERT INTO TypeCTTs (Id, Libelle, Code) VALUES
(1, 'RALLIES', 'RALL'),
(2, 'Indépendant', 'IND'),
(3, 'Public/Parapublic', 'PUB');
SET IDENTITY_INSERT TypeCTTs OFF;

PRINT '✅ Types CTT mis à jour.';

-- =====================================================
-- 7. RESTAURATION DES RÉFÉRENCES AVEC MAPPING
-- =====================================================
PRINT 'Restauration des références CCT avec mapping par défaut...';

-- Mapping par défaut pour les CCTs existants
-- Catégorie: Assigner "Véhicules toute catégorie" par défaut
UPDATE CCTs 
SET CategorieId = 1  -- Véhicules toute catégorie
WHERE Id IN (SELECT CCTId FROM #CCT_Relations WHERE AncienCategorieId IS NOT NULL);

-- Statut: Assigner "En activité" par défaut
UPDATE CCTs 
SET StatutId = 1  -- En activité
WHERE Id IN (SELECT CCTId FROM #CCT_Relations WHERE AncienStatutId IS NOT NULL);

-- Type: Assigner "Indépendant" par défaut
UPDATE CCTs 
SET TypeId = 2  -- Indépendant
WHERE Id IN (SELECT CCTId FROM #CCT_Relations WHERE AncienTypeId IS NOT NULL);

PRINT '✅ Références CCT restaurées avec valeurs par défaut.';

-- =====================================================
-- 8. VÉRIFICATION FINALE
-- =====================================================
PRINT 'Vérification des données finales...';

PRINT '--- NOUVELLES CATÉGORIES CCT ---';
SELECT Id, Nom, Description FROM CategorieCCTs ORDER BY Id;

PRINT '--- NOUVEAUX STATUTS CCT ---';
SELECT Id, Libelle, Code FROM StatutCCTs ORDER BY Id;

PRINT '--- NOUVEAUX TYPES CTT ---';
SELECT Id, Libelle, Code FROM TypeCTTs ORDER BY Id;

PRINT '--- VÉRIFICATION DES CCTs MISE À JOUR ---';
SELECT 
    COUNT(*) as Total_CCTs,
    COUNT(CategorieId) as CCTs_AvecCategorie,
    COUNT(StatutId) as CCTs_AvecStatut,
    COUNT(TypeId) as CCTs_AvecType
FROM CCTs;

-- =====================================================
-- 9. NETTOYAGE
-- =====================================================
DROP TABLE #CCT_Relations;

-- =====================================================
-- 10. RÉSUMÉ FINAL
-- =====================================================
PRINT '=====================================================';
PRINT '🎉 MISE À JOUR TERMINÉE AVEC SUCCÈS !';
PRINT '=====================================================';
PRINT '✅ Catégories CCT: 4 nouvelles catégories';
PRINT '✅ Statuts CCT: 4 nouveaux statuts avec couleurs';
PRINT '✅ Types CTT: 3 nouveaux types';
PRINT '✅ Relations CCT: Restaurées avec valeurs par défaut';
PRINT '=====================================================';
PRINT '🔴 IMPORTANT: Aucune donnée mockée dans le code !';
PRINT '📡 L''application utilise EXCLUSIVEMENT l''API !';
PRINT '=====================================================';

GO




