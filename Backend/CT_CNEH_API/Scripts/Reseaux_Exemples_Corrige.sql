-- Script d'ajout de 7 réseaux d'exemple (CORRIGÉ)
-- Utilise les IDs corrects des tables de référence

USE [CT_CNEH_DB]
GO

PRINT '🚀 === AJOUT DE 7 RÉSEAUX D''EXEMPLE ==='
PRINT ''

-- Vérifier que les tables de référence contiennent des données
DECLARE @StatutsCount INT, @VillesCount INT, @CadreAutorisationsCount INT

SELECT @StatutsCount = COUNT(*) FROM Statuts
SELECT @VillesCount = COUNT(*) FROM Villes  
SELECT @CadreAutorisationsCount = COUNT(*) FROM CadreAutorisations

PRINT '📊 VÉRIFICATION DES TABLES DE RÉFÉRENCE:'
PRINT '   - Statuts: ' + CAST(@StatutsCount AS VARCHAR) + ' enregistrements'
PRINT '   - Villes: ' + CAST(@VillesCount AS VARCHAR) + ' enregistrements'
PRINT '   - CadreAutorisations: ' + CAST(@CadreAutorisationsCount AS VARCHAR) + ' enregistrements'
PRINT ''

IF @StatutsCount = 0 OR @VillesCount = 0 OR @CadreAutorisationsCount = 0
BEGIN
    PRINT '❌ ERREUR: Une ou plusieurs tables de référence sont vides !'
    PRINT '   Exécutez d''abord le script "Remplir_Tables_Reference.sql"'
    RETURN
END

-- Récupérer les IDs des valeurs de référence
DECLARE @StatutActif INT, @StatutSuspendu INT, @StatutEnAttente INT
DECLARE @VilleRabat INT, @VilleCasablanca INT, @VilleFes INT, @VilleMarrakech INT, @VilleTanger INT, @VilleAgadir INT, @VilleTetouan INT
DECLARE @CadreStandard INT, @CadreSpecial INT, @CadreTemporaire INT

-- Récupérer les IDs des statuts
SELECT @StatutActif = Id FROM Statuts WHERE nom = 'En activité'
SELECT @StatutSuspendu = Id FROM Statuts WHERE nom = 'Suspendu'
SELECT @StatutEnAttente = Id FROM Statuts WHERE nom = 'En attente d''agrément'

-- Récupérer les IDs des villes
SELECT @VilleRabat = Id FROM Villes WHERE nom = 'Rabat'
SELECT @VilleCasablanca = Id FROM Villes WHERE nom = 'Casablanca'
SELECT @VilleFes = Id FROM Villes WHERE nom = 'Fès'
SELECT @VilleMarrakech = Id FROM Villes WHERE nom = 'Marrakech'
SELECT @VilleTanger = Id FROM Villes WHERE nom = 'Tanger'
SELECT @VilleAgadir = Id FROM Villes WHERE nom = 'Agadir'
SELECT @VilleTetouan = Id FROM Villes WHERE nom = 'Tétouan'

-- Récupérer les IDs des cadres
SELECT @CadreStandard = Id FROM CadreAutorisations WHERE libelle = 'Autorisation Standard'
SELECT @CadreSpecial = Id FROM CadreAutorisations WHERE libelle = 'Autorisation Spéciale'
SELECT @CadreTemporaire = Id FROM CadreAutorisations WHERE libelle = 'Autorisation Temporaire'

-- Vérifier que tous les IDs sont trouvés
IF @StatutActif IS NULL OR @StatutSuspendu IS NULL OR @StatutEnAttente IS NULL
BEGIN
    PRINT '❌ ERREUR: Impossible de trouver les IDs des statuts'
    RETURN
END

IF @VilleRabat IS NULL OR @VilleCasablanca IS NULL OR @VilleFes IS NULL OR @VilleMarrakech IS NULL OR @VilleTanger IS NULL OR @VilleAgadir IS NULL OR @VilleTetouan IS NULL
BEGIN
    PRINT '❌ ERREUR: Impossible de trouver les IDs des villes'
    RETURN
END

IF @CadreStandard IS NULL OR @CadreSpecial IS NULL OR @CadreTemporaire IS NULL
BEGIN
    PRINT '❌ ERREUR: Impossible de trouver les IDs des cadres d''autorisation'
    RETURN
END

PRINT '✅ Tous les IDs de référence trouvés'
PRINT ''

-- Ajout de 7 réseaux d'exemple avec les bons IDs
INSERT INTO [dbo].[Reseaux] (
    [Nom], [Agrement], [DateAgrement], [StatutId], [DateStatut], 
    [AdresseSiege], [AdresseDomiciliation], [VilleId], [Tel], [Fax], [Mail], 
    [LogoUrl], [Ice], [IdFiscal], [RegisterCommerce], [CadreAutorisationId], 
    [NomRepresentantLegal], [AdressRepresentantLegal], [TelRepresentantLegal], 
    [MailRepresentant], [ThumbprintCertificat]
) VALUES 
-- Réseau 1: Réseau National des Télécommunications
('Réseau National des Télécommunications', 'RNT-2024-001', '2024-01-15', @StatutActif, '2024-01-15',
 '123 Avenue Mohammed V, Quartier Hassan, Rabat', '456 Boulevard Zerktouni, Casablanca', @VilleRabat, 
 '+212-5-37-123456', '+212-5-37-123457', 'contact@rnt.ma', 
 NULL, 'MA123456789', 'F123456789', 'RC123456', @CadreStandard,
 'Ahmed Benali', '789 Rue des Ambassadeurs, Rabat', '+212-6-61-123456',
 'ahmed.benali@rnt.ma', NULL),

-- Réseau 2: Réseau Maroc Telecom
('Réseau Maroc Telecom', 'RMT-2024-002', '2024-02-20', @StatutActif, '2024-02-20',
 'Avenue Annakhil, Hay Riad, Rabat', 'Boulevard Mohammed V, Casablanca', @VilleCasablanca,
 '+212-5-37-234567', '+212-5-37-234568', 'info@maroctelecom.ma',
 NULL, 'MA234567890', 'F234567890', 'RC234567', @CadreSpecial,
 'Fatima Zahra', '321 Avenue Hassan II, Rabat', '+212-6-61-234567',
 'fatima.zahra@maroctelecom.ma', NULL),

-- Réseau 3: Réseau Orange Maroc
('Réseau Orange Maroc', 'ROM-2024-003', '2024-03-10', @StatutSuspendu, '2024-03-10',
 'Boulevard Zerktouni, Casablanca', 'Avenue Mohammed VI, Rabat', @VilleFes,
 '+212-5-22-345678', '+212-5-22-345679', 'contact@orange.ma',
 NULL, 'MA345678901', 'F345678901', 'RC345678', @CadreTemporaire,
 'Karim El Amrani', '654 Rue de la Fédération, Casablanca', '+212-6-61-345678',
 'karim.elamrani@orange.ma', NULL),

-- Réseau 4: Réseau Inwi
('Réseau Inwi', 'RIN-2024-004', '2024-04-05', @StatutActif, '2024-04-05',
 'Avenue des Nations Unies, Rabat', 'Boulevard de la Corniche, Casablanca', @VilleMarrakech,
 '+212-5-37-456789', '+212-5-37-456790', 'info@inwi.ma',
 NULL, 'MA456789012', 'F456789012', 'RC456789', @CadreStandard,
 'Sara Bennani', '987 Avenue Al Massira, Rabat', '+212-6-61-456789',
 'sara.bennani@inwi.ma', NULL),

-- Réseau 5: Réseau Méditel
('Réseau Méditel', 'RME-2024-005', '2024-05-12', @StatutEnAttente, '2024-05-12',
 'Boulevard Mohammed V, Fès', 'Avenue Hassan II, Marrakech', @VilleTanger,
 '+212-5-35-567890', '+212-5-35-567891', 'contact@meditel.ma',
 NULL, 'MA567890123', 'F567890123', 'RC567890', @CadreSpecial,
 'Youssef Tazi', '147 Rue de la Liberté, Fès', '+212-6-61-567890',
 'youssef.tazi@meditel.ma', NULL),

-- Réseau 6: Réseau Tanger Telecom
('Réseau Tanger Telecom', 'RTT-2024-006', '2024-06-18', @StatutActif, '2024-06-18',
 'Avenue d''Espagne, Tanger', 'Boulevard Pasteur, Tétouan', @VilleAgadir,
 '+212-5-39-678901', '+212-5-39-678902', 'info@tangertel.ma',
 NULL, 'MA678901234', 'F678901234', 'RC678901', @CadreTemporaire,
 'Leila Mansouri', '258 Avenue Mohammed V, Tanger', '+212-6-61-678901',
 'leila.mansouri@tangertel.ma', NULL),

-- Réseau 7: Réseau Agadir Net
('Réseau Agadir Net', 'RAN-2024-007', '2024-07-25', @StatutActif, '2024-07-25',
 'Boulevard Hassan II, Agadir', 'Avenue Mohammed V, Taroudant', @VilleTetouan,
 '+212-5-28-789012', '+212-5-28-789013', 'contact@agadirnet.ma',
 NULL, 'MA789012345', 'F789012345', 'RC789012', @CadreStandard,
 'Hassan El Fassi', '369 Rue de la Plage, Agadir', '+212-6-61-789012',
 'hassan.elfassi@agadirnet.ma', NULL);

-- Vérification de l'insertion
PRINT '✅ INSERTION TERMINÉE'
PRINT ''

SELECT 
    '🎉 Réseaux ajoutés avec succès' as Message,
    COUNT(*) as TotalReseaux
FROM [dbo].[Reseaux];

-- Affichage des réseaux ajoutés
PRINT ''
PRINT '📋 RÉSEAUX AJOUTÉS:'
SELECT 
    Id,
    Nom,
    Agrement,
    StatutId,
    VilleId,
    CadreAutorisationId,
    NomRepresentantLegal
FROM [dbo].[Reseaux]
ORDER BY Id DESC;

PRINT ''
PRINT '🎉 7 réseaux d''exemple ajoutés avec succès !'
GO
