# Script PowerShell pour exécuter le script SQL de données de test pour les lignes
# Assurez-vous que SQL Server est en cours d'exécution

param(
    [string]$ServerName = "localhost",
    [string]$DatabaseName = "CT_CNEH_DB",
    [string]$ScriptPath = "SeedDataLignes.sql"
)

Write-Host "=== Exécution du script de données de test pour les lignes ===" -ForegroundColor Green

try {
    # Construire la commande SQL
    $sqlCommand = "sqlcmd -S $ServerName -d $DatabaseName -i $ScriptPath"
    
    Write-Host "Commande SQL: $sqlCommand" -ForegroundColor Yellow
    Write-Host "Exécution en cours..." -ForegroundColor Cyan
    
    # Exécuter la commande
    Invoke-Expression $sqlCommand
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Script exécuté avec succès!" -ForegroundColor Green
        Write-Host "12 exemples de lignes ont été ajoutés à la base de données." -ForegroundColor Green
    } else {
        Write-Host "❌ Erreur lors de l'exécution du script" -ForegroundColor Red
        Write-Host "Code de sortie: $LASTEXITCODE" -ForegroundColor Red
    }
}
catch {
    Write-Host "❌ Erreur: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Assurez-vous que:" -ForegroundColor Yellow
    Write-Host "1. SQL Server est en cours d'exécution" -ForegroundColor Yellow
    Write-Host "2. La base de données $DatabaseName existe" -ForegroundColor Yellow
    Write-Host "3. Le fichier $ScriptPath existe dans le répertoire courant" -ForegroundColor Yellow
    Write-Host "4. sqlcmd est installé et accessible dans le PATH" -ForegroundColor Yellow
}

Write-Host "=== Fin de l'exécution ===" -ForegroundColor Green 