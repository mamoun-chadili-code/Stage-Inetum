import api from './api';

const chefCentreService = {
  // Récupérer la liste des chefs de centre avec filtres et pagination
  getChefsCentre: async (filters = {}, page = 1, pageSize = 10) => {
    try {
      const response = await api.get('/ChefsCentre', {
        params: {
          page,
          pageSize,
          regionId: filters.regionId || '',
          villeId: filters.villeId || '',
          reseauId: filters.reseauId || '',
          cctId: filters.CCTId || filters.cctId || '',
          niveauFormationId: filters.niveauFormationId || '',
          anneeAffectation: filters.anneeAffectation || ''
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
      console.error('Erreur lors de la récupération des chefs de centre:', error);
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

  // Récupérer un chef de centre par ID
  getChefCentre: (id) => api.get(`/ChefsCentre/${id}`),

  // Créer un nouveau chef de centre
  createChefCentre: (data) => api.post('/ChefsCentre', data),

  // Modifier un chef de centre
  updateChefCentre: async (id, data) => {
    const response = await api.put(`/ChefsCentre/${id}`, data);
    return response;
  },

  // Supprimer un chef de centre
  deleteChefCentre: (id) => api.delete(`/ChefsCentre/${id}`),

  // Récupérer l'historique d'un chef de centre
  getChefCentreHistorique: (id) => api.get(`/ChefsCentre/${id}/historique`),

  // Récupérer les détails complets d'un chef de centre avec son historique
  getChefCentreDetails: async (id) => {
    try {
      // Récupérer les informations du chef de centre
      const chefCentreResponse = await api.get(`/ChefsCentre/${id}`);
      const chefCentre = chefCentreResponse.data;

      // Récupérer l'historique du chef de centre
      const historiqueResponse = await api.get(`/ChefsCentre/${id}/historique`);
      const historique = historiqueResponse.data;

      // Combiner les données
      return {
        data: {
          ...chefCentre,
          historique: historique
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du chef de centre:', error);
      throw error;
    }
  }
};

export default chefCentreService; 