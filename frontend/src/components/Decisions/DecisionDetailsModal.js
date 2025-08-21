import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  Chip,
  Divider,
  Link
} from '@mui/material';
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const DecisionDetailsModal = ({ open, decision, onClose }) => {
  if (!decision) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatMontant = (montant) => {
    if (!montant) return '-';
    return `${montant.toLocaleString('fr-FR')} DH`;
  };

  const renderDetailRow = (label, value, color = 'text.primary') => (
    <Grid item xs={12} sm={6}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {label}
        </Typography>
        <Typography variant="body1" color={color} sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Grid>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: '#1976d2',
          color: 'white',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon sx={{ mr: 1 }} />
          DÉTAILS DE DÉCISION
        </Box>
        <Typography
          variant="body2"
          component="a"
          href="#"
          sx={{ color: 'white', textDecoration: 'none' }}
        >
          GESTION DES DÉCISIONS
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Paper sx={{ p: 3, bgcolor: '#f8f9fa' }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 3, pb: 1, borderBottom: '2px solid #1976d2' }}>
            DÉTAILS DE DÉCISION
          </Typography>

          <Grid container spacing={3}>
            {/* Informations principales */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
                Informations principales
              </Typography>
              <Grid container spacing={2}>
                {renderDetailRow('CCT', decision.cctNom || '-')}
                {renderDetailRow('Réseau', decision.reseauNom || '-')}
                {renderDetailRow('Date référence', formatDate(decision.dateReference))}
                {renderDetailRow('Type Décision', 
                  <Chip label={decision.typeDecision} size="small" color="primary" variant="outlined" />
                )}
                {renderDetailRow('Entité concernée', 
                  <Chip label={decision.entiteConcernee} size="small" color="secondary" variant="outlined" />
                )}
                {renderDetailRow('Agent', decision.agentNom || '-')}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Informations supplémentaires */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
                Informations supplémentaires
              </Typography>
              <Grid container spacing={2}>
                {renderDetailRow('Date début', formatDate(decision.dateDebut))}
                {renderDetailRow('Date fin', formatDate(decision.dateFin))}
                {renderDetailRow('Montant', formatMontant(decision.montant))}
                {renderDetailRow('Chef de centre', decision.chefCentreNom || '-')}
                {renderDetailRow('Ligne', decision.ligneNumero || '-')}
                {renderDetailRow('Type Entité', decision.entiteConcernee)}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Document et observations */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
                Document et observations
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Lien du document
                    </Typography>
                    {decision.lienDocument ? (
                      <Link
                        href={decision.lienDocument}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: '#1976d2', 
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' }
                        }}
                      >
                        Consulter
                      </Link>
                    ) : (
                      <Typography variant="body1" color="text.secondary">
                        Aucun document
                      </Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Observation
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      {decision.observation || 'Aucune observation'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Informations d'audit */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
                Informations d'audit
              </Typography>
              <Grid container spacing={2}>
                {renderDetailRow('Date de création', formatDate(decision.dateCreation))}
                {renderDetailRow('Utilisateur de création', decision.utilisateurCreation || '-')}
                {renderDetailRow('Date de modification', formatDate(decision.dateModification))}
                {renderDetailRow('Utilisateur de modification', decision.utilisateurModification || '-')}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          startIcon={<CloseIcon />}
          variant="outlined"
          color="inherit"
        >
          Fermer
        </Button>
        <Button
          startIcon={<EditIcon />}
          variant="contained"
          sx={{ bgcolor: '#1976d2' }}
          onClick={() => {
            // Ici on pourrait ouvrir le formulaire de modification
            // Pour l'instant, on ferme juste la modale
            onClose();
          }}
        >
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DecisionDetailsModal;
