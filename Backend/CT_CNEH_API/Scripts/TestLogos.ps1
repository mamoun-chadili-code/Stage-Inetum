# Script pour tester la gestion des logos
# Exécuter ce script après avoir démarré le backend

Write-Host "Test de la gestion des logos..." -ForegroundColor Green

# Attendre que le backend démarre
Write-Host "Attendre que le backend démarre..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Test 1: Vérifier que les dossiers existent
Write-Host "`n1. Vérification des dossiers..." -ForegroundColor Cyan
$projectRoot = Split-Path -Parent $PSScriptRoot
$wwwrootPath = Join-Path $projectRoot "wwwroot"
$uploadsPath = Join-Path $wwwrootPath "uploads"
$logosPath = Join-Path $uploadsPath "logos"

Write-Host "📁 wwwroot: $(if (Test-Path $wwwrootPath) { '✓ Existe' } else { '❌ Manquant' })" -ForegroundColor White
Write-Host "📁 uploads: $(if (Test-Path $uploadsPath) { '✓ Existe' } else { '❌ Manquant' })" -ForegroundColor White
Write-Host "📁 logos: $(if (Test-Path $logosPath) { '✓ Existe' } else { '❌ Manquant' })" -ForegroundColor White

# Test 2: Vérifier que les images de test existent
Write-Host "`n2. Vérification des images de test..." -ForegroundColor Cyan
$testLogos = @("logo_reseau_nord.png", "logo_reseau_centre.png")
foreach ($logo in $testLogos) {
    $logoPath = Join-Path $logosPath $logo
    $exists = Test-Path $logoPath
    Write-Host "📄 $logo: $(if ($exists) { '✓ Existe' } else { '❌ Manquant' })" -ForegroundColor White
}

# Test 3: Tester l'API des logos (si le backend est démarré)
Write-Host "`n3. Test de l'API des logos..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "http://localhost:7000/api/Logos/reseau/1" -Method GET -SkipCertificateCheck
    Write-Host "✓ API Logos accessible" -ForegroundColor Green
    Write-Host "  Logos trouvés: $($response.Count)" -ForegroundColor White
} catch {
    Write-Host "❌ API Logos non accessible: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Tester l'API des réseaux
Write-Host "`n4. Test de l'API des réseaux..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "http://localhost:7000/api/Reseaux" -Method GET -SkipCertificateCheck
    Write-Host "✓ API Reseaux accessible" -ForegroundColor Green
    Write-Host "  Réseaux trouvés: $($response.Count)" -ForegroundColor White
    
    # Vérifier les logos des réseaux
    foreach ($reseau in $response) {
        if ($reseau.logoUrl) {
            Write-Host "  📄 $($reseau.nom): $($reseau.logoUrl)" -ForegroundColor White
        } else {
            Write-Host "  ❌ $($reseau.nom): Pas de logo" -ForegroundColor Yellow
        }
    }
} catch {
    Write-Host "❌ API Reseaux non accessible: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nTest terminé !" -ForegroundColor Green


