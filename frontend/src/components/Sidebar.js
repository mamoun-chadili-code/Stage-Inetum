import React from 'react';
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

import { Link } from 'react-router-dom';

const menu = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Réseaux', icon: <SettingsEthernetIcon />, path: '/reseaux' },
  { text: 'CCT', icon: <PeopleIcon />, path: '/cct' },
  { text: 'Agents', icon: <PeopleIcon />, path: '/agents' },
  { text: 'Chefs de Centre', icon: <PeopleIcon />, path: '/chefs-centre' },
  { text: 'Formations', icon: <SchoolIcon />, path: '/formations' },
  { text: 'Lignes', icon: <DirectionsBusIcon />, path: '/lignes' },
  { text: 'Équipements', icon: <DevicesIcon />, path: '/equipements' },
  { text: 'Décisions', icon: <GavelIcon />, path: '/decisions' },

];

export default function Sidebar({ onThemeToggle, darkMode }) {
  return (
    <Drawer variant="permanent" anchor="left" sx={{ width: 220, flexShrink: 0, '& .MuiDrawer-paper': { width: 220, boxSizing: 'border-box' } }}>
      <List>
        {menu.map(item => (
          <ListItem key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
} 