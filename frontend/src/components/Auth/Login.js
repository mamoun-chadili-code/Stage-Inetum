import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Remplacer par un vrai appel API
    if (username === 'admin' && password === 'admin123') {
      toast.success('Connexion réussie !');
      onLogin();
      navigate('/dashboard');
    } else {
      toast.error('Identifiants invalides');
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