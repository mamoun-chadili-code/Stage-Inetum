# Test simple de l'API
Write-Host "=== TEST SIMPLE API ===" -ForegroundColor Green

Start-Sleep -Seconds 10

try {
    Write-Host "Test de santé..." -ForegroundColor Cyan
    $health = Invoke-RestMethod -Uri "https://localhost:7001/api/Health" -Method Get
    Write-Host "API OK: $($health.status)" -ForegroundColor Green
    
    Write-Host "Test des équipements..." -ForegroundColor Cyan
    $equipements = Invoke-RestMethod -Uri "https://localhost:7001/api/Equipements" -Method Get
    Write-Host "Équipements: $($equipements.Count)" -ForegroundColor Green
    
    if ($equipements.Count -gt 0) {
        $premier = $equipements[0]
        Write-Host "Premier équipement:" -ForegroundColor Yellow
        Write-Host "  ID: $($premier.id)"
        Write-Host "  Marque: $($premier.marque)"
        Write-Host "  Type: $($premier.typeEquipementLibelle)"
        Write-Host "  Ligne: $($premier.ligneNom)"
    }
} catch {
    Write-Host "ERREUR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Test terminé." -ForegroundColor Green
