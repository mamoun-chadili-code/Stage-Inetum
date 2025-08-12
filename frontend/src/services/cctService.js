import api from './api';

// Fonction pour formater les dates
const formatDate = (dateString) => {
  if (!dateString || dateString === '') return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
  } catch (error) {
    console.warn('Erreur de formatage de date:', dateString, error);
    return '';
  }
};

const cctService = {
  // Récupérer tous les CCTs pour les dropdowns
  async getCCTsForDropdown() {
    try {
      const response = await api.get('/CCTs', {
        params: {
          page: 1,
          pageSize: 1000 // Récupérer tous les CCTs
        }
      });
      
      // Transformer les données pour le dropdown
      return response.data.map(cct => ({
        id: cct.id,
        nom: cct.nom,
        agrement: cct.agrement
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des CCTs:', error);
      throw error;
    }
  },

  // Récupérer tous les CCTs (alias pour compatibilité)
  async getAllCCTs() {
    return this.getCCTsForDropdown();
  },

  // Récupérer un CCT par ID
  async getCCTById(id) {
    try {
      const response = await api.get(`/CCTs/${id}`);
      return response;
    } catch (error) {
      console.error('Erreur lors de la récupération du CCT:', error);
      throw error;
    }
  },

  // Alias pour getCCTById (pour compatibilité)
  getCCT: async function(id) {
    return this.getCCTById(id);
  },

  // Récupérer tous les CCTs avec pagination
  async getCCTs(params = {}, page = 1, pageSize = 5) {
    try {
      const response = await api.get('/CCTs', {
        params: {
          ...params,
          page,
          pageSize
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
      console.error('Erreur lors de la récupération des CCTs:', error);
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

  // Créer un nouveau CCT
  createCCT: (data) => {
    const payload = {
      nom: data.nom || '',
      agrement: data.agrement || '',
      dateAgrement: formatDate(data.dateAgrement) || '',
      categorieId: data.categorieId ? parseInt(data.categorieId) : 0,
      statutId: data.statutId ? parseInt(data.statutId) : 0,
      dateStatut: formatDate(data.dateStatut) || '',
      reseauId: data.reseauId ? parseInt(data.reseauId) : 0,
      dateRalliement: formatDate(data.dateRalliement) || '',
      adresseCCT: data.adresseCCT || '',
      latitude: data.latitude ? data.latitude.toString() : '0',
      longitude: data.longitude ? data.longitude.toString() : '0',
      adresseSiege: data.adresseSiege || '',
      adresseDomiciliation: data.adresseDomiciliation || '',
      tel: data.tel || '',
      fax: data.fax || '',
      mail: data.mail || '',
      ice: data.ice || '',
      idFiscal: data.idFiscal || '',
      cadreAutorisationId: data.cadreAutorisationId ? parseInt(data.cadreAutorisationId) : 0,
      engagementSpecifique: data.engagementSpecifique || '',
      isPersonneMorale: data.isPersonneMorale || false,
      typeId: data.typeId ? parseInt(data.typeId) : 0,
      quotaVL: data.quotaVL ? parseInt(data.quotaVL) : 0,
      quotaPL: data.quotaPL ? parseInt(data.quotaPL) : 0,
      thumbprintCertificat: data.thumbprintCertificat || '',
      regionId: data.regionId ? parseInt(data.regionId) : 0,
      provinceId: data.provinceId ? parseInt(data.provinceId) : 0,
      villeId: data.villeId ? parseInt(data.villeId) : 0
    };
    console.log('Payload createCCT:', payload);
    return api.post('/CCTs', payload);
  },

  // Mettre à jour un CCT
  updateCCT: (id, data) => {
    // Préparer les données de mise à jour avec gestion sécurisée des valeurs
    const updateData = {
      nom: data.nom || '',
      agrement: data.agrement || '',
      dateAgrement: formatDate(data.dateAgrement) || '',
      categorieId: data.categorieId ? parseInt(data.categorieId) : 0,
      statutId: data.statutId ? parseInt(data.statutId) : 0,
      dateStatut: formatDate(data.dateStatut) || '',
      reseauId: data.reseauId ? parseInt(data.reseauId) : 0,
      dateRalliement: formatDate(data.dateRalliement) || '',
      adresseCCT: data.adresseCCT || '',
      latitude: data.latitude ? data.latitude.toString() : '0',
      longitude: data.longitude ? data.longitude.toString() : '0',
      adresseSiege: data.adresseSiege || '',
      adresseDomiciliation: data.adresseDomiciliation || '',
      tel: data.tel || '',
      fax: data.fax || '',
      mail: data.mail || '',
      ice: data.ice || '',
      idFiscal: data.idFiscal || '',
      cadreAutorisationId: data.cadreAutorisationId ? parseInt(data.cadreAutorisationId) : 0,
      engagementSpecifique: data.engagementSpecifique || '',
      isPersonneMorale: data.isPersonneMorale || false,
      typeId: data.typeId ? parseInt(data.typeId) : 0,
      quotaVL: data.quotaVL ? parseInt(data.quotaVL) : 0,
      quotaPL: data.quotaPL ? parseInt(data.quotaPL) : 0,
      thumbprintCertificat: data.thumbprintCertificat || '',
      regionId: data.regionId ? parseInt(data.regionId) : 0,
      provinceId: data.provinceId ? parseInt(data.provinceId) : 0,
      villeId: data.villeId ? parseInt(data.villeId) : 0
    };

    // Créer le payload sans wrapper (essayer une approche plus simple)
    const payload = updateData;

    console.log('=== DÉBOGAGE SERVICE CCT ===');
    console.log('Payload updateCCT:', payload);
    console.log('Payload JSON:', JSON.stringify(payload, null, 2));
    console.log('URL:', `/CCTs/${id}`);
    console.log('Structure du payload:');
    console.log('  - Nombre de champs:', Object.keys(payload).length);
    console.log('  - Champs présents:', Object.keys(payload));
    console.log('Types des champs critiques:');
    console.log(`  regionId: ${typeof payload.regionId} = ${payload.regionId}`);
    console.log(`  villeId: ${typeof payload.villeId} = ${payload.villeId}`);
    console.log(`  provinceId: ${typeof payload.provinceId} = ${payload.provinceId}`);
    console.log(`  latitude: ${typeof payload.latitude} = ${payload.latitude}`);
    console.log(`  longitude: ${typeof payload.longitude} = ${payload.longitude}`);
    
    // Vérification des champs obligatoires
    const requiredFields = ['nom', 'agrement', 'dateAgrement', 'categorieId', 'statutId', 'dateStatut', 'reseauId', 'dateRalliement', 'regionId', 'provinceId', 'villeId', 'adresseCCT', 'latitude', 'longitude', 'cadreAutorisationId', 'typeId'];
    const missingFields = requiredFields.filter(field => !(field in payload) || payload[field] === null || payload[field] === undefined);
    
    if (missingFields.length > 0) {
      console.warn('⚠️ Champs obligatoires manquants:', missingFields);
    } else {
      console.log('✅ Tous les champs obligatoires sont présents');
    }
    
    console.log('=== FIN DÉBOGAGE SERVICE ===');
    
    // D'abord, récupérer le CCT actuel pour voir sa structure
    console.log('🔍 Récupération de la structure actuelle du CCT...');
    
    return api.get(`/CCTs/${id}`).then(currentCCT => {
      console.log('📋 Structure actuelle du CCT:', currentCCT.data);
      console.log('📋 Types des champs actuels:');
      Object.keys(currentCCT.data).forEach(key => {
        console.log(`  ${key}: ${typeof currentCCT.data[key]} = ${currentCCT.data[key]}`);
      });
      
      // Maintenant envoyer la mise à jour
      console.log('📤 Envoi de la mise à jour...');
      return api.put(`/CCTs/${id}`, payload);
    }).catch(error => {
      console.error('Erreur dans updateCCT:', error);
      if (error.response) {
        console.error('Réponse d\'erreur:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      }
      throw error;
    });
  },

  // Supprimer un CCT
  deleteCCT: (id) => api.delete(`/CCTs/${id}`),

  // Récupérer les agents d'un CCT
  getCCTAgents: (id) => api.get(`/CCTs/${id}/agents`),

  // Récupérer les chefs de centre d'un CCT
  getCCTChefsCentres: (id) => api.get(`/CCTs/${id}/chefs-centres`),

  // Récupérer les lignes d'un CCT
  getCCTLignes: (id) => api.get(`/CCTs/${id}/lignes`),

  // Récupérer les équipements d'un CCT
  getCCTEquipements: (id) => api.get(`/CCTs/${id}/equipements`)
};

export default cctService; 