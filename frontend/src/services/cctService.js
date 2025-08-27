import api from './api';

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString || dateString === '') return null;
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;
    return date;
  } catch (error) {
    console.warn('Erreur de formatage de date:', dateString, error);
    return null;
  }
};

const cctService = {
  // Récupérer tous les CCTs pour les dropdowns
  async getCCTsForDropdown() {
    try {
      const response = await api.get('/CCTs', {
        params: {
          page: 1,
          pageSize: 1000
        }
      });
      
      return response.data.map(cct => ({
        id: cct.id,
        nom: cct.nom,
        agrement: cct.agrement
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des CCTs:', error);
      throw error;
    }
  },

  // Récupérer tous les CCTs (alias pour compatibilité)
  async getAllCCTs() {
    return this.getCCTsForDropdown();
  },

  // Récupérer un CCT par ID
  async getCCTById(id) {
    try {
      const response = await api.get(`/CCTs/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération du CCT:', error);
      throw error;
    }
  },

  // Alias pour getCCTById (pour compatibilité)
  getCCT: async function(id) {
    return this.getCCTById(id);
  },

  // Récupérer tous les CCTs avec pagination
  async getCCTs(params = {}, page = 1, pageSize = 5) {
    try {
      const response = await api.get('/CCTs', {
        params: {
          ...params,
          page,
          pageSize
        }
      });
      
      // Extraire les headers de pagination
      const totalCount = parseInt(response.headers['x-total-count'] || '0');
      const pageCount = parseInt(response.headers['x-page-count'] || '1');
      
      return {
        data: response.data,
        pagination: {
          totalCount,
          pageCount,
          currentPage: page,
          pageSize
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des CCTs:', error);
      return {
        data: [],
        pagination: {
          totalCount: 0,
          pageCount: 1,
          currentPage: 1,
          pageSize
        }
      };
    }
  },

  // Créer un nouveau CCT
  async createCCT(data) {
    try {
      console.log('=== CRÉATION CCT ===');
      console.log('Données reçues:', data);
      
      const response = await api.post('/CCTs', data);
      console.log('CCT créé avec succès');
      return response;
    } catch (error) {
      console.error('=== ERREUR CRÉATION CCT ===');
      console.error('Message d\'erreur:', error.message);
      
      if (error.response?.data?.errors) {
        const errorDetails = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('; ');
        throw new Error(`Erreur de validation: ${errorDetails}`);
      }
      
      if (error.response?.data?.title) {
        throw new Error(error.response.data.title);
      }
      
      throw new Error('Erreur lors de la création du CCT');
    }
  },

  // Mettre à jour un CCT
  async updateCCT(id, data) {
    try {
      console.log('=== MISE À JOUR CCT ===');
      console.log('ID:', id);
      console.log('Données reçues:', data);
      
      const dataWithId = { ...data, id: id };
      const response = await api.put(`/CCTs/${id}`, dataWithId);
      
      console.log('CCT mis à jour avec succès');
      return response;
    } catch (error) {
      console.error('=== ERREUR MISE À JOUR CCT ===');
      console.error('Message d\'erreur:', error.message);
      
      if (error.response?.data?.errors) {
        const errorDetails = Object.entries(error.response.data.errors)
          .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
          .join('; ');
        throw new Error(`Erreur de validation: ${errorDetails}`);
      }
      
      if (error.response?.data?.title) {
        throw new Error(error.response.data.title);
      }
      
      throw new Error('Erreur lors de la mise à jour du CCT');
    }
  },

  // Supprimer un CCT
  async deleteCCT(id) {
    try {
      console.log(`=== SUPPRESSION CCT ${id} ===`);
      
      const response = await api.delete(`/CCTs/${id}`);
      console.log('✅ CCT supprimé avec succès');
      return response.data;
      
    } catch (error) {
      console.error('❌ Erreur lors de la suppression du CCT:', error);
      
      if (error.response?.status === 500) {
        throw new Error(`Impossible de supprimer ce CCT car il est référencé par d'autres données.`);
      } else {
        throw new Error(`Erreur lors de la suppression : ${error.message || 'Erreur inconnue'}`);
      }
    }
  },

  // Récupérer les agents d'un CCT
  async getCCTAgents(id) {
    try {
      const response = await api.get(`/CCTs/${id}/agents`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des agents:', error);
      throw error;
    }
  },

  // Récupérer les chefs de centre d'un CCT
  async getCCTChefsCentres(id) {
    try {
      const response = await api.get(`/CCTs/${id}/chefs-centres`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des chefs de centre:', error);
      throw error;
    }
  },

  // Récupérer les lignes d'un CCT
  async getCCTLignes(id) {
    try {
      const response = await api.get(`/CCTs/${id}/lignes`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des lignes:', error);
      throw error;
    }
  },

  // Récupérer les équipements d'un CCT
  async getCCTEquipements(id) {
    try {
      const response = await api.get(`/CCTs/${id}/equipements`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des équipements:', error);
      throw error;
    }
  }
};

export default cctService; 