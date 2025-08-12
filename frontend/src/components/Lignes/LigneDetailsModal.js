import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  IconButton,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Info as InfoIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon
} from '@mui/icons-material';

export default function LigneDetailsModal({ open, onClose, ligne, onEdit }) {
  if (!ligne) return null;

  const handleEdit = () => {
    if (onEdit) {
      onEdit(ligne);
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'En activité':
        return 'success';
      case 'En construction':
        return 'warning';
      case 'Suspendu':
        return 'error';
      case 'Fermé':
        return 'default';
      case 'En maintenance':
        return 'info';
      case 'En rénovation':
        return 'secondary';
      case 'Projet':
        return 'primary';
      case 'Archivé':
        return 'default';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifiée';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 15px 40px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pr: 2,
        py: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          pointerEvents: 'none'
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <InfoIcon sx={{ mr: 1.5, fontSize: 24 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '0.3px' }}>
            Ligne {ligne.numLigne}
          </Typography>
        </Box>
        <IconButton 
          onClick={handleClose} 
          size="small"
          sx={{ 
            color: 'white',
            '&:hover': { 
              backgroundColor: 'rgba(255,255,255,0.2)',
              transform: 'scale(1.05)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: '#fafafa' }}>
        {/* Informations principales */}
        <Box sx={{ p: 3, bgcolor: 'white', mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#2c3e50', 
              mb: 3, 
              fontWeight: 700,
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -6,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 40,
                height: 2,
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                borderRadius: 1
              }
            }}
          >
            Informations de la Ligne
          </Typography>
          
          <Grid container spacing={2}>
            {/* N° de ligne */}
            <Grid item xs={6}>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#f8f9ff', 
                borderRadius: 2, 
                border: '1px solid #e8eaff',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#667eea',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.15)'
                }
              }}>
                <Typography variant="caption" sx={{ color: '#667eea', fontWeight: 600, letterSpacing: 0.5 }}>
                  N° de ligne
                </Typography>
                <Typography variant="h4" sx={{ color: '#2c3e50', fontWeight: 800, mt: 0.5 }}>
                  {ligne.numLigne}
                </Typography>
              </Box>
            </Grid>

            {/* Catégorie */}
            <Grid item xs={6}>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#f0fff4', 
                borderRadius: 2, 
                border: '1px solid #dcfce7',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#22c55e',
                  boxShadow: '0 4px 15px rgba(34, 197, 94, 0.15)'
                }
              }}>
                <Typography variant="caption" sx={{ color: '#16a34a', fontWeight: 600, letterSpacing: 0.5 }}>
                  Catégorie
                </Typography>
                <Typography variant="body2" sx={{ color: '#15803d', fontWeight: 600, mt: 0.5, lineHeight: 1.2 }}>
                  {ligne.categorie}
                </Typography>
              </Box>
            </Grid>

            {/* CCT */}
            <Grid item xs={6}>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#f0f9ff', 
                borderRadius: 2, 
                border: '1px solid #bae6fd',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#0ea5e9',
                  boxShadow: '0 4px 15px rgba(14, 165, 233, 0.15)'
                }
              }}>
                <Typography variant="caption" sx={{ color: '#0284c7', fontWeight: 600, letterSpacing: 0.5 }}>
                  CCT
                </Typography>
                <Typography variant="body2" sx={{ color: '#0369a1', fontWeight: 600, mt: 0.5, lineHeight: 1.2 }}>
                  {ligne.cct}
                </Typography>
              </Box>
            </Grid>

            {/* Statut */}
            <Grid item xs={6}>
              <Box sx={{ 
                p: 2.5, 
                bgcolor: '#fef3c7', 
                borderRadius: 2, 
                border: '1px solid #fde68a',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#f59e0b',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.15)'
                }
              }}>
                <Typography variant="caption" sx={{ color: '#d97706', fontWeight: 600, letterSpacing: 0.5, mb: 1, display: 'block' }}>
                  Statut
                </Typography>
                <Chip
                  label={ligne.statut}
                  color={getStatusColor(ligne.statut)}
                  size="small"
                  sx={{ 
                    fontWeight: 600, 
                    fontSize: '0.75rem',
                    height: 28,
                    '& .MuiChip-label': {
                      px: 2,
                      py: 0.5
                    }
                  }}
                />
              </Box>
            </Grid>

            {/* Date statut */}
            <Grid item xs={6}>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#fdf4ff', 
                borderRadius: 2, 
                border: '1px solid #f3e8ff',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#a855f7',
                  boxShadow: '0 4px 15px rgba(168, 85, 247, 0.15)'
                }
              }}>
                <Typography variant="caption" sx={{ color: '#9333ea', fontWeight: 600, letterSpacing: 0.5 }}>
                  Date statut
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <CalendarIcon sx={{ color: '#a855f7', fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: '#7c3aed', fontWeight: 600 }}>
                    {formatDate(ligne.dateStatut)}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Décision */}
            <Grid item xs={6}>
              <Box sx={{ 
                p: 2, 
                bgcolor: '#fff7ed', 
                borderRadius: 2, 
                border: '1px solid #fed7aa',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#ea580c',
                  boxShadow: '0 4px 15px rgba(234, 88, 12, 0.15)'
                }
              }}>
                <Typography variant="caption" sx={{ color: '#c2410c', fontWeight: 600, letterSpacing: 0.5 }}>
                  Décision
                </Typography>
                <Typography variant="body2" sx={{ color: '#9a3412', fontWeight: 600, mt: 0.5, lineHeight: 1.2 }}>
                  {ligne.id ? 'Modification' : 'Création'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Informations géographiques */}
        {(ligne.region && ligne.region !== 'N/A') || 
         (ligne.ville && ligne.ville !== 'N/A') || 
         (ligne.reseau && ligne.reseau !== 'N/A') ? (
          <Box sx={{ p: 3, bgcolor: 'white', mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#2c3e50', 
                mb: 2, 
                fontWeight: 700,
                textAlign: 'center',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 30,
                  height: 2,
                  background: 'linear-gradient(90deg, #10b981, #059669)',
                  borderRadius: 1
                }
              }}
            >
              Géographie
            </Typography>
            
            <Grid container spacing={2}>
              {ligne.region && ligne.region !== 'N/A' && (
                <Grid item xs={4}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: '#f0fdf4', 
                    borderRadius: 2, 
                    border: '1px solid #bbf7d0',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#22c55e',
                      boxShadow: '0 4px 15px rgba(34, 197, 94, 0.15)'
                    }
                  }}>
                    <LocationIcon sx={{ color: '#16a34a', fontSize: 20, mb: 1 }} />
                    <Typography variant="caption" sx={{ color: '#15803d', fontWeight: 600, letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                      Région
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#166534', fontWeight: 600, fontSize: '0.75rem' }}>
                      {ligne.region}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {ligne.ville && ligne.ville !== 'N/A' && (
                <Grid item xs={4}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: '#f0f9ff', 
                    borderRadius: 2, 
                    border: '1px solid #bae6fd',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#0ea5e9',
                      boxShadow: '0 4px 15px rgba(14, 165, 233, 0.15)'
                    }
                  }}>
                    <LocationIcon sx={{ color: '#0284c7', fontSize: 20, mb: 1 }} />
                    <Typography variant="caption" sx={{ color: '#0369a1', fontWeight: 600, letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                      Ville
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#0c4a6e', fontWeight: 600, fontSize: '0.75rem' }}>
                      {ligne.ville}
                    </Typography>
                  </Box>
                </Grid>
              )}

              {ligne.reseau && ligne.reseau !== 'N/A' && (
                <Grid item xs={4}>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: '#fdf4ff', 
                    borderRadius: 2, 
                    border: '1px solid #f3e8ff',
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#a855f7',
                      boxShadow: '0 4px 15px rgba(168, 85, 247, 0.15)'
                    }
                  }}>
                    <BusinessIcon sx={{ color: '#9333ea', fontSize: 20, mb: 1 }} />
                    <Typography variant="caption" sx={{ color: '#7c3aed', fontWeight: 600, letterSpacing: 0.5, display: 'block', mb: 0.5 }}>
                      Réseau
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#581c87', fontWeight: 600, fontSize: '0.75rem' }}>
                      {ligne.reseau}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        ) : null}

        {/* Note d'information */}
        <Box sx={{ p: 3, bgcolor: 'white' }}>
          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: 2,
              background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
              border: '1px solid #93c5fd',
              '& .MuiAlert-icon': {
                color: '#1d4ed8',
                fontSize: 20
              }
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 500, color: '#1e40af', lineHeight: 1.4 }}>
              <strong>Info :</strong> Cette ligne est actuellement 
              <strong> {ligne.statut.toLowerCase()}</strong>. 
              {ligne.statut === 'En activité' ? ' Opérationnelle.' :
               ligne.statut === 'En construction' ? ' En construction.' :
               ligne.statut === 'Suspendue' ? ' Temporairement suspendue.' :
               ligne.statut === 'Fermée' ? ' Fermée.' :
               ligne.statut === 'En maintenance' ? ' En maintenance.' :
               ligne.statut === 'En rénovation' ? ' En rénovation.' :
               ligne.statut === 'Projet' ? ' En projet.' :
               ligne.statut === 'Archivée' ? ' Archivée.' :
               ' Statut particulier.'}
            </Typography>
          </Alert>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, gap: 1.5, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <Button
          onClick={handleEdit}
          startIcon={<EditIcon />}
          variant="contained"
          size="medium"
          sx={{ 
            minWidth: 120,
            height: 40,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 2,
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.3px',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.25)',
            '&:hover': { 
              background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.35)',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          Saisir
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          size="medium"
          sx={{ 
            minWidth: 120,
            height: 40,
            borderRadius: 2,
            fontWeight: 500,
            fontSize: '0.875rem',
            letterSpacing: '0.3px',
            border: '1px solid #cbd5e1',
            color: '#64748b',
            '&:hover': {
              borderColor: '#94a3b8',
              backgroundColor: '#f1f5f9',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
} 