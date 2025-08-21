-- Script pour tester l'API Formations
-- Vérifie que les données sont accessibles

USE CT_CNEH_DB;
GO

PRINT '=== TEST DE L''API FORMATIONS ===';
PRINT '';

-- Vérifier que les tables existent et contiennent des données
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    DECLARE @FormationsCount INT;
    SELECT @FormationsCount = COUNT(*) FROM Formations;
    PRINT '✓ Table Formations : ' + CAST(@FormationsCount AS VARCHAR) + ' enregistrements';
    
    -- Afficher quelques formations
    PRINT '';
    PRINT '=== EXEMPLES DE FORMATIONS ===';
    SELECT TOP 5 
        Id, 
        Intitule, 
        CCTId, 
        AgentId, 
        TypeFormationId,
        DateDebut,
        DateFin,
        ValideParFormateur,
        ValideCHEH
    FROM Formations 
    ORDER BY Id;
END
ELSE
BEGIN
    PRINT '❌ Table Formations n''existe pas';
END

PRINT '';

IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation')
BEGIN
    DECLARE @TypesFormationCount INT;
    SELECT @TypesFormationCount = COUNT(*) FROM TypesFormation;
    PRINT '✓ Table TypesFormation : ' + CAST(@TypesFormationCount AS VARCHAR) + ' enregistrements';
    
    -- Afficher les types de formation
    PRINT '';
    PRINT '=== TYPES DE FORMATION ===';
    SELECT Id, Libelle FROM TypesFormation ORDER BY Id;
END
ELSE
BEGIN
    PRINT '❌ Table TypesFormation n''existe pas';
END

PRINT '';

-- Vérifier les relations
PRINT '=== VÉRIFICATION DES RELATIONS ===';
DECLARE @ValidRelations INT = 0;
DECLARE @TotalFormations INT = 0;

SELECT @TotalFormations = COUNT(*) FROM Formations;
SELECT @ValidRelations = COUNT(*) 
FROM Formations f
INNER JOIN CCTs c ON f.CCTId = c.Id
INNER JOIN Agents a ON f.AgentId = a.Id
INNER JOIN TypesFormation tf ON f.TypeFormationId = tf.Id;

PRINT 'Formations avec relations valides : ' + CAST(@ValidRelations AS VARCHAR) + ' / ' + CAST(@TotalFormations AS VARCHAR);

IF @ValidRelations = @TotalFormations
BEGIN
    PRINT '✓ Toutes les relations sont valides';
END
ELSE
BEGIN
    PRINT '⚠️  Certaines relations sont invalides';
END

PRINT '';
PRINT '=== TEST TERMINÉ ===';
PRINT '📋 Prochaines étapes :';
PRINT '1. Testez l''API : http://localhost:7000/api/Formations';
PRINT '2. Testez l''application : http://localhost:3000/formations';
PRINT '3. Vérifiez que les données s''affichent correctement'; 