-- =====================================================
-- AJOUTER LA COLONNE DESCRIPTION À TYPEEQUIPEMENTS
-- =====================================================
-- Date : $(Get-Date -Format "yyyy-MM-dd")
-- Base : CT_CNEH_DB
-- Description : Ajouter la colonne Description et remplir avec les valeurs

USE CT_CNEH_DB;
GO

-- 1. Ajouter la colonne Description
ALTER TABLE TypeEquipements 
ADD Description NVARCHAR(500) NULL;

GO

-- 2. Vérifier que la colonne a été ajoutée
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE, CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'TypeEquipements' 
ORDER BY ORDINAL_POSITION;

GO

-- 3. Remplir la colonne Description avec les valeurs et mettre à jour Etalonnable
-- ÉQUIPEMENTS ÉTALONNABLES (TRUE) - Instruments de mesure précis
UPDATE TypeEquipements 
SET Description = 'Mesure l''efficacité et l''équilibre du freinage des véhicules légers (VL ≤ 3,5T).',
    Etalonnable = 1
WHERE Libelle = 'Banc de freinage VL';

UPDATE TypeEquipements 
SET Description = 'Teste la force de freinage des poids lourds, bus et véhicules utilitaires lourds.',
    Etalonnable = 1
WHERE Libelle = 'Banc de freinage PL';

UPDATE TypeEquipements 
SET Description = 'Pèse le véhicule et calcule la force de freinage en fonction du poids réel.',
    Etalonnable = 1
WHERE Libelle = 'Balance / Plateforme de pesée';

UPDATE TypeEquipements 
SET Description = 'Mesure la performance et l''usure des amortisseurs pour assurer la stabilité du véhicule.',
    Etalonnable = 1
WHERE Libelle = 'Banc de suspension';

UPDATE TypeEquipements 
SET Description = 'Vérifie l''alignement des roues directrices et détecte un défaut de parallélisme.',
    Etalonnable = 1
WHERE Libelle = 'Banc de ripage (ripomètre)';

UPDATE TypeEquipements 
SET Description = 'Détectent les jeux anormaux dans la direction, la suspension et les rotules.',
    Etalonnable = 0
WHERE Libelle = 'Plaques à jeux mécaniques';

UPDATE TypeEquipements 
SET Description = 'Soulève le véhicule pour inspection visuelle du châssis et des organes mécaniques.',
    Etalonnable = 0
WHERE Libelle = 'Pont élévateur à ciseaux';

UPDATE TypeEquipements 
SET Description = 'Utilisé pour soulever les véhicules lourds (bus, camions).',
    Etalonnable = 0
WHERE Libelle = 'Pont élévateur à colonnes';

UPDATE TypeEquipements 
SET Description = 'Permet l''inspection visuelle sous le véhicule lorsqu''il n''est pas soulevé.',
    Etalonnable = 0
WHERE Libelle = 'Fosse de visite';

UPDATE TypeEquipements 
SET Description = 'Mesure les gaz d''échappement (CO, CO₂, HC, O₂) des moteurs essence et GPL.',
    Etalonnable = 1
WHERE Libelle = 'Analyseur de gaz (essence/GPL)';

UPDATE TypeEquipements 
SET Description = 'Mesure l''opacité des fumées des moteurs diesel (contrôle antipollution).',
    Etalonnable = 1
WHERE Libelle = 'Opacimètre diesel';

UPDATE TypeEquipements 
SET Description = 'Contrôle l''étanchéité des circuits GPL ou GNV.',
    Etalonnable = 0
WHERE Libelle = 'Détecteur de fuite de gaz';

UPDATE TypeEquipements 
SET Description = 'Mesure le niveau sonore des motocycles ou véhicules spécifiques.',
    Etalonnable = 1
WHERE Libelle = 'Sonomètre';

UPDATE TypeEquipements 
SET Description = 'Contrôle et vérifie les enregistreurs de temps de conduite et de vitesse sur PL et bus.',
    Etalonnable = 0
WHERE Libelle = 'Chronotachygraphe testeur';

UPDATE TypeEquipements 
SET Description = 'Appareil intégré regroupant freinage, suspension et ripage (utilisé dans les centres modernes).',
    Etalonnable = 1
WHERE Libelle = 'Banc combiné multifonction';

UPDATE TypeEquipements 
SET Description = 'PC, serveurs, logiciels agréés et reliés au CNEH pour la gestion et la traçabilité des contrôles.',
    Etalonnable = 0
WHERE Libelle = 'Équipements informatiques homologués';

GO

-- 4. Vérifier les mises à jour
SELECT Id, Code, Libelle, Etalonnable, Description
FROM TypeEquipements
ORDER BY Id;

GO

-- 5. Compter les lignes mises à jour
SELECT COUNT(*) as 'Lignes mises à jour'
FROM TypeEquipements 
WHERE Description IS NOT NULL;

GO

PRINT '✅ COLONNE DESCRIPTION AJOUTÉE ET REMPLIE AVEC SUCCÈS !';
PRINT '📊 Vérifiez les résultats ci-dessus pour confirmer les mises à jour.';
GO
