import api from './api';

const historiqueAgentService = {
  // Récupérer tous les historiques
  getAll: async () => {
    try {
      const response = await api.get('/HistoriqueAgent');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des historiques:', error);
      throw error;
    }
  },

  // Récupérer un historique par ID
  getById: async (id) => {
    try {
      const response = await api.get(`/HistoriqueAgent/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'historique ${id}:`, error);
      throw error;
    }
  },

  // Récupérer l'historique d'un agent
  getByAgentId: async (agentId) => {
    try {
      const response = await api.get(`/HistoriqueAgent/agent/${agentId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'historique de l'agent ${agentId}:`, error);
      throw error;
    }
  },

  // Récupérer l'historique d'un CCT
  getByCCTId: async (cctId) => {
    try {
      const response = await api.get(`/HistoriqueAgent/cct/${cctId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'historique du CCT ${cctId}:`, error);
      throw error;
    }
  },

  // Créer un nouvel historique
  create: async (historiqueData) => {
    try {
      const response = await api.post('/HistoriqueAgent', historiqueData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'historique:', error);
      throw error;
    }
  },

  // Mettre à jour un historique
  update: async (id, historiqueData) => {
    try {
      const response = await api.put(`/HistoriqueAgent/${id}`, historiqueData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'historique ${id}:`, error);
      throw error;
    }
  },

  // Supprimer un historique
  delete: async (id) => {
    try {
      const response = await api.delete(`/HistoriqueAgent/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de l'historique ${id}:`, error);
      throw error;
    }
  }
};

export default historiqueAgentService;
