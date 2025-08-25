# Script pour créer des images de test simples pour les logos
# Exécuter ce script depuis le répertoire racine du projet

Write-Host "Création des images de test pour les logos..." -ForegroundColor Green

# Chemin du projet
$projectRoot = Split-Path -Parent $PSScriptRoot
$logosPath = Join-Path $projectRoot "wwwroot" "uploads" "logos"

# Vérifier que le dossier logos existe
if (!(Test-Path $logosPath)) {
    Write-Host "❌ Le dossier logos n'existe pas. Exécutez d'abord CreateUploadFolders.ps1" -ForegroundColor Red
    exit 1
}

# Créer une image PNG simple en base64 (1x1 pixel transparent)
$pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="

# Convertir le base64 en bytes
$pngBytes = [Convert]::FromBase64String($pngBase64)

# Créer les fichiers de test
$testLogos = @(
    "logo_reseau_nord.png",
    "logo_reseau_centre.png"
)

foreach ($logo in $testLogos) {
    $logoPath = Join-Path $logosPath $logo
    if (!(Test-Path $logoPath)) {
        [System.IO.File]::WriteAllBytes($logoPath, $pngBytes)
        Write-Host "✓ Créé: $logo" -ForegroundColor Green
    } else {
        Write-Host "✓ Existe déjà: $logo" -ForegroundColor Yellow
    }
}

Write-Host "`nImages de test créées avec succès !" -ForegroundColor Green
Write-Host "Les logos sont maintenant disponibles pour les tests." -ForegroundColor Cyan








