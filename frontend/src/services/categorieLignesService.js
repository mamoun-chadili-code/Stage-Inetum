import api from './api';

export const categorieLignesService = {
  // Récupérer toutes les catégories de lignes
  getAll: async () => {
    try {
      const response = await api.get('/CategorieLignes');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories de lignes:', error);
      throw error;
    }
  },

  // Récupérer une catégorie par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/CategorieLignes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la catégorie:', error);
      throw error;
    }
  },

  // Récupérer les catégories actives
  getActive: async () => {
    try {
      const response = await api.get('/CategorieLignes');
      return response.data.filter(cat => cat.estActif);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories actives:', error);
      throw error;
    }
  }
};

export default categorieLignesService;
