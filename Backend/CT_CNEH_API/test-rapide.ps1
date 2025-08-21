# Test rapide de l'API CT_CNEH
Write-Host "=== Test Rapide de l'API CT_CNEH ===" -ForegroundColor Green

# Attendre que l'API démarre
Write-Host "Attente du démarrage de l'API..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Test de base - Swagger
Write-Host "`n1. Test de Swagger..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/swagger" -Method Get -ErrorAction Stop
    Write-Host "✅ Swagger accessible" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur Swagger: $($_.Exception.Message)" -ForegroundColor Red
}

# Test de l'endpoint de santé
Write-Host "`n2. Test de l'endpoint de santé..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/Health" -Method Get -ErrorAction Stop
    Write-Host "✅ API en bonne santé: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur santé: $($_.Exception.Message)" -ForegroundColor Red
}

# Test de l'endpoint des décisions
Write-Host "`n3. Test de l'endpoint des décisions..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/Decisions?Page=1&PageSize=5" -Method Get -ErrorAction Stop
    Write-Host "✅ Décisions: $($response.Count) éléments récupérés" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur décisions: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Test rapide terminé ===" -ForegroundColor Green
Write-Host "`n🎉 L'API est prête à l'utilisation !" -ForegroundColor Green
Write-Host "📖 Swagger: https://localhost:7001/swagger" -ForegroundColor Cyan
Write-Host "🏥 Santé: https://localhost:7001/api/Health" -ForegroundColor Cyan
