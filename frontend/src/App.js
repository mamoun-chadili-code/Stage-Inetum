import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Reseaux from './components/Reseaux/Reseaux';
import CCTs from './components/CCTs/CCTs';
import Agents from './components/Agents/Agents';
import ChefsCentre from './components/ChefsCentre/ChefsCentre';
import Formations from './components/Formations/Formations';
import Lignes from './components/Lignes/Lignes';
import Equipements from './components/Equipements/Equipements';
import Decisions from './components/Decisions/Decisions';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';


// Composant qui utilise le contexte d'authentification
function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Chargement...
      </div>
    );
  }

  return (
    <Router>
      {isAuthenticated && <Sidebar />}
      <div style={{ 
        marginLeft: isAuthenticated ? 220 : 0, 
        padding: 24,
        transition: 'margin-left 0.3s ease'
      }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
          <Route path="/reseaux" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Reseaux /></ProtectedRoute>} />
          <Route path="/cct" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CCTs /></ProtectedRoute>} />
          <Route path="/agents" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Agents /></ProtectedRoute>} />
          <Route path="/chefs-centre" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChefsCentre /></ProtectedRoute>} />
          <Route path="/formations" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Formations /></ProtectedRoute>} />
          <Route path="/lignes" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Lignes /></ProtectedRoute>} />
          <Route path="/equipements" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Equipements /></ProtectedRoute>} />
          <Route path="/decisions" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Decisions /></ProtectedRoute>} />
          
          <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  const theme = useMemo(() => createTheme({
    palette: { mode: 'light' },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: 'red',
          },
        },
      },
    },
  }), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
