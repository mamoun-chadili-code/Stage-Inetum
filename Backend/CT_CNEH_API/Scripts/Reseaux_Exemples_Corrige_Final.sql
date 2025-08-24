-- Script final corrigé pour ajouter 7 réseaux d'exemple
-- Utilise les vrais noms des tables de référence

USE [CT_CNEH_DB]
GO

PRINT '🚀 === AJOUT DE 7 RÉSEAUX D''EXEMPLE (VERSION CORRIGÉE) ==='
PRINT ''

-- Vérification des tables de référence
PRINT '🔍 VÉRIFICATION DES TABLES DE RÉFÉRENCE:'

-- 1. Vérifier Statuts
DECLARE @StatutActifId INT, @StatutAttenteId INT, @StatutSuspenduId INT, @StatutFermeId INT

SELECT @StatutActifId = Id FROM Statuts WHERE nom = 'En activité'
SELECT @StatutAttenteId = Id FROM Statuts WHERE nom = 'En attente d''agrément'
SELECT @StatutSuspenduId = Id FROM Statuts WHERE nom = 'Suspendu'
SELECT @StatutFermeId = Id FROM Statuts WHERE nom = 'Fermé'

IF @StatutActifId IS NULL OR @StatutAttenteId IS NULL OR @StatutSuspenduId IS NULL OR @StatutFermeId IS NULL
BEGIN
    PRINT '❌ ERREUR: Impossible de trouver tous les statuts requis'
    PRINT 'Statuts trouvés:'
    PRINT '  - En activité: ' + ISNULL(CAST(@StatutActifId AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - En attente d''agrément: ' + ISNULL(CAST(@StatutAttenteId AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - Suspendu: ' + ISNULL(CAST(@StatutSuspenduId AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - Fermé: ' + ISNULL(CAST(@StatutFermeId AS VARCHAR), 'NON TROUVÉ')
    RETURN
END

PRINT '✅ Statuts: 4 enregistrements trouvés'

-- 2. Vérifier Villes
DECLARE @VilleTangerId INT, @VilleCasablancaId INT, @VilleRabatId INT, @VilleFesId INT, @VilleMarrakechId INT, @VilleAgadirId INT, @VilleOujdaId INT

SELECT @VilleTangerId = Id FROM Villes WHERE nom = 'Tanger'
SELECT @VilleCasablancaId = Id FROM Villes WHERE nom = 'Casablanca'
SELECT @VilleRabatId = Id FROM Villes WHERE nom = 'Rabat'
SELECT @VilleFesId = Id FROM Villes WHERE nom = 'Fès'
SELECT @VilleMarrakechId = Id FROM Villes WHERE nom = 'Marrakech'
SELECT @VilleAgadirId = Id FROM Villes WHERE nom = 'Agadir'
SELECT @VilleOujdaId = Id FROM Villes WHERE nom = 'Oujda'

IF @VilleTangerId IS NULL OR @VilleCasablancaId IS NULL OR @VilleRabatId IS NULL OR @VilleFesId IS NULL OR @VilleMarrakechId IS NULL OR @VilleAgadirId IS NULL OR @VilleOujdaId IS NULL
BEGIN
    PRINT '❌ ERREUR: Impossible de trouver toutes les villes requises'
    PRINT 'Villes trouvées:'
    PRINT '  - Tanger: ' + ISNULL(CAST(@VilleTangerId AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - Casablanca: ' + ISNULL(CAST(@VilleCasablancaId AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - Rabat: ' + ISNULL(CAST(@VilleRabatId AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - Fès: ' + ISNULL(CAST(@VilleFesId AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - Marrakech: ' + ISNULL(CAST(@VilleMarrakechId AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - Agadir: ' + ISNULL(CAST(@VilleAgadirId AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - Oujda: ' + ISNULL(CAST(@VilleOujdaId AS VARCHAR), 'NON TROUVÉ')
    RETURN
END

PRINT '✅ Villes: 7 villes principales trouvées'

-- 3. Vérifier CadreAutorisations
DECLARE @CadreAO2012Id INT, @CadreAO2019Id INT, @CadreAV2012Id INT, @CadreNR2020Id INT, @CadreCE2021Id INT, @CadreCE2022Id INT, @CadreRA2023Id INT

SELECT @CadreAO2012Id = Id FROM CadreAutorisations WHERE libelle = 'Appel d''offre 2012'
SELECT @CadreAO2019Id = Id FROM CadreAutorisations WHERE libelle = 'Appel d''offre 2019'
SELECT @CadreAV2012Id = Id FROM CadreAutorisations WHERE libelle = 'Avant 2012 (régime transitoire)'
SELECT @CadreNR2020Id = Id FROM CadreAutorisations WHERE libelle = 'Nouvelle réglementation 2020'
SELECT @CadreCE2021Id = Id FROM CadreAutorisations WHERE libelle = 'Campagne exceptionnelle 2021'
SELECT @CadreCE2022Id = Id FROM CadreAutorisations WHERE libelle = 'Cadre expérimental 2022'
SELECT @CadreRA2023Id = Id FROM CadreAutorisations WHERE libelle = 'Renouvellement agrément 2023'

IF @CadreAO2012Id IS NULL OR @CadreAO2019Id IS NULL OR @CadreAV2012Id IS NULL OR @CadreNR2020Id IS NULL OR @CadreCE2021Id IS NULL OR @CadreCE2022Id IS NULL OR @CadreRA2023Id IS NULL
BEGIN
    PRINT '❌ ERREUR: Impossible de trouver tous les cadres d''autorisation requis'
    PRINT 'Cadres trouvés:'
    PRINT '  - AO2012: ' + ISNULL(CAST(@CadreAO2012Id AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - AO2019: ' + ISNULL(CAST(@CadreAO2019Id AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - AV2012: ' + ISNULL(CAST(@CadreAV2012Id AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - NR2020: ' + ISNULL(CAST(@CadreNR2020Id AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - CE2021: ' + ISNULL(CAST(@CadreCE2021Id AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - CE2022: ' + ISNULL(CAST(@CadreCE2022Id AS VARCHAR), 'NON TROUVÉ')
    PRINT '  - RA2023: ' + ISNULL(CAST(@CadreRA2023Id AS VARCHAR), 'NON TROUVÉ')
    RETURN
END

PRINT '✅ CadreAutorisations: 7 cadres trouvés'
PRINT ''

-- AJOUT DES 7 RÉSEAUX
PRINT '🚀 AJOUT DES 7 RÉSEAUX D''EXEMPLE...'
PRINT ''

-- Réseau 1: Maroc Telecom (Tanger)
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, VilleId, CadreAutorisationId, DateCreation, DateModification, EstActif)
VALUES ('Maroc Telecom', 'MT001', '2020-01-15', @StatutActifId, '2020-01-15', @VilleTangerId, @CadreAO2019Id, GETDATE(), GETDATE(), 1);

PRINT '✅ Réseau 1 ajouté: Maroc Telecom (Tanger)'

-- Réseau 2: Orange Maroc (Casablanca)
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, VilleId, CadreAutorisationId, DateCreation, DateModification, EstActif)
VALUES ('Orange Maroc', 'OR002', '2019-06-20', @StatutActifId, '2019-06-20', @VilleCasablancaId, @CadreAO2019Id, GETDATE(), GETDATE(), 1);

PRINT '✅ Réseau 2 ajouté: Orange Maroc (Casablanca)'

-- Réseau 3: Inwi (Rabat)
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, VilleId, CadreAutorisationId, DateCreation, DateModification, EstActif)
VALUES ('Inwi', 'IN003', '2018-03-10', @StatutActifId, '2018-03-10', @VilleRabatId, @CadreAO2012Id, GETDATE(), GETDATE(), 1);

PRINT '✅ Réseau 3 ajouté: Inwi (Rabat)'

-- Réseau 4: Méditel (Fès)
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, VilleId, CadreAutorisationId, DateCreation, DateModification, EstActif)
VALUES ('Méditel', 'ME004', '2017-11-05', @StatutSuspenduId, '2023-02-15', @VilleFesId, @CadreAV2012Id, GETDATE(), GETDATE(), 1);

PRINT '✅ Réseau 4 ajouté: Méditel (Fès) - Suspendu'

-- Réseau 5: Wana (Marrakech)
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, VilleId, CadreAutorisationId, DateCreation, DateModification, EstActif)
VALUES ('Wana', 'WA005', '2021-09-12', @StatutAttenteId, '2021-09-12', @VilleMarrakechId, @CadreNR2020Id, GETDATE(), GETDATE(), 1);

PRINT '✅ Réseau 5 ajouté: Wana (Marrakech) - En attente'

-- Réseau 6: Atlantic Telecom (Agadir)
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, VilleId, CadreAutorisationId, DateCreation, DateModification, EstActif)
VALUES ('Atlantic Telecom', 'AT006', '2022-04-18', @StatutActifId, '2022-04-18', @VilleAgadirId, @CadreCE2021Id, GETDATE(), GETDATE(), 1);

PRINT '✅ Réseau 6 ajouté: Atlantic Telecom (Agadir)'

-- Réseau 7: Oriental Net (Oujda)
INSERT INTO Reseaux (Nom, Agrement, DateAgrement, StatutId, DateStatut, VilleId, CadreAutorisationId, DateCreation, DateModification, EstActif)
VALUES ('Oriental Net', 'ON007', '2023-01-30', @StatutActifId, '2023-01-30', @VilleOujdaId, @CadreRA2023Id, GETDATE(), GETDATE(), 1);

PRINT '✅ Réseau 7 ajouté: Oriental Net (Oujda)'

PRINT ''
PRINT '🎉 === SUCCÈS ==='
PRINT '7 réseaux d''exemple ont été ajoutés avec succès !'
PRINT ''

-- Vérification finale
PRINT '🔍 VÉRIFICATION FINALE:'
SELECT 
    'Reseaux' as TableName,
    COUNT(*) as TotalRecords
FROM Reseaux;

PRINT '📋 RÉSEAUX AJOUTÉS:'
SELECT TOP 10
    Id,
    Nom,
    Agrement,
    StatutId,
    VilleId,
    CadreAutorisationId,
    DateCreation
FROM Reseaux 
ORDER BY Id DESC;

PRINT ''
PRINT '✅ SCRIPT TERMINÉ AVEC SUCCÈS !'
GO
