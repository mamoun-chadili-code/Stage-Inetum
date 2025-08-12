import api from './api';

// Service pour la gestion des réseaux
export const reseauxService = {
  // Lister les réseaux avec pagination et recherche
  async getReseaux(params = {}) {
    try {
      const { nom, agrement, dateAgrement, statut, dateStatut, page = 1, pageSize = 10 } = params;
      const queryParams = new URLSearchParams();
      
      if (nom) queryParams.append('nom', nom);
      if (agrement) queryParams.append('agrement', agrement);
      if (dateAgrement) queryParams.append('dateAgrement', dateAgrement);
      if (statut) queryParams.append('statutId', statut);
      if (dateStatut) queryParams.append('dateStatut', dateStatut);
      queryParams.append('page', page);
      queryParams.append('pageSize', pageSize);

      const response = await api.get(`/Reseaux?${queryParams}`);
      return {
        data: response.data || [],
        totalCount: parseInt(response.headers['x-total-count'] || 0),
        pageCount: parseInt(response.headers['x-page-count'] || 0)
      };
    } catch (error) {
      console.error('Erreur getReseaux:', error);
      return {
        data: [],
        totalCount: 0,
        pageCount: 0
      };
    }
  },

  // Obtenir un réseau par ID
  async getReseau(id) {
    try {
      const response = await api.get(`/Reseaux/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur getReseau:', error);
      throw error;
    }
  },

  // Récupérer tous les réseaux pour les dropdowns
  async getAllReseaux() {
    try {
      const response = await api.get('/Reseaux', {
        params: {
          page: 1,
          pageSize: 1000 // Récupérer tous les réseaux
        }
      });
      
      // Transformer les données pour le dropdown
      return (response.data || []).map(reseau => ({
        id: reseau.id,
        nom: reseau.nom,
        agrement: reseau.agrement
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des réseaux:', error);
      return [];
    }
  },

  // Créer un nouveau réseau
  async createReseau(reseau) {
    try {
      // Mapping pour n'envoyer que les IDs et champs simples
      const payload = {
        nom: reseau.nom,
        agrement: reseau.agrement,
        dateAgrement: reseau.dateAgrement,
        StatutId: Number(reseau.statut),
        dateStatut: reseau.dateStatut,
        adresseSiege: reseau.adresseSiege,
        adresseDomiciliation: reseau.adresseDomiciliation,
        VilleId: Number(reseau.ville),
        tel: reseau.tel,
        fax: reseau.fax,
        mail: reseau.mail,
        ice: reseau.ice,
        idFiscal: reseau.idFiscal,
        registerCommerce: reseau.registerCommerce,
        CadreAutorisationId: Number(reseau.cadreAutorisation),
        nomRepresentantLegal: reseau.nomRepresentantLegal,
        adressRepresentantLegal: reseau.adressRepresentantLegal,
        telRepresentantLegal: reseau.telRepresentantLegal,
        mailRepresentant: reseau.mailRepresentant,
        logo: reseau.logo || null // Ajouter le logo si présent
      };
      console.log('Payload envoyé:', payload);
      const response = await api.post('/Reseaux', payload);
      return response.data;
    } catch (error) {
      console.error('Erreur createReseau:', error);
      if (error.response) {
        console.error('Détails de l\'erreur:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      throw error;
    }
  },

  // Modifier un réseau
  async updateReseau(id, reseau) {
    try {
      // Mapping pour n'envoyer que les IDs et champs simples
      const payload = {
        id,
        nom: reseau.nom,
        agrement: reseau.agrement,
        dateAgrement: reseau.dateAgrement,
        StatutId: Number(reseau.statut),
        dateStatut: reseau.dateStatut,
        adresseSiege: reseau.adresseSiege,
        adresseDomiciliation: reseau.adresseDomiciliation,
        VilleId: Number(reseau.ville),
        tel: reseau.tel,
        fax: reseau.fax,
        mail: reseau.mail,
        ice: reseau.ice,
        idFiscal: reseau.idFiscal,
        registerCommerce: reseau.registerCommerce,
        CadreAutorisationId: Number(reseau.cadreAutorisation),
        nomRepresentantLegal: reseau.nomRepresentantLegal,
        adressRepresentantLegal: reseau.adressRepresentantLegal,
        telRepresentantLegal: reseau.telRepresentantLegal,
        mailRepresentant: reseau.mailRepresentant,
        logo: reseau.logo || null // Ajouter le logo si présent
      };
      console.log('Payload envoyé:', payload);
      const response = await api.put(`/Reseaux/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Erreur updateReseau:', error);
      throw error;
    }
  },

  // Supprimer un réseau
  async deleteReseau(id) {
    try {
      const response = await api.delete(`/Reseaux/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur deleteReseau:', error);
      throw error;
    }
  },

  // Obtenir le logo d'un réseau
  async getLogo(id) {
    try {
      const response = await api.get(`/Reseaux/${id}/logo`, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.error('Erreur getLogo:', error);
      throw error;
    }
  },

  // Uploader le logo d'un réseau
  async uploadLogo(id, file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/Reseaux/${id}/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Rechercher un réseau par agrément (pour feedback utilisateur)
  async searchByAgrement(agrement) {
    const response = await api.get(`/Reseaux?agrement=${agrement}&pageSize=1`);
    return response.data.length > 0 ? response.data[0] : null;
  }
};

export default reseauxService; 