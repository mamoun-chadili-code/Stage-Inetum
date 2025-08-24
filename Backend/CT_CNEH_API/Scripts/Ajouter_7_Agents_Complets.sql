-- Script pour ajouter 7 agents complets avec toutes les informations
-- Utilise les données des tables de référence existantes
-- Exécuté le : $(Get-Date)

USE [CT_CNEH_DB]
GO

PRINT ' === AJOUT DE 7 AGENTS COMPLETS ==='
PRINT ''

-- Vérification des données de référence
PRINT '🔍 VÉRIFICATION DES DONNÉES DE RÉFÉRENCE:'

-- Vérifier StatutAdministratifs
DECLARE @countStatuts INT = (SELECT COUNT(*) FROM StatutAdministratifs)
PRINT '   ✅ StatutAdministratifs: ' + CAST(@countStatuts AS VARCHAR) + ' enregistrement(s)'

-- Vérifier CCTs
DECLARE @countCCTs INT = (SELECT COUNT(*) FROM CCTs)
PRINT '   ✅ CCTs: ' + CAST(@countCCTs AS VARCHAR) + ' enregistrement(s)'

-- Vérifier CategorieCCTs
DECLARE @countCategories INT = (SELECT COUNT(*) FROM CategorieCCTs)
PRINT '   ✅ CategorieCCTs: ' + CAST(@countCategories AS VARCHAR) + ' enregistrement(s)'

-- Vérifier Villes
DECLARE @countVilles INT = (SELECT COUNT(*) FROM Villes)
PRINT '   ✅ Villes: ' + CAST(@countVilles AS VARCHAR) + ' enregistrement(s)'

-- Vérifier Reseaux
DECLARE @countReseaux INT = (SELECT COUNT(*) FROM Reseaux)
PRINT '   ✅ Reseaux: ' + CAST(@countReseaux AS VARCHAR) + ' enregistrement(s)'

PRINT ''

-- Récupération des IDs de référence
DECLARE @statutActif INT = (SELECT Id FROM StatutAdministratifs WHERE Code = 'CAP_VAL')
DECLARE @statutEnCours INT = (SELECT Id FROM StatutAdministratifs WHERE Code = 'CAP_COURS')
DECLARE @statutEnAttente INT = (SELECT Id FROM StatutAdministratifs WHERE Code = 'CAP_ATT')
DECLARE @statutNonValide INT = (SELECT Id FROM StatutAdministratifs WHERE Code = 'CAP_NON')
DECLARE @statutExpire INT = (SELECT Id FROM StatutAdministratifs WHERE Code = 'CAP_EXP')

DECLARE @cctTanger INT = (SELECT Id FROM CCTs WHERE Nom LIKE '%Tanger%')
DECLARE @cctCasablanca INT = (SELECT Id FROM CCTs WHERE Nom LIKE '%Casablanca%')
DECLARE @cctRabat INT = (SELECT Id FROM CCTs WHERE Nom LIKE '%Rabat%')
DECLARE @cctFes INT = (SELECT Id FROM CCTs WHERE Nom LIKE '%Fès%')
DECLARE @cctMarrakech INT = (SELECT Id FROM CCTs WHERE Nom LIKE '%Marrakech%')

DECLARE @categorieVTC INT = (SELECT Id FROM CategorieCCTs WHERE Code = 'VTC')
DECLARE @categorieVL INT = (SELECT Id FROM CategorieCCTs WHERE Code = 'VL')
DECLARE @categoriePL INT = (SELECT Id FROM CategorieCCTs WHERE Code = 'PL')
DECLARE @categorieMC INT = (SELECT Id FROM CategorieCCTs WHERE Code = 'MC')

DECLARE @villeTanger INT = (SELECT Id FROM Villes WHERE nom = 'Tanger')
DECLARE @villeCasablanca INT = (SELECT Id FROM Villes WHERE nom = 'Casablanca')
DECLARE @villeRabat INT = (SELECT Id FROM Villes WHERE nom = 'Rabat')
DECLARE @villeFes INT = (SELECT Id FROM Villes WHERE nom = 'Fès')
DECLARE @villeMarrakech INT = (SELECT Id FROM Villes WHERE nom = 'Marrakech')

DECLARE @reseauInetum INT = (SELECT Id FROM Reseaux WHERE Nom = 'inetum')
DECLARE @reseauMarocTelecom INT = (SELECT Id FROM Reseaux WHERE Nom = 'Maroc Telecom')
DECLARE @reseauOrange INT = (SELECT Id FROM Reseaux WHERE Nom = 'Orange Maroc')
DECLARE @reseauInwi INT = (SELECT Id FROM Reseaux WHERE Nom = 'Inwi')

PRINT '📋 IDs de référence récupérés:'
PRINT '   - Statuts: ' + CAST(@statutActif AS VARCHAR) + ', ' + CAST(@statutEnCours AS VARCHAR) + ', ' + CAST(@statutEnAttente AS VARCHAR) + ', ' + CAST(@statutNonValide AS VARCHAR) + ', ' + CAST(@statutExpire AS VARCHAR)
PRINT '   - CCTs: ' + CAST(@cctTanger AS VARCHAR) + ', ' + CAST(@cctCasablanca AS VARCHAR) + ', ' + CAST(@cctRabat AS VARCHAR) + ', ' + CAST(@cctFes AS VARCHAR) + ', ' + CAST(@cctMarrakech AS VARCHAR)
PRINT '   - Catégories: ' + CAST(@categorieVTC AS VARCHAR) + ', ' + CAST(@categorieVL AS VARCHAR) + ', ' + CAST(@categoriePL AS VARCHAR) + ', ' + CAST(@categorieMC AS VARCHAR)
PRINT ''

-- Ajout des 7 agents
PRINT '👥 AJOUT DES 7 AGENTS:'

-- Agent 1: Ahmed Benali - Tanger
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, DateCAP, DateExpirationCAP, 
    CategorieCAPId, StatutAdministratifId, AnneeAutorisation, DateAffectationCCT, 
    NumDecisionRenouv, DateDecisionRenouv, Adresse
) VALUES (
    'Benali', 'Ahmed', 'AB123456', '0612345678', 'ahmed.benali@email.com', 'CNSS001234',
    @cctTanger, 'CAP2024001', '2024-01-15', '2029-01-15', @categorieVTC, @statutActif,
    2024, '2024-02-01', 'REN2024001', '2024-01-20', '123 Rue Mohammed V, Tanger'
);

PRINT '   ✅ Agent 1 ajouté: Ahmed Benali (Tanger)'

-- Agent 2: Fatima Zahra - Casablanca
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, DateCAP, DateExpirationCAP, 
    CategorieCAPId, StatutAdministratifId, AnneeAutorisation, DateAffectationCCT, 
    NumDecisionRenouv, DateDecisionRenouv, Adresse
) VALUES (
    'Zahra', 'Fatima', 'FZ789012', '0623456789', 'fatima.zahra@email.com', 'CNSS007890',
    @cctCasablanca, 'CAP2024002', '2024-02-20', '2029-02-20', @categorieVL, @statutActif,
    2024, '2024-03-01', 'REN2024002', '2024-02-25', '456 Avenue Hassan II, Casablanca'
);

PRINT '   ✅ Agent 2 ajouté: Fatima Zahra (Casablanca)'

-- Agent 3: Karim El Amrani - Rabat
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, DateCAP, DateExpirationCAP, 
    CategorieCAPId, StatutAdministratifId, AnneeAutorisation, DateAffectationCCT, 
    NumDecisionRenouv, DateDecisionRenouv, Adresse
) VALUES (
    'El Amrani', 'Karim', 'KE345678', '0634567890', 'karim.elamrani@email.com', 'CNSS003456',
    @cctRabat, 'CAP2024003', '2024-03-10', '2029-03-10', @categoriePL, @statutEnCours,
    2024, '2024-04-01', 'REN2024003', '2024-03-15', '789 Rue Agdal, Rabat'
);

PRINT '   ✅ Agent 3 ajouté: Karim El Amrani (Rabat) - En formation'

-- Agent 4: Aicha Mansouri - Fès
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, DateCAP, DateExpirationCAP, 
    CategorieCAPId, StatutAdministratifId, AnneeAutorisation, DateAffectationCCT, 
    NumDecisionRenouv, DateDecisionRenouv, Adresse
) VALUES (
    'Mansouri', 'Aicha', 'AM901234', '0645678901', 'aicha.mansouri@email.com', 'CNSS009012',
    @cctFes, 'CAP2024004', '2024-04-05', '2029-04-05', @categorieMC, @statutEnAttente,
    2024, '2024-05-01', 'REN2024004', '2024-04-10', '321 Rue Fès El Bali, Fès'
);

PRINT '   ✅ Agent 4 ajouté: Aicha Mansouri (Fès) - En attente'

-- Agent 5: Youssef Tazi - Marrakech
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, DateCAP, DateExpirationCAP, 
    CategorieCAPId, StatutAdministratifId, AnneeAutorisation, DateAffectationCCT, 
    NumDecisionRenouv, DateDecisionRenouv, Adresse
) VALUES (
    'Tazi', 'Youssef', 'YT567890', '0656789012', 'youssef.tazi@email.com', 'CNSS005678',
    @cctMarrakech, 'CAP2024005', '2024-05-12', '2029-05-12', @categorieVTC, @statutNonValide,
    2024, '2024-06-01', 'REN2024005', '2024-05-17', '654 Avenue Mohammed V, Marrakech'
);

PRINT '   ✅ Agent 5 ajouté: Youssef Tazi (Marrakech) - Non valide'

-- Agent 6: Leila Benjelloun - Tanger
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, DateCAP, DateExpirationCAP, 
    CategorieCAPId, StatutAdministratifId, AnneeAutorisation, DateAffectationCCT, 
    NumDecisionRenouv, DateDecisionRenouv, Adresse
) VALUES (
    'Benjelloun', 'Leila', 'LB234567', '0667890123', 'leila.benjelloun@email.com', 'CNSS002345',
    @cctTanger, 'CAP2024006', '2024-06-18', '2029-06-18', @categorieVL, @statutExpire,
    2024, '2024-07-01', 'REN2024006', '2024-06-23', '987 Rue Ibn Batouta, Tanger'
);

PRINT '   ✅ Agent 6 ajouté: Leila Benjelloun (Tanger) - Expiré'

-- Agent 7: Hassan Alami - Casablanca
INSERT INTO Agents (
    Nom, Prenom, CIN, Tel, Mail, CNSS, CCTId, NumeroCAP, DateCAP, DateExpirationCAP, 
    CategorieCAPId, StatutAdministratifId, AnneeAutorisation, DateAffectationCCT, 
    NumDecisionRenouv, DateDecisionRenouv, Adresse
) VALUES (
    'Alami', 'Hassan', 'HA678901', '0678901234', 'hassan.alami@email.com', 'CNSS006789',
    @cctCasablanca, 'CAP2024007', '2024-07-25', '2029-07-25', @categoriePL, @statutActif,
    2024, '2024-08-01', 'REN2024007', '2024-07-30', '147 Boulevard Zerktouni, Casablanca'
);

PRINT '   ✅ Agent 7 ajouté: Hassan Alami (Casablanca)'

PRINT ''
PRINT ' === VÉRIFICATION FINALE ==='

-- Vérification du nombre total d'agents
DECLARE @totalAgents INT = (SELECT COUNT(*) FROM Agents)
PRINT '📊 Total des agents dans la base: ' + CAST(@totalAgents AS VARCHAR)

-- Affichage des agents ajoutés
PRINT ''
PRINT '📋 Agents ajoutés:'
SELECT 
    'Agent ' + CAST(ROW_NUMBER() OVER (ORDER BY Id) AS VARCHAR) + ': ' + Prenom + ' ' + Nom as Agent,
    CIN,
    Tel,
    Mail,
    CASE 
        WHEN CCTId IS NOT NULL THEN (SELECT Nom FROM CCTs WHERE Id = CCTId)
        ELSE 'Non affecté'
    END as CCT,
    CASE 
        WHEN StatutAdministratifId IS NOT NULL THEN (SELECT Libelle FROM StatutAdministratifs WHERE Id = StatutAdministratifId)
        ELSE 'Non défini'
    END as Statut,
    AnneeAutorisation,
    DateAffectationCCT
FROM Agents 
WHERE Id > (SELECT ISNULL(MAX(Id), 0) - 7 FROM Agents)
ORDER BY Id;

PRINT ''
PRINT '✅ SCRIPT TERMINÉ AVEC SUCCÈS !'
PRINT '7 agents ont été ajoutés avec toutes les informations complètes.'
PRINT ''
PRINT '📝 NOTES:'
PRINT '- Tous les agents ont des CIN uniques'
PRINT '- Les dates sont cohérentes (CAP valide 5 ans)'
PRINT '- Les affectations CCT sont réparties sur différents centres'
PRINT '- Les statuts sont variés pour tester les couleurs'
PRINT '- Toutes les informations obligatoires sont remplies'
GO
