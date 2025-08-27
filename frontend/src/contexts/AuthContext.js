import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = authService.getToken();
        const userInfo = authService.getUser();
        
        if (token && !authService.isTokenExpired() && userInfo) {
          setIsAuthenticated(true);
          setUser(userInfo);
        } else {
          // Token expiré ou invalide, nettoyer
          authService.logout();
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification d\'authentification:', error);
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (username, password) => {
    try {
      const result = await authService.login(username, password);
      
      if (result.success) {
        setIsAuthenticated(true);
        setUser(result.data.user);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return { success: false, message: 'Erreur de connexion' };
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    try {
      authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      // Forcer la déconnexion même en cas d'erreur
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, message: 'Erreur lors de la déconnexion' };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
