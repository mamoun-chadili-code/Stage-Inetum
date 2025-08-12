import api from './api';

const historiqueCCTService = {
  // Liste l’historique d’un CCT
  getByCCT: (cctId) => api.get(`/HistoriqueCCTs/cct/${cctId}`),

  // Ajoute une entrée d’historique
  create: (data) => api.post('/HistoriqueCCTs', data),

  // Modifie une entrée d’historique
  update: (id, data) => api.put(`/HistoriqueCCTs/${id}`, data),

  // Supprime une entrée d’historique
  remove: (id) => api.delete(`/HistoriqueCCTs/${id}`)
};

export default historiqueCCTService; 