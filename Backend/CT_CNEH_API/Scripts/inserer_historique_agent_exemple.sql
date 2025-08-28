-- Script pour insérer des données d'exemple dans HistoriqueAgent
-- Vérifier d'abord si la table existe
IF OBJECT_ID('HistoriqueAgent', 'U') IS NOT NULL
BEGIN
    PRINT 'Insertion de données d''exemple dans HistoriqueAgent'
    
    -- Vérifier s'il y a déjà des données
    IF NOT EXISTS (SELECT 1 FROM HistoriqueAgent)
    BEGIN
        -- Insérer des données d'exemple
        INSERT INTO HistoriqueAgent (AgentId, CCTId, DateDebutAffectation, DateFinAffectation, DateMiseAJour, IsActive, DateCreation)
        SELECT 
            a.Id AS AgentId,
            c.Id AS CCTId,
            DATEADD(day, -365, GETDATE()) AS DateDebutAffectation, -- Il y a 1 an
            DATEADD(day, -30, GETDATE()) AS DateFinAffectation,    -- Il y a 1 mois
            GETDATE() AS DateMiseAJour,
            0 AS IsActive, -- Affectation terminée
            GETDATE() AS DateCreation
        FROM Agents a
        CROSS JOIN CCTs c
        WHERE a.Id = 1 AND c.Id = 1 -- Premier agent et premier CCT
        
        -- Insérer une affectation active
        INSERT INTO HistoriqueAgent (AgentId, CCTId, DateDebutAffectation, DateFinAffectation, DateMiseAJour, IsActive, DateCreation)
        SELECT 
            a.Id AS AgentId,
            c.Id AS CCTId,
            DATEADD(day, -15, GETDATE()) AS DateDebutAffectation, -- Il y a 15 jours
            NULL AS DateFinAffectation,                           -- Affectation active
            GETDATE() AS DateMiseAJour,
            1 AS IsActive, -- Affectation active
            GETDATE() AS DateCreation
        FROM Agents a
        CROSS JOIN CCTs c
        WHERE a.Id = 1 AND c.Id = 1
        
        PRINT 'Données d''exemple insérées avec succès'
        
        -- Afficher les données insérées
        SELECT 
            h.Id,
            h.AgentId,
            a.Nom + ' ' + a.Prenom AS AgentNom,
            h.CCTId,
            c.Nom AS CCTNom,
            h.DateDebutAffectation,
            h.DateFinAffectation,
            h.DateMiseAJour,
            h.IsActive
        FROM HistoriqueAgent h
        LEFT JOIN Agents a ON h.AgentId = a.Id
        LEFT JOIN CCTs c ON h.CCTId = c.Id
        ORDER BY h.DateDebutAffectation DESC
    END
    ELSE
    BEGIN
        PRINT 'La table HistoriqueAgent contient déjà des données'
        SELECT COUNT(*) AS NombreEnregistrements FROM HistoriqueAgent
    END
END
ELSE
BEGIN
    PRINT 'ERREUR: La table HistoriqueAgent n''existe pas'
    PRINT 'Vérifiez que la migration a été appliquée'
END
