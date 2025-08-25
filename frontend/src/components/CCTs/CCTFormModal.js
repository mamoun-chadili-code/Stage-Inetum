import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Alert,
  FormHelperText,
  Typography,
  Divider,
  Paper,
  IconButton
} from '@mui/material';
import {
  Business as BusinessIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  Add as AddIcon
} from '@mui/icons-material';
import SearchableSelect from '../common/SearchableSelect';
import { toast } from 'react-toastify';

export default function CCTFormModal({ open, onClose, onSubmit, initialValues = {}, dropdowns = {} }) {
  const [formData, setFormData] = React.useState({
    nom: '', 
    agrement: '', 
    dateAgrement: '', 
    categorieId: '', 
    statutId: '', 
    dateStatut: '', 
    reseauId: '', 
    dateRalliement: '', 
    regionId: '', 
    provinceId: '', 
    villeId: '', 
    adresseCCT: '', 
    adresseSiege: '', 
    adresseDomiciliation: '', 
    tel: '', 
    fax: '', 
    mail: '', 
    ice: '', 
    idFiscal: '', 
    cadreAutorisationId: '', 
    engagementSpecifique: '', 
    isPersonneMorale: false, 
    typeId: '', 
    quotaVL: '', 
    quotaPL: '', 
    latitude: '', 
    longitude: '', 
    thumbprintCertificat: ''
  });

  // État pour les erreurs de validation
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      // Formater les dates pour les champs HTML de type "date"
      const formattedInitialValues = {
        ...initialValues,
        dateAgrement: initialValues?.dateAgrement ? initialValues.dateAgrement.split('T')[0] : '',
        dateStatut: initialValues?.dateStatut ? initialValues.dateStatut.split('T')[0] : '',
        dateRalliement: initialValues?.dateRalliement ? initialValues.dateRalliement.split('T')[0] : ''
      };
      
      // S'assurer qu'aucune valeur n'est null ou undefined et formater correctement
      const sanitizedValues = Object.keys(formattedInitialValues).reduce((acc, key) => {
        let value = formattedInitialValues[key];
        
        // Gérer les valeurs numériques
        if (key.includes('Id') && value && value !== '') {
          value = parseInt(value);
          if (isNaN(value)) value = '';
        } else if (key.includes('Id')) {
          value = ''; // Valeur par défaut pour les IDs vides
        }
        
        // Gérer les coordonnées - garder en string pour le backend
        if ((key === 'latitude' || key === 'longitude') && value && value !== '') {
          // Convertir en string si c'est un number, sinon garder en string
          value = value.toString();
        }
        
        // Gérer les quotas
        if ((key === 'quotaVL' || key === 'quotaPL') && value && value !== '') {
          value = parseInt(value);
          if (isNaN(value)) value = '';
        }
        
        acc[key] = value ?? '';
        return acc;
      }, {});
      
      setFormData({ ...formData, ...sanitizedValues });
      
      // Réinitialiser les erreurs
      setErrors({});
    }
  }, [initialValues, open]);

  const handleChange = (field, value) => {
    setFormData(f => ({ ...f, [field]: value }));
    
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckbox = (e) => {
    setFormData(f => ({ ...f, isPersonneMorale: e.target.checked }));
  };

  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    // Champs obligatoires selon le cahier des charges
    if (!formData.nom?.trim()) newErrors.nom = 'Le nom du CCT est obligatoire';
    if (!formData.agrement?.trim()) newErrors.agrement = 'L\'agrément est obligatoire';
    if (!formData.dateAgrement) newErrors.dateAgrement = 'La date d\'agrément est obligatoire';
    if (!formData.categorieId) newErrors.categorieId = 'La catégorie est obligatoire';
    if (!formData.statutId) newErrors.statutId = 'Le statut est obligatoire';
    if (!formData.dateStatut) newErrors.dateStatut = 'La date de statut est obligatoire';
    if (!formData.reseauId) newErrors.reseauId = 'Le réseau est obligatoire';
    if (!formData.dateRalliement) newErrors.dateRalliement = 'La date de ralliement est obligatoire';
    if (!formData.regionId) newErrors.region = 'La région est obligatoire';
    if (!formData.provinceId) newErrors.province = 'La province est obligatoire';
    if (!formData.villeId) newErrors.ville = 'La ville est obligatoire';
    if (!formData.adresseCCT?.trim()) newErrors.adresseCCT = 'L\'adresse est obligatoire';
    if (!formData.latitude?.toString().trim()) newErrors.latitude = 'La latitude est obligatoire';
    if (!formData.longitude?.toString().trim()) newErrors.longitude = 'La longitude est obligatoire';
    if (!formData.tel?.trim()) newErrors.tel = 'Le téléphone est obligatoire';
    if (!formData.cadreAutorisationId) newErrors.cadreAutorisation = 'Le cadre d\'autorisation est obligatoire';
    if (!formData.typeId) newErrors.type = 'Le type est obligatoire';
    if (!formData.quotaVL?.toString().trim()) newErrors.quotaVL = 'Le quota VL est obligatoire';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Log pour debug - vérifier le type des coordonnées
      console.log('=== DEBUG COORDONNÉES ===');
      console.log('Latitude type:', typeof formData.latitude, 'Valeur:', formData.latitude);
      console.log('Longitude type:', typeof formData.longitude, 'Valeur:', formData.longitude);
      console.log('=== FIN DEBUG ===');
      
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast.error('Erreur lors de la sauvegarde du CCT');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditMode = !!initialValues?.id;
  const title = isEditMode ? 'MODIFIER CCT' : '+ AJOUTER CCT';

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
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
          {isEditMode ? <EditIcon /> : <AddIcon />}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            GESTION DES CCTS
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          {/* Section Informations principales */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
              Informations principales
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              <TextField
                fullWidth
                label="CCT *"
                value={formData.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                error={!!errors.nom}
                helperText={errors.nom}
                required
              />
              
              <TextField
                fullWidth
                label="Agrément *"
                value={formData.agrement}
                onChange={(e) => handleChange('agrement', e.target.value)}
                error={!!errors.agrement}
                helperText={errors.agrement}
                required
              />
              
              <TextField
                fullWidth
                label="Date agrément *"
                type="date"
                value={formData.dateAgrement}
                onChange={(e) => handleChange('dateAgrement', e.target.value)}
                error={!!errors.dateAgrement}
                helperText={errors.dateAgrement}
                required
                InputLabelProps={{ shrink: true }}
              />
              
              <TextField
                fullWidth
                label="Date ralliement *"
                type="date"
                value={formData.dateRalliement}
                onChange={(e) => handleChange('dateRalliement', e.target.value)}
                error={!!errors.dateRalliement}
                helperText={errors.dateRalliement}
                required
                InputLabelProps={{ shrink: true }}
              />
              
              <SearchableSelect
                label="Catégorie *"
                value={formData.categorieId}
                onChange={(value) => handleChange('categorieId', value)}
                options={[{ id: '', libelle: 'Sélectionnez un élément' }, ...(dropdowns.categories || [])]}
                placeholder="Sélectionnez un élément"
                getOptionLabel={(option) => option.libelle}
                required
                error={!!errors.categorieId}
                helperText={errors.categorieId}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: '56px',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&:hover': {
                      border: '1px solid #bdbdbd'
                    },
                    '&.Mui-focused': {
                      border: '2px solid #1976d2'
                    }
                  }
                }}
              />
              
              <SearchableSelect
                label="Statut *"
                value={formData.statutId}
                onChange={(value) => handleChange('statutId', value)}
                options={[{ id: '', libelle: 'Sélectionnez un élément' }, ...(dropdowns.statuts || [])]}
                placeholder="Sélectionnez un élément"
                getOptionLabel={(option) => option.libelle}
                required
                error={!!errors.statutId}
                helperText={errors.statutId}
                isStatusField={true}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: '56px',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&:hover': {
                      border: '1px solid #bdbdbd'
                    },
                    '&.Mui-focused': {
                      border: '2px solid #1976d2'
                    }
                  }
                }}
              />
              
              <SearchableSelect
                label="Réseau *"
                value={formData.reseauId}
                onChange={(value) => handleChange('reseauId', value)}
                options={[{ id: '', nom: 'Sélectionnez un élément' }, ...(dropdowns.reseaux || [])]}
                placeholder="Sélectionnez un élément"
                getOptionLabel={(option) => option.nom}
                required
                error={!!errors.reseauId}
                helperText={errors.reseauId}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: '56px',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&:hover': {
                      border: '1px solid #bdbdbd'
                    },
                    '&.Mui-focused': {
                      border: '2px solid #1976d2'
                    }
                  }
                }}
              />
              
              <SearchableSelect
                label="Région *"
                value={formData.regionId}
                onChange={(value) => handleChange('regionId', value)}
                options={[{ id: '', libelle: 'Sélectionnez un élément' }, ...(dropdowns.regions || [])]}
                placeholder="Sélectionnez un élément"
                getOptionLabel={(option) => option.libelle}
                required
                error={!!errors.region}
                helperText={errors.region}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: '56px',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&:hover': {
                      border: '1px solid #bdbdbd'
                    },
                    '&.Mui-focused': {
                      border: '2px solid #1976d2'
                    }
                  }
                }}
              />
              
              <SearchableSelect
                label="Province *"
                value={formData.provinceId}
                onChange={(value) => handleChange('provinceId', value)}
                options={[{ id: '', libelle: 'Sélectionnez un élément' }, ...(dropdowns.provinces || [])]}
                placeholder="Sélectionnez un élément"
                getOptionLabel={(option) => option.libelle}
                required
                error={!!errors.province}
                helperText={errors.province}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: '56px',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&:hover': {
                      border: '1px solid #bdbdbd'
                    },
                    '&.Mui-focused': {
                      border: '2px solid #1976d2'
                    }
                  }
                }}
              />
              
              <SearchableSelect
                label="Ville *"
                value={formData.villeId}
                onChange={(value) => handleChange('villeId', value)}
                options={[{ id: '', nom: 'Sélectionnez un élément' }, ...(dropdowns.villes || [])]}
                placeholder="Sélectionnez un élément"
                getOptionLabel={(option) => option.nom}
                required
                error={!!errors.ville}
                helperText={errors.ville}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: '56px',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&:hover': {
                      border: '1px solid #bdbdbd'
                    },
                    '&.Mui-focused': {
                      border: '2px solid #1976d2'
                    }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Adresse *"
                value={formData.adresseCCT}
                onChange={(e) => handleChange('adresseCCT', e.target.value)}
                error={!!errors.adresseCCT}
                helperText={errors.adresseCCT}
                required
                multiline
                rows={2}
              />
              
              <TextField
                fullWidth
                label="Latitude *"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', e.target.value)}
                error={!!errors.latitude}
                helperText={errors.latitude}
                required
                type="number"
                step="any"
              />
              
              <TextField
                fullWidth
                label="Longitude *"
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', e.target.value)}
                error={!!errors.longitude}
                helperText={errors.longitude}
                required
                type="number"
                step="any"
              />
            </Box>
          </Box>

          {/* Section Informations complémentaires */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
              Informations complémentaires
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              <TextField
                fullWidth
                label="Adresse siège"
                value={formData.adresseSiege}
                onChange={(e) => handleChange('adresseSiege', e.target.value)}
              />
              
              <TextField
                fullWidth
                label="Adresse domiciliation"
                value={formData.adresseDomiciliation}
                onChange={(e) => handleChange('adresseDomiciliation', e.target.value)}
              />
              
              <TextField
                fullWidth
                label="Téléphone *"
                value={formData.tel}
                onChange={(e) => handleChange('tel', e.target.value)}
                error={!!errors.tel}
                helperText={errors.tel}
                required
              />
              
              <TextField
                fullWidth
                label="Fax"
                value={formData.fax}
                onChange={(e) => handleChange('fax', e.target.value)}
              />
              
              <TextField
                fullWidth
                label="Email"
                value={formData.mail}
                onChange={(e) => handleChange('mail', e.target.value)}
                type="email"
              />
              
              <TextField
                fullWidth
                label="ICE"
                value={formData.ice}
                onChange={(e) => handleChange('ice', e.target.value)}
              />
              
              <TextField
                fullWidth
                label="Id. Fiscal"
                value={formData.idFiscal}
                onChange={(e) => handleChange('idFiscal', e.target.value)}
              />
              
              <TextField
                fullWidth
                label="Engagements spécifiques"
                value={formData.engagementSpecifique}
                onChange={(e) => handleChange('engagementSpecifique', e.target.value)}
                multiline
                rows={2}
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isPersonneMorale}
                    onChange={handleCheckbox}
                    color="primary"
                  />
                }
                label="Personne morale *"
              />
              
              <TextField
                fullWidth
                label="Quota VL *"
                value={formData.quotaVL}
                onChange={(e) => handleChange('quotaVL', e.target.value)}
                error={!!errors.quotaVL}
                helperText={errors.quotaVL}
                required
                type="number"
                min="0"
              />
              
              <TextField
                fullWidth
                label="Quota PL"
                value={formData.quotaPL}
                onChange={(e) => handleChange('quotaPL', e.target.value)}
                type="number"
                min="0"
              />
            </Box>
          </Box>

          {/* Section Classification et autorisation */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', mb: 3, pb: 2, borderBottom: '2px solid #e0e0e0' }}>
              Classification et autorisation
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              <SearchableSelect
                label="Type *"
                value={formData.typeId}
                onChange={(value) => handleChange('typeId', value)}
                options={[{ id: '', libelle: 'Sélectionnez un élément' }, ...(dropdowns.types || [])]}
                placeholder="Sélectionnez un élément"
                getOptionLabel={(option) => option.libelle}
                required
                error={!!errors.type}
                helperText={errors.type}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: '56px',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&:hover': {
                      border: '1px solid #bdbdbd'
                    },
                    '&.Mui-focused': {
                      border: '2px solid #1976d2'
                    }
                  }
                }}
              />
            
              <SearchableSelect
                label="Cadre d'autorisation *"
                value={formData.cadreAutorisationId}
                onChange={(value) => handleChange('cadreAutorisationId', value)}
                options={[{ id: '', libelle: 'Sélectionnez un élément' }, ...(dropdowns.cadresAutorisation || [])]}
                placeholder="Sélectionnez un élément"
                getOptionLabel={(option) => option.libelle}
                required
                error={!!errors.cadreAutorisation}
                helperText={errors.cadreAutorisation}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: '56px',
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&:hover': {
                      border: '1px solid #bdbdbd'
                    },
                    '&.Mui-focused': {
                      border: '2px solid #1976d2'
                    }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Date statut *"
                type="date"
                value={formData.dateStatut}
                onChange={(e) => handleChange('dateStatut', e.target.value)}
                error={!!errors.dateStatut}
                helperText={errors.dateStatut}
                required
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    '&:hover': {
                      border: '1px solid #bdbdbd'
                    },
                    '&.Mui-focused': {
                      border: '2px solid #1976d2'
                    }
                  }
                }}
              />
              
              <TextField
                fullWidth
                label="Thumbprint Certificat"
                value={formData.thumbprintCertificat}
                onChange={(e) => handleChange('thumbprintCertificat', e.target.value)}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, bgcolor: '#f5f5f5' }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ minWidth: 120 }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          sx={{ 
            minWidth: 120,
            bgcolor: '#00bcd4',
            '&:hover': {
              bgcolor: '#0097a7'
            }
          }}
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 