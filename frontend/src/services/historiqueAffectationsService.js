import api from './api';

export const historiqueAffectationsService = {
  // Récupérer tous les historiques
  getAll: async () => {
    try {
      const response = await api.get('/HistoriqueAffectations');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des historiques d\'affectation:', error);
      throw error;
    }
  },

  // Récupérer un historique par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/HistoriqueAffectations/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique d\'affectation:', error);
      throw error;
    }
  },

  // Récupérer les historiques par Agent
  getByAgentId: async (agentId) => {
    try {
      const response = await api.get(`/HistoriqueAffectations/agent/${agentId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des historiques par agent:', error);
      throw error;
    }
  },

  // Récupérer les historiques par Chef de Centre
  getByChefCentreId: async (chefCentreId) => {
    try {
      const response = await api.get(`/HistoriqueAffectations/chefcentre/${chefCentreId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des historiques par chef de centre:', error);
      throw error;
    }
  },

  // Récupérer les historiques par CCT
  getByCCTId: async (cctId) => {
    try {
      const response = await api.get(`/HistoriqueAffectations/cct/${cctId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des historiques par CCT:', error);
      throw error;
    }
  },

  // Créer un nouvel historique
  create: async (historiqueData) => {
    try {
      const response = await api.post('/HistoriqueAffectations', historiqueData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'historique d\'affectation:', error);
      throw error;
    }
  },

  // Mettre à jour un historique
  update: async (id, historiqueData) => {
    try {
      const response = await api.put(`/HistoriqueAffectations/${id}`, historiqueData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'historique d\'affectation:', error);
      throw error;
    }
  },

  // Supprimer un historique
  delete: async (id) => {
    try {
      await api.delete(`/HistoriqueAffectations/${id}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique d\'affectation:', error);
      throw error;
    }
  }
};
