import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  School as SchoolIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  DateRange as DateRangeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

export default function FormationDetailsModal({ open, onClose, formation, onEdit }) {
  if (!formation) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon color="primary" />
          <Typography variant="h6">Détails de Formation</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom color="primary">
                  Informations générales
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Intitulé"
                  value={formation.intitule || '-'}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nom agent"
                  value={formation.agent || '-'}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="CCT"
                  value={formation.cct || '-'}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Type de Formation"
                  value={formation.typeFormation || '-'}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Début"
                  value={formatDate(formation.dateDebut)}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Fin"
                  value={formatDate(formation.dateFin)}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="primary">
              Validation et animateurs
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="body1">Validé par formateur(s):</Typography>
                  {formation.valideParFormateur ? (
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="Oui" 
                      color="success" 
                      size="small" 
                    />
                  ) : (
                    <Chip 
                      icon={<CancelIcon />} 
                      label="Non" 
                      color="default" 
                      size="small" 
                    />
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Typography variant="body1">Validé CHEH:</Typography>
                  {formation.valideCHEH ? (
                    <Chip 
                      icon={<CheckCircleIcon />} 
                      label="Oui" 
                      color="success" 
                      size="small" 
                    />
                  ) : (
                    <Chip 
                      icon={<CancelIcon />} 
                      label="Non" 
                      color="default" 
                      size="small" 
                    />
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="1er Animateur"
                  value={formation.premierAnimateur || '-'}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="2ème Animateur"
                  value={formation.deuxiemeAnimateur || '-'}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Validé le"
                  value={formatDate(formation.valideLe)}
                  fullWidth
                  margin="dense"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {formation.matiere && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Matière
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {formation.matiere}
              </Typography>
            </CardContent>
          </Card>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fermer</Button>
        <Button variant="contained" onClick={onEdit}>
          Saisir
        </Button>
      </DialogActions>
    </Dialog>
  );
} 