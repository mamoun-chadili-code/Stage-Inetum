import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Button from '@mui/material/Button';
import Reseaux from './components/Reseaux/Reseaux';
import CCTs from './components/CCTs/CCTs';
import Agents from './components/Agents/Agents';
import ChefsCentre from './components/ChefsCentre/ChefsCentre';
import Formations from './components/Formations/Formations';
import Lignes from './components/Lignes/Lignes';
import Equipements from './components/Equipements/Equipements';
import Decisions from './components/Decisions/Decisions';
import ProtectedRoute from './components/Auth/ProtectedRoute';


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

  // Simuler l'authentification (à remplacer par vrai contexte)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isAuthenticated && <Sidebar />}
        <div style={{ marginLeft: isAuthenticated ? 220 : 0, padding: 24 }}>
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
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
    </ThemeProvider>
  );
}

export default App;
