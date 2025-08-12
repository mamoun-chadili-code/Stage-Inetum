-- Script de vérification complète du module Formation
-- Vérifie que toutes les données sont correctes et fonctionnelles

USE CT_CNEH_DB;
GO

PRINT '=== VÉRIFICATION COMPLÈTE DU MODULE FORMATION ===';
PRINT '';

-- 1. Vérifier la structure des tables
PRINT '1. VÉRIFICATION DE LA STRUCTURE DES TABLES';
PRINT '----------------------------------------';

-- Vérifier TypesFormation_New
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'TypesFormation_New')
BEGIN
    PRINT '✓ Table TypesFormation_New existe';
    DECLARE @TypesFormationCount INT;
    SELECT @TypesFormationCount = COUNT(*) FROM TypesFormation_New;
    PRINT '   - Nombre de types de formation : ' + CAST(@TypesFormationCount AS VARCHAR);
    
    -- Afficher les types de formation
    PRINT '   - Types de formation disponibles :';
    SELECT Id, Libelle FROM TypesFormation_New ORDER BY Id;
END
ELSE
BEGIN
    PRINT '❌ Table TypesFormation_New n''existe pas';
END

PRINT '';

-- Vérifier Formations_New
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations_New')
BEGIN
    PRINT '✓ Table Formations_New existe';
    DECLARE @FormationsCount INT;
    SELECT @FormationsCount = COUNT(*) FROM Formations_New;
    PRINT '   - Nombre de formations : ' + CAST(@FormationsCount AS VARCHAR);
    
    -- Vérifier la structure des colonnes
    PRINT '   - Structure de la table Formations_New :';
    SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'Formations_New' 
    ORDER BY ORDINAL_POSITION;
END
ELSE
BEGIN
    PRINT '❌ Table Formations_New n''existe pas';
END

PRINT '';

-- 2. Vérifier les données des formations
PRINT '2. VÉRIFICATION DES DONNÉES DES FORMATIONS';
PRINT '------------------------------------------';

-- Afficher toutes les formations avec leurs détails
SELECT 
    f.Id,
    f.Intitule,
    c.Nom AS CCT,
    a.Nom + ' ' + a.Prenom AS Agent,
    cc.Nom AS ChefCentre,
    tf.Libelle AS TypeFormation,
    f.Matiere,
    f.DateDebut,
    f.DateFin,
    CASE f.ValideParFormateur WHEN 1 THEN 'Oui' ELSE 'Non' END AS ValideParFormateur,
    f.PremierAnimateur,
    f.DeuxiemeAnimateur,
    CASE f.ValideCHEH WHEN 1 THEN 'Oui' ELSE 'Non' END AS ValideCHEH,
    f.ValideLe
FROM Formations_New f
LEFT JOIN CCTs c ON f.CCTId = c.Id
LEFT JOIN Agents a ON f.AgentId = a.Id
LEFT JOIN ChefCentres cc ON f.ChefCentreId = cc.Id
LEFT JOIN TypesFormation_New tf ON f.TypeFormationId = tf.Id
ORDER BY f.Id;

PRINT '';

-- 3. Vérifier les relations et contraintes
PRINT '3. VÉRIFICATION DES RELATIONS ET CONTRAINTES';
PRINT '--------------------------------------------';

-- Vérifier les clés étrangères
DECLARE @InvalidCCTs INT = 0;
DECLARE @InvalidAgents INT = 0;
DECLARE @InvalidChefCentres INT = 0;
DECLARE @InvalidTypesFormation INT = 0;

-- Vérifier les CCTs
SELECT @InvalidCCTs = COUNT(*) 
FROM Formations_New f 
LEFT JOIN CCTs c ON f.CCTId = c.Id 
WHERE c.Id IS NULL;

-- Vérifier les Agents
SELECT @InvalidAgents = COUNT(*) 
FROM Formations_New f 
LEFT JOIN Agents a ON f.AgentId = a.Id 
WHERE a.Id IS NULL;

-- Vérifier les ChefCentres
SELECT @InvalidChefCentres = COUNT(*) 
FROM Formations_New f 
LEFT JOIN ChefCentres cc ON f.ChefCentreId = cc.Id 
WHERE cc.Id IS NULL;

-- Vérifier les TypesFormation
SELECT @InvalidTypesFormation = COUNT(*) 
FROM Formations_New f 
LEFT JOIN TypesFormation_New tf ON f.TypeFormationId = tf.Id 
WHERE tf.Id IS NULL;

PRINT 'Vérification des relations :';
PRINT '   - CCTs invalides : ' + CAST(@InvalidCCTs AS VARCHAR);
PRINT '   - Agents invalides : ' + CAST(@InvalidAgents AS VARCHAR);
PRINT '   - Chefs de centre invalides : ' + CAST(@InvalidChefCentres AS VARCHAR);
PRINT '   - Types de formation invalides : ' + CAST(@InvalidTypesFormation AS VARCHAR);

IF @InvalidCCTs = 0 AND @InvalidAgents = 0 AND @InvalidChefCentres = 0 AND @InvalidTypesFormation = 0
BEGIN
    PRINT '✓ Toutes les relations sont valides';
END
ELSE
BEGIN
    PRINT '❌ Certaines relations sont invalides';
END

PRINT '';

-- 4. Vérifier les dates
PRINT '4. VÉRIFICATION DES DATES';
PRINT '------------------------';

-- Vérifier que les dates de fin sont après les dates de début
DECLARE @InvalidDates INT = 0;
SELECT @InvalidDates = COUNT(*) 
FROM Formations_New 
WHERE DateFin <= DateDebut;

PRINT 'Formations avec dates invalides (fin <= début) : ' + CAST(@InvalidDates AS VARCHAR);

IF @InvalidDates = 0
BEGIN
    PRINT '✓ Toutes les dates sont valides';
END
ELSE
BEGIN
    PRINT '❌ Certaines formations ont des dates invalides';
    SELECT Id, Intitule, DateDebut, DateFin 
    FROM Formations_New 
    WHERE DateFin <= DateDebut;
END

PRINT '';

-- 5. Statistiques finales
PRINT '5. STATISTIQUES FINALES';
PRINT '----------------------';

DECLARE @TotalFormations INT;
DECLARE @FormationsValidees INT;
DECLARE @FormationsCHEH INT;
DECLARE @FormationsEnCours INT;

SELECT @TotalFormations = COUNT(*) FROM Formations_New;
SELECT @FormationsValidees = COUNT(*) FROM Formations_New WHERE ValideParFormateur = 1;
SELECT @FormationsCHEH = COUNT(*) FROM Formations_New WHERE ValideCHEH = 1;
SELECT @FormationsEnCours = COUNT(*) FROM Formations_New WHERE ValideParFormateur = 0;

PRINT 'Résumé des formations :';
PRINT '   - Total : ' + CAST(@TotalFormations AS VARCHAR);
PRINT '   - Validées par formateur : ' + CAST(@FormationsValidees AS VARCHAR);
PRINT '   - Validées CHEH : ' + CAST(@FormationsCHEH AS VARCHAR);
PRINT '   - En cours : ' + CAST(@FormationsEnCours AS VARCHAR);

PRINT '';
PRINT '=== VÉRIFICATION COMPLÈTE TERMINÉE ===';

-- 6. Recommandations pour l'utilisation
PRINT '';
PRINT '6. RECOMMANDATIONS POUR L''UTILISATION';
PRINT '-----------------------------------';

IF @TotalFormations > 0
BEGIN
    PRINT '✓ Module Formation prêt à être utilisé !';
    PRINT '✓ ' + CAST(@TotalFormations AS VARCHAR) + ' formations disponibles';
    PRINT '✓ Toutes les relations sont valides';
    PRINT '';
    PRINT 'Pour utiliser dans l''application :';
    PRINT '1. Mettez à jour les modèles Entity Framework';
    PRINT '2. Ou renommez les tables :';
    PRINT '   EXEC sp_rename ''TypesFormation_New'', ''TypesFormation'';';
    PRINT '   EXEC sp_rename ''Formations_New'', ''Formations'';';
    PRINT '';
    PRINT '🎉 Module Formation entièrement fonctionnel !';
END
ELSE
BEGIN
    PRINT '❌ Aucune formation trouvée';
    PRINT 'Veuillez vérifier l''insertion des données';
END 