// Script de test pour vérifier les dropdowns d'équipement
const API_BASE_URL = 'http://localhost:7000/api';

async function testDropdownsEquipements() {
  console.log('🧪 Test des dropdowns d\'équipement...\n');

  try {
    // Test 1: Vérifier l'endpoint /TypeEquipements
    console.log('1️⃣ Test de l\'endpoint /TypeEquipements...');
    const typesResponse = await fetch(`${API_BASE_URL}/TypeEquipements`);
    
    if (typesResponse.ok) {
      const types = await typesResponse.json();
      console.log('✅ Types d\'équipements récupérés:', types);
      
      if (types.length > 0) {
        console.log('✅ Le dropdown Type devrait maintenant afficher des données !');
        console.log('   - Types disponibles:', types.map(t => t.libelle).join(', '));
      } else {
        console.log('⚠️ Aucun type d\'équipement trouvé dans la base de données');
      }
    } else {
      console.log('❌ Erreur lors de la récupération des types:', typesResponse.status);
    }

    // Test 2: Vérifier l'endpoint /StatutsEquipement
    console.log('\n2️⃣ Test de l\'endpoint /StatutsEquipement...');
    const statutsResponse = await fetch(`${API_BASE_URL}/StatutsEquipement`);
    
    if (statutsResponse.ok) {
      const statuts = await statutsResponse.json();
      console.log('✅ Statuts d\'équipement récupérés:', statuts);
      
      if (statuts.length > 0) {
        console.log('✅ Le dropdown Statut devrait maintenant afficher des données !');
        console.log('   - Statuts disponibles:', statuts.map(s => s.libelle).join(', '));
      } else {
        console.log('⚠️ Aucun statut d\'équipement trouvé dans la base de données');
      }
    } else {
      console.log('❌ Erreur lors de la récupération des statuts:', statutsResponse.status);
    }

    // Test 3: Vérifier l'endpoint /CCTs
    console.log('\n3️⃣ Test de l\'endpoint /CCTs...');
    const cctsResponse = await fetch(`${API_BASE_URL}/CCTs`);
    
    if (cctsResponse.ok) {
      const ccts = await cctsResponse.json();
      console.log('✅ CCTs récupérés:', ccts);
      
      if (ccts.length > 0) {
        console.log('✅ Le dropdown CCT devrait maintenant afficher des données !');
        console.log('   - CCTs disponibles:', ccts.slice(0, 3).map(c => c.nom).join(', ') + (ccts.length > 3 ? '...' : ''));
      } else {
        console.log('⚠️ Aucun CCT trouvé dans la base de données');
      }
    } else {
      console.log('❌ Erreur lors de la récupération des CCTs:', cctsResponse.status);
    }

    // Test 4: Vérifier l'endpoint /Equipements
    console.log('\n4️⃣ Test de l\'endpoint /Equipements...');
    const equipementsResponse = await fetch(`${API_BASE_URL}/Equipements`);
    
    if (equipementsResponse.ok) {
      const equipements = await equipementsResponse.json();
      console.log('✅ Équipements récupérés:', equipements);
      
      if (equipements.length > 0) {
        console.log('✅ La liste des équipements devrait maintenant afficher des données !');
        console.log('   - Nombre d\'équipements:', equipements.length);
      } else {
        console.log('⚠️ Aucun équipement trouvé dans la base de données');
      }
    } else {
      console.log('❌ Erreur lors de la récupération des équipements:', equipementsResponse.status);
    }

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

// Exécuter le test
testDropdownsEquipements();
