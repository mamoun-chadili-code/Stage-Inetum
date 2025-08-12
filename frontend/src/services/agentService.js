import api from './api';

const agentService = {
  // Récupérer tous les agents avec filtres et pagination
  getAgents: async (filters = {}, page = 1, pageSize = 5) => {
    try {
      console.log('agentService.getAgents appelé avec:', { filters, page, pageSize });
      
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...filters
      });

      // Convertir les dates en format YYYY-MM-DD si elles existent
      if (filters.dateCAP) {
        params.set('dateCAP', filters.dateCAP);
      }
      if (filters.dateExpirationCAP) {
        params.set('dateExpirationCAP', filters.dateExpirationCAP);
      }

      console.log('Paramètres de requête:', params.toString());
      const response = await api.get(`/Agents?${params.toString()}`);
      console.log('Réponse API brute:', response);
      
      return {
        data: response.data.data || [],
        pagination: response.data.pagination || {
          totalCount: 0,
          pageCount: 0,
          currentPage: page,
          pageSize: pageSize
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des agents:', error);
      return {
        data: [],
        pagination: {
          totalCount: 0,
          pageCount: 0,
          currentPage: page,
          pageSize: pageSize
        }
      };
    }
  },

  // Récupérer un agent par ID
  getAgent: async (id) => {
    try {
      const response = await api.get(`/Agents/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'agent:', error);
      throw error;
    }
  },

  // Créer un nouvel agent
  createAgent: async (data) => {
    try {
      const payload = {
        nom: data.nom,
        prenom: data.prenom,
        cin: data.cin,
        tel: data.tel,
        mail: data.mail || '',
        cnss: data.cnss || '',
        cctId: data.cctId ? parseInt(data.cctId) : null,
        numeroCAP: data.numeroCAP,
        dateCAP: data.dateCAP ? formatDate(data.dateCAP) : null,
        dateExpirationCAP: data.dateExpirationCAP ? formatDate(data.dateExpirationCAP) : null,
        categorieCAPId: data.categorieCAPId ? parseInt(data.categorieCAPId) : null,
        statutAdministratifId: parseInt(data.statutAdministratifId),
        anneeAutorisation: parseInt(data.anneeAutorisation),
        dateAffectationCCT: data.dateAffectationCCT ? formatDate(data.dateAffectationCCT) : null,
        numDecisionRenouv: data.numDecisionRenouv || '',
        dateDecisionRenouv: data.dateDecisionRenouv ? formatDate(data.dateDecisionRenouv) : null,
        adresse: data.adresse || ''
      };

      const response = await api.post('/Agents', payload);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de l\'agent:', error);
      throw error;
    }
  },

  // Modifier un agent
  updateAgent: async (id, data) => {
    try {
      const payload = {
        nom: data.nom,
        prenom: data.prenom,
        cin: data.cin,
        tel: data.tel,
        mail: data.mail || '',
        cnss: data.cnss || '',
        cctId: data.cctId ? parseInt(data.cctId) : null,
        numeroCAP: data.numeroCAP,
        dateCAP: data.dateCAP ? formatDate(data.dateCAP) : null,
        dateExpirationCAP: data.dateExpirationCAP ? formatDate(data.dateExpirationCAP) : null,
        categorieCAPId: data.categorieCAPId ? parseInt(data.categorieCAPId) : null,
        statutAdministratifId: parseInt(data.statutAdministratifId),
        anneeAutorisation: parseInt(data.anneeAutorisation),
        dateAffectationCCT: data.dateAffectationCCT ? formatDate(data.dateAffectationCCT) : null,
        numDecisionRenouv: data.numDecisionRenouv || '',
        dateDecisionRenouv: data.dateDecisionRenouv ? formatDate(data.dateDecisionRenouv) : null,
        adresse: data.adresse || ''
      };

      const response = await api.put(`/Agents/${id}`, payload);
      return response;
    } catch (error) {
      console.error('Erreur lors de la modification de l\'agent:', error);
      throw error;
    }
  },

  // Supprimer un agent
  deleteAgent: async (id) => {
    try {
      const response = await api.delete(`/Agents/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'agent:', error);
      throw error;
    }
  },

  // Récupérer l'historique d'un agent
  getAgentHistorique: async (id) => {
    try {
      const response = await api.get(`/Agents/${id}/historique`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      throw error;
    }
  },

  // Récupérer les détails d'un agent
  getAgentDetails: async (id) => {
    try {
      const response = await api.get(`/Agents/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'agent:', error);
      throw error;
    }
  }
};

// Fonction utilitaire pour formater les dates
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export default agentService; 