-- Script de migration pour les tables d'historique
-- Vérification et création des tables si elles n'existent pas

USE [CT_CNEH_DB]
GO

-- Vérifier si la table HistoriqueCCTs existe
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[HistoriqueCCTs]') AND type in (N'U'))
BEGIN
    PRINT 'Création de la table HistoriqueCCTs...'
    
    CREATE TABLE [dbo].[HistoriqueCCTs](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [CCTId] [int] NOT NULL,
        [ReseauId] [int] NOT NULL,
        [DateDebut] [datetime] NOT NULL,
        [DateFin] [datetime] NULL,
        CONSTRAINT [PK_HistoriqueCCTs] PRIMARY KEY CLUSTERED ([Id] ASC)
    )
    
    -- Ajouter les contraintes de clé étrangère
    ALTER TABLE [dbo].[HistoriqueCCTs] ADD CONSTRAINT [FK_HistoriqueCCTs_CCTs] 
        FOREIGN KEY([CCTId]) REFERENCES [dbo].[CCTs] ([Id])
    
    ALTER TABLE [dbo].[HistoriqueCCTs] ADD CONSTRAINT [FK_HistoriqueCCTs_Reseaux] 
        FOREIGN KEY([ReseauId]) REFERENCES [dbo].[Reseaux] ([Id])
    
    PRINT 'Table HistoriqueCCTs créée avec succès !'
END
ELSE
BEGIN
    PRINT 'Table HistoriqueCCTs existe déjà.'
END

-- Vérifier si la table HistoriqueAffectations existe
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[HistoriqueAffectations]') AND type in (N'U'))
BEGIN
    PRINT 'Création de la table HistoriqueAffectations...'
    
    CREATE TABLE [dbo].[HistoriqueAffectations](
        [Id] [int] IDENTITY(1,1) NOT NULL,
        [EntiteId] [int] NOT NULL,
        [TypeEntite] [nvarchar](50) NOT NULL,
        [CCTId] [int] NOT NULL,
        [DateAffectation] [datetime] NOT NULL,
        [DateFinAffectation] [datetime] NULL,
        [MotifAffectation] [nvarchar](500) NULL,
        [MotifFinAffectation] [nvarchar](500) NULL,
        [IsActive] [bit] NOT NULL DEFAULT 1,
        [DateCreation] [datetime] NOT NULL DEFAULT GETDATE(),
        [AgentId] [int] NULL,
        [ChefCentreId] [int] NULL,
        CONSTRAINT [PK_HistoriqueAffectations] PRIMARY KEY CLUSTERED ([Id] ASC)
    )
    
    -- Ajouter les contraintes de clé étrangère
    ALTER TABLE [dbo].[HistoriqueAffectations] ADD CONSTRAINT [FK_HistoriqueAffectations_CCTs] 
        FOREIGN KEY([CCTId]) REFERENCES [dbo].[CCTs] ([Id])
    
    ALTER TABLE [dbo].[HistoriqueAffectations] ADD CONSTRAINT [FK_HistoriqueAffectations_Agents] 
        FOREIGN KEY([AgentId]) REFERENCES [dbo].[Agents] ([Id])
    
    ALTER TABLE [dbo].[HistoriqueAffectations] ADD CONSTRAINT [FK_HistoriqueAffectations_ChefCentres] 
        FOREIGN KEY([ChefCentreId]) REFERENCES [dbo].[ChefCentres] ([Id])
    
    PRINT 'Table HistoriqueAffectations créée avec succès !'
END
ELSE
BEGIN
    PRINT 'Table HistoriqueAffectations existe déjà.'
END

-- Vérifier la structure des tables existantes
PRINT '=== VÉRIFICATION DES STRUCTURES ==='

-- Structure de HistoriqueCCTs
PRINT 'Structure de HistoriqueCCTs:'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueCCTs'
ORDER BY ORDINAL_POSITION

-- Structure de HistoriqueAffectations
PRINT 'Structure de HistoriqueAffectations:'
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'HistoriqueAffectations'
ORDER BY ORDINAL_POSITION

-- Vérifier les contraintes de clé étrangère
PRINT 'Contraintes de clé étrangère:'
SELECT 
    fk.name AS FK_Name,
    OBJECT_NAME(fk.parent_object_id) AS Table_Name,
    COL_NAME(fkc.parent_object_id, fkc.parent_column_id) AS Column_Name,
    OBJECT_NAME(fk.referenced_object_id) AS Referenced_Table_Name,
    COL_NAME(fkc.referenced_object_id, fkc.referenced_column_id) AS Referenced_Column_Name
FROM sys.foreign_keys fk
INNER JOIN sys.foreign_key_columns fkc ON fk.object_id = fkc.constraint_object_id
WHERE OBJECT_NAME(fk.parent_object_id) IN ('HistoriqueCCTs', 'HistoriqueAffectations')

PRINT '=== MIGRATION TERMINÉE ==='
GO
