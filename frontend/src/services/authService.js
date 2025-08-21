import api from './api';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_info';

export const authService = {
  // Connexion
  async login(username, password) {
    try {
      const response = await api.post('/auth/login', { username, password });
      
      if (response.data && response.data.token) {
        // Stocker le token
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        
        // Stocker les informations utilisateur
        if (response.data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        }
        
        return { success: true, data: response.data };
      }
      
      return { success: false, message: 'Réponse invalide du serveur' };
    } catch (error) {
      console.error('Erreur de connexion:', error);
      
      if (error.response) {
        // Erreur de réponse du serveur
        return { 
          success: false, 
          message: error.response.data?.message || 'Erreur de connexion' 
        };
      } else if (error.request) {
        // Erreur de réseau
        return { 
          success: false, 
          message: 'Impossible de se connecter au serveur' 
        };
      } else {
        // Autre erreur
        return { 
          success: false, 
          message: 'Erreur inattendue' 
        };
      }
    }
  },

  // Déconnexion
  logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  },

  // Obtenir le token
  getToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  // Obtenir les informations utilisateur
  getUser() {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Vérifier si le token est expiré
  isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  },

  // Rafraîchir le token (si nécessaire)
  async refreshToken() {
    try {
      const response = await api.post('/auth/refresh');
      if (response.data && response.data.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, response.data.token);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },

  // Changer le mot de passe
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Erreur lors du changement de mot de passe' 
      };
    }
  }
};

// Configuration automatique du token pour toutes les requêtes API
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      authService.logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default authService; 