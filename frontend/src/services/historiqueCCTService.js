import api from './api';

export const historiqueCCTService = {
  // Récupérer tous les historiques
  getAll: async () => {
    try {
      const response = await api.get('/HistoriqueCCTs');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des historiques CCT:', error);
      throw error;
    }
  },

  // Récupérer un historique par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/HistoriqueCCTs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique CCT:', error);
      throw error;
    }
  },

  // Récupérer les historiques par CCT
  getByCCTId: async (cctId) => {
    try {
      const response = await api.get(`/HistoriqueCCTs/cct/${cctId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des historiques par CCT:', error);
      throw error;
    }
  },

  // Créer un nouvel historique
  create: async (historiqueData) => {
    try {
      const response = await api.post('/HistoriqueCCTs', historiqueData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'historique CCT:', error);
      throw error;
    }
  },

  // Mettre à jour un historique
  update: async (id, historiqueData) => {
    try {
      const response = await api.put(`/HistoriqueCCTs/${id}`, historiqueData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'historique CCT:', error);
      throw error;
    }
  },

  // Supprimer un historique
  delete: async (id) => {
    try {
      await api.delete(`/HistoriqueCCTs/${id}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique CCT:', error);
      throw error;
    }
  }
}; 