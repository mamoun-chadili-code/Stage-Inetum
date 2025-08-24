import api from './api';

// Service pour les dropdowns dynamiques
export const dropdownsService = {
  // Récupérer les statuts
  async getStatuts() {
    try {
      const response = await api.get('/Statuts');
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API Statuts non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table Statuts contient des données.');
      throw new Error('API Statuts non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les villes
  async getVilles() {
    try {
      console.log('Tentative de récupération des villes depuis l\'API...');
      const response = await api.get('/Villes');
      console.log('Villes récupérées depuis l\'API:', response.data);
      // Trier les villes par ordre alphabétique
      const sortedVilles = response.data.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
      return sortedVilles;
    } catch (error) {
      console.error('❌ ERREUR: API Villes non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table Villes contient des données.');
      throw new Error('API Villes non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les cadres d'autorisation
  async getCadresAutorisation() {
    try {
      const response = await api.get('/CadresAutorisation');
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API CadresAutorisation non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table CadresAutorisation contient des données.');
      throw new Error('API CadresAutorisation non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les régions
  async getRegions() {
    try {
      console.log('Tentative de récupération des régions depuis l\'API...');
      const response = await api.get('/Regions');
      console.log('Régions récupérées depuis l\'API:', response.data);
      // Trier les régions par ordre alphabétique
      const sortedRegions = response.data.sort((a, b) => a.libelle.localeCompare(b.libelle, 'fr'));
      return sortedRegions;
    } catch (error) {
      console.error('❌ ERREUR: API Regions non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table Regions contient des données.');
      throw new Error('API Regions non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les réseaux
  async getReseaux() {
    try {
      console.log('Tentative de récupération des réseaux depuis l\'API...');
      const response = await api.get('/Reseaux');
      console.log('Réseaux récupérés depuis l\'API:', response.data);
      // Trier les réseaux par ordre alphabétique
      const sortedReseaux = response.data.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
      return sortedReseaux;
    } catch (error) {
      console.error('❌ ERREUR: API Reseaux non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table Reseaux contient des données.');
      throw new Error('API Reseaux non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les catégories CCT
  async getCategoriesCCT() {
    try {
      const response = await api.get('/CategorieCCTs');
      console.log('✅ Catégories CCT récupérées depuis l\'API:', response.data);
      // Trier les catégories par ordre alphabétique
      const sortedCategories = response.data.sort((a, b) => a.libelle.localeCompare(b.libelle, 'fr'));
      return sortedCategories;
    } catch (error) {
      console.error('❌ ERREUR: API CategorieCCTs non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table CategorieCCTs contient des données.');
      throw new Error('API CategorieCCTs non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les statuts des réseaux
  async getStatutsRC() {
    try {
      const response = await api.get('/Statuts'); // Changé de /StatutRCs à /Statuts
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API Statuts non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table Statuts contient des données.');
      throw new Error('API Statuts non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les types CTT
  async getTypesCTT() {
    try {
      const response = await api.get('/TypeCTTs');
      console.log('✅ Types CTT récupérés depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API TypeCTTs non disponible. Aucune donnée mockée configurée.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table TypeCTTs contient des données.');
      throw new Error('API TypeCTTs non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les statuts CCT
  async getStatutsCCT() {
    try {
      const response = await api.get('/StatutCCTs');
      console.log('✅ Statuts CCT récupérés depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API StatutCCTs non disponible. Aucune donnée mockée configurée.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table StatutCCTs contient des données.');
      console.error('Si la table n\'existe pas, exécutez d\'abord le script SQL de création.');
      throw new Error('API StatutCCTs non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les provinces
  async getProvinces() {
    try {
      const response = await api.get('/Provinces');
      
      // Déduplication des provinces pour éviter les doublons
      const uniqueProvinces = response.data.reduce((acc, current) => {
        const x = acc.find(item => 
          item.libelle?.toLowerCase() === current.libelle?.toLowerCase() ||
          item.code?.toLowerCase() === current.code?.toLowerCase()
        );
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      
      // Trier les provinces par ordre alphabétique
      const sortedProvinces = uniqueProvinces.sort((a, b) => a.libelle.localeCompare(b.libelle, 'fr'));
      
      console.log(`Provinces récupérées: ${response.data.length}, après déduplication: ${sortedProvinces.length}`);
      
      return sortedProvinces;
    } catch (error) {
      console.warn('API Provinces non disponible, utilisation des données mockées');
      // return this.MOCK_PROVINCES; // Supprimé
    }
  },

  // Récupérer les statuts de ligne
  async getStatutsLigne() {
    try {
      const response = await api.get('/Statuts'); // Changé de /StatutLignes à /Statuts
      return response.data;
    } catch (error) {
      console.warn('API Statuts non disponible, utilisation des données mockées:', error.message);
      // return this.MOCK_STATUTS_LIGNE; // Supprimé
    }
  },

  // Récupérer les niveaux de formation
  async getNiveauxFormation() {
    try {
      console.log('Tentative de récupération des niveaux de formation depuis l\'API...');
      const response = await api.get('/NiveauxFormation');
      console.log('Niveaux de formation récupérés depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.warn('API NiveauxFormation non disponible, utilisation des données mockées:', error.message);
      // console.log('Utilisation des niveaux de formation mockés:', this.MOCK_NIVEAUX_FORMATION); // Supprimé
      return []; // Retourner un tableau vide en cas d'erreur
    }
  },

  // Récupérer les statuts administratifs
  async getStatutsAdministratifs() {
    try {
      console.log('Tentative de récupération des statuts administratifs depuis l\'API...');
      const response = await api.get('/StatutsAdministratifs');
      console.log('✅ Statuts administratifs récupérés depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API StatutsAdministratifs non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table StatutAdministratifs contient des données.');
      throw new Error('API StatutsAdministratifs non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les types CCT
  async getTypesCCT() {
    try {
      const response = await api.get('/TypeCTTs');
      console.log('✅ Types CCT récupérés depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API TypeCTTs non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table TypeCTTs contient des données.');
      throw new Error('API TypeCTTs non disponible - Aucune donnée de fallback');
    }
  },

  // Récupérer les catégories (pour compatibilité)
  async getCategories() {
    return this.getCategoriesLignes();
  },

  // Récupérer les catégories de lignes
  async getCategoriesLignes() {
    try {
      const response = await api.get('/CategorieLignes');
      console.log('✅ Catégories de lignes récupérées depuis l\'API CategorieLignes:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des catégories depuis l\'API CategorieLignes:', error.message);
      throw new Error('Impossible de récupérer les catégories depuis la base de données. Vérifiez que l\'endpoint /CategorieLignes est configuré.');
    }
  },

  // Récupérer les CCTs
  async getCCTs() {
    try {
      console.log('Tentative de récupération des CCTs depuis l\'API...');
      const response = await api.get('/CCTs');
      console.log('CCTs récupérés depuis l\'API:', response.data);
      // Gérer le format paginé de l'API
      const result = response.data.data || response.data;
      console.log('CCTs traités:', result);
      return result;
    } catch (error) {
      console.warn('API CCTs non disponible, utilisation des données mockées:', error.message);
      // console.log('Utilisation des CCTs mockés:', this.MOCK_CCTS); // Supprimé
      return []; // Retourner un tableau vide en cas d'erreur
    }
  },

  // Récupérer les chefs de centre
  async getChefsCentre() {
    try {
      console.log('Tentative de récupération des chefs de centre depuis l\'API...');
      const response = await api.get('/ChefsCentre');
      console.log('Chefs de centre récupérés depuis l\'API:', response.data);
      // Gérer le format paginé de l'API
      return response.data.data || response.data;
    } catch (error) {
      console.warn('API ChefsCentre non disponible, utilisation des données mockées:', error.message);
      // console.log('Utilisation des chefs de centre mockés:', this.MOCK_CHEFS_CENTRE); // Supprimé
      return []; // Retourner un tableau vide en cas d'erreur
    }
  },

  // Récupérer les agents
  async getAgents() {
    try {
      console.log('Tentative de récupération des agents depuis l\'API...');
      const response = await api.get('/Agents');
      console.log('Agents récupérés depuis l\'API:', response.data);
      // Gérer le format paginé de l'API
      return response.data.data || response.data;
    } catch (error) {
      console.warn('API Agents non disponible, utilisation des données mockées:', error.message);
      // console.log('Utilisation des agents mockés:', this.MOCK_AGENTS); // Supprimé
      return []; // Retourner un tableau vide en cas d'erreur
    }
  },

  // Récupérer les types de formation
  async getTypesFormation() {
    try {
      const response = await api.get('/Formations/types');
      return response.data;
    } catch (error) {
      console.warn('API TypesFormation non disponible, utilisation des données mockées');
      // return this.MOCK_TYPES_FORMATION; // Supprimé
      return []; // Retourner un tableau vide en cas d'erreur
    }
  },

  // Récupérer les catégories CAP
  async getCategoriesCAP() {
    try {
      console.log('Tentative de récupération des catégories CAP depuis l\'API...');
      const response = await api.get('/CategorieCAPs');
      console.log('Catégories CAP récupérées depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des catégories CAP depuis l\'API:', error.message);
      throw new Error('Impossible de récupérer les catégories CAP depuis la base de données. Vérifiez que l\'endpoint /CategorieCAPs est configuré.');
    }
  },

  // Récupérer les statuts des lignes
  async getStatutLignes() {
    try {
      console.log('Tentative de récupération des statuts de lignes depuis l\'API...');
      const response = await api.get('/StatutLignes');
      console.log('✅ Statuts de lignes récupérés depuis l\'API:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API StatutLignes non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table StatutLignes contient des données.');
      throw new Error('API StatutLignes non disponible - Aucune donnée de fallback');
    }
  },

         // Fonction pour charger les vraies catégories depuis la base de données
       async loadCategoriesFromDB() {
         try {
           const response = await api.get('/CategorieLignes');
           console.log('✅ Catégories chargées depuis la DB:', response.data);
           return response.data;
         } catch (error) {
           console.error('❌ Erreur lors du chargement des catégories depuis la DB:', error);
           throw new Error('Impossible de charger les catégories depuis la base de données. Vérifiez que l\'endpoint /CategorieLignes est configuré.');
         }
       },

         // Fonction pour charger les vraies catégories depuis la base de données
       async loadStatutsFromDB() {
         try {
           const response = await api.get('/StatutLignes');
           console.log('🚨 Statuts chargés depuis la DB:', response.data);
           return response.data;
         } catch (error) {
           console.error('🚨 Erreur lors du chargement des statuts depuis la DB:', error);
           console.log('🚨 Utilisation des données mock en fallback');
           return []; // Retourner un tableau vide en cas d'erreur
         }
       },

  // Récupérer les décisions
  async getDecisions() {
    try {
      const response = await api.get('/Decisions');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des décisions:', error);
      // Retourner des données mockées en cas d'erreur
      return [
        { id: 1, nom: 'Approbation', description: 'Décision d\'approbation' },
        { id: 2, nom: 'Rejet', description: 'Décision de rejet' },
        { id: 3, nom: 'Suspension', description: 'Décision de suspension' },
        { id: 4, nom: 'En attente', description: 'Décision en attente' }
      ];
    }
  },

  // Récupérer toutes les données des dropdowns en une fois
  async getAllDropdowns() {
    const [regions, provinces, villes, reseaux, categories, statuts, types, cadresAutorisation, statutsAdministratifs, ccts] = await Promise.all([
      this.getRegions(),
      this.getProvinces(),
      this.getVilles(),
      this.getReseaux(),
      this.getCategoriesCCT(),
      this.getStatuts(), // Changé de getStatutsRC() à getStatuts()
      this.getTypesCTT(),
      this.getCadresAutorisation(),
      this.getStatutsAdministratifs(),
      this.getCCTs()
    ]);

    return { regions, provinces, villes, reseaux, categories, statuts, types, cadresAutorisation, statutsAdministratifs, ccts };
  }
};

export default dropdownsService; 