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
  AccordionDetails,
  CircularProgress
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
  School as SchoolIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { dashboardService } from '../../services/dashboardService';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState(0);
  const [stats, setStats] = useState({
    totalCCTs: 0,
    totalAgents: 0,
    totalChefsCentre: 0,
    totalLignes: 0,
    totalFormations: 0,
    totalEquipements: 0,
    totalDecisions: 0,
    totalReseaux: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Fonction pour charger les statistiques
  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const realStats = await dashboardService.getRealTimeStats();
      setStats(realStats);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err);
      setError('Impossible de charger les statistiques. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  // Charger les statistiques au montage du composant
  useEffect(() => {
    loadStats();
  }, []);

  // Mettre à jour l'heure chaque seconde
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Recharger les statistiques toutes les 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadStats();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  // Nom de l'utilisateur
  const userName = "Administrateur";

  // Fonctionnalités principales de la plateforme
  const mainFeatures = [
    {
      title: "Gestion des CCTs",
      description: "Centres de Contrôle Technique - Gestion complète des centres, autorisations et quotas",
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#1976d2' }} />
    },
    {
      title: "Gestion des Agents",
      description: "Suivi des agents, CAP, affectations et performances",
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
    },
    {
      title: "Gestion des Chefs de Centre",
      description: "Administration des responsables et affectations",
      icon: <PersonIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
    },
    {
      title: "Gestion des Lignes",
      description: "Contrôle des lignes de contrôle technique",
      icon: <DirectionsCarIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
    },
    {
      title: "Gestion des Formations",
      description: "Programmes de formation et certifications",
      icon: <SchoolIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
    },
    {
      title: "Gestion des Équipements",
      description: "Suivi des équipements et maintenance",
      icon: <AssignmentIcon sx={{ fontSize: 40, color: '#1565c0' }} />
    }
  ];

  // Fonction pour formater le nombre avec séparateurs de milliers
  const formatNumber = (num) => {
    return num.toLocaleString('fr-FR');
  };

  // Fonction pour afficher la date de dernière mise à jour
  const formatLastUpdate = (date) => {
    if (!date) return 'Jamais';
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* En-tête du Dashboard */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#1976d2', color: 'white' }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar sx={{ width: 60, height: 60, bgcolor: 'rgba(255,255,255,0.2)' }}>
              <DashboardIcon />
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Tableau de Bord
            </Typography>
            <Typography variant="h6">
              Bienvenue, {userName}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {currentTime.toLocaleDateString('fr-FR')} - {currentTime.toLocaleTimeString('fr-FR')}
            </Typography>
            {lastUpdate && (
              <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
                Dernière mise à jour : {formatLastUpdate(lastUpdate)}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Chip 
                icon={<VerifiedUserIcon />} 
                label="Administrateur" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} 
              />
              <Button
                variant="outlined"
                size="small"
                startIcon={<RefreshIcon />}
                onClick={loadStats}
                disabled={loading}
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {loading ? <CircularProgress size={16} /> : 'Actualiser'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Message d'erreur */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
          <Button 
            size="small" 
            onClick={loadStats} 
            sx={{ ml: 2 }}
            disabled={loading}
          >
            Réessayer
          </Button>
        </Alert>
      )}

      {/* Statistiques générales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <BusinessIcon sx={{ fontSize: 50, mb: 2, color: '#1976d2' }} />
              {loading ? (
                <CircularProgress size={40} sx={{ mb: 2 }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {formatNumber(stats.totalCCTs)}
                </Typography>
              )}
              <Typography variant="h6">Centres CCT</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Centres de Contrôle Technique
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <PeopleIcon sx={{ fontSize: 50, mb: 2, color: '#2e7d32' }} />
              {loading ? (
                <CircularProgress size={40} sx={{ mb: 2 }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {formatNumber(stats.totalAgents)}
                </Typography>
              )}
              <Typography variant="h6">Agents</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Agents certifiés CAP
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <PersonIcon sx={{ fontSize: 50, mb: 2, color: '#ed6c02' }} />
              {loading ? (
                <CircularProgress size={40} sx={{ mb: 2 }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {formatNumber(stats.totalChefsCentre)}
                </Typography>
              )}
              <Typography variant="h6">Chefs de Centre</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Responsables de centres
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <DirectionsCarIcon sx={{ fontSize: 50, mb: 2, color: '#9c27b0' }} />
              {loading ? (
                <CircularProgress size={40} sx={{ mb: 2 }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {formatNumber(stats.totalLignes)}
                </Typography>
              )}
              <Typography variant="h6">Lignes</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Lignes de contrôle
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Statistiques supplémentaires */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <SchoolIcon sx={{ fontSize: 50, mb: 2, color: '#d32f2f' }} />
              {loading ? (
                <CircularProgress size={40} sx={{ mb: 2 }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {formatNumber(stats.totalFormations)}
                </Typography>
              )}
              <Typography variant="h6">Formations</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Programmes de formation
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <AssignmentIcon sx={{ fontSize: 50, mb: 2, color: '#1565c0' }} />
              {loading ? (
                <CircularProgress size={40} sx={{ mb: 2 }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {formatNumber(stats.totalEquipements)}
                </Typography>
              )}
              <Typography variant="h6">Équipements</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Matériel et maintenance
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CheckCircleIcon sx={{ fontSize: 50, mb: 2, color: '#2e7d32' }} />
              {loading ? (
                <CircularProgress size={40} sx={{ mb: 2 }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {formatNumber(stats.totalDecisions)}
                </Typography>
              )}
              <Typography variant="h6">Décisions</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Autorisations et décisions
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <LocationOnIcon sx={{ fontSize: 50, mb: 2, color: '#ff9800' }} />
              {loading ? (
                <CircularProgress size={40} sx={{ mb: 2 }} />
              ) : (
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {formatNumber(stats.totalReseaux)}
                </Typography>
              )}
              <Typography variant="h6">Réseaux</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Réseaux de transport
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
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                color: '#1976d2',
                mb: 3
              }}>
                <InfoIcon />
                À propos de la plateforme
              </Typography>
              
              <Typography variant="body1" sx={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.8,
                color: '#374151',
                mb: 3
              }}>
                La <strong>Plateforme de Gestion des Centres de Contrôle Technique (CCT)</strong> est un système intégré 
                conçu pour centraliser et optimiser la gestion de tous les aspects liés au contrôle technique des véhicules 
                au Maroc. Cette solution complète permet aux administrateurs, chefs de centre et agents de travailler 
                efficacement dans un environnement sécurisé et organisé.
              </Typography>

              <Typography variant="h6" sx={{ color: '#1976d2', mt: 3, mb: 2, fontWeight: 'bold' }}>
                Objectifs principaux
              </Typography>
              <List>
                {[
                  'Centraliser la gestion des CCT et des autorisations',
                  'Optimiser l\'affectation des agents et des ressources',
                  'Assurer le suivi des formations et certifications',
                  'Améliorer la traçabilité des décisions et actions',
                  'Faciliter la coordination entre les différents centres'
                ].map((objective, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography sx={{ 
                          color: '#374151', 
                          fontWeight: 500,
                          fontSize: '0.95rem'
                        }}>
                          {objective}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Fonctionnalités principales */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                color: '#1976d2',
                mb: 3
              }}>
                <SettingsIcon />
                Fonctionnalités principales
              </Typography>
              
              <Grid container spacing={3}>
                {mainFeatures.map((feature, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper sx={{ 
                      p: 3, 
                      height: '100%',
                      borderLeft: `4px solid ${feature.icon.props.sx.color}`,
                      borderRadius: 2
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        {feature.icon}
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#374151' }}>
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ 
                        color: '#6B7280',
                        fontSize: '0.9rem',
                        lineHeight: 1.5
                      }}>
                        {feature.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Guide d'utilisation */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2, 
                color: '#1976d2',
                mb: 3
              }}>
                <BookIcon />
                Guide d'utilisation rapide
              </Typography>
              
              <Grid container spacing={3}>
                {[
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
                ].map((step, index) => (
                  <Grid item xs={12} md={6} key={step.step}>
                    <Paper sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: 2,
                      border: '1px solid #e2e8f0'
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: '#1976d2', width: 40, height: 40 }}>
                          {step.step}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                          {step.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ 
                        color: '#374151',
                        fontSize: '0.9rem',
                        lineHeight: 1.5
                      }}>
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
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: '#1976d2',
                fontWeight: 'bold',
                mb: 2
              }}>
                <AnalyticsIcon />
                Statut du système
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ 
                  color: '#374151', 
                  mb: 1,
                  fontWeight: 500
                }}>
                  Performance générale
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={95} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 1
                  }}
                />
                <Typography variant="caption" sx={{ 
                  color: '#2e7d32', 
                  fontWeight: 'bold'
                }}>
                  95% - Excellent
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ 
                  color: '#374151', 
                  mb: 1,
                  fontWeight: 500
                }}>
                  Disponibilité
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={99.9} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 1
                  }}
                />
                <Typography variant="caption" sx={{ 
                  color: '#2e7d32', 
                  fontWeight: 'bold'
                }}>
                  99.9% - Très élevée
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" sx={{ 
                  color: '#374151', 
                  mb: 1,
                  fontWeight: 500
                }}>
                  Sécurité
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={100} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    mb: 1
                  }}
                />
                <Typography variant="caption" sx={{ 
                  color: '#2e7d32', 
                  fontWeight: 'bold'
                }}>
                  100% - Maximale
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Informations de contact */}
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: '#1976d2',
                fontWeight: 'bold',
                mb: 2
              }}>
                <SupportIcon />
                Support et contact
              </Typography>
              
              <List dense>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon>
                    <EmailIcon sx={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography sx={{ 
                        fontWeight: 500, 
                        color: '#374151'
                      }}>
                        Email support
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ 
                        color: '#2e7d32', 
                        fontWeight: 'bold'
                      }}>
                        support@ctcneh.ma
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon>
                    <PhoneIcon sx={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography sx={{ 
                        fontWeight: 500, 
                        color: '#374151'
                      }}>
                        Téléphone
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ 
                        color: '#2e7d32', 
                        fontWeight: 'bold'
                      }}>
                        +212 5 22 98 76 54
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem sx={{ px: 0, py: 1 }}>
                  <ListItemIcon>
                    <LocationOnIcon sx={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography sx={{ 
                        fontWeight: 500, 
                        color: '#374151'
                      }}>
                        Adresse
                      </Typography>
                    }
                    secondary={
                      <Typography sx={{ 
                        color: '#2e7d32', 
                        fontWeight: 'bold'
                      }}>
                        Rabat, Maroc
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Conseils et astuces */}
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                color: '#1976d2',
                fontWeight: 'bold',
                mb: 2
              }}>
                <LightbulbIcon />
                Conseils et astuces
              </Typography>
              
              <Alert severity="info" sx={{ mb: 2, borderRadius: 2 }}>
                <Typography variant="body2">
                  <strong>💡 Astuce :</strong> Utilisez les raccourcis clavier pour naviguer plus rapidement dans l'interface.
                </Typography>
              </Alert>
              
              <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
                <Typography variant="body2">
                  <strong>✅ Bonne pratique :</strong> Sauvegardez régulièrement vos modifications et vérifiez l'historique des actions.
                </Typography>
              </Alert>
              
              <Alert severity="warning" sx={{ borderRadius: 2 }}>
                <Typography variant="body2">
                  <strong>⚠️ Rappel :</strong> Respectez les procédures de sécurité et ne partagez jamais vos identifiants.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pied de page informatif */}
      <Paper sx={{ 
        p: 3, 
        mt: 4, 
        textAlign: 'center', 
        backgroundColor: '#1976d2',
        color: 'white'
      }}>
        <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
          <strong>🚛 Plateforme de Gestion CCT</strong> • Version 2.0 • Développée pour la CNEH • 
          © 2024 Tous droits réservés
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
          Système de gestion intégré pour les Centres de Contrôle Technique du Maroc
        </Typography>
      </Paper>
    </Box>
  );
} 