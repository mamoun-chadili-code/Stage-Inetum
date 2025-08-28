import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const result = await login(username, password);
      
      if (result.success) {
        toast.success('Connexion réussie !');
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
    <Box sx={{ 
      minHeight: '100vh',
      backgroundImage: 'url(/LOGO2.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.2s ease-in-out'
    }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          maxWidth: 320, 
          mx: 'auto', 
          mt: 8, 
          p: 3, 
          boxShadow: 3, 
          borderRadius: 2, 
          bgcolor: 'background.paper',
          animation: 'slideUp 0.6s ease-out 0.2s both',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 6,
            transition: 'all 0.3s ease-in-out'
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          mb: 2,
          animation: 'fadeInLeft 0.8s ease-out 0.4s both'
        }}>
          <img 
            src="/LOGO.jpg" 
            alt="Logo" 
            style={{ 
              width: '50px', 
              height: '50px',
              animation: 'pulse 2s ease-in-out infinite'
            }} 
          />
          <h2 style={{ animation: 'fadeInRight 0.8s ease-out 0.6s both' }}>Connexion</h2>
        </Box>
        <TextField 
          label="Nom d'utilisateur" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          fullWidth 
          margin="normal" 
          required 
          sx={{
            animation: 'fadeInUp 0.8s ease-out 0.8s both',
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }
            }
          }}
        />
        <TextField 
          label="Mot de passe" 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          fullWidth 
          margin="normal" 
          required 
          sx={{
            animation: 'fadeInUp 0.8s ease-out 1.0s both',
            '& .MuiOutlinedInput-root': {
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }
            }
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ 
            mt: 2,
            animation: 'fadeInUp 0.8s ease-out 1.2s both',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }
          }}
        >
          Se connecter
        </Button>
      </Box>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes fadeInRight {
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </Box>
  );
} 