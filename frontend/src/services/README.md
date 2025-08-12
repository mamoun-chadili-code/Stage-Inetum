# Services Backend - Configuration et Utilisation

## 🚀 **Services Disponibles**

### 1. **lignesService** - Gestion des Lignes
- `getAllLignes()` - Récupérer toutes les lignes
- `getLigneById(id)` - Récupérer une ligne par ID
- `createLigne(ligneData)` - Créer une nouvelle ligne
- `updateLigne(id, ligneData)` - Mettre à jour une ligne existante
- `deleteLigne(id)` - Supprimer une ligne
- `searchLignes(filters)` - Rechercher des lignes avec filtres
- `getLignesPaginated(page, pageSize, filters)` - Récupérer des lignes avec pagination

### 2. **cctService** - Gestion des CCTs
- `getAllCCTs()` - Récupérer tous les CCTs

### 3. **reseauxService** - Gestion des Réseaux
- `getAllReseaux()` - Récupérer tous les réseaux

### 4. **dropdownsService** - Données de référence
- `MOCK_REGIONS` - Régions disponibles
- `MOCK_VILLES` - Villes disponibles
- `MOCK_CATEGORIES` - Catégories de lignes
- `MOCK_STATUTS` - Statuts des lignes

## ⚙️ **Configuration**

### URL de l'API Backend
L'URL de l'API est configurée dans `api.js` :
```javascript
baseURL: 'https://localhost:54875/api'
```

### Modification de l'URL
Pour changer l'URL de l'API, modifiez le fichier `frontend/src/services/api.js` :
```javascript
const api = axios.create({
  baseURL: 'VOTRE_NOUVELLE_URL_API',
  // ... autres configurations
});
```

## 🔧 **Utilisation dans les Composants**

### Import du Service
```javascript
import { lignesService } from '../../services/lignesService';
```

### Exemple d'Utilisation
```javascript
// Charger toutes les lignes
const lignes = await lignesService.getAllLignes();

// Créer une nouvelle ligne
const nouvelleLigne = await lignesService.createLigne({
  numeroLigne: 1,
  cctId: 1,
  categorieId: 1,
  statutId: 1,
  dateStatut: '2024-01-01'
});

// Supprimer une ligne
await lignesService.deleteLigne(1);
```

## 📊 **Structure des Données**

### Ligne
```javascript
{
  id: number,
  numeroLigne: number,
  categorie: string,
  cct: string,
  statut: string,
  dateStatut: string,
  decision: string,
  decisionDate: string,
  region: string,
  ville: string,
  reseau: string
}
```

### Données de Formulaire
```javascript
{
  cctId: number,
  numeroLigne: number,
  categorieId: number,
  statutId: number,
  dateStatut: string
}
```

## 🚨 **Gestion des Erreurs**

Le service `api.js` inclut des intercepteurs pour :
- Logger toutes les requêtes et réponses
- Gérer les erreurs HTTP (401, 403, 404, 500)
- Afficher des messages d'erreur appropriés

## 🔄 **Mise à Jour des Données**

Après chaque opération CRUD (Create, Read, Update, Delete), les données sont automatiquement rechargées depuis le serveur pour garantir la cohérence.

## 📝 **Notes Importantes**

1. **Persistance** : Toutes les modifications sont maintenant persistantes dans la base de données
2. **Synchronisation** : Les données sont synchronisées entre le frontend et le backend
3. **Gestion d'état** : L'état local est mis à jour après chaque opération réussie
4. **Feedback utilisateur** : Des notifications toast sont affichées pour chaque action

