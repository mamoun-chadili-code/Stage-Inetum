$file = "frontend/src/components/Reseaux/Reseaux.js"
$content = Get-Content $file -Raw

# Corriger toutes les erreurs de syntaxe
$content = $content -replace 'if \(!search\.agrement\.trim\(\)} return;', 'if (!search.agrement.trim()) return;'
$content = $content -replace 'const ville = dropdowns\.villes\?\.find\(v => v\.id === \(details\.VilleId \|\| details\.ville\?\.id\)};', 'const ville = dropdowns.villes?.find(v => v.id === (details.VilleId || details.ville?.id));'
$content = $content -replace 'const statut = dropdowns\.statuts\?\.find\(s => s\.id === \(details\.StatutId \|\| details\.statut\?\.id\)};', 'const statut = dropdowns.statuts?.find(s => s.id === (details.StatutId || details.statut?.id));'
$content = $content -replace 'const cadre = dropdowns\.cadres\?\.find\(c => c\.id === \(details\.CadreAutorisationId \|\| details\.cadreAutorisation\?\.id\)};', 'const cadre = dropdowns.cadres?.find(c => c.id === (details.CadreAutorisationId || details.cadreAutorisation?.id));'

Set-Content $file $content -Encoding UTF8
Write-Host "Reseaux.js corrige definitivement!"
