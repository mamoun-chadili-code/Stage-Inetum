-- =====================================================
-- AJOUTER LES NOUVEAUX TYPES D'ÉQUIPEMENTS
-- =====================================================
-- Date : $(Get-Date -Format "yyyy-MM-dd")
-- Base : CT_CNEH_DB
-- Description : Ajouter 4 nouveaux types d'équipements

USE CT_CNEH_DB;
GO

-- 1. Ajouter les 4 nouveaux types d'équipements
INSERT INTO TypeEquipements (Code, Libelle, Etalonnable, Description) VALUES
('OBD', 'Scanner OBD (On Board Diagnostic)', 1, 'Lit les données électroniques du véhicule (pollution, ABS, airbags, etc.).'),
('ABS', 'Testeur ABS/ESP', 1, 'Vérifie le bon fonctionnement des systèmes électroniques de freinage et de stabilité.'),
('PHARES', 'Appareil de réglage des phares (Réglophare VL/PL)', 1, 'Vérifie l''orientation et l''intensité lumineuse des phares VL et PL.'),
('MOTO', 'Réglophare pour motocycles', 1, 'Vérifie l''alignement et la puissance des feux des motos.');

GO

-- 2. Vérifier les nouveaux ajouts
SELECT Id, Code, Libelle, Etalonnable, Description
FROM TypeEquipements
WHERE Code IN ('OBD', 'ABS', 'PHARES', 'MOTO')
ORDER BY Id;

GO

-- 3. Vérifier le total des types d'équipements
SELECT COUNT(*) as 'Total des types d''équipements'
FROM TypeEquipements;

GO

-- 4. Afficher tous les types d'équipements
SELECT Id, Code, Libelle, Etalonnable, Description
FROM TypeEquipements
ORDER BY Id;

GO

PRINT '✅ 4 NOUVEAUX TYPES D''ÉQUIPEMENTS AJOUTÉS AVEC SUCCÈS !';
PRINT '📊 Scanner OBD, Testeur ABS/ESP, Réglophare VL/PL, Réglophare motos.';
PRINT '🎯 Tous ces équipements sont étalonnables (Etalonnable = 1).';
GO

