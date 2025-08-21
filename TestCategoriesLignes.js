// Script de test pour vérifier les catégories de lignes
const API_BASE_URL = 'http://localhost:7000/api';

async function testCategoriesLignes() {
  console.log('🧪 Test des catégories de lignes...\n');

  try {
    // Test 1: Vérifier l'endpoint /Categories
    console.log('1️⃣ Test de l\'endpoint /Categories...');
    const categoriesResponse = await fetch(`${API_BASE_URL}/Categories`);
    
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      console.log('✅ Catégories récupérées:', categories);
      
      if (categories.length > 0) {
        console.log('✅ Le dropdown de catégorie devrait maintenant afficher des données !');
      } else {
        console.log('⚠️ Aucune catégorie trouvée dans la base de données');
      }
    } else {
      console.log('❌ Erreur lors de la récupération des catégories:', categoriesResponse.status);
    }

    // Test 2: Vérifier l'endpoint /CategorieLignes (pour comparaison)
    console.log('\n2️⃣ Test de l\'endpoint /CategorieLignes...');
    const categorieLignesResponse = await fetch(`${API_BASE_URL}/CategorieLignes`);
    
    if (categorieLignesResponse.ok) {
      const categorieLignes = await categorieLignesResponse.json();
      console.log('✅ CategorieLignes récupérées:', categorieLignes);
    } else {
      console.log('❌ Erreur lors de la récupération des CategorieLignes:', categorieLignesResponse.status);
    }

    // Test 3: Vérifier l'endpoint /Statuts
    console.log('\n3️⃣ Test de l\'endpoint /Statuts...');
    const statutsResponse = await fetch(`${API_BASE_URL}/Statuts`);
    
    if (statutsResponse.ok) {
      const statuts = await statutsResponse.json();
      console.log('✅ Statuts récupérés:', statuts);
      
      if (statuts.length > 0) {
        console.log('✅ Le dropdown de statut devrait maintenant afficher des données !');
      } else {
        console.log('⚠️ Aucun statut trouvé dans la base de données');
      }
    } else {
      console.log('❌ Erreur lors de la récupération des statuts:', statutsResponse.status);
    }

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
  }
}

// Exécuter le test
testCategoriesLignes();

