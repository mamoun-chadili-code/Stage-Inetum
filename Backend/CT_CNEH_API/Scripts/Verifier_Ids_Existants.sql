-- Script pour vérifier les IDs existants dans les tables de référence
USE [CT_CNEH_DB]
GO

-- Vérifier les IDs des CCTs existants
SELECT 'CCTs' as TableName, Id, Nom as NomCCT FROM CCTs ORDER BY Id;

-- Vérifier les IDs des Réseaux existants
SELECT 'Reseaux' as TableName, Id, Nom as NomReseau FROM Reseaux ORDER BY Id;

-- Vérifier les IDs des Agents existants
SELECT 'Agents' as TableName, Id, Nom, Prenom FROM Agents ORDER BY Id;

-- Vérifier les IDs des Lignes existantes
SELECT 'Lignes' as TableName, Id, NumeroLigne FROM Lignes ORDER BY Id;

-- Vérifier les IDs des Types de Décisions existants
SELECT 'TypeDecisions' as TableName, Id, Libelle FROM TypeDecisions ORDER BY Id;

-- Vérifier les IDs des Types d'Entités existants
SELECT 'TypeEntites' as TableName, Id, Libelle FROM TypeEntites ORDER BY Id;

-- Vérifier les IDs des Chefs de Centre existants
SELECT 'ChefsCentre' as TableName, Id, Nom, Prenom FROM ChefsCentre ORDER BY Id;

PRINT 'Verification des IDs existants terminee!'
GO
