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
  
  // Logs de débogage pour diagnostiquer le problème
  console.log('FormationDetailsModal - Formation reçue:', formation);
  console.log('FormationDetailsModal - valideParFormateur:', formation.valideParFormateur);
  console.log('FormationDetailsModal - valideCHEH:', formation.valideCHEH);
  console.log('FormationDetailsModal - dateValidation:', formation.dateValidation);
  console.log('FormationDetailsModal - Type de dateValidation:', typeof formation.dateValidation);

  const formatDate = (dateString) => {
    console.log('FormationDetailsModal - formatDate - Entrée:', dateString, 'Type:', typeof dateString);
    
    if (!dateString) {
      console.log('FormationDetailsModal - formatDate - Date vide, retourne "-"');
      return '-';
    }
    
    try {
      const date = new Date(dateString);
      console.log('FormationDetailsModal - formatDate - Date créée:', date);
      
      if (isNaN(date.getTime())) {
        console.log('FormationDetailsModal - formatDate - Date invalide, retourne "-"');
        return '-';
      }
      
      const result = date.toLocaleDateString('fr-FR');
      console.log('FormationDetailsModal - formatDate - Résultat formaté:', result);
      return result;
    } catch (error) {
      console.error('FormationDetailsModal - formatDate - Erreur:', error);
      return '-';
    }
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
            <Typography variant="h6" gutterBottom color="primary">
              Informations générales
            </Typography>
            
            {/* Intitulé - Pleine largeur */}
            <TextField
              label="Intitulé"
              value={formation.intitule || '-'}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
            
            {/* Nom agent et CCT - Côte à côte */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Nom agent"
                value={formation.agent || '-'}
                fullWidth
                margin="dense"
                InputProps={{ readOnly: true }}
              />
              
              <TextField
                label="CCT"
                value={formation.cct || '-'}
                fullWidth
                margin="dense"
                InputProps={{ readOnly: true }}
              />
            </Box>
            
            {/* Chef de centre - Pleine largeur */}
            <TextField
              label="Chef de centre"
              value={formation.chefCentre || '-'}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
            
            {/* Type de Formation - Pleine largeur */}
            <TextField
              label="Type de Formation"
              value={formation.typeFormation || '-'}
              fullWidth
              margin="dense"
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
            
            {/* Début et Fin - Côte à côte */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Début"
                value={formatDate(formation.dateDebut)}
                fullWidth
                margin="dense"
                InputProps={{ readOnly: true }}
              />
              
              <TextField
                label="Fin"
                value={formatDate(formation.dateFin)}
                fullWidth
                margin="dense"
                InputProps={{ readOnly: true }}
              />
            </Box>
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
              
              {formation.valideParFormateur && formation.valideCHEH && (
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Validé le"
                    value={formation.dateValidation ? formatDate(formation.dateValidation) : 'Date non renseignée'}
                    fullWidth
                    margin="dense"
                    InputProps={{ readOnly: true }}
                    sx={{
                      '& .MuiInputBase-input': {
                        color: formation.dateValidation ? 'inherit' : '#f44336'
                      }
                    }}
                  />
                </Grid>
              )}
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="2ème Animateur"
                  value={formation.deuxiemeAnimateur || '-'}
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