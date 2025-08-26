-- Script pour tester l'API de l'historique CCT
-- Vérifier que les endpoints fonctionnent correctement

USE [CT_CNEH_DB]
GO

PRINT '=== TEST DE L''API HISTORIQUE CCT ==='
PRINT ''

-- 1. Vérifier que le service est enregistré dans Program.cs
PRINT '1. VÉRIFICATION DU SERVICE:'
PRINT 'Le service IHistoriqueCCTService doit être enregistré dans Program.cs:'
PRINT 'builder.Services.AddScoped<IHistoriqueCCTService, HistoriqueCCTService>();'
PRINT ''

-- 2. Vérifier que le contrôleur existe
PRINT '2. VÉRIFICATION DU CONTRÔLEUR:'
PRINT 'Le contrôleur HistoriqueCCTsController doit exister et être accessible via:'
PRINT 'GET /api/HistoriqueCCTs'
PRINT 'GET /api/HistoriqueCCTs/{id}'
PRINT 'GET /api/HistoriqueCCTs/cct/{cctId}'
PRINT 'POST /api/HistoriqueCCTs'
PRINT 'PUT /api/HistoriqueCCTs/{id}'
PRINT 'DELETE /api/HistoriqueCCTs/{id}'
PRINT ''

-- 3. Vérifier la configuration CORS
PRINT '3. VÉRIFICATION CORS:'
PRINT 'La configuration CORS doit permettre l''accès depuis le frontend'
PRINT ''

-- 4. Test de création d'un historique via SQL (simulation de l''API)
PRINT '4. TEST DE CRÉATION D''HISTORIQUE:'
DECLARE @TestCCTId INT, @TestReseauId INT

-- Récupérer un CCT et un réseau de test
SELECT TOP 1 @TestCCTId = Id FROM CCTs ORDER BY Id
SELECT TOP 1 @TestReseauId = Id FROM Reseaux ORDER BY Id

IF @TestCCTId IS NOT NULL AND @TestReseauId IS NOT NULL
BEGIN
    PRINT 'CCT de test: ' + CAST(@TestCCTId AS VARCHAR)
    PRINT 'Réseau de test: ' + CAST(@TestReseauId AS VARCHAR)
    
    -- Insérer un historique de test
    BEGIN TRY
        INSERT INTO HistoriqueCCTs (CCTId, ReseauId, DateDebut, DateFin)
        VALUES (@TestCCTId, @TestReseauId, GETDATE(), NULL)
        
        PRINT '✓ Historique de test créé avec succès'
        
        -- Afficher l'historique créé
        SELECT 
            h.Id,
            c.Nom AS CCTNom,
            r.Nom AS ReseauNom,
            h.DateDebut AS DateRalliement,
            h.DateFin AS DateFinRalliement
        FROM HistoriqueCCTs h
        INNER JOIN CCTs c ON h.CCTId = c.Id
        INNER JOIN Reseaux r ON h.ReseauId = r.Id
        WHERE h.CCTId = @TestCCTId AND h.ReseauId = @TestReseauId
        
    END TRY
    BEGIN CATCH
        PRINT '❌ Erreur lors de la création: ' + ERROR_MESSAGE()
    END CATCH
END
ELSE
BEGIN
    PRINT '❌ Impossible de trouver un CCT ou un réseau pour le test'
END

PRINT ''
PRINT '=== TEST TERMINÉ ==='

-- 5. Instructions pour tester l'API
PRINT ''
PRINT '=== INSTRUCTIONS POUR TESTER L''API ==='
PRINT '1. Démarrer le backend: dotnet run'
PRINT '2. Ouvrir Swagger: https://localhost:7000/swagger'
PRINT '3. Tester l''endpoint GET /api/HistoriqueCCTs'
PRINT '4. Vérifier la réponse dans la console du navigateur'
PRINT '5. Si l''API fonctionne mais affiche "Aucun historique trouvé",'
PRINT '   exécuter le script Exemples_Historique_CCT.sql'

GO
