-- Script pour vérifier l'historique des agents
-- Vérifier si la table existe
IF OBJECT_ID('HistoriqueAgent', 'U') IS NOT NULL
BEGIN
    PRINT 'Table HistoriqueAgent existe'
    
    -- Compter le nombre d'enregistrements
    DECLARE @count INT
    SELECT @count = COUNT(*) FROM HistoriqueAgent
    PRINT 'Nombre d''enregistrements: ' + CAST(@count AS VARCHAR(10))
    
    -- Afficher quelques exemples
    IF @count > 0
    BEGIN
        SELECT TOP 5 
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
        PRINT 'Aucun historique trouvé'
    END
END
ELSE
BEGIN
    PRINT 'Table HistoriqueAgent n''existe pas'
    
    -- Vérifier les tables existantes
    SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_TYPE = 'BASE TABLE' 
    AND TABLE_NAME LIKE '%Historique%'
    ORDER BY TABLE_NAME
END
