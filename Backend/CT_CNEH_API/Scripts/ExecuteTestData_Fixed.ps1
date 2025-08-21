# Script PowerShell pour exécuter le script SQL de données de test
# CT_CNEH_API - Gestion de l'activité du contrôle technique

param(
    [string]$ServerInstance = "localhost",
    [string]$Database = "CT_CNEH_DB",
    [string]$SqlScriptPath = "InsertTestData.sql"
)

Write-Host "=== Exécution du script de données de test ===" -ForegroundColor Green
Write-Host "Serveur: $ServerInstance" -ForegroundColor Yellow
Write-Host "Base de données: $Database" -ForegroundColor Yellow
Write-Host "Script SQL: $SqlScriptPath" -ForegroundColor Yellow
Write-Host ""

# Vérifier que le script SQL existe
if (-not (Test-Path $SqlScriptPath)) {
    Write-Host "ERREUR: Le script SQL '$SqlScriptPath' n'existe pas!" -ForegroundColor Red
    exit 1
}

# Vérifier que SQL Server est accessible
try {
    $connectionString = "Server=$ServerInstance;Database=$Database;Integrated Security=true;"
    $connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $connection.Open()
    Write-Host "✓ Connexion à SQL Server réussie" -ForegroundColor Green
    $connection.Close()
} catch {
    Write-Host "ERREUR: Impossible de se connecter à SQL Server!" -ForegroundColor Red
    Write-Host "Détails: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Vérifiez que:" -ForegroundColor Yellow
    Write-Host "1. SQL Server est démarré" -ForegroundColor Yellow
    Write-Host "2. L'instance '$ServerInstance' est correcte" -ForegroundColor Yellow
    Write-Host "3. La base de données '$Database' existe" -ForegroundColor Yellow
    Write-Host "4. Vous avez les droits d'accès" -ForegroundColor Yellow
    exit 1
}

# Lire le contenu du script SQL
try {
    $sqlScript = Get-Content $SqlScriptPath -Raw -Encoding UTF8
    Write-Host "✓ Script SQL chargé avec succès" -ForegroundColor Green
} catch {
    Write-Host "ERREUR: Impossible de lire le script SQL!" -ForegroundColor Red
    Write-Host "Détails: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Exécuter le script SQL
try {
    Write-Host "Exécution du script SQL..." -ForegroundColor Cyan
    
    $connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $connection.Open()
    
    $command = New-Object System.Data.SqlClient.SqlCommand($sqlScript, $connection)
    $command.CommandTimeout = 300 # 5 minutes
    
    $result = $command.ExecuteNonQuery()
    
    Write-Host "✓ Script SQL exécuté avec succès!" -ForegroundColor Green
    Write-Host "Nombre de lignes affectées: $result" -ForegroundColor Green
    
    $connection.Close()
    
} catch {
    Write-Host "ERREUR lors de l'exécution du script SQL!" -ForegroundColor Red
    Write-Host "Détails: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($connection -and $connection.State -eq 'Open') {
        $connection.Close()
    }
    exit 1
}

Write-Host ""
Write-Host "=== Vérification des données insérées ===" -ForegroundColor Green

# Vérifier le nombre d'enregistrements dans chaque table
try {
    $connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
    $connection.Open()
    
    $tables = @(
        "Regions", "Provinces", "Villes", "CadreAutorisations", "StatutRCs",
        "Reseaux", "CategorieCCTs", "TypeCTTs", "CCTs", "NiveauFormations",
        "ChefCentres", "StatutAdministratifs", "Agents", "TypesFormation",
        "Formations", "Categories", "Statuts", "TypeDecisions", "Decisions",
        "Lignes", "TypeEquipements", "StatutsEquipement", "Equipements",
        "HistoriqueAffectations", "Users"
    )
    
    foreach ($table in $tables) {
        try {
            $command = New-Object System.Data.SqlClient.SqlCommand("SELECT COUNT(*) FROM $table", $connection)
            $count = $command.ExecuteScalar()
            Write-Host "✓ $table`: $count enregistrements" -ForegroundColor Green
        } catch {
            Write-Host "✗ $table`: Erreur lors du comptage" -ForegroundColor Red
        }
    }
    
    $connection.Close()
    
} catch {
    Write-Host "ERREUR lors de la vérification des données!" -ForegroundColor Red
    Write-Host "Détails: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Données de test insérées avec succès! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Vous pouvez maintenant:" -ForegroundColor Yellow
Write-Host "1. Lancer le backend avec 'dotnet run'" -ForegroundColor Yellow
Write-Host "2. Tester les API endpoints" -ForegroundColor Yellow
Write-Host "3. Utiliser le frontend avec les données de test" -ForegroundColor Yellow
Write-Host ""
Write-Host "Comptes de test disponibles:" -ForegroundColor Cyan
Write-Host "- admin / admin123" -ForegroundColor White
Write-Host "- chef.casablanca / admin123" -ForegroundColor White
Write-Host "- chef.rabat / admin123" -ForegroundColor White
Write-Host "- agent.casablanca / admin123" -ForegroundColor White
