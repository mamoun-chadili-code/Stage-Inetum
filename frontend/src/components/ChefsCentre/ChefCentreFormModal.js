import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  Box,
  Typography,
  Divider,
  Paper
} from '@mui/material';
import SearchableSelect from '../common/SearchableSelect';

export default function ChefCentreFormModal({ open, onClose, onSubmit, initialValues = null, dropdowns = {} }) {
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    cin: '',
    CCTId: '',
    dateAffectationCCT: '',
    referenceApprobationCNEH: '',
    anneeAutorisation: '',
    dateApprobationCNEH: '',
    tel: '',
    mail: '',
    cnss: '',
    sexe: false,
    dateNaissance: '',
    niveauFormationInitialId: ''
  });

  useEffect(() => {
    if (initialValues && initialValues.id) {
      const newForm = {
        nom: initialValues.nom || '',
        prenom: initialValues.prenom || '',
        cin: initialValues.cin || '',
        CCTId: initialValues.CCTId || initialValues.cctId || '',
        dateAffectationCCT: initialValues.dateAffectationCCT ? initialValues.dateAffectationCCT.split('T')[0] : '',
        referenceApprobationCNEH: initialValues.referenceApprobationCNEH || '',
        anneeAutorisation: initialValues.anneeAutorisation?.toString() || '',
        dateApprobationCNEH: initialValues.dateApprobationCNEH ? initialValues.dateApprobationCNEH.split('T')[0] : '',
        tel: initialValues.tel || '',
        mail: initialValues.mail || '',
        cnss: initialValues.cnss || '',
        sexe: initialValues.sexe || false,
        dateNaissance: initialValues.dateNaissance ? initialValues.dateNaissance.split('T')[0] : '',
        niveauFormationInitialId: initialValues.niveauFormationInitialId || ''
      };
      setForm(newForm);
    } else {
      setForm({
        nom: '',
        prenom: '',
        cin: '',
        CCTId: '',
        dateAffectationCCT: '',
        referenceApprobationCNEH: '',
        anneeAutorisation: '',
        dateApprobationCNEH: '',
        tel: '',
        mail: '',
        cnss: '',
        sexe: false,
        dateNaissance: '',
        niveauFormationInitialId: ''
      });
    }
  }, [initialValues, open]);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  // Vérifier si les dropdowns sont chargés
  const dropdownsLoaded = dropdowns && dropdowns.ccts && dropdowns.niveauxFormation;

  if (!dropdownsLoaded) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ 
        backgroundColor: '#f5f5f5', 
        borderBottom: '2px solid #1976d2',
        color: '#1976d2',
        fontWeight: 'bold'
      }}>
        {initialValues?.id ? 'Modifier Chef de Centre' : 'Ajouter Chef de Centre'}
      </DialogTitle>
      <DialogContent sx={{ p: 3, backgroundColor: '#fafafa' }}>
        <form onSubmit={handleSubmit}>
          {/* Section Informations Personnelles */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: 'white' }}>
            <Typography variant="h6" sx={{ 
              color: '#1976d2', 
              mb: 2, 
              pb: 1, 
              borderBottom: '2px solid #e3f2fd',
              fontWeight: 'bold'
            }}>
              Informations Personnelles
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <TextField
                label="Nom*"
                value={form.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                sx={{ minWidth: '250px', flex: 1 }}
                required
                margin="dense"
                variant="outlined"
                size="medium"
              />
              
              <TextField
                label="Prénom*"
                value={form.prenom}
                onChange={(e) => handleChange('prenom', e.target.value)}
                sx={{ minWidth: '250px', flex: 1 }}
                required
                margin="dense"
                variant="outlined"
                size="medium"
              />
              
              <TextField
                label="CIN*"
                value={form.cin}
                onChange={(e) => handleChange('cin', e.target.value)}
                sx={{ minWidth: '250px', flex: 1 }}
                required
                margin="dense"
                variant="outlined"
                size="medium"
              />
              
              <TextField
                label="Date de naissance"
                type="date"
                value={form.dateNaissance}
                onChange={(e) => handleChange('dateNaissance', e.target.value)}
                sx={{ minWidth: '250px', flex: 1 }}
                margin="dense"
                variant="outlined"
                size="medium"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
              <FormControl component="fieldset" margin="dense" sx={{ minWidth: '250px' }}>
                <FormLabel component="legend" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  Sexe*
                </FormLabel>
                <RadioGroup
                  row
                  value={form.sexe}
                  onChange={(e) => handleChange('sexe', e.target.value === 'true')}
                  sx={{ mt: 1 }}
                >
                  <FormControlLabel 
                    value="true" 
                    control={<Radio sx={{ color: '#1976d2' }} />} 
                    label="Masculin" 
                  />
                  <FormControlLabel 
                    value="false" 
                    control={<Radio sx={{ color: '#1976d2' }} />} 
                    label="Féminin" 
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Paper>

          {/* Section Affectation et Autorisation */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: 'white' }}>
            <Typography variant="h6" sx={{ 
              color: '#1976d2', 
              mb: 2, 
              pb: 1, 
              borderBottom: '2px solid #e3f2fd',
              fontWeight: 'bold'
            }}>
              Affectation et Autorisation
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <SearchableSelect
                label="CCT*"
                value={form.CCTId}
                onChange={(value) => handleChange('CCTId', value)}
                options={dropdowns.ccts || []}
                placeholder="Rechercher un CCT..."
                getOptionLabel={(option) => option.nom}
                getOptionValue={(option) => option.id}
                sx={{ minWidth: '300px', flex: 1 }}
                margin="dense"
                required
              />
              
              <TextField
                label="Date affectation"
                type="date"
                value={form.dateAffectationCCT}
                onChange={(e) => handleChange('dateAffectationCCT', e.target.value)}
                sx={{ minWidth: '250px', flex: 1 }}
                margin="dense"
                variant="outlined"
                size="medium"
                InputLabelProps={{ shrink: true }}
              />
              
              <TextField
                label="Année Autorisation*"
                type="number"
                value={form.anneeAutorisation}
                onChange={(e) => handleChange('anneeAutorisation', e.target.value)}
                sx={{ minWidth: '200px', flex: 1 }}
                required
                margin="dense"
                variant="outlined"
                size="medium"
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
              <TextField
                label="Référence approbation"
                value={form.referenceApprobationCNEH}
                onChange={(e) => handleChange('referenceApprobationCNEH', e.target.value)}
                sx={{ minWidth: '300px', flex: 1 }}
                margin="dense"
                variant="outlined"
                size="medium"
              />
              
              <TextField
                label="Date approbation"
                type="date"
                value={form.dateApprobationCNEH}
                onChange={(e) => handleChange('dateApprobationCNEH', e.target.value)}
                sx={{ minWidth: '250px', flex: 1 }}
                margin="dense"
                variant="outlined"
                size="medium"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Paper>

          {/* Section Contact et Formation */}
          <Paper elevation={1} sx={{ p: 3, mb: 3, backgroundColor: 'white' }}>
            <Typography variant="h6" sx={{ 
              color: '#1976d2', 
              mb: 2, 
              pb: 1, 
              borderBottom: '2px solid #e3f2fd',
              fontWeight: 'bold'
            }}>
              Contact et Formation
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <TextField
                label="Téléphone*"
                value={form.tel}
                onChange={(e) => handleChange('tel', e.target.value)}
                sx={{ minWidth: '250px', flex: 1 }}
                required
                margin="dense"
                variant="outlined"
                size="medium"
              />
              
              <TextField
                label="Email"
                type="email"
                value={form.mail}
                onChange={(e) => handleChange('mail', e.target.value)}
                sx={{ minWidth: '300px', flex: 1 }}
                margin="dense"
                variant="outlined"
                size="medium"
              />
              
              <TextField
                label="CNSS*"
                value={form.cnss}
                onChange={(e) => handleChange('cnss', e.target.value)}
                sx={{ minWidth: '250px', flex: 1 }}
                required
                margin="dense"
                variant="outlined"
                size="medium"
              />
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
              <SearchableSelect
                label="Niveau de formation"
                value={form.niveauFormationInitialId}
                onChange={(value) => handleChange('niveauFormationInitialId', value)}
                options={dropdowns.niveauxFormation || []}
                placeholder="Rechercher un niveau..."
                getOptionLabel={(option) => option.libelle}
                getOptionValue={(option) => option.id}
                sx={{ minWidth: '400px', flex: 1 }}
                margin="dense"
              />
            </Box>
          </Paper>
        </form>
      </DialogContent>
      <DialogActions sx={{ 
        p: 3, 
        backgroundColor: '#f5f5f5', 
        borderTop: '2px solid #e0e0e0',
        gap: 2
      }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          sx={{ 
            minWidth: '120px',
            borderColor: '#9c27b0',
            color: '#9c27b0',
            '&:hover': {
              borderColor: '#7b1fa2',
              backgroundColor: 'rgba(156, 39, 176, 0.04)'
            }
          }}
        >
          Annuler
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          sx={{ 
            minWidth: '120px',
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
} 