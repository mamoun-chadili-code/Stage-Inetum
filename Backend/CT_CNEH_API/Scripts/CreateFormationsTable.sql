-- Script SQL Server pour créer la table Formations
-- Structure de la table Formation

USE CT_CNEH_DB;
GO

-- Vérifier si la table Formations existe déjà
IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Formations')
BEGIN
    PRINT 'La table Formations existe déjà.';
    RETURN;
END

-- Créer la table Formations
CREATE TABLE Formations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Intitule NVARCHAR(255) NOT NULL,
    CCTId INT,
    AgentId INT,
    ChefCentreId INT,
    TypeFormationId INT,
    Matiere NVARCHAR(MAX),
    DateDebut DATETIME,
    DateFin DATETIME,
    ValideParFormateur BIT DEFAULT 0,
    PremierAnimateur NVARCHAR(100),
    DeuxiemeAnimateur NVARCHAR(100),
    ValideCHEH BIT DEFAULT 0,
    ValideLe DATE,
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE(),
    
    -- Contraintes de clés étrangères
    CONSTRAINT FK_Formations_CCT FOREIGN KEY (CCTId) REFERENCES CCTs(Id),
    CONSTRAINT FK_Formations_Agent FOREIGN KEY (AgentId) REFERENCES Agents(Id),
    CONSTRAINT FK_Formations_ChefCentre FOREIGN KEY (ChefCentreId) REFERENCES ChefCentres(Id)
);

-- Créer un index sur les colonnes fréquemment utilisées
CREATE INDEX IX_Formations_CCTId ON Formations(CCTId);
CREATE INDEX IX_Formations_AgentId ON Formations(AgentId);
CREATE INDEX IX_Formations_DateDebut ON Formations(DateDebut);
CREATE INDEX IX_Formations_ValideParFormateur ON Formations(ValideParFormateur);

PRINT 'Table Formations créée avec succès !';
PRINT '';
PRINT '=== STRUCTURE DE LA TABLE ===';
PRINT 'Id : Clé primaire auto-incrémentée';
PRINT 'Intitule : Titre de la formation (obligatoire)';
PRINT 'CCTId : Référence vers la table CCTs';
PRINT 'AgentId : Référence vers la table Agents';
PRINT 'ChefCentreId : Référence vers la table ChefCentres';
PRINT 'TypeFormationId : Type de formation (1-7)';
PRINT 'Matiere : Description de la matière';
PRINT 'DateDebut : Date et heure de début';
PRINT 'DateFin : Date et heure de fin';
PRINT 'ValideParFormateur : Validation par formateur (0/1)';
PRINT 'PremierAnimateur : Nom du premier animateur';
PRINT 'DeuxiemeAnimateur : Nom du second animateur';
PRINT 'ValideCHEH : Validation CHEH (0/1)';
PRINT 'ValideLe : Date de validation';
PRINT 'CreatedAt : Date de création';
PRINT 'UpdatedAt : Date de modification';
PRINT '';
PRINT '=== INDEX CRÉÉS ===';
PRINT 'IX_Formations_CCTId : Index sur CCTId';
PRINT 'IX_Formations_AgentId : Index sur AgentId';
PRINT 'IX_Formations_DateDebut : Index sur DateDebut';
PRINT 'IX_Formations_ValideParFormateur : Index sur ValideParFormateur';
PRINT '';
PRINT '=== CONTRAINTES ===';
PRINT 'FK_Formations_CCT : Clé étrangère vers CCTs';
PRINT 'FK_Formations_Agent : Clé étrangère vers Agents';
PRINT 'FK_Formations_ChefCentre : Clé étrangère vers ChefCentres';
PRINT '';
PRINT 'La table est maintenant prête pour recevoir des données !'; 