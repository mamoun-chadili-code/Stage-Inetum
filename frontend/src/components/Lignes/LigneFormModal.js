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
  Schedule as ScheduleIcon,
  Event as EventIcon
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
  reseaux
}) => {
  const [formData, setFormData] = useState({
    numeroLigne: '',
    categorieId: '',
    cctId: '',
    statutId: '',
    dateStatut: new Date()
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
        dateStatut: ligne.dateStatut ? new Date(ligne.dateStatut) : new Date()
      });
    } else {
      // Mode ajout
      setFormData({
        numeroLigne: '',
        categorieId: '',
        cctId: '',
        statutId: '',
        dateStatut: new Date()
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
        statutId: parseInt(formData.statutId)
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
            {ligne ? 'MODIFIER LIGNE' : 'AJOUTER LIGNE'}
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
            
            {/* Section 1: Informations principales */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon />
                Informations principales
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* CCT */}
                <FormControl fullWidth error={!!errors.cctId}>
                  <InputLabel>
                    CCT <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Select
                    value={formData.cctId}
                    onChange={(e) => handleChange('cctId', e.target.value)}
                    label="CCT *"
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

                {/* N° de ligne */}
                <TextField
                  fullWidth
                  label={
                    <span>
                      N° de ligne <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  type="number"
                  value={formData.numeroLigne}
                  onChange={(e) => handleChange('numeroLigne', e.target.value)}
                  error={!!errors.numeroLigne}
                  helperText={errors.numeroLigne}
                  disabled={loading}
                  inputProps={{ min: 1, max: 999 }}
                  required
                />

                {/* Catégorie */}
                <FormControl fullWidth error={!!errors.categorieId}>
                  <InputLabel>
                    Catégorie <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Select
                    value={formData.categorieId}
                    onChange={(e) => handleChange('categorieId', e.target.value)}
                    label="Catégorie *"
                    disabled={loading}
                  >
                    <MenuItem value="">
                      <em>Sélectionnez une catégorie</em>
                    </MenuItem>
                    {categories?.map((categorie) => {
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

                      const categorieColor = getCategorieColor(categorie.libelle || categorie.nom);

                      return (
                        <MenuItem key={categorie.id} value={categorie.id}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, width: '100%' }}>
                            {/* Point coloré */}
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: categorieColor,
                                flexShrink: 0,
                                mt: 0.5,
                                border: '1px solid rgba(0,0,0,0.1)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                              }}
                            />
                            {/* Contenu de la catégorie */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                              <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                                {categorie.libelle || categorie.nom}
                              </Typography>
                              {categorie.description && (
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: 'text.secondary', 
                                    fontSize: '0.75rem',
                                    fontStyle: 'italic',
                                    mt: 0.5
                                  }}
                                >
                                  {categorie.description}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.categorieId && (
                    <FormHelperText error>{errors.categorieId}</FormHelperText>
                  )}
                </FormControl>

                {/* Statut */}
                <FormControl fullWidth error={!!errors.statutId}>
                  <InputLabel>
                    Statut <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Select
                    value={formData.statutId}
                    onChange={(e) => handleChange('statutId', e.target.value)}
                    label="Statut *"
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

                {/* Date statut */}
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                  <DatePicker
                    label={
                      <span>
                        Date statut <span style={{ color: 'red' }}>*</span>
                      </span>
                    }
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
              </Box>
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