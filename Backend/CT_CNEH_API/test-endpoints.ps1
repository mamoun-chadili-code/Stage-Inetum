# Script de test des endpoints /all
Write-Host "🧪 Test des endpoints /all pour éviter les cycles de références" -ForegroundColor Cyan
Write-Host "===============================================================" -ForegroundColor Cyan

# Attendre que le backend soit prêt
Write-Host "⏳ Attente du démarrage du backend..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Fonction pour tester un endpoint
function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url
    )
    
    try {
        Write-Host "🔍 Test de $Name..." -ForegroundColor Blue
        $response = Invoke-RestMethod -Uri $Url -Method Get -TimeoutSec 10
        $count = if ($response -is [array]) { $response.Count } else { 0 }
        Write-Host "✅ $Name : $count éléments récupérés" -ForegroundColor Green
        
        # Afficher les premiers éléments
        if ($count -gt 0) {
            $first = $response[0]
            Write-Host "   Premier élément: $($first | ConvertTo-Json -Compress)" -ForegroundColor Gray
        }
        
        return $true
    }
    catch {
        Write-Host "❌ $Name : Erreur - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Tests des endpoints
$baseUrl = "http://localhost:7000/api"
$endpoints = @(
    @{ Name = "Reseaux/all"; Url = "$baseUrl/Reseaux/all" },
    @{ Name = "CCTs/all"; Url = "$baseUrl/CCTs/all" },
    @{ Name = "ChefsCentre/all"; Url = "$baseUrl/ChefsCentre/all" },
    @{ Name = "Agents/all"; Url = "$baseUrl/Agents/all" }
)

$successCount = 0
foreach ($endpoint in $endpoints) {
    if (Test-Endpoint -Name $endpoint.Name -Url $endpoint.Url) {
        $successCount++
    }
    Write-Host ""
}

# Résumé
Write-Host "📊 RÉSUMÉ DES TESTS" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan
Write-Host "Endpoints testés: $($endpoints.Count)" -ForegroundColor White
Write-Host "Succès: $successCount" -ForegroundColor Green
Write-Host "Échecs: $($endpoints.Count - $successCount)" -ForegroundColor Red

if ($successCount -eq $endpoints.Count) {
    Write-Host "🎉 Tous les endpoints fonctionnent correctement !" -ForegroundColor Green
    Write-Host "💡 Les dropdowns devraient maintenant afficher tous les éléments." -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Certains endpoints ont des problèmes." -ForegroundColor Yellow
    Write-Host "🔧 Vérifiez les logs du backend pour plus de détails." -ForegroundColor Yellow
}
