import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import authService from '../../services/authService';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const result = await authService.login(username, password);
      
      if (result.success) {
        toast.success('Connexion réussie !');
        onLogin();
        navigate('/dashboard');
      } else {
        toast.error(result.message || 'Identifiants invalides');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast.error('Erreur de connexion au serveur');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 320, mx: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <h2>Connexion</h2>
      <TextField label="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} fullWidth margin="normal" required />
      <TextField label="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth margin="normal" required />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Se connecter</Button>
    </Box>
  );
} 