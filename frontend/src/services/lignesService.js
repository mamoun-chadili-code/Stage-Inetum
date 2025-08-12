import api from './api';

// Service pour la gestion des lignes
export const lignesService = {
  // Récupérer toutes les lignes avec les données liées
  async getAllLignes() {
    try {
      console.log('🚨 === RÉCUPÉRATION LIGNES ===');
      
      // Récupérer les lignes de base
      const lignesResponse = await api.get('/Lignes');
      const lignes = lignesResponse.data || [];
      
      console.log('🚨 Lignes reçues:', lignes);
      
      // Pour l'instant, retourner juste les lignes sans les données liées
      // TODO: Ajouter les données liées quand les endpoints seront disponibles
      console.log('🚨 Retour des lignes de base (sans données liées pour l\'instant)');
      return lignes;
      
    } catch (error) {
      console.error('🚨 Erreur lors de la récupération des lignes:', error);
      throw error;
    }
  },

  // Récupérer une ligne par ID
  async getLigneById(id) {
    try {
      const response = await api.get(`/Lignes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de la ligne:', error);
      throw error;
    }
  },

  // Créer une nouvelle ligne
  async createLigne(ligneData) {
    try {
      console.log('🚨 === DÉBOGAGE CRÉATION LIGNE ===');
      console.log('🚨 Données reçues du formulaire:', ligneData);
      
      // Préparer les données pour l'API - Structure exacte attendue
      const payload = {
        numLigne: ligneData.numeroLigne,
        cctId: ligneData.cctId,
        typeLigneId: ligneData.categorieId, // L'API attend typeLigneId, pas categorieId
        statutId: ligneData.statutId,
        dateStatut: ligneData.dateStatut
      };

      console.log('🚨 Payload préparé pour l\'API:', payload);
      console.log('🚨 Types des données:', {
        numLigne: typeof payload.numLigne,
        cctId: typeof payload.cctId,
        typeLigneId: typeof payload.typeLigneId,
        statutId: typeof payload.statutId,
        dateStatut: typeof payload.dateStatut
      });

      const response = await api.post('/Lignes', payload);
      console.log('🚨 Réponse du serveur:', response.data);
      return response.data;
    } catch (error) {
      console.error('🚨 === ERREUR CRÉATION LIGNE ===');
      console.error('🚨 Erreur complète:', error);
      if (error.response) {
        console.error('🚨 Données de réponse:', error.response.data);
        console.error('🚨 Status:', error.response.status);
        console.error('🚨 Headers:', error.response.headers);
        // Afficher le contenu complet de la réponse d'erreur
        if (error.response.data) {
          console.error('🚨 Contenu complet de l\'erreur:', JSON.stringify(error.response.data, null, 2));
        }
      }
      throw error;
    }
  },

  // Mettre à jour une ligne existante
  async updateLigne(id, ligneData) {
    try {
      console.log('🚨 === DÉBOGAGE MISE À JOUR LIGNE ===');
      console.log('🚨 ID de la ligne à modifier:', id);
      console.log('🚨 Données reçues pour modification:', ligneData);
      
      // Préparer les données pour l'API - Structure exacte attendue
      const payload = {
        id: ligneData.id, // ← S'assurer que l'ID est inclus !
        numLigne: ligneData.numeroLigne,
        cctId: ligneData.cctId,
        typeLigneId: ligneData.categorieId, // L'API attend typeLigneId, pas categorieId
        statutId: ligneData.statutId,
        dateStatut: ligneData.dateStatut,
        decision: ligneData.decision || "", // Ajouter les champs manquants
        decisionDate: ligneData.decisionDate || "0001-01-01T00:00:00" // Date par défaut
      };

      console.log('🚨 Payload préparé pour l\'API:', payload);
      console.log('🚨 Types des données:', {
        id: typeof payload.id,
        numLigne: typeof payload.numLigne,
        cctId: typeof payload.cctId,
        typeLigneId: typeof payload.typeLigneId,
        statutId: typeof payload.statutId,
        dateStatut: typeof payload.dateStatut
      });
      
      console.log('🚨 URL de la requête:', `/Lignes/${id}`);
      console.log('🚨 Méthode: PUT');
      
      const response = await api.put(`/Lignes/${id}`, payload);
      console.log('🚨 Réponse du serveur:', response.data);
      return response.data;
    } catch (error) {
      console.error('🚨 === ERREUR MISE À JOUR LIGNE ===');
      console.error('🚨 Erreur complète:', error);
      if (error.response) {
        console.error('🚨 Données de réponse:', error.response.data);
        console.error('🚨 Status:', error.response.status);
        console.error('🚨 Headers:', error.response.headers);
        console.error('🚨 URL de la requête:', error.config?.url);
        console.error('🚨 Méthode:', error.config?.method);
        console.error('🚨 Données envoyées:', error.config?.data);
        
        // Afficher plus de détails sur l'erreur
        if (error.response.data) {
          console.error('🚨 Message d\'erreur du serveur:', error.response.data);
          console.error('🚨 Type d\'erreur:', error.response.data.type);
          console.error('🚨 Titre de l\'erreur:', error.response.data.title);
          if (error.response.data.errors) {
            console.error('🚨 Erreurs de validation:', error.response.data.errors);
          }
          // Afficher le contenu complet de la réponse d'erreur
          console.error('🚨 Contenu complet de l\'erreur:', JSON.stringify(error.response.data, null, 2));
        }
      }
      throw error;
    }
  },

  // Supprimer une ligne
  async deleteLigne(id) {
    try {
      const response = await api.delete(`/Lignes/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de la ligne:', error);
      throw error;
    }
  },

  // Rechercher des lignes avec filtres
  async searchLignes(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.regionId) queryParams.append('regionId', filters.regionId);
      if (filters.villeId) queryParams.append('villeId', filters.villeId);
      if (filters.reseauId) queryParams.append('reseauId', filters.reseauId);
      if (filters.cctId) queryParams.append('cctId', filters.cctId);
      if (filters.anneeDemarrage) queryParams.append('anneeDemarrage', filters.anneeDemarrage);
      if (filters.searchTerm) queryParams.append('searchTerm', filters.searchTerm);

      const response = await api.get(`/Lignes/search?${queryParams}`);
      return response.data || [];
    } catch (error) {
      console.error('Erreur lors de la recherche des lignes:', error);
      throw error;
    }
  },

  // Récupérer les lignes avec pagination
  async getLignesPaginated(page = 1, pageSize = 10, filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      queryParams.append('pageSize', pageSize);
      
      // Ajouter les filtres
      Object.keys(filters).forEach(key => {
        if (filters[key]) {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await api.get(`/Lignes/paginated?${queryParams}`);
      
      return {
        data: response.data || [],
        pagination: {
          totalCount: parseInt(response.headers['x-total-count'] || '0'),
          pageCount: parseInt(response.headers['x-page-count'] || '1'),
          currentPage: page,
          pageSize
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des lignes paginées:', error);
      throw error;
    }
  }
};

export default lignesService;
