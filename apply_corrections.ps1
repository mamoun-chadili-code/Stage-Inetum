$file = "frontend/src/components/Decisions/Decisions.js"
$content = Get-Content $file -Raw

# Correction 1: Ajouter typesEntite dans l'état
$content = $content -replace 'typesDecision: \[\](?:\s+});', "typesDecision: [],`n    typesEntite: []`n  });"

# Correction 2: Ajouter getEntiteTypes dans Promise.all
$content = $content -replace 'decisionService\.getDecisionTypes\(\)', "decisionService.getDecisionTypes(),`n        decisionService.getEntiteTypes()"

Set-Content $file $content -Encoding UTF8
Write-Host "Corrections appliquees!"
