# Test spécifique des équipements pour diagnostiquer le problème frontend
Write-Host "=== Test des Équipements - Diagnostic Frontend ===" -ForegroundColor Green
Write-Host "Date: $(Get-Date)" -ForegroundColor Yellow

# Attendre que l'API démarre
Write-Host "`n⏳ Attente du démarrage de l'API..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Test 1: Endpoint de santé
Write-Host "`n🏥 Test 1: Endpoint de santé..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/Health" -Method Get -ErrorAction Stop
    Write-Host "✅ API en bonne santé: $($response.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur santé: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Endpoint des équipements
Write-Host "`n🔧 Test 2: Endpoint des équipements..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/Equipements?Page=1&PageSize=10" -Method Get -ErrorAction Stop
    Write-Host "✅ Équipements: $($response.Count) éléments récupérés" -ForegroundColor Green
    
    # Analyser la structure des données
    if ($response.Count -gt 0) {
        $firstEquipement = $response[0]
        Write-Host "`n📊 Structure du premier équipement:" -ForegroundColor Yellow
        Write-Host "   ID: $($firstEquipement.id)" -ForegroundColor Gray
        Write-Host "   Nom: $($firstEquipement.nom)" -ForegroundColor Gray
        Write-Host "   Type: $($firstEquipement.typeEquipementId)" -ForegroundColor Gray
        
        # Vérifier si les propriétés liées existent
        if ($firstEquipement.typeEquipement) {
            Write-Host "   Type Libellé: $($firstEquipement.typeEquipement.libelle)" -ForegroundColor Green
        } else {
            Write-Host "   ❌ Type Equipement: NULL ou manquant" -ForegroundColor Red
        }
        
        if ($firstEquipement.statutEquipement) {
            Write-Host "   Statut Libellé: $($firstEquipement.statutEquipement.libelle)" -ForegroundColor Green
        } else {
            Write-Host "   ❌ Statut Equipement: NULL ou manquant" -ForegroundColor Red
        }
    }
    
} catch {
    Write-Host "❌ Erreur équipements: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Endpoint des types d'équipements
Write-Host "`n🏷️ Test 3: Endpoint des types d'équipements..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/TypeEquipements" -Method Get -ErrorAction Stop
    Write-Host "✅ Types d'équipements: $($response.Count) éléments récupérés" -ForegroundColor Green
    
    if ($response.Count -gt 0) {
        Write-Host "   Premier type: $($response[0].libelle)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Erreur types d'équipements: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Endpoint des statuts d'équipements
Write-Host "`n📊 Test 4: Endpoint des statuts d'équipements..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/StatutsEquipement" -Method Get -ErrorAction Stop
    Write-Host "✅ Statuts d'équipements: $($response.Count) éléments récupérés" -ForegroundColor Green
    
    if ($response.Count -gt 0) {
        Write-Host "   Premier statut: $($response[0].libelle)" -ForegroundColor Gray
    }
} catch {
    Write-Host "❌ Erreur statuts d'équipements: $($_.Exception.Message)" -ForegroundColor Red
}

# Résumé du diagnostic
Write-Host "`n" + "="*60 -ForegroundColor Green
Write-Host "🔍 DIAGNOSTIC DU PROBLÈME FRONTEND" -ForegroundColor Green
Write-Host "="*60 -ForegroundColor Green

Write-Host "`n💡 Problème identifié:" -ForegroundColor Yellow
Write-Host "   Le frontend essaie d'accéder à 'libelle' sur des objets undefined" -ForegroundColor White
Write-Host "   Cela suggère que les relations ne sont pas chargées correctement" -ForegroundColor White

Write-Host "`n🔧 Solutions possibles:" -ForegroundColor Yellow
Write-Host "   1. Vérifier que l'API inclut les relations (Include)" -ForegroundColor White
Write-Host "   2. Vérifier que le frontend gère les valeurs null/undefined" -ForegroundColor White
Write-Host "   3. Vérifier que les données de test sont correctement créées" -ForegroundColor White

Write-Host "`n🌐 URLs de test:" -ForegroundColor Cyan
Write-Host "   Équipements: https://localhost:7001/api/Equipements" -ForegroundColor Gray
Write-Host "   Types: https://localhost:7001/api/TypeEquipements" -ForegroundColor Gray
Write-Host "   Statuts: https://localhost:7001/api/StatutsEquipement" -ForegroundColor Gray

Write-Host "`n" + "="*60 -ForegroundColor Green
