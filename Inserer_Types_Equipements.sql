-- =====================================================
-- INSÉRER LES TYPES D'ÉQUIPEMENTS DANS LA TABLE VIDE
-- =====================================================
-- Date : $(Get-Date -Format "yyyy-MM-dd")
-- Base : CT_CNEH_DB
-- Description : Insérer les types d'équipements avant de les mettre à jour

USE CT_CNEH_DB;
GO

-- 1. Insérer tous les types d'équipements
INSERT INTO TypeEquipements (Code, Libelle, Etalonnable, Description) VALUES
('BFVL', 'Banc de freinage VL', 1, 'Mesure l''efficacité et l''équilibre du freinage des véhicules légers (VL ≤ 3,5T).'),
('BFPL', 'Banc de freinage PL', 1, 'Teste la force de freinage des poids lourds, bus et véhicules utilitaires lourds.'),
('BAL', 'Balance / Plateforme de pesée', 1, 'Pèse le véhicule et calcule la force de freinage en fonction du poids réel.'),
('BSUS', 'Banc de suspension', 1, 'Mesure la performance et l''usure des amortisseurs pour assurer la stabilité du véhicule.'),
('BRIP', 'Banc de ripage (ripomètre)', 1, 'Vérifie l''alignement des roues directrices et détecte un défaut de parallélisme.'),
('PJM', 'Plaques à jeux mécaniques', 0, 'Détectent les jeux anormaux dans la direction, la suspension et les rotules.'),
('PEC', 'Pont élévateur à ciseaux', 0, 'Soulève le véhicule pour inspection visuelle du châssis et des organes mécaniques.'),
('PECOL', 'Pont élévateur à colonnes', 0, 'Utilisé pour soulever les véhicules lourds (bus, camions).'),
('FOSSE', 'Fosse de visite', 0, 'Permet l''inspection visuelle sous le véhicule lorsqu''il n''est pas soulevé.'),
('AGAZ', 'Analyseur de gaz (essence/GPL)', 1, 'Mesure les gaz d''échappement (CO, CO₂, HC, O₂) des moteurs essence et GPL.'),
('OPAC', 'Opacimètre diesel', 1, 'Mesure l''opacité des fumées des moteurs diesel (contrôle antipollution).'),
('DFG', 'Détecteur de fuite de gaz', 0, 'Contrôle l''étanchéité des circuits GPL ou GNV.'),
('SONO', 'Sonomètre', 1, 'Mesure le niveau sonore des motocycles ou véhicules spécifiques.'),
('CHRONO', 'Chronotachygraphe testeur', 0, 'Contrôle et vérifie les enregistreurs de temps de conduite et de vitesse sur PL et bus.'),
('BCM', 'Banc combiné multifonction', 1, 'Appareil intégré regroupant freinage, suspension et ripage (utilisé dans les centres modernes).'),
('EI', 'Équipements informatiques homologués', 0, 'PC, serveurs, logiciels agréés et reliés au CNEH pour la gestion et la traçabilité des contrôles.');

GO

-- 2. Vérifier les insertions
SELECT Id, Code, Libelle, Etalonnable, Description
FROM TypeEquipements
ORDER BY Id;

GO

-- 3. Compter les lignes insérées
SELECT COUNT(*) as 'Types d''équipements insérés'
FROM TypeEquipements;

GO

PRINT '✅ TYPES D''ÉQUIPEMENTS INSÉRÉS AVEC SUCCÈS !';
PRINT '📊 La table TypeEquipements contient maintenant 16 types d''équipements.';
GO

