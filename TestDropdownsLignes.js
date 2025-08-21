// Script de test pour vérifier tous les dropdowns du formulaire des lignes
console.log('=== TEST DROPDOWNS FORMULAIRE LIGNES ===');

// Test 1: Vérifier que tous les dropdowns sont chargés
console.log('1. Vérification du chargement des dropdowns...');
setTimeout(() => {
  console.log('   - Vérifiez que loadDropdowns() a été appelé');
  console.log('   - Vérifiez que getCategories() a été appelé');
  console.log('   - Vérifiez que getStatuts() a été appelé');
  console.log('   - Vérifiez que getCCTs() a été appelé');
}, 1000);

// Test 2: Vérifier que le modal s'ouvre avec tous les dropdowns
console.log('2. Test d\'ouverture du modal avec tous les dropdowns...');
setTimeout(() => {
  const addButton = document.querySelector('button:contains("+ Ajouter Ligne")');
  if (addButton) {
    console.log('✅ Bouton d\'ajout trouvé, clic...');
    addButton.click();
    
    setTimeout(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (modal) {
        console.log('✅ Modal ouvert avec succès');
        
        // Vérifier le select des catégories
        const categorieSelect = modal.querySelector('select[name="categorieId"]');
        if (categorieSelect) {
          const categorieOptions = categorieSelect.querySelectorAll('option');
          console.log('✅ Select catégories trouvé, options:', categorieOptions.length);
          
          // Vérifier que les catégories sont présentes
          const hasCategories = Array.from(categorieOptions).some(option => 
            option.textContent.includes('Véhicules') && index > 0
          );
          console.log('   - Catégories présentes:', hasCategories);
        } else {
          console.log('❌ Select catégories non trouvé');
        }
        
        // Vérifier le select des statuts
        const statutSelect = modal.querySelector('select[name="statutId"]');
        if (statutSelect) {
          const statutOptions = statutSelect.querySelectorAll('option');
          console.log('✅ Select statuts trouvé, options:', statutOptions.length);
          
          // Vérifier que les statuts sont présents
          const hasStatuts = Array.from(statutOptions).some(option => 
            option.textContent.includes('En') && index > 0
          );
          console.log('   - Statuts présents:', hasStatuts);
        } else {
          console.log('❌ Select statuts non trouvé');
        }
        
        // Vérifier le select des CCTs
        const cctSelect = modal.querySelector('select[name="cctId"]');
        if (cctSelect) {
          const cctOptions = cctSelect.querySelectorAll('option');
          console.log('✅ Select CCTs trouvé, options:', cctOptions.length);
          
          // Vérifier que les CCTs sont présents
          const hasCCTs = Array.from(cctOptions).some(option => 
            option.textContent.includes('Centre') && index > 0
          );
          console.log('   - CCTs présents:', hasCCTs);
        } else {
          console.log('❌ Select CCTs non trouvé');
        }
        
        // Fermer le modal
        const closeButton = modal.querySelector('button:contains("Annuler")');
        if (closeButton) {
          closeButton.click();
          console.log('✅ Modal fermé');
        }
      } else {
        console.log('❌ Modal non ouvert');
      }
    }, 1000);
  } else {
    console.log('❌ Bouton d\'ajout non trouvé');
  }
}, 2000);

// Test 3: Vérifier les APIs directement
console.log('3. Test direct des APIs...');
setTimeout(async () => {
  try {
    // Test API Catégories
    const categoriesResponse = await fetch('http://localhost:7000/api/CategorieLignes');
    if (categoriesResponse.ok) {
      const categories = await categoriesResponse.json();
      console.log('✅ API CategorieLignes:', categories.length, 'catégories');
    } else {
      console.log('❌ API CategorieLignes erreur:', categoriesResponse.status);
    }
    
    // Test API Statuts
    const statutsResponse = await fetch('http://localhost:7000/api/Statuts');
    if (statutsResponse.ok) {
      const statuts = await statutsResponse.json();
      console.log('✅ API Statuts:', statuts.length, 'statuts');
      statuts.forEach(s => console.log('   -', s.nom));
    } else {
      console.log('❌ API Statuts erreur:', statutsResponse.status);
    }
    
    // Test API CCTs
    const cctsResponse = await fetch('http://localhost:7000/api/CCTs');
    if (cctsResponse.ok) {
      const ccts = await cctsResponse.json();
      console.log('✅ API CCTs:', ccts.length, 'CCTs');
      ccts.slice(0, 3).forEach(c => console.log('   -', c.nom));
    } else {
      console.log('❌ API CCTs erreur:', cctsResponse.status);
    }
    
  } catch (error) {
    console.log('❌ Erreur lors des tests API:', error.message);
  }
}, 3000);

console.log('=== FIN DES TESTS DROPDOWNS ===');
console.log('Vérifiez la console pour les résultats...');


