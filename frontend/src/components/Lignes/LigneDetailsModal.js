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
  Close as CloseIcon
} from '@mui/icons-material';

const LigneDetailsModal = ({ open, onClose, ligne, onEdit }) => {
  if (!ligne) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('fr-FR');
  };

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
            <ViewIcon color="info" />
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Catégorie:
                      </Typography>
                      <Chip 
                        label={ligne.categorieNom || 'N/A'} 
                        color="secondary" 
                        size="small"
                      />
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

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Année de démarrage:
                    </Typography>
                    <Typography variant="body1">
                      {ligne.anneeDemarrage || 'N/A'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Informations de décision */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Décision et Statut
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Décision:
                    </Typography>
                    <Chip 
                      label={ligne.decisionNom || 'N/A'} 
                      color="warning" 
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date Décision:
                    </Typography>
                    <Typography variant="body1">
                      {formatDateTime(ligne.dateDecision)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Année de démarrage:
                    </Typography>
                    <Typography variant="body1">
                      {ligne.anneeDemarrage || 'N/A'}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ID de la ligne:
                    </Typography>
                    <Typography variant="body1" fontFamily="monospace">
                      #{ligne.id}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Informations techniques */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Informations Techniques
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ID Catégorie:
                    </Typography>
                    <Typography variant="body1" fontFamily="monospace">
                      {ligne.categorieId}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ID CCT:
                    </Typography>
                    <Typography variant="body1" fontFamily="monospace">
                      {ligne.cctId}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ID Statut:
                    </Typography>
                    <Typography variant="body1" fontFamily="monospace">
                      {ligne.statutId}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      ID Décision:
                    </Typography>
                    <Typography variant="body1" fontFamily="monospace">
                      {ligne.decisionId || 'N/A'}
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