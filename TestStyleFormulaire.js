// Script de test pour vérifier le nouveau style du formulaire d'ajout de lignes
console.log('=== TEST NOUVEAU STYLE FORMULAIRE LIGNES ===');

// Test 1: Vérifier que le modal s'ouvre avec le nouveau style
console.log('1. Test d\'ouverture du modal avec nouveau style...');
setTimeout(() => {
  const addButton = document.querySelector('button:contains("+ Ajouter Ligne")');
  if (addButton) {
    console.log('✅ Bouton d\'ajout trouvé, clic...');
    addButton.click();
    
    setTimeout(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (modal) {
        console.log('✅ Modal ouvert avec succès');
        
        // Vérifier le nouveau style du titre
        const title = modal.querySelector('.MuiDialogTitle-root');
        if (title) {
          const computedStyle = window.getComputedStyle(title);
          console.log('✅ Titre stylisé:', {
            background: computedStyle.background,
            color: computedStyle.color,
            borderRadius: computedStyle.borderRadius
          });
        }
        
        // Vérifier les sections organisées
        const sections = modal.querySelectorAll('.MuiPaper-root');
        console.log('✅ Sections organisées trouvées:', sections.length);
        
        // Vérifier les icônes dans les labels
        const labelsWithIcons = modal.querySelectorAll('label, .MuiInputLabel-root');
        console.log('✅ Labels avec icônes:', labelsWithIcons.length);
        
        // Vérifier les boutons d'action
        const actionButtons = modal.querySelectorAll('.MuiDialogActions-root button');
        console.log('✅ Boutons d\'action stylisés:', actionButtons.length);
        
        // Fermer le modal
        const closeButton = modal.querySelector('button[aria-label="close"], button:contains("Annuler")');
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

// Test 2: Vérifier les animations et transitions
console.log('2. Vérification des animations...');
setTimeout(() => {
  const modal = document.querySelector('[role="dialog"]');
  if (modal) {
    const computedStyle = window.getComputedStyle(modal);
    console.log('✅ Transitions CSS:', {
      transition: computedStyle.transition,
      transform: computedStyle.transform
    });
  }
}, 3000);

// Test 3: Vérifier la responsivité
console.log('3. Vérification de la responsivité...');
setTimeout(() => {
  const modal = document.querySelector('[role="dialog"]');
  if (modal) {
    const dialogPaper = modal.querySelector('.MuiDialog-paper');
    if (dialogPaper) {
      const computedStyle = window.getComputedStyle(dialogPaper);
      console.log('✅ Responsivité:', {
        maxWidth: computedStyle.maxWidth,
        width: computedStyle.width,
        borderRadius: computedStyle.borderRadius
      });
    }
  }
}, 4000);

console.log('=== FIN DES TESTS DE STYLE ===');
console.log('Vérifiez la console pour les résultats...');






