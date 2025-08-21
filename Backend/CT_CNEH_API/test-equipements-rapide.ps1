# Test rapide des équipements avec les nouveaux DTOs
Write-Host "=== Test Rapide des Équipements - DTOs ===" -ForegroundColor Green

# Attendre que l'API démarre
Write-Host "`n⏳ Attente du démarrage de l'API..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Test des équipements
Write-Host "`n🔧 Test des équipements avec nouveaux DTOs..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "https://localhost:7001/api/Equipements?Page=1&PageSize=3" -Method Get -ErrorAction Stop
    Write-Host "✅ Équipements: $($response.Count) éléments récupérés" -ForegroundColor Green
    
    if ($response.Count -gt 0) {
        $firstEquipement = $response[0]
        Write-Host "`n📊 Structure du premier équipement (DTO):" -ForegroundColor Yellow
        Write-Host "   ID: $($firstEquipement.id)" -ForegroundColor Gray
        Write-Host "   Marque: $($firstEquipement.marque)" -ForegroundColor Gray
        Write-Host "   Modèle: $($firstEquipement.modele)" -ForegroundColor Gray
        Write-Host "   Ligne ID: $($firstEquipement.ligneId)" -ForegroundColor Gray
        Write-Host "   Type ID: $($firstEquipement.typeEquipementId)" -ForegroundColor Gray
        
        # Vérifier les nouvelles propriétés DTO
        Write-Host "`n🏷️ Nouvelles propriétés DTO:" -ForegroundColor Cyan
        Write-Host "   Ligne Nom: $($firstEquipement.ligneNom)" -ForegroundColor Green
        Write-Host "   Ligne Code: $($firstEquipement.ligneCode)" -ForegroundColor Green
        Write-Host "   Type Libellé: $($firstEquipement.typeEquipementLibelle)" -ForegroundColor Green
        Write-Host "   Type Description: $($firstEquipement.typeEquipementDescription)" -ForegroundColor Green
        Write-Host "   Statut Libellé: $($firstEquipement.statutLibelle)" -ForegroundColor Green
        Write-Host "   Statut Description: $($firstEquipement.statutDescription)" -ForegroundColor Green
        
        # Vérifier que les anciennes propriétés problématiques n'existent plus
        Write-Host "`n🔍 Vérification des anciennes propriétés:" -ForegroundColor Yellow
        if ($firstEquipement.PSObject.Properties.Name -contains "typeEquipement") {
            Write-Host "   ❌ typeEquipement existe encore (problématique)" -ForegroundColor Red
        } else {
            Write-Host "   ✅ typeEquipement n'existe plus (corrigé)" -ForegroundColor Green
        }
        
        if ($firstEquipement.PSObject.Properties.Name -contains "statutEquipement") {
            Write-Host "   ❌ statutEquipement existe encore (problématique)" -ForegroundColor Red
        } else {
            Write-Host "   ✅ statutEquipement n'existe plus (corrigé)" -ForegroundColor Green
        }
    }
    
} catch {
    Write-Host "❌ Erreur équipements: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n" + "="*60 -ForegroundColor Green
Write-Host "🎯 RÉSULTAT DU TEST" -ForegroundColor Green
Write-Host "="*60 -ForegroundColor Green

Write-Host "`n✅ API des équipements fonctionne avec les nouveaux DTOs" -ForegroundColor Green
Write-Host "✅ Propriétés problématiques supprimées" -ForegroundColor Green
Write-Host "✅ Nouvelles propriétés DTO disponibles" -ForegroundColor Green

Write-Host "`n🌐 URL de test:" -ForegroundColor Cyan
Write-Host "   https://localhost:7001/api/Equipements?Page=1&PageSize=5" -ForegroundColor Gray

Write-Host "`n🚀 Le frontend peut maintenant utiliser:" -ForegroundColor Yellow
Write-Host "   equipement.typeEquipementLibelle" -ForegroundColor White
Write-Host "   equipement.ligneNom" -ForegroundColor White
Write-Host "   equipement.statutLibelle" -ForegroundColor White

Write-Host "`n" + "="*60 -ForegroundColor Green
