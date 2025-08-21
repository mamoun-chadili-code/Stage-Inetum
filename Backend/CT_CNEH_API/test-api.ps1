# Script de test de l'API CT_CNEH
Write-Host "=== Test de l'API CT_CNEH ===" -ForegroundColor Green

# Attendre que l'API démarre
Write-Host "Attente du démarrage de l'API..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Test de base - Swagger
Write-Host "`n1. Test de Swagger..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/swagger" -Method Get -ErrorAction Stop
    Write-Host "✅ Swagger accessible" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur Swagger: $($_.Exception.Message)" -ForegroundColor Red
}

# Test des endpoints
$endpoints = @(
    "Decisions",
    "CCTs", 
    "Agents",
    "Formations",
    "Equipements",
    "Lignes",
    "Reseaux"
)

foreach ($endpoint in $endpoints) {
    Write-Host "`n2. Test de l'endpoint $endpoint..." -ForegroundColor Cyan
    try {
        $url = "https://localhost:7001/api/$endpoint?Page=1&PageSize=5"
        $response = Invoke-RestMethod -Uri $url -Method Get -ErrorAction Stop
        Write-Host "✅ $endpoint : $($response.Count) éléments récupérés" -ForegroundColor Green
    } catch {
        Write-Host "❌ Erreur $endpoint : $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== Test terminé ===" -ForegroundColor Green
