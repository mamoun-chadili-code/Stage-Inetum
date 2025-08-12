import api from './api';

// Service pour la gestion des entités géographiques
export const geographieService = {
  // Récupérer toutes les régions depuis la base de données
  async getAllRegions() {
    try {
      console.log('Tentative de récupération des régions depuis la base de données...');
      const response = await api.get('/Regions', {
        params: {
          page: 1,
          pageSize: 1000 // Récupérer toutes les régions
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        // Trier les régions par ordre alphabétique
        const sortedRegions = response.data.sort((a, b) => 
          a.libelle.localeCompare(b.libelle, 'fr')
        );
        
        console.log(`${sortedRegions.length} régions récupérées depuis la base de données:`, sortedRegions);
        return sortedRegions;
      } else {
        console.warn('Format de réponse inattendu pour les régions:', response);
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des régions depuis la base de données:', error);
      
      // En cas d'erreur, retourner un tableau vide pour éviter les erreurs
      return [];
    }
  },

  // Récupérer toutes les villes depuis la base de données
  async getAllVilles() {
    try {
      console.log('Tentative de récupération des villes depuis la base de données...');
      const response = await api.get('/Villes', {
        params: {
          page: 1,
          pageSize: 1000 // Récupérer toutes les villes
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        // Trier les villes par ordre alphabétique
        const sortedVilles = response.data.sort((a, b) => 
          a.nom.localeCompare(b.nom, 'fr')
        );
        
        console.log(`${sortedVilles.length} villes récupérées depuis la base de données:`, sortedVilles);
        return sortedVilles;
      } else {
        console.warn('Format de réponse inattendu pour les villes:', response);
        return [];
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des villes depuis la base de données:', error);
      
      // En cas d'erreur, retourner un tableau vide pour éviter les erreurs
      return [];
    }
  },

  // Récupérer les villes d'une région spécifique
  async getVillesByRegion(regionId) {
    try {
      console.log(`Tentative de récupération des villes de la région ${regionId}...`);
      const response = await api.get(`/Villes`, {
        params: {
          regionId: regionId,
          page: 1,
          pageSize: 1000
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        const sortedVilles = response.data.sort((a, b) => 
          a.nom.localeCompare(b.nom, 'fr')
        );
        
        console.log(`${sortedVilles.length} villes trouvées pour la région ${regionId}:`, sortedVilles);
        return sortedVilles;
      } else {
        console.warn('Format de réponse inattendu pour les villes par région:', response);
        return [];
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération des villes de la région ${regionId}:`, error);
      return [];
    }
  },

  // Récupérer une région par ID
  async getRegionById(id) {
    try {
      const response = await api.get(`/Regions/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la région ${id}:`, error);
      return null;
    }
  },

  // Récupérer une ville par ID
  async getVilleById(id) {
    try {
      const response = await api.get(`/Villes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la ville ${id}:`, error);
      return null;
    }
  },

  // Rechercher des régions par nom
  async searchRegions(searchTerm) {
    try {
      const response = await api.get('/Regions', {
        params: {
          search: searchTerm,
          page: 1,
          pageSize: 50
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        return response.data.sort((a, b) => 
          a.libelle.localeCompare(b.libelle, 'fr')
        );
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la recherche de régions:', error);
      return [];
    }
  },

  // Rechercher des villes par nom
  async searchVilles(searchTerm) {
    try {
      const response = await api.get('/Villes', {
        params: {
          search: searchTerm,
          page: 1,
          pageSize: 50
        }
      });
      
      if (response.data && Array.isArray(response.data)) {
        return response.data.sort((a, b) => 
          a.nom.localeCompare(b.nom, 'fr')
        );
      }
      return [];
    } catch (error) {
      console.error('Erreur lors de la recherche de villes:', error);
      return [];
    }
  },

  // Vérifier la connectivité de l'API
  async checkApiConnectivity() {
    try {
      const response = await api.get('/Regions', { timeout: 5000 });
      return {
        connected: true,
        regionsCount: response.data?.length || 0,
        message: 'API géographique accessible'
      };
    } catch (error) {
      return {
        connected: false,
        regionsCount: 0,
        message: `API géographique non accessible: ${error.message}`,
        error: error
      };
    }
  }
};

export default geographieService;

