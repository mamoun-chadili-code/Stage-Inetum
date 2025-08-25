-- =====================================================
-- SCRIPT SIMPLE DE MISE À JOUR DES DONNÉES CCTs
-- =====================================================
-- Pour les bases de données sans CCTs existants
-- ou pour un reset complet

USE CT_CNEH_DB;
GO

-- =====================================================
-- SUPPRESSION SIMPLE (SI AUCUN CCT EXISTANT)
-- =====================================================
DELETE FROM CategorieCCTs;
DELETE FROM StatutCCTs;
DELETE FROM TypeCTTs;

-- =====================================================
-- INSERTION DES NOUVELLES CATÉGORIES CCT
-- =====================================================
SET IDENTITY_INSERT CategorieCCTs ON;
INSERT INTO CategorieCCTs (Id, Nom, Description) VALUES
(1, 'Véhicules toute catégorie', 'Tous types de véhicules'),
(2, 'Véhicules légers', 'Véhicules légers uniquement'),
(3, 'Poids lourds', 'Poids lourds uniquement'),
(4, 'Motocycles', 'Motocycles uniquement');
SET IDENTITY_INSERT CategorieCCTs OFF;

-- =====================================================
-- INSERTION DES NOUVEAUX STATUTS CCT
-- =====================================================
SET IDENTITY_INSERT StatutCCTs ON;
INSERT INTO StatutCCTs (Id, Libelle, Code) VALUES
(1, 'En activité', 'ACT'),
(2, 'Suspendu', 'SUS'),
(3, 'En cours d''ouverture', 'OUV'),
(4, 'Fermé définitivement', 'FER');
SET IDENTITY_INSERT StatutCCTs OFF;

-- =====================================================
-- INSERTION DES NOUVEAUX TYPES CTT
-- =====================================================
SET IDENTITY_INSERT TypeCTTs ON;
INSERT INTO TypeCTTs (Id, Libelle, Code) VALUES
(1, 'RALLIES', 'RALL'),
(2, 'Indépendant', 'IND'),
(3, 'Public/Parapublic', 'PUB');
SET IDENTITY_INSERT TypeCTTs OFF;

-- =====================================================
-- VÉRIFICATION
-- =====================================================
SELECT 'CATÉGORIES CCT' as Type, Id, Nom as Libelle, Description FROM CategorieCCTs
UNION ALL
SELECT 'STATUTS CCT' as Type, Id, Libelle, Code as Description FROM StatutCCTs
UNION ALL
SELECT 'TYPES CTT' as Type, Id, Libelle, Code as Description FROM TypeCTTs
ORDER BY Type, Id;

PRINT '✅ Mise à jour terminée !';
GO






