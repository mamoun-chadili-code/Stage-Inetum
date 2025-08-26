-- Script pour créer des exemples d'historique CCT
-- Selon le cahier des charges : CCT, Réseau, Date ralliement, Date fin ralliement

USE [CT_CNEH_DB]
GO

PRINT '=== CRÉATION D''EXEMPLES D''HISTORIQUE CCT ==='

-- Vérifier que les tables CCTs et Reseaux existent et ont des données
IF NOT EXISTS (SELECT * FROM CCTs)
BEGIN
    PRINT 'ERREUR: Aucun CCT trouvé dans la table CCTs'
    PRINT 'Veuillez d''abord créer des CCTs'
    RETURN
END

IF NOT EXISTS (SELECT * FROM Reseaux)
BEGIN
    PRINT 'ERREUR: Aucun réseau trouvé dans la table Reseaux'
    PRINT 'Veuillez d''abord créer des réseaux'
    RETURN
END

-- Récupérer les premiers CCTs et réseaux disponibles
DECLARE @CCT1Id INT, @CCT2Id INT, @CCT3Id INT
DECLARE @Reseau1Id INT, @Reseau2Id INT, @Reseau3Id INT

SELECT TOP 1 @CCT1Id = Id FROM CCTs ORDER BY Id
SELECT TOP 1 @CCT2Id = Id FROM CCTs WHERE Id > @CCT1Id ORDER BY Id
SELECT TOP 1 @CCT3Id = Id FROM CCTs WHERE Id > @CCT2Id ORDER BY Id

SELECT TOP 1 @Reseau1Id = Id FROM Reseaux ORDER BY Id
SELECT TOP 1 @Reseau2Id = Id FROM Reseaux WHERE Id > @Reseau1Id ORDER BY Id
SELECT TOP 1 @Reseau3Id = Id FROM Reseaux WHERE Id > @Reseau2Id ORDER BY Id

PRINT 'CCTs sélectionnés: ' + CAST(@CCT1Id AS VARCHAR) + ', ' + CAST(@CCT2Id AS VARCHAR) + ', ' + CAST(@CCT3Id AS VARCHAR)
PRINT 'Réseaux sélectionnés: ' + CAST(@Reseau1Id AS VARCHAR) + ', ' + CAST(@Reseau2Id AS VARCHAR) + ', ' + CAST(@Reseau3Id AS VARCHAR)

-- Insérer des exemples d'historique CCT
BEGIN TRY
    -- Exemple 1: CCT rallié au réseau 1 (ralliement actif)
    INSERT INTO HistoriqueCCTs (CCTId, ReseauId, DateDebut, DateFin)
    VALUES (@CCT1Id, @Reseau1Id, '2023-01-01', NULL)
    
    PRINT 'Historique CCT 1 créé: CCT ' + CAST(@CCT1Id AS VARCHAR) + ' rallié au réseau ' + CAST(@Reseau1Id AS VARCHAR) + ' depuis 2023-01-01'
    
    -- Exemple 2: CCT rallié au réseau 2 (ralliement terminé)
    INSERT INTO HistoriqueCCTs (CCTId, ReseauId, DateDebut, DateFin)
    VALUES (@CCT2Id, @Reseau2Id, '2022-06-01', '2023-12-31')
    
    PRINT 'Historique CCT 2 créé: CCT ' + CAST(@CCT2Id AS VARCHAR) + ' rallié au réseau ' + CAST(@Reseau2Id AS VARCHAR) + ' du 2022-06-01 au 2023-12-31'
    
    -- Exemple 3: CCT rallié au réseau 3 (ralliement récent)
    INSERT INTO HistoriqueCCTs (CCTId, ReseauId, DateDebut, DateFin)
    VALUES (@CCT3Id, @Reseau3Id, '2024-01-01', NULL)
    
    PRINT 'Historique CCT 3 créé: CCT ' + CAST(@CCT3Id AS VARCHAR) + ' rallié au réseau ' + CAST(@Reseau3Id AS VARCHAR) + ' depuis 2024-01-01'
    
    -- Exemple 4: Changement de réseau pour le CCT 1
    INSERT INTO HistoriqueCCTs (CCTId, ReseauId, DateDebut, DateFin)
    VALUES (@CCT1Id, @Reseau2Id, '2024-03-01', NULL)
    
    PRINT 'Historique CCT 4 créé: CCT ' + CAST(@CCT1Id AS VARCHAR) + ' changé vers le réseau ' + CAST(@Reseau2Id AS VARCHAR) + ' depuis 2024-03-01'
    
    -- Mettre à jour la date de fin du premier ralliement
    UPDATE HistoriqueCCTs 
    SET DateFin = '2024-02-29'
    WHERE CCTId = @CCT1Id AND ReseauId = @Reseau1Id
    
    PRINT 'Date de fin mise à jour pour le premier ralliement du CCT ' + CAST(@CCT1Id AS VARCHAR)
    
    PRINT '=== EXEMPLES D''HISTORIQUE CCT CRÉÉS AVEC SUCCÈS ==='
    
    -- Afficher les données créées
    SELECT 
        h.Id,
        c.Nom AS CCTNom,
        r.Nom AS ReseauNom,
        h.DateDebut AS DateRalliement,
        h.DateFin AS DateFinRalliement,
        CASE 
            WHEN h.DateFin IS NULL THEN 'Ralliement actif'
            ELSE 'Ralliement terminé'
        END AS Statut
    FROM HistoriqueCCTs h
    INNER JOIN CCTs c ON h.CCTId = c.Id
    INNER JOIN Reseaux r ON h.ReseauId = r.Id
    ORDER BY h.DateDebut DESC
    
END TRY
BEGIN CATCH
    PRINT 'ERREUR lors de la création des exemples: ' + ERROR_MESSAGE()
    PRINT 'Code d''erreur: ' + CAST(ERROR_NUMBER() AS VARCHAR)
END CATCH

GO
