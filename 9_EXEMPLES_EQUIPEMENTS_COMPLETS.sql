-- Script pour insérer 9 exemples d'équipements complets
-- Exécutez ce script après avoir vérifié les tables liées

-- IMPORTANT : Vérifiez d'abord le contenu des tables avec VERIFIER_TABLES_EQUIPEMENTS.sql
-- pour vous assurer que les IDs des lignes, types et CCTs existent

-- 1. Scanner OBD - Ligne 4 (CCT 10 - Casablanca)
INSERT INTO Equipements (
    Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation,
    DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage,
    CreatedAt, UpdatedAt, CCTId, StatutEquipementId
) VALUES (
    'BOSCH', 'KTS 590', 4, 17, 'OBD-II P2', 'FR 05-54 A VL',
    '2024-01-15', '2024-02-01', '2024-06-15', '2025-06-15',
    GETDATE(), GETDATE(), 10, 1
);

-- 2. Banc de freinage VL - Ligne 5 (CCT 11 - Rabat)
INSERT INTO Equipements (
    Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation,
    DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage,
    CreatedAt, UpdatedAt, CCTId, StatutEquipementId
) VALUES (
    'AACTIA MULLER', '495', 5, 1, 'Gieglane', 'FR 05-54 B VL',
    '2023-08-20', '2023-09-15', '2024-03-20', '2025-03-20',
    GETDATE(), GETDATE(), 11, 1
);

-- 3. Opacimètre diesel - Ligne 6 (CCT 13 - Marrakech)
INSERT INTO Equipements (
    Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation,
    DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage,
    CreatedAt, UpdatedAt, CCTId, StatutEquipementId
) VALUES (
    'ACIA MULLER', '43300', 6, 11, 'X', 'FR 05-54 C PL',
    '2023-12-10', '2024-01-05', '2024-05-10', '2025-05-10',
    GETDATE(), GETDATE(), 13, 1
);

-- 4. Banc de suspension - Ligne 7 (CCT 12 - Fès)
INSERT INTO Equipements (
    Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation,
    DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage,
    CreatedAt, UpdatedAt, CCTId, StatutEquipementId
) VALUES (
    'HOFMANN', 'Suspension Master', 7, 4, 'Hofmann', 'FR 05-54 D VL',
    '2024-02-28', '2024-03-20', '2024-07-28', '2025-07-28',
    GETDATE(), GETDATE(), 12, 1
);

-- 5. Banc de ripage - Ligne 8 (CCT 9 - Tanger)
INSERT INTO Equipements (
    Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation,
    DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage,
    CreatedAt, UpdatedAt, CCTId, StatutEquipementId
) VALUES (
    'HUNTER', 'DSP 600', 8, 5, 'Hunter', 'FR 05-54 E VL',
    '2023-11-15', '2023-12-10', '2024-04-15', '2025-04-15',
    GETDATE(), GETDATE(), 9, 1
);

-- 6. Analyseur de gaz - Ligne 9 (CCT 10 - Casablanca)
INSERT INTO Equipements (
    Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation,
    DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage,
    CreatedAt, UpdatedAt, CCTId, StatutEquipementId
) VALUES (
    'AVL', 'Digas 2200', 9, 10, 'AVL', 'FR 05-54 F VL',
    '2024-03-10', '2024-04-01', '2024-08-10', '2025-08-10',
    GETDATE(), GETDATE(), 10, 1
);

-- 7. Sonomètre - Ligne 10 (CCT 11 - Rabat)
INSERT INTO Equipements (
    Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation,
    DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage,
    CreatedAt, UpdatedAt, CCTId, StatutEquipementId
) VALUES (
    'B&K', '2250', 10, 13, 'B&K', 'FR 05-54 G MOTO',
    '2023-10-20', '2023-11-15', '2024-03-20', '2025-03-20',
    GETDATE(), GETDATE(), 11, 1
);

-- 8. Testeur ABS/ESP - Ligne 11 (CCT 13 - Marrakech)
INSERT INTO Equipements (
    Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation,
    DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage,
    CreatedAt, UpdatedAt, CCTId, StatutEquipementId
) VALUES (
    'MAHA', 'ABS Tester Pro', 11, 18, 'MAHA', 'FR 05-54 H PL',
    '2024-04-05', '2024-05-01', '2024-09-05', '2025-09-05',
    GETDATE(), GETDATE(), 13, 1
);

-- 9. Réglophare VL/PL - Ligne 12 (CCT 12 - Fès)
INSERT INTO Equipements (
    Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation,
    DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage,
    CreatedAt, UpdatedAt, CCTId, StatutEquipementId
) VALUES (
    'HOFMANN', 'Phare Master', 12, 19, 'Hofmann', 'FR 05-54 I VL',
    '2023-09-25', '2023-10-20', '2024-02-25', '2025-02-25',
    GETDATE(), GETDATE(), 12, 1
);

-- Vérification des insertions
SELECT '=== VÉRIFICATION DES INSERTIONS ===' as Info;
SELECT 
    e.Id,
    e.Marque,
    e.Modele,
    e.LigneId,
    l.NumeroLigne,
    e.CCTId,
    c.Nom as CCTNom,
    t.Libelle as TypeEquipement,
    e.Protocole,
    e.RefHomologation,
    e.DateHomologation,
    e.DateMiseService,
    e.DateEtalonnage,
    e.DateExpirationEtalonnage
FROM Equipements e
LEFT JOIN Lignes l ON e.LigneId = l.Id
LEFT JOIN CCTs c ON e.CCTId = c.Id
LEFT JOIN TypeEquipements t ON e.TypeEquipementId = t.Id
ORDER BY e.Id;
