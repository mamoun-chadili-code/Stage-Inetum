# Test immédiat de l'API des équipements
Write-Host "=== TEST IMMÉDIAT API ÉQUIPEMENTS ===" -ForegroundColor Green
Write-Host "Date: $(Get-Date)" -ForegroundColor Yellow

# Attendre que l'API démarre
Write-Host "`n⏳ Attente du démarrage de l'API..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

try {
    # Test de santé
    Write-Host "`n🏥 Test de santé de l'API..." -ForegroundColor Cyan
    $health = Invoke-RestMethod -Uri "https://localhost:7001/api/Health" -Method Get
    Write-Host "✅ API OK: $($health.status)" -ForegroundColor Green
    
    # Test des équipements (échapper l'URL)
    Write-Host "`n🔧 Test des équipements..." -ForegroundColor Cyan
    $uri = "https://localhost:7001/api/Equipements?Page=1" + "&" + "PageSize=3"
    $equipements = Invoke-RestMethod -Uri $uri -Method Get
    Write-Host "✅ Équipements récupérés: $($equipements.Count)" -ForegroundColor Green
    
    if ($equipements.Count -gt 0) {
        $premier = $equipements[0]
        Write-Host "`n📊 STRUCTURE DU PREMIER ÉQUIPEMENT:" -ForegroundColor Yellow
        Write-Host "ID: $($premier.id)" -ForegroundColor White
        Write-Host "Marque: $($premier.marque)" -ForegroundColor White
        Write-Host "Modèle: $($premier.modele)" -ForegroundColor White
        Write-Host "Type Libellé: $($premier.typeEquipementLibelle)" -ForegroundColor Green
        Write-Host "Ligne Nom: $($premier.ligneNom)" -ForegroundColor Green
        Write-Host "Statut Libellé: $($premier.statutLibelle)" -ForegroundColor Green
        
        # Vérifier que les anciennes propriétés problématiques n'existent plus
        Write-Host "`n🔍 VÉRIFICATION DES PROPRIÉTÉS PROBLÉMATIQUES:" -ForegroundColor Yellow
        $hasTypeEquipement = $premier.PSObject.Properties.Name -contains "typeEquipement"
        $hasStatutEquipement = $premier.PSObject.Properties.Name -contains "statutEquipement"
        
        if (!$hasTypeEquipement) {
            Write-Host "✅ typeEquipement n'existe plus (PARFAIT!)" -ForegroundColor Green
        } else {
            Write-Host "❌ typeEquipement existe encore!" -ForegroundColor Red
        }
        
        if (!$hasStatutEquipement) {
            Write-Host "✅ statutEquipement n'existe plus (PARFAIT!)" -ForegroundColor Green
        } else {
            Write-Host "❌ statutEquipement existe encore!" -ForegroundColor Red
        }
        
        Write-Host "`n🎯 STRUCTURE COMPLÈTE JSON:" -ForegroundColor Cyan
        $premier | ConvertTo-Json -Depth 2
    }
    
} catch {
    Write-Host "❌ ERREUR: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n" + "="*60 -ForegroundColor Green
Write-Host "🎯 CONCLUSION" -ForegroundColor Green
Write-Host "="*60 -ForegroundColor Green
Write-Host "Si vous voyez les propriétés comme 'typeEquipementLibelle'," -ForegroundColor Yellow
Write-Host "l'API est CORRECTEMENT corrigée !" -ForegroundColor Green
Write-Host "`nMaintenant il faut adapter le frontend pour utiliser" -ForegroundColor Yellow
Write-Host "ces nouvelles propriétés au lieu des anciennes." -ForegroundColor Yellow
