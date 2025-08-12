import api from './api';

const formationService = {
  // Récupérer toutes les formations avec filtres et pagination
  getFormations: async (filters = {}, page = 1, pageSize = 10) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
        ...filters
      });

      // Convertir les dates en format YYYY-MM-DD si elles existent
      if (filters.dateDebut) {
        params.set('dateDebut', filters.dateDebut);
      }
      if (filters.dateFin) {
        params.set('dateFin', filters.dateFin);
      }

      const response = await api.get(`/Formations?${params.toString()}`);
      return {
        data: response.data.formations || [],
        pagination: response.data.pagination || {
          totalCount: 0,
          pageCount: 0,
          currentPage: page,
          pageSize: pageSize
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des formations:', error);
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

  // Récupérer une formation par ID
  getFormation: async (id) => {
    try {
      const response = await api.get(`/Formations/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération de la formation:', error);
      throw error;
    }
  },

  // Créer une nouvelle formation
  createFormation: async (data) => {
    try {
      console.log('Tentative de création de formation avec données:', data);
      const payload = {
        intitule: data.intitule,
        cctId: data.cctId ? parseInt(data.cctId) : null,
        agentId: data.agentId ? parseInt(data.agentId) : null,
        chefCentreId: data.chefCentreId ? parseInt(data.chefCentreId) : null,
        typeFormationId: data.typeFormationId ? parseInt(data.typeFormationId) : null,
        matiere: data.matiere,
        dateDebut: data.dateDebut ? formatDate(data.dateDebut) : null,
        dateFin: data.dateFin ? formatDate(data.dateFin) : null,
        valideParFormateur: data.valideParFormateur || false,
        premierAnimateur: data.premierAnimateur || '',
        deuxiemeAnimateur: data.deuxiemeAnimateur || '',
        valideCHEH: data.valideCHEH || false,
        valideLe: data.valideLe ? formatDate(data.valideLe) : null
      };

      console.log('Payload envoyé:', payload);
      const response = await api.post('/Formations', payload);
      console.log('Réponse de création:', response);
      return response;
    } catch (error) {
      console.error('Erreur lors de la création de la formation:', error);
      if (error.response?.data) {
        console.error('Détails de l\'erreur:', error.response.data);
      }
      throw error;
    }
  },

  // Modifier une formation
  updateFormation: async (id, data) => {
    try {
      console.log('Tentative de modification de la formation:', id, data);
      const payload = {
        id: parseInt(id),
        intitule: data.intitule,
        cctId: data.cctId ? parseInt(data.cctId) : null,
        agentId: data.agentId ? parseInt(data.agentId) : null,
        chefCentreId: data.chefCentreId ? parseInt(data.chefCentreId) : null,
        typeFormationId: data.typeFormationId ? parseInt(data.typeFormationId) : null,
        matiere: data.matiere,
        dateDebut: data.dateDebut ? formatDate(data.dateDebut) : null,
        dateFin: data.dateFin ? formatDate(data.dateFin) : null,
        valideParFormateur: data.valideParFormateur || false,
        premierAnimateur: data.premierAnimateur || '',
        deuxiemeAnimateur: data.deuxiemeAnimateur || '',
        valideCHEH: data.valideCHEH || false,
        valideLe: data.valideLe ? formatDate(data.valideLe) : null
      };

      console.log('Payload envoyé:', payload);
      const response = await api.put(`/Formations/${id}`, payload);
      console.log('Réponse de modification:', response);
      return response;
    } catch (error) {
      console.error('Erreur lors de la modification de la formation:', error);
      throw error;
    }
  },

  // Supprimer une formation
  deleteFormation: async (id) => {
    try {
      console.log('Tentative de suppression de la formation:', id);
      const response = await api.delete(`/Formations/${id}`);
      console.log('Réponse de suppression:', response);
      return response;
    } catch (error) {
      console.error('Erreur lors de la suppression de la formation:', error);
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

export default formationService; 