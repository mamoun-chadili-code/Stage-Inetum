import api from './api';

const BASE_URL = '/equipements';

export const equipementService = {
  // Récupérer tous les équipements avec pagination et filtres
  async getEquipements(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.pageSize) queryParams.append('pageSize', params.pageSize);
    if (params.nom) queryParams.append('nom', params.nom);
    if (params.type) queryParams.append('type', params.type);
    if (params.cct) queryParams.append('cct', params.cct);
    if (params.statut) queryParams.append('statut', params.statut);
    
    const response = await api.get(`${BASE_URL}?${queryParams.toString()}`);
    return response.data;
  },

  // Récupérer un équipement par ID
  async getEquipement(id) {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Créer un nouvel équipement
  async createEquipement(equipement) {
    const response = await api.post(BASE_URL, equipement);
    return response.data;
  },

  // Mettre à jour un équipement
  async updateEquipement(id, equipement) {
    const response = await api.put(`${BASE_URL}/${id}`, equipement);
    return response.data;
  },

  // Supprimer un équipement
  async deleteEquipement(id) {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
  },

  // Récupérer les types d'équipements
  async getTypesEquipement() {
    try {
      const response = await api.get('/TypeEquipements');
      console.log('🔍 API TypeEquipements - Response complète:', response);
      console.log('🔍 API TypeEquipements - Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur API TypeEquipements:', error);
      throw error;
    }
  },

  // Récupérer les CCTs pour les dropdowns
  async getCCTs() {
    try {
      const response = await api.get('/CCTs/all');
      console.log('🔍 API CCTs/all - Response complète:', response);
      console.log('🔍 API CCTs/all - Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur API CCTs/all:', error);
      throw error;
    }
  },

  // Récupérer les statuts d'équipement
  async getStatutsEquipement() {
    try {
      const response = await api.get('/StatutsEquipement');
      console.log('🔍 API StatutsEquipement - Response complète:', response);
      console.log('🔍 API StatutsEquipement - Data:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur API StatutsEquipement:', error);
      throw error;
    }
  },

  // Rechercher des équipements
  async searchEquipements(criteria) {
    const response = await api.post(`${BASE_URL}/search`, criteria);
    return response.data;
  },

  // Récupérer les équipements par CCT
  async getEquipementsByCCT(cctId) {
    const response = await api.get(`${BASE_URL}/cct/${cctId}`);
    return response.data;
  },

  // Récupérer les équipements par type
  async getEquipementsByType(typeId) {
    const response = await api.get(`${BASE_URL}/type/${typeId}`);
    return response.data;
  },

  // Récupérer les équipements par statut
  async getEquipementsByStatut(statutId) {
    const response = await api.get(`${BASE_URL}/statut/${statutId}`);
    return response.data;
  },

  // Exporter les équipements
  async exportEquipements(format = 'excel') {
    const response = await api.get(`${BASE_URL}/export`, {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  },

  // Importer des équipements
  async importEquipements(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`${BASE_URL}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  // Récupérer les statistiques des équipements
  async getEquipementsStats() {
    const response = await api.get(`${BASE_URL}/stats`);
    return response.data;
  },

  // Récupérer l'historique des modifications d'un équipement
  async getEquipementHistory(id) {
    const response = await api.get(`${BASE_URL}/${id}/history`);
    return response.data;
  },

  // Marquer un équipement comme en maintenance
  async setMaintenance(id, maintenanceData) {
    const response = await api.put(`${BASE_URL}/${id}/maintenance`, maintenanceData);
    return response.data;
  },

  // Terminer la maintenance d'un équipement
  async endMaintenance(id) {
    const response = await api.put(`${BASE_URL}/${id}/maintenance/end`);
    return response.data;
  },

  // Récupérer les équipements nécessitant une maintenance
  async getEquipementsMaintenance() {
    const response = await api.get(`${BASE_URL}/maintenance/required`);
    return response.data;
  },

  // Récupérer les équipements expirés
  async getEquipementsExpired() {
    const response = await api.get(`${BASE_URL}/expired`);
    return response.data;
  }
};

export default equipementService;
