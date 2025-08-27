# Script pour créer les dossiers d'upload nécessaires
# Exécuter ce script depuis le répertoire racine du projet

Write-Host "Création des dossiers d'upload..." -ForegroundColor Green

# Chemin du projet
$projectRoot = Split-Path -Parent $PSScriptRoot
$wwwrootPath = Join-Path $projectRoot "wwwroot"
$uploadsPath = Join-Path $wwwrootPath "uploads"
$logosPath = Join-Path $uploadsPath "logos"

# Créer le dossier wwwroot s'il n'existe pas
if (!(Test-Path $wwwrootPath)) {
    New-Item -ItemType Directory -Path $wwwrootPath -Force
    Write-Host "✓ Dossier wwwroot créé" -ForegroundColor Green
} else {
    Write-Host "✓ Dossier wwwroot existe déjà" -ForegroundColor Yellow
}

# Créer le dossier uploads s'il n'existe pas
if (!(Test-Path $uploadsPath)) {
    New-Item -ItemType Directory -Path $uploadsPath -Force
    Write-Host "✓ Dossier uploads créé" -ForegroundColor Green
} else {
    Write-Host "✓ Dossier uploads existe déjà" -ForegroundColor Yellow
}

# Créer le dossier logos s'il n'existe pas
if (!(Test-Path $logosPath)) {
    New-Item -ItemType Directory -Path $logosPath -Force
    Write-Host "✓ Dossier logos créé" -ForegroundColor Green
} else {
    Write-Host "✓ Dossier logos existe déjà" -ForegroundColor Yellow
}

# Créer un fichier .gitkeep pour que les dossiers vides soient versionnés
$gitkeepPath = Join-Path $logosPath ".gitkeep"
if (!(Test-Path $gitkeepPath)) {
    New-Item -ItemType File -Path $gitkeepPath -Force
    Write-Host "✓ Fichier .gitkeep créé dans logos" -ForegroundColor Green
}

Write-Host "`nStructure des dossiers créée :" -ForegroundColor Cyan
Write-Host "📁 wwwroot/" -ForegroundColor White
Write-Host "  📁 uploads/" -ForegroundColor White
Write-Host "    📁 logos/" -ForegroundColor White
Write-Host "      📄 .gitkeep" -ForegroundColor White

Write-Host "`nLes dossiers d'upload sont prêts !" -ForegroundColor Green












