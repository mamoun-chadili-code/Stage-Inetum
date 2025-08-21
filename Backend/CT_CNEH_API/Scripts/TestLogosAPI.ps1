# Test simple de l'API des logos
Write-Host "Test de l'API des logos..." -ForegroundColor Green

# Attendre que le backend démarre
Start-Sleep -Seconds 10

# Test 1: API des logos
try {
    $response = Invoke-RestMethod -Uri "http://localhost:7000/api/Logos/reseau/1" -Method GET
    Write-Host "✓ API Logos accessible" -ForegroundColor Green
    Write-Host "  Logos trouvés: $($response.Count)" -ForegroundColor White
} catch {
    Write-Host "❌ API Logos non accessible: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: API des réseaux
try {
    $response = Invoke-RestMethod -Uri "http://localhost:7000/api/Reseaux" -Method GET
    Write-Host "✓ API Reseaux accessible" -ForegroundColor Green
    Write-Host "  Réseaux trouvés: $($response.Count)" -ForegroundColor White
    
    foreach ($reseau in $response) {
        if ($reseau.logoUrl) {
            Write-Host "  📄 $($reseau.nom): $($reseau.logoUrl)" -ForegroundColor White
        }
    }
} catch {
    Write-Host "❌ API Reseaux non accessible: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Test terminé !" -ForegroundColor Green


