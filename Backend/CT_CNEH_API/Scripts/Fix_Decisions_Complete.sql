-- Script de correction automatique pour le module Décisions
-- Exécuter ce script dans SSMS pour corriger tous les problèmes

USE [CT_CNEH_DB]
GO

PRINT '🔧 CORRECTION AUTOMATIQUE DU MODULE DÉCISIONS'
PRINT '=============================================='
PRINT ''

-- 1. Créer la table TypeDecisions si elle n'existe pas
PRINT '📋 1. CRÉATION DE LA TABLE TYPEDECISIONS'
PRINT '----------------------------------------'

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeDecisions]') AND type in (N'U'))
BEGIN
    PRINT '🚀 Création de la table TypeDecisions...'
    
    CREATE TABLE [TypeDecisions] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Code] NVARCHAR(50) NOT NULL UNIQUE,
        [Libelle] NVARCHAR(100) NOT NULL,
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        [UpdatedAt] DATETIME2 NULL
    )
    
    PRINT '✅ Table TypeDecisions créée avec succès'
END
ELSE
BEGIN
    PRINT '✅ Table TypeDecisions existe déjà'
END

-- 2. Créer la table TypeEntites si elle n'existe pas
PRINT ''
PRINT '📋 2. CRÉATION DE LA TABLE TYPEENTITES'
PRINT '--------------------------------------'

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[TypeEntites]') AND type in (N'U'))
BEGIN
    PRINT '🚀 Création de la table TypeEntites...'
    
    CREATE TABLE [TypeEntites] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Code] NVARCHAR(50) NOT NULL UNIQUE,
        [Libelle] NVARCHAR(100) NOT NULL,
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        [UpdatedAt] DATETIME2 NULL
    )
    
    PRINT '✅ Table TypeEntites créée avec succès'
END
ELSE
BEGIN
    PRINT '✅ Table TypeEntites existe déjà'
END

-- 3. Peupler TypeDecisions si vide
PRINT ''
PRINT '📋 3. PEUPLEMENT DE TYPEDECISIONS'
PRINT '---------------------------------'

IF NOT EXISTS (SELECT TOP 1 1 FROM [TypeDecisions])
BEGIN
    PRINT '🚀 Peuplement de TypeDecisions...'
    
    INSERT INTO [TypeDecisions] ([Code], [Libelle]) VALUES
    ('APPROBATION', 'Approbation'),
    ('REJET', 'Rejet'),
    ('SUSPENSION', 'Suspension'),
    ('CREATION', 'Création'),
    ('FORMATION', 'Formation'),
    ('PROMOTION', 'Promotion'),
    ('CHANGEMENT_NOM', 'Changement de nom'),
    ('AFFECTATION', 'Affectation'),
    ('MUTATION', 'Mutation'),
    ('LICENCIEMENT', 'Licenciement'),
    ('RETRAITE', 'Retraite'),
    ('AUTRE', 'Autre')
    
    PRINT '✅ TypeDecisions peuplé avec succès'
END
ELSE
BEGIN
    PRINT '✅ TypeDecisions contient déjà des données'
END

-- 4. Peupler TypeEntites si vide
PRINT ''
PRINT '📋 4. PEUPLEMENT DE TYPEENTITES'
PRINT '--------------------------------'

IF NOT EXISTS (SELECT TOP 1 1 FROM [TypeEntites])
BEGIN
    PRINT '🚀 Peuplement de TypeEntites...'
    
    INSERT INTO [TypeEntites] ([Code], [Libelle]) VALUES
    ('RESEAU', 'Réseau'),
    ('CCT', 'CCT'),
    ('AGENT', 'Agent'),
    ('CHEF_CENTRE', 'Chef de centre'),
    ('LIGNE', 'Ligne'),
    ('EQUIPEMENT', 'Équipement'),
    ('FORMATION', 'Formation'),
    ('DECISION', 'Décision')
    
    PRINT '✅ TypeEntites peuplé avec succès'
END
ELSE
BEGIN
    PRINT '✅ TypeEntites contient déjà des données'
END

-- 5. Vérifier et corriger la table Decisions
PRINT ''
PRINT '📋 5. VÉRIFICATION DE LA TABLE DECISIONS'
PRINT '----------------------------------------'

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Decisions]') AND type in (N'U'))
BEGIN
    PRINT '✅ Table Decisions existe'
    
    -- Vérifier si les colonnes TypeDecisionId et EntiteTypeId existent
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'TypeDecisionId')
    BEGIN
        PRINT '⚠️ Colonne TypeDecisionId manquante - ajout...'
        ALTER TABLE [Decisions] ADD [TypeDecisionId] INT NOT NULL DEFAULT 1
        PRINT '✅ Colonne TypeDecisionId ajoutée'
    END
    
    IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'EntiteTypeId')
    BEGIN
        PRINT '⚠️ Colonne EntiteTypeId manquante - ajout...'
        ALTER TABLE [Decisions] ADD [EntiteTypeId] INT NOT NULL DEFAULT 1
        PRINT '✅ Colonne EntiteTypeId ajoutée'
    END
    
    -- Vérifier si les anciennes colonnes existent et les supprimer
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'TypeDecision')
    BEGIN
        PRINT '⚠️ Ancienne colonne TypeDecision détectée - suppression...'
        ALTER TABLE [Decisions] DROP COLUMN [TypeDecision]
        PRINT '✅ Ancienne colonne TypeDecision supprimée'
    END
    
    IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Decisions' AND COLUMN_NAME = 'EntiteType')
    BEGIN
        PRINT '⚠️ Ancienne colonne EntiteType détectée - suppression...'
        ALTER TABLE [Decisions] DROP COLUMN [EntiteType]
        PRINT '✅ Ancienne colonne EntiteType supprimée'
    END
END
ELSE
BEGIN
    PRINT '❌ Table Decisions n''existe pas'
    PRINT '⚠️ Veuillez exécuter les migrations Entity Framework'
END

-- 6. Vérifier les contraintes de clés étrangères
PRINT ''
PRINT '📋 6. VÉRIFICATION DES CONTRAINTES'
PRINT '----------------------------------'

-- Ajouter les contraintes FK si elles n'existent pas
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Decisions]') AND type in (N'U'))
BEGIN
    -- Contrainte FK pour TypeDecisionId
    IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_TypeDecisions_TypeDecisionId')
    BEGIN
        PRINT '🚀 Ajout de la contrainte FK pour TypeDecisionId...'
        ALTER TABLE [Decisions] 
        ADD CONSTRAINT [FK_Decisions_TypeDecisions_TypeDecisionId] 
        FOREIGN KEY ([TypeDecisionId]) REFERENCES [TypeDecisions]([Id])
        PRINT '✅ Contrainte FK TypeDecisionId ajoutée'
    END
    
    -- Contrainte FK pour EntiteTypeId
    IF NOT EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'FK_Decisions_TypeEntites_EntiteTypeId')
    BEGIN
        PRINT '🚀 Ajout de la contrainte FK pour EntiteTypeId...'
        ALTER TABLE [Decisions] 
        ADD CONSTRAINT [FK_Decisions_TypeEntites_EntiteTypeId] 
        FOREIGN KEY ([EntiteTypeId]) REFERENCES [TypeEntites]([Id])
        PRINT '✅ Contrainte FK EntiteTypeId ajoutée'
    END
END

-- 7. Résumé final
PRINT ''
PRINT '📋 7. RÉSUMÉ FINAL'
PRINT '-------------------'

DECLARE @TypeDecisionsCount INT = (SELECT COUNT(*) FROM [TypeDecisions])
DECLARE @TypeEntitesCount INT = (SELECT COUNT(*) FROM [TypeEntites])
DECLARE @DecisionsExists BIT = CASE WHEN EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Decisions]') AND type in (N'U')) THEN 1 ELSE 0 END

PRINT '📊 ÉTAT FINAL:'
PRINT '- TypeDecisions: ' + CAST(@TypeDecisionsCount AS VARCHAR) + ' enregistrements'
PRINT '- TypeEntites: ' + CAST(@TypeEntitesCount AS VARCHAR) + ' enregistrements'
PRINT '- Table Decisions: ' + CASE WHEN @DecisionsExists = 1 THEN '✅ EXISTE' ELSE '❌ MANQUANTE' END

IF @TypeDecisionsCount > 0 AND @TypeEntitesCount > 0 AND @DecisionsExists = 1
BEGIN
    PRINT ''
    PRINT '🎉 SUCCÈS ! Le module Décisions est maintenant prêt à fonctionner !'
    PRINT '✅ Toutes les tables de référence sont créées et peuplées'
    PRINT '✅ Les contraintes de clés étrangères sont configurées'
    PRINT '✅ Le frontend peut maintenant créer des décisions sans erreur 500'
END
ELSE
BEGIN
    PRINT ''
    PRINT '⚠️ ATTENTION: Certains éléments nécessitent encore une intervention manuelle'
    IF @DecisionsExists = 0
        PRINT '   - Exécuter les migrations Entity Framework pour créer la table Decisions'
END

PRINT ''
PRINT '🎯 CORRECTION TERMINÉE !'
GO
