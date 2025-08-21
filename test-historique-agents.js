// Script de test pour vérifier l'historique des agents
console.log('🔍 Test de l\'historique des agents...\n');

// Test 1: Vérifier l'API historique de l'agent 16
console.log('📋 Test 1: Historique de l\'agent AADNAN MY SMAIL (ID: 16)');
fetch('http://localhost:7000/api/Agents/16/historique')
  .then(response => response.json())
  .then(data => {
    console.log('✅ API Historique Agent 16:');
    console.log('   - Nombre d\'entrées:', data.historique.length);
    console.log('   - Données:', JSON.stringify(data, null, 2));
  })
  .catch(error => console.error('❌ Erreur API Historique Agent 16:', error));

// Test 2: Vérifier l'API historique de l'agent 17
console.log('\n📋 Test 2: Historique de l\'agent BENNANI FATIMA (ID: 17)');
fetch('http://localhost:7000/api/Agents/17/historique')
  .then(response => response.json())
  .then(data => {
    console.log('✅ API Historique Agent 17:');
    console.log('   - Nombre d\'entrées:', data.historique.length);
    console.log('   - Données:', JSON.stringify(data, null, 2));
  })
  .catch(error => console.error('❌ Erreur API Historique Agent 17:', error));

// Test 3: Vérifier l'API détails de l'agent 16
console.log('\n📋 Test 3: Détails de l\'agent AADNAN MY SMAIL (ID: 16)');
fetch('http://localhost:7000/api/Agents/16')
  .then(response => response.json())
  .then(data => {
    console.log('✅ API Détails Agent 16:');
    console.log('   - Nom:', data.nom);
    console.log('   - Prénom:', data.prenom);
    console.log('   - CCT actuel:', data.cct);
    console.log('   - Date affectation:', data.dateAffectationCCT);
  })
  .catch(error => console.error('❌ Erreur API Détails Agent 16:', error));

console.log('\n🚀 Tests lancés. Vérifiez la console pour les résultats.');
