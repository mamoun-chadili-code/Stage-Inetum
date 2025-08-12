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
  Autocomplete,
  Box,
  Alert,
  FormHelperText,
  Chip,
  Typography
} from '@mui/material';
import SearchableSelect from '../common/SearchableSelect';
import { Business as BusinessIcon, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';

export default function CCTFormModal({ open, onClose, onSubmit, initialValues = {}, dropdowns = {} }) {
  const [form, setForm] = React.useState({
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

  // État pour la province
  const [provinceText, setProvinceText] = React.useState('');
  const [provinceSearchTerm, setProvinceSearchTerm] = React.useState('');
  const [isProvinceFreeText, setIsProvinceFreeText] = React.useState(false);
  
  // État pour les erreurs de validation
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
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
         if (isNaN(value)) value = 0;
       } else if (key.includes('Id')) {
         value = 0; // Valeur par défaut pour les IDs vides
       }
      
      // Gérer les coordonnées
      if ((key === 'latitude' || key === 'longitude') && value && value !== '') {
        if (typeof value === 'string') {
          value = parseFloat(value);
          if (isNaN(value)) value = '';
        }
        // Si c'est déjà un nombre, le garder tel quel
      }
      
      // Gérer les quotas
      if ((key === 'quotaVL' || key === 'quotaPL') && value && value !== '') {
        value = parseInt(value);
        if (isNaN(value)) value = '';
      }
      
      acc[key] = value ?? '';
      return acc;
    }, {});
    
    setForm({ ...form, ...sanitizedValues });
    
    // Initialiser le texte de la province
    if (initialValues?.provinceId) {
      const province = dropdowns.provinces?.find(p => p.id === initialValues?.provinceId);
      if (province) {
        setProvinceText(province.libelle || '');
        setIsProvinceFreeText(false);
      } else {
        setProvinceText('');
        setIsProvinceFreeText(true);
      }
    } else {
      setProvinceText('');
      setIsProvinceFreeText(false);
    }
    
    // Réinitialiser les erreurs
    setErrors({});
    // eslint-disable-next-line
  }, [initialValues, open, dropdowns.provinces]);

  const handleChange = (field, value) => {
    // Gérer les coordonnées pour qu'elles restent des nombres si elles en sont
    let processedValue = value;
    
    if ((field === 'latitude' || field === 'longitude') && value !== '') {
      if (typeof value === 'string') {
        const numValue = parseFloat(value);
        processedValue = isNaN(numValue) ? value : numValue;
      }
    }
    
    setForm(f => ({ ...f, [field]: processedValue }));
    
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckbox = (e) => {
    setForm(f => ({ ...f, isPersonneMorale: e.target.checked }));
  };

  // Fonction de filtrage intelligente pour les provinces
  const filterProvinces = (options, inputValue) => {
    if (!inputValue) return options;
    
    const searchTerm = inputValue.toLowerCase().trim();
    
    // Si la recherche est trop courte, retourner toutes les options
    if (searchTerm.length < 2) return options;
    
    return options.filter(option => {
      // Recherche exacte par nom de province (priorité haute)
      if (option.libelle?.toLowerCase() === searchTerm) return true;
      
      // Recherche par nom de province (priorité moyenne)
      if (option.libelle?.toLowerCase().includes(searchTerm)) return true;
      
      // Recherche par code de province (priorité moyenne)
      if (option.code?.toLowerCase().includes(searchTerm)) return true;
      
      // Recherche par correspondance au début du nom (priorité haute)
      if (option.libelle?.toLowerCase().startsWith(searchTerm)) return true;
      
      // Recherche par mots-clés (séparation par espaces)
      const words = searchTerm.split(' ').filter(word => word.length > 1);
      if (words.length > 0) {
        return words.every(word => 
          option.libelle?.toLowerCase().includes(word) || 
          option.code?.toLowerCase().includes(word)
        );
      }
      
      return false;
    }).sort((a, b) => {
      // Tri intelligent : correspondance exacte en premier, puis début de mot, puis inclusion
      const aLibelle = a.libelle?.toLowerCase() || '';
      const bLibelle = b.libelle?.toLowerCase() || '';
      
      if (aLibelle === searchTerm && bLibelle !== searchTerm) return -1;
      if (bLibelle === searchTerm && aLibelle !== searchTerm) return 1;
      
      if (aLibelle.startsWith(searchTerm) && !bLibelle.startsWith(searchTerm)) return -1;
      if (bLibelle.startsWith(searchTerm) && !aLibelle.startsWith(searchTerm)) return 1;
      
      return aLibelle.localeCompare(bLibelle);
    });
  };

  // Gérer le changement de la province (sélection ou saisie libre)
  const handleProvinceChange = (event, newValue) => {
    if (newValue && typeof newValue === 'object' && newValue.id) {
      // Une option existante a été sélectionnée
      setProvinceText(newValue.libelle || '');
      handleChange('provinceId', newValue.id);
      setIsProvinceFreeText(false);
      setProvinceSearchTerm('');
    } else if (typeof newValue === 'string' && newValue.trim()) {
      // Saisie libre
      setProvinceText(newValue.trim());
      handleChange('provinceId', '');
      setIsProvinceFreeText(true);
      setProvinceSearchTerm('');
    } else {
      // Valeur vide
      setProvinceText('');
      handleChange('provinceId', '');
      setIsProvinceFreeText(false);
      setProvinceSearchTerm('');
    }
    
    // Effacer l'erreur de la province
    if (errors.provinceId) {
      setErrors(prev => ({ ...prev, provinceId: '' }));
    }
  };

  // Gérer la saisie libre de la province
  const handleProvinceInputChange = (event, newInputValue) => {
    setProvinceSearchTerm(newInputValue);
    
    // Si l'utilisateur tape quelque chose qui ne correspond à aucune option
    if (newInputValue && !dropdowns.provinces?.some(p => 
      p.libelle?.toLowerCase().includes(newInputValue.toLowerCase()) ||
      p.code?.toLowerCase().includes(newInputValue.toLowerCase())
    )) {
      setIsProvinceFreeText(true);
      setProvinceText(newInputValue);
      handleChange('provinceId', '');
    }
  };



  // Validation du formulaire
  const validateForm = () => {
    const newErrors = {};
    
    // Validation des champs obligatoires (gérer les types string et number)
    if (!form.nom || (typeof form.nom === 'string' && !form.nom.trim())) {
      newErrors.nom = 'Le nom est obligatoire';
    }
    if (!form.agrement || (typeof form.agrement === 'string' && !form.agrement.trim())) {
      newErrors.agrement = "L'agrément est obligatoire";
    }
    if (!form.dateAgrement) {
      newErrors.dateAgrement = 'La date d\'agrément est obligatoire';
    }
    if (!form.categorieId) {
      newErrors.categorieId = 'La catégorie est obligatoire';
    }
    if (!form.statutId) {
      newErrors.statutId = 'Le statut est obligatoire';
    }
    if (!form.dateStatut) {
      newErrors.dateStatut = 'La date de statut est obligatoire';
    }
    if (!form.reseauId) {
      newErrors.reseauId = 'Le réseau est obligatoire';
    }
    if (!form.dateRalliement) {
      newErrors.dateRalliement = 'La date de ralliement est obligatoire';
    }
    if (!form.regionId || form.regionId === '') {
      newErrors.regionId = 'La région est obligatoire';
    }
    if (!form.provinceId && (!provinceText || (typeof provinceText === 'string' && !provinceText.trim()))) {
      newErrors.provinceId = 'La province est obligatoire';
    }
    if (!form.villeId || form.villeId === '') {
      newErrors.villeId = 'La ville est obligatoire';
    }
    if (!form.adresseCCT || (typeof form.adresseCCT === 'string' && !form.adresseCCT.trim())) {
      newErrors.adresseCCT = 'L\'adresse est obligatoire';
    }
    
    // Validation des coordonnées
    if (!form.latitude || form.latitude === '') {
      newErrors.latitude = 'La latitude est obligatoire';
    } else {
      const lat = typeof form.latitude === 'string' ? parseFloat(form.latitude) : form.latitude;
      if (isNaN(lat) || lat < -90 || lat > 90) {
        newErrors.latitude = 'La latitude doit être un nombre entre -90 et 90';
      }
    }
    
    if (!form.longitude || form.longitude === '') {
      newErrors.longitude = 'La longitude est obligatoire';
    } else {
      const lng = typeof form.longitude === 'string' ? parseFloat(form.longitude) : form.longitude;
      if (isNaN(lng) || lng < -180 || lng > 180) {
        newErrors.longitude = 'La longitude doit être un nombre entre -180 et 180';
      }
    }
    
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
      // Préparer les données finales
      const finalFormData = { ...form };
      
      // Si c'est une saisie libre de province, utiliser le texte saisi
      if (isProvinceFreeText && provinceText && (typeof provinceText === 'string' ? provinceText.trim() : provinceText.toString())) {
        finalFormData.provinceText = typeof provinceText === 'string' ? provinceText.trim() : provinceText.toString();
        finalFormData.provinceId = null; // Pas d'ID pour une saisie libre
      }
      
      // Fonction utilitaire pour convertir en nombre de manière sécurisée
      const safeParseInt = (value) => {
        if (!value || value === '') return 0;
        const parsed = parseInt(value);
        return isNaN(parsed) ? 0 : parsed;
      };
      
      const safeParseFloat = (value) => {
        if (!value || value === '') return undefined;
        const parsed = typeof value === 'string' ? parseFloat(value) : value;
        return isNaN(parsed) ? undefined : parsed;
      };
      
      // Convertir les IDs en nombres avec gestion des valeurs vides
      finalFormData.categorieId = safeParseInt(finalFormData.categorieId) || 0;
      finalFormData.statutId = safeParseInt(finalFormData.statutId) || 0;
      finalFormData.reseauId = safeParseInt(finalFormData.reseauId) || 0;
      finalFormData.regionId = safeParseInt(finalFormData.regionId) || 0;
      finalFormData.provinceId = safeParseInt(finalFormData.provinceId) || 0;
      finalFormData.villeId = safeParseInt(finalFormData.villeId) || 0;
      finalFormData.cadreAutorisationId = safeParseInt(finalFormData.cadreAutorisationId) || 0;
      finalFormData.typeId = safeParseInt(finalFormData.typeId) || 0;
      
      // Convertir les quotas en nombres
      finalFormData.quotaVL = safeParseInt(finalFormData.quotaVL);
      finalFormData.quotaPL = safeParseInt(finalFormData.quotaPL);
      
      // Convertir les coordonnées en chaînes (le backend attend des chaînes)
      finalFormData.latitude = finalFormData.latitude ? finalFormData.latitude.toString() : '';
      finalFormData.longitude = finalFormData.longitude ? finalFormData.longitude.toString() : '';
      
      // S'assurer que tous les champs obligatoires ont des valeurs valides
      const requiredFields = ['nom', 'agrement', 'dateAgrement', 'categorieId', 'statutId', 'dateStatut', 'reseauId', 'dateRalliement', 'regionId', 'provinceId', 'villeId', 'adresseCCT', 'latitude', 'longitude', 'cadreAutorisationId', 'typeId'];
      
      // Forcer les valeurs par défaut pour les champs obligatoires
      requiredFields.forEach(field => {
        if (finalFormData[field] === '' || finalFormData[field] === null || finalFormData[field] === undefined) {
          if (field === 'latitude' || field === 'longitude') {
            finalFormData[field] = '0';
          } else if (field.includes('Id')) {
            finalFormData[field] = 0;
          } else {
            finalFormData[field] = '';
          }
        }
      });
      
      // Nettoyer les champs optionnels vides
      Object.keys(finalFormData).forEach(key => {
        if (!requiredFields.includes(key) && (finalFormData[key] === '' || finalFormData[key] === null || finalFormData[key] === undefined)) {
          delete finalFormData[key];
        }
      });
      
      console.log('=== DÉBOGAGE CCT ===');
      console.log('Données finales à envoyer:', finalFormData);
      console.log('Structure des données:', JSON.stringify(finalFormData, null, 2));
      console.log('Champs obligatoires vérifiés:', requiredFields);
      console.log('Champs présents:', Object.keys(finalFormData));
      console.log('Types des valeurs:');
      Object.keys(finalFormData).forEach(key => {
        console.log(`  ${key}: ${typeof finalFormData[key]} = ${finalFormData[key]}`);
      });
      console.log('Vérification des champs critiques:');
      console.log(`  regionId: ${finalFormData.regionId} (type: ${typeof finalFormData.regionId})`);
      console.log(`  villeId: ${finalFormData.villeId} (type: ${typeof finalFormData.villeId})`);
      console.log(`  provinceId: ${finalFormData.provinceId} (type: ${typeof finalFormData.provinceId})`);
      console.log('=== FIN DÉBOGAGE ===');
      await onSubmit(finalFormData);
    } catch (error) {
      console.error('Erreur lors de la soumission:', error);
      toast.error('Erreur lors de l\'enregistrement');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BusinessIcon />
          <Typography variant="h6">{form.id ? 'Modifier CCT' : 'Ajouter CCT'}</Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          {/* Message d'information */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2" component="div">
              <strong>Les champs marqués d'un * sont obligatoires.</strong>
              <br />
              <strong>Champ Province :</strong> Recherche intelligente par nom ou code, correspondance partielle, et saisie libre pour nouvelles valeurs.
            </Typography>
          </Alert>

          <Grid container spacing={2}>
            {/* Colonne 1 */}
            <Grid xs={12} md={6}>
              <TextField 
                label="CCT*" 
                value={form.nom} 
                onChange={e => handleChange('nom', e.target.value)} 
                fullWidth 
                required 
                margin="dense"
                error={!!errors.nom}
                helperText={errors.nom}
              />
              <TextField 
                label="Agrément*" 
                value={form.agrement} 
                onChange={e => handleChange('agrement', e.target.value)} 
                fullWidth 
                required 
                margin="dense"
                error={!!errors.agrement}
                helperText={errors.agrement}
              />
              <TextField 
                label="Date agrément*" 
                type="date" 
                value={form.dateAgrement} 
                onChange={e => handleChange('dateAgrement', e.target.value)} 
                fullWidth 
                required 
                margin="dense" 
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateAgrement}
                helperText={errors.dateAgrement}
              />
              <SearchableSelect
                label="Catégorie*"
                value={form.categorieId}
                onChange={(value) => handleChange('categorieId', value)}
                options={dropdowns.categories || []}
                required
                placeholder="Rechercher une catégorie..."
                getOptionLabel={(option) => option.libelle}
                error={!!errors.categorieId}
                helperText={errors.categorieId}
              />
              <SearchableSelect
                label="Statut*"
                value={form.statutId}
                onChange={(value) => handleChange('statutId', value)}
                options={dropdowns.statuts || []}
                required
                placeholder="Rechercher un statut..."
                getOptionLabel={(option) => option.libelle}
                error={!!errors.statutId}
                helperText={errors.statutId}
                isStatusField={true}
              />
              <TextField 
                label="Date statut*" 
                type="date" 
                value={form.dateStatut} 
                onChange={e => handleChange('dateStatut', e.target.value)} 
                fullWidth 
                required 
                margin="dense" 
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateStatut}
                helperText={errors.dateStatut}
              />
              <SearchableSelect
                label="Réseau*"
                value={form.reseauId}
                onChange={(value) => handleChange('reseauId', value)}
                options={dropdowns.reseaux || []}
                required
                placeholder="Rechercher un réseau..."
                getOptionLabel={(option) => option.nom}
                error={!!errors.reseauId}
                helperText={errors.reseauId}
              />
              <TextField 
                label="Date ralliement*" 
                type="date" 
                value={form.dateRalliement} 
                onChange={e => handleChange('dateRalliement', e.target.value)} 
                fullWidth 
                required 
                margin="dense" 
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateRalliement}
                helperText={errors.dateRalliement}
              />
              <SearchableSelect
                label="Région*"
                value={form.regionId}
                onChange={(value) => handleChange('regionId', value)}
                options={dropdowns.regions || []}
                required
                placeholder="Rechercher une région..."
                getOptionLabel={(option) => option.libelle}
                error={!!errors.regionId}
                helperText={errors.regionId}
              />
              
              {/* Champ Province avec recherche intelligente et saisie libre */}
              <Box sx={{ position: 'relative' }}>
                <Autocomplete
                  freeSolo
                  options={filterProvinces(dropdowns.provinces || [], provinceSearchTerm)}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') return option;
                    return option.libelle || '';
                  }}
                  inputValue={provinceSearchTerm}
                  value={isProvinceFreeText ? provinceText : (dropdowns.provinces?.find(p => p.id === form.provinceId) || '')}
                  onInputChange={handleProvinceInputChange}
                  onChange={handleProvinceChange}
                  filterOptions={(options, { inputValue }) => filterProvinces(options, inputValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Province*"
                      required
                      margin="dense"
                      placeholder="Rechercher une province ou saisir librement..."
                      helperText={
                        errors.provinceId || 
                        (isProvinceFreeText ? 
                          "Saisie libre activée - vous pouvez taper n'importe quelle valeur" : 
                          "Tapez pour rechercher ou sélectionner une province existante")
                      }
                      error={!!errors.provinceId}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                            <SearchIcon sx={{ color: 'action.active', fontSize: 20 }} />
                            {isProvinceFreeText && (
                              <Chip 
                                label="Saisie libre" 
                                size="small" 
                                color="warning" 
                                variant="outlined"
                                icon={<AddIcon />}
                                sx={{ ml: 1, fontSize: '0.7rem' }}
                              />
                            )}
                          </Box>
                        )
                      }}
                    />
                  )}
                  renderOption={(props, option) => {
                    const { key, ...otherProps } = props;
                    return (
                      <Box component="li" key={key} {...otherProps} sx={{ py: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                          <Box sx={{ 
                            fontWeight: 'bold', 
                            color: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}>
                            {option.libelle}
                            {option.code && (
                              <Chip 
                                label={option.code} 
                                size="small" 
                                color="primary" 
                                variant="outlined"
                                sx={{ fontSize: '0.6rem', height: 20 }}
                              />
                            )}
                          </Box>
                          {option.code && (
                            <Box sx={{ 
                              fontSize: '0.75rem', 
                              color: 'text.secondary',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}>
                              Code: {option.code}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    );
                  }}
                  isOptionEqualToValue={(option, value) => {
                    if (typeof value === 'string') return option.libelle === value;
                    return option.id === value.id;
                  }}
                  noOptionsText={
                    provinceSearchTerm ? 
                    `Aucune province trouvée pour "${provinceSearchTerm}". Vous pouvez saisir librement cette valeur.` : 
                    "Aucune province disponible"
                  }
                  loading={false}
                  sx={{
                    '& .MuiAutocomplete-inputRoot': {
                      paddingLeft: isProvinceFreeText ? 8 : 8
                    }
                  }}
                />
                
                {/* Indicateurs visuels et statistiques */}
                <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {/* Statistiques de recherche */}
                  {provinceSearchTerm && (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                      fontSize: '0.75rem',
                      color: 'text.secondary'
                    }}>
                      <SearchIcon sx={{ fontSize: 16 }} />
                      <span>
                        {filterProvinces(dropdowns.provinces || [], provinceSearchTerm).length} 
                        province(s) trouvée(s) pour "{provinceSearchTerm}"
                      </span>
                    </Box>
                  )}
                  
                  {/* Indicateur pour la saisie libre */}
                  {isProvinceFreeText && provinceText && (
                    <Box sx={{ 
                      p: 1, 
                      bgcolor: 'warning.light', 
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'warning.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <AddIcon sx={{ color: 'warning.main', fontSize: 16 }} />
                      <Typography variant="caption" color="warning.dark">
                        <strong>Saisie libre activée :</strong> "{provinceText}" sera enregistré comme nouvelle province
                      </Typography>
                    </Box>
                  )}
                  
                  {/* Indicateur pour la sélection existante */}
                  {!isProvinceFreeText && form.provinceId && (
                    <Box sx={{ 
                      p: 1, 
                      bgcolor: 'success.light', 
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'success.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <SearchIcon sx={{ color: 'success.main', fontSize: 16 }} />
                      <Typography variant="caption" color="success.dark">
                        <strong>Province sélectionnée :</strong> {provinceText}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
              
              <SearchableSelect
                label="Ville*"
                value={form.villeId}
                onChange={(value) => handleChange('villeId', value)}
                options={dropdowns.villes || []}
                required
                placeholder="Rechercher une ville..."
                getOptionLabel={(option) => option.nom}
                error={!!errors.villeId}
                helperText={errors.villeId}
              />
              <TextField 
                label="Adresse*" 
                value={form.adresseCCT} 
                onChange={e => handleChange('adresseCCT', e.target.value)} 
                fullWidth 
                required 
                margin="dense"
                error={!!errors.adresseCCT}
                helperText={errors.adresseCCT}
              />
              <TextField 
                label="Latitude*" 
                value={form.latitude} 
                onChange={e => handleChange('latitude', e.target.value)} 
                fullWidth 
                required 
                margin="dense"
                error={!!errors.latitude}
                helperText={errors.latitude}
              />
              <TextField 
                label="Longitude*" 
                value={form.longitude} 
                onChange={e => handleChange('longitude', e.target.value)} 
                fullWidth 
                required 
                margin="dense"
                error={!!errors.longitude}
                helperText={errors.longitude}
              />
            </Grid>
            {/* Colonne 2 */}
            <Grid xs={12} md={6}>
              <TextField label="Adresse siège" value={form.adresseSiege} onChange={e => handleChange('adresseSiege', e.target.value)} fullWidth margin="dense" />
              <TextField label="Adresse domiciliation" value={form.adresseDomiciliation} onChange={e => handleChange('adresseDomiciliation', e.target.value)} fullWidth margin="dense" />
              <TextField label="Tel" value={form.tel} onChange={e => handleChange('tel', e.target.value)} fullWidth margin="dense" />
              <TextField label="Fax" value={form.fax} onChange={e => handleChange('fax', e.target.value)} fullWidth margin="dense" />
              <TextField label="Mail" value={form.mail} onChange={e => handleChange('mail', e.target.value)} fullWidth margin="dense" />
              <TextField label="ICE" value={form.ice} onChange={e => handleChange('ice', e.target.value)} fullWidth margin="dense" />
              <TextField label="Id. Fiscal" value={form.idFiscal} onChange={e => handleChange('idFiscal', e.target.value)} fullWidth margin="dense" />
              <SearchableSelect
                label="Cadre d'autorisation*"
                value={form.cadreAutorisationId}
                onChange={(value) => handleChange('cadreAutorisationId', value)}
                options={dropdowns.cadresAutorisation || []}
                required
                placeholder="Rechercher un cadre d'autorisation..."
                getOptionLabel={(option) => option.libelle}
                error={!!errors.cadreAutorisationId}
                helperText={errors.cadreAutorisationId}
              />
              <TextField label="Engagements spécifiques" value={form.engagementSpecifique} onChange={e => handleChange('engagementSpecifique', e.target.value)} fullWidth margin="dense" />
              <FormControlLabel control={<Checkbox checked={form.isPersonneMorale} onChange={handleCheckbox} />} label="Personne morale" sx={{ mt: 1 }} />
              <SearchableSelect
                label="Type*"
                value={form.typeId}
                onChange={(value) => handleChange('typeId', value)}
                options={dropdowns.types || []}
                required
                placeholder="Rechercher un type..."
                getOptionLabel={(option) => option.libelle}
                error={!!errors.typeId}
                helperText={errors.typeId}
              />
              <TextField label="Quota VL" value={form.quotaVL} onChange={e => handleChange('quotaVL', e.target.value)} fullWidth margin="dense" />
              <TextField label="Quota PL" value={form.quotaPL} onChange={e => handleChange('quotaPL', e.target.value)} fullWidth margin="dense" />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" disabled={isSubmitting}>
          Annuler
        </Button>
        <Button 
          onClick={handleSubmit} 
          color="primary" 
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </DialogActions>
    </Dialog>
  );
} 