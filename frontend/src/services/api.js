import axios from 'axios';

// Configuration de base pour l'API
const api = axios.create({
  baseURL: 'https://localhost:54875/api', // Port HTTPS de votre backend
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour les requêtes sortantes
api.interceptors.request.use(
  (config) => {
    console.log('Requête API:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('Erreur de requête API:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses entrantes
api.interceptors.response.use(
  (response) => {
    console.log('Réponse API:', response.status, response.config.url, response.data);
    return response;
  },
  (error) => {
    console.error('Erreur de réponse API:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
      data: error.response?.data,
      headers: error.response?.headers
    });
    
    // Afficher les détails de l'erreur de validation si disponible
    if (error.response?.data) {
      console.error('Détails de l\'erreur backend:', error.response.data);
      console.error('Content-Type de la réponse:', error.response.headers['content-type']);
      
      if (error.response.data.errors) {
        console.error('Erreurs de validation:', error.response.data.errors);
      }
      if (error.response.data.title) {
        console.error('Titre de l\'erreur:', error.response.data.title);
      }
      if (error.response.data.traceId) {
        console.error('Trace ID:', error.response.data.traceId);
      }
      
      // Si c'est un problème JSON, essayer de parser plus de détails
      if (error.response.headers['content-type']?.includes('application/problem+json')) {
        console.error('Format d\'erreur Problem Details détecté');
        console.error('Type d\'erreur:', error.response.data.type);
        console.error('Status:', error.response.data.status);
        console.error('Titre:', error.response.data.title);
        console.error('Détails:', error.response.data.detail);
        console.error('Instance:', error.response.data.instance);
      }
    }
    
    // Gestion des erreurs spécifiques
    if (error.response?.status === 401) {
      console.error('Erreur d\'authentification - Token expiré ou invalide');
    } else if (error.response?.status === 403) {
      console.error('Erreur d\'autorisation - Accès refusé');
    } else if (error.response?.status === 404) {
      console.error('Ressource non trouvée');
    } else if (error.response?.status === 500) {
      console.error('Erreur interne du serveur');
    }
    
    return Promise.reject(error);
  }
);

export default api; 