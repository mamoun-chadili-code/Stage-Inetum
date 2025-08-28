# Script de test pour l'API Dashboard
# Assurez-vous que l'API backend est en cours d'exécution

Write-Host "=== TEST DE L'API DASHBOARD ===" -ForegroundColor Green
Write-Host ""

$baseUrl = "http://localhost:7000/api/dashboard"

# Fonction pour tester un endpoint
function Test-Endpoint {
    param(
        [string]$endpoint,
        [string]$description
    )
    
    Write-Host "Testing: $description" -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl$endpoint" -Method Get -ContentType "application/json"
        Write-Host "✅ SUCCESS: $description" -ForegroundColor Green
        Write-Host "   Response: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Gray
        Write-Host ""
        return $true
    }
    catch {
        Write-Host "❌ ERROR: $description" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        return $false
    }
}

# Tests des endpoints
$tests = @(
    @{ endpoint = "/stats"; description = "Statistiques générales" },
    @{ endpoint = "/ccts/count"; description = "Nombre total de CCTs" },
    @{ endpoint = "/agents/count"; description = "Nombre total d'agents" },
    @{ endpoint = "/chefs-centre/count"; description = "Nombre total de chefs de centre" },
    @{ endpoint = "/lignes/count"; description = "Nombre total de lignes" },
    @{ endpoint = "/formations/count"; description = "Nombre total de formations" },
    @{ endpoint = "/equipements/count"; description = "Nombre total d'équipements" },
    @{ endpoint = "/decisions/count"; description = "Nombre total de décisions" },
    @{ endpoint = "/reseaux/count"; description = "Nombre total de réseaux" },
    @{ endpoint = "/detailed"; description = "Statistiques détaillées" },
    @{ endpoint = "/real-time"; description = "Statistiques en temps réel" }
)

$successCount = 0
$totalTests = $tests.Count

foreach ($test in $tests) {
    if (Test-Endpoint -endpoint $test.endpoint -description $test.description) {
        $successCount++
    }
}

Write-Host "=== RÉSUMÉ DES TESTS ===" -ForegroundColor Cyan
Write-Host "Tests réussis: $successCount/$totalTests" -ForegroundColor $(if ($successCount -eq $totalTests) { "Green" } else { "Yellow" })

if ($successCount -eq $totalTests) {
    Write-Host "🎉 Tous les tests sont passés avec succès !" -ForegroundColor Green
} else {
    Write-Host "⚠️  Certains tests ont échoué. Vérifiez la configuration de l'API." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== INSTRUCTIONS ===" -ForegroundColor Cyan
Write-Host "1. Assurez-vous que l'API backend .NET Core est en cours d'exécution"
Write-Host "2. Vérifiez que la base de données est accessible"
Write-Host "3. Vérifiez que le contrôleur DashboardController est bien configuré"
Write-Host "4. Vérifiez que les routes sont bien enregistrées dans Program.cs"
