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
  Card,
  CardContent,
  Chip,
  Divider
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  PrivacyTip as PrivacyTipIcon
} from '@mui/icons-material';

const LigneDetailsModal = ({ open, onClose, ligne, categories = [], onEdit }) => {
  if (!ligne) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('fr-FR');
  };

  // Fonction pour obtenir la couleur basée sur la catégorie
  const getCategorieColor = (categorieText) => {
    const text = (categorieText || '').toLowerCase();
    
    if (text.includes('véhicules légers') || text.includes('vl')) {
      return '#84D189'; // Vert personnalisé pour véhicules légers
    } else if (text.includes('poids lourds') || text.includes('pl')) {
      return '#ED6345'; // Rouge personnalisé pour poids lourds
    } else if (text.includes('motocycles') || text.includes('moto')) {
      return '#90C6DE'; // Bleu personnalisé pour motocycles
    } else if (text.includes('toute catégorie') || text.includes('polyvalente')) {
      return '#ED934E'; // Orange personnalisé pour toute catégorie
    }
    return '#9c27b0'; // Violet par défaut
  };

  // Récupérer la catégorie actuelle depuis les données CategorieLignes
  const getCurrentCategorie = () => {
    if (!ligne.categorieId || !categories.length) {
      return { libelle: ligne.categorieNom || 'N/A', description: null };
    }
    
    const categorie = categories.find(cat => cat.id === ligne.categorieId);
    return categorie || { libelle: ligne.categorieNom || 'N/A', description: null };
  };

  const currentCategorie = getCurrentCategorie();
  const categorieColor = getCategorieColor(currentCategorie.libelle);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <PrivacyTipIcon color="info" />
            <Typography variant="h6">
              DETAILS DE LIGNE
            </Typography>
          </Box>
          <Button
            onClick={onClose}
            startIcon={<CloseIcon />}
            variant="text"
            size="small"
          >
            GESTION DES LIGNES
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          {/* Informations principales */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Informations de la Ligne
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        N° de ligne:
                      </Typography>
                      <Chip 
                        label={ligne.numeroLigne} 
                        color="primary" 
                        size="small"
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="flex-start" gap={1}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Catégorie:
                      </Typography>
                      <Box display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
                        <Box display="flex" alignItems="center" gap={1}>
                          {/* Point coloré */}
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: categorieColor,
                              flexShrink: 0,
                              border: '1px solid rgba(0,0,0,0.1)',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                            }}
                          />
                          {/* Texte simple au lieu du Chip */}
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 500,
                              color: 'text.primary'
                            }}
                          >
                            {currentCategorie.libelle}
                          </Typography>
                        </Box>
                        {/* Description de la catégorie */}
                        {currentCategorie.description && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontSize: '0.75rem',
                              fontStyle: 'italic',
                              ml: 2
                            }}
                          >
                            {currentCategorie.description}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        CCT:
                      </Typography>
                      <Chip 
                        label={ligne.cctNom || 'N/A'} 
                        color="info" 
                        size="small"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Statut:
                      </Typography>
                      <Chip 
                        label={ligne.statutNom || 'N/A'} 
                        color="success" 
                        size="small"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date statut:
                    </Typography>
                    <Typography variant="body1">
                      {formatDate(ligne.dateStatut)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>




        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onEdit}
          variant="contained"
          startIcon={<EditIcon />}
          color="primary"
        >
          Saisir
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          startIcon={<CloseIcon />}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LigneDetailsModal; 