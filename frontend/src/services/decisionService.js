import api from './api';

export const decisionService = {
  // Rechercher des décisions avec filtres et pagination
  async searchDecisions(searchParams) {
    try {
      const response = await api.get('/Decisions', { params: searchParams });
      
      // Extraire les headers de pagination
      const totalCount = parseInt(response.headers['x-total-count']) || 0;
      const totalPages = parseInt(response.headers['x-page-count']) || 0;
      
      return {
        decisions: response.data,
        totalCount,
        totalPages
      };
    } catch (error) {
      console.error('Erreur lors de la recherche des décisions:', error);
      throw error;
    }
  },

  // Récupérer une décision par ID
  async getDecisionById(id) {
    try {
      const response = await api.get(`/Decisions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la décision:', error);
      throw error;
    }
  },

  // Créer une nouvelle décision
  async createDecision(decisionData) {
    try {
      const response = await api.post('/Decisions', decisionData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la décision:', error);
      throw error;
    }
  },

  // Mettre à jour une décision existante
  async updateDecision(id, decisionData) {
    try {
      // Inclure l'ID dans le corps de la requête pour la cohérence avec le backend
      const dataWithId = { ...decisionData, id: id };
      const response = await api.put(`/Decisions/${id}`, dataWithId);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la décision:', error);
      throw error;
    }
  },

  // Supprimer une décision
  async deleteDecision(id) {
    try {
      await api.delete(`/Decisions/${id}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de la décision:', error);
      throw error;
    }
  },

  // Récupérer les types de décisions
  async getDecisionTypes() {
    try {
      const response = await api.get('/TypeDecisions');
      console.log('✅ Types de décisions récupérés depuis l\'API TypeDecisions:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API TypeDecisions non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table TypeDecisions contient des données.');
      // Retourner des types par défaut en cas d'erreur (12 types comme dans la table TypeDecisions)
      return [
        'Approbation',
        'Rejet',
        'Suspension',
        'Révocation',
        'Promotion',
        'Mutation',
        'Formation',
        'Sanction',
        'Changement de nom',
        'Création',
        'Modification',
        'Récompense'
      ];
    }
  },

  // Récupérer les types d'entités
  async getEntiteTypes() {
    try {
      const response = await api.get('/TypeEntites');
      console.log('✅ Types d\'entités récupérés depuis l\'API TypeEntites:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ ERREUR: API TypeEntites non disponible.');
      console.error('Veuillez vérifier que l\'API backend est démarrée et que la table TypeEntites contient des données.');
      // Retourner des types par défaut en cas d'erreur
      return [
        'Agent',
        'Chef de centre',
        'CCT',
        'Ligne',
        'Réseau',
        'Équipement'
      ];
    }
  }
};
