import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api';

export const dashboardService = {
  // Récupérer toutes les statistiques du dashboard
  async getDashboardStats() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/stats`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  },

  // Récupérer le nombre total de CCTs
  async getTotalCCTs() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/ccts/count`);
      return response.data.count;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de CCTs:', error);
      return 0;
    }
  },

  // Récupérer le nombre total d'agents
  async getTotalAgents() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/agents/count`);
      return response.data.count;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre d\'agents:', error);
      return 0;
    }
  },

  // Récupérer le nombre total de chefs de centre
  async getTotalChefsCentre() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/chefs-centre/count`);
      return response.data.count;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de chefs de centre:', error);
      return 0;
    }
  },

  // Récupérer le nombre total de lignes
  async getTotalLignes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/lignes/count`);
      return response.data.count;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de lignes:', error);
      return 0;
    }
  },

  // Récupérer le nombre total de formations
  async getTotalFormations() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/formations/count`);
      return response.data.count;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de formations:', error);
      return 0;
    }
  },

  // Récupérer le nombre total d'équipements
  async getTotalEquipements() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/equipements/count`);
      return response.data.count;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre d\'équipements:', error);
      return 0;
    }
  },

  // Récupérer le nombre total de décisions
  async getTotalDecisions() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/decisions/count`);
      return response.data.count;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de décisions:', error);
      return 0;
    }
  },

  // Récupérer le nombre total de réseaux
  async getTotalReseaux() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/reseaux/count`);
      return response.data.count;
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de réseaux:', error);
      return 0;
    }
  },

  // Récupérer les statistiques en temps réel
  async getRealTimeStats() {
    try {
      const [
        cctsCount,
        agentsCount,
        chefsCentreCount,
        lignesCount,
        formationsCount,
        equipementsCount,
        decisionsCount,
        reseauxCount
      ] = await Promise.all([
        this.getTotalCCTs(),
        this.getTotalAgents(),
        this.getTotalChefsCentre(),
        this.getTotalLignes(),
        this.getTotalFormations(),
        this.getTotalEquipements(),
        this.getTotalDecisions(),
        this.getTotalReseaux()
      ]);

      return {
        totalCCTs: cctsCount,
        totalAgents: agentsCount,
        totalChefsCentre: chefsCentreCount,
        totalLignes: lignesCount,
        totalFormations: formationsCount,
        totalEquipements: equipementsCount,
        totalDecisions: decisionsCount,
        totalReseaux: reseauxCount
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques en temps réel:', error);
      // Retourner des valeurs par défaut en cas d'erreur
      return {
        totalCCTs: 0,
        totalAgents: 0,
        totalChefsCentre: 0,
        totalLignes: 0,
        totalFormations: 0,
        totalEquipements: 0,
        totalDecisions: 0,
        totalReseaux: 0
      };
    }
  },

  // Récupérer les statistiques détaillées
  async getDetailedStats() {
    try {
      const response = await axios.get(`${API_BASE_URL}/dashboard/detailed`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques détaillées:', error);
      throw error;
    }
  }
};
