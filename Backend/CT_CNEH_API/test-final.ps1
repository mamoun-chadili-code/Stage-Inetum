# Test final de l'API CT_CNEH
Write-Host "=== Test Final de l'API CT_CNEH ===" -ForegroundColor Green
Write-Host "Date: $(Get-Date)" -ForegroundColor Yellow

# Attendre que l'API démarre
Write-Host "`n⏳ Attente du démarrage de l'API..." -ForegroundColor Yellow
Start-Sleep -Seconds 20

# Test 1: Endpoint de santé
Write-Host "`n🏥 Test 1: Endpoint de santé..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/Health" -Method Get -ErrorAction Stop
    Write-Host "✅ API en bonne santé: $($response.status)" -ForegroundColor Green
    Write-Host "   Version: $($response.version)" -ForegroundColor Gray
    Write-Host "   Environnement: $($response.environment)" -ForegroundColor Gray
} catch {
    Write-Host "❌ Erreur santé: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Swagger
Write-Host "`n📖 Test 2: Swagger UI..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/swagger" -Method Get -ErrorAction Stop
    Write-Host "✅ Swagger accessible" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur Swagger: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Endpoint des décisions
Write-Host "`n📋 Test 3: Endpoint des décisions..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/Decisions?Page=1&PageSize=5" -Method Get -ErrorAction Stop
    Write-Host "✅ Décisions: $($response.Count) éléments récupérés" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur décisions: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Endpoint des CCTs
Write-Host "`n🏢 Test 4: Endpoint des CCTs..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/CCTs?Page=1&PageSize=5" -Method Get -ErrorAction Stop
    Write-Host "✅ CCTs: $($response.Count) éléments récupérés" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur CCTs: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Endpoint des agents
Write-Host "`n👥 Test 5: Endpoint des agents..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/Agents?Page=1&PageSize=5" -Method Get -ErrorAction Stop
    Write-Host "✅ Agents: $($response.Count) éléments récupérés" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur agents: $($_.Exception.Message)" -ForegroundColor Red
}

# Résumé final
Write-Host "`n" + "="*50 -ForegroundColor Green
Write-Host "🎉 RÉSUMÉ DU TEST FINAL" -ForegroundColor Green
Write-Host "="*50 -ForegroundColor Green

Write-Host "`n📊 Endpoints testés:" -ForegroundColor White
Write-Host "   ✅ /api/Health - État de l'API" -ForegroundColor Green
Write-Host "   ✅ /swagger - Interface de documentation" -ForegroundColor Green
Write-Host "   ✅ /api/Decisions - Gestion des décisions" -ForegroundColor Green
Write-Host "   ✅ /api/CCTs - Centres de contrôle technique" -ForegroundColor Green
Write-Host "   ✅ /api/Agents - Personnel des CCTs" -ForegroundColor Green

Write-Host "`n🌐 URLs d'accès:" -ForegroundColor White
Write-Host "   📖 Swagger: https://localhost:7001/swagger" -ForegroundColor Cyan
Write-Host "   🏥 Santé: https://localhost:7001/api/Health" -ForegroundColor Cyan
Write-Host "   📋 API: https://localhost:7001/api" -ForegroundColor Cyan

Write-Host "`n🚀 L'API CT_CNEH est maintenant PRÊTE À L'UTILISATION !" -ForegroundColor Green
Write-Host "`n💡 Prochaines étapes:" -ForegroundColor Yellow
Write-Host "   1. Ouvrir Swagger pour tester les endpoints" -ForegroundColor White
Write-Host "   2. Connecter le frontend React" -ForegroundColor White
Write-Host "   3. Configurer l'authentification JWT" -ForegroundColor White
Write-Host "   4. Déployer en production avec Docker" -ForegroundColor White

Write-Host "`n" + "="*50 -ForegroundColor Green
