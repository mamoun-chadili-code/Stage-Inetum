-- =====================================================
-- SCRIPT DE MISE À JOUR DES DONNÉES CCTs
-- =====================================================
-- Ce script met à jour les catégories, statuts et types des CCTs
-- selon les nouvelles spécifications

USE CT_CNEH_DB;
GO

-- =====================================================
-- 1. MISE À JOUR DES CATÉGORIES CCT
-- =====================================================
PRINT 'Mise à jour des catégories CCT...';

-- Supprimer les anciennes catégories
DELETE FROM CategorieCCTs;

-- Insérer les nouvelles catégories
SET IDENTITY_INSERT CategorieCCTs ON;
INSERT INTO CategorieCCTs (Id, Nom, Description) VALUES
(1, 'Véhicules toute catégorie', 'Tous types de véhicules'),
(2, 'Véhicules légers', 'Véhicules légers uniquement'),
(3, 'Poids lourds', 'Poids lourds uniquement'),
(4, 'Motocycles', 'Motocycles uniquement');
SET IDENTITY_INSERT CategorieCCTs OFF;

PRINT 'Catégories CCT mises à jour avec succès.';

-- =====================================================
-- 2. MISE À JOUR DES STATUTS CCT
-- =====================================================
PRINT 'Mise à jour des statuts CCT...';

-- Supprimer les anciens statuts CCT
DELETE FROM StatutCCTs;

-- Insérer les nouveaux statuts
SET IDENTITY_INSERT StatutCCTs ON;
INSERT INTO StatutCCTs (Id, Libelle, Code) VALUES
(1, 'En activité', 'ACT'),
(2, 'Suspendu', 'SUS'),
(3, 'En cours d''ouverture', 'OUV'),
(4, 'Fermé définitivement', 'FER');
SET IDENTITY_INSERT StatutCCTs OFF;

PRINT 'Statuts CCT mis à jour avec succès.';

-- =====================================================
-- 3. MISE À JOUR DES TYPES CTT
-- =====================================================
PRINT 'Mise à jour des types CTT...';

-- Supprimer les anciens types
DELETE FROM TypeCTTs;

-- Insérer les nouveaux types
SET IDENTITY_INSERT TypeCTTs ON;
INSERT INTO TypeCTTs (Id, Libelle, Code) VALUES
(1, 'RALLIES', 'RALL'),
(2, 'Indépendant', 'IND'),
(3, 'Public/Parapublic', 'PUB');
SET IDENTITY_INSERT TypeCTTs OFF;

PRINT 'Types CTT mis à jour avec succès.';

-- =====================================================
-- 4. VÉRIFICATION DES DONNÉES
-- =====================================================
PRINT 'Vérification des données mises à jour...';

PRINT '--- CATÉGORIES CCT ---';
SELECT * FROM CategorieCCTs;

PRINT '--- STATUTS CCT ---';
SELECT * FROM StatutCCTs;

PRINT '--- TYPES CTT ---';
SELECT * FROM TypeCTTs;

PRINT 'Mise à jour terminée avec succès !';
GO




