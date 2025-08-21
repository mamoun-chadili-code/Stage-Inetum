// Script de test pour l'upload des logos
const testUpload = async () => {
  try {
    // Créer un fichier de test simple
    const testFile = new File(['test'], 'test.png', { type: 'image/png' });
    
    // Créer le FormData
    const formData = new FormData();
    formData.append('file', testFile);
    formData.append('reseauId', '1');
    
    console.log('Test d\'upload du logo...');
    
    // Appeler l'API
    const response = await fetch('http://localhost:7000/api/Logos/upload', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Upload réussi:', result);
    } else {
      const errorText = await response.text();
      console.error('❌ Erreur upload:', response.status, errorText);
    }
  } catch (error) {
    console.error('❌ Erreur:', error);
  }
};

// Exécuter le test
testUpload();


