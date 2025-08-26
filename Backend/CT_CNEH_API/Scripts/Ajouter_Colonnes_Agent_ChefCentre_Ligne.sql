-- Script pour ajouter les colonnes manquantes à la table Decisions
-- Exécuter ce script dans SQL Server Management Studio

USE [CT_CNEH_DB]
GO

-- Vérifier si les colonnes existent déjà
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'AgentId')
BEGIN
    ALTER TABLE [Decisions] ADD [AgentId] int NULL
    PRINT 'Colonne AgentId ajoutée'
END
ELSE
BEGIN
    PRINT 'Colonne AgentId existe déjà'
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'ChefCentreId')
BEGIN
    ALTER TABLE [Decisions] ADD [ChefCentreId] int NULL
    PRINT 'Colonne ChefCentreId ajoutée'
END
ELSE
BEGIN
    PRINT 'Colonne ChefCentreId existe déjà'
END

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'LigneId')
BEGIN
    ALTER TABLE [Decisions] ADD [LigneId] int NULL
    PRINT 'Colonne LigneId ajoutée'
END
ELSE
BEGIN
    PRINT 'Colonne LigneId existe déjà'
END

-- Ajouter les contraintes de clé étrangère
IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_Agents_AgentId')
BEGIN
    ALTER TABLE [Decisions] ADD CONSTRAINT [FK_Decisions_Agents_AgentId] 
    FOREIGN KEY ([AgentId]) REFERENCES [Agents]([Id])
    PRINT 'Contrainte FK_Decisions_Agents_AgentId ajoutée'
END

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_Agents_ChefCentreId')
BEGIN
    ALTER TABLE [Decisions] ADD CONSTRAINT [FK_Decisions_Agents_ChefCentreId] 
    FOREIGN KEY ([ChefCentreId]) REFERENCES [Agents]([Id])
    PRINT 'Contrainte FK_Decisions_Agents_ChefCentreId ajoutée'
END

IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_Lignes_LigneId')
BEGIN
    ALTER TABLE [Decisions] ADD CONSTRAINT [FK_Decisions_Lignes_LigneId] 
    FOREIGN KEY ([LigneId]) REFERENCES [Lignes]([Id])
    PRINT 'Contrainte FK_Decisions_Lignes_LigneId ajoutée'
END

-- Vérifier la structure finale
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Decisions' 
ORDER BY ORDINAL_POSITION

PRINT 'Script terminé avec succès!'
GO
