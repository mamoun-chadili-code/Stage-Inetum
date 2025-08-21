# Script PowerShell pour exécuter la configuration CORRIGÉE de la base de données
# Ce script utilise les vrais noms de colonnes de votre base existante

Write-Host "=== CONFIGURATION CORRIGÉE DE LA BASE DE DONNÉES CT_CNEH ===" -ForegroundColor Green
Write-Host ""

# Vérifier si le fichier SQL existe
$sqlFile = "SetupCompleteDatabase_Correct.sql"
if (-not (Test-Path $sqlFile)) {
    Write-Host "ERREUR: Le fichier $sqlFile n'existe pas dans le répertoire courant." -ForegroundColor Red
    Write-Host "Assurez-vous d'être dans le bon répertoire (Scripts)." -ForegroundColor Yellow
    exit 1
}

Write-Host "Fichier SQL trouvé: $sqlFile" -ForegroundColor Green
Write-Host ""

# Afficher ce que va faire le script
Write-Host "Ce script va utiliser les VRAIS noms de colonnes :" -ForegroundColor Cyan
Write-Host "  📋 Libelle (au lieu de Nom)" -ForegroundColor White
Write-Host "  📋 HistoriqueAffectations (au lieu de HistoriqueAffectation)" -ForegroundColor White
Write-Host "  📋 StatutAdministratifs (au lieu de StatutsAdministratifs)" -ForegroundColor White
Write-Host ""

Write-Host "Le script va ajouter :" -ForegroundColor Cyan
Write-Host "  📋 12 régions du Maroc" -ForegroundColor White
Write-Host "  📋 26 provinces" -ForegroundColor White
Write-Host "  📋 18 villes" -ForegroundColor White
Write-Host "  📋 10 CCTs (centres de collecte)" -ForegroundColor White
Write-Host "  📋 8 catégories CCT" -ForegroundColor White
Write-Host "  📋 11 statuts administratifs" -ForegroundColor White
Write-Host "  📋 10 agents de test" -ForegroundColor White
Write-Host "  📋 13 enregistrements d'historique" -ForegroundColor White
Write-Host ""

# Demander confirmation à l'utilisateur
Write-Host "⚠️ ATTENTION: Ce script va modifier la base de données CT_CNEH_DB" -ForegroundColor Yellow
Write-Host "Assurez-vous que:" -ForegroundColor Yellow
Write-Host "  - La base de données CT_CNEH_DB est accessible" -ForegroundColor Yellow
Write-Host "  - Vous avez les droits d'écriture sur la base de données" -ForegroundColor Yellow
Write-Host "  - Le backend API est arrêté (pour éviter les conflits)" -ForegroundColor Yellow
Write-Host ""

$confirmation = Read-Host "Voulez-vous continuer avec la configuration corrigée ? (O/N)"
if ($confirmation -ne "O" -and $confirmation -ne "o") {
    Write-Host "Opération annulée par l'utilisateur." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "🚀 Démarrage de la configuration corrigée..." -ForegroundColor Green

try {
    # Exécuter le script SQL
    Write-Host "Connexion à la base de données..." -ForegroundColor Cyan
    
    # Utiliser sqlcmd si disponible
    if (Get-Command sqlcmd -ErrorAction SilentlyContinue) {
        Write-Host "Utilisation de sqlcmd..." -ForegroundColor Cyan
        
        # Exécuter le script avec affichage des messages
        $result = sqlcmd -S "localhost" -d "CT_CNEH_DB" -i $sqlFile -E -m 1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✅ Configuration terminée avec succès !" -ForegroundColor Green
            Write-Host ""
            Write-Host "📋 Résultats de l'exécution:" -ForegroundColor Cyan
            $result | ForEach-Object { 
                if ($_ -match "✅|📋|📊|🔗|🎉") {
                    Write-Host $_ -ForegroundColor Green
                } elseif ($_ -match "❌") {
                    Write-Host $_ -ForegroundColor Red
                } else {
                    Write-Host $_ -ForegroundColor White
                }
            }
            
            Write-Host ""
            Write-Host "🎉 Base de données configurée avec succès !" -ForegroundColor Green
            Write-Host ""
            Write-Host "📊 Résumé de la configuration:" -ForegroundColor Cyan
            Write-Host "  - 12 régions ajoutées" -ForegroundColor White
            Write-Host "  - 26 provinces ajoutées" -ForegroundColor White
            Write-Host "  - 18 villes ajoutées" -ForegroundColor White
            Write-Host "  - 10 CCTs ajoutés" -ForegroundColor White
            Write-Host "  - 8 catégories ajoutées" -ForegroundColor White
            Write-Host "  - 11 statuts ajoutés" -ForegroundColor White
            Write-Host "  - 10 agents de test ajoutés" -ForegroundColor White
            Write-Host "  - 13 enregistrements d'historique ajoutés" -ForegroundColor White
            
        } else {
            Write-Host "❌ Erreur lors de l'exécution du script." -ForegroundColor Red
            Write-Host "Code de sortie: $LASTEXITCODE" -ForegroundColor Red
            Write-Host ""
            Write-Host "💡 Vérifiez:" -ForegroundColor Yellow
            Write-Host "  - La connexion à la base de données" -ForegroundColor White
            Write-Host "  - Les droits d'écriture" -ForegroundColor White
            Write-Host "  - Les logs d'erreur SQL Server" -ForegroundColor White
            Write-Host "  - La structure des tables existantes" -ForegroundColor White
        }
    } else {
        Write-Host "sqlcmd n'est pas disponible." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "💡 Solutions alternatives:" -ForegroundColor Cyan
        Write-Host "  1. Installez SQL Server Command Line Utilities" -ForegroundColor White
        Write-Host "  2. Ou ouvrez SQL Server Management Studio" -ForegroundColor White
        Write-Host "  3. Et exécutez le fichier: $sqlFile" -ForegroundColor White
        
        # Afficher le chemin complet du fichier
        $fullPath = (Get-Item $sqlFile).FullName
        Write-Host ""
        Write-Host "Chemin complet du fichier: $fullPath" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "❌ Erreur lors de l'exécution: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "❌ Détails de l'erreur: $($_.Exception.ToString())" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== PROCHAINES ÉTAPES ===" -ForegroundColor Green
Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎯 Maintenant vous pouvez :" -ForegroundColor Cyan
    Write-Host "  1. Démarrer le backend API (CT_CNEH_API)" -ForegroundColor White
    Write-Host "  2. Démarrer l'application frontend (npm start)" -ForegroundColor White
    Write-Host "  3. Aller dans le module Agents" -ForegroundColor White
    Write-Host "  4. Vérifier que les 10 agents s'affichent correctement" -ForegroundColor White
    Write-Host "  5. Cliquer sur un agent pour voir son historique" -ForegroundColor White
    Write-Host "  6. Tester les fonctionnalités d'ajout/modification" -ForegroundColor White
} else {
    Write-Host "🔧 En cas de problème :" -ForegroundColor Cyan
    Write-Host "  1. Ouvrez SQL Server Management Studio" -ForegroundColor White
    Write-Host "  2. Connectez-vous à la base CT_CNEH_DB" -ForegroundColor White
    Write-Host "  3. Exécutez le script manuellement" -ForegroundColor White
    Write-Host "  4. Vérifiez les messages d'erreur dans SSMS" -ForegroundColor White
}

Write-Host ""
Write-Host "=== FIN DE LA CONFIGURATION CORRIGÉE ===" -ForegroundColor Green
Write-Host ""
Read-Host "Appuyez sur Entrée pour fermer..."
