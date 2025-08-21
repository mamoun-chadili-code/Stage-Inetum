# Diagnostic immédiat du problème frontend
Write-Host "=== DIAGNOSTIC IMMÉDIAT - PROBLÈME FRONTEND ===" -ForegroundColor Red
Write-Host "Date: $(Get-Date)" -ForegroundColor Yellow

# Attendre que l'API démarre
Write-Host "`n⏳ Attente du démarrage de l'API..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Test de base - Santé de l'API
Write-Host "`n🏥 Test 1: Santé de l'API..." -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "https://localhost:7001/api/Health" -Method Get -ErrorAction Stop
    Write-Host "✅ API accessible: $($health.status)" -ForegroundColor Green
} catch {
    Write-Host "❌ API inaccessible: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "💡 Vérifiez que l'API est démarrée sur le port 7001" -ForegroundColor Yellow
    exit 1
}

# Test critique - Structure de la réponse des équipements
Write-Host "`n🔧 Test 2: Structure des équipements (CRITIQUE)..." -ForegroundColor Cyan
try {
    $equipements = Invoke-RestMethod -Uri "https://localhost:7001/api/Equipements?Page=1&PageSize=2" -Method Get -ErrorAction Stop
    Write-Host "✅ Endpoint accessible: $($equipements.Count) équipements récupérés" -ForegroundColor Green
    
    if ($equipements.Count -gt 0) {
        $firstEquipement = $equipements[0]
        
        Write-Host "`n📊 STRUCTURE COMPLÈTE du premier équipement:" -ForegroundColor Yellow
        $firstEquipement | ConvertTo-Json -Depth 3 | Write-Host -ForegroundColor Gray
        
        Write-Host "`n🔍 ANALYSE DES PROPRIÉTÉS PROBLÉMATIQUES:" -ForegroundColor Red
        
        # Vérifier les anciennes propriétés problématiques
        if ($firstEquipement.PSObject.Properties.Name -contains "typeEquipement") {
            Write-Host "❌ PROBLÈME: 'typeEquipement' existe encore!" -ForegroundColor Red
            if ($firstEquipement.typeEquipement -ne $null) {
                Write-Host "   Structure: $($firstEquipement.typeEquipement | ConvertTo-Json)" -ForegroundColor Gray
            } else {
                Write-Host "   Valeur: NULL (source de l'erreur!)" -ForegroundColor Red
            }
        } else {
            Write-Host "✅ 'typeEquipement' n'existe plus (bon)" -ForegroundColor Green
        }
        
        if ($firstEquipement.PSObject.Properties.Name -contains "statutEquipement") {
            Write-Host "❌ PROBLÈME: 'statutEquipement' existe encore!" -ForegroundColor Red
            if ($firstEquipement.statutEquipement -ne $null) {
                Write-Host "   Structure: $($firstEquipement.statutEquipement | ConvertTo-Json)" -ForegroundColor Gray
            } else {
                Write-Host "   Valeur: NULL (source de l'erreur!)" -ForegroundColor Red
            }
        } else {
            Write-Host "✅ 'statutEquipement' n'existe plus (bon)" -ForegroundColor Green
        }
        
        # Vérifier les nouvelles propriétés DTO
        Write-Host "`n✅ NOUVELLES PROPRIÉTÉS DTO:" -ForegroundColor Green
        Write-Host "   typeEquipementLibelle: '$($firstEquipement.typeEquipementLibelle)'" -ForegroundColor White
        Write-Host "   ligneNom: '$($firstEquipement.ligneNom)'" -ForegroundColor White
        Write-Host "   statutLibelle: '$($firstEquipement.statutLibelle)'" -ForegroundColor White
        
    } else {
        Write-Host "❌ Aucun équipement trouvé!" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Erreur équipements: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n" + "="*80 -ForegroundColor Red
Write-Host "🚨 CONCLUSION DU DIAGNOSTIC" -ForegroundColor Red
Write-Host "="*80 -ForegroundColor Red

Write-Host "`n💡 SI L'ERREUR PERSISTE, CELA SIGNIFIE QUE:" -ForegroundColor Yellow
Write-Host "   1. Le frontend utilise encore l'ancienne API" -ForegroundColor White
Write-Host "   2. Le cache du navigateur contient encore les anciennes données" -ForegroundColor White
Write-Host "   3. L'API retourne encore les anciens objets avec typeEquipement null" -ForegroundColor White

Write-Host "`n🔧 SOLUTIONS IMMÉDIATES:" -ForegroundColor Yellow
Write-Host "   1. Redémarrer complètement l'API" -ForegroundColor White
Write-Host "   2. Vider le cache du navigateur (Ctrl+Shift+R)" -ForegroundColor White
Write-Host "   3. Vérifier l'URL de l'API dans le frontend" -ForegroundColor White
Write-Host "   4. Adapter le code frontend pour les nouvelles propriétés" -ForegroundColor White

Write-Host "`n🌐 TEST MANUEL:" -ForegroundColor Cyan
Write-Host "   Ouvrez: https://localhost:7001/api/Equipements?Page=1&PageSize=1" -ForegroundColor Gray
Write-Host "   Vérifiez la structure JSON dans le navigateur" -ForegroundColor Gray

Write-Host "`n" + "="*80 -ForegroundColor Red
