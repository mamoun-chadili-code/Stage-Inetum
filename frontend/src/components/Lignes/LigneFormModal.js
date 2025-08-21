import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Typography,
  Alert,
  Chip,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Fade,
  FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  Business as BusinessIcon,
  Category as CategoryIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const LigneFormModal = ({ 
  open, 
  onClose, 
  onSubmit, 
  ligne, 
  categories, 
  ccts, 
  statuts, 
  regions, 
  villes, 
  reseaux,
  decisions
}) => {
  const [formData, setFormData] = useState({
    numeroLigne: '',
    categorieId: '',
    cctId: '',
    statutId: '',
    dateStatut: new Date(),
    decisionId: '',
    dateDecision: null,
    anneeDemarrage: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Initialiser le formulaire
  useEffect(() => {
    if (ligne) {
      // Mode modification
      setFormData({
        numeroLigne: ligne.numeroLigne || '',
        categorieId: ligne.categorieId || '',
        cctId: ligne.cctId || '',
        statutId: ligne.statutId || '',
        dateStatut: ligne.dateStatut ? new Date(ligne.dateStatut) : new Date(),
        decisionId: ligne.decisionId || '',
        dateDecision: ligne.dateDecision ? new Date(ligne.dateDecision) : null,
        anneeDemarrage: ligne.anneeDemarrage || ''
      });
    } else {
      // Mode ajout
      setFormData({
        numeroLigne: '',
        categorieId: '',
        cctId: '',
        statutId: '',
        dateStatut: new Date(),
        decisionId: '',
        dateDecision: null,
        anneeDemarrage: ''
      });
    }
    setErrors({});
  }, [ligne, open]);

  // Gérer les changements de formulaire
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Valider le formulaire
  const validateForm = () => {
    const newErrors = {};

    if (!formData.numeroLigne || formData.numeroLigne < 1) {
      newErrors.numeroLigne = 'Le numéro de ligne est obligatoire et doit être supérieur à 0';
    }

    if (!formData.categorieId) {
      newErrors.categorieId = 'La catégorie est obligatoire';
    }

    if (!formData.cctId) {
      newErrors.cctId = 'Le CCT est obligatoire';
    }

    if (!formData.statutId) {
      newErrors.statutId = 'Le statut est obligatoire';
    }

    if (!formData.dateStatut) {
      newErrors.dateStatut = 'La date de statut est obligatoire';
    }

    // Validation de la cohérence décision/date décision
    if (formData.decisionId && !formData.dateDecision) {
      newErrors.dateDecision = 'La date de décision est obligatoire si une décision est sélectionnée';
    }

    if (!formData.decisionId && formData.dateDecision) {
      newErrors.decisionId = 'Une décision doit être sélectionnée si une date de décision est spécifiée';
    }

    if (formData.anneeDemarrage && (formData.anneeDemarrage < 1900 || formData.anneeDemarrage > 2100)) {
      newErrors.anneeDemarrage = 'L\'année de démarrage doit être entre 1900 et 2100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gérer la soumission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Préparer les données pour l'envoi
      const submitData = {
        ...formData,
        numeroLigne: parseInt(formData.numeroLigne),
        categorieId: parseInt(formData.categorieId),
        cctId: parseInt(formData.cctId),
        statutId: parseInt(formData.statutId),
        decisionId: formData.decisionId ? parseInt(formData.decisionId) : null,
        anneeDemarrage: formData.anneeDemarrage ? parseInt(formData.anneeDemarrage) : null
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fermer le modal
  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      aria-labelledby="form-dialog-title"
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          minHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: '#1976d2', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {ligne ? <EditIcon /> : <AddIcon />}
          <Typography variant="h6">
            {ligne ? 'MODIFIER LIGNE' : '+ AJOUTER LIGNE'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            GESTION DES LIGNES
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Colonne gauche - Informations principales */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: 'fit-content' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
                    Informations principales
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {/* CCT */}
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.cctId}>
                        <InputLabel>CCT*</InputLabel>
                        <Select
                          value={formData.cctId}
                          onChange={(e) => handleChange('cctId', e.target.value)}
                          label="CCT*"
                          disabled={loading}
                        >
                          <MenuItem value="">
                            <em>Sélectionnez un CCT</em>
                          </MenuItem>
                          {ccts?.map((cct) => (
                            <MenuItem key={cct.id} value={cct.id}>
                              {cct.nom}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.cctId && (
                          <FormHelperText error>{errors.cctId}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {/* N° de ligne */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="N° de ligne*"
                        type="number"
                        value={formData.numeroLigne}
                        onChange={(e) => handleChange('numeroLigne', e.target.value)}
                        error={!!errors.numeroLigne}
                        helperText={errors.numeroLigne}
                        disabled={loading}
                        inputProps={{ min: 1, max: 999 }}
                        required
                      />
                    </Grid>

                    {/* Catégorie */}
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.categorieId}>
                        <InputLabel>Catégorie*</InputLabel>
                        <Select
                          value={formData.categorieId}
                          onChange={(e) => handleChange('categorieId', e.target.value)}
                          label="Catégorie*"
                          disabled={loading}
                        >
                          <MenuItem value="">
                            <em>Sélectionnez une catégorie</em>
                          </MenuItem>
                          {categories?.map((categorie) => (
                            <MenuItem key={categorie.id} value={categorie.id}>
                              {categorie.libelle || categorie.nom}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.categorieId && (
                          <FormHelperText error>{errors.categorieId}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Statut */}
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.statutId}>
                        <InputLabel>Statut*</InputLabel>
                        <Select
                          value={formData.statutId}
                          onChange={(e) => handleChange('statutId', e.target.value)}
                          label="Statut*"
                          disabled={loading}
                        >
                          <MenuItem value="">
                            <em>Sélectionnez un statut</em>
                          </MenuItem>
                          {statuts?.map((statut) => (
                            <MenuItem key={statut.id} value={statut.id}>
                              {statut.nom}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.statutId && (
                          <FormHelperText error>{errors.statutId}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Date statut */}
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                        <DatePicker
                          label="Date statut*"
                          value={formData.dateStatut}
                          onChange={(date) => handleChange('dateStatut', date)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              error={!!errors.dateStatut}
                              helperText={errors.dateStatut}
                              disabled={loading}
                              required
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Colonne droite - Informations supplémentaires */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, height: 'fit-content' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
                    Informations supplémentaires
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {/* Année de démarrage */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Année de démarrage"
                        type="number"
                        value={formData.anneeDemarrage}
                        onChange={(e) => handleChange('anneeDemarrage', e.target.value)}
                        error={!!errors.anneeDemarrage}
                        helperText={errors.anneeDemarrage}
                        disabled={loading}
                        inputProps={{ min: 1900, max: 2100 }}
                      />
                    </Grid>

                    {/* Décision */}
                    <Grid item xs={12}>
                      <FormControl fullWidth error={!!errors.decisionId}>
                        <InputLabel>Décision</InputLabel>
                        <Select
                          value={formData.decisionId}
                          onChange={(e) => handleChange('decisionId', e.target.value)}
                          label="Décision"
                          disabled={loading}
                        >
                          <MenuItem value="">
                            <em>Aucune décision</em>
                          </MenuItem>
                          {decisions?.map((decision) => (
                            <MenuItem key={decision.id} value={decision.id}>
                              {decision.nom}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.decisionId && (
                          <FormHelperText error>{errors.decisionId}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Date décision */}
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                        <DatePicker
                          label="Date décision"
                          value={formData.dateDecision}
                          onChange={(date) => handleChange('dateDecision', date)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              error={!!errors.dateDecision}
                              helperText={errors.dateDecision}
                              disabled={loading}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            {/* Section Résumé des Sélections */}
            <Paper elevation={0} sx={{ p: 2, mt: 3, background: 'linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)', borderRadius: 2 }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <CheckCircleIcon color="primary" />
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  Résumé des Sélections
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Chip 
                    icon={<BusinessIcon />}
                    label={`CCT: ${ccts?.find(c => c.id === formData.cctId)?.nom || 'Non sélectionné'}`} 
                    color="primary" 
                    variant="outlined"
                    sx={{ 
                      width: '100%', 
                      justifyContent: 'flex-start',
                      '& .MuiChip-label': { width: '100%' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Chip 
                    icon={<CategoryIcon />}
                    label={`Catégorie: ${categories?.find(c => c.id === formData.categorieId)?.libelle || categories?.find(c => c.id === formData.categorieId)?.nom || 'Non sélectionnée'}`} 
                    color="secondary" 
                    variant="outlined"
                    sx={{ 
                      width: '100%', 
                      justifyContent: 'flex-start',
                      '& .MuiChip-label': { width: '100%' }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Chip 
                    icon={<CheckCircleIcon />}
                    label={`Statut: ${statuts?.find(s => s.id === formData.statutId)?.nom || 'Non sélectionné'}`} 
                    color="info" 
                    variant="outlined"
                    sx={{ 
                      width: '100%', 
                      justifyContent: 'flex-start',
                      '& .MuiChip-label': { width: '100%' }
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: '#f5f5f5' }}>
          <Button
            onClick={handleClose}
            disabled={loading}
            variant="outlined"
            sx={{ minWidth: 120 }}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ 
              minWidth: 120,
              bgcolor: '#00bcd4',
              '&:hover': {
                bgcolor: '#0097a7'
              }
            }}
          >
            {loading ? 'Enregistrement...' : (ligne ? 'Modifier' : 'Enregistrer')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LigneFormModal; 