-- Script pour vérifier les agents de test
-- Exécutez ce script pour voir les agents existants

USE CT_CNEH_DB;
GO

PRINT '=== VÉRIFICATION DES AGENTS ===';
PRINT '';

-- Vérifier tous les agents
PRINT '--- Tous les agents ---';
SELECT 
    Id,
    Nom,
    Prenom,
    CIN,
    CCTId,
    CategorieCAPId,
    StatutAdministratifId
FROM Agents
ORDER BY Id;
PRINT '';

-- Vérifier les agents avec ID 6 spécifiquement
PRINT '--- Agent avec ID 6 ---';
IF EXISTS (SELECT * FROM Agents WHERE Id = 6)
BEGIN
    SELECT * FROM Agents WHERE Id = 6;
    PRINT '✅ Agent avec ID 6 existe.';
END
ELSE
BEGIN
    PRINT '❌ Agent avec ID 6 n''existe pas.';
    PRINT 'Agents disponibles :';
    SELECT TOP 10 Id, Nom, Prenom FROM Agents ORDER BY Id;
END
PRINT '';

-- Vérifier les relations des agents
PRINT '--- Relations des agents ---';
SELECT 
    a.Id,
    a.Nom,
    a.Prenom,
    a.CCTId,
    c.Nom as CCTNom,
    a.CategorieCAPId,
    cat.Libelle as CategorieLibelle,
    a.StatutAdministratifId,
    s.Libelle as StatutLibelle
FROM Agents a
LEFT JOIN CCTs c ON a.CCTId = c.Id
LEFT JOIN CategorieCCTs cat ON a.CategorieCAPId = cat.Id
LEFT JOIN StatutAdministratifs s ON a.StatutAdministratifId = s.Id
ORDER BY a.Id;
PRINT '';

PRINT '=== FIN DE LA VÉRIFICATION ==='; 