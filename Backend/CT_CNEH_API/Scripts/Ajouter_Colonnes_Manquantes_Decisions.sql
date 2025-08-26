-- Script pour ajouter les colonnes manquantes à la table Decisions
USE [CT_CNEH_DB]
GO

PRINT 'Debut de la verification et ajout des colonnes manquantes...'
GO

-- Vérifier si les colonnes existent déjà
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'TypeDecisionId')
BEGIN
    ALTER TABLE [Decisions] ADD [TypeDecisionId] int NULL
    PRINT 'Colonne TypeDecisionId ajoutee'
END
ELSE
BEGIN
    PRINT 'Colonne TypeDecisionId existe deja'
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'EntiteTypeId')
BEGIN
    ALTER TABLE [Decisions] ADD [EntiteTypeId] int NULL
    PRINT 'Colonne EntiteTypeId ajoutee'
END
ELSE
BEGIN
    PRINT 'Colonne EntiteTypeId existe deja'
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'AgentId')
BEGIN
    ALTER TABLE [Decisions] ADD [AgentId] int NULL
    PRINT 'Colonne AgentId ajoutee'
END
ELSE
BEGIN
    PRINT 'Colonne AgentId existe deja'
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'ChefCentreId')
BEGIN
    ALTER TABLE [Decisions] ADD [ChefCentreId] int NULL
    PRINT 'Colonne ChefCentreId ajoutee'
END
ELSE
BEGIN
    PRINT 'Colonne ChefCentreId existe deja'
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'LigneId')
BEGIN
    ALTER TABLE [Decisions] ADD [LigneId] int NULL
    PRINT 'Colonne LigneId ajoutee'
END
ELSE
BEGIN
    PRINT 'Colonne LigneId existe deja'
END

-- Vérifier la structure finale
PRINT 'Structure finale de la table Decisions:'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Decisions' 
ORDER BY ORDINAL_POSITION

-- Ajouter les contraintes de clé étrangère si elles n'existent pas
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_TypeDecisions_TypeDecisionId')
BEGIN
    ALTER TABLE [Decisions] ADD CONSTRAINT [FK_Decisions_TypeDecisions_TypeDecisionId] 
    FOREIGN KEY ([TypeDecisionId]) REFERENCES [TypeDecisions]([Id])
    PRINT 'Contrainte FK_Decisions_TypeDecisions_TypeDecisionId ajoutee'
END

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_TypeEntites_EntiteTypeId')
BEGIN
    ALTER TABLE [Decisions] ADD CONSTRAINT [FK_Decisions_TypeEntites_EntiteTypeId] 
    FOREIGN KEY ([EntiteTypeId]) REFERENCES [TypeEntites]([Id])
    PRINT 'Contrainte FK_Decisions_TypeEntites_EntiteTypeId ajoutee'
END

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_Agents_AgentId')
BEGIN
    ALTER TABLE [Decisions] ADD CONSTRAINT [FK_Decisions_Agents_AgentId] 
    FOREIGN KEY ([AgentId]) REFERENCES [Agents]([Id])
    PRINT 'Contrainte FK_Decisions_Agents_AgentId ajoutee'
END

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_ChefCentres_ChefCentreId')
BEGIN
    ALTER TABLE [Decisions] ADD CONSTRAINT [FK_Decisions_ChefCentres_ChefCentreId] 
    FOREIGN KEY ([ChefCentreId]) REFERENCES [ChefCentres]([Id])
    PRINT 'Contrainte FK_Decisions_ChefCentres_ChefCentreId ajoutee'
END

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_Lignes_LigneId')
BEGIN
    ALTER TABLE [Decisions] ADD CONSTRAINT [FK_Decisions_Lignes_LigneId] 
    FOREIGN KEY ([LigneId]) REFERENCES [Lignes]([Id])
    PRINT 'Contrainte FK_Decisions_Lignes_LigneId ajoutee'
END

PRINT 'Script termine avec succes!'
GO
