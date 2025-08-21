// Script de test complet pour vérifier l'historique de tous les agents
console.log('🔍 Test complet de l\'historique des agents...\n');

// Fonction pour tester un agent spécifique
async function testAgentHistorique(agentId, agentName) {
  console.log(`📋 Test de l'historique de l'agent ${agentName} (ID: ${agentId})`);
  
  try {
    // Test 1: API Historique
    const historiqueResponse = await fetch(`http://localhost:7000/api/Agents/${agentId}/historique`);
    const historiqueData = await historiqueResponse.json();
    
    console.log(`✅ API Historique Agent ${agentId}:`);
    console.log(`   - Nombre d'entrées: ${historiqueData.historique.length}`);
    console.log(`   - Nom de l'agent: ${historiqueData.agentNom}`);
    
    // Afficher chaque entrée d'historique
    historiqueData.historique.forEach((entry, index) => {
      console.log(`   📝 Entrée ${index + 1}:`);
      console.log(`      - Date affectation: ${new Date(entry.dateAffectation).toLocaleDateString('fr-FR')}`);
      console.log(`      - Date fin affectation: ${entry.dateFinAffectation ? new Date(entry.dateFinAffectation).toLocaleDateString('fr-FR') : 'En cours'}`);
      console.log(`      - Motif affectation: ${entry.motifAffectation}`);
      console.log(`      - Motif fin affectation: ${entry.motifFinAffectation || 'N/A'}`);
      console.log(`      - CCT: ${entry.cct}`);
      console.log(`      - Actif: ${entry.isActive ? 'Oui' : 'Non'}`);
    });
    
    // Test 2: API Détails Agent
    const detailsResponse = await fetch(`http://localhost:7000/api/Agents/${agentId}`);
    const detailsData = await detailsResponse.json();
    
    console.log(`✅ API Détails Agent ${agentId}:`);
    console.log(`   - Nom: ${detailsData.nom}`);
    console.log(`   - Prénom: ${detailsData.prenom}`);
    console.log(`   - CCT actuel: ${detailsData.cct}`);
    console.log(`   - Date affectation actuelle: ${detailsData.dateAffectationCCT ? new Date(detailsData.dateAffectationCCT).toLocaleDateString('fr-FR') : 'N/A'}`);
    
    // Test 3: Simulation de l'appel combiné (comme dans le service)
    console.log(`✅ Simulation appel combiné (agent + historique):`);
    const combinedData = {
      ...detailsData,
      historique: historiqueData.historique || []
    };
    console.log(`   - Données combinées: ${combinedData.historique.length} entrées d'historique`);
    
    return {
      success: true,
      historiqueCount: historiqueData.historique.length,
      details: detailsData,
      historique: historiqueData
    };
    
  } catch (error) {
    console.error(`❌ Erreur pour l'agent ${agentId}:`, error);
    return { success: false, error: error.message };
  }
}

// Test de tous les agents
async function testAllAgents() {
  const agents = [
    { id: 16, name: "AADNAN MY SMAIL" },
    { id: 17, name: "BENNANI FATIMA" },
    { id: 18, name: "CHERKAOUI AHMED" }
  ];
  
  console.log('🚀 Lancement des tests pour tous les agents...\n');
  
  const results = [];
  
  for (const agent of agents) {
    const result = await testAgentHistorique(agent.id, agent.name);
    results.push({ ...agent, ...result });
    console.log(''); // Ligne vide entre les agents
  }
  
  // Résumé des tests
  console.log('📊 RÉSUMÉ DES TESTS:');
  console.log('====================');
  
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.name}: ${result.historiqueCount} entrées d'historique`);
    } else {
      console.log(`❌ ${result.name}: Erreur - ${result.error}`);
    }
  });
  
  const totalHistorique = results.filter(r => r.success).reduce((sum, r) => sum + r.historiqueCount, 0);
  console.log(`\n📈 Total des entrées d'historique: ${totalHistorique}`);
  
  console.log('\n🎯 Tests terminés. Vérifiez la console pour les résultats détaillés.');
}

// Lancer les tests
testAllAgents();
