import api from './api';

const historiqueCCTService = {
  /**
   * Récupère l'historique d'un CCT
   * @param {number} cctId - ID du CCT
   * @returns {Promise<Array>} - Historique du CCT
   */
  async getHistoriqueCCT(cctId) {
    try {
      const response = await api.get(`/CCTs/${cctId}/historique`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      // Retourner un tableau vide en cas d'erreur
      return [];
    }
  },

  /**
   * Récupère l'historique des ralliements d'un CCT
   * @param {number} cctId - ID du CCT
   * @returns {Promise<Array>} - Historique des ralliements
   */
  async getHistoriqueRalliements(cctId) {
    try {
      const response = await api.get(`/CCTs/${cctId}/ralliements`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des ralliements:', error);
      // Retourner un tableau vide en cas d'erreur
      return [];
    }
  },

  /**
   * Récupère l'historique des statuts d'un CCT
   * @param {number} cctId - ID du CCT
   * @returns {Promise<Array>} - Historique des statuts
   */
  async getHistoriqueStatuts(cctId) {
    try {
      const response = await api.get(`/CCTs/${cctId}/statuts`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statuts:', error);
      // Retourner un tableau vide en cas d'erreur
      return [];
    }
  }
};

export default historiqueCCTService; 