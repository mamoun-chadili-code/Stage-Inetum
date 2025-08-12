import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  IconButton,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Close as CloseIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function LigneFormModal({ open, onClose, onSubmit, editingLigne, dropdowns }) {
  const [formData, setFormData] = useState({
    cctId: '',
    numeroLigne: '',
    categorieId: '',
    statutId: '',
    dateStatut: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Réinitialiser le formulaire quand il s'ouvre
  useEffect(() => {
    if (open) {
      if (editingLigne) {
        // Mode édition - remplir avec les données existantes
        console.log('🚨 === MODE ÉDITION - FORMULAIRE ===');
        console.log('🚨 editingLigne reçu:', editingLigne);
        console.log('🚨 Structure editingLigne:', {
          id: editingLigne.id,
          cctId: editingLigne.cctId,
          numLigne: editingLigne.numLigne,
          categorieId: editingLigne.categorieId,
          statutId: editingLigne.statutId,
          dateStatut: editingLigne.dateStatut
        });
        
        // Récupérer les anciennes valeurs
        const oldValues = {
          cctId: editingLigne.cctId || '', // Utiliser cctId si disponible
          numeroLigne: editingLigne.numLigne || '', // Utiliser numLigne (nom du champ dans la base)
          categorieId: editingLigne.categorieId || '', // Utiliser categorieId si disponible
          statutId: editingLigne.statutId || '', // Utiliser statutId si disponible
          dateStatut: editingLigne.dateStatut ? 
            (editingLigne.dateStatut.includes('T') ? 
              editingLigne.dateStatut.split('T')[0] : 
              editingLigne.dateStatut
            ) : ''
        };
        
        console.log('🚨 Anciennes valeurs récupérées:', oldValues);
        console.log('🚨 Types des valeurs:', {
          cctId: typeof oldValues.cctId,
          numeroLigne: typeof oldValues.numeroLigne,
          categorieId: typeof oldValues.categorieId,
          statutId: typeof oldValues.statutId,
          dateStatut: typeof oldValues.dateStatut
        });
        
        setFormData(oldValues);
        
      } else {
        // Mode ajout - formulaire vide
        console.log('🚨 Mode ajout - formulaire vide');
        setFormData({
          cctId: '',
          numeroLigne: '',
          categorieId: '',
          statutId: '',
          dateStatut: ''
        });
      }
      setErrors({});
      setIsSubmitting(false);
    }
  }, [editingLigne, open]);

  const handleInputChange = (field, value) => {
    console.log(`🚨 handleInputChange - ${field}:`, value);
    console.log(`🚨 Type de ${field}:`, typeof value);
    
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      console.log(`🚨 formData après mise à jour de ${field}:`, newData);
      return newData;
    });
    
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validation CCT
    if (!formData.cctId) {
      newErrors.cctId = 'Le CCT est obligatoire';
    }
    
    // Validation N° de ligne
    if (!formData.numeroLigne) {
      newErrors.numeroLigne = 'Le numéro de ligne est obligatoire';
    } else if (isNaN(formData.numeroLigne) || parseInt(formData.numeroLigne) <= 0) {
      newErrors.numeroLigne = 'Le numéro de ligne doit être un nombre positif';
    } else if (parseInt(formData.numeroLigne) > 9999) {
      newErrors.numeroLigne = 'Le numéro de ligne ne peut pas dépasser 9999';
    }
    
    // Validation Catégorie
    if (!formData.categorieId) {
      newErrors.categorieId = 'La catégorie est obligatoire';
    }
    
    // Validation Statut
    if (!formData.statutId) {
      newErrors.statutId = 'Le statut est obligatoire';
    }
    
    // Validation Date statut
    if (!formData.dateStatut) {
      newErrors.dateStatut = 'La date statut est obligatoire';
    } else {
      const selectedDate = new Date(formData.dateStatut);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.dateStatut = 'La date statut ne peut pas être dans le futur';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        console.log('🚨 === DÉBOGAGE FORMULAIRE ===');
        console.log('🚨 formData avant traitement:', formData);
        
        // Vérifier que nous avons bien des IDs numériques
        if (!formData.cctId || !formData.categorieId || !formData.statutId) {
          throw new Error('Tous les champs de sélection doivent avoir des valeurs valides');
        }
        
        // Préparer les données à envoyer
        const submitData = {
          numeroLigne: parseInt(formData.numeroLigne),
          cctId: parseInt(formData.cctId),
          categorieId: parseInt(formData.categorieId),
          statutId: parseInt(formData.statutId),
          dateStatut: formData.dateStatut
        };
        
        console.log('🚨 submitData préparé:', submitData);
        console.log('🚨 Types des données:', {
          numeroLigne: typeof submitData.numeroLigne,
          cctId: typeof submitData.cctId,
          categorieId: typeof submitData.categorieId,
          statutId: typeof submitData.statutId,
          dateStatut: typeof submitData.dateStatut
        });
        
        await onSubmit(submitData);
        // Le modal se fermera automatiquement après la soumission réussie
      } catch (error) {
        console.error('🚨 Erreur lors de la soumission:', error);
        toast.error(error.message || 'Erreur lors de la soumission du formulaire');
        // Réactiver le bouton en cas d'erreur
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const isFormValid = () => {
    return formData.cctId && formData.numeroLigne && formData.categorieId && formData.statutId && formData.dateStatut;
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown={isSubmitting}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {editingLigne ? (
            <>
              <EditIcon />
              <Typography variant="h6">Modifier Ligne</Typography>
            </>
          ) : (
            <>
              <AddIcon />
              <Typography variant="h6">Ajouter Ligne</Typography>
            </>
          )}
        </Box>
        <IconButton 
          onClick={handleClose} 
          sx={{ color: 'white' }}
          disabled={isSubmitting}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        {/* Message d'information */}
        <Alert severity="info" sx={{ mb: 3 }}>
          <Typography variant="body2" component="div">
            <strong>Les champs marqués d'un * sont obligatoires.</strong>
            <br />
            Remplissez tous les champs requis pour créer ou modifier une ligne de contrôle technique.
          </Typography>
        </Alert>

        <Grid container spacing={2}>
          {/* Colonne 1 */}
          <Grid item xs={12} md={6}>
            {/* CCT - Utiliser Select simple au lieu de SearchableSelect */}
            <FormControl fullWidth margin="dense" error={!!errors.cctId}>
              <InputLabel>CCT *</InputLabel>
              <Select
                value={formData.cctId}
                onChange={(e) => handleInputChange('cctId', e.target.value)}
                label="CCT *"
                required
              >
                <MenuItem value="">
                  <em>Sélectionner un CCT</em>
                </MenuItem>
                {dropdowns.ccts?.map((cct) => (
                  <MenuItem key={cct.id} value={cct.id}>
                    {cct.nom}
                  </MenuItem>
                ))}
              </Select>
              {errors.cctId && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.cctId}
                </Typography>
              )}
            </FormControl>
            
            {/* N° de ligne */}
            <TextField
              label="N° de ligne *"
              value={formData.numeroLigne}
              onChange={(e) => handleInputChange('numeroLigne', e.target.value)}
              placeholder="Ex: 1, 2, 3..."
              fullWidth
              required
              margin="dense"
              type="number"
              inputProps={{ 
                min: 1, 
                max: 9999,
                step: 1
              }}
              error={!!errors.numeroLigne}
              helperText={errors.numeroLigne || 'Numéro de la route/ligne (peut se répéter)'}
            />
            
            {/* Catégorie - Utiliser Select simple */}
            <FormControl fullWidth margin="dense" error={!!errors.categorieId}>
              <InputLabel>Catégorie *</InputLabel>
              <Select
                value={formData.categorieId}
                onChange={(e) => handleInputChange('categorieId', e.target.value)}
                label="Catégorie *"
                required
              >
                <MenuItem value="">
                  <em>Sélectionner une catégorie</em>
                </MenuItem>
                {dropdowns.categories?.map((categorie) => (
                  <MenuItem key={categorie.id} value={categorie.id}>
                    {categorie.libelle}
                  </MenuItem>
                ))}
              </Select>
              {errors.categorieId && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.categorieId}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Colonne 2 */}
          <Grid item xs={12} md={6}>
            {/* Statut - Utiliser Select simple */}
            <FormControl fullWidth margin="dense" error={!!errors.statutId}>
              <InputLabel>Statut *</InputLabel>
              <Select
                value={formData.statutId}
                onChange={(e) => handleInputChange('statutId', e.target.value)}
                label="Statut *"
                required
              >
                <MenuItem value="">
                  <em>Sélectionner un statut</em>
                </MenuItem>
                {dropdowns.statuts?.map((statut) => (
                  <MenuItem key={statut.id} value={statut.id}>
                    {statut.libelle}
                  </MenuItem>
                ))}
              </Select>
              {errors.statutId && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                  {errors.statutId}
                </Typography>
              )}
            </FormControl>
            
            {/* Date statut */}
            <TextField
              label="Date statut *"
              type="date"
              value={formData.dateStatut}
              onChange={(e) => handleInputChange('dateStatut', e.target.value)}
              fullWidth
              required
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: new Date().toISOString().split('T')[0]
              }}
              error={!!errors.dateStatut}
              helperText={errors.dateStatut || 'Date de mise à jour du statut'}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={handleClose} 
          color="secondary" 
          disabled={isSubmitting}
          startIcon={<CancelIcon />}
        >
          Annuler
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={!isFormValid() || isSubmitting}
          startIcon={<SaveIcon />}
        >
          {isSubmitting ? 'Enregistrement...' : (editingLigne ? 'Modifier' : 'Enregistrer')}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 