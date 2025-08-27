-- =============================================
-- Script de création de la table HistoriqueChefCentre
-- Conforme au cahier des charges
-- =============================================

USE CT_CNEH_DB;
GO

-- Vérifier si la table existe déjà
IF OBJECT_ID('dbo.HistoriqueChefCentre', 'U') IS NOT NULL
BEGIN
    PRINT 'La table HistoriqueChefCentre existe déjà. Suppression...';
    DROP TABLE dbo.HistoriqueChefCentre;
    PRINT 'Table HistoriqueChefCentre supprimée.';
END

-- Créer la table HistoriqueChefCentre
CREATE TABLE dbo.HistoriqueChefCentre (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ChefCentreId INT NOT NULL,
    CCTId INT NOT NULL,
    DateDebutAffectation DATE NOT NULL,
    DateFinAffectation DATE NULL, -- NULL si affectation en cours
    DateMiseAJour DATETIME2 DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1,
    DateCreation DATETIME2 DEFAULT GETDATE(),
    
    -- Contraintes de clés étrangères
    CONSTRAINT FK_HistoriqueChefCentre_ChefCentre 
        FOREIGN KEY (ChefCentreId) REFERENCES dbo.ChefCentres(Id),
    CONSTRAINT FK_HistoriqueChefCentre_CCT 
        FOREIGN KEY (CCTId) REFERENCES dbo.CCTs(Id)
);
GO

-- Créer des index pour améliorer les performances
CREATE INDEX IX_HistoriqueChefCentre_ChefCentreId 
    ON dbo.HistoriqueChefCentre(ChefCentreId);
CREATE INDEX IX_HistoriqueChefCentre_CCTId 
    ON dbo.HistoriqueChefCentre(CCTId);
CREATE INDEX IX_HistoriqueChefCentre_DateDebut 
    ON dbo.HistoriqueChefCentre(DateDebutAffectation);
GO

-- Insérer des données d'exemple
INSERT INTO dbo.HistoriqueChefCentre (ChefCentreId, CCTId, DateDebutAffectation, DateFinAffectation, DateMiseAJour)
VALUES 
    (1, 9, '2020-03-15', '2023-06-30', GETDATE()),
    (1, 9, '2023-07-01', NULL, GETDATE()), -- Affectation en cours
    (2, 10, '2021-01-01', '2022-12-31', GETDATE()),
    (2, 11, '2023-01-01', NULL, GETDATE()), -- Affectation en cours
    (3, 12, '2020-06-01', '2023-05-31', GETDATE()),
    (3, 13, '2023-06-01', NULL, GETDATE()); -- Affectation en cours

PRINT 'Table HistoriqueChefCentre créée avec succès !';
PRINT 'Données d''exemple insérées.';
GO

-- Vérifier la création
SELECT 
    'HistoriqueChefCentre' as TableName,
    COUNT(*) as NombreLignes
FROM dbo.HistoriqueChefCentre;
GO






