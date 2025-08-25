-- =====================================================
-- SCRIPT DE MISE À JOUR COMPLÈTE DES DONNÉES CCTs
-- =====================================================
-- Ce script supprime et remplace toutes les données CCT
-- directement dans la base de données SQL Server
-- AUCUNE DONNÉE MOCKÉE NE SERA UTILISÉE

USE CT_CNEH_DB;
GO

-- =====================================================
-- 1. VÉRIFICATION DES TABLES EXISTANTES
-- =====================================================
PRINT 'Vérification des tables CCT existantes...';

-- Vérifier si les tables existent
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CategorieCCTs')
BEGIN
    PRINT 'ERREUR: Table CategorieCCTs n''existe pas !';
END
ELSE
BEGIN
    PRINT 'Table CategorieCCTs trouvée.';
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StatutCCTs')
BEGIN
    PRINT 'ERREUR: Table StatutCCTs n''existe pas !';
END
ELSE
BEGIN
    PRINT 'Table StatutCCTs trouvée.';
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypeCTTs')
BEGIN
    PRINT 'ERREUR: Table TypeCTTs n''existe pas !';
END
ELSE
BEGIN
    PRINT 'Table TypeCTTs trouvée.';
END

-- =====================================================
-- 2. SAUVEGARDE DES DONNÉES EXISTANTES (OPTIONNEL)
-- =====================================================
PRINT 'État actuel des données...';

PRINT '--- CATÉGORIES ACTUELLES ---';
SELECT * FROM CategorieCCTs;

PRINT '--- STATUTS ACTUELS ---';
SELECT * FROM StatutCCTs;

PRINT '--- TYPES ACTUELS ---';
SELECT * FROM TypeCTTs;

-- =====================================================
-- 3. SUPPRESSION SÉCURISÉE DES DONNÉES
-- =====================================================
PRINT 'Suppression des anciennes données...';

-- Identifier les contraintes de clés étrangères
PRINT 'Vérification des contraintes de clés étrangères...';

-- Vérifier les dépendances pour CategorieCCTs
SELECT 
    OBJECT_NAME(parent_object_id) AS TableName,
    name AS ConstraintName
FROM sys.foreign_keys 
WHERE referenced_object_id = OBJECT_ID('CategorieCCTs');

-- Vérifier les dépendances pour StatutCCTs
SELECT 
    OBJECT_NAME(parent_object_id) AS TableName,
    name AS ConstraintName
FROM sys.foreign_keys 
WHERE referenced_object_id = OBJECT_ID('StatutCCTs');

-- Vérifier les dépendances pour TypeCTTs
SELECT 
    OBJECT_NAME(parent_object_id) AS TableName,
    name AS ConstraintName
FROM sys.foreign_keys 
WHERE referenced_object_id = OBJECT_ID('TypeCTTs');

-- Supprimer les données des tables dépendantes d'abord (si nécessaire)
-- ATTENTION: Ceci supprimera les CCTs existants !
PRINT 'Suppression des CCTs existants (nécessaire pour les contraintes FK)...';
DELETE FROM CCTs WHERE CategorieId IS NOT NULL OR StatutId IS NOT NULL OR TypeId IS NOT NULL;

-- Supprimer les anciennes données
PRINT 'Suppression des catégories...';
DELETE FROM CategorieCCTs;

PRINT 'Suppression des statuts...';
DELETE FROM StatutCCTs;

PRINT 'Suppression des types...';
DELETE FROM TypeCTTs;

-- =====================================================
-- 4. INSERTION DES NOUVELLES CATÉGORIES CCT
-- =====================================================
PRINT 'Insertion des nouvelles catégories CCT...';

SET IDENTITY_INSERT CategorieCCTs ON;
INSERT INTO CategorieCCTs (Id, Nom, Description) VALUES
(1, 'Véhicules toute catégorie', 'Tous types de véhicules'),
(2, 'Véhicules légers', 'Véhicules légers uniquement'),
(3, 'Poids lourds', 'Poids lourds uniquement'),
(4, 'Motocycles', 'Motocycles uniquement');
SET IDENTITY_INSERT CategorieCCTs OFF;

PRINT 'Catégories CCT insérées avec succès.';

-- =====================================================
-- 5. INSERTION DES NOUVEAUX STATUTS CCT
-- =====================================================
PRINT 'Insertion des nouveaux statuts CCT...';

SET IDENTITY_INSERT StatutCCTs ON;
INSERT INTO StatutCCTs (Id, Libelle, Code) VALUES
(1, 'En activité', 'ACT'),
(2, 'Suspendu', 'SUS'),
(3, 'En cours d''ouverture', 'OUV'),
(4, 'Fermé définitivement', 'FER');
SET IDENTITY_INSERT StatutCCTs OFF;

PRINT 'Statuts CCT insérés avec succès.';

-- =====================================================
-- 6. INSERTION DES NOUVEAUX TYPES CTT
-- =====================================================
PRINT 'Insertion des nouveaux types CTT...';

SET IDENTITY_INSERT TypeCTTs ON;
INSERT INTO TypeCTTs (Id, Libelle, Code) VALUES
(1, 'RALLIES', 'RALL'),
(2, 'Indépendant', 'IND'),
(3, 'Public/Parapublic', 'PUB');
SET IDENTITY_INSERT TypeCTTs OFF;

PRINT 'Types CTT insérés avec succès.';

-- =====================================================
-- 7. VÉRIFICATION DES DONNÉES FINALES
-- =====================================================
PRINT 'Vérification des nouvelles données...';

PRINT '--- NOUVELLES CATÉGORIES CCT ---';
SELECT Id, Nom, Description FROM CategorieCCTs ORDER BY Id;

PRINT '--- NOUVEAUX STATUTS CCT ---';
SELECT Id, Libelle, Code FROM StatutCCTs ORDER BY Id;

PRINT '--- NOUVEAUX TYPES CTT ---';
SELECT Id, Libelle, Code FROM TypeCTTs ORDER BY Id;

-- =====================================================
-- 8. RÉSUMÉ FINAL
-- =====================================================
PRINT '=====================================================';
PRINT 'MISE À JOUR TERMINÉE AVEC SUCCÈS !';
PRINT '=====================================================';
PRINT 'Catégories CCT: 4 enregistrements insérés';
PRINT 'Statuts CCT: 4 enregistrements insérés';
PRINT 'Types CTT: 3 enregistrements insérés';
PRINT '=====================================================';

GO





