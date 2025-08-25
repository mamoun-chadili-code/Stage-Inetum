-- =====================================================
-- SAUVEGARDE COMPLÈTE DE LA BASE DE DONNÉES CT_CNEH_DB
-- Date de création : 2025
-- Description : Sauvegarde complète avec toutes les tables et données
-- =====================================================

USE master;
GO

-- Créer la sauvegarde complète
BACKUP DATABASE [CT_CNEH_DB] 
TO DISK = 'C:\Backups\CT_CNEH_DB_Complete_Backup_' + CONVERT(VARCHAR(8), GETDATE(), 112) + '_' + REPLACE(CONVERT(VARCHAR(8), GETDATE(), 108), ':', '') + '.bak'
WITH 
    FORMAT,
    INIT,
    NAME = 'CT_CNEH_DB-Complete Database Backup',
    SKIP,
    STATS = 10;
GO

-- =====================================================
-- SCRIPT ALTERNATIF : SAUVEGARDE AVEC EXPORT DES DONNÉES
-- =====================================================

USE [CT_CNEH_DB];
GO

-- =====================================================
-- 1. SAUVEGARDE DE LA TABLE CCTs
-- =====================================================
PRINT '=== SAUVEGARDE TABLE CCTs ===';

-- Structure de la table
SELECT '-- Structure de la table CCTs' as Info;
SELECT 'CREATE TABLE CCTs (' as CreateTable
UNION ALL
SELECT '    Id INT IDENTITY(1,1) PRIMARY KEY,' as CreateTable
UNION ALL
SELECT '    Nom NVARCHAR(100) NOT NULL,' as CreateTable
UNION ALL
SELECT '    Adresse NVARCHAR(200),' as CreateTable
UNION ALL
SELECT '    Telephone NVARCHAR(20),' as CreateTable
UNION ALL
SELECT '    Email NVARCHAR(100),' as CreateTable
UNION ALL
SELECT '    CreatedAt DATETIME2 DEFAULT GETDATE(),' as CreateTable
UNION ALL
SELECT '    UpdatedAt DATETIME2' as CreateTable
UNION ALL
SELECT ');' as CreateTable;

-- Données de la table
SELECT '-- Données de la table CCTs' as Info;
SELECT 'INSERT INTO CCTs (Nom, Adresse, Telephone, Email, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Nom, ''', ''', ISNULL(Adresse, ''), ''', ''', ISNULL(Telephone, ''), ''', ''', ISNULL(Email, ''), ''', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM CCTs
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 2. SAUVEGARDE DE LA TABLE TypeEquipements
-- =====================================================
PRINT '=== SAUVEGARDE TABLE TypeEquipements ===';

-- Structure de la table
SELECT '-- Structure de la table TypeEquipements' as Info;
SELECT 'CREATE TABLE TypeEquipements (' as CreateTable
UNION ALL
SELECT '    Id INT IDENTITY(1,1) PRIMARY KEY,' as CreateTable
UNION ALL
SELECT '    Code NVARCHAR(10) NOT NULL,' as CreateTable
UNION ALL
SELECT '    Libelle NVARCHAR(100) NOT NULL,' as CreateTable
UNION ALL
SELECT '    Description NVARCHAR(500),' as CreateTable
UNION ALL
SELECT '    Etalonnable BIT DEFAULT 0,' as CreateTable
UNION ALL
SELECT '    CreatedAt DATETIME2 DEFAULT GETDATE(),' as CreateTable
UNION ALL
SELECT '    UpdatedAt DATETIME2' as CreateTable
UNION ALL
SELECT ');' as CreateTable;

-- Données de la table
SELECT '-- Données de la table TypeEquipements' as Info;
SELECT 'INSERT INTO TypeEquipements (Code, Libelle, Description, Etalonnable, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Code, ''', ''', Libelle, ''', ''', ISNULL(Description, ''), ''', ', CAST(Etalonnable as INT), ', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM TypeEquipements
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 3. SAUVEGARDE DE LA TABLE Lignes
-- =====================================================
PRINT '=== SAUVEGARDE TABLE Lignes ===';

-- Structure de la table
SELECT '-- Structure de la table Lignes' as Info;
SELECT 'CREATE TABLE Lignes (' as CreateTable
UNION ALL
SELECT '    Id INT IDENTITY(1,1) PRIMARY KEY,' as CreateTable
UNION ALL
SELECT '    NumeroLigne INT NOT NULL,' as CreateTable
UNION ALL
SELECT '    CCTId INT NOT NULL,' as CreateTable
UNION ALL
SELECT '    CategorieId INT,' as CreateTable
UNION ALL
SELECT '    StatutId INT,' as CreateTable
UNION ALL
SELECT '    DateStatut DATETIME2,' as CreateTable
UNION ALL
SELECT '    CategorieCCTId INT,' as CreateTable
UNION ALL
SELECT '    StatutLigneId INT,' as CreateTable
UNION ALL
SELECT '    CreatedAt DATETIME2 DEFAULT GETDATE(),' as CreateTable
UNION ALL
SELECT '    UpdatedAt DATETIME2,' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (CCTId) REFERENCES CCTs(Id),' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (CategorieId) REFERENCES CategorieLignes(Id),' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (StatutId) REFERENCES StatutLignes(Id)' as CreateTable
UNION ALL
SELECT ');' as CreateTable;

-- Données de la table
SELECT '-- Données de la table Lignes' as Info;
SELECT 'INSERT INTO Lignes (NumeroLigne, CCTId, CategorieId, StatutId, DateStatut, CategorieCCTId, StatutLigneId, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (', NumeroLigne, ', ', CCTId, ', ', ISNULL(CategorieId, 'NULL'), ', ', ISNULL(StatutId, 'NULL'), ', ''', ISNULL(DateStatut, 'NULL'), ''', ', ISNULL(CategorieCCTId, 'NULL'), ', ', ISNULL(StatutLigneId, 'NULL'), ', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM Lignes
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 4. SAUVEGARDE DE LA TABLE Equipements
-- =====================================================
PRINT '=== SAUVEGARDE TABLE Equipements ===';

-- Structure de la table
SELECT '-- Structure de la table Equipements' as Info;
SELECT 'CREATE TABLE Equipements (' as CreateTable
UNION ALL
SELECT '    Id INT IDENTITY(1,1) PRIMARY KEY,' as CreateTable
UNION ALL
SELECT '    Marque NVARCHAR(100) NOT NULL,' as CreateTable
UNION ALL
SELECT '    Modele NVARCHAR(100) NOT NULL,' as CreateTable
UNION ALL
SELECT '    LigneId INT,' as CreateTable
UNION ALL
SELECT '    TypeEquipementId INT,' as CreateTable
UNION ALL
SELECT '    Protocole NVARCHAR(100),' as CreateTable
UNION ALL
SELECT '    RefHomologation NVARCHAR(100),' as CreateTable
UNION ALL
SELECT '    DateHomologation DATETIME2,' as CreateTable
UNION ALL
SELECT '    DateMiseService DATETIME2,' as CreateTable
UNION ALL
SELECT '    DateEtalonnage DATETIME2,' as CreateTable
UNION ALL
SELECT '    DateExpirationEtalonnage DATETIME2,' as CreateTable
UNION ALL
SELECT '    CCTId INT,' as CreateTable
UNION ALL
SELECT '    CreatedAt DATETIME2 DEFAULT GETDATE(),' as CreateTable
UNION ALL
SELECT '    UpdatedAt DATETIME2,' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (LigneId) REFERENCES Lignes(Id),' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (TypeEquipementId) REFERENCES TypeEquipements(Id),' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (CCTId) REFERENCES CCTs(Id)' as CreateTable
UNION ALL
SELECT ');' as CreateTable;

-- Données de la table
SELECT '-- Données de la table Equipements' as Info;
SELECT 'INSERT INTO Equipements (Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation, DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage, CCTId, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Marque, ''', ''', Modele, ''', ', ISNULL(LigneId, 'NULL'), ', ', ISNULL(TypeEquipementId, 'NULL'), ', ''', ISNULL(Protocole, ''), ''', ''', ISNULL(RefHomologation, ''), ''', ''', ISNULL(DateHomologation, 'NULL'), ''', ''', ISNULL(DateMiseService, 'NULL'), ''', ''', ISNULL(DateEtalonnage, 'NULL'), ''', ''', ISNULL(DateExpirationEtalonnage, 'NULL'), ''', ', ISNULL(CCTId, 'NULL'), ', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM Equipements
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 5. SAUVEGARDE DES TABLES DE RÉFÉRENCE
-- =====================================================

-- CategorieLignes
PRINT '=== SAUVEGARDE TABLE CategorieLignes ===';
SELECT '-- Données de la table CategorieLignes' as Info;
SELECT 'INSERT INTO CategorieLignes (Libelle, Description, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Libelle, ''', ''', ISNULL(Description, ''), ''', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM CategorieLignes
UNION ALL
SELECT ';' as InsertData;

-- StatutLignes
PRINT '=== SAUVEGARDE TABLE StatutLignes ===';
SELECT '-- Données de la table StatutLignes' as Info;
SELECT 'INSERT INTO StatutLignes (Libelle, Description, Couleur, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Libelle, ''', ''', ISNULL(Description, ''), ''', ''', ISNULL(Couleur, ''), ''', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM StatutLignes
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 6. SAUVEGARDE DES AUTRES TABLES
-- =====================================================

-- Formations
PRINT '=== SAUVEGARDE TABLE Formations ===';
SELECT '-- Données de la table Formations' as Info;
SELECT 'INSERT INTO Formations (Titre, Description, Duree, Prix, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Titre, ''', ''', ISNULL(Description, ''), ''', ', ISNULL(Duree, 'NULL'), ', ', ISNULL(Prix, 'NULL'), ', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM Formations
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 7. CRÉATION DES INDEX ET CONTRAINTES
-- =====================================================
PRINT '=== CRÉATION DES INDEX ET CONTRAINTES ===';

SELECT '-- Index pour améliorer les performances' as Info;
SELECT 'CREATE INDEX IX_Equipements_LigneId ON Equipements(LigneId);' as CreateIndex
UNION ALL
SELECT 'CREATE INDEX IX_Equipements_TypeEquipementId ON Equipements(TypeEquipementId);' as CreateIndex
UNION ALL
SELECT 'CREATE INDEX IX_Lignes_CCTId ON Lignes(CCTId);' as CreateIndex
UNION ALL
SELECT 'CREATE INDEX IX_TypeEquipements_Code ON TypeEquipements(Code);' as CreateIndex;

-- =====================================================
-- 8. VÉRIFICATION DE LA SAUVEGARDE
-- =====================================================
PRINT '=== VÉRIFICATION DE LA SAUVEGARDE ===';

SELECT '-- Nombre total d''enregistrements par table' as Info;
SELECT 'CCTs: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM CCTs
UNION ALL
SELECT 'TypeEquipements: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM TypeEquipements
UNION ALL
SELECT 'Lignes: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM Lignes
UNION ALL
SELECT 'Equipements: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM Equipements
UNION ALL
SELECT 'CategorieLignes: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM CategorieLignes
UNION ALL
SELECT 'StatutLignes: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM StatutLignes
UNION ALL
SELECT 'Formations: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM Formations;

PRINT '=== SAUVEGARDE TERMINÉE AVEC SUCCÈS ===';
PRINT 'Fichier de sauvegarde créé dans C:\Backups\';
PRINT 'Script de restauration disponible dans le fichier RESTAURATION_BASE_DONNEES.sql';

-- SAUVEGARDE COMPLÈTE DE LA BASE DE DONNÉES CT_CNEH_DB
-- Date de création : 2025
-- Description : Sauvegarde complète avec toutes les tables et données
-- =====================================================

USE master;
GO

-- Créer la sauvegarde complète
BACKUP DATABASE [CT_CNEH_DB] 
TO DISK = 'C:\Backups\CT_CNEH_DB_Complete_Backup_' + CONVERT(VARCHAR(8), GETDATE(), 112) + '_' + REPLACE(CONVERT(VARCHAR(8), GETDATE(), 108), ':', '') + '.bak'
WITH 
    FORMAT,
    INIT,
    NAME = 'CT_CNEH_DB-Complete Database Backup',
    SKIP,
    STATS = 10;
GO

-- =====================================================
-- SCRIPT ALTERNATIF : SAUVEGARDE AVEC EXPORT DES DONNÉES
-- =====================================================

USE [CT_CNEH_DB];
GO

-- =====================================================
-- 1. SAUVEGARDE DE LA TABLE CCTs
-- =====================================================
PRINT '=== SAUVEGARDE TABLE CCTs ===';

-- Structure de la table
SELECT '-- Structure de la table CCTs' as Info;
SELECT 'CREATE TABLE CCTs (' as CreateTable
UNION ALL
SELECT '    Id INT IDENTITY(1,1) PRIMARY KEY,' as CreateTable
UNION ALL
SELECT '    Nom NVARCHAR(100) NOT NULL,' as CreateTable
UNION ALL
SELECT '    Adresse NVARCHAR(200),' as CreateTable
UNION ALL
SELECT '    Telephone NVARCHAR(20),' as CreateTable
UNION ALL
SELECT '    Email NVARCHAR(100),' as CreateTable
UNION ALL
SELECT '    CreatedAt DATETIME2 DEFAULT GETDATE(),' as CreateTable
UNION ALL
SELECT '    UpdatedAt DATETIME2' as CreateTable
UNION ALL
SELECT ');' as CreateTable;

-- Données de la table
SELECT '-- Données de la table CCTs' as Info;
SELECT 'INSERT INTO CCTs (Nom, Adresse, Telephone, Email, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Nom, ''', ''', ISNULL(Adresse, ''), ''', ''', ISNULL(Telephone, ''), ''', ''', ISNULL(Email, ''), ''', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM CCTs
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 2. SAUVEGARDE DE LA TABLE TypeEquipements
-- =====================================================
PRINT '=== SAUVEGARDE TABLE TypeEquipements ===';

-- Structure de la table
SELECT '-- Structure de la table TypeEquipements' as Info;
SELECT 'CREATE TABLE TypeEquipements (' as CreateTable
UNION ALL
SELECT '    Id INT IDENTITY(1,1) PRIMARY KEY,' as CreateTable
UNION ALL
SELECT '    Code NVARCHAR(10) NOT NULL,' as CreateTable
UNION ALL
SELECT '    Libelle NVARCHAR(100) NOT NULL,' as CreateTable
UNION ALL
SELECT '    Description NVARCHAR(500),' as CreateTable
UNION ALL
SELECT '    Etalonnable BIT DEFAULT 0,' as CreateTable
UNION ALL
SELECT '    CreatedAt DATETIME2 DEFAULT GETDATE(),' as CreateTable
UNION ALL
SELECT '    UpdatedAt DATETIME2' as CreateTable
UNION ALL
SELECT ');' as CreateTable;

-- Données de la table
SELECT '-- Données de la table TypeEquipements' as Info;
SELECT 'INSERT INTO TypeEquipements (Code, Libelle, Description, Etalonnable, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Code, ''', ''', Libelle, ''', ''', ISNULL(Description, ''), ''', ', CAST(Etalonnable as INT), ', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM TypeEquipements
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 3. SAUVEGARDE DE LA TABLE Lignes
-- =====================================================
PRINT '=== SAUVEGARDE TABLE Lignes ===';

-- Structure de la table
SELECT '-- Structure de la table Lignes' as Info;
SELECT 'CREATE TABLE Lignes (' as CreateTable
UNION ALL
SELECT '    Id INT IDENTITY(1,1) PRIMARY KEY,' as CreateTable
UNION ALL
SELECT '    NumeroLigne INT NOT NULL,' as CreateTable
UNION ALL
SELECT '    CCTId INT NOT NULL,' as CreateTable
UNION ALL
SELECT '    CategorieId INT,' as CreateTable
UNION ALL
SELECT '    StatutId INT,' as CreateTable
UNION ALL
SELECT '    DateStatut DATETIME2,' as CreateTable
UNION ALL
SELECT '    CategorieCCTId INT,' as CreateTable
UNION ALL
SELECT '    StatutLigneId INT,' as CreateTable
UNION ALL
SELECT '    CreatedAt DATETIME2 DEFAULT GETDATE(),' as CreateTable
UNION ALL
SELECT '    UpdatedAt DATETIME2,' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (CCTId) REFERENCES CCTs(Id),' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (CategorieId) REFERENCES CategorieLignes(Id),' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (StatutId) REFERENCES StatutLignes(Id)' as CreateTable
UNION ALL
SELECT ');' as CreateTable;

-- Données de la table
SELECT '-- Données de la table Lignes' as Info;
SELECT 'INSERT INTO Lignes (NumeroLigne, CCTId, CategorieId, StatutId, DateStatut, CategorieCCTId, StatutLigneId, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (', NumeroLigne, ', ', CCTId, ', ', ISNULL(CategorieId, 'NULL'), ', ', ISNULL(StatutId, 'NULL'), ', ''', ISNULL(DateStatut, 'NULL'), ''', ', ISNULL(CategorieCCTId, 'NULL'), ', ', ISNULL(StatutLigneId, 'NULL'), ', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM Lignes
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 4. SAUVEGARDE DE LA TABLE Equipements
-- =====================================================
PRINT '=== SAUVEGARDE TABLE Equipements ===';

-- Structure de la table
SELECT '-- Structure de la table Equipements' as Info;
SELECT 'CREATE TABLE Equipements (' as CreateTable
UNION ALL
SELECT '    Id INT IDENTITY(1,1) PRIMARY KEY,' as CreateTable
UNION ALL
SELECT '    Marque NVARCHAR(100) NOT NULL,' as CreateTable
UNION ALL
SELECT '    Modele NVARCHAR(100) NOT NULL,' as CreateTable
UNION ALL
SELECT '    LigneId INT,' as CreateTable
UNION ALL
SELECT '    TypeEquipementId INT,' as CreateTable
UNION ALL
SELECT '    Protocole NVARCHAR(100),' as CreateTable
UNION ALL
SELECT '    RefHomologation NVARCHAR(100),' as CreateTable
UNION ALL
SELECT '    DateHomologation DATETIME2,' as CreateTable
UNION ALL
SELECT '    DateMiseService DATETIME2,' as CreateTable
UNION ALL
SELECT '    DateEtalonnage DATETIME2,' as CreateTable
UNION ALL
SELECT '    DateExpirationEtalonnage DATETIME2,' as CreateTable
UNION ALL
SELECT '    CCTId INT,' as CreateTable
UNION ALL
SELECT '    CreatedAt DATETIME2 DEFAULT GETDATE(),' as CreateTable
UNION ALL
SELECT '    UpdatedAt DATETIME2,' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (LigneId) REFERENCES Lignes(Id),' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (TypeEquipementId) REFERENCES TypeEquipements(Id),' as CreateTable
UNION ALL
SELECT '    FOREIGN KEY (CCTId) REFERENCES CCTs(Id)' as CreateTable
UNION ALL
SELECT ');' as CreateTable;

-- Données de la table
SELECT '-- Données de la table Equipements' as Info;
SELECT 'INSERT INTO Equipements (Marque, Modele, LigneId, TypeEquipementId, Protocole, RefHomologation, DateHomologation, DateMiseService, DateEtalonnage, DateExpirationEtalonnage, CCTId, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Marque, ''', ''', Modele, ''', ', ISNULL(LigneId, 'NULL'), ', ', ISNULL(TypeEquipementId, 'NULL'), ', ''', ISNULL(Protocole, ''), ''', ''', ISNULL(RefHomologation, ''), ''', ''', ISNULL(DateHomologation, 'NULL'), ''', ''', ISNULL(DateMiseService, 'NULL'), ''', ''', ISNULL(DateEtalonnage, 'NULL'), ''', ''', ISNULL(DateExpirationEtalonnage, 'NULL'), ''', ', ISNULL(CCTId, 'NULL'), ', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM Equipements
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 5. SAUVEGARDE DES TABLES DE RÉFÉRENCE
-- =====================================================

-- CategorieLignes
PRINT '=== SAUVEGARDE TABLE CategorieLignes ===';
SELECT '-- Données de la table CategorieLignes' as Info;
SELECT 'INSERT INTO CategorieLignes (Libelle, Description, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Libelle, ''', ''', ISNULL(Description, ''), ''', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM CategorieLignes
UNION ALL
SELECT ';' as InsertData;

-- StatutLignes
PRINT '=== SAUVEGARDE TABLE StatutLignes ===';
SELECT '-- Données de la table StatutLignes' as Info;
SELECT 'INSERT INTO StatutLignes (Libelle, Description, Couleur, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Libelle, ''', ''', ISNULL(Description, ''), ''', ''', ISNULL(Couleur, ''), ''', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM StatutLignes
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 6. SAUVEGARDE DES AUTRES TABLES
-- =====================================================

-- Formations
PRINT '=== SAUVEGARDE TABLE Formations ===';
SELECT '-- Données de la table Formations' as Info;
SELECT 'INSERT INTO Formations (Titre, Description, Duree, Prix, CreatedAt, UpdatedAt) VALUES' as InsertData
UNION ALL
SELECT CONCAT('    (''', Titre, ''', ''', ISNULL(Description, ''), ''', ', ISNULL(Duree, 'NULL'), ', ', ISNULL(Prix, 'NULL'), ', ''', CreatedAt, ''', ''', ISNULL(UpdatedAt, 'NULL'), '''),') as InsertData
FROM Formations
UNION ALL
SELECT ';' as InsertData;

-- =====================================================
-- 7. CRÉATION DES INDEX ET CONTRAINTES
-- =====================================================
PRINT '=== CRÉATION DES INDEX ET CONTRAINTES ===';

SELECT '-- Index pour améliorer les performances' as Info;
SELECT 'CREATE INDEX IX_Equipements_LigneId ON Equipements(LigneId);' as CreateIndex
UNION ALL
SELECT 'CREATE INDEX IX_Equipements_TypeEquipementId ON Equipements(TypeEquipementId);' as CreateIndex
UNION ALL
SELECT 'CREATE INDEX IX_Lignes_CCTId ON Lignes(CCTId);' as CreateIndex
UNION ALL
SELECT 'CREATE INDEX IX_TypeEquipements_Code ON TypeEquipements(Code);' as CreateIndex;

-- =====================================================
-- 8. VÉRIFICATION DE LA SAUVEGARDE
-- =====================================================
PRINT '=== VÉRIFICATION DE LA SAUVEGARDE ===';

SELECT '-- Nombre total d''enregistrements par table' as Info;
SELECT 'CCTs: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM CCTs
UNION ALL
SELECT 'TypeEquipements: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM TypeEquipements
UNION ALL
SELECT 'Lignes: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM Lignes
UNION ALL
SELECT 'Equipements: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM Equipements
UNION ALL
SELECT 'CategorieLignes: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM CategorieLignes
UNION ALL
SELECT 'StatutLignes: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM StatutLignes
UNION ALL
SELECT 'Formations: ' + CAST(COUNT(*) AS VARCHAR(10)) as CountInfo FROM Formations;

PRINT '=== SAUVEGARDE TERMINÉE AVEC SUCCÈS ===';
PRINT 'Fichier de sauvegarde créé dans C:\Backups\';
PRINT 'Script de restauration disponible dans le fichier RESTAURATION_BASE_DONNEES.sql';
