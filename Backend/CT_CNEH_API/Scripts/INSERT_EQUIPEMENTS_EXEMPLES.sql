USE CT_CNEH_DB;
GO

PRINT '=== INSERTION DE 30 NOUVEAUX ÉQUIPEMENTS ===';
GO

-- Vérification des données existantes
PRINT 'Vérification des données existantes...';
GO

-- Vérifier les lignes disponibles
DECLARE @LignesCount INT = (SELECT COUNT(*) FROM Lignes WHERE NumeroLigne >= 110);
PRINT 'Nombre de lignes disponibles (>= 110): ' + CAST(@LignesCount AS VARCHAR(10));

-- Vérifier les types d'équipements disponibles
DECLARE @TypeEquipementCount INT = (SELECT COUNT(*) FROM TypeEquipements);
PRINT 'Nombre de types d''équipements disponibles: ' + CAST(@TypeEquipementCount AS VARCHAR(10));

-- Vérifier les équipements existants
DECLARE @EquipementsExistants INT = (SELECT COUNT(*) FROM Equipements);
PRINT 'Nombre d''équipements existants: ' + CAST(@EquipementsExistants AS VARCHAR(10));

GO

-- Insertion des 30 nouveaux équipements
INSERT INTO Equipements (
    Marque,
    Modele,
    LigneId,
    TypeEquipementId,
    Protocole,
    RefHomologation,
    DateHomologation,
    DateMiseService,
    DateEtalonnage,
    DateExpirationEtalonnage,
    CreatedAt,
    UpdatedAt
)
VALUES
-- Équipements pour ligne 110 (CCT Casablanca Oulfa - VL)
('BOSCH', 'KTS 590', 42, 17, 'OBD-II P2', 'FR 05-54 A VL', '2024-01-15', '2024-02-01', '2024-02-01', '2025-02-01', GETDATE(), NULL),
('HOFMANN', 'Phare Master', 42, 19, 'Hofmann', 'FR 05-54 B VL', '2024-01-20', '2024-02-05', '2024-02-05', '2025-02-05', GETDATE(), NULL),

-- Équipements pour ligne 111 (CCT Casablanca Oulfa - PL)
('HUNTER', 'DSP 600', 42, 2, 'Hunter', 'FR 05-54 C PL', '2024-02-20', '2024-03-01', '2024-03-01', '2025-03-01', GETDATE(), NULL),
('AVL', 'Digas 2200', 42, 10, 'AVL', 'FR 05-54 D PL', '2024-02-25', '2024-03-05', '2024-03-05', '2025-03-05', GETDATE(), NULL),

-- Équipements pour ligne 112 (CCT Casablanca Oulfa - MC)
('B&K', '2250', 42, 13, 'B&K', 'FR 05-54 E MC', '2024-03-10', '2024-03-15', '2024-03-15', '2025-03-15', GETDATE(), NULL),
('MAHA', 'ABS Tester Pro', 42, 18, 'MAHA', 'FR 05-54 F MC', '2024-03-12', '2024-03-18', '2024-03-18', '2025-03-18', GETDATE(), NULL),

-- Équipements pour ligne 113 (CCT Casablanca Ain Sebaâ - VL)
('ACIA MULLER', '495', 42, 1, 'Gieglane', 'FR 05-54 G VL', '2024-01-20', '2024-01-30', '2024-01-30', '2025-01-30', GETDATE(), NULL),
('HOFMANN', 'Suspension Master', 42, 4, 'Hofmann', 'FR 05-54 H VL', '2024-01-25', '2024-02-02', '2024-02-02', '2025-02-02', GETDATE(), NULL),

-- Équipements pour ligne 114 (CCT Casablanca Ain Sebaâ - VTC)
('BOSCH', 'KTS 590', 42, 15, 'OBD-II P2', 'FR 05-54 I VTC', '2024-02-25', '2024-03-05', '2024-03-05', '2025-03-05', GETDATE(), NULL),
('HUNTER', 'DSP 600', 42, 5, 'Hunter', 'FR 05-54 J VTC', '2024-02-28', '2024-03-08', '2024-03-08', '2025-03-08', GETDATE(), NULL),

-- Équipements pour ligne 115 (CCT Casablanca Ain Sebaâ - PL)
('AVL', 'Digas 2200', 42, 2, 'AVL', 'FR 05-54 K PL', '2024-03-15', '2024-03-25', '2024-03-25', '2025-03-25', GETDATE(), NULL),
('MAHA', 'ABS Tester Pro', 42, 18, 'MAHA', 'FR 05-54 L PL', '2024-03-18', '2024-03-28', '2024-03-28', '2025-03-28', GETDATE(), NULL),

-- Équipements pour ligne 116 (CCT Rabat Agdal - VL)
('ACIA MULLER', '495', 42, 1, 'Gieglane', 'FR 05-54 M VL', '2024-01-25', '2024-02-05', '2024-02-05', '2025-02-05', GETDATE(), NULL),
('HOFMANN', 'Phare Master', 42, 19, 'Hofmann', 'FR 05-54 N VL', '2024-01-28', '2024-02-08', '2024-02-08', '2025-02-08', GETDATE(), NULL),

-- Équipements pour ligne 117 (CCT Rabat Agdal - MC)
('B&K', '2250', 42, 13, 'B&K', 'FR 05-54 O MC', '2024-02-28', '2024-03-08', '2024-03-08', '2025-03-08', GETDATE(), NULL),
('MAHA', 'ABS Tester Pro', 42, 18, 'MAHA', 'FR 05-54 P MC', '2024-03-01', '2024-03-10', '2024-03-10', '2025-03-10', GETDATE(), NULL),

-- Équipements pour ligne 118 (CCT Rabat Agdal - VTC)
('BOSCH', 'KTS 590', 42, 15, 'OBD-II P2', 'FR 05-54 Q VTC', '2024-03-20', '2024-03-30', '2024-03-30', '2025-03-30', GETDATE(), NULL),
('HUNTER', 'DSP 600', 42, 5, 'Hunter', 'FR 05-54 R VTC', '2024-03-22', '2024-04-01', '2024-04-01', '2025-04-01', GETDATE(), NULL),

-- Équipements pour ligne 119 (CCT Rabat Yacoub El Mansour - VL)
('ACIA MULLER', '495', 42, 1, 'Gieglane', 'FR 05-54 S VL', '2024-02-01', '2024-02-10', '2024-02-10', '2025-02-10', GETDATE(), NULL),
('HOFMANN', 'Suspension Master', 42, 4, 'Hofmann', 'FR 05-54 T VL', '2024-02-05', '2024-02-15', '2024-02-15', '2025-02-15', GETDATE(), NULL),

-- Équipements pour ligne 120 (CCT Rabat Yacoub El Mansour - PL)
('HUNTER', 'DSP 600', 42, 2, 'Hunter', 'FR 05-54 U PL', '2024-03-05', '2024-03-15', '2024-03-15', '2025-03-15', GETDATE(), NULL),
('AVL', 'Digas 2200', 42, 10, 'AVL', 'FR 05-54 V PL', '2024-03-08', '2024-03-18', '2024-03-18', '2025-03-18', GETDATE(), NULL),

-- Équipements pour ligne 121 (CCT Rabat Yacoub El Mansour - MC)
('B&K', '2250', 42, 13, 'B&K', 'FR 05-54 W MC', '2024-04-01', '2024-04-10', '2024-04-10', '2025-04-10', GETDATE(), NULL),
('MAHA', 'ABS Tester Pro', 42, 18, 'MAHA', 'FR 05-54 X MC', '2024-04-05', '2024-04-15', '2024-04-15', '2025-04-15', GETDATE(), NULL),

-- Équipements pour ligne 122 (CCT Marrakech Gueliz - VL)
('ACIA MULLER', '495', 42, 1, 'Gieglane', 'FR 05-54 Y VL', '2024-02-05', '2024-02-15', '2024-02-15', '2025-02-15', GETDATE(), NULL),
('HOFMANN', 'Phare Master', 42, 19, 'Hofmann', 'FR 05-54 Z VL', '2024-02-08', '2024-02-18', '2024-02-18', '2025-02-18', GETDATE(), NULL),

-- Équipements pour ligne 123 (CCT Marrakech Gueliz - VTC)
('BOSCH', 'KTS 590', 42, 15, 'OBD-II P2', 'FR 05-54 AA VTC', '2024-03-10', '2024-03-20', '2024-03-20', '2025-03-20', GETDATE(), NULL),
('HUNTER', 'DSP 600', 42, 5, 'Hunter', 'FR 05-54 BB VTC', '2024-03-12', '2024-03-22', '2024-03-22', '2025-03-22', GETDATE(), NULL),

-- Équipements pour ligne 124 (CCT Marrakech Gueliz - PL)
('AVL', 'Digas 2200', 42, 2, 'AVL', 'FR 05-54 CC PL', '2024-04-05', '2024-04-15', '2024-04-15', '2025-04-15', GETDATE(), NULL),
('MAHA', 'ABS Tester Pro', 42, 18, 'MAHA', 'FR 05-54 DD PL', '2024-04-08', '2024-04-18', '2024-04-18', '2025-04-18', GETDATE(), NULL),

-- Équipements pour ligne 125 (CCT Marrakech Sidi Ghanem - VL)
('ACIA MULLER', '495', 42, 1, 'Gieglane', 'FR 05-54 EE VL', '2024-02-10', '2024-02-20', '2024-02-20', '2025-02-20', GETDATE(), NULL),
('HOFMANN', 'Suspension Master', 42, 4, 'Hofmann', 'FR 05-54 FF VL', '2024-02-12', '2024-02-22', '2024-02-22', '2025-02-22', GETDATE(), NULL),

-- Équipements pour ligne 126 (CCT Marrakech Sidi Ghanem - MC)
('B&K', '2250', 42, 13, 'B&K', 'FR 05-54 GG MC', '2024-03-15', '2024-03-25', '2024-03-25', '2025-03-25', GETDATE(), NULL),
('MAHA', 'ABS Tester Pro', 42, 18, 'MAHA', 'FR 05-54 HH MC', '2024-03-18', '2024-03-28', '2024-03-28', '2025-03-28', GETDATE(), NULL),

-- Équipements pour ligne 127 (CCT Marrakech Sidi Ghanem - VTC)
('BOSCH', 'KTS 590', 42, 15, 'OBD-II P2', 'FR 05-54 II VTC', '2024-04-10', '2024-04-20', '2024-04-20', '2025-04-20', GETDATE(), NULL),
('HUNTER', 'DSP 600', 42, 5, 'Hunter', 'FR 05-54 JJ VTC', '2024-04-12', '2024-04-22', '2024-04-22', '2025-04-22', GETDATE(), NULL);

GO

-- Vérification de l'insertion
PRINT 'Vérification de l''insertion...';
GO

DECLARE @EquipementsInserees INT = (SELECT COUNT(*) FROM Equipements WHERE RefHomologation LIKE 'FR 05-54%');
PRINT 'Nombre d''équipements insérés: ' + CAST(@EquipementsInserees AS VARCHAR(10));

-- Affichage des nouveaux équipements
SELECT TOP 10
    e.Id,
    e.Marque,
    e.Modele,
    l.NumeroLigne,
    te.Libelle AS TypeEquipement,
    e.Protocole,
    e.RefHomologation,
    e.DateHomologation,
    e.DateMiseService,
    e.DateEtalonnage,
    e.DateExpirationEtalonnage
FROM Equipements e
INNER JOIN Lignes l ON e.LigneId = l.Id
INNER JOIN TypeEquipements te ON e.TypeEquipementId = te.Id
WHERE e.RefHomologation LIKE 'FR 05-54%'
ORDER BY e.RefHomologation;

GO

PRINT '=== INSERTION TERMINÉE AVEC SUCCÈS ===';
GO
