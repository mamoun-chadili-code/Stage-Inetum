import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Button,
  Divider,
  Alert,
  IconButton,
  Tooltip,
  Avatar,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  DirectionsCar as DirectionsCarIcon,
  Assignment as AssignmentIcon,
  History as HistoryIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  VerifiedUser as VerifiedUserIcon,
  Analytics as AnalyticsIcon,
  Support as SupportIcon,
  Book as BookIcon,
  Lightbulb as LightbulbIcon,
  School as SchoolIcon
} from '@mui/icons-material';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Données simulées pour les statistiques
  const stats = {
    totalCCTs: 156,
    totalAgents: 1247,
    totalChefsCentre: 89,
    totalLignes: 342,
    totalFormations: 67,
    totalEquipements: 234,
    totalDecisions: 189,
    totalReseaux: 23
  };

  // Fonctionnalités principales de la plateforme
  const mainFeatures = [
    {
      title: "Gestion des CCTs",
      description: "Centres de Contrôle Technique - Gestion complète des centres, autorisations et quotas",
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
      color: '#1976d2'
    },
    {
      title: "Gestion des Agents",
      description: "Suivi des agents, CAP, affectations et performances",
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
      color: '#4caf50'
    },
    {
      title: "Gestion des Chefs de Centre",
      description: "Administration des responsables et affectations",
      icon: <PersonIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
      color: '#ff9800'
    },
    {
      title: "Gestion des Lignes",
      description: "Contrôle des lignes de contrôle technique",
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      color: '#9c27b0'
    },
    {
      title: "Gestion des Formations",
      description: "Programmes de formation et certifications",
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#00bcd4' }} />,
      color: '#00bcd4'
    },
    {
      title: "Gestion des Équipements",
      description: "Suivi des équipements et maintenance",
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#f44336' }} />,
      color: '#f44336'
    }
  ];

  // Avantages de la plateforme
  const platformBenefits = [
    "Centralisation de toutes les données de contrôle technique",
    "Gestion automatisée des autorisations et quotas",
    "Suivi en temps réel des affectations et performances",
    "Historique complet des modifications et décisions",
    "Interface intuitive et responsive pour tous les utilisateurs",
    "Sécurité renforcée avec authentification et autorisations",
    "Rapports et analyses détaillés",
    "Conformité aux réglementations en vigueur"
  ];

  // Guide d'utilisation rapide
  const quickGuide = [
    {
      step: 1,
      title: "Navigation",
      description: "Utilisez le menu latéral pour accéder aux différents modules"
    },
    {
      step: 2,
      title: "Recherche",
      description: "Utilisez les filtres et la recherche pour trouver rapidement les informations"
    },
    {
      step: 3,
      title: "Actions",
      description: "Cliquez sur les boutons d'action (Ajouter, Modifier, Consulter, Supprimer)"
    },
    {
      step: 4,
      title: "Détails",
      description: "Consultez les détails complets avec les onglets Informations et Historique"
    }
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* En-tête du Dashboard */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.2)' }}>
              <DashboardIcon sx={{ fontSize: 40 }} />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              Tableau de Bord Administratif
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Plateforme de Gestion des Centres de Contrôle Technique
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
              Bienvenue, Administrateur • {currentTime.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {currentTime.toLocaleTimeString('fr-FR')}
            </Typography>
          </Grid>
          <Grid item>
            <Chip 
              icon={<VerifiedUserIcon />} 
              label="Administrateur" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                color: 'white', 
                fontSize: '1rem',
                height: 40
              }} 
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Statistiques générales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <BusinessIcon sx={{ fontSize: 50, mb: 2, opacity: 0.8 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {stats.totalCCTs}
              </Typography>
              <Typography variant="h6">Centres CCT</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                Centres de Contrôle Technique
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <PeopleIcon sx={{ fontSize: 50, mb: 2, opacity: 0.8 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {stats.totalAgents}
              </Typography>
              <Typography variant="h6">Agents</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                Agents certifiés CAP
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <PersonIcon sx={{ fontSize: 50, mb: 2, opacity: 0.8 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {stats.totalChefsCentre}
              </Typography>
              <Typography variant="h6">Chefs de Centre</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                Responsables de centres
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ height: '100%', background: 'linear-gradient(135deg, #9c27b0 0%, #ba68c8 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <DirectionsCarIcon sx={{ fontSize: 50, mb: 2, opacity: 0.8 }} />
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                {stats.totalLignes}
              </Typography>
              <Typography variant="h6">Lignes</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                Lignes de contrôle
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contenu principal */}
      <Grid container spacing={4}>
        {/* Colonne gauche - Informations sur la plateforme */}
        <Grid item xs={12} lg={8}>
          {/* À propos de la plateforme */}
          <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                color: '#1976d2',
                fontWeight: 'bold',
                mb: 3
              }}>
                <InfoIcon />
                À propos de la plateforme
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                La <strong>Plateforme de Gestion des Centres de Contrôle Technique (CCT)</strong> est un système intégré 
                conçu pour centraliser et optimiser la gestion de tous les aspects liés au contrôle technique des véhicules 
                au Maroc. Cette solution complète permet aux administrateurs, chefs de centre et agents de travailler 
                efficacement dans un environnement sécurisé et organisé.
              </Typography>

              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mt: 3, mb: 2 }}>
                🎯 Objectifs principaux
              </Typography>
              <List>
                {platformBenefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={benefit} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Fonctionnalités principales */}
          <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                color: '#1976d2',
                fontWeight: 'bold',
                mb: 3
              }}>
                <SettingsIcon />
                Fonctionnalités principales
              </Typography>
              
              <Grid container spacing={3}>
                {mainFeatures.map((feature, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper elevation={2} sx={{ p: 3, height: '100%', borderLeft: `4px solid ${feature.color}` }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        {feature.icon}
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: feature.color }}>
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Guide d'utilisation */}
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                color: '#1976d2',
                fontWeight: 'bold',
                mb: 3
              }}>
                <BookIcon />
                Guide d'utilisation rapide
              </Typography>
              
              <Grid container spacing={3}>
                {quickGuide.map((step) => (
                  <Grid item xs={12} md={6} key={step.step}>
                    <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: '#1976d2', width: 40, height: 40 }}>
                          {step.step}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          {step.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Colonne droite - Informations pratiques */}
        <Grid item xs={12} lg={4}>
          {/* Statut du système */}
          <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: '#1976d2',
                fontWeight: 'bold'
              }}>
                <AnalyticsIcon />
                Statut du système
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Performance générale
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={95} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  95% - Excellent
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Disponibilité
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={99.9} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  99.9% - Très élevée
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Sécurité
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={100} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  100% - Maximale
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <Card elevation={3} sx={{ mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: '#1976d2',
                fontWeight: 'bold'
              }}>
                <SupportIcon />
                Support et contact
              </Typography>
              
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email support" 
                    secondary="support@ctcneh.ma"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Téléphone" 
                    secondary="+212 5 22 98 76 54"
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon>
                    <LocationOnIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Adresse" 
                    secondary="Rabat, Maroc"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Conseils et astuces */}
          <Card elevation={3}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: '#1976d2',
                fontWeight: 'bold'
              }}>
                <LightbulbIcon />
                Conseils et astuces
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>💡 Astuce :</strong> Utilisez les raccourcis clavier pour naviguer plus rapidement dans l'interface.
                </Typography>
              </Alert>
              
              <Alert severity="success" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>✅ Bonne pratique :</strong> Sauvegardez régulièrement vos modifications et vérifiez l'historique des actions.
                </Typography>
              </Alert>
              
              <Alert severity="warning">
                <Typography variant="body2">
                  <strong>⚠️ Rappel :</strong> Respectez les procédures de sécurité et ne partagez jamais vos identifiants.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pied de page informatif */}
      <Paper elevation={2} sx={{ p: 3, mt: 4, textAlign: 'center', bgcolor: '#f8f9fa' }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Plateforme de Gestion CCT</strong> • Version 2.0 • Développée pour la CNEH • 
          © 2024 Tous droits réservés
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Système de gestion intégré pour les Centres de Contrôle Technique du Maroc
        </Typography>
      </Paper>
    </Box>
  );
} 