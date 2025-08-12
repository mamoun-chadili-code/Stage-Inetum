import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl
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
      setForm({
        nom: initialValues.nom || '',
        prenom: initialValues.prenom || '',
        cin: initialValues.cin || '',
        CCTId: initialValues.CCTId?.toString() || initialValues.cctId?.toString() || '',
        dateAffectationCCT: initialValues.dateAffectationCCT ? initialValues.dateAffectationCCT.split('T')[0] : '',
        referenceApprobationCNEH: initialValues.referenceApprobationCNEH || '',
        anneeAutorisation: initialValues.anneeAutorisation?.toString() || '',
        dateApprobationCNEH: initialValues.dateApprobationCNEH ? initialValues.dateApprobationCNEH.split('T')[0] : '',
        tel: initialValues.tel || '',
        mail: initialValues.mail || '',
        cnss: initialValues.cnss || '',
        sexe: initialValues.sexe || false,
        dateNaissance: initialValues.dateNaissance ? initialValues.dateNaissance.split('T')[0] : '',
        niveauFormationInitialId: initialValues.niveauFormationInitialId?.toString() || ''
      });
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
      <DialogTitle>
        {initialValues?.id ? 'Modifier Chef de Centre' : 'Ajouter Chef de Centre'}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Colonne gauche */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Nom*"
                value={form.nom}
                onChange={(e) => handleChange('nom', e.target.value)}
                fullWidth
                required
                margin="dense"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Prénom*"
                value={form.prenom}
                onChange={(e) => handleChange('prenom', e.target.value)}
                fullWidth
                required
                margin="dense"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="CIN*"
                value={form.cin}
                onChange={(e) => handleChange('cin', e.target.value)}
                fullWidth
                required
                margin="dense"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <SearchableSelect
                label="CCT"
                value={form.CCTId}
                onChange={(value) => handleChange('CCTId', value)}
                options={dropdowns.ccts || []}
                placeholder="Rechercher un CCT..."
                getOptionLabel={(option) => option.nom}
                getOptionValue={(option) => option.id}
                fullWidth
                margin="dense"
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Date affectation"
                type="date"
                value={form.dateAffectationCCT}
                onChange={(e) => handleChange('dateAffectationCCT', e.target.value)}
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Référence approbation"
                value={form.referenceApprobationCNEH}
                onChange={(e) => handleChange('referenceApprobationCNEH', e.target.value)}
                fullWidth
                margin="dense"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Année Autorisation*"
                type="number"
                value={form.anneeAutorisation}
                onChange={(e) => handleChange('anneeAutorisation', e.target.value)}
                fullWidth
                required
                margin="dense"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Date approbation"
                type="date"
                value={form.dateApprobationCNEH}
                onChange={(e) => handleChange('dateApprobationCNEH', e.target.value)}
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Tel*"
                value={form.tel}
                onChange={(e) => handleChange('tel', e.target.value)}
                fullWidth
                required
                margin="dense"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Mail"
                type="email"
                value={form.mail}
                onChange={(e) => handleChange('mail', e.target.value)}
                fullWidth
                margin="dense"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="CNSS*"
                value={form.cnss}
                onChange={(e) => handleChange('cnss', e.target.value)}
                fullWidth
                required
                margin="dense"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset" margin="dense">
                <FormLabel component="legend">Sexe*</FormLabel>
                <RadioGroup
                  row
                  value={form.sexe}
                  onChange={(e) => handleChange('sexe', e.target.value === 'true')}
                >
                  <FormControlLabel value={false} control={<Radio />} label="Masculin" />
                  <FormControlLabel value={true} control={<Radio />} label="Féminin" />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Date de naissance"
                type="date"
                value={form.dateNaissance}
                onChange={(e) => handleChange('dateNaissance', e.target.value)}
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <SearchableSelect
                label="Niveau de formation"
                value={form.niveauFormationInitialId}
                onChange={(value) => handleChange('niveauFormationInitialId', value)}
                options={dropdowns.niveauxFormation || []}
                placeholder="Rechercher un niveau..."
                getOptionLabel={(option) => option.libelle}
                getOptionValue={(option) => option.id}
                fullWidth
                margin="dense"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Annuler
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
} 