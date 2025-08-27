// Script de test pour vérifier la fonctionnalité d'ajout de lignes
console.log('=== TEST FONCTIONNALITÉ AJOUT DE LIGNES ===');

// Test 1: Vérifier que le composant Lignes est chargé
console.log('1. Vérification du composant Lignes...');
if (typeof Lignes !== 'undefined') {
  console.log('✅ Composant Lignes chargé');
} else {
  console.log('❌ Composant Lignes non chargé');
}

// Test 2: Vérifier que le service ligneService est disponible
console.log('2. Vérification du service ligneService...');
if (typeof ligneService !== 'undefined') {
  console.log('✅ Service ligneService disponible');
  
  // Test des méthodes du service
  console.log('   - createLigne:', typeof ligneService.createLigne);
  console.log('   - updateLigne:', typeof ligneService.updateLigne);
  console.log('   - deleteLigne:', typeof ligneService.deleteLigne);
  console.log('   - searchLignes:', typeof ligneService.searchLignes);
} else {
  console.log('❌ Service ligneService non disponible');
}

// Test 3: Vérifier que les dropdowns sont chargés
console.log('3. Vérification des dropdowns...');
setTimeout(() => {
  const categoriesSelect = document.querySelector('select[name="categorieId"]');
  const cctsSelect = document.querySelector('select[name="cctId"]');
  const statutsSelect = document.querySelector('select[name="statutId"]');
  
  if (categoriesSelect) {
    console.log('✅ Select catégories trouvé, options:', categoriesSelect.children.length);
  } else {
    console.log('❌ Select catégories non trouvé');
  }
  
  if (cctsSelect) {
    console.log('✅ Select CCTs trouvé, options:', cctsSelect.children.length);
  } else {
    console.log('❌ Select CCTs non trouvé');
  }
  
  if (statutsSelect) {
    console.log('✅ Select statuts trouvé, options:', statutsSelect.children.length);
  } else {
    console.log('❌ Select statuts non trouvé');
  }
}, 2000);

// Test 4: Vérifier que le bouton d'ajout est présent
console.log('4. Vérification du bouton d\'ajout...');
setTimeout(() => {
  const addButton = document.querySelector('button[aria-label*="ajouter"], button:contains("+ AJOUTER LIGNE")');
  if (addButton) {
    console.log('✅ Bouton d\'ajout trouvé:', addButton.textContent);
  } else {
    console.log('❌ Bouton d\'ajout non trouvé');
  }
}, 2000);

// Test 5: Vérifier que le modal de formulaire s'ouvre
console.log('5. Test d\'ouverture du modal...');
setTimeout(() => {
  const addButton = document.querySelector('button[aria-label*="ajouter"], button:contains("+ AJOUTER LIGNE")');
  if (addButton) {
    console.log('   - Clic sur le bouton d\'ajout...');
    addButton.click();
    
    setTimeout(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (modal) {
        console.log('✅ Modal ouvert avec succès');
        
        // Vérifier les champs du formulaire
        const numeroLigneField = modal.querySelector('input[name="numeroLigne"]');
        const categorieField = modal.querySelector('select[name="categorieId"]');
        const cctField = modal.querySelector('select[name="cctId"]');
        const statutField = modal.querySelector('select[name="statutId"]');
        
        console.log('   - Champ numéro ligne:', !!numeroLigneField);
        console.log('   - Champ catégorie:', !!categorieField);
        console.log('   - Champ CCT:', !!cctField);
        console.log('   - Champ statut:', !!statutField);
        
        // Fermer le modal
        const closeButton = modal.querySelector('button[aria-label="close"], button:contains("Annuler")');
        if (closeButton) {
          closeButton.click();
          console.log('   - Modal fermé');
        }
      } else {
        console.log('❌ Modal non ouvert');
      }
    }, 1000);
  }
}, 3000);

console.log('=== FIN DES TESTS ===');
console.log('Vérifiez la console pour les résultats...');









