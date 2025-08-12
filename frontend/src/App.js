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


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = useMemo(() => createTheme({
    palette: { mode: darkMode ? 'dark' : 'light' },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: 'red',
          },
        },
      },
    },
  }), [darkMode]);

  // Simuler l'authentification (à remplacer par vrai contexte)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isAuthenticated && <Sidebar onThemeToggle={() => setDarkMode(m => !m)} darkMode={darkMode} />}
        <div style={{ marginLeft: isAuthenticated ? 220 : 0, padding: 24 }}>
          <Button onClick={() => setDarkMode(m => !m)} variant="outlined" style={{ float: 'right' }}>
            {darkMode ? 'Mode clair' : 'Mode sombre'}
          </Button>
          <Routes>
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/reseaux" element={isAuthenticated ? <Reseaux /> : <Navigate to="/login" />} />
            <Route path="/cct" element={isAuthenticated ? <CCTs /> : <Navigate to="/login" />} />
            <Route path="/agents" element={isAuthenticated ? <Agents /> : <Navigate to="/login" />} />
            <Route path="/chefs-centre" element={isAuthenticated ? <ChefsCentre /> : <Navigate to="/login" />} />
            <Route path="/formations" element={isAuthenticated ? <Formations /> : <Navigate to="/login" />} />
            <Route path="/lignes" element={isAuthenticated ? <Lignes /> : <Navigate to="/login" />} />
            <Route path="/equipements" element={isAuthenticated ? <Equipements /> : <Navigate to="/login" />} />
            <Route path="/decisions" element={isAuthenticated ? <Decisions /> : <Navigate to="/login" />} />
            
            <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
