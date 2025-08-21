import api from './api';

const ligneService = {
  // Récupérer toutes les lignes
  async getAllLignes() {
    try {
      const response = await api.get('/Lignes');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des lignes:', error);
      throw error;
    }
  },

  // Récupérer une ligne par ID
  async getLigneById(id) {
    try {
      const response = await api.get(`/Lignes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération de la ligne ${id}:`, error);
      throw error;
    }
  },

  // Rechercher des lignes avec filtres
  async searchLignes(searchParams) {
    try {
      // Validation côté client avant envoi
      const validatedParams = {
        ...searchParams,
        page: Math.max(1, searchParams.page || 1),
        pageSize: Math.max(1, Math.min(100, searchParams.pageSize || 10))
      };

      console.log('Paramètres de recherche validés:', validatedParams);
      const response = await api.post('/Lignes/search', validatedParams);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche des lignes:', error);
      if (error.response?.data?.errors) {
        console.error('Erreurs de validation détaillées:', error.response.data.errors);
      }
      throw error;
    }
  },

  // Récupérer les lignes d'un CCT
  async getLignesByCCT(cctId) {
    try {
      const response = await api.get(`/Lignes/cct/${cctId}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des lignes du CCT ${cctId}:`, error);
      throw error;
    }
  },

  // Créer une nouvelle ligne
  async createLigne(ligneData) {
    try {
      const response = await api.post('/Lignes', ligneData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de la ligne:', error);
      throw error;
    }
  },

  // Mettre à jour une ligne
  async updateLigne(id, ligneData) {
    try {
      const response = await api.put(`/Lignes/${id}`, ligneData);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de la ligne ${id}:`, error);
      throw error;
    }
  },

  // Supprimer une ligne
  async deleteLigne(id) {
    try {
      const response = await api.delete(`/Lignes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression de la ligne ${id}:`, error);
      throw error;
    }
  },

  // Vérifier si une ligne existe
  async ligneExists(numeroLigne, cctId, excludeId = null) {
    try {
      // Cette fonctionnalité peut être implémentée côté serveur si nécessaire
      const lignes = await this.getLignesByCCT(cctId);
      return lignes.some(ligne => 
        ligne.numeroLigne === numeroLigne && 
        (!excludeId || ligne.id !== excludeId)
      );
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'existence de la ligne:', error);
      return false;
    }
  },

  // Formater les données de ligne pour l'affichage
  formatLigneForDisplay(ligne) {
    return {
      ...ligne,
      dateStatutFormatted: new Date(ligne.dateStatut).toLocaleDateString('fr-FR'),
      dateDecisionFormatted: ligne.dateDecision 
        ? new Date(ligne.dateDecision).toLocaleDateString('fr-FR') 
        : 'N/A',
      anneeDemarrageFormatted: ligne.anneeDemarrage || 'N/A'
    };
  },

  // Valider les données de ligne côté client
  validateLigneData(ligneData) {
    const errors = [];

    if (!ligneData.numeroLigne || ligneData.numeroLigne < 1) {
      errors.push('Le numéro de ligne est obligatoire et doit être supérieur à 0');
    }

    if (!ligneData.categorieId) {
      errors.push('La catégorie est obligatoire');
    }

    if (!ligneData.cctId) {
      errors.push('Le CCT est obligatoire');
    }

    if (!ligneData.statutId) {
      errors.push('Le statut est obligatoire');
    }

    if (!ligneData.dateStatut) {
      errors.push('La date de statut est obligatoire');
    }

    if (ligneData.anneeDemarrage && (ligneData.anneeDemarrage < 1900 || ligneData.anneeDemarrage > 2100)) {
      errors.push('L\'année de démarrage doit être entre 1900 et 2100');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
};

export default ligneService; 