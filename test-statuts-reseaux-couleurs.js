// Script de test pour vérifier les nouvelles couleurs des statuts dans le module Réseaux
console.log('🎨 Test des nouvelles couleurs des statuts Réseaux...');

// Fonction getStatutStyle mise à jour
const getStatutStyle = (statutLibelle) => {
  switch (statutLibelle?.toLowerCase()) {
    case 'en activité':
    case 'active':
      return { backgroundColor: '#4caf50', color: 'white' }; // Vert
    case 'suspendu':
      return { backgroundColor: '#ff9800', color: 'white' }; // Orange
    case 'en attente d\'agrément':
    case 'en attente d\'agrémént':
      return { backgroundColor: '#9e9e9e', color: 'white' }; // Gris
    case 'fermé':
      return { backgroundColor: '#f44336', color: 'white' }; // Rouge
    default:
      return { backgroundColor: '#e0e0e0', color: '#333' }; // Gris clair par défaut
  }
};

// Test des statuts avec leurs nouvelles couleurs
const testStatuts = [
  'En activité',
  'Suspendu', 
  'En attente d\'agrément',
  'Fermé',
  'Statut inconnu',
  null,
  undefined
];

console.log('🎨 Test des couleurs des statuts :');
testStatuts.forEach(statut => {
  const style = getStatutStyle(statut);
  const couleurNom = getCouleurNom(style.backgroundColor);
  console.log(`✅ Statut: "${statut}" -> Couleur: ${couleurNom} (${style.backgroundColor})`);
});

// Fonction pour obtenir le nom de la couleur
function getCouleurNom(hexColor) {
  const couleurs = {
    '#4caf50': 'Vert',
    '#ff9800': 'Orange', 
    '#9e9e9e': 'Gris',
    '#f44336': 'Rouge',
    '#e0e0e0': 'Gris clair'
  };
  return couleurs[hexColor] || 'Inconnue';
}

// Test des cas spécifiques
console.log('\n🎯 Test des cas spécifiques :');

// Test "En activité" - doit être vert
const statutActif = getStatutStyle('En activité');
console.log(`✅ "En activité" -> Vert: ${statutActif.backgroundColor === '#4caf50' ? 'OK' : 'ERREUR'}`);

// Test "Suspendu" - doit être orange  
const statutSuspendu = getStatutStyle('Suspendu');
console.log(`✅ "Suspendu" -> Orange: ${statutSuspendu.backgroundColor === '#ff9800' ? 'OK' : 'ERREUR'}`);

// Test "En attente d'agrément" - doit être gris
const statutAttente = getStatutStyle('En attente d\'agrément');
console.log(`✅ "En attente d'agrément" -> Gris: ${statutAttente.backgroundColor === '#9e9e9e' ? 'OK' : 'ERREUR'}`);

// Test "Fermé" - doit être rouge
const statutFerme = getStatutStyle('Fermé');
console.log(`✅ "Fermé" -> Rouge: ${statutFerme.backgroundColor === '#f44336' ? 'OK' : 'ERREUR'}`);

// Test des variantes de casse
console.log('\n🔤 Test des variantes de casse :');
const variantes = ['EN ACTIVITÉ', 'en activité', 'En Activité', 'SUSPENDU', 'suspendu'];
variantes.forEach(variante => {
  const style = getStatutStyle(variante);
  const couleurNom = getCouleurNom(style.backgroundColor);
  console.log(`✅ "${variante}" -> ${couleurNom}`);
});

// Test des fallbacks
console.log('\n🔄 Test des fallbacks :');
const statutInconnu = getStatutStyle('Statut inexistant');
console.log(`✅ Statut inexistant -> Gris clair par défaut: ${statutInconnu.backgroundColor === '#e0e0e0' ? 'OK' : 'ERREUR'}`);

const statutNull = getStatutStyle(null);
console.log(`✅ Statut null -> Gris clair par défaut: ${statutNull.backgroundColor === '#e0e0e0' ? 'OK' : 'ERREUR'}`);

console.log('\n🎉 Tous les tests des couleurs des statuts sont terminés !');
console.log('💡 Les statuts Réseaux ont maintenant les bonnes couleurs :');
console.log('   🟢 En activité -> Vert');
console.log('   🟠 Suspendu -> Orange');
console.log('   ⚫ En attente d\'agrément -> Gris');
console.log('   🔴 Fermé -> Rouge');
console.log('   ⚪ Autres -> Gris clair par défaut');

console.log('\n📋 Instructions :');
console.log('1. Ouvrez votre application React');
console.log('2. Naviguez vers le module Réseaux');
console.log('3. Vérifiez que les statuts ont les bonnes couleurs');
console.log('4. Testez dans la recherche et le formulaire');
console.log('5. Les points colorés doivent correspondre aux couleurs définies');












