-- Script pour tester la réponse de l'API Formations
-- Simule exactement ce que l'API devrait renvoyer

USE CT_CNEH_DB;
GO

PRINT '=== TEST DE LA RÉPONSE API FORMATIONS ===';
PRINT '';

-- Simuler la réponse de l'API avec les données réelles
SELECT 
    'FORMATIONS' AS ResponseType,
    COUNT(*) AS TotalCount,
    'Données disponibles' AS Status
FROM Formations;

PRINT '';

-- Afficher les données exactement comme l'API les renvoie
PRINT '=== DONNÉES FORMATIONS (Format API) ===';
SELECT 
    f.Id,
    f.Intitule,
    ISNULL(c.Nom, '') AS CCT,
    ISNULL(a.Nom + ' ' + a.Prenom, '') AS Agent,
    ISNULL(cc.Nom, '') AS ChefCentre,
    ISNULL(tf.Libelle, '') AS TypeFormation,
    f.Matiere,
    f.DateDebut,
    f.DateFin,
    f.ValideParFormateur,
    f.PremierAnimateur,
    f.DeuxiemeAnimateur,
    f.ValideCHEH,
    f.ValideLe,
    f.CCTId,
    f.AgentId,
    f.ChefCentreId,
    f.TypeFormationId
FROM Formations f
LEFT JOIN CCTs c ON f.CCTId = c.Id
LEFT JOIN Agents a ON f.AgentId = a.Id
LEFT JOIN ChefCentres cc ON f.ChefCentreId = cc.Id
LEFT JOIN TypesFormation tf ON f.TypeFormationId = tf.Id
ORDER BY f.Id;

PRINT '';

-- Vérifier les relations
PRINT '=== VÉRIFICATION DES RELATIONS ===';
DECLARE @ValidRelations INT = 0;
DECLARE @TotalFormations INT = 0;

SELECT @TotalFormations = COUNT(*) FROM Formations;
SELECT @ValidRelations = COUNT(*) 
FROM Formations f
LEFT JOIN CCTs c ON f.CCTId = c.Id
LEFT JOIN Agents a ON f.AgentId = a.Id
LEFT JOIN TypesFormation tf ON f.TypeFormationId = tf.Id
WHERE c.Id IS NOT NULL AND a.Id IS NOT NULL AND tf.Id IS NOT NULL;

PRINT 'Formations avec relations complètes : ' + CAST(@ValidRelations AS VARCHAR) + ' / ' + CAST(@TotalFormations AS VARCHAR);

IF @ValidRelations = @TotalFormations
BEGIN
    PRINT '✓ Toutes les formations ont des relations valides';
END
ELSE
BEGIN
    PRINT '⚠️  Certaines formations ont des relations manquantes';
    
    -- Afficher les formations avec des relations manquantes
    PRINT '';
    PRINT 'Formations avec relations manquantes :';
    SELECT 
        f.Id,
        f.Intitule,
        CASE WHEN c.Id IS NULL THEN 'MANQUANT' ELSE c.Nom END AS CCT,
        CASE WHEN a.Id IS NULL THEN 'MANQUANT' ELSE a.Nom + ' ' + a.Prenom END AS Agent,
        CASE WHEN tf.Id IS NULL THEN 'MANQUANT' ELSE tf.Libelle END AS TypeFormation
    FROM Formations f
    LEFT JOIN CCTs c ON f.CCTId = c.Id
    LEFT JOIN Agents a ON f.AgentId = a.Id
    LEFT JOIN TypesFormation tf ON f.TypeFormationId = tf.Id
    WHERE c.Id IS NULL OR a.Id IS NULL OR tf.Id IS NULL;
END

PRINT '';
PRINT '=== TEST TERMINÉ ===';
PRINT '📋 Prochaines étapes :';
PRINT '1. Vérifiez la réponse de l''API dans le navigateur (F12 > Network)';
PRINT '2. Comparez avec les données ci-dessus';
PRINT '3. Vérifiez les erreurs dans la console JavaScript'; 