import api from './api';

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
};

const ligneService = {
  // Récupérer la liste des lignes avec filtres et pagination
  getLignes: async (filters = {}, page = 1, pageSize = 10) => {
    try {
      const response = await api.get('/Lignes', {
        params: {
          page,
          pageSize,
          regionId: filters.regionId || '',
          villeId: filters.villeId || '',
          reseauId: filters.reseauId || '',
          cctId: filters.cctId || '',
          anneeDemarrage: filters.anneeDemarrage || ''
        }
      });
      
      // Extraire les headers de pagination
      const totalCount = parseInt(response.headers['x-total-count'] || '0');
      const pageCount = parseInt(response.headers['x-page-count'] || '1');
      
      return {
        data: response.data,
        pagination: {
          totalCount,
          pageCount,
          currentPage: page,
          pageSize
        }
      };
    } catch (error) {
      console.error('Erreur lors de la récupération des lignes:', error);
      return {
        data: [],
        pagination: {
          totalCount: 0,
          pageCount: 1,
          currentPage: 1,
          pageSize
        }
      };
    }
  },

  // Récupérer une ligne par ID
  getLigne: (id) => api.get(`/Lignes/${id}`),

  // Créer une nouvelle ligne
  createLigne: (data) => {
    const payload = {
      cctId: parseInt(data.cctId),
      numLigne: parseInt(data.numLigne),
      typeLigneId: parseInt(data.typeLigneId),
      statutId: parseInt(data.statutId),
      dateStatut: formatDate(data.dateStatut),
      decision: data.decision || 'Création',
      decisionDate: formatDate(data.decisionDate) || formatDate(data.dateStatut)
    };
    console.log('Payload createLigne:', payload);
    return api.post('/Lignes', payload);
  },

  // Mettre à jour une ligne
  updateLigne: (id, data) => {
    const payload = {
      id: parseInt(id),
      cctId: parseInt(data.cctId),
      numLigne: parseInt(data.numLigne),
      typeLigneId: parseInt(data.typeLigneId),
      statutId: parseInt(data.statutId),
      dateStatut: formatDate(data.dateStatut),
      decision: data.decision || 'Modification',
      decisionDate: formatDate(data.decisionDate) || formatDate(data.dateStatut)
    };
    console.log('Payload updateLigne:', payload);
    return api.put(`/Lignes/${id}`, payload);
  },

  // Supprimer une ligne
  deleteLigne: (id) => api.delete(`/Lignes/${id}`)
};

export default ligneService; 