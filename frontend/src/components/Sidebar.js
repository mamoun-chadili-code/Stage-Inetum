import React, { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DevicesIcon from '@mui/icons-material/Devices';
import GavelIcon from '@mui/icons-material/Gavel';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, keyframes } from '@mui/material';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

// Animations personnalisées avancées
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(156, 39, 176, 0.3); }
  50% { box-shadow: 0 0 20px rgba(156, 39, 176, 0.6); }
  100% { box-shadow: 0 0 5px rgba(156, 39, 176, 0.3); }
`;



const menu = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', color: '#1976d2' },
  { text: 'Réseaux', icon: <SettingsEthernetIcon />, path: '/reseaux', color: '#4caf50' },
  { text: 'CCT', icon: <PeopleIcon />, path: '/cct', color: '#ff9800' },
  { text: 'Agents', icon: <PeopleIcon />, path: '/agents', color: '#9c27b0' },
  { text: 'Chefs de Centre', icon: <PeopleIcon />, path: '/chefs-centre', color: '#f44336' },
  { text: 'Formations', icon: <SchoolIcon />, path: '/formations', color: '#00bcd4' },
  { text: 'Lignes', icon: <DirectionsBusIcon />, path: '/lignes', color: '#795548' },
  { text: 'Équipements', icon: <DevicesIcon />, path: '/equipements', color: '#607d8b' },
  { text: 'Décisions', icon: <GavelIcon />, path: '/decisions', color: '#e91e63' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const getActiveItem = () => {
    return menu.find(item => item.path === activeItem) || menu[0];
  };

  return (
    <Drawer 
      variant="permanent" 
      anchor="left" 
      sx={{ 
        width: 220, 
        flexShrink: 0, 
        '& .MuiDrawer-paper': { 
          width: 220, 
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
          borderRight: '3px solid',
          borderImage: `linear-gradient(180deg, ${getActiveItem().color}20, ${getActiveItem().color}40, ${getActiveItem().color}20) 1`,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 30px ${getActiveItem().color}15`
        } 
      }}
    >
      {/* En-tête créatif avec indicateur de module actif */}
      <Box sx={{ 
        position: 'relative',
        p: 3, 
        textAlign: 'center', 

        background: 'transparent',
        overflow: 'hidden',

      }}>


        <Box sx={{ 
          position: 'relative',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 2,
          mb: 2
        }}>
          {/* Icône avec effet de respiration */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {React.cloneElement(getActiveItem().icon, {
              sx: { 
                fontSize: '1.5rem',
                color: getActiveItem().color,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                animation: `${pulse} 2s ease-in-out infinite`
              }
            })}
          </Box>
          
          {/* Texte pur sans aucun effet */}
          <Box sx={{ 
            fontSize: '1.1rem', 
            fontWeight: 'bold', 
            color: getActiveItem().color,
            letterSpacing: '0.5px'
          }}>
            {getActiveItem().text}
          </Box>
        </Box>
        
        {/* Barre de progression élégante */}
        <Box sx={{ 
          position: 'relative',
          height: 3, 
          background: `linear-gradient(90deg, ${getActiveItem().color}30, ${getActiveItem().color}60, ${getActiveItem().color}30)`,
          borderRadius: 2,
          overflow: 'hidden',
          animation: `${slideIn} 0.8s ease-out`,
          boxShadow: `0 1px 6px ${getActiveItem().color}40`
        }} />
        
        {/* Indicateur de statut actif */}
        <Box sx={{
          position: 'absolute',
          top: '50%',
          right: 10,
          transform: 'translateY(-50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: getActiveItem().color,
          boxShadow: `0 0 10px ${getActiveItem().color}`,
          animation: `${pulse} 1.5s ease-in-out infinite`
        }} />
        

      </Box>

      
        
        <List sx={{ 
          pt: 1,
          '& .MuiListItem-root': {
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }
        }}>
        {menu.map((item, index) => {
          const isActive = item.path === activeItem;
          const isHovered = hoveredItem === item.path;
          
          return (
            <ListItem 
              key={item.text} 
              component={Link} 
              to={item.path}
              sx={{
                position: 'relative',
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                background: isActive 
                  ? `linear-gradient(135deg, ${item.color}15 0%, ${item.color}25 100%)`
                  : isHovered 
                    ? 'rgba(0, 0, 0, 0.04)'
                    : 'transparent',
                border: isActive 
                  ? `2px solid ${item.color}` 
                  : '2px solid transparent',
                boxShadow: isActive 
                  ? `0 4px 20px ${item.color}40`
                  : isHovered 
                    ? '0 2px 8px rgba(0, 0, 0, 0.1)'
                    : 'none',
                animation: isActive ? `${pulse} 2s ease-in-out infinite` : 'none',
                '&:hover': {
                  transform: isActive ? 'scale(1.05)' : 'scale(1.02)',
                  background: isActive 
                    ? `linear-gradient(135deg, ${item.color}20 0%, ${item.color}30 100%)`
                    : 'rgba(0, 0, 0, 0.06)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: isActive ? 4 : 0,
                  background: item.color,
                  borderRadius: '0 2px 2px 0',
                  transition: 'width 0.3s ease',
                  animation: isActive ? `${slideIn} 0.5s ease-out` : 'none'
                }
              }}
              onMouseEnter={() => setHoveredItem(item.path)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <ListItemIcon sx={{ 
                color: isActive ? item.color : '#666',
                transition: 'all 0.3s ease',
                transform: isActive ? 'scale(1.2)' : 'scale(1)',
                filter: isActive ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  '& .MuiTypography-root': {
                    fontWeight: isActive ? 'bold' : 'normal',
                    color: isActive ? item.color : '#333',
                    transition: 'all 0.3s ease',
                    fontSize: isActive ? '1rem' : '0.9rem',
                    textShadow: isActive ? `0 1px 2px ${item.color}40` : 'none'
                  }
                }}
              />
              
              {/* Indicateur de statut actif */}
              {isActive && (
                <Box sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: item.color,
                  animation: `${pulse} 1.5s ease-in-out infinite`,
                  boxShadow: `0 0 10px ${item.color}`
                }} />
              )}
            </ListItem>
          );
        })}
        
        {/* Séparateur */}
        <Box sx={{ 
          height: 1, 
          background: 'linear-gradient(90deg, transparent 0%, #e0e0e0 50%, transparent 100%)',
          mx: 2, 
          my: 2 
        }} />
        
        {/* Bouton de déconnexion */}
        <ListItem 
          onClick={handleLogout} 
          sx={{ 
            mx: 1,
            borderRadius: 2,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              transform: 'scale(1.02)',
              boxShadow: '0 2px 8px rgba(244, 67, 54, 0.2)'
            }
          }}
        >
          <ListItemIcon sx={{ color: '#f44336' }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Déconnexion" 
            sx={{
              '& .MuiTypography-root': {
                color: '#f44336',
                fontWeight: 'medium'
              }
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  );
} 