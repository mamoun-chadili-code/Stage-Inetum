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
  PrivacyTip as PrivacyTipIcon
} from '@mui/icons-material';

const DecisionDetailsModal = ({ open, decision, onClose }) => {
  if (!decision) return null;

  // Log pour déboguer
  console.log('🔍 DecisionDetailsModal - Décision reçue:', decision);
  console.log('🔍 Observation:', decision.observation);
  console.log('🔍 LienDocumentUrl:', decision.lienDocumentUrl);

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
        {React.isValidElement(value) ? (
          <Box sx={{ mt: 1 }}>
            {value}
          </Box>
        ) : (
          <Typography variant="body1" color={color} sx={{ fontWeight: 500 }}>
            {value}
          </Typography>
        )}
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
          <PrivacyTipIcon sx={{ mr: 1 }} />
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
                   <Chip label={decision.typeDecisionLibelle || `Type ${decision.typeDecisionId}`} size="small" color="primary" variant="outlined" />
                 )}
                 {renderDetailRow('Chef de centre', decision.chefCentreNom || '-')}
                 {renderDetailRow('Ligne', decision.ligneNumero || '-')}
                 {renderDetailRow('Agent', decision.agentNom || '-')}
                 {renderDetailRow('Type Entité', decision.entiteTypeLibelle || `Entité ${decision.entiteTypeId}`)}
               </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Section Détails */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ color: '#1976d2', mb: 2, fontWeight: 'bold' }}>
                Détails
              </Typography>
              <Grid container spacing={2}>
                {renderDetailRow('Date début', formatDate(decision.dateDebut))}
                {renderDetailRow('Date fin', formatDate(decision.dateFin))}
                {renderDetailRow('Montant', formatMontant(decision.montant))}
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
                                         {decision.lienDocumentUrl ? (
                       <Link
                         href={decision.lienDocumentUrl}
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
                    {decision.observation ? (
                      <Typography variant="body1" color="text.primary" sx={{ 
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        maxHeight: '100px',
                        overflow: 'auto'
                      }}>
                        {decision.observation}
                      </Typography>
                    ) : (
                      <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                        Aucune observation
                      </Typography>
                    )}
                  </Box>
                </Grid>
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
