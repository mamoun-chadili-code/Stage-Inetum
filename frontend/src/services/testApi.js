// Fichier de test pour vérifier la connectivité de l'API
import api from './api';
import { lignesService } from './lignesService';
import cctService from './cctService';

export const testApiConnectivity = async () => {
  console.log('🧪 Test de connectivité API...');
  
  try {
    // Test 1: Vérifier la connectivité de base
    console.log('1️⃣ Test de connectivité de base...');
    const response = await api.get('/');
    console.log('✅ Connectivité de base OK:', response.status);
    
    // Test 2: Tester la récupération des lignes
    console.log('2️⃣ Test de récupération des lignes...');
    const lignes = await lignesService.getAllLignes();
    console.log('✅ Lignes récupérées:', lignes?.length || 0, 'lignes');
    
    // Test 3: Tester la récupération des CCTs
    console.log('3️⃣ Test de récupération des CCTs...');
    const ccts = await cctService.getAllCCTs();
    console.log('✅ CCTs récupérés:', ccts?.length || 0, 'CCTs');
    
    console.log('🎉 Tous les tests API sont passés avec succès !');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors du test API:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('🔌 Erreur de connexion: Le serveur backend n\'est pas accessible');
      console.error('💡 Vérifiez que votre backend est démarré sur http://localhost:7000');
    } else if (error.response?.status === 404) {
      console.error('🔍 Erreur 404: L\'endpoint n\'existe pas');
      console.error('💡 Vérifiez que votre API backend a bien les routes /Lignes configurées');
    } else if (error.response?.status === 500) {
      console.error('💥 Erreur 500: Erreur interne du serveur');
      console.error('💡 Vérifiez les logs de votre backend');
    }
    
    return false;
  }
};

// Fonction pour tester une ligne spécifique
export const testLigneOperations = async () => {
  console.log('🧪 Test des opérations CRUD sur les lignes...');
  
  try {
    // Test de création
    console.log('1️⃣ Test de création d\'une ligne...');
    const nouvelleLigne = await lignesService.createLigne({
      numeroLigne: 999,
      cctId: 1,
      categorieId: 1,
      statutId: 1,
      dateStatut: '2024-12-01'
    });
    console.log('✅ Ligne créée:', nouvelleLigne);
    
    // Test de récupération par ID
    console.log('2️⃣ Test de récupération par ID...');
    const ligneRecuperee = await lignesService.getLigneById(nouvelleLigne.id);
    console.log('✅ Ligne récupérée:', ligneRecuperee);
    
    // Test de mise à jour
    console.log('3️⃣ Test de mise à jour...');
    const ligneModifiee = await lignesService.updateLigne(nouvelleLigne.id, {
      numeroLigne: 999,
      cctId: 1,
      categorieId: 2,
      statutId: 2,
      dateStatut: '2024-12-02'
    });
    console.log('✅ Ligne modifiée:', ligneModifiee);
    
    // Test de suppression
    console.log('4️⃣ Test de suppression...');
    await lignesService.deleteLigne(nouvelleLigne.id);
    console.log('✅ Ligne supprimée avec succès');
    
    console.log('🎉 Tous les tests CRUD sont passés avec succès !');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors du test CRUD:', error);
    return false;
  }
};

// Fonction pour afficher les informations de configuration
export const showApiConfig = () => {
  console.log('⚙️ Configuration API actuelle:');
  console.log('Base URL:', api.defaults.baseURL);
  console.log('Timeout:', api.defaults.timeout, 'ms');
  console.log('Headers:', api.defaults.headers);
};

// Export des fonctions de test
export default {
  testApiConnectivity,
  testLigneOperations,
  showApiConfig
};
